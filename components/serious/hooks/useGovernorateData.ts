import { useState, useEffect } from 'react';
import { getGovernorateData } from '../services/api';
import type { GovernorateData } from '../types';

/**
 * Custom hook to fetch and manage data for a specific governorate.
 * This hook encapsulates the logic for loading, error handling, and
 * caching (though caching is not implemented here for simplicity).
 * It uses the data access layer in `services/api.ts` to communicate
 * with the Windsurf backend.
 *
 * @param governorateName - The lowercase English name of the governorate.
 * @returns An object containing the governorate data, loading state, and any error.
 */
export const useGovernorateData = (governorateName: string | undefined) => {
    const [data, setData] = useState<GovernorateData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!governorateName) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await getGovernorateData(governorateName);
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [governorateName]);

    return { data, isLoading, error };
};