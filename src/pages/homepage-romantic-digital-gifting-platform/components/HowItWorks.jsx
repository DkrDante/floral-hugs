import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Choose Your Perfect Gift",
      description: "Browse our curated collection of digital romantic experiences, from animated bouquets to personalized love letters",
      icon: "Gift",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
      color: "bg-primary/20 text-primary",
      features: ["150+ unique gifts", "Mood-based filtering", "Preview available"]
    },
    {
      id: 2,
      title: "Personalize with Love",
      description: "Add your personal touch with custom messages, photos, voice recordings, and choose the perfect timing",
      icon: "Edit",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&crop=center",
      color: "bg-secondary/20 text-secondary",
      features: ["Voice messages", "Photo integration", "Custom text"]
    },
    {
      id: 3,
      title: "Deliver the Magic",
      description: "Watch as your loved one receives a beautiful, interactive experience that creates an unforgettable moment",
      icon: "Send",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center",
      color: "bg-accent/20 text-accent",
      features: ["Instant delivery", "Scheduled sending", "Delivery confirmation"]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground">
            How It
            <span className="block text-secondary">Works</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Creating magical romantic moments is simple with our three-step process
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {steps?.map((step, index) => (
            <div key={step?.id} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Step Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-romantic-lg">
                  <Image
                    src={step?.image}
                    alt={step?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-romantic-gradient/10"></div>
                  
                  {/* Step Number */}
                  <div className="absolute top-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-romantic">
                    <span className="font-playfair text-2xl font-bold text-foreground">{step?.id}</span>
                  </div>

                  {/* Floating Icon */}
                  <div className={`absolute bottom-6 right-6 w-16 h-16 ${step?.color} rounded-full flex items-center justify-center shadow-romantic animate-bloom`}>
                    <Icon name={step?.icon} size={24} />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              </div>

              {/* Step Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${step?.color} rounded-2xl flex items-center justify-center`}>
                      <Icon name={step?.icon} size={20} />
                    </div>
                    <span className="font-inter text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Step {step?.id}
                    </span>
                  </div>
                  <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground">
                    {step?.title}
                  </h3>
                  <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                    {step?.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {step?.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={14} className="text-success" />
                      </div>
                      <span className="font-inter text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Step CTA */}
                <div className="pt-4">
                  {step?.id === 1 && (
                    <Link to="/gift-gallery-interactive-catalog">
                      <Button
                        variant="outline"
                        size="lg"
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="text-primary border-primary/30 hover:border-primary hover:bg-primary/10"
                      >
                        Browse Gifts
                      </Button>
                    </Link>
                  )}
                  {step?.id === 2 && (
                    <Link to="/love-story-builder-personalization-studio">
                      <Button
                        variant="outline"
                        size="lg"
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="text-secondary border-secondary/30 hover:border-secondary hover:bg-secondary/10"
                      >
                        Start Personalizing
                      </Button>
                    </Link>
                  )}
                  {step?.id === 3 && (
                    <Link to="/moment-scheduler-delivery-experience">
                      <Button
                        variant="outline"
                        size="lg"
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="text-accent border-accent/30 hover:border-accent hover:bg-accent/10"
                      >
                        Schedule Delivery
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="mt-16 lg:mt-24">
          <div className="bg-background rounded-3xl p-8 lg:p-12 shadow-romantic">
            <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-center text-foreground mb-8">
              Your Journey to Creating Magic
            </h3>
            
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
              {steps?.map((step, index) => (
                <React.Fragment key={step?.id}>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-20 h-20 ${step?.color} rounded-full flex items-center justify-center shadow-romantic hover:animate-bloom transition-all duration-300`}>
                      <Icon name={step?.icon} size={28} />
                    </div>
                    <h4 className="font-inter font-semibold text-foreground">{step?.title}</h4>
                    <p className="font-inter text-sm text-muted-foreground max-w-32">{step?.description?.split(',')?.[0]}</p>
                  </div>
                  
                  {index < steps?.length - 1 && (
                    <div className="hidden lg:block">
                      <Icon name="ArrowRight" size={24} className="text-muted-foreground" />
                    </div>
                  )}
                  {index < steps?.length - 1 && (
                    <div className="lg:hidden">
                      <Icon name="ArrowDown" size={24} className="text-muted-foreground" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <Button
            variant="default"
            size="lg"
            iconName="Heart"
            iconPosition="left"
            className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300 animate-pulse-gentle text-lg px-8 py-4"
          >
            Start Creating Magic Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;