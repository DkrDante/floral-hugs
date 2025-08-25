import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ResponseInterface = ({ gift, onComplete }) => {
  const [responseType, setResponseType] = useState('text'); // text, voice, emoji
  const [textMessage, setTextMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [showSendAnimation, setShowSendAnimation] = useState(false);

  const emojiOptions = [
    '❤️', '🥰', '😘', '💕', '💖', '🌹', '💝', '✨',
    '🦋', '🌸', '💐', '🎉', '😍', '🤗', '💘', '💓'
  ];

  const handleSendResponse = () => {
    setShowSendAnimation(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const toggleEmoji = (emoji) => {
    setSelectedEmojis(prev => 
      prev?.includes(emoji) 
        ? prev?.filter(e => e !== emoji)
        : [...prev, emoji]
    );
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-romantic-gradient relative overflow-hidden">
      {/* Send Animation */}
      <AnimatePresence>
        {showSendAnimation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 2 }}
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Icon name="Send" size={32} className="text-white" />
              </motion.div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                Response Sent! 💌
              </h3>
              <p className="font-inter text-muted-foreground">
                Your love is on its way to {gift?.sender}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-4xl font-bold text-foreground mb-2"
            >
              Send Your Response 💝
            </motion.h1>
            <p className="font-inter text-muted-foreground">
              Let {gift?.sender} know how their gift made you feel
            </p>
          </div>

          {/* Response Type Selector */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-romantic-lg mb-6">
            <div className="flex justify-center space-x-2 mb-6">
              {[
                { type: 'text', icon: 'MessageSquare', label: 'Text' },
                { type: 'voice', icon: 'Mic', label: 'Voice' },
                { type: 'emoji', icon: 'Smile', label: 'Emojis' }
              ]?.map(({ type, icon, label }) => (
                <Button
                  key={type}
                  variant={responseType === type ? 'default' : 'outline'}
                  onClick={() => setResponseType(type)}
                  iconName={icon}
                  iconPosition="left"
                  size="sm"
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Response Content */}
            <AnimatePresence mode="wait">
              {responseType === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block font-inter font-medium text-foreground mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={textMessage}
                      onChange={(e) => setTextMessage(e?.target?.value)}
                      placeholder="Thank you so much for this beautiful gift..."
                      className="w-full h-32 p-4 border border-border rounded-2xl bg-background resize-none font-inter text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  {/* Quick Reply Templates */}
                  <div>
                    <p className="font-inter font-medium text-foreground mb-2">Quick Replies:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "This made my day! ❤️",
                        "You're so thoughtful 🥰",
                        "I love you so much! 💕",
                        "Thank you, my love 😘"
                      ]?.map((template) => (
                        <Button
                          key={template}
                          variant="outline"
                          size="sm"
                          onClick={() => setTextMessage(template)}
                          className="text-xs"
                        >
                          {template}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {responseType === 'voice' && (
                <motion.div
                  key="voice"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVoiceRecord}
                    animate={{
                      scale: isRecording ? [1, 1.1, 1] : 1,
                      backgroundColor: isRecording ? ['#F8BBD9', '#8B1538', '#F8BBD9'] : '#F8BBD9'
                    }}
                    transition={{
                      scale: { duration: 1, repeat: isRecording ? Infinity : 0 },
                      backgroundColor: { duration: 1, repeat: isRecording ? Infinity : 0 }
                    }}
                    className="w-24 h-24 rounded-full flex items-center justify-center shadow-romantic-lg mb-4"
                  >
                    <Icon 
                      name={isRecording ? "Square" : "Mic"} 
                      size={32} 
                      className="text-white" 
                    />
                  </motion.button>
                  
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                    {isRecording ? 'Recording...' : 'Tap to Record'}
                  </h3>
                  <p className="font-inter text-muted-foreground">
                    {isRecording ? 'Speak from your heart' : 'Record a voice message'}
                  </p>
                  
                  {isRecording && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3 }}
                      className="h-1 bg-secondary rounded-full mt-4"
                    />
                  )}
                </motion.div>
              )}

              {responseType === 'emoji' && (
                <motion.div
                  key="emoji"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <p className="font-inter font-medium text-foreground text-center">
                    Choose emojis that express your feelings:
                  </p>
                  
                  <div className="grid grid-cols-8 gap-2">
                    {emojiOptions?.map((emoji) => (
                      <motion.button
                        key={emoji}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleEmoji(emoji)}
                        className={`text-2xl p-3 rounded-2xl border-2 transition-colors ${
                          selectedEmojis?.includes(emoji)
                            ? 'border-primary bg-primary/20' :'border-border hover:border-primary/50'
                        }`}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                  
                  {selectedEmojis?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-primary/10 rounded-2xl"
                    >
                      <p className="font-inter text-sm text-foreground mb-2">Selected:</p>
                      <div className="text-3xl space-x-2">
                        {selectedEmojis?.join(' ')}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Send Button */}
          <div className="text-center space-y-4">
            <Button
              size="lg"
              onClick={handleSendResponse}
              iconName="Send"
              iconPosition="right"
              disabled={
                (responseType === 'text' && !textMessage?.trim()) ||
                (responseType === 'emoji' && selectedEmojis?.length === 0)
              }
              className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300 text-lg px-12 py-4"
            >
              Send Response
            </Button>
            
            <Button
              variant="ghost"
              onClick={onComplete}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Gift
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResponseInterface;