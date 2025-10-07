import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const heroSlides = [
  {
    title: 'انتخابات العراق ٢٠٢٥',
    subtitle: 'صوتك، مستقبلك',
    buttonText: 'ابدأ هنا',
  },
  {
    title: 'تسجيل المرشحين',
    subtitle: 'كن جزءاً من التغيير',
    buttonText: 'سجل الآن',
  },
];

const HeroCarousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };
    
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };


    return (
        <section className="relative h-[60vh] bg-gray-800 text-white flex items-center justify-center text-center overflow-hidden">
            {heroSlides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 p-4 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold">{slide.title}</h1>
                    <p className="mt-4 text-xl text-gray-300">{slide.subtitle}</p>
                    <Button variant="primary" className="mt-8 text-lg px-8 py-3">{slide.buttonText}</Button>
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            
            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-40 hover:bg-opacity-70'}`}
                    />
                ))}
            </div>
        </section>
    );
};

const QuickAccessCard: React.FC<{ title: string; description: string; href: string; isExternal?: boolean }> = ({ title, description, href, isExternal }) => {
    const content = (
        <Card className="text-right hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
           <div className="flex-grow">
             <h3 className="text-2xl font-bold">{title}</h3>
             <p className="text-gray-600 mt-2">{description}</p>
           </div>
            <div className="text-[#007a3d] font-bold mt-4">← اعرف المزيد</div>
        </Card>
    );
    
    const props = isExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

    return <a {...props}>{content}</a>;
};

const TimelineStep: React.FC<{ step: number; title: string; isActive: boolean }> = ({ step, title, isActive }) => (
    <div className="relative flex-1 text-center">
        <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10 relative ${isActive ? 'bg-white text-[#007a3d]' : 'bg-green-800 text-green-300'}`}>
            {step}
        </div>
        <p className="mt-2 font-semibold">{title}</p>
    </div>
);

const observerOrgs = [
    { name: "IHEC", fullName: "المفوضية العليا المستقلة للانتخابات", link: "https://ihec.iq/" },
    { name: "UNAMI", fullName: "بعثة الأمم المتحدة لمساعدة العراق", link: "https://uniraq.unmissions.org/" },
    { name: "EU EOM", fullName: "بعثة مراقبة الانتخابات التابعة للاتحاد الأوروبي", link: "https://www.eeas.europa.eu/delegations/iraq_en" },
    { name: "IFES", fullName: "المؤسسة الدولية للأنظمة الانتخابية", link: "https://www.ifes.org/countries/iraq" },
];


const InformationPortalPage: React.FC<{ language: 'ar' | 'en' | 'ku' }> = ({ language }) => {
  return (
    <div className="bg-white">
        <HeroCarousel />

        <section className="py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800">بوابة الوصول السريع</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                    <QuickAccessCard title="👤 للمرشحين" description="قواعد التسجيل والمواعيد والمتطلبات" href="#candidate-info" />
                    <QuickAccessCard title="🗳️ للناخبين" description="معلومات التصويت والمواقع والتحقق" href="#voter-info" />
                    <QuickAccessCard title="🏛️ بوابة IHEC الرسمية" description="وصول مباشر للهيئة الانتخابية الرسمية" href="https://ihec.iq/" isExternal />
                    <QuickAccessCard title="⚖️ الإطار القانوني" description="قواعد تمويل الحملات واللوائح" href="#legal-info" />
                </div>
            </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-green-600 to-green-800 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">الجدول الزمني للانتخابات ٢٠٢٥</h2>
                <div className="relative flex items-start justify-between">
                    <div className="absolute top-5 left-0 w-full h-1 bg-green-500 opacity-50"></div>
                    <TimelineStep step={1} title="فتح التسجيل" isActive={true} />
                    <TimelineStep step={2} title="التحقق" isActive={false} />
                    <TimelineStep step={3} title="فترة الحملة" isActive={false} />
                    <TimelineStep step={4} title="يوم الانتخابات" isActive={false} />
                </div>
            </div>
        </section>

        <section id="observers" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">منظمات المراقبة الدولية</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {observerOrgs.map(org => (
                        <Card key={org.name} className="text-center py-8 flex flex-col justify-between">
                            <div>
                                <h4 className="text-2xl font-bold">{org.name}</h4>
                                <p className="text-gray-600 mt-2 text-sm">{org.fullName}</p>
                            </div>
                            <a href={org.link} target="_blank" rel="noopener noreferrer">
                               <Button variant="outline" className="mt-4">زيارة الموقع</Button>
                            </a>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="candidate-info" className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">متطلبات تسجيل المرشحين</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card><h3 className="text-xl font-bold">📝 الجنسية</h3><p>يجب أن يكون مواطنًا عراقيًا.</p></Card>
                    <Card><h3 className="text-xl font-bold">🎂 العمر المطلوب</h3><p>الحد الأدنى 28 سنة.</p></Card>
                    <Card><h3 className="text-xl font-bold">🔍 فحص الخلفية</h3><p>سجل جنائي نظيف.</p></Card>
                    <Card><h3 className="text-xl font-bold">⏰ الموعد النهائي</h3><p>التسجيل قبل التاريخ المحدد.</p></Card>
                </div>
            </div>
        </section>

        <section id="legal-info" className="py-16 bg-gray-50">
             <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">اللوائح القانونية والمالية</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card><h3 className="text-xl font-bold">💰 الشفافية</h3><p>يجب إبلاغ IHEC بجميع التبرعات.</p></Card>
                    <Card><h3 className="text-xl font-bold">🚫 قيود التمويل</h3><p>لا يسمح بالتبرعات الأجنبية.</p></Card>
                    <Card><h3 className="text-xl font-bold">⚖️ العقوبات</h3><p>قد تؤدي الانتهاكات إلى غرامات أو استبعاد.</p></Card>
                </div>
            </div>
        </section>
    </div>
  );
};

export default InformationPortalPage;