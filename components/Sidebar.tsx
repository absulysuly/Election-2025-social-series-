
import React from 'react';
// Fix: added .ts extension to types import
import { AppTab, UserRole } from '../types.ts';
// Fix: added .tsx extension to Icons import
import { HomeIcon, DashboardIcon, SettingsIcon, DebateIcon } from './icons/Icons.tsx';

interface SidebarProps {
    userRole?: UserRole;
    activeTab: AppTab;
    onNavigate: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, activeTab, onNavigate }) => {
    const navItems = [
        { label: AppTab.Home, icon: HomeIcon, tab: AppTab.Home, enabled: true },
        { label: AppTab.DebateRoom, icon: DebateIcon, tab: AppTab.DebateRoom, enabled: true },
        { label: AppTab.Dashboard, icon: DashboardIcon, tab: AppTab.Dashboard, enabled: userRole === UserRole.Candidate },
        { label: AppTab.Settings, icon: SettingsIcon, tab: AppTab.Settings, enabled: true },
    ];

    return (
        <aside className="fixed top-16 left-0 z-30 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-mocha-white dark:bg-gray-800 border-r border-neutral-gray-medium dark:border-gray-700">
                <ul className="space-y-2 font-medium">
                    {navItems.map(item => item.enabled && (
                        <li key={item.label}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onNavigate(item.tab); }}
                                className={`flex items-center p-2 rounded-lg group ${activeTab === item.tab ? 'bg-neutral-gray-light dark:bg-gray-700 text-action-blue' : 'text-gray-900 dark:text-white hover:bg-neutral-gray-light dark:hover:bg-gray-700'}`}
                            >
                                <item.icon className={`w-6 h-6 transition duration-75 ${activeTab !== item.tab && 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
                                <span className="ml-3">{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;