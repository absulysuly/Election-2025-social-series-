import React from 'react';

const MoneyBillWaveIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6.375 6.375 0 006.375-6.375V9.375m-12.75 0V12.375a6.375 6.375 0 006.375 6.375M12 21.75v-1.5" />
    </svg>
);

export default MoneyBillWaveIcon;