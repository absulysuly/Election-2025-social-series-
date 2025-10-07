import { Language } from './types.ts';

type Translations = {
    [key in Language]: {
        social: string;
        serious: string;
        whoToFollow: string;
        platformRules: string;
        rule1: string;
        rule2: string;
        rule3: string;
        rule4: string;
        welcomeToHamlet: string;
        chooseYourRole: string;
        iAmVoter: string;
        voterDescription: string;
        iAmCandidate: string;
        candidateDescription: string;
    }
}

export const UI_TEXT: Translations = {
    en: {
        social: 'Social',
        serious: 'Serious',
        whoToFollow: 'Who to follow',
        platformRules: 'Platform Rules',
        rule1: 'Be respectful to others.',
        rule2: 'No hate speech or harassment.',
        rule3: 'Verify information before sharing.',
        rule4: 'Engage in constructive dialogue.',
        welcomeToHamlet: 'Welcome to Hamlet',
        chooseYourRole: 'Choose your role to get started.',
        iAmVoter: 'I am a Voter',
        voterDescription: 'Follow candidates, join debates, and stay informed.',
        iAmCandidate: 'I am a Candidate',
        candidateDescription: 'Create posts, share your message, and engage with voters.',
    },
    ku: {
        social: 'کۆمەڵایەتی',
        serious: 'جدی',
        whoToFollow: 'کێ فۆڵۆ بکەیت',
        platformRules: 'ڕێنماییەکان',
        rule1: 'ڕێز لە کەسانی تر بگرە.',
        rule2: 'دووربە لە وتاری ڕق و گێچەڵی ئەلکترۆni.',
        rule3: 'پێش بڵاوکردنەوە، لە ڕاستی زانیارییەکان دڵنیابە.',
        rule4: 'بەشداری بکە لە گفتوگۆی بنیاتنەرانە.',
        welcomeToHamlet: 'بەخێربێن بۆ ھاملێت',
        chooseYourRole: 'ڕۆڵی خۆت هەڵبژێرە بۆ دەستپێکردن.',
        iAmVoter: 'من دەنگدەرم',
        voterDescription: 'فۆڵۆی کاندیدەکان بکە، بەشداری لە دیبەیتەکان بکە و ئاگادار بە.',
        iAmCandidate: 'من کاندیدم',
        candidateDescription: 'پۆست دروست بکە، پەیامەکەت بڵاوبکەرەوە و لەگەڵ دەنگدەران بەردەوام بە.',
    },
    ar: {
        social: 'اجتماعي',
        serious: 'جدي',
        whoToFollow: 'من تتابعه',
        platformRules: 'قواعد المنصة',
        rule1: 'كن محترما للآخرين.',
        rule2: 'لا لخطاب الكراهية أو التحرش.',
        rule3: 'تحقق من المعلومات قبل مشاركتها.',
        rule4: 'انخرط في حوار بناء.',
        welcomeToHamlet: 'أهلاً بك في هاملت',
        chooseYourRole: 'اختر دورك للبدء.',
        iAmVoter: 'أنا ناخب',
        voterDescription: 'تابع المرشحين، شارك في المناقشات، وابق على اطلاع.',
        iAmCandidate: 'أنا مرشح',
        candidateDescription: 'أنشئ منشورات، شارك رسالتك، وتفاعل مع الناخبين.',
    }
};