import React from 'react';

const GlobeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.758 15H10m4 0h2.242M11 3.055a9.001 9.001 0 1011.89 0M11 3.055L12 2m0 20.945V22m-9-9.945H2m20 0h-1.055M17 4.575l-1.42-1.42M7 4.575L5.58 3.155m12.84 12.84l1.42 1.42M7 19.425l-1.42 1.42" />
    </svg>
);

export default GlobeIcon;
