import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RecurringGiftSetup = ({ onSetupRecurring, onClose }) => {
  const [recurringData, setRecurringData] = useState({
    frequency: '',
    dayOfWeek: '',
    dayOfMonth: '',
    time: '19:00',
    duration: '',
    giftType: '',
    personalMessage: '',
    startDate: ''
  });

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom Interval' }
  ];

  const dayOfWeekOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const durationOptions = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: 'ongoing', label: 'Ongoing (until cancelled)' }
  ];

  const giftTypeOptions = [
    { value: 'digital_roses', label: 'Digital Rose Bouquet' },
    { value: 'love_notes', label: 'Personalized Love Notes' },
    { value: 'photo_memories', label: 'Photo Memory Cards' },
    { value: 'romantic_quotes', label: 'Daily Romantic Quotes' },
    { value: 'surprise_mix', label: 'Surprise Mix (Variety)' }
  ];

  const handleInputChange = (field, value) => {
    setRecurringData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!recurringData?.frequency || !recurringData?.giftType || !recurringData?.duration) {
      return;
    }
    onSetupRecurring(recurringData);
  };

  const presetTemplates = [
    {
      id: 'date_night',
      title: 'Weekly Date Night',
      description: 'Every Friday evening romantic surprise',
      icon: 'Calendar',
      preset: {
        frequency: 'weekly',
        dayOfWeek: 'friday',
        time: '18:00',
        giftType: 'surprise_mix',
        duration: '6months'
      }
    },
    {
      id: 'morning_love',
      title: 'Morning Love Notes',
      description: 'Daily encouragement to start their day',
      icon: 'Sun',
      preset: {
        frequency: 'weekly',
        dayOfWeek: 'monday',
        time: '08:00',
        giftType: 'love_notes',
        duration: '3months'
      }
    },
    {
      id: 'monthly_anniversary',
      title: 'Monthly Anniversary',
      description: 'Celebrate your love every month',
      icon: 'Heart',
      preset: {
        frequency: 'monthly',
        dayOfMonth: '14',
        time: '20:00',
        giftType: 'digital_roses',
        duration: '1year'
      }
    }
  ];

  const applyPreset = (preset) => {
    setRecurringData(prev => ({
      ...prev,
      ...preset,
      startDate: new Date()?.toISOString()?.split('T')?.[0]
    }));
  };

  return (
    <div className="bg-card rounded-xl shadow-romantic-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-romantic-gradient p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="Repeat" size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-playfair text-xl font-semibold text-secondary">
                Recurring Gifts
              </h3>
              <p className="text-sm text-secondary/80 font-inter">
                Set up automatic romantic gestures
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-secondary hover:bg-white/10"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Preset Templates */}
        <div className="mb-6">
          <h4 className="font-inter font-semibold text-foreground mb-3">
            Quick Setup Templates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {presetTemplates?.map((template) => (
              <div
                key={template?.id}
                onClick={() => applyPreset(template?.preset)}
                className="p-4 border border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon 
                    name={template?.icon} 
                    size={18} 
                    className="text-secondary group-hover:text-primary transition-colors duration-300" 
                  />
                  <h5 className="font-inter font-medium text-foreground text-sm">
                    {template?.title}
                  </h5>
                </div>
                <p className="text-xs text-muted-foreground font-inter">
                  {template?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Setup Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Frequency"
              options={frequencyOptions}
              value={recurringData?.frequency}
              onChange={(value) => handleInputChange('frequency', value)}
              required
            />

            <Select
              label="Gift Type"
              options={giftTypeOptions}
              value={recurringData?.giftType}
              onChange={(value) => handleInputChange('giftType', value)}
              required
            />
          </div>

          {recurringData?.frequency === 'weekly' && (
            <Select
              label="Day of Week"
              options={dayOfWeekOptions}
              value={recurringData?.dayOfWeek}
              onChange={(value) => handleInputChange('dayOfWeek', value)}
              required
            />
          )}

          {recurringData?.frequency === 'monthly' && (
            <Input
              label="Day of Month"
              type="number"
              min="1"
              max="28"
              value={recurringData?.dayOfMonth}
              onChange={(e) => handleInputChange('dayOfMonth', e?.target?.value)}
              placeholder="Enter day (1-28)"
              required
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Delivery Time"
              type="time"
              value={recurringData?.time}
              onChange={(e) => handleInputChange('time', e?.target?.value)}
              required
            />

            <Select
              label="Duration"
              options={durationOptions}
              value={recurringData?.duration}
              onChange={(value) => handleInputChange('duration', value)}
              required
            />
          </div>

          <Input
            label="Start Date"
            type="date"
            value={recurringData?.startDate}
            onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            min={new Date()?.toISOString()?.split('T')?.[0]}
            required
          />

          <Input
            label="Personal Message Template"
            type="text"
            value={recurringData?.personalMessage}
            onChange={(e) => handleInputChange('personalMessage', e?.target?.value)}
            placeholder="A message that will be included with each gift..."
            description="This message will be sent with every recurring gift"
          />
        </div>

        {/* Summary Preview */}
        {recurringData?.frequency && recurringData?.giftType && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h5 className="font-inter font-semibold text-foreground mb-2 flex items-center">
              <Icon name="Eye" size={16} className="mr-2 text-secondary" />
              Setup Summary
            </h5>
            <div className="text-sm text-muted-foreground font-inter space-y-1">
              <p>
                <strong>Frequency:</strong> {frequencyOptions?.find(opt => opt?.value === recurringData?.frequency)?.label}
                {recurringData?.dayOfWeek && ` on ${dayOfWeekOptions?.find(opt => opt?.value === recurringData?.dayOfWeek)?.label}s`}
                {recurringData?.dayOfMonth && ` on the ${recurringData?.dayOfMonth}${recurringData?.dayOfMonth?.endsWith('1') ? 'st' : recurringData?.dayOfMonth?.endsWith('2') ? 'nd' : recurringData?.dayOfMonth?.endsWith('3') ? 'rd' : 'th'} of each month`}
              </p>
              <p><strong>Time:</strong> {recurringData?.time}</p>
              <p><strong>Gift:</strong> {giftTypeOptions?.find(opt => opt?.value === recurringData?.giftType)?.label}</p>
              <p><strong>Duration:</strong> {durationOptions?.find(opt => opt?.value === recurringData?.duration)?.label}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            className="text-muted-foreground hover:text-secondary border-border hover:border-secondary/30"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            fullWidth
            iconName="Repeat"
            iconPosition="left"
            onClick={handleSubmit}
            disabled={!recurringData?.frequency || !recurringData?.giftType || !recurringData?.duration}
            className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300"
          >
            Setup Recurring Gifts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecurringGiftSetup;