import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AnticipationScreen from './components/AnticipationScreen';
import UnwrappingSequence from './components/UnwrappingSequence';
import GiftReveal from './components/GiftReveal';
import ResponseInterface from './components/ResponseInterface';
import GiftArchive from './components/GiftArchive';
import Footer from '../homepage-romantic-digital-gifting-platform/components/Footer';

const GiftRecipientExperienceMagicalDeliveryInterface = () => {
  const [currentStage, setCurrentStage] = useState('anticipation'); // anticipation, unwrapping, reveal, response, archive
  const [selectedGift, setSelectedGift] = useState(null);
  const [showArchive, setShowArchive] = useState(false);

  // Mock gift data
  const mockGift = {
    id: 1,
    type: 'rose-bouquet',
    sender: 'Alex',
    message: "My dearest love, every petal in this bouquet represents a reason why I adore you...",
    voiceMessage: "https://example.com/voice-message.mp3",
    photos: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop"
    ],
    scheduledDate: "2025-02-14",
    mood: "passionate",
    background: "romantic-sunset"
  };

  useEffect(() => {
    // Simulate receiving a gift notification
    if (!selectedGift) {
      setTimeout(() => {
        setSelectedGift(mockGift);
      }, 1000);
    }
  }, [selectedGift]);

  const handleStageTransition = (stage) => {
    setCurrentStage(stage);
  };

  const handleShowArchive = () => {
    setShowArchive(true);
    setCurrentStage('archive');
  };

  const renderCurrentStage = () => {
    if (showArchive) {
      return <GiftArchive onClose={() => setShowArchive(false)} />;
    }

    switch (currentStage) {
      case 'anticipation':
        return (
          <AnticipationScreen
            gift={selectedGift}
            onProceed={() => handleStageTransition('unwrapping')}
          />
        );
      case 'unwrapping':
        return (
          <UnwrappingSequence
            gift={selectedGift}
            onComplete={() => handleStageTransition('reveal')}
          />
        );
      case 'reveal':
        return (
          <GiftReveal
            gift={selectedGift}
            onRespond={() => handleStageTransition('response')}
            onViewArchive={handleShowArchive}
          />
        );
      case 'response':
        return (
          <ResponseInterface
            gift={selectedGift}
            onComplete={() => handleStageTransition('reveal')}
          />
        );
      default:
        return (
          <AnticipationScreen
            gift={selectedGift}
            onProceed={() => handleStageTransition('unwrapping')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 relative">
        {renderCurrentStage()}
      </main>
      
      {currentStage === 'archive' && <Footer />}
    </div>
  );
};

export default GiftRecipientExperienceMagicalDeliveryInterface;