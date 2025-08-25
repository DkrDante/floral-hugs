import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TimelineBuilder = ({ timelineData, onTimelineUpdate }) => {
  const [timeline, setTimeline] = useState(timelineData || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    type: 'message',
    delay: '0'
  });

  const eventTypes = [
    { value: 'message', label: 'Love Message' },
    { value: 'photo', label: 'Photo Memory' },
    { value: 'voice', label: 'Voice Note' },
    { value: 'video', label: 'Video Message' },
    { value: 'surprise', label: 'Surprise Element' }
  ];

  const delayOptions = [
    { value: '0', label: 'Immediate' },
    { value: '5', label: '5 minutes later' },
    { value: '15', label: '15 minutes later' },
    { value: '30', label: '30 minutes later' },
    { value: '60', label: '1 hour later' },
    { value: '1440', label: '1 day later' }
  ];

  const addTimelineEvent = () => {
    if (!newEvent?.title?.trim()) return;

    const event = {
      id: Date.now(),
      ...newEvent,
      timestamp: new Date()?.toISOString()
    };

    const updatedTimeline = [...timeline, event];
    setTimeline(updatedTimeline);
    onTimelineUpdate(updatedTimeline);
    
    setNewEvent({
      title: '',
      description: '',
      date: '',
      type: 'message',
      delay: '0'
    });
    setShowAddForm(false);
  };

  const removeTimelineEvent = (eventId) => {
    const updatedTimeline = timeline?.filter(event => event?.id !== eventId);
    setTimeline(updatedTimeline);
    onTimelineUpdate(updatedTimeline);
  };

  const moveEvent = (eventId, direction) => {
    const currentIndex = timeline?.findIndex(event => event?.id === eventId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === timeline?.length - 1)
    ) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const updatedTimeline = [...timeline];
    [updatedTimeline[currentIndex], updatedTimeline[newIndex]] = 
    [updatedTimeline?.[newIndex], updatedTimeline?.[currentIndex]];
    
    setTimeline(updatedTimeline);
    onTimelineUpdate(updatedTimeline);
  };

  const getEventIcon = (type) => {
    const icons = {
      message: 'MessageCircle',
      photo: 'Camera',
      voice: 'Mic',
      video: 'Video',
      surprise: 'Gift'
    };
    return icons?.[type] || 'Heart';
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-playfair text-xl font-semibold text-foreground">Gift Timeline</h3>
            <p className="text-sm text-muted-foreground">Create a sequence of romantic moments</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddForm(true)}
          className="hover:bg-primary/10"
        >
          Add Moment
        </Button>
      </div>
      {/* Timeline Events */}
      <div className="space-y-4 mb-6">
        {timeline?.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-3" />
            <h4 className="font-inter font-medium text-foreground mb-2">No moments added yet</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Create a beautiful sequence of romantic moments for your partner
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowAddForm(true)}
              className="bg-romantic-gradient-dark"
            >
              Add Your First Moment
            </Button>
          </div>
        ) : (
          timeline?.map((event, index) => (
            <div key={event?.id} className="relative">
              {/* Timeline Line */}
              {index < timeline?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-primary/30"></div>
              )}
              
              <div className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border hover:shadow-romantic transition-all duration-300">
                <div className="w-12 h-12 bg-romantic-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={getEventIcon(event?.type)} size={20} className="text-secondary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-inter font-medium text-foreground">{event?.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{event?.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {eventTypes?.find(t => t?.value === event?.type)?.label}
                        </span>
                        {event?.delay !== '0' && (
                          <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                            {delayOptions?.find(d => d?.value === event?.delay)?.label}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveEvent(event?.id, 'up')}
                        disabled={index === 0}
                        className="w-8 h-8"
                      >
                        <Icon name="ChevronUp" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveEvent(event?.id, 'down')}
                        disabled={index === timeline?.length - 1}
                        className="w-8 h-8"
                      >
                        <Icon name="ChevronDown" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTimelineEvent(event?.id)}
                        className="w-8 h-8 text-error hover:text-error hover:bg-error/10"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Add Event Form */}
      {showAddForm && (
        <div className="border-t border-border pt-6">
          <h4 className="font-inter font-medium text-foreground mb-4">Add New Moment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Moment Title"
              type="text"
              placeholder="e.g., Sweet Morning Message"
              value={newEvent?.title}
              onChange={(e) => setNewEvent({...newEvent, title: e?.target?.value})}
              required
            />
            
            <Select
              label="Moment Type"
              options={eventTypes}
              value={newEvent?.type}
              onChange={(value) => setNewEvent({...newEvent, type: value})}
            />
            
            <div className="md:col-span-2">
              <Input
                label="Description"
                type="text"
                placeholder="Describe this romantic moment..."
                value={newEvent?.description}
                onChange={(e) => setNewEvent({...newEvent, description: e?.target?.value})}
              />
            </div>
            
            <Select
              label="Delivery Timing"
              options={delayOptions}
              value={newEvent?.delay}
              onChange={(value) => setNewEvent({...newEvent, delay: value})}
              description="When should this moment be delivered?"
            />
          </div>
          
          <div className="flex items-center space-x-3 mt-6">
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={addTimelineEvent}
              disabled={!newEvent?.title?.trim()}
              className="bg-romantic-gradient-dark"
            >
              Add Moment
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineBuilder;