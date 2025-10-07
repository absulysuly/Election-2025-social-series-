import React from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { IRAQ_GOVERNORATES } from '../constants';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import { submitIntegrityReport } from '../services/api';

const IhecDirectLinks: React.FC = () => (
    <Card className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">روابط مباشرة لمفوضية الانتخابات (IHEC)</h2>
        <div className="grid sm:grid-cols-3 gap-4">
            <a href="https://ihec.iq/en/" target="_blank" rel="noopener noreferrer">
                <Button className="w-full" variant="secondary">الموقع الرسمي لـ IHEC</Button>
            </a>
            <a href="https://ihec.iq/en/" target="_blank" rel="noopener noreferrer">
                <Button className="w-full" variant="secondary">بوابة تسجيل المرشحين</Button>
            </a>
            <a href="https://ihec.iq/en/" target="_blank" rel="noopener noreferrer">
                <Button className="w-full" variant="secondary">إرشادات ولوائح الانتخابات</Button>
            </a>
        </div>
    </Card>
);


const IntegrityHubPage: React.FC = () => {
    const [submissionState, setSubmissionState] = React.useState<{ status: 'idle' | 'submitting' | 'success' | 'error', message: string, trackingId?: string }>({ status: 'idle', message: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionState({ status: 'submitting', message: '' });

        const formData = new FormData(e.currentTarget);
        
        try {
            // Windsurf Integration Point: Calling the data access layer to submit the report.
            const response = await submitIntegrityReport(formData);
            if (response.success) {
                setSubmissionState({ status: 'success', message: '', trackingId: response.trackingId });
            } else {
                 throw new Error('Submission failed, please try again.');
            }
        } catch (error) {
            setSubmissionState({ status: 'error', message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    };

    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900">مركز النزاهة الانتخابية</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                            مساهمتك ضرورية لضمان انتخابات نزيهة. أبلغ عن أي مخالفات بشكل آمن ومجهول.
                        </p>
                    </div>
                    
                    <IhecDirectLinks />

                    {submissionState.status === 'success' ? (
                         <Card className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-green-100 rounded-full">
                                   <DocumentTextIcon className="w-12 h-12 text-[#007a3d]" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">تم استلام بلاغك بنجاح!</h2>
                            <p className="text-gray-600 mb-2">رقم المتابعة الخاص بك هو: <span className="font-mono bg-gray-200 p-1 rounded">{submissionState.trackingId}</span></p>
                            <p className="text-gray-600">شكرًا لك على مساهمتك في الحفاظ على نزاهة العملية الانتخابية. سيقوم فريقنا بمراجعة البلاغ واتخاذ الإجراءات اللازمة.</p>
                            <Button onClick={() => setSubmissionState({ status: 'idle', message: '' })} className="mt-6">تقديم بلاغ آخر</Button>
                        </Card>
                    ) : (
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">تفاصيل البلاغ</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <Select id="governorate" name="governorate" label="المحافظة" required>
                                        <option value="">اختر محافظة</option>
                                        {IRAQ_GOVERNORATES.map(gov => (
                                            <option key={gov.id} value={gov.id}>{gov.name}</option>
                                        ))}
                                    </Select>
                                     <Select id="violation-type" name="violationType" label="نوع المخالفة" required>
                                        <option value="">اختر نوع المخالفة</option>
                                        <option value="improper_campaigning">دعاية انتخابية مخالفة (تمزيق صور، خارج الأوقات المحددة)</option>
                                        <option value="hate_speech">خطاب كراهية أو تحريض</option>
                                        <option value="vote_buying">شراء أصوات أو وعود غير قانونية</option>
                                        <option value="misinformation">نشر معلومات مضللة</option>
                                        <option value="other">أخرى</option>
                                    </Select>
                                </div>
                                <Textarea
                                    id="description"
                                    name="description"
                                    label="وصف المخالفة"
                                    placeholder="يرجى تقديم وصف تفصيلي للمخالفة، بما في ذلك الزمان والمكان والأشخاص المتورطين إن أمكن."
                                    required
                                />
                                <Input
                                    id="evidence"
                                    name="evidence"
                                    type="file"
                                    label="إرفاق دليل (صورة، فيديو، مستند)"
                                    accept="image/*,video/*,.pdf,.doc,.docx"
                                />
                                <div className="pt-4 text-center">
                                    <Button type="submit" className="w-full md:w-auto" disabled={submissionState.status === 'submitting'}>
                                        {submissionState.status === 'submitting' ? 'جار الإرسال...' : 'إرسال البلاغ'}
                                    </Button>
                                </div>
                                {submissionState.status === 'error' && (
                                    <p className="text-center text-sm text-red-500 pt-2">
                                        حدث خطأ: {submissionState.message}
                                    </p>
                                )}
                                 <p className="text-center text-sm text-gray-500 pt-4">
                                    نحن نضمن سرية معلوماتك. سيتم التعامل مع جميع البلاغات بأقصى درجات الخصوصية.
                                </p>
                            </form>
                        </Card>
                    )}
                     <Card className="mt-12">
                        <h2 className="text-3xl font-bold text-center mb-6">منظمات المراقبة المعتمدة</h2>
                        <div className="flex justify-center items-center flex-wrap gap-8 grayscale opacity-75">
                            <p className="font-bold text-lg">شبكة عين لمراقبة الانتخابات</p>
                            <p className="font-bold text-lg">National Democratic Institute (NDI)</p>
                            <p className="font-bold text-lg">International Republican Institute (IRI)</p>
                            <p className="font-bold text-lg">EU Election Observation Mission</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default IntegrityHubPage;