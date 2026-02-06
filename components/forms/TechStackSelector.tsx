'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, Plus } from 'lucide-react';
import { TECH_STACK_OPTIONS } from '@/lib/utils/constants';

interface TechStackSelectorProps {
  selectedTech: string[];
  onChange: (techStack: string[]) => void;
  className?: string;
}

export function TechStackSelector({ selectedTech, onChange, className }: TechStackSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = TECH_STACK_OPTIONS.filter(
    tech => 
      tech.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTech.includes(tech)
  );

  const addTechnology = (tech: string) => {
    if (!selectedTech.includes(tech) && tech.trim()) {
      onChange([...selectedTech, tech.trim()]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTechnology = (tech: string) => {
    onChange(selectedTech.filter(t => t !== tech));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTechnology(inputValue);
      }
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tech Stack
      </label>
      
      {/* Selected Technologies */}
      {selectedTech.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTech.map(tech => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-800"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input with Suggestions */}
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleInputKeyDown}
          placeholder="Add technologies (e.g., React, Python, AWS)"
          helperText="Type to search or add custom technologies"
        />

        {/* Add Button */}
        {inputValue.trim() && (
          <div className="absolute right-2 top-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => addTechnology(inputValue)}
              className="h-7 px-2"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.slice(0, 10).map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => addTechnology(tech)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
              >
                {tech}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}