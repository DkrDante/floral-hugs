import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GiftReveal = ({ gift, onRespond, onViewArchive }) => {
  const [currentView, setCurrentView] = useState('main'); // main, message, voice, photos
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHeartReaction, setShowHeartReaction] = useState(false);

  const giftTypeAnimations = {
    'rose-bouquet': {
      initial: { scale: 0, rotate: -180 },
      animate: { scale: 1, rotate: 0 },
      transition: { type: "spring", duration: 2, delay: 0.5 }
    },
    'love-letter': {
      initial: { scale: 0, y: 50 },
      animate: { scale: 1, y: 0 },
      transition: { duration: 1.5, ease: "easeOut" }
    },
    'photo-montage': {
      initial: { opacity: 0, scale: 1.2 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 2, ease: "easeOut" }
    }
  };

  const handleHeartReaction = () => {
    setShowHeartReaction(true);
    setTimeout(() => setShowHeartReaction(false), 3000);
  };

  const renderGiftContent = () => {
    switch (gift?.type) {
      case 'rose-bouquet':
        return (
          <div className="text-center">
            <motion.div
              {...giftTypeAnimations?.['rose-bouquet']}
              className="relative mb-6"
            >
              {/* Rose Petals Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)]?.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, y: 0, rotate: 0 }}
                    animate={{
                      scale: [0, 1, 1, 0],
                      y: [0, -20, -40, -60],
                      rotate: [0, 180, 360, 540],
                      x: [(Math.random() - 0.5) * 100]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="absolute w-3 h-3 bg-primary rounded-full opacity-60"
                    style={{
                      left: `${20 + (i * 5)}%`,
                      top: '50%'
                    }}
                  />
                ))}
              </div>
              
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <Icon name="Flower" size={80} className="text-secondary" />
              </div>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="font-playfair text-3xl font-bold text-foreground mb-2"
            >
              Digital Rose Bouquet 🌹
            </motion.h3>
          </div>
        );

      case 'love-letter':
        return (
          <div className="text-center">
            <motion.div
              {...giftTypeAnimations?.['love-letter']}
              className="w-48 h-48 mx-auto mb-6 relative"
            >
              <div className="w-full h-full bg-card rounded-2xl shadow-romantic-lg p-6 flex items-center justify-center">
                <Icon name="Mail" size={80} className="text-secondary" />
              </div>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="font-playfair text-3xl font-bold text-foreground mb-2"
            >
              Love Letter 💌
            </motion.h3>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-48 h-48 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center"
            >
              <Icon name="Heart" size={80} className="text-secondary" />
            </motion.div>
            <h3 className="font-playfair text-3xl font-bold text-foreground mb-2">
              Love Gift 💝
            </h3>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-romantic-gradient relative overflow-hidden">
      {/* Heart Reaction Animation */}
      <AnimatePresence>
        {showHeartReaction && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(15)]?.map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                initial={{ 
                  scale: 0,
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  rotate: 0
                }}
                animate={{
                  scale: [0, 1, 1, 0],
                  x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
                  y: window.innerHeight / 2 - Math.random() * 200,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className="absolute text-red-500 text-2xl"
              >
                ❤️
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-4xl font-bold text-foreground mb-2"
            >
              From {gift?.sender} With Love 💕
            </motion.h1>
            <p className="font-inter text-muted-foreground">
              Delivered with magic on {new Date(gift?.scheduledDate)?.toLocaleDateString()}
            </p>
          </div>

          {/* Main Gift Display */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-romantic-lg mb-6">
            {renderGiftContent()}

            {/* Gift Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Button
                variant={currentView === 'main' ? 'default' : 'outline'}
                onClick={() => setCurrentView('main')}
                iconName="Gift"
                iconPosition="left"
                size="sm"
              >
                Gift
              </Button>
              
              {gift?.message && (
                <Button
                  variant={currentView === 'message' ? 'default' : 'outline'}
                  onClick={() => setCurrentView('message')}
                  iconName="MessageSquare"
                  iconPosition="left"
                  size="sm"
                >
                  Message
                </Button>
              )}
              
              {gift?.voiceMessage && (
                <Button
                  variant={currentView === 'voice' ? 'default' : 'outline'}
                  onClick={() => setCurrentView('voice')}
                  iconName="Mic"
                  iconPosition="left"
                  size="sm"
                >
                  Voice
                </Button>
              )}
              
              {gift?.photos?.length > 0 && (
                <Button
                  variant={currentView === 'photos' ? 'default' : 'outline'}
                  onClick={() => setCurrentView('photos')}
                  iconName="Image"
                  iconPosition="left"
                  size="sm"
                >
                  Photos
                </Button>
              )}
            </div>

            {/* Content Views */}
            <AnimatePresence mode="wait">
              {currentView === 'message' && gift?.message && (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 p-6 bg-muted/30 rounded-2xl"
                >
                  <Icon name="Quote" size={24} className="text-secondary mb-4" />
                  <p className="font-dancing text-xl text-foreground leading-relaxed">
                    {gift?.message}
                  </p>
                </motion.div>
              )}

              {currentView === 'voice' && gift?.voiceMessage && (
                <motion.div
                  key="voice"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 p-6 bg-muted/30 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        iconName={isPlaying ? "Pause" : "Play"}
                        size="sm"
                        className="rounded-full w-12 h-12"
                      />
                      <div>
                        <p className="font-inter font-semibold text-foreground">Voice Message</p>
                        <p className="font-inter text-sm text-muted-foreground">2:34</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Waveform Visualization */}
                  <div className="flex items-center space-x-1 h-12 mb-4">
                    {[...Array(40)]?.map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-secondary rounded-full"
                        animate={{
                          height: isPlaying ? [4, 20 + Math.random() * 20, 4] : 8
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: isPlaying ? Infinity : 0,
                          delay: i * 0.05
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {currentView === 'photos' && gift?.photos?.length > 0 && (
                <motion.div
                  key="photos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {gift?.photos?.map((photo, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="aspect-square rounded-2xl overflow-hidden"
                      >
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interaction Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleHeartReaction}
              iconName="Heart"
              iconPosition="left"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
            >
              Send Hearts
            </Button>
            
            <Button
              variant="outline"
              onClick={onRespond}
              iconName="Reply"
              iconPosition="left"
            >
              Reply
            </Button>
            
            <Button
              variant="outline"
              onClick={onViewArchive}
              iconName="Archive"
              iconPosition="left"
            >
              View Archive
            </Button>

            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
            >
              Share Moment
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GiftReveal;