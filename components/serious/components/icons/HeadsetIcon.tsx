// FIX: Replaced placeholder content with a valid SVG icon component.
import React from 'react';

const HeadsetIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v4a2 2 0 01-2 2h-2v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v1M7 8H5a2 2 0 00-2 2v4a2 2 0 002 2h2v4a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 00-1-1H7a1 1 0 00-1 1v1" />
    </svg>
);

export default HeadsetIcon;
