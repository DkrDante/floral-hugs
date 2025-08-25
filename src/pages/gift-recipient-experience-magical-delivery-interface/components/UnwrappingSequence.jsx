import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const UnwrappingSequence = ({ gift, onComplete }) => {
  const [stage, setStage] = useState('ribbon'); // ribbon, box, sparkles, content
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [ribbonUntied, setRibbonUntied] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);

  const handleRibbonClick = () => {
    if (!isUnwrapping) {
      setIsUnwrapping(true);
      setTimeout(() => {
        setRibbonUntied(true);
        setStage('box');
        setIsUnwrapping(false);
      }, 2000);
    }
  };

  const handleBoxClick = () => {
    if (!isUnwrapping && ribbonUntied) {
      setIsUnwrapping(true);
      setTimeout(() => {
        setBoxOpened(true);
        setStage('sparkles');
      }, 1500);
      
      setTimeout(() => {
        setStage('content');
      }, 3000);
      
      setTimeout(() => {
        onComplete();
      }, 4500);
    }
  };

  return (
    <div className="min-h-screen bg-romantic-gradient flex items-center justify-center relative overflow-hidden">
      {/* Sparkle Effects */}
      <AnimatePresence>
        {stage === 'sparkles' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)]?.map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ 
                  scale: 0,
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  rotate: 0
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                  y: window.innerHeight / 2 + (Math.random() - 0.5) * 400,
                  rotate: 360
                }}
                exit={{ scale: 0 }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 bg-accent rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto"
        >
          {/* Unwrapping Instructions */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-2">
              {stage === 'ribbon' && 'Untie the Ribbon'}
              {stage === 'box' && 'Open the Gift Box'}
              {stage === 'sparkles' && 'Magic is Happening...'}
              {stage === 'content' && 'Your Love Awaits...'}
            </h2>
            <p className="font-inter text-muted-foreground">
              {stage === 'ribbon' && 'Tap and hold to gently untie the ribbon'}
              {stage === 'box' && 'Tap the box to reveal what\'s inside'}
              {stage === 'sparkles' && 'Feel the love filling the air'}
              {stage === 'content' && 'Something beautiful is about to appear'}
            </p>
          </motion.div>

          {/* Gift Box */}
          <div className="relative">
            {/* Box Base */}
            <motion.div
              animate={{
                rotateY: boxOpened ? 15 : 0,
                scale: boxOpened ? 1.1 : 1
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: stage === 'box' ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBoxClick}
                className="w-64 h-64 mx-auto cursor-pointer"
              >
                {/* Box Shadow */}
                <div className="absolute inset-0 bg-secondary/20 rounded-2xl transform translate-y-4 blur-lg" />
                
                {/* Main Box */}
                <motion.div
                  animate={{
                    y: boxOpened ? -20 : 0
                  }}
                  className="relative w-full h-full bg-gradient-to-br from-primary to-secondary/80 rounded-2xl shadow-romantic-lg"
                >
                  {/* Box Pattern */}
                  <div className="absolute inset-4 border-2 border-white/30 rounded-xl" />
                  <div className="absolute inset-8 border border-white/20 rounded-lg" />
                  
                  {/* Box Lid (opens up) */}
                  <motion.div
                    animate={{
                      rotateX: boxOpened ? -180 : 0,
                      y: boxOpened ? -50 : 0
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ transformOrigin: "bottom center" }}
                    className="absolute inset-0 bg-gradient-to-br from-primary to-secondary/90 rounded-2xl border-2 border-white/20"
                  >
                    <div className="absolute inset-4 border border-white/30 rounded-xl" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Ribbon */}
            <AnimatePresence>
              {!ribbonUntied && (
                <motion.div
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Vertical Ribbon */}
                  <motion.div
                    animate={{
                      scaleY: isUnwrapping ? 0 : 1,
                      opacity: isUnwrapping ? 0 : 1
                    }}
                    transition={{ duration: 2 }}
                    className="absolute left-1/2 top-0 w-8 h-full bg-accent transform -translate-x-1/2 rounded-full"
                  />
                  
                  {/* Horizontal Ribbon */}
                  <motion.div
                    animate={{
                      scaleX: isUnwrapping ? 0 : 1,
                      opacity: isUnwrapping ? 0 : 1
                    }}
                    transition={{ duration: 2 }}
                    className="absolute top-1/2 left-0 w-full h-8 bg-accent transform -translate-y-1/2 rounded-full"
                  />
                  
                  {/* Ribbon Bow */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRibbonClick}
                    animate={{
                      scale: isUnwrapping ? 0 : 1,
                      rotate: isUnwrapping ? 360 : 0
                    }}
                    transition={{ duration: 2 }}
                    className="absolute top-1/2 left-1/2 w-16 h-16 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center shadow-lg"
                  >
                    <Icon name="Sparkles" size={24} className="text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inner Glow Effect */}
            <AnimatePresence>
              {boxOpened && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 2, opacity: 1 }}
                  exit={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="absolute top-1/2 left-1/2 w-32 h-32 bg-accent/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center space-x-2">
            {['ribbon', 'box', 'sparkles', 'content']?.map((stageItem, index) => (
              <motion.div
                key={stageItem}
                className={`w-3 h-3 rounded-full ${
                  ['ribbon', 'box', 'sparkles', 'content']?.indexOf(stage) >= index
                    ? 'bg-secondary' :'bg-muted'
                }`}
                animate={{
                  scale: stage === stageItem ? 1.2 : 1
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnwrappingSequence;