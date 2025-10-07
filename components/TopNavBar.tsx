
import React from 'react';

interface TopNavBarProps<T extends string> {
    tabs: T[];
    activeTab: T;
    onTabChange: (tab: T) => void;
}

function TopNavBar<T extends string>({ tabs, activeTab, onTabChange }: TopNavBarProps<T>) {
    return (
        <div className="border-b border-neutral-gray-medium dark:border-gray-700">
            <nav className="-mb-px flex justify-center space-x-6 px-4 sm:px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`${
                            activeTab === tab
                                ? 'border-action-blue text-action-blue'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default TopNavBar;