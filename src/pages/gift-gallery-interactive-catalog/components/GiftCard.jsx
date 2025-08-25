import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GiftCard = ({ gift, onQuickPreview, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickPreview = (e) => {
    e?.stopPropagation();
    onQuickPreview(gift);
  };

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    onAddToCart(gift);
  };

  return (
    <div 
      className="group relative bg-card rounded-xl shadow-romantic hover:shadow-romantic-lg transition-all duration-500 overflow-hidden cursor-pointer animate-bloom"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gift Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-[4/3] relative">
          <Image
            src={gift?.image}
            alt={gift?.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Overlay Effects */}
          <div className={`absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Floating Hearts Animation */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-3 h-3 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0s' }} />
              <div className="absolute top-8 right-6 w-2 h-2 bg-accent/70 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-secondary/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className={`absolute top-3 right-3 flex space-x-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleQuickPreview}
            className="bg-background/90 backdrop-blur-sm hover:bg-background text-foreground shadow-romantic"
          >
            <Icon name="Eye" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToCart}
            className="bg-background/90 backdrop-blur-sm hover:bg-background text-foreground shadow-romantic"
          >
            <Icon name="Heart" size={16} />
          </Button>
        </div>

        {/* Gift Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            gift?.category === 'premium' ?'bg-accent/90 text-accent-foreground' 
              : gift?.category === 'personalized' ?'bg-secondary/90 text-secondary-foreground' :'bg-primary/90 text-primary-foreground'
          }`}>
            <Icon name={gift?.categoryIcon} size={12} className="mr-1" />
            {gift?.categoryLabel}
          </span>
        </div>

        {/* New/Popular Badge */}
        {gift?.badge && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-success text-success-foreground animate-pulse-gentle">
              {gift?.badge}
            </span>
          </div>
        )}
      </div>
      {/* Gift Details */}
      <div className="p-4 space-y-3">
        {/* Title and Rating */}
        <div className="space-y-1">
          <h3 className="font-playfair text-lg font-semibold text-foreground group-hover:text-secondary transition-colors duration-300 line-clamp-2">
            {gift?.title}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < Math.floor(gift?.rating) ? 'text-accent fill-current' : 'text-muted-foreground/30'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({gift?.reviews})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {gift?.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {gift?.features?.slice(0, 3)?.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground"
            >
              {feature}
            </span>
          ))}
          {gift?.features?.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
              +{gift?.features?.length - 3} more
            </span>
          )}
        </div>

        {/* Pricing and Delivery */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-playfair text-lg font-semibold text-secondary">
                ${gift?.price}
              </span>
              {gift?.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${gift?.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{gift?.deliveryTime}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center space-x-1 text-xs text-success">
              <Icon name="Zap" size={12} />
              <span>Instant</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {gift?.personalizationLevel}
            </div>
          </div>
        </div>
      </div>
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 transition-opacity duration-500 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default GiftCard;