import React from 'react';
import { Send, Heart, Calendar, Zap, Gift, MessageCircle } from 'lucide-react';

const QuickActions = () => {
  const quickActions = [
    {
      id: 'send_love',
      title: 'Send Love Note',
      description: 'Quick romantic message',
      icon: Heart,
      color: 'bg-pink-500',
      action: 'send'
    },
    {
      id: 'surprise_gift',
      title: 'Surprise Gift',
      description: 'Random romantic gesture',
      icon: Gift,
      color: 'bg-purple-500',
      action: 'surprise'
    },
    {
      id: 'schedule_date',
      title: 'Plan Date',
      description: 'Schedule quality time',
      icon: Calendar,
      color: 'bg-blue-500',
      action: 'schedule'
    },
    {
      id: 'voice_message',
      title: 'Voice Note',
      description: 'Record loving message',
      icon: MessageCircle,
      color: 'bg-green-500',
      action: 'record'
    }
  ];

  const emergencyActions = [
    { title: 'Apology Package', emoji: '🙏', color: 'bg-yellow-500' },
    { title: 'Cheer Up Kit', emoji: '🌈', color: 'bg-orange-500' },
    { title: 'Celebration Mode', emoji: '🎉', color: 'bg-pink-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Quick Actions */}
      <div className="bg-card rounded-xl p-6 shadow-romantic">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-playfair font-bold text-card-foreground">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {quickActions?.map((action) => {
            const IconComponent = action?.icon;
            return (
              <button
                key={action?.id}
                className="group p-4 bg-background rounded-lg border border-border hover:shadow-romantic transition-all duration-200 text-left"
              >
                <div className={`${action?.color} rounded-full w-10 h-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-card-foreground text-sm mb-1">
                  {action?.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Send Now Button */}
        <button className="w-full mt-4 bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
          <Send className="w-4 h-4" />
          Send Something Special
        </button>
      </div>
      {/* Emergency Romance Kit */}
      <div className="bg-romantic-gradient rounded-xl p-6">
        <h3 className="text-lg font-playfair font-bold text-secondary mb-4">
          Emergency Romance Kit 🚨
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          For those "oh no" moments when you need to act fast
        </p>

        <div className="space-y-2">
          {emergencyActions?.map((action, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors text-left"
            >
              <div className={`${action?.color} rounded-full w-8 h-8 flex items-center justify-center`}>
                <span className="text-white text-sm">{action?.emoji}</span>
              </div>
              <span className="text-sm font-medium text-card-foreground">
                {action?.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-muted-foreground">
            ⚡ Delivered in under 2 minutes
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;