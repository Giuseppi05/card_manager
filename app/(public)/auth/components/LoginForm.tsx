"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputText from "@/components/forms/InputText";
import Button from "@/components/forms/Button";
import { useAuth } from "@/context/AuthContext";

interface LoginFormProps {
  onToggleForm?: () => void;
  redirectPath?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onToggleForm, 
  redirectPath = "/dashboard" 
}) => {
  const router = useRouter();
  const { refreshSession } = useAuth();
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success', message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Validación de longitud mínima
    if (form.password.length < 6) {
      setFeedback({ type: 'error', message: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      // Verificar content-type antes de parsear
      const contentType = res.headers.get("content-type");
      
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Respuesta no es JSON:", await res.text());
        throw new Error("Error del servidor. Por favor intenta de nuevo.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      // Éxito
      setFeedback({ 
        type: 'success', 
        message: data.message || '¡Sesión iniciada correctamente!' 
      });
      
      // Actualizamos el estado global
      await refreshSession();
      
      // Redireccionamos después de un breve delay
      setTimeout(() => {
        router.push(redirectPath);
      }, 1000);

    } catch (error: any) {
      console.error("Error en login:", error);
      setFeedback({ 
        type: 'error', 
        message: error.message || "Error de conexión. Intenta de nuevo." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de nuevo!</h2>
        <p className="text-gray-600">Inicia sesión para continuar</p>
      </div>

      {feedback && (
        <div className={`p-4 rounded-md text-sm font-medium border ${
          feedback.type === 'error' 
            ? 'bg-red-50 text-red-700 border-red-200' 
            : 'bg-green-50 text-green-700 border-green-200'
        }`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputText
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="tu@email.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <InputText
          name="password"
          isPassword={true}
          label="Contraseña"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Descomentar cuando implementes recuperación de contraseña
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors cursor-pointer"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        */}

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      {onToggleForm && (
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={onToggleForm}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors cursor-pointer"
            >
              Regístrate ahora
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;