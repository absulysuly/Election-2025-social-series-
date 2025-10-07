import React from 'react';

const HandsHelpingIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.027a2 2 0 01-1.789-2.894l3.5-7A2 2 0 0114 10zm-4 0a2 2 0 00-2-2H3.236a2 2 0 00-1.789 2.894l3.5 7A2 2 0 006.738 21h4.027a2 2 0 001.789-2.894l-3.5-7A2 2 0 0010 10z" />
    </svg>
);

export default HandsHelpingIcon;
