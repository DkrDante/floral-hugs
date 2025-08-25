import React, { useState } from 'react';
import { TrendingUp, Lightbulb, Heart, Brain } from 'lucide-react';

const MoodTracker = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const moodData = {
    week: [
      { day: 'Mon', mood: 8, note: 'Excited about project launch' },
      { day: 'Tue', mood: 6, note: 'Stressed about deadline' },
      { day: 'Wed', mood: 9, note: 'Celebrated small win' },
      { day: 'Thu', mood: 7, note: 'Feeling grateful' },
      { day: 'Fri', mood: 9, note: 'Weekend plans made her happy' },
      { day: 'Sat', mood: 8, note: 'Relaxing together' },
      { day: 'Sun', mood: 7, note: 'Sunday blues' }
    ],
    month: [
      { period: 'Week 1', mood: 7.5, trend: 'up' },
      { period: 'Week 2', mood: 6.8, trend: 'down' },
      { period: 'Week 3', mood: 8.2, trend: 'up' },
      { period: 'Week 4', mood: 7.9, trend: 'stable' }
    ]
  };

  const currentAverage = 7.7;
  const previousAverage = 7.2;
  const trend = currentAverage > previousAverage ? 'up' : 'down';

  const insights = [
    {
      type: 'pattern',
      title: 'Weekly Pattern',
      description: 'Sarah tends to be happiest on weekends and Wednesdays',
      icon: '📊'
    },
    {
      type: 'trigger',
      title: 'Stress Trigger',
      description: 'Work deadlines often affect Tuesday mood',
      icon: '⚠️'
    },
    {
      type: 'opportunity',
      title: 'Opportunity',
      description: 'Send encouragement on Tuesday mornings',
      icon: '💡'
    }
  ];

  const giftSuggestions = [
    {
      mood: 'low',
      suggestion: 'Comfort Care Package',
      description: 'Tea, cozy playlist, and encouraging note',
      timing: 'When mood dips below 6'
    },
    {
      mood: 'high',
      suggestion: 'Celebration Message',
      description: 'Acknowledge and celebrate good days',
      timing: 'When mood is 8 or above'
    },
    {
      mood: 'stressed',
      suggestion: 'Relaxation Kit',
      description: 'Calming music and stress-relief activities',
      timing: 'During busy work periods'
    }
  ];

  const getMoodColor = (mood) => {
    if (mood >= 8) return 'bg-green-500';
    if (mood >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMoodEmoji = (mood) => {
    if (mood >= 9) return '😍';
    if (mood >= 8) return '😊';
    if (mood >= 7) return '🙂';
    if (mood >= 6) return '😐';
    if (mood >= 5) return '😔';
    return '😢';
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-romantic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-secondary" />
          <h2 className="text-xl font-playfair font-bold text-card-foreground">
            Sarah's Mood Tracker
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTimeframe('week')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              selectedTimeframe === 'week' ?'bg-secondary text-secondary-foreground' :'bg-muted text-muted-foreground'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedTimeframe('month')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              selectedTimeframe === 'month' ?'bg-secondary text-secondary-foreground' :'bg-muted text-muted-foreground'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      {/* Mood Overview */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Average Mood</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-card-foreground">{currentAverage}</span>
            <span className="text-lg">{getMoodEmoji(currentAverage)}</span>
            <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
              <TrendingUp className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {trend === 'up' ? '+' : ''}{((currentAverage - previousAverage) * 10)?.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
      {/* Mood Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-card-foreground mb-3">
          {selectedTimeframe === 'week' ? 'This Week' : 'This Month'}
        </h3>
        
        {selectedTimeframe === 'week' ? (
          <div className="grid grid-cols-7 gap-2">
            {moodData?.week?.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{day?.day}</div>
                <div
                  className={`w-full h-8 ${getMoodColor(day?.mood)} rounded-md flex items-center justify-center text-white text-xs font-semibold`}
                >
                  {day?.mood}
                </div>
                <div className="text-lg mt-1">{getMoodEmoji(day?.mood)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {moodData?.month?.map((week, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">{week?.period}</span>
                <div className="flex-grow bg-muted rounded-full h-2">
                  <div
                    className={`h-2 ${getMoodColor(week?.mood)} rounded-full`}
                    style={{ width: `${(week?.mood / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-card-foreground w-8">
                  {week?.mood}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* AI Insights */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-accent" />
          AI Insights
        </h3>
        
        <div className="space-y-2">
          {insights?.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <span className="text-lg flex-shrink-0">{insight?.icon}</span>
              <div>
                <h4 className="text-sm font-medium text-card-foreground">
                  {insight?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {insight?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Smart Gift Suggestions */}
      <div>
        <h3 className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-secondary" />
          Mood-Based Suggestions
        </h3>
        
        <div className="space-y-2">
          {giftSuggestions?.map((suggestion, index) => (
            <div key={index} className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-card-foreground">
                  {suggestion?.suggestion}
                </h4>
                <button className="text-xs text-secondary hover:text-secondary/80 font-medium">
                  Use →
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                {suggestion?.description}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {suggestion?.timing}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;