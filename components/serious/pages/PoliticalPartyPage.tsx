import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { Candidate } from '../types';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import { usePartyData } from '../hooks/usePartyData';

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <Card className="flex items-center space-x-4 space-x-reverse">
        <img src={candidate.imageUrl} alt={candidate.name} className="w-16 h-16 rounded-full object-cover" />
        <div>
            <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
            {candidate.verified && (
            <div className="mt-1 flex items-center text-xs text-green-600 font-semibold">
                <CheckCircleIcon className="w-4 h-4 ml-1" />
                مرشح موثق
            </div>
            )}
        </div>
    </Card>
);

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`}></div>
);


const PoliticalPartyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = usePartyData(id);

    if (isLoading) {
        return (
             <div className="bg-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                     <Card className="mb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 md:space-x-reverse">
                            <SkeletonLoader className="w-32 h-32 rounded-lg" />
                            <div className="flex-1">
                                <SkeletonLoader className="h-10 w-1/2 mb-4" />
                                <SkeletonLoader className="h-5 w-full mb-2" />
                                <SkeletonLoader className="h-5 w-3/4" />
                            </div>
                        </div>
                     </Card>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SkeletonLoader className="h-24" />
                        <SkeletonLoader className="h-24" />
                        <SkeletonLoader className="h-24" />
                     </div>
                </div>
            </div>
        );
    }
    
    if (error || !data) {
        return (
             <div className="text-center py-20">
                <h1 className="text-4xl">الحزب غير موجود</h1>
                <p className="text-lg text-gray-600 mt-2">{error?.message}</p>
                <Link to="/parties" className="text-lg text-[#007a3d] mt-4 inline-block">العودة إلى قائمة الأحزاب</Link>
            </div>
        );
    }

    const { party, candidates } = data;

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <Card className="mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right space-y-4 md:space-y-0 md:space-x-8 md:space-x-reverse">
                        <img src={party.logoUrl} alt={`${party.name} logo`} className="w-32 h-32 rounded-lg object-contain bg-white shadow-md" />
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900">{party.name}</h1>
                            <p className="text-lg text-gray-600 mt-2">{party.description}</p>
                            <div className="mt-4 flex justify-center md:justify-start space-x-4 space-x-reverse text-gray-700">
                                <span><strong>القائد:</strong> {party.leader}</span>
                                <span><strong>سنة التأسيس:</strong> {party.founded}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-right border-r-4 border-[#007a3d] pr-4">أبرز المرشحين</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {candidates.map(c => <CandidateCard key={c.id} candidate={c} />)}
                    </div>
                     <div className="text-center mt-8">
                        <Link to="/parties" className="text-[#007a3d] font-bold">عرض جميع المرشحين</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PoliticalPartyPage;
