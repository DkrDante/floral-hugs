import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ 
  currentStep, 
  completedSteps, 
  totalSteps, 
  onStepClick, 
  onSave, 
  onPreview, 
  onComplete,
  isSaving,
  lastSaved 
}) => {
  const steps = [
    {
      id: 'context',
      name: 'Love Story Context',
      icon: 'Heart',
      description: 'Tell us about your relationship'
    },
    {
      id: 'timeline',
      name: 'Timeline Builder',
      icon: 'Clock',
      description: 'Create your romantic sequence'
    },
    {
      id: 'message',
      name: 'Message Composer',
      icon: 'PenTool',
      description: 'Write your heartfelt message'
    },
    {
      id: 'voice',
      name: 'Voice Recording',
      icon: 'Mic',
      description: 'Add your personal voice'
    },
    {
      id: 'photos',
      name: 'Photo Memories',
      icon: 'Camera',
      description: 'Upload your special moments'
    },
    {
      id: 'colors',
      name: 'Color Palette',
      icon: 'Palette',
      description: 'Choose your romantic theme'
    },
    {
      id: 'scheduling',
      name: 'Delivery Scheduling',
      icon: 'Calendar',
      description: 'Perfect timing for your surprise'
    }
  ];

  const getStepStatus = (stepId, index) => {
    if (completedSteps?.includes(stepId)) return 'completed';
    if (currentStep === stepId) return 'current';
    if (index < steps?.findIndex(s => s?.id === currentStep)) return 'available';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return step?.icon;
    return step?.icon;
  };

  const getStepClasses = (status) => {
    const baseClasses = "flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} border-success bg-success/10 hover:bg-success/20`;
      case 'current':
        return `${baseClasses} border-secondary bg-secondary/10 shadow-romantic`;
      case 'available':
        return `${baseClasses} border-border hover:border-primary/30 hover:bg-primary/5`;
      default:
        return `${baseClasses} border-border bg-muted/30 cursor-not-allowed opacity-60`;
    }
  };

  const getIconClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'current':
        return 'text-secondary';
      case 'available':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground/50';
    }
  };

  const completionPercentage = Math.round((completedSteps?.length / steps?.length) * 100);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center">
            <Icon name="Target" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-playfair text-xl font-semibold text-foreground">Creation Progress</h3>
            <p className="text-sm text-muted-foreground">
              {completedSteps?.length} of {steps?.length} steps completed
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-secondary">{completionPercentage}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-romantic-gradient transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      {/* Steps List */}
      <div className="space-y-3 mb-6">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id, index);
          const isClickable = status === 'completed' || status === 'current' || status === 'available';
          
          return (
            <div
              key={step?.id}
              onClick={() => isClickable && onStepClick(step?.id)}
              className={getStepClasses(status)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'completed' ? 'bg-success/20' :
                  status === 'current'? 'bg-secondary/20' : 'bg-muted'
                }`}>
                  <Icon 
                    name={getStepIcon(step, status)} 
                    size={16} 
                    className={getIconClasses(status)} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-inter font-medium ${
                    status === 'completed' ? 'text-success' :
                    status === 'current' ? 'text-secondary' :
                    status === 'available' ? 'text-foreground' :
                    'text-muted-foreground'
                  }`}>
                    {step?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{step?.description}</p>
                </div>
              </div>
              {status === 'current' && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Auto-save Status */}
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg mb-6">
        <div className="flex items-center space-x-2">
          <Icon 
            name={isSaving ? "Loader2" : "Save"} 
            size={16} 
            className={`text-muted-foreground ${isSaving ? 'animate-spin' : ''}`} 
          />
          <span className="text-sm text-muted-foreground">
            {isSaving ? 'Saving...' : lastSaved ? `Last saved: ${lastSaved}` : 'Auto-save enabled'}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Save"
          iconPosition="left"
          onClick={onSave}
          disabled={isSaving}
          className="text-muted-foreground hover:text-secondary"
        >
          Save Now
        </Button>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Button
          variant="outline"
          iconName="Eye"
          iconPosition="left"
          onClick={onPreview}
          disabled={completedSteps?.length === 0}
          className="flex-1 hover:bg-primary/10"
        >
          Preview Gift
        </Button>
        
        <Button
          variant="default"
          iconName="Heart"
          iconPosition="left"
          onClick={onComplete}
          disabled={completionPercentage < 100}
          className="flex-1 bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300"
        >
          Complete & Send
        </Button>
      </div>
      {/* Completion Celebration */}
      {completionPercentage === 100 && (
        <div className="mt-6 p-4 bg-romantic-gradient rounded-lg border border-secondary/20">
          <div className="text-center">
            <Icon name="Heart" size={32} className="text-secondary mx-auto mb-2 animate-pulse-gentle" />
            <h4 className="font-playfair text-lg font-semibold text-secondary mb-1">
              Your Love Story is Complete! 
            </h4>
            <p className="text-sm text-secondary/80">
              Ready to send this beautiful gift to your special someone
            </p>
          </div>
        </div>
      )}
      {/* Tips for Current Step */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-inter font-medium text-foreground mb-1">Quick Tip</h4>
            <p className="text-sm text-muted-foreground">
              {currentStep === 'context' && "The more details you share, the more personalized your gift becomes."}
              {currentStep === 'timeline' && "Create a sequence that tells your unique love story."}
              {currentStep === 'message' && "Write from the heart - authenticity is more beautiful than perfection."}
              {currentStep === 'voice' && "Your voice adds an intimate touch that text alone cannot convey."}
              {currentStep === 'photos' && "Choose images that capture your favorite memories together."}
              {currentStep === 'colors' && "Select colors that represent your relationship's personality."}
              {currentStep === 'scheduling' && "Perfect timing can make your surprise even more magical."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;