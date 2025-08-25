import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState('playful');

  const moods = [
    {
      id: 'playful',
      name: 'Playful',
      icon: 'Smile',
      color: 'bg-accent/20 text-accent border-accent/30',
      hoverColor: 'hover:bg-accent/30 hover:border-accent',
      description: 'Fun and lighthearted expressions of love',
      giftCount: '120+ gifts'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      icon: 'Crown',
      color: 'bg-secondary/20 text-secondary border-secondary/30',
      hoverColor: 'hover:bg-secondary/30 hover:border-secondary',
      description: 'Sophisticated and refined romantic gestures',
      giftCount: '85+ gifts'
    },
    {
      id: 'passionate',
      name: 'Passionate',
      icon: 'Flame',
      color: 'bg-error/20 text-error border-error/30',
      hoverColor: 'hover:bg-error/30 hover:border-error',
      description: 'Intense and deeply emotional connections',
      giftCount: '95+ gifts'
    },
    {
      id: 'sweet',
      name: 'Sweet',
      icon: 'Heart',
      color: 'bg-primary/20 text-primary border-primary/30',
      hoverColor: 'hover:bg-primary/30 hover:border-primary',
      description: 'Gentle and tender moments of affection',
      giftCount: '150+ gifts'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground">
            How Are You Feeling
            <span className="block text-secondary">Today?</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your mood and discover the perfect digital gifts that match your heart's desire
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {moods?.map((mood) => (
            <button
              key={mood?.id}
              onClick={() => setSelectedMood(mood?.id)}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-romantic hover:scale-105 ${
                selectedMood === mood?.id
                  ? `${mood?.color} shadow-romantic scale-105`
                  : `bg-card border-border hover:bg-card/80 ${mood?.hoverColor}`
              }`}
            >
              <div className="text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedMood === mood?.id ? 'bg-white/20' : 'bg-muted/20 group-hover:bg-white/10'
                }`}>
                  <Icon 
                    name={mood?.icon} 
                    size={28} 
                    className={`transition-all duration-300 ${
                      selectedMood === mood?.id ? 'animate-bloom' : 'group-hover:animate-bloom'
                    }`} 
                  />
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-lg mb-2">{mood?.name}</h3>
                  <p className="font-inter text-sm opacity-80 mb-2">{mood?.description}</p>
                  <p className="font-inter text-xs font-medium opacity-60">{mood?.giftCount}</p>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedMood === mood?.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center animate-bloom">
                  <Icon name="Check" size={14} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Selected Mood CTA */}
        <div className="text-center">
          <Link to="/gift-gallery-interactive-catalog">
            <button className="group bg-romantic-gradient-dark text-white px-8 py-4 rounded-2xl font-inter font-semibold text-lg hover:shadow-romantic-lg transition-all duration-300 hover:scale-105">
              <span className="flex items-center space-x-2">
                <span>Explore {moods?.find(m => m?.id === selectedMood)?.name} Gifts</span>
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MoodSelector;