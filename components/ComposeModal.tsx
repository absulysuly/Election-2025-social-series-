
import React from 'react';
// Fix: added .ts extension to types import
import { User } from '../types.ts';
// Fix: added .tsx extension to Icons import
import { XMarkIcon } from './icons/Icons.tsx';
// Fix: added .tsx extension to ComposeView import
import ComposeView from './views/ComposeView.tsx';

interface ComposeModalProps {
    user: User;
    onClose: () => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ user, onClose }) => {
    const handlePost = (content: string) => {
        console.log("New post created:", content);
        // In a real app, this would call an API to save the post.
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4">
            <div 
                className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex justify-between items-center p-4 border-b border-neutral-gray-medium dark:border-gray-700">
                    <h2 className="text-xl font-bold">Compose Post</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-gray-light dark:hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-2">
                    <ComposeView user={user} onPost={handlePost} />
                </div>
            </div>
        </div>
    );
};

export default ComposeModal;
