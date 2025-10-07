
import React, { useState, useEffect } from 'react';
import { Governorate, Debate, UserRole, User } from '../../types.ts';
import { DebateIcon, CalendarIcon, ChevronDownIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';

interface DebatesViewProps {
    selectedGovernorate: Governorate | 'All';
}

const DebateCard: React.FC<{ debate: Debate }> = ({ debate }) => {
    const debateDate = new Date(debate.scheduledTime);
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' };
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };

    return (
        <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 overflow-hidden">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{debate.title}</h3>
                    {debate.isLive && (
                        <span className="flex items-center text-xs font-bold text-white bg-flag-red px-2 py-1 rounded-full">
                            <span className="w-2 h-2 mr-1.5 bg-white rounded-full animate-pulse"></span>
                            LIVE
                        </span>
                    )}
                </div>
                <p className="text-sm text-neutral-gray-dark dark:text-gray-400 mt-1">{debate.topic}</p>

                <div className="mt-4 flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <CalendarIcon className="w-5 h-5 flex-shrink-0" />
                    <span>{debateDate.toLocaleDateString(undefined, dateOptions)} at {debateDate.toLocaleTimeString(undefined, timeOptions)}</span>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Participants:</p>
                    <div className="flex -space-x-2">
                        {debate.participants.map(p => (
                            <img key={p.id} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src={p.avatarUrl} alt={p.name} title={p.name} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-neutral-gray-light dark:bg-gray-700/50 px-5 py-3">
                <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-action-blue rounded-full hover:bg-blue-700 flex items-center justify-center space-x-2">
                    <DebateIcon className="w-5 h-5" />
                    <span>{debate.isLive ? 'Join Live Debate' : 'Set Reminder'}</span>
                </button>
            </div>
        </div>
    );
};


const DebatesView: React.FC<DebatesViewProps> = ({ selectedGovernorate }) => {
    const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const [allCandidates, setAllCandidates] = useState<User[]>([]);
    const [filteredDebates, setFilteredDebates] = useState<Debate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.getUsers({ role: UserRole.Candidate }).then(setAllCandidates);
    }, []);

    useEffect(() => {
        const fetchDebates = async () => {
            setIsLoading(true);
            try {
                const debates = await api.getDebates({
                    governorate: selectedGovernorate,
                    participantIds: selectedCandidateIds,
                });
                setFilteredDebates(debates);
            } catch (error) {
                console.error("Failed to fetch debates:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDebates();
    }, [selectedGovernorate, selectedCandidateIds]);
    
    const handleCandidateSelection = (candidateId: string) => {
        setSelectedCandidateIds(prev =>
            prev.includes(candidateId)
                ? prev.filter(id => id !== candidateId)
                : [...prev, candidateId]
        );
    };

    const selectedCandidates = allCandidates.filter(c => selectedCandidateIds.includes(c.id));

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h2 className="text-2xl font-bold">Upcoming Debates</h2>

                {/* Candidate Filter */}
                <div className="relative mt-4 sm:mt-0 w-full sm:w-72">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full flex justify-between items-center p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <span className="truncate pr-2">
                            {selectedCandidates.length > 0 ? selectedCandidates.map(c => c.name).join(', ') : 'Filter by candidate...'}
                        </span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isFilterOpen && (
                        <div className="absolute z-10 top-full mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-600 max-h-60 overflow-y-auto">
                           {selectedCandidateIds.length > 0 && (
                                <button
                                    onClick={() => setSelectedCandidateIds([])}
                                    className="w-full text-left px-3 py-2 text-sm font-semibold text-action-blue hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-600"
                                >
                                    Clear Selection
                                </button>
                           )}
                            {allCandidates.map(candidate => (
                                <label key={candidate.id} className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCandidateIds.includes(candidate.id)}
                                        onChange={() => handleCandidateSelection(candidate.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-action-blue focus:ring-action-blue"
                                    />
                                    <img src={candidate.avatarUrl} alt={candidate.name} className="w-6 h-6 rounded-full mx-2" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{candidate.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isLoading ? (
                <p className="text-gray-500 col-span-full text-center mt-8">Loading debates...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDebates.length > 0 ? (
                        filteredDebates.map(debate => <DebateCard key={debate.id} debate={debate} />)
                    ) : (
                        <p className="text-gray-500 col-span-full text-center mt-8">
                            No debates found for the selected filters.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DebatesView;
