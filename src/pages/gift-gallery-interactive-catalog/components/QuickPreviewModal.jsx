import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickPreviewModal = ({ gift, isOpen, onClose, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !gift) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === gift?.previewImages?.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? gift?.previewImages?.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    onAddToCart(gift);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className={`relative bg-card rounded-2xl shadow-romantic-lg max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-500 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background text-foreground shadow-romantic"
        >
          <Icon name="X" size={20} />
        </Button>

        <div className="grid lg:grid-cols-2 gap-0 h-full">
          {/* Image Section */}
          <div className="relative bg-muted">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={gift?.previewImages?.[currentImageIndex]}
                alt={`${gift?.title} preview ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {gift?.previewImages?.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background text-foreground shadow-romantic"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background text-foreground shadow-romantic"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </Button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {gift?.previewImages?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-secondary scale-125' :'bg-background/60 hover:bg-background/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Floating Animation Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-8 left-8 w-3 h-3 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
                <div className="absolute top-16 right-12 w-2 h-2 bg-accent/50 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
                <div className="absolute bottom-16 left-12 w-2.5 h-2.5 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    gift?.category === 'premium' ?'bg-accent/20 text-accent-foreground' 
                      : gift?.category === 'personalized' ?'bg-secondary/20 text-secondary-foreground' :'bg-primary/20 text-primary-foreground'
                  }`}>
                    <Icon name={gift?.categoryIcon} size={14} className="mr-2" />
                    {gift?.categoryLabel}
                  </span>
                  {gift?.badge && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-success/20 text-success-foreground ml-2">
                      {gift?.badge}
                    </span>
                  )}
                </div>
              </div>

              <h2 className="font-playfair text-2xl font-bold text-foreground">
                {gift?.title}
              </h2>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < Math.floor(gift?.rating) ? 'text-accent fill-current' : 'text-muted-foreground/30'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {gift?.rating} ({gift?.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-inter font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {gift?.fullDescription || gift?.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-inter font-semibold text-foreground">What's Included</h3>
              <div className="grid grid-cols-2 gap-2">
                {gift?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalization Options */}
            <div className="space-y-3">
              <h3 className="font-inter font-semibold text-foreground">Personalization</h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Palette" size={16} className="text-secondary" />
                  <span className="text-sm font-medium">{gift?.personalizationLevel} Customization</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add personal messages, choose colors, upload photos, and customize delivery timing.
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3">
              <h3 className="font-inter font-semibold text-foreground">Delivery</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-success" />
                  <span className="text-sm text-success font-medium">Instant Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{gift?.deliveryTime}</span>
                </div>
              </div>
            </div>

            {/* Pricing and Actions */}
            <div className="pt-6 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-playfair text-3xl font-bold text-secondary">
                      ${gift?.price}
                    </span>
                    {gift?.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${gift?.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">One-time purchase</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  iconName="Heart"
                  iconPosition="left"
                  className="flex-1 border-secondary/30 text-secondary hover:bg-secondary/10"
                >
                  Save for Later
                </Button>
                <Button
                  variant="default"
                  onClick={handleAddToCart}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="flex-1 bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPreviewModal;