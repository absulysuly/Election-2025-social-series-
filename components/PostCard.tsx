
import React, { useState } from 'react';
import { Post, User } from '../types.ts';
import { VerifiedIcon, HeartIcon, CommentIcon, ShareIcon, DonateIcon, MoreIcon } from './icons/Icons.tsx';
import * as api from '../services/apiService.ts';

interface PostCardProps {
    post: Post;
    user: User | null;
    requestLogin: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, user, requestLogin }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleInteraction = (e: React.MouseEvent, action: () => void) => {
        if (!user) {
            e.preventDefault();
            requestLogin();
        } else {
            action();
        }
    };
    
    // TODO: Add UI feedback (e.g., loading spinners, success states) for these actions.
    const handleLike = () => api.likePost(post.id).then(() => console.log('Liked post'));
    const handleComment = () => console.log('Comment action placeholder');
    const handleShare = () => console.log('Share action placeholder');
    const handleDonate = () => console.log('Donate action placeholder');

    const handleReport = () => {
        if (!user) {
            requestLogin();
            return;
        }
        console.log(`Post ${post.id} reported.`);
        setMenuOpen(false);
    };

    return (
        <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 mb-6">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img className="w-11 h-11 rounded-full" src={post.author.avatarUrl} alt={post.author.name} />
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                                {post.author.name}
                                {post.author.verified && <VerifiedIcon className="w-4 h-4 text-action-blue ml-1.5" />}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-neutral-gray-light dark:hover:bg-gray-700">
                            <MoreIcon className="w-5 h-5 text-gray-500" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-neutral-gray-medium dark:border-gray-700">
                                <button onClick={handleReport} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Report Post
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <p className="my-4 text-gray-800 dark:text-gray-200 text-sm whitespace-pre-line">{post.content}</p>

                {post.isSponsored && <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Sponsored</p>}
            </div>

            {post.mediaUrl && (
                <div className="bg-gray-200 dark:bg-gray-700">
                     <img className="w-full object-cover max-h-96" src={post.mediaUrl} alt="Post media" />
                </div>
            )}

            <div className="p-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                        <HeartIcon className="w-4 h-4 text-flag-red" />
                        <span className="text-xs">{post.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                    </div>
                </div>

                <div className="border-t border-neutral-gray-light dark:border-gray-700 my-2"></div>

                <div className="flex justify-around items-center">
                    <button onClick={(e) => handleInteraction(e, handleLike)} className="flex items-center space-x-2 py-2 px-4 rounded-lg w-full justify-center hover:bg-neutral-gray-light dark:hover:bg-gray-700 transition-colors">
                        <HeartIcon className="w-6 h-6" />
                        <span className="font-semibold text-sm">Like</span>
                    </button>
                     <button onClick={(e) => handleInteraction(e, handleComment)} className="flex items-center space-x-2 py-2 px-4 rounded-lg w-full justify-center hover:bg-neutral-gray-light dark:hover:bg-gray-700 transition-colors">
                        <CommentIcon className="w-6 h-6" />
                        <span className="font-semibold text-sm">Comment</span>
                    </button>
                     <button onClick={(e) => handleInteraction(e, handleShare)} className="flex items-center space-x-2 py-2 px-4 rounded-lg w-full justify-center hover:bg-neutral-gray-light dark:hover:bg-gray-700 transition-colors">
                        <ShareIcon className="w-6 h-6" />
                        <span className="font-semibold text-sm">Share</span>
                    </button>
                    <button onClick={(e) => handleInteraction(e, handleDonate)} className="flex items-center space-x-2 py-2 px-4 rounded-lg w-full justify-center hover:bg-flag-green/10 text-flag-green transition-colors">
                        <DonateIcon className="w-6 h-6" />
                        <span className="font-semibold text-sm">Donate</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
