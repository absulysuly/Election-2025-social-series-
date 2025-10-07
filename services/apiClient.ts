const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RAW_USE_MOCKS = import.meta.env.VITE_USE_MOCKS;

const DEFAULT_USE_MOCKS = true;

const shouldUseMocks = (): boolean => {
    if (typeof RAW_USE_MOCKS === 'string') {
        return !(RAW_USE_MOCKS.toLowerCase() === 'false' || RAW_USE_MOCKS === '0');
    }
    return DEFAULT_USE_MOCKS;
};

const buildUrl = (path: string) => {
    if (!API_BASE_URL) {
        throw new Error('API_BASE_URL is not configured');
    }
    return `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

export interface ApiRequestOptions extends RequestInit {
    disableMockFallback?: boolean;
}

export async function apiRequest<T>(
    path: string,
    mockFetcher: () => Promise<T>,
    options: ApiRequestOptions = {}
): Promise<T> {
    const useMocks = shouldUseMocks();

    if (!useMocks || options.disableMockFallback) {
        if (!API_BASE_URL) {
            console.warn('API_BASE_URL missing; falling back to mock data for', path);
        } else {
            try {
                const response = await fetch(buildUrl(path), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(options.headers || {}),
                    },
                    ...options,
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                return (await response.json()) as T;
            } catch (error) {
                if (options.disableMockFallback) {
                    throw error;
                }
                console.warn(`Request to ${path} failed; using mock data instead.`, error);
            }
        }
    }

    return mockFetcher();
}

export const apiConfig = {
    get baseUrl() {
        return API_BASE_URL;
    },
    get useMocks() {
        return shouldUseMocks();
    },
};
