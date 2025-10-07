
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-right text-lg font-medium text-gray-700 mb-2">{label}</label>}
      <textarea
        id={id}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007a3d] focus:border-transparent transition-colors text-right ${className}`}
        rows={5}
        {...props}
      />
    </div>
  );
};

export default Textarea;
