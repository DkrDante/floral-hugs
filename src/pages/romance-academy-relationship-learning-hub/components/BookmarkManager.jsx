import React, { useState } from 'react';
import { Bookmark, Search, Filter, Tag, Clock, ExternalLink } from 'lucide-react';

const BookmarkManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const bookmarkCategories = [
    { id: 'all', name: 'All Bookmarks', count: 28 },
    { id: 'articles', name: 'Articles', count: 12 },
    { id: 'videos', name: 'Videos', count: 8 },
    { id: 'tips', name: 'Quick Tips', count: 8 }
  ];

  const bookmarks = [
    {
      id: 1,
      title: '10 Daily Habits That Strengthen Relationships',
      type: 'article',
      category: 'Daily Practices',
      readTime: '6 min read',
      bookmarkedDate: '2 days ago',
      tags: ['habits', 'daily-routine', 'connection'],
      excerpt: 'Small gestures that make a big difference in maintaining closeness...'
    },
    {
      id: 2,
      title: 'Creating Romantic Atmosphere on Budget',
      type: 'video',
      category: 'Romance Tips',
      readTime: '12:45',
      bookmarkedDate: '5 days ago',
      tags: ['budget', 'romance', 'creativity'],
      excerpt: 'Learn how to set the perfect mood without spending a fortune...'
    },
    {
      id: 3,
      title: 'Understanding Love Languages in Action',
      type: 'article',
      category: 'Communication',
      readTime: '8 min read',
      bookmarkedDate: '1 week ago',
      tags: ['love-languages', 'communication', 'understanding'],
      excerpt: 'Practical examples of how to speak your partner\'s love language...'
    },
    {
      id: 4,
      title: 'Send a "Thinking of You" Message',
      type: 'tip',
      category: 'Quick Actions',
      readTime: '1 min',
      bookmarkedDate: '3 days ago',
      tags: ['messages', 'thoughtfulness', 'quick-win'],
      excerpt: 'A simple message template that always brings a smile...'
    },
    {
      id: 5,
      title: 'Planning the Perfect Anniversary',
      type: 'article',
      category: 'Special Occasions',
      readTime: '10 min read',
      bookmarkedDate: '1 week ago',
      tags: ['anniversary', 'planning', 'celebration'],
      excerpt: 'Step-by-step guide to creating unforgettable milestone moments...'
    },
    {
      id: 6,
      title: 'Long Distance Date Night Ideas',
      type: 'video',
      category: 'Long Distance',
      readTime: '15:22',
      bookmarkedDate: '4 days ago',
      tags: ['long-distance', 'date-night', 'virtual'],
      excerpt: 'Creative ways to stay connected when miles apart...'
    }
  ];

  const filteredBookmarks = bookmarks?.filter(bookmark => {
    const matchesSearch = bookmark?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         bookmark?.excerpt?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         bookmark?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'articles' && bookmark?.type === 'article') ||
                           (selectedCategory === 'videos' && bookmark?.type === 'video') ||
                           (selectedCategory === 'tips' && bookmark?.type === 'tip');
    
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'tip':
        return '💡';
      default:
        return '📖';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'tip':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-secondary mb-4">
            Your Bookmarked Content
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Easily access your saved articles, tips, and videos for quick reference
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Controls */}
          <div className="bg-background rounded-xl p-6 shadow-romantic mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search bookmarks, tags, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                {bookmarkCategories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => setSelectedCategory(category?.id)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category?.id
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {category?.name}
                    <span className="ml-2 text-xs opacity-70">({category?.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bookmarks Grid */}
          {filteredBookmarks?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookmarks?.map((bookmark) => (
                <div
                  key={bookmark?.id}
                  className="bg-background rounded-xl p-6 shadow-romantic hover:shadow-romantic-lg transition-all duration-300 cursor-pointer group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(bookmark?.type)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(bookmark?.type)}`}>
                        {bookmark?.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-secondary fill-current" />
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-playfair font-semibold text-card-foreground mb-2 line-clamp-2">
                    {bookmark?.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {bookmark?.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {bookmark?.tags?.slice(0, 3)?.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded flex items-center gap-1"
                      >
                        <Tag className="w-2 h-2" />
                        {tag}
                      </span>
                    ))}
                    {bookmark?.tags?.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{bookmark?.tags?.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {bookmark?.readTime}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Saved {bookmark?.bookmarkedDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-xl font-playfair font-semibold text-card-foreground mb-2">
                No bookmarks found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse content to start bookmarking
              </p>
              <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium">
                Explore Content
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 bg-romantic-gradient rounded-xl p-6 text-center">
            <h3 className="text-xl font-playfair font-bold text-secondary mb-4">
              Quick Bookmark Actions
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-background text-card-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted transition-colors">
                Export Bookmarks
              </button>
              <button className="bg-background text-card-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted transition-colors">
                Create Collection
              </button>
              <button className="bg-background text-card-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted transition-colors">
                Share Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookmarkManager;