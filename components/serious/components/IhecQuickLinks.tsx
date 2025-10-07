import React from 'react';

const IhecQuickLinks: React.FC = () => {
  const links = [
    { text: 'تسجيل الناخبين', href: 'https://ihec.iq/en/' },
    { text: 'قوائم المرشحين النهائية', href: 'https://ihec.iq/en/' },
    { text: 'مراكز الاقتراع', href: 'https://ihec.iq/en/' },
    { text: 'نتائج الانتخابات', href: 'https://ihec.iq/en/' },
    { text: 'اللوائح والأنظمة', href: 'https://ihec.iq/en/' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">روابط مفوضية الانتخابات (IHEC)</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IhecQuickLinks;