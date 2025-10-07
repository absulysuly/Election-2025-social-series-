import React from 'react';
import { Link } from 'react-router-dom';
import PhoneAltIcon from '../icons/PhoneAltIcon';
import EnvelopeIcon from '../icons/EnvelopeIcon';
import LocationMarkerIcon from '../icons/LocationMarkerIcon';
import VoteYeaIcon from '../icons/VoteYeaIcon';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#343a40] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    
                    <div className="footer-section">
                        <div className="flex items-center gap-3 mb-4">
                            <VoteYeaIcon className="w-8 h-8"/>
                            <h3 className="text-white text-xl font-bold">انتخابات العراق ٢٠٢٥</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                           منصة رقمية شاملة ومستقلة لتعزيز الشفافية والمشاركة في الانتخابات البرلمانية العراقية.
                        </p>
                    </div>
                    
                    <div className="footer-section">
                        <h3 className="text-white mb-5 text-lg font-bold border-b-2 border-green-500 pb-2 inline-block">روابط سريعة</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</Link></li>
                            <li><Link to="/election-hub" className="text-gray-400 hover:text-white transition-colors">دليل الناخب</Link></li>
                            <li><Link to="/integrity-hub" className="text-gray-400 hover:text-white transition-colors">مركز النزاهة</Link></li>
                            <li><Link to="/international-portal" className="text-gray-400 hover:text-white transition-colors">بوابة الشركاء</Link></li>
                             <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">الأسعار</Link></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3 className="text-white mb-5 text-lg font-bold border-b-2 border-green-500 pb-2 inline-block">المصادر الرسمية</h3>
                         <ul className="space-y-3">
                            <li><a href="https://ihec.iq/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">موقع مفوضية الانتخابات (IHEC)</a></li>
                            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">سياسة الخصوصية</Link></li>
                            <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">شروط الخدمة</Link></li>
                            <li><a href="https://ihec.iq/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">قوانين ولوائح الانتخابات</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="text-white mb-5 text-lg font-bold border-b-2 border-green-500 pb-2 inline-block">معلومات الاتصال</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center gap-3"><PhoneAltIcon className="w-5 h-5" /> <span>الخط الساخن للانتخابات: 132</span></li>
                            <li className="flex items-center gap-3"><EnvelopeIcon className="w-5 h-5" /> <span>info@iraqelection2025.iq</span></li>
                            <li className="flex items-center gap-3"><LocationMarkerIcon className="w-5 h-5" /> <span>بغداد، العراق</span></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-gray-700 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} منصة العراق الرقمية للانتخابات. جميع الحقوق محفوظة. | منصة مستقلة غير حزبية.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
