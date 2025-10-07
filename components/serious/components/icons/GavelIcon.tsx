import React from 'react';

const GavelIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 7.629l4.243 4.243-1.061 1.06-4.242-4.242 1.06-1.061z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 14.828l7.071-7.071 4.243 4.243L7.243 19.071z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 14l-1 1 2 2 1-1" />
    </svg>
);

export default GavelIcon;
