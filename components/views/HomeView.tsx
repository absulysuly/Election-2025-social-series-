
// Fix: Populating components/views/HomeView.tsx with the main feed view.
import React, { useState, useEffect } from 'react';
import { User, UserRole, Governorate, Language, MainContentTab, AppTab, Post, Event } from '../../types.ts';
import { UI_TEXT } from '../../translations.ts';
import * as api from '../../services/apiService.ts';

import HeroSection from '../HeroSection.tsx';
import Stories from '../Stories.tsx';
import ComposeView from './ComposeView.tsx';
import PostCard from '../PostCard.tsx';
import SeriousnessView from './SeriousnessView.tsx';
import TopNavBar from '../TopNavBar.tsx';
import LanguageSwitcher from '../LanguageSwitcher.tsx';

import ReelsView from './ReelsView.tsx';
import CandidatesView from './CandidatesView.tsx';
import DebatesView from './DebatesView.tsx';
import EventsView from './EventsView.tsx';
import ReelComposer from './compose/ReelComposer.tsx';
import EventComposer from './compose/EventComposer.tsx';


interface HomeViewProps {
    user: User | null;
    requestLogin: () => void;
    selectedGovernorate: Governorate | 'All';
    onSelectCandidate: (candidate: User) => void;
    onSelectReel: (reel: Post) => void;
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

type HomeTab = 'Social' | 'Serious';

const HomeView: React.FC<HomeViewProps> = ({ user, requestLogin, selectedGovernorate, onSelectCandidate, onSelectReel, language, onLanguageChange }) => {
    const [socialTab, setSocialTab] = useState<HomeTab>('Social');
    const [mainTab, setMainTab] = useState<MainContentTab>(AppTab.Posts);
    
    // --- STATE FOR ASYNC DATA ---
    const [socialPosts, setSocialPosts] = useState<Post[]>([]);
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- DATA FETCHING ---
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const postsPromise = api.getPosts({ type: 'Post', governorate: selectedGovernorate });
                const candidatesPromise = api.getUsers({ role: UserRole.Candidate, governorate: selectedGovernorate });
                const [postsData, candidatesData] = await Promise.all([postsPromise, candidatesPromise]);
                setSocialPosts(postsData);
                setCandidates(candidatesData);
            } catch (error) {
                console.error("Failed to fetch home view data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedGovernorate]);

    // --- API HANDLERS ---
    const handlePost = (content: string) => {
        if (!user) return;
        // TODO: Add UI feedback for post creation
        api.createPost(content, user).then(newPost => {
            // Optimistically add the new post to the top of the feed
            setSocialPosts(prevPosts => [newPost, ...prevPosts]);
        });
    };
    
    const handleCreateReel = (details: { caption: string }) => {
        if (!user) return;
        api.createReel(details, user).then(newReel => {
            console.log("New reel created:", newReel);
            // TODO: In a real app, you would likely navigate to the reels tab
            // or show a success message, and the reels view would re-fetch.
        });
    };

    const handleCreateEvent = (details: { title: string, date: string, location: string }) => {
        if (!user) return;
        api.createEvent(details, user).then(newEvent => {
            console.log("New event created:", newEvent);
             // TODO: Similar to reels, show success and let the events view re-fetch.
        });
    };

    const handleFollow = (e: React.MouseEvent, candidateId: string) => {
        if (!user) {
            e.preventDefault();
            requestLogin();
        } else {
            api.followCandidate(candidateId);
            // TODO: Add UI feedback for follow action
        }
    };

    // --- DERIVED DATA ---
    const candidatesToFollow = candidates.filter(c => c.id !== user?.id).slice(0, 3);

    // --- LOCALIZATION ---
    const texts = UI_TEXT[language];
    const socialTabLabel = texts.social as HomeTab;
    const seriousTabLabel = texts.serious as HomeTab;
    
    const mainTabs: MainContentTab[] = [AppTab.Posts, AppTab.Reels, AppTab.Candidates, AppTab.Debates, AppTab.Events];
    
    // --- RENDER LOGIC ---
    const renderComposer = () => {
        if (!user || user.role !== UserRole.Candidate) {
            return null; // Only candidates can compose content.
        }

        switch (mainTab) {
            case AppTab.Posts:
                return <ComposeView user={user} onPost={handlePost} />;
            case AppTab.Reels:
                return <ReelComposer user={user} onCreateReel={handleCreateReel} />;
            case AppTab.Events:
                return <EventComposer user={user} onCreateEvent={handleCreateEvent} />;
            default:
                return null;
        }
    };

    const renderMainContent = () => {
        if (isLoading) {
            return <div className="text-center py-10">Loading...</div>;
        }

        switch (mainTab) {
            case AppTab.Posts:
                return (
                    <div className="mt-4">
                        <div>
                            {socialPosts.length > 0 
                                ? socialPosts.map(post => <PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} />)
                                : <p className="text-center py-10 text-neutral-gray-dark">No posts found for this area.</p>
                            }
                        </div>
                    </div>
                );
            case AppTab.Reels:
                return <ReelsView selectedGovernorate={selectedGovernorate} onSelectReel={onSelectReel} user={user} requestLogin={requestLogin} />;
            case AppTab.Candidates:
                return <CandidatesView selectedGovernorate={selectedGovernorate} onSelectCandidate={onSelectCandidate} user={user} requestLogin={requestLogin} />;
            case AppTab.Debates:
                return <DebatesView selectedGovernorate={selectedGovernorate} />;
            case AppTab.Events:
                return <EventsView selectedGovernorate={selectedGovernorate} />;
            default:
                return null;
        }
    };

    return (
        <div className={`grid grid-cols-1 ${socialTab === 'Serious' ? 'lg:grid-cols-1' : 'lg:grid-cols-4'} gap-6 p-4 sm:p-6`}>
            {/* Main Content Column */}
            <main className={socialTab === 'Serious' ? 'lg:col-span-1' : 'lg:col-span-3'}>
                <div className="mb-4">
                    <TopNavBar<HomeTab>
                        tabs={[socialTabLabel, seriousTabLabel]}
                        activeTab={socialTab === 'Social' ? socialTabLabel : seriousTabLabel}
                        onTabChange={(tab) => setSocialTab(tab === socialTabLabel ? 'Social' : 'Serious')}
                    />
                </div>

                {socialTab === 'Serious' ? (
                    <div className="mt-4">
                        <SeriousnessView selectedGovernorate={selectedGovernorate} />
                    </div>
                ) : (
                    <>
                        <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
                        <HeroSection />
                        <div className="mt-2">
                            <Stories users={candidates} />
                        </div>

                        <div className="mt-2 sticky top-16 bg-neutral-gray-light dark:bg-gray-900 z-20 py-2 -my-2">
                            <TopNavBar<MainContentTab>
                                tabs={mainTabs}
                                activeTab={mainTab}
                                onTabChange={setMainTab}
                            />
                        </div>

                        <div className="my-4">
                            {renderComposer()}
                        </div>

                        {renderMainContent()}
                    </>
                )}
            </main>

            {/* Right Sidebar (Desktop) */}
            {socialTab === 'Social' && (
                <aside className="hidden lg:block lg:col-span-1 space-y-6">
                    <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-4">
                        <h3 className="font-bold mb-3">{texts.whoToFollow}</h3>
                        <div className="space-y-3">
                            {candidatesToFollow.length > 0 ? candidatesToFollow.map(candidate => (
                                <div key={candidate.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectCandidate(candidate)}>
                                        <img src={candidate.avatarUrl} alt={candidate.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold text-sm">{candidate.name}</p>
                                            <p className="text-xs text-neutral-gray-dark dark:text-gray-400">{candidate.party}</p>
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleFollow(e, candidate.id)} className="px-3 py-1 text-xs font-semibold text-white bg-action-blue rounded-full hover:bg-blue-700">Follow</button>
                                </div>
                            )) : <p className="text-xs text-neutral-gray-dark dark:text-gray-400">No candidates to show for this governorate.</p>}
                        </div>
                    </div>

                    <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-4">
                        <h3 className="font-bold mb-3">{texts.platformRules}</h3>
                        <ul className="text-sm space-y-2 text-neutral-gray-dark dark:text-gray-400 list-disc list-inside">
                            <li>{texts.rule1}</li>
                            <li>{texts.rule2}</li>
                            <li>{texts.rule3}</li>
                            <li>{texts.rule4}</li>
                        </ul>
                    </div>
                </aside>
            )}
        </div>
    );
}

export default HomeView;
