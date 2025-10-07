import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ChartLineIcon from '../components/icons/ChartLineIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import UserCheckIcon from '../components/icons/UserCheckIcon';
import GavelIcon from '../components/icons/GavelIcon';
import FileAltIcon from '../components/icons/FileAltIcon';
import VoteYeaIcon from '../components/icons/VoteYeaIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <Card className="text-center h-full flex flex-col">
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
                {icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
    </Card>
);

const DigitalTransparencyPlatformPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-800 text-center py-20 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">منصة الشفافية الرقمية</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
            بيانات حية، تحليلات معمقة، ومراقبة شاملة لضمان انتخابات نزيهة وشفافة.
          </p>
          <div className="mt-10">
            <Button variant="primary" className="text-xl px-8 py-4">استكشف البيانات</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">أدواتنا للشفافية</h2>
            <p className="mt-3 text-lg text-gray-500">نقدم مجموعة من الأدوات التفاعلية للمراقبين، الصحفيين، والجمهور.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
                icon={<ChartLineIcon className="w-8 h-8 text-[#007a3d]" />}
                title="تحليلات الإنفاق الإعلاني"
                description="تتبع وتحليل الإنفاق الإعلاني للمرشحين والأحزاب على منصات التواصل الاجتماعي."
            />
            <FeatureCard
                icon={<ShieldCheckIcon className="w-8 h-8 text-[#007a3d]" />}
                title="مرصد المعلومات المضللة"
                description="رصد حملات التضليل والأخبار الكاذبة المتعلقة بالانتخابات والإبلاغ عنها."
            />
            <FeatureCard
                icon={<UserCheckIcon className="w-8 h-8 text-[#007a3d]" />}
                title="سجل المرشحين الموثق"
                description="قاعدة بيانات مركزية وقابلة للبحث لجميع المرشحين المعتمدين من قبل المفوضية (IHEC)."
            />
            <FeatureCard
                icon={<GavelIcon className="w-8 h-8 text-[#007a3d]" />}
                title="سجل المخالفات الانتخابية"
                description="عرض عام لجميع المخالفات المبلغ عنها، وحالتها، والإجراءات المتخذة بشأنها."
            />
             <FeatureCard
                icon={<FileAltIcon className="w-8 h-8 text-[#007a3d]" />}
                title="مكتبة الوثائق الرسمية"
                description="وصول سهل ومنظم لجميع القوانين، اللوائح، والقرارات الصادرة عن المفوضية."
            />
             <FeatureCard
                icon={<VoteYeaIcon className="w-8 h-8 text-[#007a3d]" />}
                title="مراقبة المشاركة الحية"
                description="بيانات وخرائط تفاعلية حول نسب المشاركة المتوقعة والمحدثة بانتظام."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800">كن شريكًا في النزاهة</h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">هل تمثل منظمة مجتمع مدني أو وسيلة إعلامية؟ تواصل معنا للوصول إلى بيانات متقدمة وأدوات خاصة.</p>
            <div className="mt-8">
                <Button variant="secondary" className="text-xl px-8 py-4">تواصل معنا</Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalTransparencyPlatformPage;
