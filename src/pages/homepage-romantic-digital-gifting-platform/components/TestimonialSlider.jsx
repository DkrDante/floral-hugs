import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialSlider = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah & Michael",
      location: "New York, NY",
      relationship: "Together 3 years",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      partnerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      testimonial: `Floral Hugs saved our long-distance relationship! The digital rose bouquet with Michael's voice message made me cry happy tears. It felt like he was right there with me. We now send each other surprise gifts every week!`,
      giftSent: "Digital Rose Bouquet",
      rating: 5,
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Emma & David",
      location: "London, UK",
      relationship: "Married 5 years",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      partnerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      testimonial: `David surprised me with a Memory Lane Journey for our anniversary. Seeing our photos and memories animated with such beautiful music brought back all the butterflies from when we first met. Pure magic!`,
      giftSent: "Memory Lane Journey",
      rating: 5,
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Alex & Jordan",
      location: "Toronto, CA",
      relationship: "Dating 1 year",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      partnerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      testimonial: `The Love Letter Experience was absolutely perfect for our first anniversary. Jordan's personalized message with the romantic music made it feel like a scene from a movie. We both cried!`,
      giftSent: "Love Letter Experience",
      rating: 5,
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Maria & Carlos",
      location: "Barcelona, Spain",
      relationship: "Engaged",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      partnerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      testimonial: `Carlos proposed using the Surprise Delivery Sequence! Throughout the day, I received clues and romantic messages that led to the final proposal video. It was the most creative and heartfelt proposal ever!`,
      giftSent: "Surprise Delivery Sequence",
      rating: 5,
      date: "1 week ago"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials?.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const currentData = testimonials?.[currentTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground">
            Love Stories
            <span className="block text-secondary">From Real Couples</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Floral Hugs has touched hearts and strengthened relationships around the world
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-romantic-lg relative overflow-hidden">
            {/* Background Hearts */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full animate-float"></div>
            <div className="absolute bottom-8 left-8 w-6 h-6 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10">
              {/* Couple Avatars */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20">
                        <Image
                          src={currentData?.avatar}
                          alt={currentData?.name?.split(' & ')?.[0]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-romantic-gradient rounded-full flex items-center justify-center animate-pulse-gentle">
                      <Icon name="Heart" size={16} className="text-secondary" />
                    </div>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20">
                        <Image
                          src={currentData?.partnerAvatar}
                          alt={currentData?.name?.split(' & ')?.[1]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="text-center mb-8">
                <Icon name="Quote" size={32} className="text-primary/30 mx-auto mb-4" />
                <blockquote className="font-inter text-lg lg:text-xl text-foreground leading-relaxed italic max-w-3xl mx-auto">
                  "{currentData?.testimonial}"
                </blockquote>
              </div>

              {/* Couple Info */}
              <div className="text-center space-y-4">
                <div>
                  <h4 className="font-playfair text-2xl font-bold text-foreground">{currentData?.name}</h4>
                  <p className="font-inter text-muted-foreground">{currentData?.location} • {currentData?.relationship}</p>
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(currentData?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-current" />
                  ))}
                </div>

                {/* Gift Info */}
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Gift" size={16} className="text-primary" />
                    <span>{currentData?.giftSent}</span>
                  </div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span>{currentData?.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? 'bg-secondary scale-125' :'bg-muted hover:bg-secondary/50'
                }`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <h4 className="font-playfair text-3xl font-bold text-foreground mb-2">50,000+</h4>
              <p className="font-inter text-muted-foreground">Happy Couples</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" size={24} className="text-accent" />
              </div>
              <h4 className="font-playfair text-3xl font-bold text-foreground mb-2">2M+</h4>
              <p className="font-inter text-muted-foreground">Gifts Delivered</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Star" size={24} className="text-success" />
              </div>
              <h4 className="font-playfair text-3xl font-bold text-foreground mb-2">4.9/5</h4>
              <p className="font-inter text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;