import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');

  const relationshipStages = [
    { id: 'new-love', label: 'New Love', icon: 'Heart', count: 45 },
    { id: 'established', label: 'Established Couple', icon: 'Users', count: 78 },
    { id: 'long-distance', label: 'Long Distance', icon: 'MapPin', count: 32 },
    { id: 'married', label: 'Married', icon: 'Ring', count: 56 }
  ];

  const occasions = [
    { id: 'anniversary', label: 'Anniversary', icon: 'Calendar', count: 34 },
    { id: 'just-because', label: 'Just Because', icon: 'Smile', count: 89 },
    { id: 'apology', label: 'Apology', icon: 'Heart', count: 23 },
    { id: 'birthday', label: 'Birthday', icon: 'Gift', count: 67 },
    { id: 'valentine', label: "Valentine\'s Day", icon: 'Heart', count: 45 }
  ];

  const emotionalTones = [
    { id: 'playful', label: 'Playful', icon: 'Laugh', count: 56 },
    { id: 'passionate', label: 'Passionate', icon: 'Flame', count: 43 },
    { id: 'comforting', label: 'Comforting', icon: 'Shield', count: 38 },
    { id: 'romantic', label: 'Romantic', icon: 'Rose', count: 72 },
    { id: 'sweet', label: 'Sweet', icon: 'Cookie', count: 61 }
  ];

  const deliveryTimes = [
    { id: 'instant', label: 'Instant Delivery', icon: 'Zap', count: 124 },
    { id: 'scheduled', label: 'Scheduled', icon: 'Clock', count: 89 },
    { id: 'surprise', label: 'Surprise Timing', icon: 'Gift', count: 45 }
  ];

  const personalizationLevels = [
    { id: 'basic', label: 'Basic', icon: 'Edit', count: 67 },
    { id: 'custom', label: 'Custom', icon: 'Palette', count: 89 },
    { id: 'premium', label: 'Premium', icon: 'Crown', count: 34 }
  ];

  const handleFilterChange = (category, value, checked) => {
    const currentFilters = filters?.[category] || [];
    const newFilters = checked 
      ? [...currentFilters, value]
      : currentFilters?.filter(item => item !== value);
    
    onFiltersChange({
      ...filters,
      [category]: newFilters
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    setPriceRange([0, 200]);
    setSearchQuery('');
  };

  const FilterSection = ({ title, items, category, icon }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon name={icon} size={16} className="text-secondary" />
        <h3 className="font-inter font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2 pl-6">
        {items?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between">
            <Checkbox
              label={
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={14} className="text-muted-foreground" />
                  <span className="text-sm">{item?.label}</span>
                </div>
              }
              checked={filters?.[category]?.includes(item?.id) || false}
              onChange={(e) => handleFilterChange(category, item?.id, e?.target?.checked)}
            />
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {item?.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-card border-r border-border z-50 lg:z-auto transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-secondary" />
              <h2 className="font-playfair text-xl font-semibold text-foreground">Filters</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="lg:hidden text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Smart Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Smart Search</label>
            <Input
              type="search"
              placeholder="e.g., 'something sweet for our anniversary'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Try natural language like "romantic gift for long distance"
            </p>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-secondary" />
              <h3 className="font-inter font-semibold text-foreground">Price Range</h3>
            </div>
            <div className="space-y-3 pl-6">
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange?.[0]}
                  onChange={(e) => setPriceRange([parseInt(e?.target?.value) || 0, priceRange?.[1]])}
                  className="w-20"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange?.[1]}
                  onChange={(e) => setPriceRange([priceRange?.[0], parseInt(e?.target?.value) || 200])}
                  className="w-20"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Current: ${priceRange?.[0]} - ${priceRange?.[1]}
              </div>
            </div>
          </div>

          {/* Relationship Stage */}
          <FilterSection
            title="Relationship Stage"
            items={relationshipStages}
            category="relationshipStage"
            icon="Users"
          />

          {/* Occasion */}
          <FilterSection
            title="Occasion"
            items={occasions}
            category="occasion"
            icon="Calendar"
          />

          {/* Emotional Tone */}
          <FilterSection
            title="Emotional Tone"
            items={emotionalTones}
            category="emotionalTone"
            icon="Heart"
          />

          {/* Delivery Time */}
          <FilterSection
            title="Delivery Time"
            items={deliveryTimes}
            category="deliveryTime"
            icon="Clock"
          />

          {/* Personalization Level */}
          <FilterSection
            title="Personalization"
            items={personalizationLevels}
            category="personalizationLevel"
            icon="Palette"
          />

          {/* Apply Filters Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              iconName="Search"
              iconPosition="left"
              className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;