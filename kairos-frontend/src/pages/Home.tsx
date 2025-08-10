import React, { useEffect } from 'react';
import SEOHeader from '../components/SEO/SEOHeader';
import HeroSection from '../components/Home/HeroSection';
import ServicesOverview from '../components/Home/ServicesOverview';
import VehiclesCarousel from '../components/Home/VehiclesCarousel';
import PricingSection from '../components/Home/PricingSection';
import TestimonialsCarousel from '../components/Home/TestimonialsCarousel';
import AboutSection from '../components/Home/AboutSection';
import ContactSection from '../components/Home/ContactSection';
import { useLocale } from 'next-intl';

const Home: React.FC = () => {
  const currentLanguage = useLocale();

  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <SEOHeader
        language={currentLanguage}
        url="https://kairos-senegal.com"
      />
      <div className="space-y-8">
        <div id="hero">
          <HeroSection />
        </div>

        <div id="services" className="-mt-16">
          <ServicesOverview />
        </div>

        <div className="-mt-8">
          <VehiclesCarousel />
        </div>

        <div id="tarifs" className="-mt-8">
          <PricingSection />
        </div>

        <div className="-mt-8">
          <TestimonialsCarousel />
        </div>

        <div id="about" className="-mt-8">
          <AboutSection />
        </div>

        <div id="contact" className="-mt-8">
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default Home;
