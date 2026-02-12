'use client';

import React from 'react';

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  icon?: string;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  isOpen,
  onToggle,
  icon = 'fas fa-cog',
  children
}) => {
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-100 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <i className={`${icon} text-blue-600 text-sm`}></i>
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-gray-400 text-sm transition-transform duration-200`}></i>
      </button>
      {isOpen && (
        <div className="mt-2 px-4 py-4 bg-white rounded-lg shadow-sm border border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;