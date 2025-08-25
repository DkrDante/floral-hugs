import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import GiftCard from './components/GiftCard';
import FilterSidebar from './components/FilterSidebar';
import QuickPreviewModal from './components/QuickPreviewModal';
import SurpriseMeButton from './components/SurpriseMeButton';
import GiftGalleryHeader from './components/GiftGalleryHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GiftGalleryInteractiveCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);

  // Mock gift data
  const mockGifts = [
    {
      id: 1,
      title: "Blooming Rose Garden",
      description: "A beautiful animated rose garden that blooms with your personalized message, perfect for expressing deep romantic feelings.",
      fullDescription: `Transform your love into a breathtaking digital garden where roses bloom in sequence, each petal revealing a word of your heartfelt message. This premium experience includes ambient nature sounds, customizable rose colors, and the ability to add your own voice narration. Perfect for anniversaries, proposals, or any moment when words alone aren't enough.`,
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop",
      previewImages: [
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop"
      ],
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 234,
      category: 'premium',categoryLabel: 'Premium',categoryIcon: 'Crown',badge: 'Popular',
      features: ['Animated Blooming', 'Voice Message', 'Custom Colors', 'HD Quality', 'Instant Delivery', 'Mobile Optimized'],
      deliveryTime: 'Instant',personalizationLevel: 'Premium'
    },
    {
      id: 2,
      title: "Love Letter Unfold",
      description: "An elegant digital love letter that unfolds with beautiful calligraphy, revealing your heartfelt words in a romantic animation.",
      fullDescription: `Experience the timeless romance of handwritten letters in a stunning digital format. Your message appears in elegant calligraphy as the letter unfolds, accompanied by soft romantic music and subtle paper texture animations. Choose from vintage, modern, or floral themes to match your relationship's unique style.`,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
      previewImages: [
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop"
      ],
      price: 19.99,
      rating: 4.9,
      reviews: 189,
      category: 'personalized',
      categoryLabel: 'Personalized',
      categoryIcon: 'PenTool',
      badge: 'New',
      features: ['Calligraphy Animation', 'Multiple Themes', 'Background Music', 'Custom Fonts', 'Print Option'],
      deliveryTime: 'Instant',
      personalizationLevel: 'Custom'
    },
    {
      id: 3,
      title: "Surprise Gift Box",
      description: "A magical surprise box that opens to reveal multiple mini-gifts, photos, and messages in a delightful sequence.",
      fullDescription: `Create the ultimate surprise experience with our interactive gift box. Layer multiple surprises including photos, mini-animations, voice messages, and sweet notes. Each element is revealed in a carefully choreographed sequence that builds excitement and joy. Perfect for birthdays, anniversaries, or just because moments.`,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      previewImages: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop"
      ],
      price: 24.99,
      rating: 4.7,
      reviews: 156,
      category: 'basic',
      categoryLabel: 'Interactive',
      categoryIcon: 'Gift',
      features: ['Multi-layer Surprises', 'Photo Upload', 'Voice Messages', 'Custom Timing', 'Share Options'],
      deliveryTime: 'Instant',
      personalizationLevel: 'Custom'
    },
    {
      id: 4,
      title: "Dancing Hearts",
      description: "Playful animated hearts that dance to your chosen music while displaying sweet messages and memories.",
      fullDescription: `Bring joy and playfulness to your relationship with dancing hearts that move to the rhythm of your favorite song. Upload your special song, add photos from your relationship, and watch as hearts of different sizes and colors create a mesmerizing dance while your memories float by. Perfect for couples who love to have fun together.`,
      image: "https://images.unsplash.com/photo-1518621012118-1d2cc6b3d49a?w=400&h=300&fit=crop",
      previewImages: [
        "https://images.unsplash.com/photo-1518621012118-1d2cc6b3d49a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=600&fit=crop"
      ],
      price: 16.99,
      rating: 4.6,
      reviews: 203,
      category: 'basic',
      categoryLabel: 'Playful',
      categoryIcon: 'Music',
      badge: 'Trending',
      features: ['Music Sync', 'Photo Memories', 'Color Customization', 'Rhythm Animation', 'Social Share'],
      deliveryTime: 'Instant',
      personalizationLevel: 'Basic'
    },
    {
      id: 5,
      title: "Starry Night Wishes",
      description: "A romantic starry night sky where shooting stars carry your wishes and dreams across the cosmos.",
      fullDescription: `Create a magical night under the stars where each shooting star carries one of your wishes or dreams for your relationship. This enchanting experience features a realistic night sky with twinkling stars, gentle meteor showers, and your personalized messages appearing as constellations. Includes ambient night sounds and the option to schedule delivery for a special evening.`,
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop",
      previewImages: [
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop"
      ],
      price: 22.99,
      rating: 4.8,
      reviews: 167,
      category: 'premium',
      categoryLabel: 'Premium',
      categoryIcon: 'Star',
      features: ['Realistic Sky', 'Shooting Stars', 'Constellation Messages', 'Ambient Sounds', 'Scheduled Delivery'],
      deliveryTime: 'Instant or Scheduled',
      personalizationLevel: 'Premium'
    },
    {
      id: 6,
      title: "Memory Lane Journey",
      description: "A beautiful timeline of your relationship milestones with photos, dates, and special moments animated in sequence.",
      fullDescription: `Take a nostalgic journey through your relationship with this interactive timeline experience. Upload photos from different stages of your relationship, add important dates and milestones, and watch as your love story unfolds in a beautiful animated sequence. Perfect for anniversaries or relationship celebrations.`,
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop",
      previewImages: [
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop"
      ],
      price: 27.99,
      originalPrice: 34.99,
      rating: 4.9,
      reviews: 145,
      category: 'personalized',
      categoryLabel: 'Personalized',
      categoryIcon: 'Clock',
      features: ['Timeline Animation', 'Photo Upload', 'Milestone Markers', 'Custom Music', 'Print Timeline'],
      deliveryTime: 'Instant',
      personalizationLevel: 'Custom'
    },
    {
      id: 7,
      title: "Butterfly Kisses",
      description: "Delicate butterflies carry your love messages across a beautiful garden setting with gentle animations.",
      fullDescription: `Watch as colorful butterflies gracefully carry your love messages across a serene garden landscape. Each butterfly represents a different aspect of your love, creating a peaceful and romantic experience. Customize butterfly colors, garden themes, and add your own background music for a truly personal touch.`,
      image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop",
      previewImages: [
        "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop"
      ],
      price: 18.99,
      rating: 4.7,
      reviews: 198,
      category: 'basic',
      categoryLabel: 'Gentle',
      categoryIcon: 'Flower',
      features: ['Butterfly Animation', 'Garden Themes', 'Message Delivery', 'Color Customization', 'Peaceful Music'],
      deliveryTime: 'Instant',
      personalizationLevel: 'Basic'
    },
    {
      id: 8,
      title: "Candlelight Dinner",
      description: "A romantic virtual candlelight dinner experience with ambient sounds and personalized menu of love.",
      fullDescription: `Create an intimate virtual dining experience complete with flickering candles, soft jazz music, and a personalized menu featuring your favorite memories instead of food items. Perfect for long-distance couples or when you want to create a special moment at home. Includes wine pairing suggestions and conversation starters.`,
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      previewImages: [
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop"
      ],
      price: 25.99,
      rating: 4.8,
      reviews: 134,
      category: 'premium',
      categoryLabel: 'Premium',
      categoryIcon: 'Flame',
      features: ['Candlelight Ambiance', 'Jazz Music', 'Memory Menu', 'Wine Pairings', 'Conversation Starters'],
      deliveryTime: 'Instant',
      personalizationLevel: 'Premium'
    }
  ];

  const [filteredGifts, setFilteredGifts] = useState(mockGifts);

  // Filter and sort gifts
  useEffect(() => {
    let filtered = [...mockGifts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(gift =>
        gift?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        gift?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        gift?.features?.some(feature => feature?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply category filters
    Object.keys(filters)?.forEach(category => {
      if (filters?.[category] && filters?.[category]?.length > 0) {
        // This is a simplified filter - in a real app, you'd have more sophisticated filtering
        filtered = filtered?.filter(gift => {
          if (category === 'relationshipStage' || category === 'occasion' || category === 'emotionalTone') {
            return true; // Mock: assume all gifts match all relationship stages/occasions/tones
          }
          if (category === 'deliveryTime') {
            return filters?.[category]?.includes('instant') ? gift?.deliveryTime?.includes('Instant') : true;
          }
          if (category === 'personalizationLevel') {
            return filters?.[category]?.includes(gift?.personalizationLevel?.toLowerCase());
          }
          return true;
        });
      }
    });

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b?.id - a?.id; // Mock: newer items have higher IDs
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'rating':
          return b?.rating - a?.rating;
        case 'popular':
        default:
          return b?.reviews - a?.reviews;
      }
    });

    setFilteredGifts(filtered);
  }, [searchQuery, filters, sortBy]);

  const handleQuickPreview = (gift) => {
    setSelectedGift(gift);
    setIsPreviewModalOpen(true);
  };

  const handleAddToCart = (gift) => {
    setCart(prev => [...prev, gift]);
    // Show success notification (mock)
    console.log(`Added ${gift?.title} to cart`);
  };

  const handleSurpriseMe = async () => {
    setIsLoading(true);
    // Mock AI suggestion delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Select a random gift
    const randomGift = mockGifts?.[Math.floor(Math.random() * mockGifts?.length)];
    handleQuickPreview(randomGift);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <GiftGalleryHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onToggleFilters={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
          totalResults={filteredGifts?.length}
        />

        <div className="flex">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFilterSidebarOpen}
            onToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
          />

          {/* Main Content */}
          <main className="flex-1 lg:ml-80 p-6">
            {filteredGifts?.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-foreground">
                    No gifts found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find the perfect romantic gift.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({});
                    }}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6' :'space-y-6'
              }`}>
                {filteredGifts?.map((gift) => (
                  <GiftCard
                    key={gift?.id}
                    gift={gift}
                    onQuickPreview={handleQuickPreview}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredGifts?.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Plus"
                  iconPosition="left"
                  className="border-secondary/30 text-secondary hover:bg-secondary/10"
                >
                  Load More Gifts
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
      {/* Floating Components */}
      <SurpriseMeButton
        onSurpriseMe={handleSurpriseMe}
        isLoading={isLoading}
      />
      <QuickPreviewModal
        gift={selectedGift}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
      {/* Floating Hearts Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/6 w-4 h-4 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent/15 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '6s' }} />
        <div className="absolute bottom-1/3 right-1/6 w-3.5 h-3.5 bg-primary/8 rounded-full animate-float" style={{ animationDelay: '9s' }} />
      </div>
    </div>
  );
};

export default GiftGalleryInteractiveCatalog;