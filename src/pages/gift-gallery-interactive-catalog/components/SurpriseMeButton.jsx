import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SurpriseMeButton = ({ onSurpriseMe, isLoading }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="relative">
        {/* Floating Animation Rings */}
        <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
          isHovered ? 'scale-150 opacity-20' : 'scale-100 opacity-30'
        }`}>
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary animate-spin" 
               style={{ animationDuration: '8s' }} />
        </div>
        
        <div className={`absolute inset-2 rounded-full transition-all duration-700 ${
          isHovered ? 'scale-125 opacity-40' : 'scale-100 opacity-50'
        }`}>
          <div className="w-full h-full rounded-full bg-gradient-to-l from-secondary via-primary to-accent animate-spin" 
               style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
        </div>

        {/* Main Button */}
        <Button
          variant="default"
          size="lg"
          onClick={onSurpriseMe}
          loading={isLoading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-16 h-16 rounded-full bg-romantic-gradient shadow-romantic-lg hover:shadow-2xl transition-all duration-500 group ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${isLoading ? 'animate-pulse' : 'animate-pulse-gentle'}`}
        >
          {!isLoading ? (
            <div className="flex flex-col items-center space-y-1">
              <Icon 
                name="Sparkles" 
                size={24} 
                className={`text-secondary-foreground transition-all duration-300 ${
                  isHovered ? 'animate-spin' : ''
                }`} 
              />
              <span className="text-xs font-medium text-secondary-foreground opacity-90">
                Surprise
              </span>
            </div>
          ) : (
            <Icon name="Loader2" size={24} className="text-secondary-foreground animate-spin" />
          )}
        </Button>

        {/* Tooltip */}
        <div className={`absolute bottom-full right-0 mb-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-romantic whitespace-nowrap">
            <p className="text-sm font-medium text-foreground">Surprise Me!</p>
            <p className="text-xs text-muted-foreground">AI-powered gift suggestions</p>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
          </div>
        </div>

        {/* Floating Hearts */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute -top-4 right-2 w-2 h-2 bg-accent/70 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-2 -right-4 w-2.5 h-2.5 bg-secondary/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-2 -left-4 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SurpriseMeButton;