import React, { useState } from 'react';
import { Calendar, Bell, Plus, Heart } from 'lucide-react';

const RelationshipCalendar = () => {
  const [currentDate] = useState(new Date());

  const upcomingEvents = [
    {
      id: 1,
      title: 'Monthly Anniversary',
      date: 'Tomorrow',
      type: 'anniversary',
      reminder: true,
      color: 'bg-pink-500'
    },
    {
      id: 2,
      title: 'Sarah\'s Presentation',
      date: 'Feb 18',
      type: 'support',
      reminder: true,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Valentine\'s Follow-up',
      date: 'Feb 20',
      type: 'custom',
      reminder: false,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Plan Spring Getaway',
      date: 'Mar 1',
      type: 'planning',
      reminder: true,
      color: 'bg-green-500'
    }
  ];

  const milestones = [
    { title: 'First Date', date: 'Aug 12, 2023', icon: '💕' },
    { title: 'First "I Love You"', date: 'Oct 5, 2023', icon: '❤️' },
    { title: 'Official Anniversary', date: 'Aug 12, 2024', icon: '🎉' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-romantic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-secondary" />
          <h2 className="text-xl font-playfair font-bold text-card-foreground">
            Love Calendar
          </h2>
        </div>
        <button className="text-secondary hover:text-secondary/80">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {/* Upcoming Events */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Upcoming Events
        </h3>

        <div className="space-y-3">
          {upcomingEvents?.map((event) => (
            <div
              key={event?.id}
              className="flex items-center gap-3 p-3 bg-muted rounded-lg"
            >
              <div className={`w-3 h-3 rounded-full ${event?.color}`}></div>
              <div className="flex-grow min-w-0">
                <h4 className="text-sm font-medium text-card-foreground truncate">
                  {event?.title}
                </h4>
                <p className="text-xs text-muted-foreground">{event?.date}</p>
              </div>
              {event?.reminder && (
                <Bell className="w-3 h-3 text-accent" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Key Milestones */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-secondary" />
          Key Milestones
        </h3>

        <div className="space-y-2">
          {milestones?.map((milestone, index) => (
            <div key={index} className="flex items-center gap-3 p-2">
              <span className="text-lg">{milestone?.icon}</span>
              <div>
                <h4 className="text-xs font-medium text-card-foreground">
                  {milestone?.title}
                </h4>
                <p className="text-xs text-muted-foreground">{milestone?.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Reminder Settings */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Smart Reminders</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-3 bg-secondary rounded-full relative">
              <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-sm"></div>
            </div>
            <span className="text-xs text-success">On</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          Get gentle nudges for important dates and opportunities
        </p>
      </div>
    </div>
  );
};

export default RelationshipCalendar;