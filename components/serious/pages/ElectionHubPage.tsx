import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ClipboardCheckIcon from "../components/icons/ClipboardCheckIcon";
import LocationMarkerIcon from "../components/icons/LocationMarkerIcon";
import VoteYeaIcon from "../components/icons/VoteYeaIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";

interface InfoStep {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    href: string;
}

interface TimelineMilestone {
    title: string;
    description: string;
    timeframe: string;
}

interface FaqEntry {
    question: string;
    answer: React.ReactNode;
}

const infoSteps: InfoStep[] = [
    {
        icon: <ClipboardCheckIcon className="w-10 h-10 text-[#007a3d]" />,
        title: "١. تحقق من تسجيلك",
        description: "تأكد من أن اسمك مدرج في سجل الناخبين الرسمي لتتمكن من التصويت.",
        buttonText: "التحقق الآن",
        href: "https://ihec.iq/",
    },
    {
        icon: <LocationMarkerIcon className="w-10 h-10 text-[#007a3d]" />,
        title: "٢. جد مركز اقتراعك",
        description: "اعرف مكان مركز الاقتراع المخصص لك قبل يوم الانتخابات لتجنب أي تأخير.",
        buttonText: "ابحث عن مركزك",
        href: "https://ihec.iq/",
    },
    {
        icon: <VoteYeaIcon className="w-10 h-10 text-[#007a3d]" />,
        title: "٣. تعرف على المرشحين",
        description: "استكشف المرشحين في دائرتك الانتخابية وبرامجهم لاتخاذ قرار مستنير.",
        buttonText: "استكشف المرشحين",
        href: "/governorate/baghdad",
    },
    {
        icon: <CalendarIcon className="w-10 h-10 text-[#007a3d]" />,
        title: "٤. خطط ليوم التصويت",
        description: "تذكر أن يوم الانتخابات هو ١١ نوفمبر ٢٠٢٥. خطط لوقت ذهابك للإدلاء بصوتك.",
        buttonText: "عرض الجدول الزمني",
        href: "#timeline",
    },
];

const timelineMilestones: TimelineMilestone[] = [
    {
        title: "فتح التسجيل",
        description: "بدء استقبال طلبات تسجيل المرشحين والقوائم الانتخابية.",
        timeframe: "يناير – فبراير ٢٠٢٥",
    },
    {
        title: "التدقيق والاعتماد",
        description: "مراجعة بيانات المرشحين والقوائم من قبل مفوضية الانتخابات.",
        timeframe: "مارس ٢٠٢٥",
    },
    {
        title: "الحملة الانتخابية",
        description: "الفترة الرسمية للحملات الإعلامية وتقديم البرامج الانتخابية.",
        timeframe: "أبريل – أكتوبر ٢٠٢٥",
    },
    {
        title: "يوم الاقتراع",
        description: "فتح مراكز الاقتراع في عموم العراق وإتاحة التصويت للمواطنين.",
        timeframe: "١١ نوفمبر ٢٠٢٥",
    },
];

const faqEntries: FaqEntry[] = [
    {
        question: "ما هي الوثائق المطلوبة للتصويت؟",
        answer: (
            <p>
                للإدلاء بصوتك، يجب عليك إبراز بطاقتك الوطنية الموحدة أو هوية الأحوال المدنية مع شهادة
                الجنسية العراقية، بالإضافة إلى بطاقة الناخب البيومترية.
            </p>
        ),
    },
    {
        question: "كيف يمكنني التأكد من أنني مسجل بشكل صحيح؟",
        answer: (
            <p>
                يمكنك التحقق من تسجيلك عبر الموقع الرسمي للمفوضية العليا المستقلة للانتخابات (IHEC) أو
                بزيارة أقرب مركز تسجيل تابع للمفوضية في منطقتك.
            </p>
        ),
    },
    {
        question: "هل يمكنني التصويت إذا كنت خارج العراق؟",
        answer: (
            <p>
                نعم، تنظم المفوضية عادةً عمليات تصويت للعراقيين في الخارج. تابع إعلانات المفوضية الرسمية
                لمعرفة الإجراءات والمواقع المخصصة للتصويت في بلد إقامتك.
            </p>
        ),
    },
    {
        question: "ماذا أفعل إذا واجهت مشكلة في مركز الاقتراع؟",
        answer: (
            <p>
                في حال واجهت أي مشكلة، يمكنك التحدث إلى مدير مركز الاقتراع. إذا لم يتم حل المشكلة، يمكنك
                تقديم شكوى رسمية عبر القنوات التي تحددها المفوضية أو الإبلاغ عن مخالفة عبر
                <Link to="/integrity-hub" className="text-[#007a3d] font-semibold ml-1">
                    مركز النزاهة
                </Link>
                .
            </p>
        ),
    },
];

const isExternalHref = (href: string) => /^https?:/i.test(href);

const InfoStepCard: React.FC<InfoStep> = ({ icon, title, description, buttonText, href }) => {
    const button = <Button variant="outline">{buttonText}</Button>;

    let action: React.ReactNode;

    if (isExternalHref(href)) {
        action = (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {button}
            </a>
        );
    } else if (href.startsWith("#")) {
        action = <a href={href}>{button}</a>;
    } else {
        action = <Link to={href}>{button}</Link>;
    }

    return (
        <Card className="text-center h-full flex flex-col items-center">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">{icon}</div>
            </div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 flex-grow mb-6">{description}</p>
            {action}
        </Card>
    );
};

const FaqItem: React.FC<FaqEntry> = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                onClick={() => setOpen((value) => !value)}
                className="w-full text-right flex justify-between items-center py-5 px-2 focus:outline-none"
            >
                <h4 className="text-lg font-semibold text-gray-800">{question}</h4>
                <ArrowDownIcon className={w-6 h-6 transition-transform } />
            </button>
            {open && <div className="pb-5 px-2 text-gray-600">{answer}</div>}
        </div>
    );
};

const ElectionHubPage: React.FC = () => (
    <div className="bg-white">
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">المركز الإرشادي للناخبين</h1>
                <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
                    كل ما تحتاجه لمعرفة حقوقك، والتحقق من تسجيلك، والمشاركة بفعالية في انتخابات العراق ٢٠٢٥.
                </p>
            </div>
        </section>

        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">خطواتك ليوم الانتخاب</h2>
                    <p className="mt-3 text-lg text-gray-500">مشاركة سهلة وواعية في 4 خطوات بسيطة.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {infoSteps.map((step) => (
                        <InfoStepCard key={step.title} {...step} />
                    ))}
                </div>
            </div>
        </section>

        <section id="timeline" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">الجدول الزمني للانتخابات</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {timelineMilestones.map((milestone) => (
                        <Card key={milestone.title} className="h-full border-l-4 border-[#007a3d]">
                            <h3 className="text-2xl font-bold text-[#003366]">{milestone.title}</h3>
                            <p className="text-sm text-[#007a3d] font-semibold mt-2">{milestone.timeframe}</p>
                            <p className="text-gray-600 mt-3">{milestone.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">الأسئلة الشائعة</h2>
                    <p className="mt-3 text-lg text-gray-500">إجابات لأكثر الأسئلة تداولاً حول العملية الانتخابية.</p>
                </div>
                <Card>
                    {faqEntries.map((entry) => (
                        <FaqItem key={entry.question} {...entry} />
                    ))}
                </Card>
            </div>
        </section>
    </div>
);

export default ElectionHubPage;
