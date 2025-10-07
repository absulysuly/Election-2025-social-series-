import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ApiIcon from '../components/icons/ApiIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import UsersIcon from '../components/icons/UsersIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; buttonText: string }> = ({ icon, title, description, buttonText }) => (
    <Card className="flex flex-col items-center text-center">
        <div className="p-4 bg-green-100 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 flex-grow mb-6">{description}</p>
        <Button variant="outline">{buttonText}</Button>
    </Card>
);

const InternationalPortalPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900">بوابة الشركاء الدوليين</h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
                أدوات متقدمة للمنظمات الدولية والمراقبين لتعزيز شفافية وديمقراطية الانتخابات العراقية.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
                icon={<ApiIcon className="w-8 h-8 text-[#007a3d]" />}
                title="مراقبة حية وتتبع الانتهاكات"
                description="الوصول إلى خرائط مراقبة تفاعلية حية وتتبع الانتهاكات المبلغ عنها مع بيانات تحديد الموقع الجغرافي."
                buttonText="طلب وصول تجريبي"
            />
            <FeatureCard
                icon={<DocumentTextIcon className="w-8 h-8 text-[#007a3d]" />}
                title="تقارير متعددة اللغات"
                description="إنشاء وتصدير تقارير شاملة بصيغ PDF/Excel باللغات العربية والإنجليزية والكردية لدعم هيئات المراقبة الدولية."
                buttonText="استعراض نماذج التقارير"
            />
            <FeatureCard
                icon={<UsersIcon className="w-8 h-8 text-[#007a3d]" />}
                title="API لمنظمات الديمقراطية"
                description="واجهة برمجة تطبيقات (API) مخصصة للوصول إلى بيانات انتخابية غير شخصية لدمجها مع مؤشرات الديمقراطية العالمية."
                buttonText="قراءة توثيق الـ API"
            />
        </div>

        <Card className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">الامتثال للمعايير الدولية</h2>
            <p className="max-w-3xl mx-auto text-gray-700">
                تم تصميم بوابتنا لدعم أهداف الأمم المتحدة للتنمية المستدامة (SDG 16) المتعلقة بالسلام والعدل والمؤسسات القوية. نحن ملتزمون بتوفير بيانات دقيقة وموثوقة لدعم الشفافية والمساءلة.
            </p>
            <div className="mt-6">
                <Button>تواصل معنا للشراكات</Button>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default InternationalPortalPage;