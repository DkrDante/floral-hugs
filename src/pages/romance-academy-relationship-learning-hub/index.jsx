import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../homepage-romantic-digital-gifting-platform/components/Footer';
import LibraryLayout from './components/LibraryLayout';
import FeaturedContentCarousel from './components/FeaturedContentCarousel';
import InteractiveQuizzes from './components/InteractiveQuizzes';
import VideoContent from './components/VideoContent';
import PersonalLearningDashboard from './components/PersonalLearningDashboard';
import BookmarkManager from './components/BookmarkManager';

const RomanceAcademyRelationshipLearningHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-romantic-gradient py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-playfair font-bold text-secondary mb-6">
              Romance Academy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Master the art of love through expert guidance and thoughtful relationship education. 
              Become the partner your loved one deserves.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                Start Learning
              </button>
              <button className="border border-secondary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all">
                Take Assessment
              </button>
            </div>
          </div>
        </section>

        <LibraryLayout />
        <FeaturedContentCarousel />
        <InteractiveQuizzes />
        <VideoContent />
        <PersonalLearningDashboard />
        <BookmarkManager />
      </main>
      
      <Footer />
    </div>
  );
};

export default RomanceAcademyRelationshipLearningHub;