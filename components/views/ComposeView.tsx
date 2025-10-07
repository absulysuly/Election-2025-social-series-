
import React, { useState } from 'react';
// Fix: added .ts extension to types import
import { User } from '../../types.ts';
// Fix: added .tsx extension to Icons import
import { SparklesIcon, PhotoIcon, VideoIcon } from '../icons/Icons.tsx';
// Fix: added .ts extension to geminiService import
import { generatePostSuggestion } from '../../services/geminiService.ts';

interface ComposeViewProps {
    user: User;
    onPost: (content: string) => void;
}

const ComposeView: React.FC<ComposeViewProps> = ({ user, onPost }) => {
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateSuggestion = async () => {
        if (!topic) {
            alert("Please enter a topic for the post suggestion.");
            return;
        }
        setIsGenerating(true);
        // This service call currently uses the client-side Gemini API.
        // See the security warning in `services/geminiService.ts`.
        const suggestion = await generatePostSuggestion(topic);
        setContent(suggestion);
        setIsGenerating(false);
    };

    const handlePost = () => {
        if (content.trim()) {
            // TODO: Integrate with backend API to save the post.
            // The `onPost` prop currently just logs to the console in HomeView.
            // This should be updated to make an API request.
            onPost(content);
            setContent('');
            setTopic('');
        }
    };

    return (
        <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-4">
            <div className="flex space-x-4">
                <img className="w-12 h-12 rounded-full" src={user.avatarUrl} alt={user.name} />
                <div className="w-full">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border-none rounded-md bg-transparent focus:ring-0 text-lg placeholder-neutral-gray-dark dark:placeholder-gray-400"
                        rows={5}
                        placeholder="What's on your mind?"
                    />
                     <div className="border-t border-neutral-gray-light dark:border-gray-700 my-2"></div>
                     <div className="flex flex-col sm:flex-row gap-2">
                         <input 
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Or enter a topic for AI..."
                            className="flex-grow p-2 text-sm border border-neutral-gray-medium dark:border-gray-600 rounded-md bg-neutral-gray-light dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-action-blue"
                         />
                         <button
                            onClick={handleGenerateSuggestion}
                            disabled={isGenerating}
                            className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-semibold text-action-blue bg-action-blue/10 rounded-md hover:bg-action-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                            <SparklesIcon className="w-4 h-4"/>
                            <span>{isGenerating ? 'Generating...' : 'Get Suggestion'}</span>
                         </button>
                     </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                    {/* TODO: Implement image and video upload functionality. */}
                    <button className="p-2 rounded-full hover:bg-neutral-gray-light dark:hover:bg-gray-700 text-gray-500"><PhotoIcon className="w-6 h-6"/></button>
                    <button className="p-2 rounded-full hover:bg-neutral-gray-light dark:hover:bg-gray-700 text-gray-500"><VideoIcon className="w-6 h-6"/></button>
                </div>
                <button
                    onClick={handlePost}
                    disabled={!content.trim()}
                    className="px-6 py-2 font-bold text-white bg-action-blue rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default ComposeView;
