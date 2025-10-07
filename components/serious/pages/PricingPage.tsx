import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const PricingTier: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}> = ({ title, price, description, features, isFeatured }) => (
  <Card className={`flex flex-col h-full ${isFeatured ? 'border-2 border-[#007a3d] relative' : ''}`}>
    {isFeatured && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#007a3d] text-white px-4 py-1 rounded-full text-sm font-bold">
        الأكثر شيوعًا
      </div>
    )}
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
      <div className="mt-6">
        <span className="text-5xl font-extrabold text-gray-900">{price}</span>
        <span className="text-lg font-medium text-gray-500"> د.ع/شهر</span>
      </div>
    </div>
    <ul className="mt-8 space-y-4 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 ml-3 rtl:ml-0 rtl:mr-3" />
          <span className="text-gray-700 text-right">{feature}</span>
        </li>
      ))}
    </ul>
    <div className="mt-8">
      <Button variant={isFeatured ? 'primary' : 'outline'} className="w-full">
        {isFeatured ? 'ابدأ الآن' : 'اختر الخطة'}
      </Button>
    </div>
  </Card>
);

const PricingPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900">خطط أسعار مرنة للجميع</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            اختر الخطة التي تناسب احتياجات حملتك، سواء كنت مرشحًا مستقلاً أو جزءًا من حزب سياسي كبير.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch">
          <PricingTier
            title="المرشح المستقل"
            price="١٥٠٬٠٠٠"
            description="للمرشحين الأفراد الذين يبدأون حملتهم الرقمية."
            features={[
              'صفحة مرشح شخصية',
              'توثيق الحساب (علامة خضراء)',
              'لوحة بيانات أساسية',
              'دعم عبر البريد الإلكتروني',
            ]}
          />
          <PricingTier
            title="الحملة المتقدمة"
            price="٢٥٠٬٠٠٠"
            description="للحملات المنظمة التي تحتاج إلى أدوات تحليلية متقدمة."
            features={[
              'كل مزايا خطة المرشح المستقل',
              'تحليلات متقدمة للجمهور',
              'إدارة فريق الحملة (حتى 5 أعضاء)',
              'تكامل مع وسائل التواصل الاجتماعي',
              'دعم ذو أولوية',
            ]}
            isFeatured
          />
          <PricingTier
            title="الحزب السياسي"
            price="مخصص"
            description="حلول شاملة للأحزاب والتحالفات السياسية الكبرى."
            features={[
              'كل مزايا خطة الحملة المتقدمة',
              'إدارة مركزية لجميع المرشحين',
              'بوابات بعلامة تجارية خاصة (White-label)',
              'وصول عبر API',
              'مدير حساب مخصص',
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;