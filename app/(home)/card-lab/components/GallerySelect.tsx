'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';

interface GallerySelectItem {
  id: string;
  name: string;
  image?: string;
  logo?: string;
}

interface GallerySelectProps {
  items: GallerySelectItem[];
  selectedItems?: GallerySelectItem[];
  onSelectionChange: (items: GallerySelectItem[]) => void;
  multiple?: boolean;
  className?: string;
  placeholder?: string;
  itemsPerPage?: number;
}

const GallerySelect: React.FC<GallerySelectProps> = ({
  items,
  selectedItems = [],
  onSelectionChange,
  multiple = false,
  className = '',
  placeholder = 'Buscar...',
  itemsPerPage = 6
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleItemClick = (item: GallerySelectItem) => {
    if (multiple) {
      const isSelected = selectedItems.some(selected => selected.id === item.id);
      if (isSelected) {
        onSelectionChange(selectedItems.filter(selected => selected.id !== item.id));
      } else {
        onSelectionChange([...selectedItems, item]);
      }
    } else {
      onSelectionChange([item]);
    }
  };

  const isSelected = (item: GallerySelectItem) => {
    return selectedItems.some(selected => selected.id === item.id);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(itemsPerPage); // Reset visible count on search
          }}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`
              relative aspect-square border-2 rounded-lg p-2 transition-all duration-200 hover:shadow-md
              ${isSelected(item) 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {/* Image/Logo */}
            <div className="w-full h-full flex items-center justify-center mb-1">
              {item.image || item.logo ? (
                <img 
                  src={item.image || item.logo} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-medium">
                    {item.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            {/* Name */}
            <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 rounded px-1 py-0.5">
              <p className="text-xs font-medium text-gray-700 truncate">
                {item.name}
              </p>
            </div>

            {/* Selection Indicator */}
            {isSelected(item) && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        ))}

        {/* Show More Button */}
        {hasMore && (
          <button
            onClick={loadMore}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center"
          >
            <Plus className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500 font-medium">Ver más</span>
          </button>
        )}
      </div>

      {/* Selection Summary */}
      {selectedItems.length > 0 && (
        <div className="text-sm text-gray-600">
          {multiple 
            ? `${selectedItems.length} seleccionado${selectedItems.length !== 1 ? 's' : ''}`
            : `Seleccionado: ${selectedItems[0]?.name}`
          }
        </div>
      )}
    </div>
  );
};

export default GallerySelect;