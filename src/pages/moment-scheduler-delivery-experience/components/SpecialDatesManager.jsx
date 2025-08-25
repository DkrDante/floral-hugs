import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SpecialDatesManager = ({ specialDates, onAddSpecialDate, onRemoveSpecialDate }) => {
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [newDate, setNewDate] = useState({
    title: '',
    date: '',
    type: '',
    reminder: '1week',
    notes: ''
  });

  const dateTypeOptions = [
    { value: 'anniversary', label: 'Anniversary', icon: 'Heart' },
    { value: 'birthday', label: 'Birthday', icon: 'Cake' },
    { value: 'first_date', label: 'First Date', icon: 'Calendar' },
    { value: 'first_kiss', label: 'First Kiss', icon: 'Lips' },
    { value: 'engagement', label: 'Engagement', icon: 'Ring' },
    { value: 'valentine', label: "Valentine\'s Day", icon: 'Gift' },
    { value: 'custom', label: 'Custom Milestone', icon: 'Star' }
  ];

  const reminderOptions = [
    { value: '1day', label: '1 Day Before' },
    { value: '3days', label: '3 Days Before' },
    { value: '1week', label: '1 Week Before' },
    { value: '2weeks', label: '2 Weeks Before' },
    { value: '1month', label: '1 Month Before' }
  ];

  const handleInputChange = (field, value) => {
    setNewDate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddDate = () => {
    if (!newDate?.title || !newDate?.date || !newDate?.type) {
      return;
    }

    const dateType = dateTypeOptions?.find(type => type?.value === newDate?.type);
    const specialDate = {
      id: Date.now()?.toString(),
      title: newDate?.title,
      date: newDate?.date,
      type: newDate?.type,
      icon: dateType?.icon || 'Calendar',
      reminder: newDate?.reminder,
      notes: newDate?.notes,
      isRecurring: ['anniversary', 'birthday', 'valentine']?.includes(newDate?.type)
    };

    onAddSpecialDate(specialDate);
    setNewDate({
      title: '',
      date: '',
      type: '',
      reminder: '1week',
      notes: ''
    });
    setIsAddingDate(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Past';
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else {
      return `${diffDays} days`;
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-romantic p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-playfair text-xl font-semibold text-foreground mb-1">
            Special Dates
          </h3>
          <p className="text-sm text-muted-foreground font-inter">
            Never miss an important moment
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setIsAddingDate(true)}
          className="bg-romantic-gradient-dark hover:shadow-romantic transition-all duration-300"
        >
          Add Date
        </Button>
      </div>
      {/* Add New Date Form */}
      {isAddingDate && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-inter font-semibold text-foreground">
              Add Special Date
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAddingDate(false)}
              className="text-muted-foreground hover:text-secondary"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Title"
                type="text"
                value={newDate?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                placeholder="Our Anniversary"
                required
              />

              <Input
                label="Date"
                type="date"
                value={newDate?.date}
                onChange={(e) => handleInputChange('date', e?.target?.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Type"
                options={dateTypeOptions}
                value={newDate?.type}
                onChange={(value) => handleInputChange('type', value)}
                required
              />

              <Select
                label="Reminder"
                options={reminderOptions}
                value={newDate?.reminder}
                onChange={(value) => handleInputChange('reminder', value)}
              />
            </div>

            <Input
              label="Notes (Optional)"
              type="text"
              value={newDate?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Special memories or gift ideas..."
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddingDate(false)}
                className="text-muted-foreground hover:text-secondary border-border hover:border-secondary/30"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={handleAddDate}
                disabled={!newDate?.title || !newDate?.date || !newDate?.type}
                className="bg-romantic-gradient-dark hover:shadow-romantic transition-all duration-300"
              >
                Add Date
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Special Dates List */}
      <div className="space-y-3">
        {specialDates?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={32} className="text-muted-foreground" />
            </div>
            <h4 className="font-inter font-semibold text-foreground mb-2">
              No Special Dates Yet
            </h4>
            <p className="text-sm text-muted-foreground font-inter mb-4">
              Add important dates to never miss a romantic opportunity
            </p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsAddingDate(true)}
              className="text-muted-foreground hover:text-secondary border-border hover:border-secondary/30"
            >
              Add Your First Date
            </Button>
          </div>
        ) : (
          specialDates?.map((date) => {
            const dateType = dateTypeOptions?.find(type => type?.value === date?.type);
            const daysUntil = getDaysUntil(date?.date);
            
            return (
              <div
                key={date?.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    daysUntil === 'Today' ? 'bg-accent text-accent-foreground animate-pulse-gentle' :
                    daysUntil === 'Tomorrow' ? 'bg-warning text-warning-foreground' :
                    'bg-primary/20 text-primary'
                  }`}>
                    <Icon name={date?.icon} size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-inter font-semibold text-foreground">
                        {date?.title}
                      </h4>
                      {date?.isRecurring && (
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-gentle"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-inter">
                      {formatDate(date?.date)}
                    </p>
                    {date?.notes && (
                      <p className="text-xs text-muted-foreground font-inter mt-1">
                        {date?.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      daysUntil === 'Today' ? 'text-accent' :
                      daysUntil === 'Tomorrow'? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {daysUntil}
                    </div>
                    {daysUntil !== 'Past' && daysUntil !== 'Today' && (
                      <div className="text-xs text-muted-foreground">
                        until
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveSpecialDate(date?.id)}
                    className="text-muted-foreground hover:text-error opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SpecialDatesManager;