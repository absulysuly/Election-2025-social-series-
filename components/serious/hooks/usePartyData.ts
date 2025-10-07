import { useState, useEffect } from 'react';
import { getPartyData } from '../services/api';
import type { Party, Candidate } from '../types';

interface PartyData {
    party: Party;
    candidates: Candidate[];
}

export const usePartyData = (partyId: string | undefined) => {
    const [data, setData] = useState<PartyData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!partyId) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await getPartyData(partyId);
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [partyId]);

    return { data, isLoading, error };
};
