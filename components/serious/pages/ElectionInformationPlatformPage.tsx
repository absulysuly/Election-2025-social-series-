// FIX: Replaced placeholder content with a functional ElectionInformationPlatformPage component.
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import UsersIcon from '../components/icons/UsersIcon';
import GraduationCapIcon from '../components/icons/GraduationCapIcon';

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; description: string; linkTo: string; linkText: string; }> = ({ icon, title, description, linkTo, linkText }) => (
    <Card className="text-center h-full flex flex-col items-center">
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
                {icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 flex-grow mb-6">{description}</p>
        <Link to={linkTo}>
            <Button variant="outline">{linkText}</Button>
        </Link>
    </Card>
);


const ElectionInformationPlatformPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">منصة معلومات الانتخابات</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            موردك المركزي الموثوق لكل ما يتعلق بالانتخابات العراقية ٢٠٢٥. نحن نمكّن الناخبين، وندعم المرشحين، ونعزز الشفافية.
          </p>
        </div>
      </section>

      {/* For Everyone Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">مصممة للجميع</h2>
            <p className="mt-3 text-lg text-gray-500">سواء كنت ناخبًا، مرشحًا، أو مراقبًا، لدينا الأدوات والموارد التي تحتاجها.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <InfoCard
                icon={<GraduationCapIcon className="w-8 h-8 text-[#007a3d]" />}
                title="للناخبين"
                description="ابحث عن مرشحيك، تحقق من مركز اقتراعك، وافهم العملية الانتخابية. صوتك مهم، ونحن نساعدك على استخدامه بحكمة."
                linkTo="/election-hub"
                linkText="دليل الناخب"
            />
            <InfoCard
                icon={<UsersIcon className="w-8 h-8 text-[#007a3d]" />}
                title="للمرشحين والأحزاب"
                description="أدوات لإدارة حملتك الرقمية بكفاءة، وفهم القواعد، والوصول إلى الناخبين بشكل فعال ومبتكر."
                linkTo="/dashboard"
                linkText="بوابة المرشح"
            />
            <InfoCard
                icon={<ShieldCheckIcon className="w-8 h-8 text-[#007a3d]" />}
                title="للمراقبين والإعلام"
                description="بيانات دقيقة، وأدوات مراقبة، وتقارير شاملة لدعم نزاهة العملية الانتخابية وتعزيز الشفافية."
                linkTo="/international-portal"
                linkText="بوابة الشفافية"
            />
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
       <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold">مهمتنا</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                نحن ملتزمون بتعزيز الديمقراطية في العراق من خلال توفير منصة رقمية شاملة وموثوقة. نعمل على زيادة وعي الناخبين، ودعم الحملات النظيفة، وتسهيل المراقبة الفعالة لضمان انتخابات حرة ونزيهة للجميع.
            </p>
             <div className="mt-8">
                <Link to="/integrity-hub">
                    <Button variant="primary" className="text-xl">ساهم في النزاهة</Button>
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ElectionInformationPlatformPage;
