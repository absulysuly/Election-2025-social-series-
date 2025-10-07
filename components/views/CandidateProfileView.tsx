
// Fix: Populating components/views/CandidateProfileView.tsx with a public candidate profile.
import React, { useState, useEffect } from 'react';
import { User, UserRole, Post } from '../../types.ts';
import { VerifiedIcon, WhatsAppIcon, PhoneIcon, EmailIcon, MessageIcon } from '../icons/Icons.tsx';
import PostCard from '../PostCard.tsx';
import * as api from '../../services/apiService.ts';

interface CandidateProfileViewProps {
    candidate: User;
    user: User | null;
    requestLogin: () => void;
}

const CandidateProfileView: React.FC<CandidateProfileViewProps> = ({ candidate, user, requestLogin }) => {
    const [candidatePosts, setCandidatePosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (candidate.role !== UserRole.Candidate) return;

        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const posts = await api.getPosts({ authorId: candidate.id });
                setCandidatePosts(posts);
            } catch (error) {
                console.error("Failed to fetch candidate posts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [candidate.id, candidate.role]);

    if (candidate.role !== UserRole.Candidate) {
        return <p className="p-6 text-center">This profile is not a candidate.</p>;
    }
    
    const handleInteraction = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            requestLogin();
        }
        // TODO: Wire up contact actions to backend
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 overflow-hidden mb-6">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <img className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-md" src={candidate.avatarUrl} alt={candidate.name} />
                        <div>
                            <h2 className="text-2xl font-bold flex items-center">
                                {candidate.name}
                                {candidate.verified && <VerifiedIcon className="w-6 h-6 text-action-blue ml-2" />}
                            </h2>
                            <p className="text-md text-neutral-gray-dark dark:text-gray-400">{candidate.party} - {candidate.governorate}</p>
                            <p className="text-sm mt-2">{candidate.bio || 'This candidate has not provided a biography.'}</p>
                            <div className="flex space-x-2 mt-4">
                                <button onClick={handleInteraction} className="p-2 bg-neutral-gray-light dark:bg-gray-700 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600"><WhatsAppIcon className="w-5 h-5" /></button>
                                <button onClick={handleInteraction} className="p-2 bg-neutral-gray-light dark:bg-gray-700 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600"><PhoneIcon className="w-5 h-5" /></button>
                                <button onClick={handleInteraction} className="p-2 bg-neutral-gray-light dark:bg-gray-700 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600"><EmailIcon className="w-5 h-5" /></button>
                                <button onClick={handleInteraction} className="p-2 bg-neutral-gray-light dark:bg-gray-700 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600"><MessageIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4">Posts by {candidate.name}</h3>
                {isLoading ? (
                    <p className="text-center py-10 text-neutral-gray-dark">Loading posts...</p>
                ) : candidatePosts.length > 0 ? (
                    candidatePosts.map(post => <PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} />)
                ) : (
                    <p className="text-center py-10 text-neutral-gray-dark">This candidate has not posted yet.</p>
                )}
            </div>
        </div>
    );
};

export default CandidateProfileView;
