import React, { useState } from 'react';
import { Brain, Gift, MessageCircle, Calendar } from 'lucide-react';

const InteractiveQuizzes = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState({});

  const quizzes = [
    {
      id: 'love-language',
      title: 'Discover Your Partner\'s Love Language',
      icon: MessageCircle,
      description: 'Understand how your partner prefers to receive love',
      questions: 5,
      duration: '3 min',
      color: 'bg-pink-100',
      illustration: '💬'
    },
    {
      id: 'gift-preferences',
      title: 'Gift Preference Assessment',
      icon: Gift,
      description: 'Learn what types of gifts resonate most with your partner',
      questions: 8,
      duration: '4 min',
      color: 'bg-purple-100',
      illustration: '🎁'
    },
    {
      id: 'communication-style',
      title: 'Communication Style Analysis',
      icon: Brain,
      description: 'Identify your communication patterns and preferences',
      questions: 6,
      duration: '3 min',
      color: 'bg-blue-100',
      illustration: '🧠'
    },
    {
      id: 'relationship-stage',
      title: 'Relationship Milestone Tracker',
      icon: Calendar,
      description: 'Get personalized advice based on your relationship stage',
      questions: 7,
      duration: '5 min',
      color: 'bg-green-100',
      illustration: '📅'
    }
  ];

  const startQuiz = (quizId) => {
    setActiveQuiz(quizId);
  };

  const completeQuiz = (quizId) => {
    setQuizResults(prev => ({
      ...prev,
      [quizId]: {
        completed: true,
        score: Math.floor(Math.random() * 100) + 1,
        completedDate: new Date()?.toLocaleDateString()
      }
    }));
    setActiveQuiz(null);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-secondary mb-4">
            Interactive Quizzes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover insights about your partner and relationship through engaging assessments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {quizzes?.map((quiz) => {
            const IconComponent = quiz?.icon;
            const isCompleted = quizResults?.[quiz?.id]?.completed;
            
            return (
              <div
                key={quiz?.id}
                className="bg-card rounded-xl p-6 shadow-romantic hover:shadow-romantic-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`${quiz?.color} rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl">{quiz?.illustration}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-playfair font-semibold text-card-foreground">
                        {quiz?.title}
                      </h3>
                      {isCompleted && (
                        <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {quiz?.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Brain className="w-4 h-4" />
                        {quiz?.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {quiz?.duration}
                      </span>
                    </div>

                    {isCompleted ? (
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-success">Quiz Completed!</p>
                            <p className="text-sm text-muted-foreground">
                              Completed on {quizResults?.[quiz?.id]?.completedDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-success">
                              {quizResults?.[quiz?.id]?.score}%
                            </p>
                            <p className="text-xs text-muted-foreground">Match Score</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => startQuiz(quiz?.id)}
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex-grow"
                      >
                        {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                      </button>
                      {isCompleted && (
                        <button className="border border-secondary text-secondary px-4 py-2 rounded-lg font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
                          View Results
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiz Modal Placeholder */}
        {activeQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-background rounded-xl p-8 max-w-2xl w-full mx-6 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-playfair font-bold text-card-foreground mb-6">
                {quizzes?.find(q => q?.id === activeQuiz)?.title}
              </h2>
              
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {quizzes?.find(q => q?.id === activeQuiz)?.illustration}
                </div>
                <p className="text-muted-foreground mb-6">
                  Quiz interface would be implemented here
                </p>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => completeQuiz(activeQuiz)}
                    className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-medium"
                  >
                    Complete Quiz (Demo)
                  </button>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="border border-secondary text-secondary px-6 py-2 rounded-lg font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveQuizzes;