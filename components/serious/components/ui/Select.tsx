
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ label, id, children, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-right text-lg font-medium text-gray-700 mb-2">{label}</label>}
      <select
        id={id}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007a3d] focus:border-transparent transition-colors text-right bg-white ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
