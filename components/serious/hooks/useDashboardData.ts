import { useState, useEffect } from 'react';
import { getDashboardStats, getGovernorateParticipation } from '../services/api';
import type { DashboardStats, GovernorateParticipation } from '../types';

interface DashboardData {
    stats: DashboardStats | null;
    participation: GovernorateParticipation[];
}

export const useDashboardData = () => {
    const [data, setData] = useState<DashboardData>({ stats: null, participation: [] });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch stats and participation in parallel for better performance
                const [stats, participation] = await Promise.all([
                    getDashboardStats(),
                    getGovernorateParticipation()
                ]);
                setData({ stats, participation });
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load dashboard data'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, isLoading, error };
};
