'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Pipette } from 'lucide-react';

interface ColorSelectProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  recentColors?: string[];
  onRecentColorsChange?: (colors: string[]) => void;
}

const ColorSelect: React.FC<ColorSelectProps> = ({
  value,
  onChange,
  label,
  recentColors = [],
  onRecentColorsChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Colores predefinidos comunes
  const predefinedColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
    '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#ffa500',
    '#ffc0cb', '#a52a2a', '#808080', '#000080', '#008080', '#800000'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    setHexInput(value);
  }, [value]);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    
    // Agregar a colores recientes
    if (onRecentColorsChange && !recentColors.includes(newColor)) {
      const updatedRecent = [newColor, ...recentColors.slice(0, 11)]; // Máximo 12 colores recientes
      onRecentColorsChange(updatedRecent);
    }
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHexInput(newValue);
    
    // Validar formato hex
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      handleColorChange(newValue);
    }
  };

  const handleHexInputBlur = () => {
    // Si el hex no es válido, revertir al valor anterior
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
      setHexInput(value);
    }
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      {/* Color Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 border-2 border-gray-300 rounded-lg flex items-center px-3 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      >
        {/* Color Preview */}
        <div 
          className="w-6 h-6 rounded border border-gray-300 mr-3"
          style={{ backgroundColor: value }}
        />
        
        {/* Color Value */}
        <span className="flex-1 text-left text-sm text-gray-700">
          {value.toUpperCase()}
        </span>
        
        {/* Palette Icon */}
        <Palette className="h-4 w-4 text-gray-400" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4"
        >
          {/* Hex Input */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Código Hexadecimal
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={hexInput}
                onChange={handleHexInputChange}
                onBlur={handleHexInputBlur}
                placeholder="#000000"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                maxLength={7}
              />
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                title="Selector de color"
              />
            </div>
          </div>

          {/* Recent Colors */}
          {recentColors.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Colores Recientes
              </label>
              <div className="grid grid-cols-6 gap-1">
                {recentColors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform ${
                      color === value ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Predefined Colors */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Colores Predefinidos
            </label>
            <div className="grid grid-cols-6 gap-1">
              {predefinedColors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform ${
                    color === value ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSelect;