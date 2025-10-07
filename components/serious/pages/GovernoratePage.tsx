import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { Candidate, NewsArticle } from '../types';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import { useGovernorateData } from '../hooks/useGovernorateData';

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <Card className="flex items-center space-x-4 space-x-reverse hover:shadow-lg transition-shadow">
        <img src={candidate.imageUrl} alt={candidate.name} className="w-20 h-20 rounded-full object-cover" />
        <div className="flex-1">
            <div className="flex items-center">
                <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
            </div>
            <p className="text-gray-600">{candidate.party}</p>
            {candidate.verified && (
            <div className="mt-1 flex items-center text-sm text-green-600 font-semibold">
                <CheckCircleIcon className="w-4 h-4 ml-1" />
                مرشح موثق
            </div>
            )}
        </div>
        <Link to={`/candidate/${candidate.id}`} className="text-[#007a3d] font-semibold">
            عرض الملف
        </Link>
    </Card>
);

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <Card className="hover:bg-gray-50 transition-colors">
        <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
        <p className="text-gray-600 mt-2">{article.summary}</p>
        <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">{article.date}</span>
            <Link to={`/news/${article.id}`} className="text-[#007a3d] font-semibold">اقرأ المزيد</Link>
        </div>
    </Card>
);

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`}></div>
);

const GovernoratePage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const { data, isLoading, error } = useGovernorateData(name);

    if (isLoading) {
         return (
             <div className="bg-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                         <SkeletonLoader className="h-12 w-1/2 mx-auto" />
                         <SkeletonLoader className="h-6 w-3/4 mx-auto mt-4" />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            <SkeletonLoader className="h-32 w-full" />
                            <SkeletonLoader className="h-32 w-full" />
                            <SkeletonLoader className="h-32 w-full" />
                        </div>
                        <div className="space-y-6">
                           <SkeletonLoader className="h-40 w-full" />
                           <SkeletonLoader className="h-40 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return <div className="text-center py-20">
            <h1 className="text-4xl">حدث خطأ</h1>
            <p className="text-lg text-gray-600 mt-2">{error.message}</p>
            <Link to="/" className="text-lg text-[#007a3d] mt-4 inline-block">العودة إلى الرئيسية</Link>
        </div>;
    }

    if (!data) {
        return <div className="text-center py-20">
            <h1 className="text-4xl">المحافظة غير موجودة</h1>
            <Link to="/" className="text-lg text-[#007a3d] mt-4 inline-block">العودة إلى الرئيسية</Link>
        </div>;
    }

    const { governorate, candidates, news } = data;

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900">محافظة {governorate.name}</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        استكشف المرشحين، تابع آخر الأخبار، وشارك في العملية الديمقراطية في محافظتك.
                    </p>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-right border-r-4 border-[#007a3d] pr-4">جميع المرشحين في {governorate.name}</h2>
                        <div className="space-y-6">
                            {candidates.map(c => <CandidateCard key={c.id} candidate={c} />)}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-right border-r-4 border-[#007a3d] pr-4">آخر الأخبار</h2>
                        <div className="space-y-6">
                            {news.map(n => <NewsCard key={n.id} article={n} />)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GovernoratePage;