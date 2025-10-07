
// Fix: Populating constants.ts with mock data for the application.

// --- IMPORTANT ---
// This file contains mock data for development and prototyping purposes.
// It is used by the `apiService.ts` to simulate a backend.
// Components should NOT import from this file directly. Instead, they should
// use the functions provided in `apiService.ts`.
// ---------------

import { User, UserRole, Post, Event, Debate, Article } from './types.ts';

export const MOCK_USERS: User[] = [
    {
        id: 'user-1',
        name: 'Ali Al-Sadr',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: UserRole.Candidate,
        verified: true,
        party: 'Progress & Justice Alliance',
        governorate: 'Baghdad',
        bio: 'Dedicated to building a prosperous and united Iraq for all. Focusing on economic reform and youth empowerment.'
    },
    {
        id: 'user-2',
        name: 'Fatima Al-Jubouri',
        avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
        role: UserRole.Candidate,
        verified: true,
        party: 'National Future Party',
        governorate: 'Basra',
        bio: 'Advocating for environmental protection and modernizing our infrastructure. A voice for the people of Basra.'
    },
    {
        id: 'user-3',
        name: 'Ahmed Khalid',
        avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
        role: UserRole.Voter,
        verified: false,
        party: 'Independent',
        governorate: 'Erbil'
    },
     {
        id: 'user-4',
        name: 'Layla Hassan',
        avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
        role: UserRole.Voter,
        verified: false,
        party: 'Independent',
        governorate: 'Baghdad'
    },
];

export const MOCK_POSTS: Post[] = [
    {
        id: 'post-1',
        author: MOCK_USERS[0],
        timestamp: '2h ago',
        content: 'Met with small business owners in Al-Mansour today. Their resilience is inspiring! We must cut red tape to help them thrive and create jobs for our youth. #Baghdad #Economy #IraqVotes',
        mediaUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
        likes: 1200,
        comments: 256,
        shares: 88,
        isSponsored: true,
        type: 'Post',
        governorates: ['Baghdad'],
    },
    {
        id: 'post-2',
        author: MOCK_USERS[1],
        timestamp: '5h ago',
        content: 'Our beautiful Shatt al-Arab deserves better. We launched a new cleanup initiative today. Protecting our environment is protecting our future. 💚 #Basra #Environment #CleanWater',
        mediaUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
        likes: 2300,
        comments: 412,
        shares: 150,
        isSponsored: false,
        type: 'Post',
        governorates: ['Basra'],
    },
    {
        id: 'reel-1',
        author: MOCK_USERS[0],
        timestamp: '1d ago',
        content: 'Quick update from the campaign trail! So much energy from the people of Baghdad!',
        mediaUrl: 'https://images.unsplash.com/photo-1599518559222-1b6a71ac337d?w=400',
        likes: 5400,
        comments: 800,
        shares: 320,
        isSponsored: false,
        type: 'Reel',
        governorates: ['Baghdad'],
    },
     {
        id: 'reel-2',
        author: MOCK_USERS[1],
        timestamp: '2d ago',
        content: 'A day in Basra. #BasraBeauty',
        mediaUrl: 'https://images.unsplash.com/photo-1617540441926-75385281a8b5?w=400',
        likes: 8100,
        comments: 1100,
        shares: 450,
        isSponsored: true,
        type: 'Reel',
        governorates: ['Basra'],
    }
];


export const MOCK_EVENTS: Event[] = [
    {
        id: 'event-1',
        title: 'Town Hall with Ali Al-Sadr',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Baghdad International Community Center, Baghdad',
        organizer: MOCK_USERS[0],
        governorate: 'Baghdad'
    },
    {
        id: 'event-2',
        title: 'Future of Basra Youth Forum',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Basra Grand Hall, Basra',
        organizer: MOCK_USERS[1],
        governorate: 'Basra'
    }
];

export const MOCK_DEBATES: Debate[] = [
    {
        id: 'debate-1',
        title: 'The National Economic Debate',
        topic: 'Strategies for diversifying Iraq\'s economy beyond oil.',
        scheduledTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        isLive: false,
        participants: [MOCK_USERS[0], MOCK_USERS[1]],
    },
    {
        id: 'debate-2',
        title: 'Live: Healthcare Reform',
        topic: 'Discussing the future of public healthcare and hospital infrastructure.',
        scheduledTime: new Date().toISOString(),
        isLive: true,
        participants: [MOCK_USERS[0], MOCK_USERS[1]],
    }
];

export const MOCK_ARTICLES: Article[] = [
    {
        id: 'article-1',
        source: 'Iraq Economic Review',
        timestamp: 'August 15, 2024',
        title: 'Analyzing the Feasibility of Tech Hubs in Major Iraqi Cities',
        authorName: 'Dr. Samira Abbas',
        contentSnippet: 'A deep dive into the potential for technology and innovation to become a cornerstone of Iraq\'s new economy. The article explores infrastructure needs, educational reforms, and investment policies that could turn Baghdad and Basra into regional tech leaders...',
        url: '#',
        governorates: ['Baghdad', 'Basra'],
    },
    {
        id: 'article-2',
        source: 'Tigris Policy Journal',
        timestamp: 'August 12, 2024',
        title: 'Water Management in the Southern Governorates: A Critical Path Forward',
        authorName: 'Hassan F. Al-Maliki',
        contentSnippet: 'With rising salinity and dwindling resources, effective water management is no longer a choice but a necessity for governorates like Basra and Dhi Qar. This analysis proposes a multi-faceted approach involving international cooperation, modern irrigation techniques...',
        url: '#',
        governorates: ['Basra', 'Dhi Qar'],
    }
];
