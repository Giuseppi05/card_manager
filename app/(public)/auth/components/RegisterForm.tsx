"use client";
import React, { useState } from "react";
import InputText from "@/components/forms/InputText";
import Button from "@/components/forms/Button";
import GoogleButton from "@/components/forms/GoogleButton";
import { createClient } from "@/lib/supabase/client";
import { useLogin } from "../hooks/useLogin";

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  
  const { login } = useLogin({
    redirectPath: "/games",
    onError: (error) => {
      console.error("Error en login automático:", error);
      setLocalError("Cuenta creada correctamente, pero hubo un problema con el login automático. Por favor inicia sesión manualmente.");
      setTimeout(onToggleForm, 2000);
      setLoading(false);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (form.password !== form.confirm) {
      setLocalError("Las contraseñas no coinciden");
      return;
    }

    if (form.password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al registrarse");

      // Login automático después del registro exitoso
      await login({ email: form.email, password: form.password });

    } catch (error: any) {
      setLocalError(error.message);
      setLoading(false);
    }
  };

  // const handleGoogle = async () => {
  //   setLoading(true);
  //   const supabase = createClient();
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: { redirectTo: `${window.location.origin}/api/auth/callback` },
  //   });
  //   if (error) {
  //     setFeedback({ type: 'error', message: error.message });
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Únete al juego!</h2>
        <p className="text-gray-600">Crea tu cuenta y empieza a jugar</p>
      </div>

      {localError && (
        <div className="p-4 rounded-md text-sm font-medium border bg-red-50 text-red-700 border-red-200">
          {localError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputText name="name" label="Nombre completo" placeholder="Juan Pérez" value={form.name} onChange={handleChange} required />
        <InputText name="email" type="email" label="Correo electrónico" placeholder="tu@email.com" value={form.email} onChange={handleChange} required />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            name="password"
            isPassword={true}
            label="Contraseña"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <InputText
            name="confirm"
            isPassword={true}
            label="Confirmar contraseña"
            placeholder="••••••••"
            value={form.confirm}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? "Procesando..." : "Crear cuenta"}
        </Button>
      </form>

      {/* <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
        <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">O regístrate con</span></div>
      </div>

      <GoogleButton onClick={handleGoogle} disabled={loading} /> */}

      <div className="text-center mt-6">
        <p className="text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <button type="button" onClick={onToggleForm} className="text-primary-600 font-semibold hover:text-primary-700 transition-colors cursor-pointer">
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;