import React from 'react';
import { Trophy, Target, BookOpen, Clock, TrendingUp, Award } from 'lucide-react';

const PersonalLearningDashboard = () => {
  const learningStats = {
    coursesCompleted: 12,
    totalCourses: 45,
    currentStreak: 7,
    totalHours: 24.5,
    certificatesEarned: 3,
    rank: 'Relationship Enthusiast'
  };

  const currentCourses = [
    {
      title: 'Advanced Communication Techniques',
      progress: 78,
      nextLesson: 'Active Listening Mastery',
      timeLeft: '12 min',
      category: 'Communication'
    },
    {
      title: 'Anniversary Planning Masterclass',
      progress: 34,
      nextLesson: 'Budget Planning Strategies',
      timeLeft: '8 min',
      category: 'Planning'
    },
    {
      title: 'Digital Romance in 2024',
      progress: 91,
      nextLesson: 'Virtual Date Ideas',
      timeLeft: '5 min',
      category: 'Modern Love'
    }
  ];

  const upcomingSuggestions = [
    {
      title: 'Conflict Resolution Basics',
      reason: 'Based on your communication style assessment',
      duration: '45 min',
      difficulty: 'Beginner'
    },
    {
      title: 'Seasonal Romance Ideas',
      reason: 'Popular among similar learners',
      duration: '30 min',
      difficulty: 'Intermediate'
    },
    {
      title: 'Long-Distance Relationship Tools',
      reason: 'Trending this week',
      duration: '60 min',
      difficulty: 'Advanced'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-secondary mb-4">
            Your Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your progress and discover personalized recommendations for relationship growth
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-card rounded-xl p-6 text-center shadow-romantic">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-1">
                {learningStats?.coursesCompleted}
              </h3>
              <p className="text-sm text-muted-foreground">Courses Completed</p>
            </div>

            <div className="bg-card rounded-xl p-6 text-center shadow-romantic">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-1">
                {learningStats?.currentStreak}
              </h3>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>

            <div className="bg-card rounded-xl p-6 text-center shadow-romantic">
              <div className="bg-success/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-1">
                {learningStats?.totalHours}h
              </h3>
              <p className="text-sm text-muted-foreground">Learning Time</p>
            </div>

            <div className="bg-card rounded-xl p-6 text-center shadow-romantic">
              <div className="bg-warning/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-1">
                {learningStats?.certificatesEarned}
              </h3>
              <p className="text-sm text-muted-foreground">Certificates</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Current Courses */}
            <div className="bg-card rounded-xl p-6 shadow-romantic">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-playfair font-bold text-card-foreground">
                  Continue Learning
                </h3>
                <span className="text-sm text-muted-foreground">
                  {learningStats?.coursesCompleted}/{learningStats?.totalCourses} completed
                </span>
              </div>

              <div className="space-y-4">
                {currentCourses?.map((course, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">
                          {course?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Next: {course?.nextLesson}
                        </p>
                      </div>
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                        {course?.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-grow mr-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course?.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-secondary">
                        {course?.progress}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course?.timeLeft} left
                      </span>
                      <button className="text-sm text-secondary font-medium hover:text-secondary/80 transition-colors">
                        Continue →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 border border-secondary text-secondary py-2 rounded-lg font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
                View All Courses
              </button>
            </div>

            {/* Personalized Suggestions */}
            <div className="bg-card rounded-xl p-6 shadow-romantic">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h3 className="text-xl font-playfair font-bold text-card-foreground">
                  Suggested for You
                </h3>
              </div>

              <div className="space-y-4">
                {upcomingSuggestions?.map((suggestion, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-card-foreground">
                        {suggestion?.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        suggestion?.difficulty === 'Beginner' ? 'bg-success/10 text-success' :
                        suggestion?.difficulty === 'Intermediate'? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {suggestion?.difficulty}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {suggestion?.reason}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {suggestion?.duration}
                      </span>
                      <button className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded font-medium hover:bg-opacity-90 transition-colors">
                        Start Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Learning Rank */}
              <div className="mt-6 bg-romantic-gradient rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <span className="font-semibold text-secondary">Current Rank</span>
                </div>
                <h4 className="text-lg font-playfair font-bold text-secondary mb-1">
                  {learningStats?.rank}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Complete 3 more courses to reach "Romance Expert"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalLearningDashboard;