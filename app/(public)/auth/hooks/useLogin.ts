import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLoader } from "@/context/LoaderContext";

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseLoginOptions {
  redirectPath?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useLogin = (options: UseLoginOptions = {}) => {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    redirectPath = "/games", 
    onSuccess, 
    onError 
  } = options;

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    showLoader("Iniciando sesión...");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const contentType = res.headers.get("content-type");
      
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Respuesta no es JSON:", await res.text());
        throw new Error("Error del servidor. Por favor intenta de nuevo.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      // Actualizamos el estado global
      await refreshSession();
      
      showLoader("¡Sesión iniciada! Redirigiendo...");
      
      // Callback de éxito si existe
      onSuccess?.();
      
      // Redireccionamos
      setTimeout(() => {
        hideLoader();
        router.push(redirectPath);
      }, 1000);

      return { success: true, message: data.message || '¡Sesión iniciada correctamente!' };

    } catch (error: any) {
      console.error("Error en login:", error);
      const errorMessage = error.message || "Error de conexión. Intenta de nuevo.";
      
      hideLoader();
      
      // Callback de error si existe
      onError?.(errorMessage);
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading
  };
};