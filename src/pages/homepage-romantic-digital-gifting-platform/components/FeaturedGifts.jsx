import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedGifts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredGifts = [
    {
      id: 1,
      name: "Digital Rose Bouquet",
      description: "A stunning animated bouquet with personalized voice message that blooms when opened",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center",
      category: "Sweet",
      features: ["Voice Message", "Custom Animation", "Instant Delivery"],
      isPopular: true,
      deliveryTime: "Instant"
    },
    {
      id: 2,
      name: "Love Letter Experience",
      description: "Handwritten-style digital letter with romantic animations and background music",
      price: "$18.99",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&crop=center",
      category: "Elegant",
      features: ["Custom Text", "Music Integration", "Elegant Typography"],
      isPopular: false,
      deliveryTime: "Instant"
    },
    {
      id: 3,
      name: "Surprise Delivery Sequence",
      description: "Multi-part romantic experience delivered throughout the day with perfect timing",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
      category: "Passionate",
      features: ["Scheduled Delivery", "Multiple Parts", "Surprise Elements"],
      isPopular: true,
      deliveryTime: "Custom Schedule"
    },
    {
      id: 4,
      name: "Memory Lane Journey",
      description: "Interactive timeline of your relationship milestones with photos and messages",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop&crop=center",
      category: "Playful",
      features: ["Photo Integration", "Timeline View", "Interactive Elements"],
      isPopular: false,
      deliveryTime: "2-4 hours"
    },
    {
      id: 5,
      name: "Virtual Date Night Kit",
      description: "Complete digital experience with games, music, and romantic activities",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center",
      category: "Playful",
      features: ["Interactive Games", "Curated Playlist", "Activity Guide"],
      isPopular: true,
      deliveryTime: "Instant"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredGifts?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredGifts?.length) % featuredGifts?.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 lg:py-24 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground">
            Featured
            <span className="block text-secondary">Love Experiences</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most beloved digital gifts, carefully crafted to create unforgettable romantic moments
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredGifts?.map((gift) => (
                <div key={gift?.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 lg:p-12">
                    {/* Gift Image */}
                    <div className="relative">
                      <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-romantic-lg">
                        <Image
                          src={gift?.image}
                          alt={gift?.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-romantic-gradient/10"></div>
                        
                        {/* Popular Badge */}
                        {gift?.isPopular && (
                          <div className="absolute top-4 left-4 bg-accent text-foreground px-3 py-1 rounded-full text-sm font-inter font-semibold flex items-center space-x-1">
                            <Icon name="Star" size={14} />
                            <span>Popular</span>
                          </div>
                        )}

                        {/* Delivery Time */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-inter font-medium flex items-center space-x-1">
                          <Icon name="Clock" size={14} className="text-success" />
                          <span>{gift?.deliveryTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Gift Details */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-inter font-medium">
                            {gift?.category}
                          </span>
                          <span className="font-playfair text-2xl font-bold text-secondary">
                            {gift?.price}
                          </span>
                        </div>
                        <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground mb-4">
                          {gift?.name}
                        </h3>
                        <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                          {gift?.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        <h4 className="font-inter font-semibold text-foreground">What's Included:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {gift?.features?.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Icon name="Check" size={16} className="text-success" />
                              <span className="font-inter text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          variant="default"
                          size="lg"
                          iconName="Heart"
                          iconPosition="left"
                          className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300"
                        >
                          Send This Gift
                        </Button>
                        <Link to="/love-story-builder-personalization-studio">
                          <Button
                            variant="outline"
                            size="lg"
                            iconName="Edit"
                            iconPosition="left"
                            className="text-secondary border-secondary/30 hover:border-secondary hover:bg-secondary/10"
                          >
                            Customize
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-110"
          >
            <Icon name="ChevronLeft" size={20} className="text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-110"
          >
            <Icon name="ChevronRight" size={20} className="text-foreground" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {featuredGifts?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-secondary scale-125' :'bg-muted hover:bg-secondary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link to="/gift-gallery-interactive-catalog">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="text-secondary border-secondary/30 hover:border-secondary hover:bg-secondary/10"
            >
              View All Gifts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGifts;