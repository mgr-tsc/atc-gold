import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";

import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import WirelessPage from '@/pages/WirelessPage';
import EVSEPage from '@/pages/EVSEPage';
import ProfessionalServicesPage from '@/pages/ProfessionalServicesPage';
import AEDesignPage from '@/pages/AEDesignPage';
import MarketsPage from '@/pages/MarketsPage';
import SafetyQualityPage from '@/pages/SafetyQualityPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen bg-background font-sans">
                    <Helmet>
                        <title>ATC GOLD CONSTRUCTION</title>
                        <meta name="description" content="WE BUILD THE BACKBONE OF TOMORROW'S NETWORKS. Turnkey design-build solutions for critical infrastructure." />
                    </Helmet>
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/services/wireless" element={<WirelessPage />} />
                            <Route path="/services/ev-charging" element={<EVSEPage />} />
                            <Route path="/services/professional-services" element={<ProfessionalServicesPage />} />
                            <Route path="/services/ae-design" element={<AEDesignPage />} />
                            <Route path="/markets" element={<MarketsPage />} />
                            <Route path="/safety-quality" element={<SafetyQualityPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                        </Routes>
                    </main>
                    <Footer />
                    <Toaster />
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;