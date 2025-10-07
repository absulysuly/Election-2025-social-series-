import React from 'react';
import Card from '../components/ui/Card';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-extrabold text-gray-900">سياسة الخصوصية</h1>
                            <p className="mt-2 text-gray-500">آخر تحديث: {new Date().toLocaleDateString('ar-IQ')}</p>
                        </div>
                        <div className="prose prose-lg max-w-none text-right mx-auto space-y-4">
                            <h2 className="font-bold">مقدمة</h2>
                            <p>
                                تلتزم منصة انتخابات العراق ۲۰۲٥ بحماية خصوصية زوارنا ومستخدمينا. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات الشخصية التي تقدمها لنا.
                            </p>
                            
                            <h2 className="font-bold">المعلومات التي نجمعها</h2>
                            <p>
                                قد نجمع معلومات شخصية مثل الاسم والبريد الإلكتروني عند التسجيل في النشرات الإخبارية أو عند تقديم بلاغ عبر مركز النزاهة. يتم جمع جميع البيانات بشكل آمن وبموافقتك.
                            </p>

                            <h2 className="font-bold">كيف نستخدم معلوماتك</h2>
                            <p>
                                تُستخدم المعلومات التي نجمعها لتحسين تجربتك على المنصة، وللتواصل معك بشأن التحديثات الهامة، ولمعالجة البلاغات المقدمة. نحن لا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك الصريحة.
                            </p>
                            
                             <h2 className="font-bold">أمن البيانات</h2>
                            <p>
                                نتخذ تدابير أمنية معقولة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الكشف.
                            </p>

                            <h2 className="font-bold">التغييرات على هذه السياسة</h2>
                            <p>
                                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة.
                            </p>

                            <h2 className="font-bold">اتصل بنا</h2>
                            <p>
                                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على privacy@iraqelection2025.iq.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;