
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-right text-lg font-medium text-gray-700 mb-2">{label}</label>}
      <input
        id={id}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007a3d] focus:border-transparent transition-colors text-right ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
