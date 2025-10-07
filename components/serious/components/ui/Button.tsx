
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-2.5 rounded-lg font-bold text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50';

  const variantClasses = {
    primary: 'bg-[#007a3d] text-white hover:bg-green-700 focus:ring-green-300',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-400',
    outline: 'bg-transparent border-2 border-[#007a3d] text-[#007a3d] hover:bg-green-50',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
