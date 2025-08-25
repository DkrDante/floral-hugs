import React, { useState } from 'react';
import { Heart, Gift, Calendar, MessageCircle, Image, ChevronDown } from 'lucide-react';

const LoveTimeline = () => {
  const [showAll, setShowAll] = useState(false);

  const timelineEvents = [
    {
      id: 1,
      type: 'gift_sent',
      title: 'Digital Love Letter Delivered',
      description: 'Personalized poem with her favorite memories',
      date: '2 hours ago',
      recipient: 'Sarah',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600',
      status: 'delivered',
      reaction: '😍'
    },
    {
      id: 2,
      type: 'gift_received',
      title: 'Thank You Message Received',
      description: 'Sweet voice note expressing gratitude',
      date: '5 hours ago',
      recipient: 'You',
      icon: MessageCircle,
      color: 'bg-purple-100 text-purple-600',
      status: 'received',
      reaction: '🥰'
    },
    {
      id: 3,
      type: 'milestone',
      title: '6-Month Anniversary',
      description: 'Celebrated with virtual dinner date',
      date: '2 days ago',
      recipient: 'Both',
      icon: Calendar,
      color: 'bg-gold-100 text-gold-600',
      status: 'celebrated',
      reaction: '🎉'
    },
    {
      id: 4,
      type: 'gift_sent',
      title: 'Surprise Care Package',
      description: 'Custom playlist + her favorite chocolates',
      date: '1 week ago',
      recipient: 'Sarah',
      icon: Gift,
      color: 'bg-blue-100 text-blue-600',
      status: 'delivered',
      reaction: '😘'
    },
    {
      id: 5,
      type: 'memory',
      title: 'Photo Memory Added',
      description: 'Our first virtual date screenshot',
      date: '1 week ago',
      recipient: 'Shared',
      icon: Image,
      color: 'bg-green-100 text-green-600',
      status: 'saved',
      reaction: '📸'
    },
    {
      id: 6,
      type: 'gift_sent',
      title: 'Good Morning Surprise',
      description: 'Sunrise photo with motivational quote',
      date: '2 weeks ago',
      recipient: 'Sarah',
      icon: Heart,
      color: 'bg-orange-100 text-orange-600',
      status: 'delivered',
      reaction: '☀️'
    }
  ];

  const displayedEvents = showAll ? timelineEvents : timelineEvents?.slice(0, 4);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-success';
      case 'received':
        return 'text-secondary';
      case 'celebrated':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-romantic">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-playfair font-bold text-card-foreground">
          Your Love Story Timeline
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="w-4 h-4 text-secondary fill-current" />
          <span>Visual love journey</span>
        </div>
      </div>
      <div className="space-y-6">
        {displayedEvents?.map((event, index) => {
          const IconComponent = event?.icon;
          return (
            <div key={event?.id} className="relative">
              {/* Timeline line */}
              {index < displayedEvents?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-muted"></div>
              )}
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${event?.color} rounded-full p-3 flex-shrink-0`}>
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-card-foreground">
                      {event?.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{event?.reaction}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {event?.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {event?.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">
                        To: {event?.recipient}
                      </span>
                      <span className={`text-xs font-medium ${getStatusColor(event?.status)}`}>
                        {event?.status?.charAt(0)?.toUpperCase() + event?.status?.slice(1)}
                      </span>
                    </div>

                    {event?.type === 'gift_sent' && (
                      <button className="text-xs text-secondary hover:text-secondary/80 font-medium">
                        Send Again →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Show More/Less Button */}
      {timelineEvents?.length > 4 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium mx-auto"
          >
            {showAll ? 'Show Less' : `Show ${timelineEvents?.length - 4} More Events`}
            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
      {/* Timeline Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h4 className="text-lg font-bold text-card-foreground">24</h4>
            <p className="text-xs text-muted-foreground">Gifts Sent</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-card-foreground">18</h4>
            <p className="text-xs text-muted-foreground">Received</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-card-foreground">6</h4>
            <p className="text-xs text-muted-foreground">Milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveTimeline;