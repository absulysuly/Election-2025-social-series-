import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ApiIcon from '../components/icons/ApiIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import UsersIcon from '../components/icons/UsersIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <Card className="text-center">
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
                {icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </Card>
);

const PoliticalPartyPortalPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-800 text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">حلول متكاملة للأحزاب السياسية</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
            أدوات قوية لإدارة حملات مرشحيك، تنسيق الرسائل، وتحليل الأداء على مستوى الحزب.
          </p>
          <div className="mt-10">
            <Button variant="primary" className="text-xl px-8 py-4">اطلب عرضًا توضيحيًا</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">صُمم لنجاحكم</h2>
            <p className="mt-3 text-lg text-gray-500">كل ما يحتاجه حزبك لإدارة حملة انتخابية رقمية حديثة وفعالة.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
                icon={<UsersIcon className="w-8 h-8 text-[#007a3d]" />}
                title="إدارة المرشحين بالجملة"
                description="إضافة وإدارة جميع مرشحي حزبك من لوحة تحكم مركزية واحدة، مع تحديد الصلاحيات والمتابعة."
            />
            <FeatureCard
                icon={<DocumentTextIcon className="w-8 h-8 text-[#007a3d]" />}
                title="تحليلات على مستوى الحزب"
                description="احصل على رؤى شاملة حول أداء جميع مرشحيك، قارن بين الحملات، وحدد استراتيجياتك بناءً على البيانات."
            />
            <FeatureCard
                icon={<ApiIcon className="w-8 h-8 text-[#007a3d]" />}
                title="بوابات بعلامة تجارية خاصة (White-label)"
                description="قدم لمرشحيك بوابات خاصة تحمل شعار وهوية حزبك لتعزيز التواجد الموحد والمتكامل."
            />
          </div>
        </div>
      </section>
      
      {/* Pricing/Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800">خطط تسعير مرنة</h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">نحن نقدم حلولاً مخصصة تناسب حجم حزبك واحتياجاته، بدءًا من الباقات الأساسية للمجموعات الصغيرة إلى الحلول المؤسسية الكاملة للتحالفات الكبرى.</p>
            <div className="mt-8">
                <Button variant="secondary" className="text-xl px-8 py-4">تواصل مع قسم المبيعات</Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default PoliticalPartyPortalPage;