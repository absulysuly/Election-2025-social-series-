
import React, { useState, useEffect } from 'react';
import { Governorate, Event } from '../../types.ts';
import { CalendarIcon, LocationIcon, ShareIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';

interface EventsViewProps {
    selectedGovernorate: Governorate | 'All';
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const eventDate = new Date(event.date);
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    return (
        <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 overflow-hidden">
            <div className="p-5">
                <p className="text-sm font-semibold text-flag-red">{eventDate.toLocaleDateString(undefined, dateOptions).toUpperCase()}</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{event.title}</h3>
                <div className="mt-3 flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <CalendarIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{eventDate.toLocaleTimeString(undefined, timeOptions)}</span>
                </div>
                 <div className="mt-2 flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <LocationIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <img className="w-8 h-8 rounded-full" src={event.organizer.avatarUrl} alt={event.organizer.name} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{event.organizer.name}</span>
                </div>
            </div>
            <div className="bg-neutral-gray-light dark:bg-gray-700/50 px-5 py-3 flex justify-between items-center">
                 <button className="px-4 py-2 text-sm font-semibold text-white bg-action-blue rounded-full hover:bg-blue-700">
                    RSVP
                </button>
                 <button className="p-2 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600">
                    <ShareIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
            </div>
        </div>
    );
};

const EventsView: React.FC<EventsViewProps> = ({ selectedGovernorate }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const data = await api.getEvents({ governorate: selectedGovernorate });
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, [selectedGovernorate]);


    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            {isLoading ? (
                 <p className="text-gray-500 col-span-full text-center mt-8">Loading events...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 ? (
                        events.map(event => <EventCard key={event.id} event={event} />)
                    ) : (
                        <p className="text-gray-500 col-span-full text-center mt-8">No events scheduled in {selectedGovernorate}.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventsView;
