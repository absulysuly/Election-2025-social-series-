import React from 'react';
import { User } from '../types.ts';

interface StoriesProps {
    users: User[];
}

const StoryItem: React.FC<{ user: User }> = ({ user }) => (
    <button
        onClick={() => alert(`Viewing stories for ${user.name}`)}
        className="flex flex-col items-center space-y-2 flex-shrink-0 w-20 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-action-blue focus:ring-offset-2 dark:focus:ring-offset-neutral-gray-light rounded-lg p-1"
        aria-label={`View stories by ${user.name}`}
    >
        <div className="relative">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-yellow-400 via-flag-red to-purple-600">
                 <img 
                    className="w-full h-full rounded-full object-cover border-2 border-neutral-gray-light dark:border-gray-800"
                    src={user.avatarUrl} 
                    alt="" 
                 />
            </div>
        </div>
        <p className="text-xs text-center text-gray-800 dark:text-gray-200 truncate w-full">{user.name}</p>
    </button>
);


const Stories: React.FC<StoriesProps> = ({ users }) => {
    return (
        <div className="w-full">
            <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6 no-scrollbar">
                {users.map(user => (
                    <StoryItem key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Stories;