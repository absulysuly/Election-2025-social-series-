import React from 'react';

const BullhornIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.104 9.962-5.29C20.62 1.344 22 2.973 22 5.052v13.896c0 2.079-1.38 3.708-3.202 4.243-2.337-3.186-5.862-5.29-9.962-5.29H7a4.001 4.001 0 01-1.564-.317z" />
    </svg>
);

export default BullhornIcon;