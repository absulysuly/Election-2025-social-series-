import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import UsersIcon from '../components/icons/UsersIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import ChartLineIcon from '../components/icons/ChartLineIcon';
import HandsHelpingIcon from '../components/icons/HandsHelpingIcon';
import GraduationCapIcon from '../components/icons/GraduationCapIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string; linkText: string; }> = ({ icon, title, description, link, linkText }) => (
    <Card className="text-center h-full hover:shadow-xl transition-shadow flex flex-col">
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
                {icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 flex-grow mb-6">{description}</p>
        <Link to={link}>
            <Button variant="outline">{linkText}</Button>
        </Link>
    </Card>
);

const PlatformHomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white text-center py-24" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold">منصة صوت العراق ۲۰۲٥</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
            تمكين الديمقراطية من خلال التكنولوجيا. أدوات شاملة للناخبين والمرشحين والمراقبين لانتخابات نزيهة وشفافة.
          </p>
          <div className="mt-10 flex justify-center space-x-4 space-x-reverse">
             <Link to="/dashboard"><Button variant="primary" className="text-lg px-8 py-3">اذهب إلى لوحة التحكم</Button></Link>
             <Link to="/election-hub"><Button variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-gray-800">دليل الناخب</Button></Link>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">أركان منصتنا الأساسية</h2>
            <p className="mt-3 text-lg text-gray-500">مهمتنا مبنية على ثلاث ركائز أساسية لخدمة العملية الديمقراطية.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<GraduationCapIcon className="w-10 h-10 text-[#007a3d]" />}
              title="تثقيف الناخبين"
              description="توفير معلومات واضحة وموثوقة حول المرشحين والعملية الانتخابية لمساعدة الناخبين على اتخاذ قرارات مستنيرة."
              link="/election-hub"
              linkText="استكشف دليل الناخب"
            />
            <FeatureCard
              icon={<UsersIcon className="w-10 h-10 text-[#007a3d]" />}
              title="تمكين المرشحين"
              description="تزويد المرشحين والأحزاب بالأدوات الرقمية لإدارة حملاتهم بكفاءة والوصول إلى جمهور أوسع بطريقة مسؤولة."
              link="/parties"
              linkText="تعرف على حلول الأحزاب"
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="w-10 h-10 text-[#007a3d]" />}
              title="تعزيز النزاهة"
              description="تعزيز الشفافية من خلال مراقبة البيانات، وتسهيل الإبلاغ عن المخالفات، ودعم جهود المراقبة المحلية والدولية."
              link="/integrity-hub"
              linkText="ساهم في النزاهة"
            />
          </div>
        </div>
      </section>
      
      {/* Data and Transparency Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <div className="flex items-center text-[#007a3d] mb-3">
                    <ChartLineIcon className="w-7 h-7 ml-2 rtl:mr-2" />
                    <h3 className="text-lg font-bold uppercase">البيانات من أجل الديمقراطية</h3>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">منصة الشفافية الرقمية</h2>
                <p className="text-lg text-gray-600 mb-6">
                    نحن نؤمن بقوة البيانات في كشف الحقائق. توفر منصتنا تحليلات معمقة حول الإنفاق الإعلاني، وتتبع المعلومات المضللة، وتوفر وصولاً مفتوحًا إلى البيانات الانتخابية لتعزيز المساءلة.
                </p>
                <Link to="/digital-transparency">
                    <Button variant="secondary">استكشف منصة الشفافية</Button>
                </Link>
            </div>
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop" alt="Data Analytics Dashboard" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <HandsHelpingIcon className="w-16 h-16 text-[#007a3d] mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800">كن جزءًا من التغيير</h2>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            مستقبل العراق يعتمد على مشاركة الجميع. سواء بالإبلاغ عن مخالفة، أو التطوع في المراقبة، أو ببساطة ممارسة حقك في التصويت، فإن مساهمتك تحدث فرقًا.
          </p>
          <div className="mt-8">
            <Link to="/integrity-hub">
              <Button className="text-xl">انضم إلى جهودنا</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlatformHomePage;
