import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "google";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";

  const variants = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white disabled:bg-primary-300 shadow-lg hover:shadow-xl",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 text-white disabled:bg-secondary-300 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 disabled:border-primary-300 disabled:text-primary-300",
    google:
      "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md disabled:bg-gray-100",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
