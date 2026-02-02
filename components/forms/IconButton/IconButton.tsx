import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconButtonProps {
    icon: IconDefinition; // FontAwesome icon definition
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
    icon,
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    disabled = false,
    type = 'button',
    onClick
}) => {

    const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

    const variantClasses = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300"
    };

    const sizeClasses = {
        sm: "px-3 py-2 text-sm font-small",
        md: "px-4 py-2 text-base font-small",
        lg: "px-6 py-3 text-lg"
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${className} ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabled ? 'cursor-not-allowed' : ''}`}
        >
            <FontAwesomeIcon icon={icon} className={children ? 'mr-2' : ''} />
            {children}
        </button>
    );
};

export default IconButton;