import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MoodSelector from './components/MoodSelector';
import FeaturedGifts from './components/FeaturedGifts';
import TestimonialSlider from './components/TestimonialSlider';
import HowItWorks from './components/HowItWorks';
import RomanceAcademy from './components/RomanceAcademy';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <MoodSelector />
        <FeaturedGifts />
        <TestimonialSlider />
        <HowItWorks />
        <RomanceAcademy />
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;