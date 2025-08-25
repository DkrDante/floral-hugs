import React, { useState } from 'react';
import { Play, Clock, Eye, Star, Volume2 } from 'lucide-react';

const VideoContent = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const videoCategories = [
    { id: 'all', name: 'All Videos', count: 24 },
    { id: 'experts', name: 'Expert Insights', count: 8 },
    { id: 'couples', name: 'Couple Stories', count: 6 },
    { id: 'tutorials', name: 'How-To Guides', count: 10 }
  ];

  const videos = [
    {
      id: 1,
      title: 'Maintaining Romance Through Life Changes',
      expert: 'Dr. Jennifer Walsh',
      duration: '12:34',
      views: '24.5k',
      rating: 4.9,
      category: 'experts',
      thumbnail: '👩‍⚕️',
      description: 'Learn how to keep the spark alive during major life transitions'
    },
    {
      id: 2,
      title: 'Our 10-Year Love Story Journey',
      expert: 'Mark & Sarah Johnson',
      duration: '18:45',
      views: '31.2k',
      rating: 4.8,
      category: 'couples',
      thumbnail: '💑',
      description: 'A couple shares their secrets to lasting love and overcoming challenges'
    },
    {
      id: 3,
      title: 'Creating Romantic Dates on Any Budget',
      expert: 'Romance Academy Team',
      duration: '8:22',
      views: '45.7k',
      rating: 4.9,
      category: 'tutorials',
      thumbnail: '💕',
      description: 'Practical tips for memorable dates that won\'t break the bank'
    },
    {
      id: 4,
      title: 'The Psychology of Deep Connection',
      expert: 'Dr. Michael Rivera',
      duration: '15:11',
      views: '19.3k',
      rating: 4.7,
      category: 'experts',
      thumbnail: '🧠',
      description: 'Understanding the science behind emotional intimacy'
    },
    {
      id: 5,
      title: 'Long Distance Love: Making it Work',
      expert: 'Alex & Jamie Chen',
      duration: '22:18',
      views: '38.9k',
      rating: 4.8,
      category: 'couples',
      thumbnail: '🌍',
      description: 'How we maintained our connection across continents'
    },
    {
      id: 6,
      title: 'DIY Romantic Surprise Ideas',
      expert: 'Creative Romance Studio',
      duration: '11:45',
      views: '52.1k',
      rating: 4.9,
      category: 'tutorials',
      thumbnail: '🎨',
      description: 'Step-by-step guide to creating unforgettable romantic gestures'
    }
  ];

  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos?.filter(video => video?.category === activeCategory);

  const playVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-secondary mb-4">
            Expert Video Library
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from relationship experts and real couples sharing their wisdom
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {videoCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category?.id
                  ? 'bg-secondary text-secondary-foreground shadow-romantic'
                  : 'bg-background text-muted-foreground hover:bg-card'
              }`}
            >
              {category?.name}
              <span className="ml-2 text-xs opacity-70">({category?.count})</span>
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos?.map((video) => (
            <div
              key={video?.id}
              className="bg-card rounded-xl overflow-hidden shadow-romantic hover:shadow-romantic-lg transition-all duration-300 cursor-pointer group"
              onClick={() => playVideo(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-romantic-gradient flex items-center justify-center">
                <span className="text-4xl mb-4">{video?.thumbnail}</span>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-secondary text-secondary-foreground rounded-full p-4 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video?.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-lg font-playfair font-semibold text-card-foreground mb-2 line-clamp-2">
                  {video?.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3">
                  by {video?.expert}
                </p>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {video?.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video?.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      {video?.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video?.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-background rounded-xl overflow-hidden max-w-4xl w-full mx-6 max-h-[90vh]">
              {/* Video Player Area */}
              <div className="aspect-video bg-romantic-gradient flex items-center justify-center relative">
                <span className="text-8xl">{selectedVideo?.thumbnail}</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-secondary text-secondary-foreground rounded-full p-6">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                </div>
              </div>
              
              {/* Video Controls & Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-playfair font-bold text-card-foreground mb-2">
                      {selectedVideo?.title}
                    </h2>
                    <p className="text-muted-foreground">by {selectedVideo?.expert}</p>
                  </div>
                  
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="text-muted-foreground hover:text-card-foreground text-xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      {selectedVideo?.views} views
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      {selectedVideo?.rating}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {selectedVideo?.duration}
                    </span>
                  </div>
                  
                  <button className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                    <Volume2 className="w-4 h-4" />
                    Add to Favorites
                  </button>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {selectedVideo?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoContent;