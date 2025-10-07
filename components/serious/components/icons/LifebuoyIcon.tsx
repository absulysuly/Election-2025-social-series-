// FIX: Replaced placeholder content with a valid SVG icon component for the Lifebuoy (support) icon.
import React from 'react';

const LifebuoyIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414m-1.414-1.414L12 12m2.828-2.828l1.414-1.414M5.636 18.364l1.414-1.414m1.414 1.414L12 12m-2.828 2.828l-1.414 1.414m12.728-1.414l-1.414-1.414M12 12l2.828 2.828m0 0l1.414 1.414M5.636 5.636l1.414 1.414m-1.414 1.414L12 12m-2.828-2.828l-1.414-1.414m12.728 1.414l-1.414 1.414M12 12l2.828-2.828" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default LifebuoyIcon;
