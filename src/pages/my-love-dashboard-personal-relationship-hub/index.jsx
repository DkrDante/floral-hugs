import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../homepage-romantic-digital-gifting-platform/components/Footer';
import LoveTimeline from './components/LoveTimeline';
import QuickActions from './components/QuickActions';
import RelationshipCalendar from './components/RelationshipCalendar';
import MoodTracker from './components/MoodTracker';
import LoveStats from './components/LoveStats';
import SavedTemplates from './components/SavedTemplates';
import Wishlist from './components/Wishlist';

const MyLoveDashboardPersonalRelationshipHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Welcome Section */}
        <section className="bg-romantic-gradient py-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl font-playfair font-bold text-secondary mb-4">
                My Love Dashboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your personal relationship command center for staying consistently romantic and thoughtful
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <LoveTimeline />
              <MoodTracker />
              <SavedTemplates />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <QuickActions />
              <RelationshipCalendar />
              <LoveStats />
              <Wishlist />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyLoveDashboardPersonalRelationshipHub;