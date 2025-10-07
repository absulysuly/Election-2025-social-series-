import React from 'react';
import { Language } from '../types.ts';

interface LanguageSwitcherProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, onLanguageChange }) => {
    const languages: { key: Language; label: string }[] = [
        { key: 'en', label: 'English' },
        { key: 'ku', label: 'کوردی' },
        { key: 'ar', label: 'العربية' },
    ];

    return (
        <div className="flex justify-center items-center space-x-2 my-4">
            {languages.map(lang => (
                <button
                    key={lang.key}
                    onClick={() => onLanguageChange(lang.key)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                        language === lang.key
                            ? 'bg-action-blue text-white'
                            : 'bg-neutral-gray-medium text-gray-700 hover:bg-neutral-gray-dark hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
