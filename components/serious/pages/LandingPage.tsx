import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { IRAQ_GOVERNORATES } from '../constants';
import { useCountdown } from '../hooks/useCountdown';
import TrustLogos from '../components/TrustLogos';
import UsersIcon from '../components/icons/UsersIcon';
import ApiIcon from '../components/icons/ApiIcon';

const translations = {
  ar: {
    heroTitle: "الثورة الخضراء في الحملات الانتخابية",
    heroSubtitle: "وداعاً للملصقات الورقية - مرحباً بحملات ذكية ونظيفة.",
    days: "يوم",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
  },
  en: {
    heroTitle: "The Green Revolution in Election Campaigns",
    heroSubtitle: "Goodbye paper posters - Hello smart, clean campaigns.",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  ku: {
    heroTitle: "شۆڕشی سەوز لە هەڵمەتەکانی هەڵبژاردندا",
    heroSubtitle: "ماڵئاوا لە پۆستەری کاغەز - بەخێربێن بۆ هەڵمەتی زیرەک و خاوێن.",
    days: "ڕۆژ",
    hours: "کاتژمێر",
    minutes: "خولەک",
    seconds: "چرکە",
  },
};

const CountdownTimer: React.FC<{ lang: 'ar' | 'en' | 'ku' }> = ({ lang }) => {
    const electionDate = new Date('2025-11-11T07:00:00');
    const [days, hours, minutes, seconds] = useCountdown(electionDate);
    const t = translations[lang];

    if (days + hours + minutes + seconds <= 0) {
        return <p className="text-2xl text-green-600 font-bold">بدأ يوم الانتخابات!</p>;
    }

    return (
        <div className="flex justify-center space-x-4 space-x-reverse text-center text-white">
            <div><span className="text-5xl font-bold">{days}</span><p>{t.days}</p></div>
            <div><span className="text-5xl font-bold">{hours}</span><p>{t.hours}</p></div>
            <div><span className="text-5xl font-bold">{minutes}</span><p>{t.minutes}</p></div>
            <div><span className="text-5xl font-bold">{seconds}</span><p>{t.seconds}</p></div>
        </div>
    );
}

const GovernorateMap: React.FC = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
        {IRAQ_GOVERNORATES.map(gov => (
            <Link key={gov.id} to={`/governorate/${gov.enName.toLowerCase()}`} className="p-3 bg-gray-50 rounded-lg hover:bg-green-100 hover:shadow-md transition-all">
                <span className="font-semibold text-gray-700">{gov.name}</span>
            </Link>
        ))}
    </div>
);

const LandingPage: React.FC<{ language: 'ar' | 'en' | 'ku' }> = ({ language }) => {
  const t = translations[language];
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-800 text-center py-20 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1590510141389-399738437f37?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">{t.heroTitle}</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">{t.heroSubtitle}</p>
          <div className="mt-8">
            <CountdownTimer lang={language} />
          </div>
          <div className="mt-10 flex justify-center space-x-4 space-x-reverse">
            <Link to="/dashboard"><Button variant="primary">اذهب إلى لوحة البيانات</Button></Link>
            <Link to="/integrity-hub"><Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#007a3d]">الإبلاغ عن مخالفة</Button></Link>
          </div>
        </div>
      </section>

      <TrustLogos />
      
      {/* Stakeholders Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">منصة لكل أصحاب المصلحة</h2>
            <p className="mt-3 text-lg text-gray-500">أدوات متخصصة للمراقبين الدوليين والأحزاب السياسية.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/international-portal" className="block">
                <Card className="text-center h-full hover:shadow-xl transition-shadow">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-green-100 rounded-full">
                            <ApiIcon className="w-8 h-8 text-[#007a3d]" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">بوابة المراقبين الدوليين</h3>
                    <p className="text-gray-600">أدوات مراقبة، تقارير متعددة اللغات، ووصول للبيانات لدعم الشفافية.</p>
                </Card>
            </Link>
             <Link to="/parties" className="block">
                <Card className="text-center h-full hover:shadow-xl transition-shadow">
                     <div className="flex justify-center mb-4">
                        <div className="p-4 bg-green-100 rounded-full">
                            <UsersIcon className="w-8 h-8 text-[#007a3d]" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">حلول للأحزاب السياسية</h3>
                    <p className="text-gray-600">إدارة مركزية للمرشحين، تحليلات شاملة، ومنصات مخصصة للحملات.</p>
                </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Governorates Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">استكشف الساحة الانتخابية المحلية</h2>
            <p className="mt-3 text-lg text-gray-500">اختر محافظتك وتعرف على المرشحين والأخبار المحلية.</p>
          </div>
          <GovernorateMap />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;