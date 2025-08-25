import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GiftGalleryHeader = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onToggleFilters,
  totalResults 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className="bg-card border-b border-border sticky top-16 z-30 shadow-romantic">
      <div className="px-6 py-4 space-y-4">
        {/* Top Row - Title and Stats */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-playfair text-3xl font-bold text-foreground">
              Gift Gallery
            </h1>
            <p className="text-muted-foreground">
              Discover {totalResults?.toLocaleString()} romantic digital gifts
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            onClick={onToggleFilters}
            iconName="Filter"
            iconPosition="left"
            className="lg:hidden border-secondary/30 text-secondary hover:bg-secondary/10"
          >
            Filters
          </Button>
        </div>

        {/* Search and Controls Row */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Smart Search */}
          <div className="flex-1 relative">
            <div className={`relative transition-all duration-300 ${
              isSearchFocused ? 'transform scale-[1.02]' : ''
            }`}>
              <Input
                type="search"
                placeholder="Try 'romantic gift for anniversary' or 'something playful'"
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-12 pr-4 h-12 text-base bg-background border-border focus:border-secondary/50 focus:ring-secondary/20"
              />
              <Icon 
                name="Search" 
                size={20} 
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  isSearchFocused ? 'text-secondary' : 'text-muted-foreground'
                }`} 
              />
              
              {/* Search Suggestions */}
              {isSearchFocused && searchQuery?.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-romantic-lg z-10">
                  <div className="p-4 space-y-2">
                    <p className="text-sm font-medium text-foreground mb-3">Popular Searches</p>
                    {[
                      'anniversary gifts',
                      'long distance love',
                      'just because surprises',
                      'romantic apology',
                      'birthday love notes'
                    ]?.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => onSearchChange(suggestion)}
                        className="flex items-center space-x-2 w-full text-left px-2 py-1 rounded hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name="Search" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="relative group">
              <Button
                variant="outline"
                iconName="ArrowUpDown"
                iconPosition="left"
                className="border-border hover:border-secondary/30 hover:text-secondary"
              >
                <span className="hidden sm:inline">
                  {sortOptions?.find(opt => opt?.value === sortBy)?.label || 'Sort'}
                </span>
                <span className="sm:hidden">Sort</span>
                <Icon name="ChevronDown" size={16} className="ml-2" />
              </Button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-romantic-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                <div className="p-2 space-y-1">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => onSortChange(option?.value)}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                        sortBy === option?.value
                          ? 'bg-secondary/10 text-secondary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon name={option?.icon} size={16} />
                      <span>{option?.label}</span>
                      {sortBy === option?.value && (
                        <Icon name="Check" size={14} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              {viewModes?.map((mode) => (
                <Button
                  key={mode?.value}
                  variant={viewMode === mode?.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange(mode?.value)}
                  className={`${
                    viewMode === mode?.value 
                      ? 'bg-background shadow-sm text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={mode?.icon} size={16} />
                  <span className="sr-only">{mode?.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {searchQuery && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Searching for:</span>
            <div className="flex items-center space-x-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full">
              <span className="text-sm font-medium">"{searchQuery}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="hover:bg-secondary/20 rounded-full p-1 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-8 right-1/3 w-1.5 h-1.5 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-4 right-1/4 w-1 h-1 bg-secondary/15 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
};

export default GiftGalleryHeader;