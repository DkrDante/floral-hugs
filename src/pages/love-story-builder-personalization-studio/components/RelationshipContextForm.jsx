import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const RelationshipContextForm = ({ onContextUpdate, contextData }) => {
  const [formData, setFormData] = useState({
    relationshipDuration: contextData?.relationshipDuration || '',
    relationshipType: contextData?.relationshipType || '',
    partnerName: contextData?.partnerName || '',
    loveLanguage: contextData?.loveLanguage || '',
    specialMemory: contextData?.specialMemory || '',
    favoriteColor: contextData?.favoriteColor || '',
    ...contextData
  });

  const relationshipTypes = [
    { value: 'dating', label: 'Dating' },
    { value: 'engaged', label: 'Engaged' },
    { value: 'married', label: 'Married' },
    { value: 'long-distance', label: 'Long Distance' },
    { value: 'anniversary', label: 'Anniversary Celebration' }
  ];

  const loveLanguages = [
    { value: 'words', label: 'Words of Affirmation' },
    { value: 'quality-time', label: 'Quality Time' },
    { value: 'physical-touch', label: 'Physical Touch' },
    { value: 'acts-service', label: 'Acts of Service' },
    { value: 'gifts', label: 'Receiving Gifts' }
  ];

  const colorOptions = [
    { value: 'rose-gold', label: 'Rose Gold' },
    { value: 'lavender', label: 'Lavender Dreams' },
    { value: 'sunset', label: 'Sunset Romance' },
    { value: 'garden', label: 'Garden Party' },
    { value: 'ocean', label: 'Ocean Breeze' },
    { value: 'autumn', label: 'Autumn Warmth' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onContextUpdate(updatedData);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center">
          <Icon name="Heart" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-playfair text-xl font-semibold text-foreground">Tell Us Your Love Story</h3>
          <p className="text-sm text-muted-foreground">Help us personalize your perfect gift</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Partner's Name"
          type="text"
          placeholder="Enter your partner's name"
          value={formData?.partnerName}
          onChange={(e) => handleInputChange('partnerName', e?.target?.value)}
          className="mb-4"
        />

        <Input
          label="How long have you been together?"
          type="text"
          placeholder="e.g., 2 years, 6 months"
          value={formData?.relationshipDuration}
          onChange={(e) => handleInputChange('relationshipDuration', e?.target?.value)}
          className="mb-4"
        />

        <Select
          label="Relationship Status"
          options={relationshipTypes}
          value={formData?.relationshipType}
          onChange={(value) => handleInputChange('relationshipType', value)}
          placeholder="Select your relationship status"
          className="mb-4"
        />

        <Select
          label="Partner's Love Language"
          options={loveLanguages}
          value={formData?.loveLanguage}
          onChange={(value) => handleInputChange('loveLanguage', value)}
          placeholder="How does your partner prefer to receive love?"
          className="mb-4"
        />

        <Select
          label="Favorite Color Theme"
          options={colorOptions}
          value={formData?.favoriteColor}
          onChange={(value) => handleInputChange('favoriteColor', value)}
          placeholder="Choose a color palette"
          className="mb-4"
        />

        <div className="md:col-span-2">
          <Input
            label="Special Memory Together"
            type="text"
            placeholder="Share a beautiful memory you both cherish..."
            value={formData?.specialMemory}
            onChange={(e) => handleInputChange('specialMemory', e?.target?.value)}
            description="This will help us suggest personalized elements for your gift"
            className="mb-4"
          />
        </div>
      </div>
      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-secondary mt-0.5" />
          <div>
            <h4 className="font-inter font-medium text-foreground mb-1">Personalization Tip</h4>
            <p className="text-sm text-muted-foreground">
              The more details you share, the more magical we can make your gift. Every piece of information helps us create something uniquely yours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipContextForm;