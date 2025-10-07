
import React, { useState, useEffect } from 'react';
import './index.css'; // Assuming tailwind css is setup here

import { User, AppTab, Governorate, UserRole, Post, Language } from './types.ts';

import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import ComposeModal from './components/ComposeModal.tsx';
import LoginModal from './components/LoginModal.tsx';

// Views
import HomeView from './components/views/HomeView.tsx';
import CandidateDashboardView from './components/views/CandidateDashboardView.tsx';
import SettingsView from './components/views/SettingsView.tsx';
import CandidateProfileView from './components/views/CandidateProfileView.tsx';
import DebateRoomView from './components/views/DebateRoomView.tsx';
import FullScreenReelView from './components/views/FullScreenReelView.tsx';


function App() {
    // --- STATE MANAGEMENT ---
    // User state: null if guest, User object if logged in. Drives all auth-related UI.
    const [user, setUser] = useState<User | null>(null);
    // Active Tab: Controls which main view is displayed (e.g., Home, Dashboard).
    const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Home);
    // Modal States: Control the visibility of various modals.
    const [isComposeOpen, setComposeOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    // Global Filters: State for filters that affect content across the entire app.
    const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | 'All'>('All');
    // Accessibility & Language: State for user-specific preferences.
    const [isHighContrast, setHighContrast] = useState(false);
    const [language, setLanguage] = useState<Language>('en');
    // View-specific State: Manages navigation to deeper content like profiles or full-screen reels.
    const [viewingCandidate, setViewingCandidate] = useState<User | null>(null);
    const [viewingReel, setViewingReel] = useState<Post | null>(null);

    // --- EFFECTS ---
    // Toggles a class on the root HTML element for high-contrast mode styling.
    useEffect(() => {
        document.documentElement.classList.toggle('high-contrast', isHighContrast);
    }, [isHighContrast]);
    
    // --- HANDLERS ---
    /**
     * Triggers the login modal if the user is not authenticated.
     * This function is passed to components with interactive elements.
     */
    const requestLogin = () => {
        if (!user) {
            setLoginModalOpen(true);
        }
    }

    /**
     * Handles the successful login event.
     * @param {User} loggedInUser - The user object returned from the login process.
     * @todo Replace MOCK_USERS logic in LoginModal with a real API call.
     */
    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
        setLoginModalOpen(false);
        // Redirect candidates to their dashboard upon login.
        if (loggedInUser.role === UserRole.Candidate) {
            setActiveTab(AppTab.Dashboard);
        } else {
            setActiveTab(AppTab.Home);
        }
    };
    
    /**
     * Handles navigation to a specific candidate's profile page.
     */
    const handleSelectCandidate = (candidate: User) => {
        setViewingCandidate(candidate);
        setActiveTab(AppTab.CandidateProfile);
    };
    
    /**
     * Handles primary navigation via the sidebar.
     * Resets sub-views like the candidate profile when navigating away.
     */
    const handleNavigate = (tab: AppTab) => {
        if (tab === AppTab.CandidateProfile) {
            // Prevent direct navigation to the generic profile tab.
            return;
        }
        setViewingCandidate(null); // Clear specific candidate view
        setActiveTab(tab);
    }
    
    /**
     * Opens the compose modal, requesting login if the user is a guest.
     */
    const handleCompose = () => {
        if (!user) {
            requestLogin();
            return;
        }
        setComposeOpen(true);
    };

    /**
     * Handles opening the full-screen reel player.
     * @param {Post} reel - The reel post to be displayed.
     */
    const handleSelectReel = (reel: Post) => {
        if (!user) {
            requestLogin();
        } else {
            setViewingReel(reel);
        }
    };

    /**
     * Closes the full-screen reel player.
     */
    const handleCloseReel = () => {
        setViewingReel(null);
    };

    /**
     * Renders the main content view based on the activeTab state.
     * This acts as a simple client-side router.
     */
    const renderView = () => {
        // Special case for deep-linked views like candidate profiles.
        if (activeTab === AppTab.CandidateProfile && viewingCandidate) {
            return <CandidateProfileView candidate={viewingCandidate} user={user} requestLogin={requestLogin} />;
        }
        
        switch (activeTab) {
            case AppTab.Dashboard:
                // Protected view: only render if the user is a candidate.
                return user?.role === UserRole.Candidate 
                    ? <CandidateDashboardView user={user} />
                    : <HomeView user={user} requestLogin={requestLogin} selectedGovernorate={selectedGovernorate} onSelectCandidate={handleSelectCandidate} onSelectReel={handleSelectReel} language={language} onLanguageChange={setLanguage} />;
            case AppTab.Settings:
                return <SettingsView isHighContrast={isHighContrast} onToggleContrast={() => setHighContrast(p => !p)} />;
             case AppTab.DebateRoom:
                return <DebateRoomView />;
            case AppTab.Home:
            default:
                return <HomeView user={user} requestLogin={requestLogin} selectedGovernorate={selectedGovernorate} onSelectCandidate={handleSelectCandidate} onSelectReel={handleSelectReel} language={language} onLanguageChange={setLanguage} />;
        }
    };

    return (
        <div className="bg-neutral-gray-light dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <Header 
                user={user} 
                onCompose={handleCompose}
                onRequestLogin={requestLogin}
                selectedGovernorate={selectedGovernorate}
                onGovernorateChange={setSelectedGovernorate}
            />
            
            <Sidebar 
                userRole={user?.role}
                activeTab={activeTab}
                onNavigate={handleNavigate}
            />

            <main className="pt-16 lg:pl-64">
                {renderView()}
            </main>

            {/* Modal Overlays */}
            {viewingReel && (
                <FullScreenReelView 
                    reel={viewingReel} 
                    onClose={handleCloseReel}
                    user={user}
                    requestLogin={requestLogin}
                />
            )}
            
            {isLoginModalOpen && (
                <LoginModal 
                    onLogin={handleLogin} 
                    onClose={() => setLoginModalOpen(false)}
                    language={language}
                    onLanguageChange={setLanguage}
                />
            )}

            {isComposeOpen && user && (
                <ComposeModal user={user} onClose={() => setComposeOpen(false)} />
            )}
        </div>
    );
}

export default App;
