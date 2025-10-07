import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import VoteYeaIcon from '../icons/VoteYeaIcon';

type Language = 'ar' | 'en' | 'ku';

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/integrity-hub', label: 'مركز النزاهة' },
  { to: '/election-hub', label: 'المركز الإرشادي' },
  { to: '/international-portal', label: 'بوابة الشركاء' },
  { to: '/pricing', label: 'الأسعار' },
];

const Header: React.FC<HeaderProps> = ({ currentLang, onLangChange }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-[#003366] to-[#0066cc] text-white shadow-lg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <VoteYeaIcon className="w-12 h-12 text-white filter drop-shadow-lg" />
              <div>
                <h1 className="text-2xl font-bold text-shadow">انتخابات العراق ٢٠٢٥</h1>
                <p className="opacity-90 text-sm">منصة الشفافية الرقمية</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm p-1.5 rounded-full border border-white/20">
                <button onClick={() => onLangChange('en')} className={`px-3 py-1 text-sm rounded-full transition-colors ${currentLang === 'en' ? 'bg-white text-[#003366]' : 'text-white'}`}>EN</button>
                <button onClick={() => onLangChange('ku')} className={`px-3 py-1 text-sm rounded-full transition-colors ${currentLang === 'ku' ? 'bg-white text-[#003366]' : 'text-white'}`}>KU</button>
                <button onClick={() => onLangChange('ar')} className={`px-3 py-1 text-sm rounded-full transition-colors ${currentLang === 'ar' ? 'bg-white text-[#003366]' : 'text-white'}`}>AR</button>
              </div>
              <div className="md:hidden">
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-white hover:bg-white/20">
                  <span className="sr-only">Open menu</span>
                   {!isMobileMenuOpen ? (
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                   ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                   )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="hidden md:flex justify-center list-none">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-5 py-4 font-semibold border-b-4 transition-colors duration-300 ${
                      isActive ? 'border-[#003366] text-[#003366]' : 'border-transparent text-gray-600 hover:text-[#003366] hover:border-gray-300'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
        
      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5">
            <h2 className="font-bold text-lg mb-4">القائمة</h2>
            <ul className="flex flex-col items-center space-y-1">
                {navLinks.map((link) => (
                    <li key={link.to} className="w-full text-center">
                        <NavLink
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `block py-3 rounded-md text-base font-medium w-full ${
                                isActive ? 'bg-blue-50 text-[#003366]' : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
                    <li className="pt-6 w-full flex justify-center">
                        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full">
                        <button onClick={() => {onLangChange('en'); setMobileMenuOpen(false);}} className={`px-3 py-1 text-sm rounded-full transition-colors ${currentLang === 'en' ? 'bg-[#003366] text-white' : 'text-gray-700'}`}>English</button>
                        <button onClick={() => {onLangChange('ku'); setMobileMenuOpen(false);}} className={`px-3 py-1 text-sm rounded-full transition-colors ${currentLang === 'ku' ? 'bg-[#003366] text-white' : 'text-gray-700'}`}>Kurdî</button>
                        <button onClick={() => {onLangChange('ar'); setMobileMenuOpen(false);}} className={`px-3 py-1 text-sm rounded-full transition-colors ${currentLang === 'ar' ? 'bg-[#003366] text-white' : 'text-gray-700'}`}>العربية</button>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </>
  );
};

export default Header;