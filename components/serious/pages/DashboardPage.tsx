import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useDashboardData } from '../hooks/useDashboardData';

const StatCard: React.FC<{ title: string; value: string; change?: string; changeType?: 'up' | 'down' }> = ({ title, value, change, changeType }) => (
    <Card>
        <p className="text-lg font-semibold text-gray-600">{title}</p>
        <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
            <p className={`mt-1 text-sm ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
            </p>
        )}
    </Card>
);

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`}></div>
);


const DashboardPage: React.FC = () => {
  const { data, isLoading, error } = useDashboardData();
  const { stats, participation } = data;

  if (error) {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <p className="text-red-500 text-lg">Error loading dashboard: {error.message}</p>
        </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">لوحة بيانات المرشح</h1>
            <p className="text-lg text-gray-600 mt-2">مرحباً بك! هنا يمكنك متابعة أداء حملتك الرقمية.</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {isLoading || !stats ? (
                <>
                    <Card><SkeletonLoader className="h-24" /></Card>
                    <Card><SkeletonLoader className="h-24" /></Card>
                    <Card><SkeletonLoader className="h-24" /></Card>
                    <Card><SkeletonLoader className="h-24" /></Card>
                </>
            ) : (
                <>
                    <StatCard title="إجمالي المسجلين" value={stats.totalRegisteredVoters.toLocaleString('ar-IQ')} />
                    <StatCard 
                        title="نسبة المشاركة المتوقعة" 
                        value={`${stats.expectedTurnoutPercentage}%`} 
                        change={`${stats.turnoutChangeLastWeek > 0 ? '+' : ''}${stats.turnoutChangeLastWeek}% عن الأسبوع الماضي`}
                        changeType={stats.turnoutChangeLastWeek >= 0 ? "up" : "down"}
                    />
                    <StatCard title="عدد المرشحين المعتمدين" value={stats.approvedCandidatesCount.toLocaleString('ar-IQ')} />
                    <StatCard 
                        title="البلاغات التي تم التحقق منها" 
                        value={stats.verifiedViolationsCount.toLocaleString('ar-IQ')} 
                        change={`${stats.newViolationsChangeLastWeek > 0 ? '+' : ''}${stats.newViolationsChangeLastWeek}% مخالفات جديدة`}
                        changeType={stats.newViolationsChangeLastWeek >= 0 ? "up" : "down"}
                    />
                </>
            )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Participation by Governorate */}
            <div className="lg:col-span-2">
                <Card>
                    <h2 className="text-2xl font-bold mb-4">المشاركة حسب المحافظة (تقديري)</h2>
                    <div className="space-y-4">
                        {isLoading ? (
                             Array.from({ length: 18 }).map((_, i) => (
                                <div key={i}><SkeletonLoader className="h-8" /></div>
                            ))
                        ) : (
                            participation.map(gov => (
                                <div key={gov.governorateId}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-base font-medium text-gray-700">{gov.governorateName}</span>
                                        <span className="text-sm font-medium text-gray-700">{gov.estimatedTurnout}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-[#007a3d] h-2.5 rounded-full" style={{ width: `${gov.estimatedTurnout}%` }}></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>

            {/* Other Info */}
            <div className="space-y-8">
                <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white">
                    <h2 className="text-2xl font-bold mb-4">تأثير حملتك الخضراء</h2>
                    {isLoading || !stats ? <SkeletonLoader className="h-20" /> : (
                        <div className="grid grid-cols-2 gap-4 text-center mb-6">
                            <div>
                                <span className="text-3xl font-bold">{stats.greenCampaignImpact.treesSaved}</span>
                                <p className="text-green-200 text-sm">شجرة تم إنقاذها</p>
                            </div>
                            <div>
                                <span className="text-3xl font-bold">{stats.greenCampaignImpact.paperPostersSaved}</span>
                                <p className="text-green-200 text-sm">ملصق ورقي تم توفيره</p>
                            </div>
                            <div>
                                <span className="text-3xl font-bold">{stats.greenCampaignImpact.co2EmissionsReducedKg}kg</span>
                                <p className="text-green-200 text-sm">انبعاثات CO2 أقل</p>
                            </div>
                            <div>
                                <span className="text-3xl font-bold">✓</span>
                                <p className="text-green-200 text-sm">حملة معتمدة</p>
                            </div>
                        </div>
                    )}
                    <Button className="w-full bg-white text-green-700 hover:bg-green-50">
                        تحميل شهادة الحملة الخضراء
                    </Button>
                </Card>
                <Card>
                    <h2 className="text-2xl font-bold mb-4">توزيع المرشحين</h2>
                    {isLoading || !stats ? <SkeletonLoader className="h-10" /> : (
                         <div className="space-y-3">
                            <p className="flex justify-between"><strong>رجال:</strong> <span>{stats.candidateDistribution.men.count.toLocaleString('ar-IQ')} ({stats.candidateDistribution.men.percentage}%)</span></p>
                            <p className="flex justify-between"><strong>نساء:</strong> <span>{stats.candidateDistribution.women.count.toLocaleString('ar-IQ')} ({stats.candidateDistribution.women.percentage}%)</span></p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;