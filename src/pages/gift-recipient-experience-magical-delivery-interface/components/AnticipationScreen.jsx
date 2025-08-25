import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnticipationScreen = ({ gift, onProceed }) => {
  const [isReady, setIsReady] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState('romantic');
  const [showMusicOptions, setShowMusicOptions] = useState(false);

  const musicOptions = [
    { id: 'romantic', name: 'Romantic Melody', icon: 'Heart' },
    { id: 'peaceful', name: 'Peaceful Vibes', icon: 'Cloud' },
    { id: 'joyful', name: 'Joyful Harmony', icon: 'Sun' },
    { id: 'dreamy', name: 'Dreamy Atmosphere', icon: 'Star' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!gift) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-romantic-gradient">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
          />
          <p className="font-inter text-muted-foreground">Waiting for your special delivery...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-romantic-gradient flex items-center justify-center relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: 0
            }}
            animate={{
              y: -50,
              rotate: 360
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear"
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Gift Notification */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-romantic-lg mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="Gift" size={32} className="text-secondary" />
            </motion.div>
            
            <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
              You've Received Love! 💝
            </h1>
            <p className="font-inter text-xl text-muted-foreground mb-4">
              From <span className="font-semibold text-secondary">{gift?.sender}</span>
            </p>
            <p className="font-inter text-muted-foreground">
              A special {gift?.type?.replace('-', ' ')} is waiting for you...
            </p>
          </motion.div>

          {/* Music Selection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ delay: 1.5 }}
            className="mb-8"
          >
            <Button
              variant="outline"
              onClick={() => setShowMusicOptions(!showMusicOptions)}
              iconName="Music"
              iconPosition="left"
              className="mb-4"
            >
              Choose Ambient Music
            </Button>

            {showMusicOptions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/80 rounded-2xl p-4"
              >
                {musicOptions?.map((music) => (
                  <motion.button
                    key={music?.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMusic(music?.id)}
                    className={`p-3 rounded-xl transition-colors ${
                      selectedMusic === music?.id
                        ? 'bg-primary text-secondary' :'bg-card hover:bg-primary/20'
                    }`}
                  >
                    <Icon name={music?.icon} size={20} className="mx-auto mb-1" />
                    <p className="text-xs font-inter">{music?.name}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Ready Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 30 }}
            transition={{ delay: 2 }}
          >
            <Button
              size="lg"
              onClick={onProceed}
              iconName="ArrowRight"
              iconPosition="right"
              className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300 text-lg px-12 py-4"
            >
              I'm Ready to Receive Love
            </Button>
          </motion.div>

          {/* Gentle Instructions */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="font-inter text-sm text-muted-foreground mt-6"
          >
            Find a quiet moment, put on headphones for the best experience 🎧
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default AnticipationScreen;