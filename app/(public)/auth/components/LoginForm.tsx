"use client";
import React, { useState } from "react";
import InputText from "@/components/forms/InputText";
import Button from "@/components/forms/Button";
import { useLogin } from "../hooks/useLogin";

interface LoginFormProps {
  onToggleForm?: () => void;
  redirectPath?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onToggleForm, 
  redirectPath = "/games" 
}) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState<string | null>(null);
  
  const { login, isLoading } = useLogin({
    redirectPath,
    onError: (error) => {
      setLocalError(error);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validación de longitud mínima
    if (form.password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    await login({ email: form.email, password: form.password });
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de nuevo!</h2>
        <p className="text-gray-600">Inicia sesión para continuar</p>
      </div>

      {localError && (
        <div className="p-4 rounded-md text-sm font-medium border bg-red-50 text-red-700 border-red-200">
          {localError}
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

        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
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