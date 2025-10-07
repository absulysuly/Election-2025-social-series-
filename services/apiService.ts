// TODO: This file simulates a backend API. Replace with actual HTTP calls to the Windsurf backend.

import { MOCK_USERS, MOCK_POSTS, MOCK_EVENTS, MOCK_DEBATES, MOCK_ARTICLES } from '../constants.ts';
import { User, UserRole, Post, Event, Debate, Article, Governorate } from '../types.ts';
import { apiRequest } from './apiClient.ts';

const LATENCY = 200; // ms to simulate network delay

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const buildQuery = (params: Record<string, string | undefined>) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            search.append(key, value);
        }
    });
    const query = search.toString();
    return query ? `?${query}` : '';
};

const mockUsers = async (filters: { role?: UserRole; governorate?: Governorate | 'All' }): Promise<User[]> => {
    await wait(LATENCY);
    let users = MOCK_USERS;
    if (filters.role) {
        users = users.filter(u => u.role === filters.role);
    }
    if (filters.governorate && filters.governorate !== 'All') {
        users = users.filter(u => u.governorate === filters.governorate);
    }
    return users;
};

const mockPosts = async (filters: { type?: 'Post' | 'Reel'; governorate?: Governorate | 'All'; authorId?: string }): Promise<Post[]> => {
    await wait(LATENCY);
    let posts = MOCK_POSTS;
    if (filters.type) {
        posts = posts.filter(p => p.type === filters.type);
    }
    if (filters.governorate && filters.governorate !== 'All') {
        posts = posts.filter(p => p.governorates.includes(filters.governorate as Governorate));
    }
    if (filters.authorId) {
        posts = posts.filter(p => p.author.id === filters.authorId);
    }
    return [...posts].sort(() => Math.random() - 0.5);
};

const mockEvents = async (filters: { governorate?: Governorate | 'All' }): Promise<Event[]> => {
    await wait(LATENCY);
    return MOCK_EVENTS.filter(event =>
        !filters.governorate || filters.governorate === 'All' || event.governorate === filters.governorate
    );
};

const mockDebates = async (filters: { governorate?: Governorate | 'All'; participantIds?: string[] }): Promise<Debate[]> => {
    await wait(LATENCY);
    let debates = MOCK_DEBATES;
    if (filters.governorate && filters.governorate !== 'All') {
        debates = debates.filter(debate => debate.participants.some(p => p.governorate === filters.governorate));
    }
    if (filters.participantIds && filters.participantIds.length > 0) {
        debates = debates.filter(debate => debate.participants.some(p => filters.participantIds!.includes(p.id)));
    }
    return debates;
};

const mockArticles = async (filters: { governorate?: Governorate | 'All' }): Promise<Article[]> => {
    await wait(LATENCY);
    return MOCK_ARTICLES.filter(article =>
        !filters.governorate || filters.governorate === 'All' || article.governorates.includes(filters.governorate as Governorate)
    );
};

// --- DATA FETCHING ---

export const getUsers = async (filters: { role?: UserRole; governorate?: Governorate | 'All' }): Promise<User[]> => {
    const query = buildQuery({
        role: filters.role,
        governorate: filters.governorate && filters.governorate !== 'All' ? filters.governorate : undefined,
    });
    return apiRequest<User[]>(`social/users${query}`, () => mockUsers(filters));
};

export const getPosts = async (filters: { type?: 'Post' | 'Reel'; governorate?: Governorate | 'All'; authorId?: string }): Promise<Post[]> => {
    const query = buildQuery({
        type: filters.type,
        governorate: filters.governorate && filters.governorate !== 'All' ? filters.governorate : undefined,
        authorId: filters.authorId,
    });
    return apiRequest<Post[]>(`social/posts${query}`, () => mockPosts(filters));
};

export const getEvents = async (filters: { governorate?: Governorate | 'All' }): Promise<Event[]> => {
    const query = buildQuery({
        governorate: filters.governorate && filters.governorate !== 'All' ? filters.governorate : undefined,
    });
    return apiRequest<Event[]>(`social/events${query}`, () => mockEvents(filters));
};

export const getDebates = async (filters: { governorate?: Governorate | 'All'; participantIds?: string[] }): Promise<Debate[]> => {
    const query = buildQuery({
        governorate: filters.governorate && filters.governorate !== 'All' ? filters.governorate : undefined,
        participantIds: filters.participantIds && filters.participantIds.length > 0 ? filters.participantIds.join(',') : undefined,
    });
    return apiRequest<Debate[]>(`social/debates${query}`, () => mockDebates(filters));
};

export const getArticles = async (filters: { governorate?: Governorate | 'All' }): Promise<Article[]> => {
    const query = buildQuery({
        governorate: filters.governorate && filters.governorate !== 'All' ? filters.governorate : undefined,
    });
    return apiRequest<Article[]>(`social/articles${query}`, () => mockArticles(filters));
};


// --- AUTHENTICATION ---

export const login = async (role: UserRole): Promise<User | null> => {
    const mockLogin = async () => {
        await wait(LATENCY);
        return MOCK_USERS.find(user => user.role === role) || null;
    };
    return apiRequest<User | null>(
        'auth/login',
        mockLogin,
        {
            method: 'POST',
            body: JSON.stringify({ role }),
        }
    );
};


// --- INTERACTIONS (PLACEHOLDERS) ---

const mockActionSuccess = async () => {
    await wait(LATENCY);
    return { success: true } as const;
};

const mockCreatePost = async (content: string, user: User): Promise<Post> => {
    await wait(LATENCY);
    return {
        id: `post-${Date.now()}`,
        author: user,
        timestamp: 'Just now',
        content,
        likes: 0,
        comments: 0,
        shares: 0,
        isSponsored: false,
        type: 'Post',
        governorates: [user.governorate],
    };
};

const mockCreateReel = async (details: { caption: string }, user: User): Promise<Post> => {
    await wait(LATENCY);
    return {
        id: `reel-${Date.now()}`,
        author: user,
        timestamp: 'Just now',
        content: details.caption,
        mediaUrl: 'https://images.unsplash.com/photo-1599518559222-1b6a71ac337d?w=400',
        likes: 0,
        comments: 0,
        shares: 0,
        isSponsored: false,
        type: 'Reel',
        governorates: [user.governorate],
    };
};

const mockCreateEvent = async (details: { title: string; date: string; location: string }, user: User): Promise<Event> => {
    await wait(LATENCY);
    return {
        id: `event-${Date.now()}`,
        title: details.title,
        date: new Date(details.date).toISOString(),
        location: details.location,
        organizer: user,
        governorate: user.governorate,
    };
};

export const followCandidate = async (candidateId: string): Promise<{ success: boolean }> =>
    apiRequest<{ success: boolean }>(
        'social/follow',
        mockActionSuccess,
        {
            method: 'POST',
            body: JSON.stringify({ candidateId }),
        }
    );

export const likePost = async (postId: string): Promise<{ success: boolean }> =>
    apiRequest<{ success: boolean }>(
        'social/like',
        mockActionSuccess,
        {
            method: 'POST',
            body: JSON.stringify({ postId }),
        }
    );

export const createPost = async (content: string, user: User): Promise<Post> =>
    apiRequest<Post>(
        'social/posts',
        () => mockCreatePost(content, user),
        {
            method: 'POST',
            body: JSON.stringify({ content }),
        }
    );

export const createReel = async (details: { caption: string }, user: User): Promise<Post> =>
    apiRequest<Post>(
        'social/reels',
        () => mockCreateReel(details, user),
        {
            method: 'POST',
            body: JSON.stringify(details),
        }
    );

export const createEvent = async (details: { title: string; date: string; location: string }, user: User): Promise<Event> =>
    apiRequest<Event>(
        'social/events',
        () => mockCreateEvent(details, user),
        {
            method: 'POST',
            body: JSON.stringify(details),
        }
    );
