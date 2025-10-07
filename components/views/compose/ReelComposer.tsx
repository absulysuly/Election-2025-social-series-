
import React, { useState } from 'react';
import { User } from '../../../types.ts';
import { VideoIcon } from '../../icons/Icons.tsx';

interface ReelComposerProps {
    user: User;
    onCreateReel: (reelDetails: { caption: string; videoFile?: File }) => void;
}

const ReelComposer: React.FC<ReelComposerProps> = ({ user, onCreateReel }) => {
    const [caption, setCaption] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
            // In a real app, you would handle the file object itself, e.g., by setting it to state.
            // TODO: Add file handling logic to pass the file to the apiService.
        }
    };
    
    const handleSubmit = () => {
        if (caption.trim()) {
            // The `onCreateReel` prop is connected to the apiService in HomeView.
            onCreateReel({ caption });
            setCaption('');
            setFileName('');
        }
    };

    return (
        <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-4">
            <div className="flex space-x-4">
                <img className="w-12 h-12 rounded-full" src={user.avatarUrl} alt={user.name} />
                <div className="w-full space-y-3">
                     <p className="font-semibold">Create a New Reel</p>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full p-2 border-none rounded-md bg-transparent focus:ring-0 placeholder-neutral-gray-dark dark:placeholder-gray-400"
                        rows={2}
                        placeholder="Reel caption..."
                    />
                    <div className="border-t border-neutral-gray-light dark:border-gray-700 my-2"></div>
                    <label className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-semibold text-action-blue bg-action-blue/10 rounded-md hover:bg-action-blue/20 cursor-pointer">
                        <VideoIcon className="w-5 h-5"/>
                        <span>{fileName || 'Upload Video'}</span>
                        <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                    </label>
                </div>
            </div>
            <div className="flex justify-end items-center mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={!caption.trim()}
                    className="px-6 py-2 font-bold text-white bg-action-blue rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    Post Reel
                </button>
            </div>
        </div>
    );
};

export default ReelComposer;
