import type { User, UserRole, Article, Event, Post } from '../../types';

export type { User, UserRole, Article, Event, Post };

export interface Governorate {
  id: string;
  name: string;
  enName: string;
  path: string;
}

export interface Candidate {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
  verified: boolean;
  governorate: string;
  platformSummary?: string;
  votes?: number;
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  date: string;
  source?: string;
}

export interface GovernorateData {
  governorate: Governorate;
  candidates: Candidate[];
  news: NewsArticle[];
  localStats: {
    registeredVoters: number;
    pollingStations: number;
  };
}

export interface GovernorateParticipation {
  governorateId: string;
  governorateName: string;
  estimatedTurnout: number;
}

export interface DashboardStats {
  totalRegisteredVoters: number;
  expectedTurnoutPercentage: number;
  turnoutChangeLastWeek: number;
  approvedCandidatesCount: number;
  verifiedViolationsCount: number;
  newViolationsChangeLastWeek: number;
  greenCampaignImpact: {
    treesSaved: number;
    paperPostersSaved: number;
    co2EmissionsReducedKg: number;
  };
  candidateDistribution: {
    men: {
      count: number;
      percentage: number;
    };
    women: {
      count: number;
      percentage: number;
    };
  };
}

export interface Party {
  id: string;
  name: string;
  logoUrl: string;
  leader: string;
  founded: number;
  description: string;
}
