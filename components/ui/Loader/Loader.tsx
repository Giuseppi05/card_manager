import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  overlay?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  text = 'Cargando...', 
  overlay = true 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin`}
        role="status"
        aria-label="Cargando"
      />
      {text && (
        <p className={`${textSizeClasses[size]}  font-medium ${overlay ? 'text-white' : 'text-gray-700'}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        {/* <div className="bg-white rounded-lg p-6 shadow-lg"> */}
          {spinner}
        {/* </div> */}
      </div>
    );
  }

  return spinner;
};

export default Loader;