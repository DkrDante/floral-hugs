import React, { useState } from 'react';
import { Heart, Bell, ShoppingCart, ExternalLink, Plus, Filter } from 'lucide-react';

const Wishlist = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All', count: 8 },
    { id: 'on-sale', name: 'On Sale', count: 2 },
    { id: 'new', name: 'New', count: 3 }
  ];

  const wishlistItems = [
    {
      id: 1,
      title: 'Custom Star Map',
      description: 'Personalized constellation from our first date',
      price: '$39.99',
      originalPrice: '$49.99',
      image: '⭐',
      category: 'Personalized',
      status: 'on-sale',
      discount: 20,
      addedDate: '1 week ago',
      notificationEnabled: true,
      inStock: true
    },
    {
      id: 2,
      title: 'Monthly Flower Subscription',
      description: 'Fresh blooms delivered monthly',
      price: '$24.99/month',
      originalPrice: null,
      image: '🌸',
      category: 'Subscription',
      status: 'new',
      discount: 0,
      addedDate: '3 days ago',
      notificationEnabled: true,
      inStock: true
    },
    {
      id: 3,
      title: 'Couple\'s Cooking Class Kit',
      description: 'Virtual cooking experience with ingredients',
      price: '$89.99',
      originalPrice: '$119.99',
      image: '👨‍🍳',
      category: 'Experience',
      status: 'on-sale',
      discount: 25,
      addedDate: '2 weeks ago',
      notificationEnabled: false,
      inStock: true
    },
    {
      id: 4,
      title: 'Memory Scrapbook Kit',
      description: 'DIY kit for creating relationship memories',
      price: '$19.99',
      originalPrice: null,
      image: '📖',
      category: 'DIY',
      status: 'regular',
      discount: 0,
      addedDate: '1 month ago',
      notificationEnabled: true,
      inStock: false
    },
    {
      id: 5,
      title: 'Digital Love Letters Bundle',
      description: 'Pre-written romantic messages collection',
      price: '$12.99',
      originalPrice: null,
      image: '💌',
      category: 'Digital',
      status: 'new',
      discount: 0,
      addedDate: '2 days ago',
      notificationEnabled: true,
      inStock: true
    }
  ];

  const filteredItems = wishlistItems?.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'on-sale') return item?.status === 'on-sale';
    if (activeFilter === 'new') return item?.status === 'new';
    return true;
  });

  const getStatusBadge = (item) => {
    if (item?.status === 'on-sale') {
      return (
        <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">-{item?.discount}% OFF
                  </span>
      );
    }
    if (item?.status === 'new') {
      return (
        <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
          NEW
        </span>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-romantic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-secondary" />
          <h2 className="text-xl font-playfair font-bold text-card-foreground">
            Wishlist
          </h2>
        </div>
        <button className="text-secondary hover:text-secondary/80">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 bg-muted rounded-lg p-1">
        {filters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => setActiveFilter(filter?.id)}
            className={`flex-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
              activeFilter === filter?.id
                ? 'bg-background text-card-foreground shadow-sm'
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            {filter?.name}
            <span className="ml-1 opacity-70">({filter?.count})</span>
          </button>
        ))}
      </div>
      {/* Wishlist Items */}
      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {filteredItems?.map((item) => (
          <div
            key={item?.id}
            className={`border rounded-lg p-3 transition-colors ${
              item?.inStock
                ? 'border-border hover:bg-muted/50 cursor-pointer' :'border-muted bg-muted/20 opacity-60'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">
                {item?.image}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-card-foreground text-sm line-clamp-1">
                    {item?.title}
                  </h3>
                  {getStatusBadge(item)}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {item?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-card-foreground">
                      {item?.price}
                    </span>
                    {item?.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {item?.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      className={`p-1 rounded transition-colors ${
                        item?.notificationEnabled
                          ? 'text-accent' :'text-muted-foreground hover:text-accent'
                      }`}
                    >
                      <Bell className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-muted-foreground hover:text-card-foreground transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    Added {item?.addedDate}
                  </span>
                  <span className={`text-xs ${item?.inStock ? 'text-success' : 'text-destructive'}`}>
                    {item?.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="space-y-2">
        <button className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Buy Featured Item
        </button>
        
        <button className="w-full border border-secondary text-secondary py-2 rounded-lg text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
          View All Wishlists
        </button>
      </div>
      {/* Wishlist Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <h4 className="text-sm font-bold text-card-foreground">
              ${Math.round(wishlistItems?.reduce((total, item) => {
                const price = parseFloat(item?.price?.replace(/[^0-9.]/g, ''));
                return total + (isNaN(price) ? 0 : price);
              }, 0))}
            </h4>
            <p className="text-xs text-muted-foreground">Total Value</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-card-foreground">
              {wishlistItems?.filter(item => item?.notificationEnabled)?.length}
            </h4>
            <p className="text-xs text-muted-foreground">Tracking</p>
          </div>
        </div>
      </div>
      {/* Smart Notifications */}
      <div className="mt-4 bg-romantic-gradient rounded-lg p-3 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bell className="w-4 h-4 text-secondary" />
          <span className="text-sm font-semibold text-secondary">Smart Alerts</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Get notified about sales, restocks, and perfect gift timing
        </p>
      </div>
    </div>
  );
};

export default Wishlist;