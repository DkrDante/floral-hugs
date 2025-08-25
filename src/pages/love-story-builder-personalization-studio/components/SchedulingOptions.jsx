import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SchedulingOptions = ({ schedulingData, onSchedulingUpdate }) => {
  const [deliveryType, setDeliveryType] = useState(schedulingData?.deliveryType || 'immediate');
  const [scheduledDate, setScheduledDate] = useState(schedulingData?.scheduledDate || '');
  const [scheduledTime, setScheduledTime] = useState(schedulingData?.scheduledTime || '');
  const [timezone, setTimezone] = useState(schedulingData?.timezone || 'America/New_York');
  const [recurringEnabled, setRecurringEnabled] = useState(schedulingData?.recurringEnabled || false);
  const [recurringPattern, setRecurringPattern] = useState(schedulingData?.recurringPattern || 'weekly');
  const [surpriseSequence, setSurpriseSequence] = useState(schedulingData?.surpriseSequence || []);
  const [reminderSettings, setReminderSettings] = useState(schedulingData?.reminderSettings || {
    enabled: true,
    beforeDelivery: 24,
    afterDelivery: false
  });

  const deliveryTypeOptions = [
    { value: 'immediate', label: 'Send Immediately' },
    { value: 'scheduled', label: 'Schedule for Later' },
    { value: 'surprise', label: 'Surprise Sequence' },
    { value: 'recurring', label: 'Recurring Delivery' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' }
  ];

  const recurringPatternOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom Schedule' }
  ];

  const reminderOptions = [
    { value: 1, label: '1 hour before' },
    { value: 6, label: '6 hours before' },
    { value: 24, label: '1 day before' },
    { value: 48, label: '2 days before' },
    { value: 168, label: '1 week before' }
  ];

  const updateSchedulingData = () => {
    onSchedulingUpdate({
      deliveryType,
      scheduledDate,
      scheduledTime,
      timezone,
      recurringEnabled,
      recurringPattern,
      surpriseSequence,
      reminderSettings
    });
  };

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
    if (type === 'recurring') {
      setRecurringEnabled(true);
    } else {
      setRecurringEnabled(false);
    }
    updateSchedulingData();
  };

  const addSurpriseEvent = () => {
    const newEvent = {
      id: Date.now(),
      delay: 0,
      type: 'message',
      title: 'Surprise Message'
    };
    const updatedSequence = [...surpriseSequence, newEvent];
    setSurpriseSequence(updatedSequence);
    updateSchedulingData();
  };

  const removeSurpriseEvent = (eventId) => {
    const updatedSequence = surpriseSequence?.filter(event => event?.id !== eventId);
    setSurpriseSequence(updatedSequence);
    updateSchedulingData();
  };

  const getMinDateTime = () => {
    const now = new Date();
    now?.setMinutes(now?.getMinutes() + 30); // Minimum 30 minutes from now
    return now?.toISOString()?.slice(0, 16);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center">
          <Icon name="Calendar" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-playfair text-xl font-semibold text-foreground">Delivery Scheduling</h3>
          <p className="text-sm text-muted-foreground">Perfect timing for your romantic surprise</p>
        </div>
      </div>
      {/* Delivery Type Selection */}
      <div className="mb-6">
        <Select
          label="Delivery Type"
          options={deliveryTypeOptions}
          value={deliveryType}
          onChange={handleDeliveryTypeChange}
          description="Choose when your gift should be delivered"
          className="mb-4"
        />
      </div>
      {/* Immediate Delivery */}
      {deliveryType === 'immediate' && (
        <div className="p-4 bg-success/10 rounded-lg border border-success/20 mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Zap" size={20} className="text-success" />
            <div>
              <h4 className="font-inter font-medium text-foreground">Instant Delivery</h4>
              <p className="text-sm text-muted-foreground">
                Your gift will be sent immediately after completion
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Scheduled Delivery */}
      {deliveryType === 'scheduled' && (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Delivery Date"
              type="date"
              value={scheduledDate}
              onChange={(e) => {
                setScheduledDate(e?.target?.value);
                updateSchedulingData();
              }}
              min={new Date()?.toISOString()?.split('T')?.[0]}
              required
            />
            
            <Input
              label="Delivery Time"
              type="time"
              value={scheduledTime}
              onChange={(e) => {
                setScheduledTime(e?.target?.value);
                updateSchedulingData();
              }}
              required
            />
          </div>
          
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={timezone}
            onChange={(value) => {
              setTimezone(value);
              updateSchedulingData();
            }}
            description="Select the recipient's timezone"
          />
        </div>
      )}
      {/* Recurring Delivery */}
      {(deliveryType === 'recurring' || recurringEnabled) && (
        <div className="space-y-4 mb-6">
          <Select
            label="Recurring Pattern"
            options={recurringPatternOptions}
            value={recurringPattern}
            onChange={(value) => {
              setRecurringPattern(value);
              updateSchedulingData();
            }}
            description="How often should this gift be sent?"
          />
          
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-start space-x-3">
              <Icon name="Repeat" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-inter font-medium text-foreground mb-1">Recurring Romance</h4>
                <p className="text-sm text-muted-foreground">
                  Keep the love alive with regular romantic surprises. Perfect for anniversaries, 
                  weekly date reminders, or just because moments.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Surprise Sequence */}
      {deliveryType === 'surprise' && (
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="font-inter font-medium text-foreground">Surprise Sequence</h4>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={addSurpriseEvent}
              className="hover:bg-primary/10"
            >
              Add Surprise
            </Button>
          </div>
          
          {surpriseSequence?.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
              <Icon name="Gift" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Create a sequence of romantic surprises
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {surpriseSequence?.map((event, index) => (
                <div key={event?.id} className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border">
                  <div className="w-8 h-8 bg-romantic-gradient rounded-full flex items-center justify-center text-sm font-medium text-secondary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{event?.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event?.delay === 0 ? 'Immediate' : `${event?.delay} minutes later`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSurpriseEvent(event?.id)}
                    className="w-8 h-8 text-error hover:text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Reminder Settings */}
      <div className="border-t border-border pt-6">
        <h4 className="font-inter font-medium text-foreground mb-4">Reminder Settings</h4>
        
        <div className="space-y-4">
          <Checkbox
            label="Send me delivery reminders"
            checked={reminderSettings?.enabled}
            onChange={(e) => {
              const updatedSettings = {
                ...reminderSettings,
                enabled: e?.target?.checked
              };
              setReminderSettings(updatedSettings);
              updateSchedulingData();
            }}
            description="Get notified before your gift is delivered"
          />
          
          {reminderSettings?.enabled && (
            <Select
              label="Reminder Timing"
              options={reminderOptions}
              value={reminderSettings?.beforeDelivery}
              onChange={(value) => {
                const updatedSettings = {
                  ...reminderSettings,
                  beforeDelivery: parseInt(value)
                };
                setReminderSettings(updatedSettings);
                updateSchedulingData();
              }}
              description="When should we remind you?"
            />
          )}
          
          <Checkbox
            label="Notify me after delivery"
            checked={reminderSettings?.afterDelivery}
            onChange={(e) => {
              const updatedSettings = {
                ...reminderSettings,
                afterDelivery: e?.target?.checked
              };
              setReminderSettings(updatedSettings);
              updateSchedulingData();
            }}
            description="Get confirmation when your gift is received"
          />
        </div>
      </div>
      {/* Special Dates Suggestions */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Calendar" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-inter font-medium text-foreground mb-1">Special Date Ideas</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• <strong>Anniversary:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)?.toLocaleDateString()}</p>
              <p>• <strong>Valentine's Day:</strong> February 14, 2025</p>
              <p>• <strong>First Date Anniversary:</strong> Set your special date</p>
              <p>• <strong>Monthly Love Notes:</strong> 14th of each month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingOptions;