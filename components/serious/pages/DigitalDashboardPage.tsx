import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from '../hooks/useCountdown';
import UserCheckIcon from '../components/icons/UserCheckIcon';
import UserTieIcon from '../components/icons/UserTieIcon';
import BinocularsIcon from '../components/icons/BinocularsIcon';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import MapMarkedAltIcon from '../components/icons/MapMarkedAltIcon';
import UserFriendsIcon from '../components/icons/UserFriendsIcon';
import VoteYeaIcon from '../components/icons/VoteYeaIcon';
import FileSignatureIcon from '../components/icons/FileSignatureIcon';
import MoneyBillWaveIcon from '../components/icons/MoneyBillWaveIcon';
import BullhornIcon from '../components/icons/BullhornIcon';
import ChartLineIcon from '../components/icons/ChartLineIcon';
import CalendarAltIcon from '../components/icons/CalendarAltIcon';
import BalanceScaleIcon from '../components/icons/BalanceScaleIcon';
import LandmarkIcon from '../components/icons/LandmarkIcon';
import HistoryIcon from '../components/icons/HistoryIcon';
import ClipboardCheckIcon from '../components/icons/ClipboardCheckIcon';
import BookIcon from '../components/icons/BookIcon';
import ExclamationTriangleIcon from '../components/icons/ExclamationTriangleIcon';
import DatabaseIcon from '../components/icons/DatabaseIcon';

const translations = {
    en: {
        title: 'Iraq Election 2025',
        countdownTitle: 'Time Until 2025 Iraqi Parliamentary Election',
        dashboardTitle: 'Election Access Portal',
        electionDate: 'Election Date: November 11, 2025',
        days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
    },
    ar: {
        title: 'انتخابات العراق 2025',
        countdownTitle: 'الوقت المتبقي حتى انتخابات البرلمان العراقي 2025',
        dashboardTitle: 'بوابة الوصول الانتخابية',
        electionDate: 'تاريخ الانتخابات: 11 نوفمبر 2025',
        days: 'أيام', hours: 'ساعات', minutes: 'دقائق', seconds: 'ثواني',
    },
    ku: {
        title: 'هه‌ڵبژاردنی عێراق 2025',
        countdownTitle: 'کات تا هەڵبژاردنی پەرلەمانی عێراقی 2025',
        dashboardTitle: 'دەروازەی چوونە ناو هەڵبژاردن',
        electionDate: 'ڕێکەوتی هەڵبژاردن: 11ی تشرینی دووەمی 2025',
        days: 'ڕۆژ', hours: 'کاتژمێر', minutes: 'خولەک', seconds: 'چرکە',
    }
} as const;

type LanguageKey = keyof typeof translations;

const LanguageBar: React.FC<{ onLangChange: (lang: LanguageKey) => void }> = ({ onLangChange }) => (
    <div className="flex justify-center gap-4 p-3 bg-white/95 shadow-md relative z-10">
        <button className="bg-transparent border-2 border-[#003366] py-2 px-4 rounded-full font-semibold text-[#003366] text-sm transition-all duration-300 hover:bg-[#003366] hover:text-white hover:-translate-y-0.5" onClick={() => onLangChange('en')}>English</button>
        <button className="bg-transparent border-2 border-[#003366] py-2 px-4 rounded-full font-semibold text-[#003366] text-sm transition-all duration-300 hover:bg-[#003366] hover:text-white hover:-translate-y-0.5" onClick={() => onLangChange('ku')}>Kurdî</button>
        <button className="bg-transparent border-2 border-[#003366] py-2 px-4 rounded-full font-semibold text-[#003366] text-sm transition-all duration-300 hover:bg-[#003366] hover:text-white hover:-translate-y-0.5" onClick={() => onLangChange('ar')}>العربية</button>
    </div>
);

const Countdown: React.FC<{ language: LanguageKey }> = ({ language }) => {
    const electionDate = new Date('2025-11-11T07:00:00');
    const [days, hours, minutes, seconds] = useCountdown(electionDate);
    const t = translations[language];

    const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
        <div className="bg-white/20 backdrop-blur-md p-5 rounded-lg min-w-[80px]">
            <span className="text-4xl font-bold block">{String(value).padStart(2, '0')}</span>
            <span className="text-sm opacity-90">{label}</span>
        </div>
    );

    return (
        <section className="bg-gradient-to-r from-[#003366] to-[#0066cc] text-white p-10 text-center">
            <h2 className="text-3xl mb-4 font-semibold">{t.countdownTitle}</h2>
            <p className="text-lg mb-8 opacity-90">{t.electionDate}</p>
            <div className="flex justify-center gap-5 max-w-lg mx-auto">
                <CountdownUnit value={days} label={t.days} />
                <CountdownUnit value={hours} label={t.hours} />
                <CountdownUnit value={minutes} label={t.minutes} />
                <CountdownUnit value={seconds} label={t.seconds} />
            </div>
        </section>
    );
};

const AnimatedStat: React.FC<{ target: number; label: string }> = ({ target, label }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let currentCount = 0;

        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(currentCount));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [target]);

    return (
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <span className="text-4xl font-bold block mb-2">{count.toLocaleString()}</span>
            <span className="text-base opacity-90">{label}</span>
        </div>
    );
};

const InfoCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    linkText: string;
    href?: string;
    onClick?: () => void;
}> = ({ icon, title, description, linkText, href, onClick }) => {
    const linkContent = (
        <span className="text-[#0066cc] font-semibold text-sm mt-2 inline-block">
            {linkText} →
        </span>
    );

    let action: React.ReactNode = null;
    if (onClick) {
        action = (
            <button type="button" onClick={onClick} className="text-left">
                {linkContent}
            </button>
        );
    } else if (href) {
        action = href.startsWith('http') ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {linkContent}
            </a>
        ) : (
            <Link to={href}>{linkContent}</Link>
        );
    }

    return (
        <div className="bg-gray-100 rounded-xl p-6 transition-all duration-300 border-l-4 border-[#003366] hover:-translate-y-1 hover:shadow-lg">
            <h4 className="text-[#003366] mb-4 text-xl font-bold flex items-center gap-2">{icon} {title}</h4>
            <p className="text-gray-600 mb-4">{description}</p>
            {action}
        </div>
    );
};

const LoginModal: React.FC<{ type: 'voter' | 'candidate' | 'observer'; isOpen: boolean; onClose: () => void }> = ({ type, isOpen, onClose }) => {
    if (!isOpen) return null;

    const titles = {
        voter: 'Voter Login',
        candidate: 'Candidate Login',
        observer: 'Observer Login',
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white p-10 rounded-2xl max-w-md w-11/12 text-center" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-[#003366] mb-4 text-2xl font-bold">{titles[type]}</h3>
                <input type="text" placeholder={${type.charAt(0).toUpperCase() + type.slice(1)} ID} className="w-full p-3 my-2 border border-gray-300 rounded-md text-base" />
                <input type="password" placeholder="Password" className="w-full p-3 my-2 border border-gray-300 rounded-md text-base" />
                <div className="flex gap-3 mt-5">
                    <button className="flex-1 p-3 border-none rounded-md font-semibold bg-gray-600 text-white" onClick={onClose}>Cancel</button>
                    <button className="flex-1 p-3 border-none rounded-md font-semibold bg-[#003366] text-white" onClick={() => { alert('Login successful!'); onClose(); }}>Login</button>
                </div>
            </div>
        </div>
    );
};

const DigitalDashboardPage: React.FC<{ language: LanguageKey; setLanguage: (lang: LanguageKey) => void }> = ({ language, setLanguage }) => {
    const [activeTab, setActiveTab] = useState('voter-info');
    const [modalOpen, setModalOpen] = useState<'voter' | 'candidate' | 'observer' | null>(null);
    const t = translations[language];

    const tabCategories = {
        'voter-info': 'Voter Information',
        'candidate-info': 'Candidate Resources',
        'observer-info': 'Observer Guidelines',
        'election-info': 'Election Details',
    } as const;

    return (
        <div className="bg-white">
            <LanguageBar onLangChange={setLanguage} />
            <Countdown language={language} />

            <section className="p-16 bg-gray-50">
                <h2 className="text-center text-4xl text-[#003366] mb-12 font-bold">{t.dashboardTitle}</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl p-10 text-center shadow-lg transition-all duration-300 border-t-4 border-[#003366] hover:-translate-y-2 hover:shadow-2xl">
                        <UserCheckIcon className="text-5xl mx-auto mb-4 text-[#003366]" />
                        <h3 className="text-2xl mb-3 text-[#003366] font-bold">For Voters</h3>
                        <p className="text-gray-600 mb-6">Access registration, locations, candidate info, and results.</p>
                        <button className="bg-[#003366] text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:bg-[#0066cc] hover:scale-105" onClick={() => setModalOpen('voter')}>Voter Login</button>
                    </div>
                    <div className="bg-white rounded-2xl p-10 text-center shadow-lg transition-all duration-300 border-t-4 border-[#003366] hover:-translate-y-2 hover:shadow-2xl">
                        <UserTieIcon className="text-5xl mx.auto mb-4 text-[#003366]" />
                        <h3 className="text-2xl mb-3 text-[#003366] font-bold">For Candidates</h3>
                        <p className="text-gray-600 mb-6">Registration, guidelines, financial reporting, and campaign tools.</p>
                        <button className="bg-[#003366] text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:bg-[#0066cc] hover:scale-105" onClick={() => setModalOpen('candidate')}>Candidate Login</button>
                    </div>
                    <div className="bg-white rounded-2xl p-10 text-center shadow-lg transition-all.duration-300 border-t-4 border-[#003366] hover:-translate-y-2 hover:shadow-2xl">
                        <BinocularsIcon className="text-5xl mx-auto mb-4 text-[#003366]" />
                        <h3 className="text-2xl mb-3 text-[#003366] font-bold">For Observers</h3>
                        <p className="text-gray-600 mb-6">Registration, reporting tools, monitoring guidelines, and data.</p>
                        <button className="bg-[#003366] text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:bg-[#0066cc] hover:scale-105" onClick={() => setModalOpen('observer')}>Observer Login</button>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-r from-green-600 to-green-500 text-white p-12 text-center">
                <h2 className="text-4xl font-bold mb-8">Election Statistics</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl.mx-auto">
                    <AnimatedStat target={8500000} label="Registered Voters" />
                    <AnimatedStat target={3245} label="Registered Candidates" />
                    <AnimatedStat target={8200} label="Polling Stations" />
                    <AnimatedStat target={85} label="Observer Organizations" />
                </div>
            </section>

            <section className="p-16">
                <h2 className="text-center text-4xl text-[#003366] mb-10 font-bold">Election Information Center</h2>
                <div className="flex justify-center gap-2 mb-10 flex-wrap">
                    {Object.entries(tabCategories).map(([key, value]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={py-3 px-6 border-none rounded-full font-semibold transition-all duration-300 }
                        >
                            {value}
                        </button>
                    ))}
                </div>

                <div className={grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto }>
                    <InfoCard icon={<ClipboardListIcon className="w-6 h-6" />} title="Voter Registration" description="Guide to registration process and requirements" linkText="Register Now" href="https://ihec.iq/" />
                    <InfoCard icon={<MapMarkedAltIcon className="w-6 h-6" />} title="Polling Locations" description="Find your assigned polling station and voting center" linkText="Find Your Station" href="https://ihec.iq/" />
                    <InfoCard icon={<UserFriendsIcon className="w-6 h-6" />} title="Candidate Profiles" description="Comprehensive information about all registered candidates" linkText="View Candidates" href="/governorate/baghdad" />
                    <InfoCard icon={<VoteYeaIcon className="w-6 h-6" />} title="Voting Process" description="Step-by-step guide to casting your ballot" linkText="Learn More" href="/election-hub#timeline" />
                </div>

                <div className={grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto }>
                    <InfoCard icon={<FileSignatureIcon className="w-6 h-6" />} title="Registration Process" description="Complete candidate registration requirements and timeline" linkText="Start Registration" href="https://ihec.iq/" />
                    <InfoCard icon={<MoneyBillWaveIcon className="w-6 h-6" />} title="Campaign Finance" description="Guidelines for campaign funding and expenditure reporting" linkText="Finance Guide" href="/digital-transparency" />
                    <InfoCard icon={<BullhornIcon className="w-6 h-6" />} title="Campaign Guidelines" description="Rules and regulations for election campaigning" linkText="View Guidelines" href="/integrity-hub" />
                    <InfoCard icon={<ChartLineIcon className="w-6 h-6" />} title="Campaign Analytics" description="Tools and data for campaign strategy and outreach" linkText="Access Analytics" href="/digital-transparency" />
                </div>

                <div className={grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto }>
                    <InfoCard icon={<ClipboardCheckIcon className="w-6 h-6" />} title="Observer Registration" description="Process for observer accreditation" linkText="Register as Observer" href="/international-portal" />
                    <InfoCard icon={<BookIcon className="w-6 h-6" />} title="Observation Manual" description="Comprehensive guide for observation missions" linkText="Download Manual" href="/international-portal" />
                    <InfoCard icon={<ExclamationTriangleIcon className="w-6 h-6" />} title="Violation Reporting" description="Tools and procedures for reporting violations" linkText="Report Violation" href="/integrity-hub" />
                    <InfoCard icon={<DatabaseIcon className="w-6 h-6" />} title="Data Access" description="Access to election data and real-time information" linkText="Access Data" href="/digital-transparency" />
                </div>

                <div className={grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto }>
                    <InfoCard icon={<CalendarAltIcon className="w-6 h-6" />} title="Election Timeline" description="Complete schedule of election activities and deadlines" linkText="View Full Timeline" href="/election-hub#timeline" />
                    <InfoCard icon={<BalanceScaleIcon className="w-6 h-6" />} title="Electoral System" description="Details of Iraq's parliamentary election system" linkText="Learn About System" href="/integrity-hub" />
                    <InfoCard icon={<LandmarkIcon className="w-6 h-6" />} title="Political Parties" description="Information about registered political parties and coalitions" linkText="View Parties" href="/parties" />
                    <InfoCard icon={<HistoryIcon className="w-6 h-6" />} title="Historical Data" description="Archive of previous election results and analysis" linkText="Explore History" href="/digital-transparency" />
                </div>
            </section>

            <LoginModal type="voter" isOpen={modalOpen === 'voter'} onClose={() => setModalOpen(null)} />
            <LoginModal type="candidate" isOpen={modalOpen === 'candidate'} onClose={() => setModalOpen(null)} />
            <LoginModal type="observer" isOpen={modalOpen === 'observer'} onClose={() => setModalOpen(null)} />
        </div>
    );
};

export default DigitalDashboardPage;
