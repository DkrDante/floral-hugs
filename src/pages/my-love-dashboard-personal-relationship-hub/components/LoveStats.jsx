import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Target, Heart, Gift } from 'lucide-react';

const LoveStats = () => {
  const [activeTab, setActiveTab] = useState('streak');

  const stats = {
    streak: {
      current: 12,
      best: 21,
      title: 'Day Streak',
      description: 'Consecutive days of romantic gestures'
    },
    gifts: {
      sent: 47,
      received: 38,
      favorite: 'Love Letters',
      success_rate: 94
    },
    growth: {
      intimacy: 85,
      communication: 92,
      surprise_factor: 78,
      consistency: 88
    },
    milestones: [
      { title: 'First Month Master', date: 'Sep 2023', icon: '🎯' },
      { title: 'Consistency Champion', date: 'Oct 2023', icon: '🏆' },
      { title: 'Romance Wizard', date: 'Dec 2023', icon: '✨' },
      { title: 'Heart Keeper', date: 'Jan 2024', icon: '💝' }
    ]
  };

  const weeklyData = [
    { day: 'Mon', value: 3 },
    { day: 'Tue', value: 5 },
    { day: 'Wed', value: 2 },
    { day: 'Thu', value: 4 },
    { day: 'Fri', value: 6 },
    { day: 'Sat', value: 8 },
    { day: 'Sun', value: 7 }
  ];

  const relationshipHealth = [
    { category: 'Communication', score: 92, color: 'bg-blue-500' },
    { category: 'Romance', score: 85, color: 'bg-pink-500' },
    { category: 'Support', score: 88, color: 'bg-green-500' },
    { category: 'Fun', score: 90, color: 'bg-purple-500' }
  ];

  const tabs = [
    { id: 'streak', label: 'Streak', icon: Target },
    { id: 'gifts', label: 'Gifts', icon: Gift },
    { id: 'growth', label: 'Growth', icon: TrendingUp },
    { id: 'achievements', label: 'Awards', icon: Award }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-romantic">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-secondary" />
        <h2 className="text-xl font-playfair font-bold text-card-foreground">
          Love Stats
        </h2>
      </div>
      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => {
          const IconComponent = tab?.icon;
          return (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'bg-background text-card-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <IconComponent className="w-3 h-3" />
              {tab?.label}
            </button>
          );
        })}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {/* Streak Tab */}
        {activeTab === 'streak' && (
          <div>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-secondary mb-1">
                {stats?.streak?.current}
              </div>
              <div className="text-sm text-muted-foreground">
                {stats?.streak?.title}
              </div>
              <div className="text-xs text-muted-foreground">
                Best: {stats?.streak?.best} days
              </div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">This Week</span>
                <span className="text-xs text-card-foreground font-medium">
                  {weeklyData?.reduce((sum, day) => sum + day?.value, 0)} gestures
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {weeklyData?.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      {day?.day?.[0]}
                    </div>
                    <div
                      className="bg-secondary rounded-sm mx-auto"
                      style={{
                        height: `${Math.max(4, day?.value * 4)}px`,
                        width: '16px'
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gifts Tab */}
        {activeTab === 'gifts' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">
                  {stats?.gifts?.sent}
                </div>
                <div className="text-xs text-muted-foreground">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">
                  {stats?.gifts?.received}
                </div>
                <div className="text-xs text-muted-foreground">Received</div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-sm font-medium text-card-foreground mb-1">
                Success Rate
              </div>
              <div className="text-2xl font-bold text-success">
                {stats?.gifts?.success_rate}%
              </div>
              <div className="text-xs text-muted-foreground">
                Positive reactions received
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">
                Favorite Gift Type
              </div>
              <div className="text-sm font-semibold text-card-foreground">
                💌 {stats?.gifts?.favorite}
              </div>
            </div>
          </div>
        )}

        {/* Growth Tab */}
        {activeTab === 'growth' && (
          <div className="space-y-3">
            {relationshipHealth?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-card-foreground font-medium">
                    {item?.category}
                  </span>
                  <span className="text-muted-foreground">{item?.score}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 ${item?.color} rounded-full transition-all duration-300`}
                    style={{ width: `${item?.score}%` }}
                  ></div>
                </div>
              </div>
            ))}

            <div className="mt-4 text-center bg-romantic-gradient rounded-lg p-3">
              <div className="text-sm font-semibold text-secondary mb-1">
                Overall Relationship Health
              </div>
              <div className="text-2xl font-bold text-secondary">
                {Math.round(relationshipHealth?.reduce((sum, item) => sum + item?.score, 0) / relationshipHealth?.length)}%
              </div>
              <div className="text-xs text-muted-foreground">
                ↑ +5% from last month
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-3">
            {stats?.milestones?.map((milestone, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                <span className="text-2xl">{milestone?.icon}</span>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-card-foreground">
                    {milestone?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Earned {milestone?.date}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 p-3 border border-secondary/30 rounded-lg text-center">
              <div className="text-lg mb-1">🎯</div>
              <div className="text-xs font-medium text-card-foreground">
                Next Achievement
              </div>
              <div className="text-xs text-muted-foreground">
                "Surprise Master" - 5 more surprise gifts
              </div>
              <div className="w-full bg-muted rounded-full h-1 mt-2">
                <div className="bg-secondary h-1 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Quick Action */}
      <button className="w-full mt-4 bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
        <Heart className="w-4 h-4" />
        Keep the Streak Going!
      </button>
    </div>
  );
};

export default LoveStats;