import { DashboardStats, GovernorateData, GovernorateParticipation, Party, Candidate } from '../types';
import { IRAQ_GOVERNORATES } from '../constants';
import { apiRequest } from './apiClient';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockDashboardStats = async (): Promise<DashboardStats> => {
    await wait(500);
    return {
        totalRegisteredVoters: 25123456,
        expectedTurnoutPercentage: 65,
        turnoutChangeLastWeek: 2,
        approvedCandidatesCount: 8500,
        verifiedViolationsCount: 1245,
        newViolationsChangeLastWeek: -5,
        greenCampaignImpact: {
            treesSaved: 12,
            paperPostersSaved: 245,
            co2EmissionsReducedKg: 50,
        },
        candidateDistribution: {
            men: { count: 6120, percentage: 72 },
            women: { count: 2380, percentage: 28 },
        },
    };
};

const mockGovernorateParticipation = async (): Promise<GovernorateParticipation[]> => {
    await wait(600);
    return IRAQ_GOVERNORATES.map(gov => ({
        governorateId: gov.id,
        governorateName: gov.name,
        estimatedTurnout: Math.floor(Math.random() * (75 - 45 + 1)) + 45,
    }));
};

const mockGovernorateData = async (governorateName: string): Promise<GovernorateData> => {
    await wait(650);
    const governorate = IRAQ_GOVERNORATES.find(g => g.enName.toLowerCase() === governorateName);
    if (!governorate) {
        throw new Error('Governorate not found');
    }
    const mockCandidates: Candidate[] = [
        { id: 1, name: 'أحمد علي', party: 'تحالف النصر', imageUrl: 'https://picsum.photos/200/200?random=1', verified: true, governorate: governorate.enName },
        { id: 2, name: 'فاطمة حسن', party: 'دولة القانون', imageUrl: 'https://picsum.photos/200/200?random=2', verified: true, governorate: governorate.enName },
        { id: 3, name: 'علي كريم', party: 'التيار الصدري', imageUrl: 'https://picsum.photos/200/200?random=3', verified: false, governorate: governorate.enName },
        { id: 4, name: 'مريم جاسم', party: 'الحزب الديمقراطي الكردستاني', imageUrl: 'https://picsum.photos/200/200?random=4', verified: true, governorate: governorate.enName },
    ];
    const mockNews = [
        { id: 1, title: `انطلاق الحملات في ${governorate.name}`, summary: 'بدأ المرشحون حملاتهم الانتخابية مع التركيز على القضايا المحلية والخدمية...', date: '2025-09-15' },
        { id: 2, title: `IHEC تؤكد جاهزيتها في ${governorate.name}`, summary: 'أعلنت المفوضية العليا المستقلة للانتخابات عن استكمال كافة الاستعدادات اللوجستية والفنية...', date: '2025-09-14' },
    ];
    return {
        governorate,
        candidates: mockCandidates,
        news: mockNews,
        localStats: {
            registeredVoters: Math.floor(Math.random() * 5_000_000),
            pollingStations: Math.floor(Math.random() * 1_500),
        },
    };
};

const mockPartyData = async (partyId: string): Promise<{ party: Party; candidates: Candidate[] }> => {
    await wait(500);
    if (partyId !== 'tahaleef-al-nasr') {
        throw new Error('Party not found');
    }
    return {
        party: {
            id: 'tahaleef-al-nasr',
            name: 'تحالف النصر',
            logoUrl: 'https://via.placeholder.com/150/007a3d/FFFFFF?text=Logo',
            leader: 'حيدر العبادي',
            founded: 2018,
            description: 'تحالف سياسي يركز على الأمن، ومحاربة الفساد، وتحسين الخدمات العامة.',
        },
        candidates: [
            { id: 1, name: 'أحمد علي', party: 'تحالف النصر', imageUrl: 'https://picsum.photos/200/200?random=11', verified: true, governorate: 'Baghdad' },
            { id: 10, name: 'سارة محمود', party: 'تحالف النصر', imageUrl: 'https://picsum.photos/200/200?random=12', verified: true, governorate: 'Basra' },
            { id: 11, name: 'يوسف خالد', party: 'تحالف النصر', imageUrl: 'https://picsum.photos/200/200?random=13', verified: true, governorate: 'Anbar' },
        ],
    };
};

const mockIntegritySubmission = async (): Promise<{ success: boolean; trackingId: string }> => {
    await wait(500);
    return { success: true, trackingId: `IQ-2025-${Math.random().toString(36).substring(2, 9).toUpperCase()}` };
};



/**
 * Fetches dashboard statistics.
 * Windsurf Endpoint: GET /api/v1/stats/dashboard
 * Payload Format: Expects a JSON object matching the DashboardStats interface.
 */
export const getDashboardStats = async (): Promise<DashboardStats> =>
    apiRequest<DashboardStats>('civic/stats/dashboard', mockDashboardStats);

/**
 * Fetches estimated participation by governorate.
 * Windsurf Endpoint: GET /api/v1/stats/participation
 * Payload Format: Expects a JSON array of objects matching GovernorateParticipation.
 */
export const getGovernorateParticipation = async (): Promise<GovernorateParticipation[]> =>
    apiRequest<GovernorateParticipation[]>(
        'civic/stats/participation',
        mockGovernorateParticipation
    );

/**
 * Fetches detailed data for a specific governorate.
 * @param governorateName - The English name of the governorate (e.g., 'baghdad').
 * Windsurf Endpoint: GET /api/v1/governorates/{governorateName}
 * Payload Format: Expects a JSON object matching the GovernorateData interface.
 */
export const getGovernorateData = async (governorateName: string): Promise<GovernorateData> =>
    apiRequest<GovernorateData>(
        `civic/governorates/${governorateName}`,
        () => mockGovernorateData(governorateName)
    );

/**
 * Fetches data for a specific political party.
 * @param partyId - The unique identifier/slug for the party.
 * Windsurf Endpoint: GET /api/v1/parties/{partyId}
 * Payload Format: Expects a JSON object with 'party' and 'candidates' keys.
 */
export const getPartyData = async (partyId: string): Promise<{ party: Party; candidates: Candidate[] }> =>
    apiRequest<{ party: Party; candidates: Candidate[] }>(
        `civic/parties/${partyId}`,
        () => mockPartyData(partyId)
    );



/**
 * Submits an integrity report.
 * Windsurf Endpoint: POST /api/v1/reports/integrity
 * Payload Format: Expects a FormData object with fields: governorate, violationType, description, and an optional 'evidence' file.
 */
export const submitIntegrityReport = async (formData: FormData): Promise<{ success: boolean; trackingId: string }> =>
    apiRequest<{ success: boolean; trackingId: string }>(
        'civic/reports/integrity',
        mockIntegritySubmission,
        {
            method: 'POST',
            body: formData,
        }
    );