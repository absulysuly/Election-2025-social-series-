import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from '../hooks/useCountdown';

// Import all necessary icons
import VoteYeaIcon from '../components/icons/VoteYeaIcon';
import UsersIcon from '../components/icons/UsersIcon';
import UserTieIcon from '../components/icons/UserTieIcon';
import BinocularsIcon from '../components/icons/BinocularsIcon';
import GavelIcon from '../components/icons/GavelIcon';
import ChartBarIcon from '../components/icons/ChartBarIcon';
import LifebuoyIcon from '../components/icons/LifebuoyIcon';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import MapMarkedAltIcon from '../components/icons/MapMarkedAltIcon';
import UserFriendsIcon from '../components/icons/UserFriendsIcon';
import FileSignatureIcon from '../components/icons/FileSignatureIcon';
import MoneyBillWaveIcon from '../components/icons/MoneyBillWaveIcon';
import BullhornIcon from '../components/icons/BullhornIcon';
import ToolsIcon from '../components/icons/ToolsIcon';
import ClipboardCheckIcon from '../components/icons/ClipboardCheckIcon';
import BookIcon from '../components/icons/BookIcon';
import ExclamationTriangleIcon from '../components/icons/ExclamationTriangleIcon';
import DatabaseIcon from '../components/icons/DatabaseIcon';
import FileInvoiceDollarIcon from '../components/icons/FileInvoiceDollarIcon';
import ExclamationCircleIcon from '../components/icons/ExclamationCircleIcon';
import ChartLineIcon from '../components/icons/ChartLineIcon';
import HistoryIcon from '../components/icons/HistoryIcon';
import BellIcon from '../components/icons/BellIcon';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import PhoneAltIcon from '../components/icons/PhoneAltIcon';
import BookOpenIcon from '../components/icons/BookOpenIcon';
import DownloadIcon from '../components/icons/DownloadIcon';
import UserCheckIcon from '../components/icons/UserCheckIcon';


interface Subsection {
  name: string;
  icon: React.ReactNode;
  link: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  subsections: Subsection[];
}

const featuresData: Feature[] = [
    {
      title: 'مركز الناخبين',
      description: 'جميع الموارد للمواطنين للمشاركة بفعالية.',
      icon: <UserCheckIcon className="w-8 h-8" />,
      colorClass: 'from-blue-500 to-blue-400',
      subsections: [
        { name: 'تسجيل الناخبين', icon: <ClipboardListIcon className="w-5 h-5" />, link: '/election-hub' },
        { name: 'مواقع الاقتراع', icon: <MapMarkedAltIcon className="w-5 h-5" />, link: '/election-hub' },
        { name: 'معلومات المرشحين', icon: <UserFriendsIcon className="w-5 h-5" />, link: '/governorate/baghdad' },
        { name: 'دليل عملية التصويت', icon: <VoteYeaIcon className="w-5 h-5" />, link: '/election-hub' },
        { name: 'نتائج الانتخابات', icon: <ChartBarIcon className="w-5 h-5" />, link: '/digital-transparency' },
      ],
    },
    {
      title: 'بوابة المرشح',
      description: 'أدوات وإرشادات لحملة انتخابية ناجحة.',
      icon: <UserTieIcon className="w-8 h-8" />,
      colorClass: 'from-green-500 to-green-400',
      subsections: [
          { name: 'متطلبات التسجيل', icon: <FileSignatureIcon className="w-5 h-5" />, link: '/election-hub' },
          { name: 'إرشادات الحملة', icon: <BullhornIcon className="w-5 h-5" />, link: '/digital-transparency' },
          { name: 'قواعد التمويل', icon: <MoneyBillWaveIcon className="w-5 h-5" />, link: '/election-hub' },
          { name: 'أدوات الحملة', icon: <ToolsIcon className="w-5 h-5" />, link: '/candidate-dashboard' },
          { name: 'مركز الامتثال', icon: <ClipboardCheckIcon className="w-5 h-5" />, link: '/integrity-hub' },
      ],
    },
    {
      title: 'محور المراقبين',
      description: 'موارد للمراقبين المحليين والدوليين.',
      icon: <BinocularsIcon className="w-8 h-8" />,
      colorClass: 'from-yellow-500 to-yellow-400',
      subsections: [
        { name: 'تسجيل المراقبين', icon: <ClipboardCheckIcon className="w-5 h-5" />, link: '/international-portal' },
        { name: 'إرشادات المراقبة', icon: <BookIcon className="w-5 h-5" />, link: '/international-portal' },
        { name: 'الإبلاغ عن الانتهاكات', icon: <ExclamationTriangleIcon className="w-5 h-5" />, link: '/integrity-hub' },
        { name: 'الوصول إلى البيانات', icon: <DatabaseIcon className="w-5 h-5" />, link: '/international-portal' },
        { name: 'أدوات المراقبة', icon: <ToolsIcon className="w-5 h-5" />, link: '/international-portal' },
      ],
    },
    {
      title: 'القانون والامتثال',
      description: 'الوصول إلى القوانين واللوائح وعمليات الإبلاغ.',
      icon: <GavelIcon className="w-8 h-8" />,
      colorClass: 'from-purple-500 to-purple-400',
      subsections: [
          { name: 'قوانين الانتخابات', icon: <GavelIcon className="w-5 h-5" />, link: '/integrity-hub' },
          { name: 'تمويل الحملات', icon: <FileInvoiceDollarIcon className="w-5 h-5" />, link: '/election-hub' },
          { name: 'عقوبات المخالفات', icon: <ExclamationCircleIcon className="w-5 h-5" />, link: '/integrity-hub' },
          { name: 'عملية الشكاوى', icon: <ExclamationTriangleIcon className="w-5 h-5" />, link: '/integrity-hub' },
      ],
    },
    {
      title: 'بيانات الانتخابات',
      description: 'استكشف الإحصاءات الحية وبيانات الانتخابات التاريخية.',
      icon: <ChartBarIcon className="w-8 h-8" />,
      colorClass: 'from-cyan-500 to-cyan-400',
      subsections: [
          { name: 'إحصاءات حية', icon: <ChartLineIcon className="w-5 h-5" />, link: '/digital-transparency' },
          { name: 'النتائج التاريخية', icon: <HistoryIcon className="w-5 h-5" />, link: '/digital-transparency' },
          { name: 'تحليل ديموغرافي', icon: <UsersIcon className="w-5 h-5" />, link: '/digital-transparency' },
          { name: 'تحديثات في الوقت الفعلي', icon: <BellIcon className="w-5 h-5" />, link: '/digital-transparency' },
      ],
    },
    {
      title: 'الدعم والموارد',
      description: 'ابحث عن المساعدة ومعلومات الاتصال والمواد القابلة للتنزيل.',
      icon: <LifebuoyIcon className="w-8 h-8" />,
      colorClass: 'from-red-500 to-red-400',
      subsections: [
          { name: 'الأسئلة الشائعة', icon: <QuestionMarkCircleIcon className="w-5 h-5" />, link: '/election-hub' },
          { name: 'معلومات الاتصال', icon: <PhoneAltIcon className="w-5 h-5" />, link: '/election-hub' },
          { name: 'مواد تعليمية', icon: <BookOpenIcon className="w-5 h-5" />, link: '/election-hub' },
          { name: 'مركز التنزيل', icon: <DownloadIcon className="w-5 h-5" />, link: '/election-hub' },
      ],
    },
];

const CountdownTimer: React.FC = () => {
    const electionDate = new Date('2025-11-11T07:00:00');
    const [days, hours, minutes, seconds] = useCountdown(electionDate);

    const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
        <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg min-w-[65px] sm:min-w-[80px] border border-white/30 text-center transition-transform hover:scale-105">
            <span className="text-3xl sm:text-4xl font-bold block text-shadow-md">{String(value).padStart(2, '0')}</span>
            <span className="text-xs sm:text-sm opacity-90 mt-1">{label}</span>
        </div>
    );

    return (
        <div className="flex justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
            <CountdownUnit value={days} label="أيام" />
            <CountdownUnit value={hours} label="ساعات" />
            <CountdownUnit value={minutes} label="دقائق" />
            <CountdownUnit value={seconds} label="ثواني" />
        </div>
    );
};

const Modal: React.FC<{ feature: Feature | null, onClose: () => void }> = ({ feature, onClose }) => {
    if (!feature) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div id="modal-title" className={`p-6 bg-gradient-to-br ${feature.colorClass} text-white flex items-center gap-4 sticky top-0`}>
                     <div className="flex-shrink-0 text-3xl">{feature.icon}</div>
                    <div>
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                        <p className="opacity-90 text-sm">{feature.description}</p>
                    </div>
                </div>
                <div className="p-6">
                     <ul className="space-y-3">
                        {feature.subsections.map((sub) => (
                            <li key={sub.name}>
                                <Link to={sub.link} onClick={onClose} className="flex items-center gap-3 text-gray-700 hover:text-[#003366] hover:bg-gray-100 p-3 rounded-lg transition-colors duration-200">
                                    <span className="text-gray-500 bg-gray-100 p-2 rounded-full">{sub.icon}</span>
                                    <span className="font-semibold flex-grow">{sub.name}</span>
                                    <span className="text-gray-400">→</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="p-4 bg-gray-50 border-t mt-auto text-right">
                    <button onClick={onClose} className="py-2 px-5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold">إغلاق</button>
                </div>
            </div>
        </div>
    );
};


const HomePage: React.FC<{ language: 'ar' | 'en' | 'ku'; onLangChange: (lang: 'ar' | 'en' | 'ku') => void; }> = ({ language, onLangChange }) => {
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#003366] to-[#0066cc] text-white text-center py-12 sm:py-16 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%20fill%3D%22rgba(255,255,255,0.05)%22%3E%3Cpolygon%20points%3D%2250,10%2060,40%2090,40%2065,60%2075,90%2050,70%2025,90%2035,60%2010,40%2040,40%22/%3E%3C/svg%3E')] bg-repeat bg-[length:150px_150px] opacity-50"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-shadow-lg">انتخابات العراق البرلمانية ٢٠٢٥</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-md md:text-lg text-gray-200">
                        منصتك الرقمية الشاملة لمعلومات الانتخابات والشفافية والمشاركة المواطنية.
                    </p>
                    <div className="mt-8 mb-4">
                        <CountdownTimer />
                    </div>
                </div>
            </section>
            
             {/* Login Portals */}
            <section className="py-12 sm:py-16">
                 <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md text-center">
                             <UserCheckIcon className="w-12 h-12 text-[#003366] mx-auto mb-3" />
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">بوابة الناخب</h3>
                            <p className="text-gray-600 my-3">تحقق من تسجيلك، ابحث عن مركزك، وتعرف على المرشحين.</p>
                             <button className="font-semibold text-white bg-[#003366] py-2 px-6 rounded-lg hover:bg-[#0052a3]">تسجيل الدخول / إنشاء حساب</button>
                        </div>
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md text-center">
                            <UserTieIcon className="w-12 h-12 text-[#003366] mx-auto mb-3" />
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">بوابة المرشح</h3>
                            <p className="text-gray-600 my-3">أدوات لإدارة حملتك الرقمية، وتقديم المستندات، ومتابعة الامتثال.</p>
                            <button className="font-semibold text-white bg-[#003366] py-2 px-6 rounded-lg hover:bg-[#0052a3]">تسجيل الدخول / إنشاء حساب</button>
                        </div>
                    </div>
                 </div>
            </section>

            {/* Main Features Grid */}
            <section className="py-12 sm:py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">لوحة التحكم الرئيسية</h2>
                        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
                           انقر على أي قسم لاستكشاف الأدوات والموارد المتاحة.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                        {featuresData.map(feature => (
                           <div 
                                key={feature.title} 
                                className={`bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer border-l-4 ${feature.colorClass.split(' ')[0].replace('from-', 'border-')}`}
                                onClick={() => setSelectedFeature(feature)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature(feature)}
                                aria-label={`Open details for ${feature.title}`}
                            >
                                <div className={`flex-shrink-0 text-3xl p-3 rounded-full bg-gradient-to-br text-white ${feature.colorClass}`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                                    <p className="text-sm text-gray-500">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Modal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
        </div>
    );
};

export default HomePage;
