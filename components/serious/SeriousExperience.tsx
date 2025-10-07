import React, { useState } from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import IntegrityHubPage from './pages/IntegrityHubPage';
import GovernoratePage from './pages/GovernoratePage';
import InternationalPortalPage from './pages/InternationalPortalPage';
import PoliticalPartyPortalPage from './pages/PoliticalPartyPortalPage';
import PoliticalPartyPage from './pages/PoliticalPartyPage';
import PricingPage from './pages/PricingPage';
import ElectionHubPage from './pages/ElectionHubPage';
import DigitalTransparencyPlatformPage from './pages/DigitalTransparencyPlatformPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

type Language = 'ar' | 'en' | 'ku';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const CivicAppShell: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-50"
      lang={language}
      dir={language === 'ar' || language === 'ku' ? 'rtl' : 'ltr'}
    >
      <Header currentLang={language} onLangChange={setLanguage} />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<HomePage language={language} onLangChange={setLanguage} />}
          />
          <Route path="/candidate-dashboard" element={<DashboardPage />} />
          <Route path="/integrity-hub" element={<IntegrityHubPage />} />
          <Route path="/governorate/:name" element={<GovernoratePage />} />
          <Route path="/international-portal" element={<InternationalPortalPage />} />
          <Route path="/parties" element={<PoliticalPartyPortalPage />} />
          <Route path="/party/:id" element={<PoliticalPartyPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/election-hub" element={<ElectionHubPage />} />
          <Route
            path="/digital-transparency"
            element={<DigitalTransparencyPlatformPage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

interface SeriousExperienceProps {
  initialPath: string;
}

const SeriousExperience: React.FC<SeriousExperienceProps> = ({ initialPath }) => (
  <div className="serious-experience-container">
    <MemoryRouter initialEntries={[initialPath]}>
      <ScrollToTop />
      <CivicAppShell />
    </MemoryRouter>
  </div>
);

export default SeriousExperience;
