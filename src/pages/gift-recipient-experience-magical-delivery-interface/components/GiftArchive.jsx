import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GiftArchive = ({ onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedGift, setSelectedGift] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, timeline

  // Mock archived gifts data
  const archivedGifts = [
    {
      id: 1,
      type: 'rose-bouquet',
      sender: 'Alex',
      date: '2025-02-14',
      title: 'Valentine\'s Surprise',
      preview: 'Every petal represents a reason why I love you...',
      thumbnail: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      type: 'love-letter',
      sender: 'Alex',
      date: '2025-01-20',
      title: 'Monthly Love Note',
      preview: 'Another month together, another reason to celebrate...',
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      type: 'photo-montage',
      sender: 'Alex',
      date: '2024-12-25',
      title: 'Christmas Memories',
      preview: 'Our first Christmas together was magical...',
      thumbnail: 'https://images.unsplash.com/photo-1512389098783-66b81f86e199?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      type: 'voice-message',
      sender: 'Alex',
      date: '2024-11-15',
      title: 'Good Morning Love',
      preview: 'Voice message - 2:45',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Gifts', icon: 'Heart' },
    { id: 'rose-bouquet', label: 'Flowers', icon: 'Flower' },
    { id: 'love-letter', label: 'Letters', icon: 'Mail' },
    { id: 'photo-montage', label: 'Photos', icon: 'Image' },
    { id: 'voice-message', label: 'Voice', icon: 'Mic' }
  ];

  const filteredGifts = selectedFilter === 'all' 
    ? archivedGifts 
    : archivedGifts?.filter(gift => gift?.type === selectedFilter);

  const getGiftIcon = (type) => {
    const icons = {
      'rose-bouquet': 'Flower',
      'love-letter': 'Mail',
      'photo-montage': 'Image',
      'voice-message': 'Mic'
    };
    return icons?.[type] || 'Heart';
  };

  return (
    <div className="min-h-screen bg-romantic-gradient">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-foreground">
                Love Archive 💕
              </h1>
              <p className="font-inter text-muted-foreground">
                All your precious moments in one place
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex bg-card rounded-2xl p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  className="rounded-xl"
                />
                <Button
                  variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                  iconName="Calendar"
                  className="rounded-xl"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={onClose}
                iconName="X"
                iconPosition="left"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filterOptions?.map((filter) => (
            <Button
              key={filter?.id}
              variant={selectedFilter === filter?.id ? 'default' : 'outline'}
              onClick={() => setSelectedFilter(filter?.id)}
              iconName={filter?.icon}
              iconPosition="left"
              size="sm"
            >
              {filter?.label}
            </Button>
          ))}
        </div>

        {/* View Modes */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredGifts?.map((gift, index) => (
                <motion.div
                  key={gift?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedGift(gift)}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-romantic-lg cursor-pointer hover:shadow-romantic-lg transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={gift?.thumbnail}
                      alt={gift?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-romantic-gradient/20" />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <Icon name={getGiftIcon(gift?.type)} size={20} className="text-secondary" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-playfair text-xl font-bold text-foreground">
                          {gift?.title}
                        </h3>
                        <p className="font-inter text-sm text-muted-foreground">
                          From {gift?.sender} • {new Date(gift.date)?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <p className="font-inter text-muted-foreground line-clamp-2">
                      {gift?.preview}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />
                
                {filteredGifts?.map((gift, index) => (
                  <motion.div
                    key={gift?.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative flex items-start space-x-6 pb-8"
                  >
                    {/* Timeline Dot */}
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-romantic">
                      <Icon name={getGiftIcon(gift?.type)} size={24} className="text-secondary" />
                    </div>
                    
                    {/* Content */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedGift(gift)}
                      className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-romantic cursor-pointer hover:shadow-romantic-lg transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                          <Image
                            src={gift?.thumbnail}
                            alt={gift?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-playfair text-xl font-bold text-foreground">
                              {gift?.title}
                            </h3>
                            <span className="font-inter text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                              {new Date(gift.date)?.toLocaleDateString()}
                            </span>
                          </div>
                          
                          <p className="font-inter text-sm text-muted-foreground mb-2">
                            From {gift?.sender}
                          </p>
                          
                          <p className="font-inter text-muted-foreground">
                            {gift?.preview}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredGifts?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Gift" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
              No gifts found
            </h3>
            <p className="font-inter text-muted-foreground">
              Try adjusting your filter to see more gifts
            </p>
          </motion.div>
        )}
      </div>
      {/* Gift Detail Modal */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedGift(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e?.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-romantic-lg"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold text-foreground mb-2">
                      {selectedGift?.title}
                    </h2>
                    <p className="font-inter text-muted-foreground">
                      From {selectedGift?.sender} • {new Date(selectedGift.date)?.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedGift(null)}
                    iconName="X"
                    className="rounded-full"
                  />
                </div>
                
                <div className="aspect-video mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={selectedGift?.thumbnail}
                    alt={selectedGift?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <p className="font-inter text-foreground">
                    {selectedGift?.preview}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button
                      iconName="Heart"
                      iconPosition="left"
                    >
                      Re-experience
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Share"
                      iconPosition="left"
                    >
                      Share Memory
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftArchive;