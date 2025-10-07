
import React, { useState } from 'react';
import { User } from '../../../types.ts';
import { CalendarIcon } from '../../icons/Icons.tsx';

interface EventComposerProps {
    user: User;
    onCreateEvent: (eventDetails: { title: string; date: string; location: string }) => void;
}

const EventComposer: React.FC<EventComposerProps> = ({ user, onCreateEvent }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = () => {
        if (title.trim() && date && location.trim()) {
            // The `onCreateEvent` prop is connected to the apiService in HomeView.
            onCreateEvent({ title, date, location });
            setTitle('');
            setDate('');
            setLocation('');
        }
    };

    return (
        <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-4">
            <div className="flex space-x-4">
                <img className="w-12 h-12 rounded-full" src={user.avatarUrl} alt={user.name} />
                <div className="w-full space-y-3">
                    <p className="font-semibold">Create a New Event</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Event Title"
                        className="w-full p-2 text-sm border border-neutral-gray-medium dark:border-gray-600 rounded-md bg-neutral-gray-light dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-action-blue"
                    />
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Event Date and Time"
                        className="w-full p-2 text-sm border border-neutral-gray-medium dark:border-gray-600 rounded-md bg-neutral-gray-light dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-action-blue"
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location (e.g., Baghdad Community Hall)"
                        className="w-full p-2 text-sm border border-neutral-gray-medium dark:border-gray-600 rounded-md bg-neutral-gray-light dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-action-blue"
                    />
                </div>
            </div>
            <div className="flex justify-end items-center mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={!title.trim() || !date || !location.trim()}
                    className="flex items-center space-x-2 px-6 py-2 font-bold text-white bg-action-blue rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    <CalendarIcon className="w-5 h-5" />
                    <span>Create Event</span>
                </button>
            </div>
        </div>
    );
};

export default EventComposer;
