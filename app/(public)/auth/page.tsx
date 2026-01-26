"use client";
import { useState } from "react";
import { useDevice } from "@/lib/useDevice";
import LoginForm from "@/app/(public)/auth/components/LoginForm";
import RegisterForm from "@/app/(public)/auth/components/RegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faChartLine,
  faStore,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { isMobile } = useDevice();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex bg-gray-50 relative overflow-hidden">
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl">
          <div
            className={`
              grid 
              ${isMobile ? "grid-cols-1" : "lg:grid-cols-2"} 
              gap-8 
              items-center
            `}
          >
            {/* Sección informativa - Solo en desktop */}
            {!isMobile && (
              <div className="space-y-10 p-12">
                <div className="space-y-6">
                  <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                    Card Game
                    <span className="text-primary-600"> Manager</span>
                  </h1>
                  <p className="text-2xl text-gray-600 font-light">
                    Tu colección, tu estrategia, tu victoria
                  </p>
                </div>

                {/* Features en grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faBoxArchive}
                        className="w-5 h-5 text-white"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">Colecciones</h3>
                    <p className="text-sm text-gray-600">
                      Organiza todas tus cartas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faStore}
                        className="w-5 h-5 text-white"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">Tienda</h3>
                    <p className="text-sm text-gray-600">
                      Compra las mejores cartas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faChartLine}
                        className="w-5 h-5 text-white"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Estadísticas
                    </h3>
                    <p className="text-sm text-gray-600">Analiza tu progreso</p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="w-5 h-5 text-white"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">Comunidad</h3>
                    <p className="text-sm text-gray-600">
                      Encuentra aliados y rivales
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Jugadores activos</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">1000+</p>
                    <p className="text-sm text-gray-600">Cartas disponibles</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sección del formulario */}
            <div className="flex items-center justify-center">
              <div
                className={`
                  w-full 
                  ${isMobile ? "max-w-md" : "max-w-lg"}
                  bg-white
                  rounded-3xl
                  border-2 border-gray-100
                  overflow-hidden
                `}
              >
                <div className="p-8 lg:p-12">
                  <div className="relative overflow-hidden">
                    {/* Login Form */}
                    <div
                      className={`
                        transition-transform duration-300 ease-out
                        ${
                          isLogin
                            ? "translate-x-0"
                            : "-translate-x-full absolute inset-0 pointer-events-none"
                        }
                      `}
                    >
                      <LoginForm onToggleForm={toggleForm} />
                    </div>

                    {/* Register Form */}
                    <div
                      className={`
                        transition-transform duration-300 ease-out
                        ${
                          !isLogin
                            ? "translate-x-0"
                            : "translate-x-full absolute inset-0 pointer-events-none"
                        }
                      `}
                    >
                      <RegisterForm onToggleForm={toggleForm} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
