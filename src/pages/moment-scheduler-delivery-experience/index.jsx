import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CalendarView from './components/CalendarView';
import QuickScheduleOptions from './components/QuickScheduleOptions';
import DeliveryPreview from './components/DeliveryPreview';
import RecurringGiftSetup from './components/RecurringGiftSetup';
import SpecialDatesManager from './components/SpecialDatesManager';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const MomentSchedulerDeliveryExperience = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [showRecurringSetup, setShowRecurringSetup] = useState(false);
  const [activeTab, setActiveTab] = useState('schedule');
  const [specialDates, setSpecialDates] = useState([]);
  const [scheduledGifts, setScheduledGifts] = useState([]);

  // Mock data for gifts
  const availableGifts = [
  {
    id: 'digital_roses',
    name: 'Digital Rose Bouquet',
    description: 'Beautiful animated roses with personalized message',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop',
    category: 'romantic'
  },
  {
    id: 'love_letter',
    name: 'Animated Love Letter',
    description: 'Handwritten-style letter with romantic animations',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    category: 'personal'
  },
  {
    id: 'photo_memory',
    name: 'Photo Memory Card',
    description: 'Personalized photo collage with music',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
    category: 'memories'
  },
  {
    id: 'virtual_date',
    name: 'Virtual Date Experience',
    description: 'Interactive romantic experience for couples',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop',
    category: 'experience'
  }];


  // Mock special dates
  const mockSpecialDates = [
  {
    id: '1',
    title: 'Our Anniversary',
    date: '2025-02-14',
    type: 'anniversary',
    icon: 'Heart',
    reminder: '1week',
    notes: 'First year together!',
    isRecurring: true
  },
  {
    id: '2',
    title: 'Sarah\'s Birthday',
    date: '2025-03-15',
    type: 'birthday',
    icon: 'Cake',
    reminder: '3days',
    notes: 'She loves chocolate cake',
    isRecurring: true
  },
  {
    id: '3',
    title: 'First Date Memory',
    date: '2025-01-20',
    type: 'first_date',
    icon: 'Calendar',
    reminder: '1week',
    notes: 'Coffee shop on Main Street',
    isRecurring: true
  }];


  // Mock scheduled gifts
  const mockScheduledGifts = [
  {
    id: '1',
    deliveryDate: '2025-01-25',
    giftId: 'digital_roses',
    recipient: 'Sarah',
    time: '19:00',
    status: 'scheduled'
  },
  {
    id: '2',
    deliveryDate: '2025-02-01',
    giftId: 'love_letter',
    recipient: 'Sarah',
    time: '08:00',
    status: 'scheduled'
  }];


  useEffect(() => {
    setSpecialDates(mockSpecialDates);
    setScheduledGifts(mockScheduledGifts);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleQuickSchedule = (option) => {
    if (option?.id === 'custom') {
      setActiveTab('schedule');
      return;
    }

    // Set delivery details for quick schedule
    setDeliveryDetails({
      type: 'quick',
      option: option,
      recipient: 'Your beloved',
      message: 'Thinking of you ❤️'
    });

    // Auto-select a gift if none selected
    if (!selectedGift) {
      setSelectedGift(availableGifts?.[0]);
    }
  };

  const handleGiftSelect = (gift) => {
    setSelectedGift(gift);
  };

  const handleConfirmDelivery = () => {
    if (!selectedGift || !deliveryDetails) return;

    // Add to scheduled gifts
    const newScheduledGift = {
      id: Date.now()?.toString(),
      deliveryDate: deliveryDetails?.type === 'quick' ? new Date()?.toISOString()?.split('T')?.[0] :
      selectedDate?.toISOString()?.split('T')?.[0],
      giftId: selectedGift?.id,
      recipient: deliveryDetails?.recipient,
      time: deliveryDetails?.time || '19:00',
      status: 'scheduled'
    };

    setScheduledGifts((prev) => [...prev, newScheduledGift]);

    // Reset selections
    setSelectedGift(null);
    setDeliveryDetails(null);
    setSelectedDate(null);

    // Show success message (in a real app, this would be a toast notification)
    alert('Gift scheduled successfully! 💝');
  };

  const handleSetupRecurring = (recurringData) => {
    // In a real app, this would save to backend
    console.log('Setting up recurring gifts:', recurringData);
    setShowRecurringSetup(false);
    alert('Recurring gifts set up successfully! 🔄');
  };

  const handleAddSpecialDate = (newDate) => {
    setSpecialDates((prev) => [...prev, newDate]);
  };

  const handleRemoveSpecialDate = (dateId) => {
    setSpecialDates((prev) => prev?.filter((date) => date?.id !== dateId));
  };

  const tabs = [
  { id: 'schedule', label: 'Schedule Gift', icon: 'Calendar' },
  { id: 'special-dates', label: 'Special Dates', icon: 'Heart' },
  { id: 'recurring', label: 'Recurring Gifts', icon: 'Repeat' }];


  return (
    <>
      <Helmet>
        <title>Moment Scheduler - Delivery Experience | Floral Hugs</title>
        <meta name="description" content="Plan perfect romantic moments with our advanced delivery scheduling. Set up recurring gifts, manage special dates, and create surprise sequences that build anticipation and strengthen your relationship." />
        <meta name="keywords" content="gift scheduling, romantic delivery, recurring gifts, special dates, relationship milestones, surprise planning" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-romantic-gradient relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-float"></div>
            <div className="absolute top-32 right-20 w-12 h-12 border border-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-8 h-8 border border-white/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse-gentle">
                  <Icon name="Clock" size={32} className="text-secondary" />
                </div>
              </div>
              
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">
                Perfect Timing,
                <span className="block text-secondary/80">Perfect Moments</span>
              </h1>
              
              <p className="text-lg md:text-xl text-secondary/80 font-inter mb-8 leading-relaxed">
                Transform gift timing into anticipation-building journey planning. Schedule spontaneous gestures, 
                plan elaborate surprise sequences, and never miss a romantic opportunity again.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Zap"
                  iconPosition="left"
                  onClick={() => handleQuickSchedule({ id: 'now', title: 'Send Now' })}
                  className="bg-white text-secondary hover:bg-white/90 hover:shadow-romantic-lg transition-all duration-300 animate-bloom">

                  Send Love Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => setActiveTab('schedule')}
                  className="text-secondary border-secondary/30 hover:bg-white/10 hover:border-secondary transition-all duration-300">

                  Plan Perfect Moment
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-2 h-2 bg-secondary/30 rounded-full animate-float"></div>
            <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-32 right-1/4 w-1 h-1 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-center mb-12 bg-card rounded-xl p-2 shadow-romantic max-w-2xl mx-auto">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-inter font-medium transition-all duration-300 hover:bg-primary/10 hover:text-secondary group ${
                activeTab === tab?.id ?
                'text-secondary bg-primary/20 shadow-romantic' :
                'text-muted-foreground hover:text-foreground'}`
                }>

                  <Icon
                  name={tab?.icon}
                  size={18}
                  className={`transition-all duration-300 group-hover:animate-bloom ${
                  activeTab === tab?.id ? 'text-secondary' : 'text-muted-foreground group-hover:text-secondary'}`
                  } />

                  <span>{tab?.label}</span>
                </button>
              )}
            </div>

            {/* Tab Content */}
            {activeTab === 'schedule' &&
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Quick Schedule & Calendar */}
                <div className="lg:col-span-1 space-y-8">
                  <QuickScheduleOptions onQuickSchedule={handleQuickSchedule} />
                  <CalendarView
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  specialDates={specialDates}
                  scheduledGifts={scheduledGifts} />

                </div>

                {/* Middle Column - Gift Selection */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-xl shadow-romantic p-6">
                    <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                      Choose Your Gift
                    </h3>
                    <div className="space-y-3">
                      {availableGifts?.map((gift) =>
                    <div
                      key={gift?.id}
                      onClick={() => handleGiftSelect(gift)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group ${
                      selectedGift?.id === gift?.id ?
                      'border-secondary bg-secondary/10 shadow-romantic' :
                      'border-border'}`
                      }>

                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                            src={gift?.image}
                            alt={gift?.name}
                            className="w-full h-full object-cover" />

                            </div>
                            <div className="flex-1">
                              <h4 className="font-inter font-semibold text-foreground mb-1">
                                {gift?.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {gift?.description}
                              </p>
                            </div>
                            {selectedGift?.id === gift?.id &&
                        <Icon name="Check" size={20} className="text-secondary" />
                        }
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Delivery Preview */}
                <div className="lg:col-span-1">
                  <DeliveryPreview
                  selectedGift={selectedGift}
                  deliveryDetails={deliveryDetails}
                  onConfirm={handleConfirmDelivery}
                  onEdit={() => {
                    setDeliveryDetails(null);
                    setSelectedDate(null);
                  }} />

                </div>
              </div>
            }

            {activeTab === 'special-dates' &&
            <div className="max-w-4xl mx-auto">
                <SpecialDatesManager
                specialDates={specialDates}
                onAddSpecialDate={handleAddSpecialDate}
                onRemoveSpecialDate={handleRemoveSpecialDate} />

              </div>
            }

            {activeTab === 'recurring' &&
            <div className="max-w-4xl mx-auto">
                {!showRecurringSetup ?
              <div className="bg-card rounded-xl shadow-romantic p-8 text-center">
                    <div className="w-20 h-20 bg-romantic-gradient rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-gentle">
                      <Icon name="Repeat" size={40} className="text-secondary" />
                    </div>
                    <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
                      Recurring Romantic Gestures
                    </h3>
                    <p className="text-muted-foreground font-inter mb-6 max-w-2xl mx-auto">
                      Set up automatic romantic gestures that keep your love story alive. From weekly date night surprises 
                      to monthly anniversary celebrations, never miss an opportunity to show you care.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 border border-border rounded-lg">
                        <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
                        <h4 className="font-inter font-semibold text-foreground mb-1">Weekly Surprises</h4>
                        <p className="text-sm text-muted-foreground">Regular romantic gestures</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <Icon name="Heart" size={24} className="text-secondary mx-auto mb-2" />
                        <h4 className="font-inter font-semibold text-foreground mb-1">Anniversary Reminders</h4>
                        <p className="text-sm text-muted-foreground">Never forget special dates</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <Icon name="Gift" size={24} className="text-accent mx-auto mb-2" />
                        <h4 className="font-inter font-semibold text-foreground mb-1">Personalized Gifts</h4>
                        <p className="text-sm text-muted-foreground">Automatically customized</p>
                      </div>
                    </div>
                    <Button
                  variant="default"
                  size="lg"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setShowRecurringSetup(true)}
                  className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300 animate-pulse-gentle">

                      Setup Recurring Gifts
                    </Button>
                  </div> :

              <RecurringGiftSetup
                onSetupRecurring={handleSetupRecurring}
                onClose={() => setShowRecurringSetup(false)} />

              }
              </div>
            }
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
                Smart Scheduling Features
              </h2>
              <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
                Advanced tools to help you become a more thoughtful, consistent partner
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
              {
                icon: 'Brain',
                title: 'Perfect Timing AI',
                description: 'Suggests optimal delivery windows based on recipient\'s timezone and activity patterns'
              },
              {
                icon: 'Smartphone',
                title: 'Mobile Quick Send',
                description: 'Preset timing options like "Send in 1 hour" or "Tonight at sunset" for spontaneous gestures'
              },
              {
                icon: 'Bell',
                title: 'Smart Reminders',
                description: 'Calendar integration and notifications for relationship milestones and special dates'
              },
              {
                icon: 'Layers',
                title: 'Surprise Sequences',
                description: 'Plan elaborate multi-part deliveries throughout the day for maximum romantic impact'
              },
              {
                icon: 'Eye',
                title: 'Delivery Preview',
                description: 'See exactly how your gift will appear to build excitement before sending'
              },
              {
                icon: 'Shield',
                title: 'Timezone Smart',
                description: 'Automatic timezone detection ensures perfect timing regardless of distance'
              }]?.
              map((feature, index) =>
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-romantic hover:shadow-romantic-lg"
                style={{ animationDelay: `${index * 0.1}s` }}>

                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                    <Icon name={feature?.icon} size={24} className="text-primary group-hover:animate-bloom" />
                  </div>
                  <h3 className="font-inter font-semibold text-foreground mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    {feature?.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-romantic-gradient relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-16 h-16 border border-white/20 rounded-full animate-float"></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 border border-white/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-secondary mb-4">
              Start Planning Perfect Moments
            </h2>
            <p className="text-lg text-secondary/80 font-inter mb-8 max-w-2xl mx-auto">
              Join thousands of couples who never miss a romantic opportunity. 
              Your love story deserves perfect timing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => setActiveTab('schedule')}
                className="bg-white text-secondary hover:bg-white/90 hover:shadow-romantic-lg transition-all duration-300">

                Schedule Your First Gift
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Repeat"
                iconPosition="left"
                onClick={() => {
                  setActiveTab('recurring');
                  setShowRecurringSetup(true);
                }}
                className="text-secondary border-secondary/30 hover:bg-white/10 hover:border-secondary transition-all duration-300">

                Setup Recurring Love
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-romantic-gradient rounded-full flex items-center justify-center mr-3">
                  <Icon name="Heart" size={16} className="text-secondary" />
                </div>
                <span className="font-playfair text-xl font-semibold text-foreground">
                  Floral Hugs
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-inter mb-4">
                Love Made Tangible - Perfect timing for perfect moments
              </p>
              <p className="text-xs text-muted-foreground font-inter">
                © {new Date()?.getFullYear()} Floral Hugs. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>);

};

export default MomentSchedulerDeliveryExperience;