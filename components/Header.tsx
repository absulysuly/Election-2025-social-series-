
import React, { useState } from 'react';
// Fix: added .ts extension to types import
import { User, Governorate, GOVERNORATES } from '../types.ts';
// Fix: added .tsx extension to Icons import
import { SearchIcon, EditIcon, ChevronDownIcon, UsersIcon } from './icons/Icons.tsx';

interface HeaderProps {
    user: User | null;
    onCompose: () => void;
    onRequestLogin: () => void;
    selectedGovernorate: Governorate | 'All';
    onGovernorateChange: (gov: Governorate | 'All') => void;
}

const Header: React.FC<HeaderProps> = ({ user, onCompose, onRequestLogin, selectedGovernorate, onGovernorateChange }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-mocha-white dark:bg-gray-800 border-b border-neutral-gray-medium dark:border-gray-700 h-16 flex items-center px-4 sm:px-6">
            <div className="flex items-center space-x-4 w-full">
                {/* Logo and Search (for larger screens) */}
                <div className="flex items-center justify-start lg:w-64">
                    <h1 className="text-xl font-bold">Hamlet</h1>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="w-full max-w-lg">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for candidates or topics"
                                className="block w-full pl-10 pr-3 py-2 border border-neutral-gray-medium dark:border-gray-600 rounded-full bg-neutral-gray-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-action-blue"
                            />
                        </div>
                    </div>
                </div>


                {/* Actions and User Info */}
                <div className="flex items-center space-x-4 lg:w-64 justify-end">
                     {/* Governorate Selector */}
                    <div className="relative hidden sm:block">
                        <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-action-blue dark:hover:text-action-blue">
                            <span>{selectedGovernorate}</span>
                            <ChevronDownIcon className="w-4 h-4 ml-1" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-neutral-gray-medium dark:border-gray-700">
                                <a onClick={() => { onGovernorateChange('All'); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">All Governorates</a>
                                {GOVERNORATES.map(gov => (
                                     <a key={gov} onClick={() => { onGovernorateChange(gov); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{gov}</a>
                                ))}
                            </div>
                        )}
                    </div>
                    <button 
                        onClick={onCompose}
                        className="hidden lg:flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-action-blue rounded-full hover:bg-blue-700"
                    >
                        <EditIcon className="w-4 h-4" />
                        <span>Compose</span>
                    </button>
                    {user ? (
                         <img className="w-9 h-9 rounded-full" src={user.avatarUrl} alt={user.name} />
                    ) : (
                        <button onClick={onRequestLogin} className="w-9 h-9 rounded-full bg-neutral-gray-medium dark:bg-gray-700 flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-neutral-gray-dark dark:text-gray-400" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;