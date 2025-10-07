// Fix: Populating BottomBar.tsx with full component implementation.
import React from 'react';
import { AppTab, UserRole } from '../types.ts';
import { HomeIcon, VideoIcon, UsersIcon, DebateIcon, CalendarIcon } from './icons/Icons.tsx';

interface BottomBarProps {
    userRole: UserRole;
    activeTab: AppTab;
    onNavigate: (tab: AppTab) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ userRole, activeTab, onNavigate }) => {
    const navItems = [
        { label: AppTab.Posts, icon: HomeIcon, tab: AppTab.Posts, enabled: true },
        { label: AppTab.Reels, icon: VideoIcon, tab: AppTab.Reels, enabled: true },
        { label: AppTab.Candidates, icon: UsersIcon, tab: AppTab.Candidates, enabled: true },
        { label: AppTab.Debates, icon: DebateIcon, tab: AppTab.Debates, enabled: true },
        { label: AppTab.Events, icon: CalendarIcon, tab: AppTab.Events, enabled: true },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-mocha-white dark:bg-gray-800 border-t border-neutral-gray-medium dark:border-gray-700 lg:hidden">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                {navItems.map(item => item.enabled && (
                    <button
                        key={item.label}
                        onClick={() => onNavigate(item.tab)}
                        type="button"
                        className={`inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-gray-700 group ${activeTab === item.tab ? 'text-action-blue' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span className="text-xs">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BottomBar;