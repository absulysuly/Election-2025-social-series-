import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LifebuoyIcon from '../components/icons/LifebuoyIcon';
import UserTieIcon from '../components/icons/UserTieIcon';
import BinocularsIcon from '../components/icons/BinocularsIcon';
import GavelIcon from '../components/icons/GavelIcon';
import ChartBarIcon from '../components/icons/ChartBarIcon';
import UsersIcon from '../components/icons/UsersIcon';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import MapMarkedAltIcon from '../components/icons/MapMarkedAltIcon';
import UserFriendsIcon from '../components/icons/UserFriendsIcon';
import VoteYeaIcon from '../components/icons/VoteYeaIcon';
import FileSignatureIcon from '../components/icons/FileSignatureIcon';
import BullhornIcon from '../components/icons/BullhornIcon';
import MoneyBillWaveIcon from '../components/icons/MoneyBillWaveIcon';
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

const dashboardData: Feature[] = [
  {
    title: 'مركز الناخبين',
    description: 'جميع الموارد للمواطنين للمشاركة بفعالية.',
    icon: <UsersIcon className="w-8 h-8" />,
    colorClass: 'from-blue-500 to-blue-400',
    subsections: [
      { name: 'تسجيل الناخبين', icon: <ClipboardListIcon className="w-5 h-5" />, link: '/election-hub' },
      { name: 'مواقع الاقتراع', icon: <MapMarkedAltIcon className="w-5 h-5" />, link: '/election-hub' },
      { name: 'معلومات المرشحين', icon: <UserFriendsIcon className="w-5 h-5" />, link: '/governorate/baghdad' },
      { name: 'دليل عملية التصويت', icon: <VoteYeaIcon className="w-5 h-5" />, link: '/election-hub' },
      { name: 'نتائج الانتخابات', icon: <ChartBarIcon className="w-5 h-5" />, link: '/digital-dashboard' },
    ],
  },
  {
    title: 'بوابة المرشح',
    description: 'أدوات وإرشادات لحملة انتخابية ناجحة.',
    icon: <UserTieIcon className="w-8 h-8" />,
    colorClass: 'from-green-500 to-green-400',
    subsections: [
        { name: 'متطلبات التسجيل', icon: <FileSignatureIcon className="w-5 h-5" />, link: '/election-hub' },
        { name: 'إرشادات الحملة', icon: <BullhornIcon className="w-5 h-5" />, link: '/digital-dashboard' },
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
        { name: 'إحصاءات حية', icon: <ChartLineIcon className="w-5 h-5" />, link: '/digital-dashboard' },
        { name: 'النتائج التاريخية', icon: <HistoryIcon className="w-5 h-5" />, link: '/digital-dashboard' },
        { name: 'تحليل ديموغرافي', icon: <UsersIcon className="w-5 h-5" />, link: '/digital-dashboard' },
        { name: 'تحديثات في الوقت الفعلي', icon: <BellIcon className="w-5 h-5" />, link: '/digital-dashboard' },
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

const FeatureCard: React.FC<{ feature: Feature, onClick: () => void }> = ({ feature, onClick }) => (
    <div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl flex flex-col cursor-pointer"
        onClick={onClick}
    >
        <div className={`p-6 bg-gradient-to-br ${feature.colorClass} text-white flex items-center gap-4`}>
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="opacity-90 text-sm">{feature.description}</p>
            </div>
        </div>
        <div className="p-6 flex-grow">
            <ul className="space-y-3">
                {feature.subsections.slice(0, 3).map((sub) => ( // Show first 3 items
                    <li key={sub.name} className="flex items-center gap-3 text-gray-600">
                        <span className="text-gray-500">{sub.icon}</span>
                        <span className="font-semibold text-sm">{sub.name}</span>
                    </li>
                ))}
                {feature.subsections.length > 3 && (
                    <li className="text-gray-500 text-sm font-semibold pt-2">... والمزيد</li>
                )}
            </ul>
        </div>
    </div>
);

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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`p-6 bg-gradient-to-br ${feature.colorClass} text-white flex items-center gap-4 sticky top-0`}>
                     <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                        <h3 id="modal-title" className="text-2xl font-bold">{feature.title}</h3>
                        <p className="opacity-90 text-sm">{feature.description}</p>
                    </div>
                </div>
                <div className="p-6">
                    <h4 className="text-lg font-bold mb-4 text-gray-800">الأقسام الفرعية</h4>
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


const MainDashboardPage: React.FC = () => {
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900">لوحة التحكم الرئيسية</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            مركزك الشامل لجميع أدوات وموارد الانتخابات. استكشف الأقسام أدناه للوصول إلى المعلومات التي تحتاجها.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardData.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} onClick={() => setSelectedFeature(feature)} />
            ))}
        </div>
      </div>
      <Modal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </div>
  );
};

export default MainDashboardPage;