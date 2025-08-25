import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickScheduleOptions = ({ onQuickSchedule }) => {
  const quickOptions = [
    {
      id: 'now',
      title: 'Send Now',
      subtitle: 'Immediate delivery',
      icon: 'Zap',
      time: 'now',
      gradient: 'from-accent to-accent/80',
      delay: '0s'
    },
    {
      id: '1hour',
      title: 'In 1 Hour',
      subtitle: 'Perfect for surprises',
      icon: 'Clock',
      time: '1 hour',
      gradient: 'from-primary to-primary/80',
      delay: '0.1s'
    },
    {
      id: 'sunset',
      title: 'Tonight at Sunset',
      subtitle: 'Romantic timing',
      icon: 'Sunset',
      time: 'sunset',
      gradient: 'from-secondary to-secondary/80',
      delay: '0.2s'
    },
    {
      id: 'morning',
      title: 'Tomorrow Morning',
      subtitle: 'Start their day right',
      icon: 'Sun',
      time: 'morning',
      gradient: 'from-success to-success/80',
      delay: '0.3s'
    },
    {
      id: 'lunch',
      title: 'Lunch Break',
      subtitle: 'Midday surprise',
      icon: 'Coffee',
      time: 'lunch',
      gradient: 'from-warning to-warning/80',
      delay: '0.4s'
    },
    {
      id: 'weekend',
      title: 'This Weekend',
      subtitle: 'Weekend vibes',
      icon: 'Heart',
      time: 'weekend',
      gradient: 'from-muted to-muted/80',
      delay: '0.5s'
    }
  ];

  return (
    <div className="bg-card rounded-xl shadow-romantic p-6">
      <div className="text-center mb-6">
        <h3 className="font-playfair text-xl font-semibold text-foreground mb-2">
          Quick Schedule
        </h3>
        <p className="text-sm text-muted-foreground font-inter">
          Choose perfect timing for your romantic gesture
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickOptions?.map((option) => (
          <div
            key={option?.id}
            className="group cursor-pointer animate-float"
            style={{ animationDelay: option?.delay }}
            onClick={() => onQuickSchedule(option)}
          >
            <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${option?.gradient} p-4 transition-all duration-300 hover:shadow-romantic-lg hover:scale-105 group-hover:animate-bloom`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 right-2 w-8 h-8 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border border-white/20 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                    <Icon 
                      name={option?.icon} 
                      size={20} 
                      className="text-white group-hover:animate-pulse-gentle" 
                    />
                  </div>
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse-gentle"></div>
                </div>

                <div className="text-white">
                  <h4 className="font-inter font-semibold text-base mb-1 group-hover:text-white/90 transition-colors duration-300">
                    {option?.title}
                  </h4>
                  <p className="text-sm text-white/80 font-inter group-hover:text-white/70 transition-colors duration-300">
                    {option?.subtitle}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>

              {/* Floating Hearts */}
              <div className="absolute top-1 right-1 w-1 h-1 bg-white/30 rounded-full animate-float opacity-60"></div>
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white/20 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        ))}
      </div>
      {/* Custom Schedule Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={() => onQuickSchedule({ id: 'custom', title: 'Custom Schedule' })}
          className="text-muted-foreground hover:text-secondary border-border hover:border-secondary/30 hover:bg-primary/5 transition-all duration-300"
        >
          Schedule Custom Time
        </Button>
      </div>
    </div>
  );
};

export default QuickScheduleOptions;