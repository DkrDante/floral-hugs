import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Star } from 'lucide-react';

const FeaturedContentCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredContent = [
    {
      title: 'Digital Intimacy in Modern Relationships',
      category: 'Trending Article',
      readTime: '8 min read',
      rating: 4.9,
      readers: '12.3k',
      image: '💕',
      description: 'Navigate the complexities of maintaining emotional connection in our digital age',
      author: 'Dr. Sarah Chen',
      tags: ['Communication', 'Technology', 'Intimacy']
    },
    {
      title: 'Creating Meaningful Moments Daily',
      category: 'Featured Guide',
      readTime: '12 min read',
      rating: 4.8,
      readers: '8.7k',
      image: '✨',
      description: 'Small gestures that make a big difference in your relationship',
      author: 'Michael Rodriguez',
      tags: ['Daily Habits', 'Mindfulness', 'Connection']
    },
    {
      title: 'The Science of Lasting Love',
      category: 'Research Deep Dive',
      readTime: '15 min read',
      rating: 4.9,
      readers: '15.2k',
      image: '🧠',
      description: 'Evidence-based strategies for building relationships that last',
      author: 'Dr. Emily Thompson',
      tags: ['Research', 'Psychology', 'Longevity']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredContent?.length) % featuredContent?.length);
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-secondary mb-4">
            Featured Content
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trending articles and expert insights to enhance your relationship journey
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-romantic">
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-romantic-gradient rounded-full flex items-center justify-center text-4xl">
                  {featuredContent?.[currentSlide]?.image}
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {featuredContent?.[currentSlide]?.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredContent?.[currentSlide]?.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {featuredContent?.[currentSlide]?.readers}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      {featuredContent?.[currentSlide]?.rating}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-playfair font-bold text-card-foreground mb-3">
                  {featuredContent?.[currentSlide]?.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {featuredContent?.[currentSlide]?.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      by {featuredContent?.[currentSlide]?.author}
                    </span>
                    <div className="flex gap-2">
                      {featuredContent?.[currentSlide]?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                    Read Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background shadow-romantic rounded-full p-3 hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-secondary" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background shadow-romantic rounded-full p-3 hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-secondary" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredContent?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-secondary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContentCarousel;