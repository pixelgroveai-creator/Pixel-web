/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StackSection } from './components/StackSection';
import { ServicesSection } from './components/ServicesSection';
import { RestaurantTechSection } from './components/RestaurantTechSection';
import { AdvantageSection } from './components/AdvantageSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminPanel } from './components/AdminPanel';
import { FluidGalaxyBackground } from './components/FluidGalaxyBackground';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);

  // Check URL hash for direct #admin access
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminPanelOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToLeadCapture = () => {
    const el = document.getElementById('lead-capture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = () => {
    scrollToLeadCapture();
  };

  const handleBookCall = () => {
    setIsBookingModalOpen(true);
  };

  const handleSelectVector = (vectorTitle: string) => {
    setPreselectedService(vectorTitle);
    scrollToLeadCapture();
  };

  const handleSelectRestaurantService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToLeadCapture();
  };

  return (
    <div className="relative min-h-screen bg-[#0c0e13] text-[#e2e2ea] selection:bg-[#8083ff] selection:text-[#0d0096] font-sans antialiased overflow-x-hidden">
      {/* 
        Full-Page Uploaded Galaxy Background with Continuous 360° Rotating Motion
        Powered by fluid water/river flow harmonic physics, organic acceleration/deceleration,
        and atmospheric contrast grading.
      */}
      <FluidGalaxyBackground />

      {/* Primary Content Flow */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar with IST Live Clock & Direct Stack Anchor */}
        <Header
          onStartProjectClick={handleStartProject}
          onBookCallClick={handleBookCall}
          onAdminClick={() => setIsAdminPanelOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Section with Live Terminal Telemetry & Direct CTAs */}
          <HeroSection
            onBookCallClick={handleBookCall}
            onInitiateBriefClick={scrollToLeadCapture}
          />

          {/* 
            STACK SECTION:
            Displays actively available AI brands and models structured by category:
            - Text-to-Image Models
            - Video Generation Models
            - Code/Development Tools
            - Large Language Models
            - Audio & Voice Generation
            - Reasoning & Multimodal Engines
            Designed with layered paper motion principles.
          */}
          <StackSection onSelectModel={handleSelectVector} />

          {/* Core Engineering Vectors & Generative AI Media Capabilities */}
          <ServicesSection onSelectVector={handleSelectVector} />

          {/* Specialized Restaurant & Hospitality AI Tech Vertical */}
          <RestaurantTechSection
            onBookCallClick={handleBookCall}
            onSelectService={handleSelectRestaurantService}
          />

          {/* Paradigm Shift: Traditional Agency vs pixelgrove.ai Engineering Squad */}
          <AdvantageSection />

          {/* Inbound Lead Discovery Engine with Verified Routing to pixelgrove.ai@gmail.com */}
          <LeadCaptureSection
            onOpenBookingModal={handleBookCall}
            preselectedService={preselectedService}
          />
        </main>

        {/* Global Studio Footer */}
        <Footer onAdminClick={() => setIsAdminPanelOpen(true)} />
      </div>

      {/* Interactive 1-on-1 Architecture Call Scheduling Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Interactive Admin Leads Intelligence Panel */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => {
          setIsAdminPanelOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
}
