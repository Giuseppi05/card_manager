import React, { useState } from 'react';
import InputText from '@/components/forms/InputText';
import IconButton from '@/components/forms/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/AuthContext';
import { useLoader } from '@/context/LoaderContext';

interface AddGameModalProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ onCancel, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    showLoader('Agregando juego...', true);
    setError(null);
    
    try {
      const response = await fetch('/api/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: code.trim(),
          userId: user!.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al agregar el juego');
      }

      setCode('');
      onSuccess?.();
      onCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <FontAwesomeIcon icon={faGamepad} className="text-primary-600 text-lg sm:text-xl" />
          </div>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-2">
            Ingresa el código del juego que quieres agregar a tu colección
          </p>
        </div>

        {error && (
          <div className="p-3 sm:p-4 rounded-md text-xs sm:text-sm font-medium border bg-red-50 text-red-700 border-red-200">
            {error}
          </div>
        )}

        <InputText
          name="code"
          label="Código del juego"
          placeholder="Ej: GAME-ABC-123"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
          <IconButton
            icon={faTimes}
            variant="secondary"
            fullWidth
            onClick={onCancel}
            disabled={isLoading}
            className="order-2 sm:order-1"
          >
            Cancelar
          </IconButton>
          <IconButton
            icon={faPlus}
            variant="primary"
            fullWidth
            type="submit"
            disabled={isLoading || !code.trim()}
            className="order-1 sm:order-2"
          >
            {isLoading ? 'Agregando...' : 'Agregar juego'}
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default AddGameModal;