'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Loader from '@/components/ui/Loader';

interface LoaderContextType {
  showLoader: (text?: string, overlay?: boolean) => void;
  hideLoader: () => void;
  isLoading: boolean;
  showInlineLoader: (text?: string) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('Cargando...');
  const [isOverlay, setIsOverlay] = useState(false);

  const showLoader = (text = 'Cargando...', overlay = true) => {
    setLoaderText(text);
    setIsOverlay(overlay);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const showInlineLoader = (text = 'Cargando...') => {
    setLoaderText(text);
    setIsOverlay(false);
    setIsLoading(true);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading, showInlineLoader }}>
      {children}
      {isLoading && (
        <Loader 
          text={loaderText} 
          overlay={isOverlay}
          size="md"
        />
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader debe ser usado dentro de un LoaderProvider');
  }
  return context;
};