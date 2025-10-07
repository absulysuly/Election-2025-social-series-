import React from 'react';
import IraqFlagIcon from '../icons/IraqFlagIcon';
import UsaFlagIcon from '../icons/UsaFlagIcon';
import KurdistanFlagIcon from '../icons/KurdistanFlagIcon';

interface LanguageSelectorProps {
  currentLang: string;
  onLangChange: (lang: 'ar' | 'en' | 'ku') => void;
}

const FlagButton: React.FC<{
  langCode: 'ar' | 'en' | 'ku';
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  'aria-label': string;
  label: string;
}> = ({ isActive, onClick, children, label, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 rtl:space-x-reverse p-1 rounded-md transition-all duration-200 ${isActive ? 'bg-green-100' : 'hover:bg-gray-100'}`}
      aria-pressed={isActive}
      {...props}
    >
      <div className={`w-8 h-5 rounded-sm overflow-hidden border transition-all duration-200 ${isActive ? 'border-[#007a3d]' : 'border-gray-300'}`}>
          {children}
      </div>
      <span className={`text-sm font-semibold ${isActive ? 'text-[#007a3d]' : 'text-gray-600'}`}>{label}</span>
    </button>
  );
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLangChange }) => {
  return (
    <div className="flex items-center space-x-1 rtl:space-x-reverse p-1 bg-gray-100 rounded-lg">
       <FlagButton
        langCode="ar"
        isActive={currentLang === 'ar'}
        onClick={() => onLangChange('ar')}
        aria-label="Switch to Arabic"
        label="العربية"
      >
        <IraqFlagIcon />
      </FlagButton>
      <FlagButton
        langCode="ku"
        isActive={currentLang === 'ku'}
        onClick={() => onLangChange('ku')}
        aria-label="Switch to Kurdish"
        label="Kurdi"
      >
        <KurdistanFlagIcon />
      </FlagButton>
      <FlagButton
        langCode="en"
        isActive={currentLang === 'en'}
        onClick={() => onLangChange('en')}
        aria-label="Switch to English"
        label="English"
      >
        <UsaFlagIcon />
      </FlagButton>
    </div>
  );
};

export default LanguageSelector;