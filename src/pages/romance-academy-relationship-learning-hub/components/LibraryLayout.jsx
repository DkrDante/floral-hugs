import React from 'react';
import { BookOpen, Heart, MapPin, Calendar } from 'lucide-react';

const LibraryLayout = () => {
  const categories = [
    {
      title: 'Love Languages Deep Dive',
      icon: Heart,
      description: 'Discover and master the five love languages',
      courses: 12,
      progress: 75,
      color: 'bg-pink-100',
      illustration: '💕'
    },
    {
      title: 'Anniversary Planning Mastery',
      icon: Calendar,
      description: 'Create unforgettable milestone celebrations',
      courses: 8,
      progress: 45,
      color: 'bg-purple-100',
      illustration: '🎉'
    },
    {
      title: 'Long-Distance Relationship Toolkit',
      icon: MapPin,
      description: 'Maintain intimacy across any distance',
      courses: 15,
      progress: 60,
      color: 'bg-blue-100',
      illustration: '🌍'
    },
    {
      title: 'Seasonal Romance Ideas',
      icon: BookOpen,
      description: 'Year-round romantic inspiration',
      courses: 20,
      progress: 30,
      color: 'bg-green-100',
      illustration: '🌸'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-secondary mb-4">
            Learning Library
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our beautifully curated collection of relationship wisdom, organized into thoughtful categories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories?.map((category, index) => {
            const IconComponent = category?.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-romantic hover:shadow-romantic-lg transition-all duration-300 group cursor-pointer animate-bloom"
              >
                <div className={`${category?.color} rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{category?.illustration}</span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-card-foreground mb-3">
                  {category?.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {category?.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    {category?.courses} courses
                  </span>
                  <IconComponent className="w-4 h-4 text-secondary" />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-semibold text-secondary">
                      {category?.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category?.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                  Continue Learning
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LibraryLayout;