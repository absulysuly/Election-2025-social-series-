
// Fix: Populating components/views/CandidatesView.tsx with a list of candidates.
import React, { useState, useEffect } from 'react';
import { Governorate, User, UserRole, GOVERNORATES } from '../../types.ts';
import CandidatePill from '../CandidatePill.tsx';
import { ChevronDownIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';

interface CandidatesViewProps {
    selectedGovernorate: Governorate | 'All';
    onSelectCandidate: (candidate: User) => void;
    user: User | null;
    requestLogin: () => void;
}

const CandidatesView: React.FC<CandidatesViewProps> = ({ selectedGovernorate, onSelectCandidate, user, requestLogin }) => {
    const [filterGovernorate, setFilterGovernorate] = useState<Governorate | 'All'>(selectedGovernorate);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);
            try {
                const users = await api.getUsers({
                    role: UserRole.Candidate,
                    governorate: filterGovernorate,
                });
                setCandidates(users);
            } catch (error) {
                console.error("Failed to fetch candidates:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCandidates();
    }, [filterGovernorate]);


    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h2 className="text-2xl font-bold">Candidates</h2>
                <div className="relative mt-4 sm:mt-0 w-full sm:w-64">
                    <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="w-full flex justify-between items-center p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <span>{filterGovernorate}</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-neutral-gray-medium dark:border-gray-700 max-h-60 overflow-y-auto">
                            <a onClick={() => { setFilterGovernorate('All'); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">All Governorates</a>
                            {GOVERNORATES.map(gov => (
                                 <a key={gov} onClick={() => { setFilterGovernorate(gov); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{gov}</a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
             {isLoading ? (
                <p className="text-gray-500 col-span-full text-center mt-8">Loading candidates...</p>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidates.length > 0 ? (
                        candidates.map(candidate => (
                            <CandidatePill 
                                key={candidate.id} 
                                candidate={candidate} 
                                onSelect={onSelectCandidate} 
                                user={user}
                                requestLogin={requestLogin}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center mt-8">No candidates found for {filterGovernorate}.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CandidatesView;
