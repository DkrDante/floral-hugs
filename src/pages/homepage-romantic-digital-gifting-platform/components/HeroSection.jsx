import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-romantic-gradient overflow-hidden flex items-center">
      {/* Floating Hearts Animation Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 right-1/3 w-5 h-5 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-60 right-10 w-2 h-2 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: '5s' }}></div>
      </div>

      {/* Rose Petals Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/5 w-6 h-6 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1.5s', transform: 'rotate(45deg)' }}></div>
        <div className="absolute top-28 right-1/4 w-4 h-4 bg-primary/25 rounded-full animate-float" style={{ animationDelay: '3.5s', transform: 'rotate(-30deg)' }}></div>
        <div className="absolute bottom-32 left-1/6 w-5 h-5 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '2.5s', transform: 'rotate(60deg)' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Love Made
                <span className="block text-secondary animate-gradient-shift"> Tangible</span>
              </h1>
              <p className="font-inter text-xl lg:text-2xl text-muted-foreground max-w-2xl">
                Transform your deepest feelings into beautiful digital experiences that touch hearts across any distance
              </p>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                iconName="Heart"
                iconPosition="left"
                className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300 animate-pulse-gentle text-lg px-8 py-4"
              >
                Send Love Now
              </Button>
              <Link to="/gift-gallery-interactive-catalog">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Gift"
                  iconPosition="left"
                  className="text-secondary border-secondary/30 hover:border-secondary hover:bg-secondary/10 text-lg px-8 py-4"
                >
                  Explore Gift Gallery
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-accent" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-secondary" />
                <span>50,000+ Happy Couples</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 shadow-romantic-lg">
              <div className="aspect-square relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=600&fit=crop&crop=center"
                  alt="Romantic couple sharing digital love message"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-romantic-gradient/20"></div>
              </div>
              
              {/* Floating Gift Preview */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-romantic animate-bloom">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-sm text-foreground">Digital Rose Bouquet</p>
                    <p className="font-inter text-xs text-muted-foreground">With voice message</p>
                  </div>
                </div>
              </div>

              {/* Floating Delivery Notification */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-romantic animate-bloom" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-sm text-foreground">Love Delivered!</p>
                    <p className="font-inter text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;