import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeliveryPreview = ({ selectedGift, deliveryDetails, onConfirm, onEdit }) => {
  if (!selectedGift || !deliveryDetails) {
    return (
      <div className="bg-card rounded-xl shadow-romantic p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Gift" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-playfair text-lg font-semibold text-foreground mb-2">
          Select a Gift & Time
        </h3>
        <p className="text-sm text-muted-foreground font-inter">
          Choose your romantic gesture and perfect delivery moment to see the preview
        </p>
      </div>
    );
  }

  const formatDeliveryTime = () => {
    if (deliveryDetails?.type === 'quick') {
      return deliveryDetails?.option?.title;
    }
    
    const date = new Date(deliveryDetails.date);
    const time = deliveryDetails?.time;
    
    return `${date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })} at ${time}`;
  };

  return (
    <div className="bg-card rounded-xl shadow-romantic overflow-hidden">
      {/* Header */}
      <div className="bg-romantic-gradient p-6 text-center">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-gentle">
          <Icon name="Eye" size={24} className="text-secondary" />
        </div>
        <h3 className="font-playfair text-xl font-semibold text-secondary mb-1">
          Delivery Preview
        </h3>
        <p className="text-sm text-secondary/80 font-inter">
          How your gift will appear to your loved one
        </p>
      </div>
      {/* Preview Content */}
      <div className="p-6">
        {/* Gift Preview */}
        <div className="bg-background rounded-lg p-4 mb-6 border border-border">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-romantic">
              <Image
                src={selectedGift?.image}
                alt={selectedGift?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-inter font-semibold text-foreground mb-1">
                {selectedGift?.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-2 font-inter">
                {selectedGift?.description}
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="Heart" size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground font-inter">
                  Personalized with love
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={18} className="text-secondary" />
              <span className="font-inter font-medium text-foreground">Delivery Time</span>
            </div>
            <span className="text-sm text-muted-foreground font-inter">
              {formatDeliveryTime()}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={18} className="text-secondary" />
              <span className="font-inter font-medium text-foreground">Recipient</span>
            </div>
            <span className="text-sm text-muted-foreground font-inter">
              {deliveryDetails?.recipient || 'Your beloved'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="MessageCircle" size={18} className="text-secondary" />
              <span className="font-inter font-medium text-foreground">Personal Message</span>
            </div>
            <span className="text-sm text-muted-foreground font-inter">
              {deliveryDetails?.message ? 'Included' : 'None'}
            </span>
          </div>
        </div>

        {/* Notification Preview */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6 border border-primary/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Heart" size={16} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h5 className="font-inter font-semibold text-foreground mb-1">
                Notification Preview
              </h5>
              <p className="text-sm text-muted-foreground font-inter">
                "💝 You have a special delivery from someone who loves you! Tap to open your romantic surprise."
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            fullWidth
            iconName="Edit"
            iconPosition="left"
            onClick={onEdit}
            className="text-muted-foreground hover:text-secondary border-border hover:border-secondary/30"
          >
            Edit Details
          </Button>
          <Button
            variant="default"
            fullWidth
            iconName="Send"
            iconPosition="left"
            onClick={onConfirm}
            className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300 animate-pulse-gentle"
          >
            Confirm & Schedule
          </Button>
        </div>
      </div>
      {/* Floating Animation Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full animate-float opacity-60"></div>
      <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-accent/40 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default DeliveryPreview;