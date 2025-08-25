import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ColorPalette = ({ colorData, onColorUpdate }) => {
  const [selectedPalette, setSelectedPalette] = useState(colorData?.palette || 'sunset-romance');
  const [customColors, setCustomColors] = useState(colorData?.customColors || {
    primary: '#F8BBD9',
    secondary: '#8B1538',
    accent: '#FFD700'
  });
  const [showCustomizer, setShowCustomizer] = useState(false);

  const predefinedPalettes = [
    {
      id: 'sunset-romance',
      name: 'Sunset Romance',
      description: 'Warm oranges and soft pinks',
      colors: {
        primary: '#FF6B6B',
        secondary: '#FF8E53',
        accent: '#FFD93D',
        background: '#FFF8F0'
      }
    },
    {
      id: 'garden-party',
      name: 'Garden Party',
      description: 'Fresh greens and floral tones',
      colors: {
        primary: '#9CAF88',
        secondary: '#6B8E5A',
        accent: '#F8BBD9',
        background: '#F0F8F0'
      }
    },
    {
      id: 'ocean-breeze',
      name: 'Ocean Breeze',
      description: 'Calming blues and seafoam',
      colors: {
        primary: '#4ECDC4',
        secondary: '#44A08D',
        accent: '#96CEB4',
        background: '#F0F8FF'
      }
    },
    {
      id: 'lavender-dreams',
      name: 'Lavender Dreams',
      description: 'Soft purples and gentle mauves',
      colors: {
        primary: '#E6E6FA',
        secondary: '#9370DB',
        accent: '#DDA0DD',
        background: '#FAF0E6'
      }
    },
    {
      id: 'autumn-warmth',
      name: 'Autumn Warmth',
      description: 'Rich browns and golden hues',
      colors: {
        primary: '#D2691E',
        secondary: '#8B4513',
        accent: '#DAA520',
        background: '#FDF5E6'
      }
    },
    {
      id: 'midnight-elegance',
      name: 'Midnight Elegance',
      description: 'Deep blues and silver accents',
      colors: {
        primary: '#191970',
        secondary: '#4169E1',
        accent: '#C0C0C0',
        background: '#F8F8FF'
      }
    }
  ];

  const handlePaletteSelect = (palette) => {
    setSelectedPalette(palette?.id);
    onColorUpdate({
      palette: palette?.id,
      colors: palette?.colors,
      customColors: customColors
    });
  };

  const handleCustomColorChange = (colorType, color) => {
    const updatedCustomColors = {
      ...customColors,
      [colorType]: color
    };
    setCustomColors(updatedCustomColors);
    
    if (selectedPalette === 'custom') {
      onColorUpdate({
        palette: 'custom',
        colors: updatedCustomColors,
        customColors: updatedCustomColors
      });
    }
  };

  const applyCustomPalette = () => {
    setSelectedPalette('custom');
    onColorUpdate({
      palette: 'custom',
      colors: customColors,
      customColors: customColors
    });
  };

  const getCurrentColors = () => {
    if (selectedPalette === 'custom') {
      return customColors;
    }
    const palette = predefinedPalettes?.find(p => p?.id === selectedPalette);
    return palette ? palette?.colors : predefinedPalettes?.[0]?.colors;
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center">
          <Icon name="Palette" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-playfair text-xl font-semibold text-foreground">Color Palette</h3>
          <p className="text-sm text-muted-foreground">Choose colors that represent your love</p>
        </div>
      </div>
      {/* Predefined Palettes */}
      <div className="mb-6">
        <h4 className="font-inter font-medium text-foreground mb-4">Romantic Themes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {predefinedPalettes?.map((palette) => (
            <button
              key={palette?.id}
              onClick={() => handlePaletteSelect(palette)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left group hover:shadow-romantic ${
                selectedPalette === palette?.id
                  ? 'border-secondary bg-secondary/5' :'border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex space-x-1">
                  {Object.values(palette?.colors)?.slice(0, 4)?.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                {selectedPalette === palette?.id && (
                  <Icon name="Check" size={16} className="text-secondary" />
                )}
              </div>
              <h5 className="font-inter font-medium text-foreground group-hover:text-secondary transition-colors">
                {palette?.name}
              </h5>
              <p className="text-xs text-muted-foreground mt-1">{palette?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Color Preview */}
      <div className="mb-6">
        <h4 className="font-inter font-medium text-foreground mb-4">Preview</h4>
        <div 
          className="p-6 rounded-lg border border-border"
          style={{ 
            background: `linear-gradient(135deg, ${getCurrentColors()?.primary} 0%, ${getCurrentColors()?.background} 50%, ${getCurrentColors()?.secondary} 100%)` 
          }}
        >
          <div className="text-center">
            <h5 
              className="font-playfair text-2xl font-semibold mb-2"
              style={{ color: getCurrentColors()?.secondary }}
            >
              Your Love Story
            </h5>
            <p 
              className="font-inter text-sm mb-4"
              style={{ color: getCurrentColors()?.secondary }}
            >
              This is how your gift will look with the selected colors
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getCurrentColors()?.accent }}
              >
                <Icon name="Heart" size={16} style={{ color: getCurrentColors()?.secondary }} />
              </div>
              <span 
                className="font-dancing text-lg"
                style={{ color: getCurrentColors()?.accent }}
              >
                Made with Love
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Color Picker */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-inter font-medium text-foreground">Custom Colors</h4>
          <Button
            variant="ghost"
            size="sm"
            iconName={showCustomizer ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setShowCustomizer(!showCustomizer)}
            className="text-muted-foreground hover:text-secondary"
          >
            {showCustomizer ? 'Hide' : 'Show'} Customizer
          </Button>
        </div>

        {showCustomizer && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={customColors?.primary}
                    onChange={(e) => handleCustomColorChange('primary', e?.target?.value)}
                    className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors?.primary}
                    onChange={(e) => handleCustomColorChange('primary', e?.target?.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                    placeholder="#F8BBD9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={customColors?.secondary}
                    onChange={(e) => handleCustomColorChange('secondary', e?.target?.value)}
                    className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors?.secondary}
                    onChange={(e) => handleCustomColorChange('secondary', e?.target?.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                    placeholder="#8B1538"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Accent Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={customColors?.accent}
                    onChange={(e) => handleCustomColorChange('accent', e?.target?.value)}
                    className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors?.accent}
                    onChange={(e) => handleCustomColorChange('accent', e?.target?.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                    placeholder="#FFD700"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button
                variant="default"
                iconName="Palette"
                iconPosition="left"
                onClick={applyCustomPalette}
                className="bg-romantic-gradient-dark"
              >
                Apply Custom Colors
              </Button>
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => {
                  setCustomColors({
                    primary: '#F8BBD9',
                    secondary: '#8B1538',
                    accent: '#FFD700'
                  });
                }}
                className="hover:bg-primary/10"
              >
                Reset to Default
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Color Psychology Tips */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-inter font-medium text-foreground mb-1">Color Psychology</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Red/Pink:</strong> Passion, love, and romance</li>
              <li>• <strong>Blue:</strong> Trust, calm, and stability</li>
              <li>• <strong>Green:</strong> Growth, harmony, and nature</li>
              <li>• <strong>Purple:</strong> Luxury, creativity, and mystery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;