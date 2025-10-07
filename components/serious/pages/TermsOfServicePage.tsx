import React from 'react';
import Card from '../components/ui/Card';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-extrabold text-gray-900">شروط الخدمة</h1>
                            <p className="mt-2 text-gray-500">آخر تحديث: {new Date().toLocaleDateString('ar-IQ')}</p>
                        </div>
                        <div className="prose prose-lg max-w-none text-right mx-auto space-y-4">
                            <h2 className="font-bold">1. القبول بالشروط</h2>
                            <p>
                                باستخدامك لمنصة انتخابات العراق ۲۰۲٥ ("المنصة")، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.
                            </p>
                            
                            <h2 className="font-bold">2. استخدام المنصة</h2>
                            <p>
                                تهدف المنصة إلى توفير معلومات وأدوات تتعلق بالانتخابات العراقية. يجب استخدام جميع المعلومات والمحتويات لأغراض إعلامية وقانونية فقط. يُحظر استخدام المنصة لنشر معلومات مضللة أو خطاب كراهية.
                            </p>

                            <h2 className="font-bold">3. المحتوى المقدم من المستخدم</h2>
                            <p>
                                عند تقديم أي محتوى إلى المنصة (مثل البلاغات في مركز النزاهة)، فإنك تمنحنا ترخيصًا غير حصري لاستخدام هذا المحتوى في سياق تشغيل المنصة. أنت مسؤول عن دقة وقانونية المحتوى الذي تقدمه.
                            </p>
                            
                             <h2 className="font-bold">4. إخلاء المسؤولية</h2>
                            <p>
                                المعلومات المقدمة على هذه المنصة هي لأغراض إعلامية عامة فقط. بينما نسعى جاهدين للحفاظ على دقة المعلومات، فإننا لا نقدم أي ضمانات من أي نوع بخصوص اكتمالها أو دقتها.
                            </p>

                            <h2 className="font-bold">5. إنهاء الاستخدام</h2>
                            <p>
                                نحتفظ بالحق في إنهاء أو تعليق وصولك إلى المنصة دون إشعار مسبق، لأي سلوك نعتبره انتهاكًا لهذه الشروط.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;