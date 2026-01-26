import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  name: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  label?: string;
  direction?: "horizontal" | "vertical";
  required?: boolean;
  isPassword?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<Props> = ({
  name,
  id,
  type = "text",
  placeholder,
  value,
  className = "",
  label,
  direction = "vertical",
  required = false,
  isPassword = false,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isHorizontal = direction === "horizontal";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const inputStyles =
    "w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all bg-white text-gray-900 placeholder:text-gray-400";

  return (
    <div
      className="flex gap-2 items-start justify-start w-full"
      style={{
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: isHorizontal ? "center" : "flex-start"
      }}
    >
      {label && (
        <label
          htmlFor={id || name}
          className={`text-sm font-medium text-gray-700 ${isHorizontal ? 'w-1/3' : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={inputType}
          name={name}
          id={id || name}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          required={required}
          className={`
            ${inputStyles} 
            ${className}
            ${isPassword ? "pr-12" : ""} 
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="
              absolute 
              right-3 
              top-0
              bottom-0
              flex
              items-center
              text-gray-400 
              hover:text-gray-600 
              focus:outline-none 
              transition-colors
              cursor-pointer
              z-10
            "
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputText;