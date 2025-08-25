import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import RelationshipContextForm from './components/RelationshipContextForm';
import TimelineBuilder from './components/TimelineBuilder';
import MessageComposer from './components/MessageComposer';
import VoiceRecorder from './components/VoiceRecorder';
import PhotoUploader from './components/PhotoUploader';
import ColorPalette from './components/ColorPalette';
import SchedulingOptions from './components/SchedulingOptions';
import ProgressTracker from './components/ProgressTracker';

const LoveStoryBuilderPersonalizationStudio = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('context');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Form data states
  const [contextData, setContextData] = useState({});
  const [timelineData, setTimelineData] = useState([]);
  const [messageData, setMessageData] = useState({});
  const [voiceData, setVoiceData] = useState({});
  const [photoData, setPhotoData] = useState({});
  const [colorData, setColorData] = useState({});
  const [schedulingData, setSchedulingData] = useState({});

  const steps = ['context', 'timeline', 'message', 'voice', 'photos', 'colors', 'scheduling'];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      handleSave();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSave);
  }, [contextData, timelineData, messageData, voiceData, photoData, colorData, schedulingData]);

  // Check step completion
  useEffect(() => {
    const newCompletedSteps = [];
    
    if (contextData?.partnerName && contextData?.relationshipDuration) {
      newCompletedSteps?.push('context');
    }
    if (timelineData?.length > 0) {
      newCompletedSteps?.push('timeline');
    }
    if (messageData?.content && messageData?.content?.trim()?.length > 20) {
      newCompletedSteps?.push('message');
    }
    if (voiceData?.audioBlob || voiceData?.duration > 0) {
      newCompletedSteps?.push('voice');
    }
    if (photoData?.photos && photoData?.photos?.length > 0) {
      newCompletedSteps?.push('photos');
    }
    if (colorData?.palette) {
      newCompletedSteps?.push('colors');
    }
    if (schedulingData?.deliveryType) {
      newCompletedSteps?.push('scheduling');
    }

    setCompletedSteps(newCompletedSteps);
  }, [contextData, timelineData, messageData, voiceData, photoData, colorData, schedulingData]);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const now = new Date();
    setLastSaved(now?.toLocaleTimeString());
    setIsSaving(false);
  };

  const handleStepClick = (stepId) => {
    const stepIndex = steps?.indexOf(stepId);
    const currentIndex = steps?.indexOf(currentStep);
    
    // Allow navigation to completed steps, current step, or next available step
    if (stepIndex <= currentIndex + 1 || completedSteps?.includes(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const handleNextStep = () => {
    const currentIndex = steps?.indexOf(currentStep);
    if (currentIndex < steps?.length - 1) {
      setCurrentStep(steps?.[currentIndex + 1]);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps?.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps?.[currentIndex - 1]);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleComplete = () => {
    if (completedSteps?.length === steps?.length) {
      // Navigate to delivery experience or show completion modal
      navigate('/moment-scheduler-delivery-experience');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'context':
        return (
          <RelationshipContextForm
            contextData={contextData}
            onContextUpdate={setContextData}
          />
        );
      case 'timeline':
        return (
          <TimelineBuilder
            timelineData={timelineData}
            onTimelineUpdate={setTimelineData}
          />
        );
      case 'message':
        return (
          <MessageComposer
            messageData={messageData}
            onMessageUpdate={setMessageData}
          />
        );
      case 'voice':
        return (
          <VoiceRecorder
            voiceData={voiceData}
            onVoiceUpdate={setVoiceData}
          />
        );
      case 'photos':
        return (
          <PhotoUploader
            photoData={photoData}
            onPhotoUpdate={setPhotoData}
          />
        );
      case 'colors':
        return (
          <ColorPalette
            colorData={colorData}
            onColorUpdate={setColorData}
          />
        );
      case 'scheduling':
        return (
          <SchedulingOptions
            schedulingData={schedulingData}
            onSchedulingUpdate={setSchedulingData}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = {
      context: 'Tell Us Your Love Story',
      timeline: 'Create Your Timeline',
      message: 'Compose Your Message',
      voice: 'Record Your Voice',
      photos: 'Add Photo Memories',
      colors: 'Choose Your Colors',
      scheduling: 'Schedule Delivery'
    };
    return titles?.[currentStep] || 'Love Story Builder';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <div className="pt-16 bg-romantic-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="PenTool" size={24} className="text-white" />
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-secondary">
                Love Story Builder
              </h1>
            </div>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Create a deeply personal digital gift that captures your unique love story. 
              Every detail matters in crafting the perfect romantic surprise.
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProgressTracker
                currentStep={currentStep}
                completedSteps={completedSteps}
                totalSteps={steps?.length}
                onStepClick={handleStepClick}
                onSave={handleSave}
                onPreview={handlePreview}
                onComplete={handleComplete}
                isSaving={isSaving}
                lastSaved={lastSaved}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Step Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-playfair text-2xl font-semibold text-foreground mb-2">
                    {getStepTitle()}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Step {steps?.indexOf(currentStep) + 1} of {steps?.length}</span>
                    <span>•</span>
                    <span>{Math.round(((steps?.indexOf(currentStep) + 1) / steps?.length) * 100)}% Complete</span>
                  </div>
                </div>
                
                {/* Mobile Progress */}
                <div className="lg:hidden">
                  <div className="w-16 h-16 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - (completedSteps?.length / steps?.length))}`}
                        className="text-secondary transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-secondary">
                        {Math.round((completedSteps?.length / steps?.length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {renderCurrentStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                iconName="ChevronLeft"
                iconPosition="left"
                onClick={handlePreviousStep}
                disabled={steps?.indexOf(currentStep) === 0}
                className="hover:bg-primary/10"
              >
                Previous Step
              </Button>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  iconName="Save"
                  iconPosition="left"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="text-muted-foreground hover:text-secondary"
                >
                  {isSaving ? 'Saving...' : 'Save Progress'}
                </Button>

                {steps?.indexOf(currentStep) === steps?.length - 1 ? (
                  <Button
                    variant="default"
                    iconName="Heart"
                    iconPosition="right"
                    onClick={handleComplete}
                    disabled={completedSteps?.length !== steps?.length}
                    className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300"
                  >
                    Complete & Send Love
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    iconName="ChevronRight"
                    iconPosition="right"
                    onClick={handleNextStep}
                    disabled={!completedSteps?.includes(currentStep)}
                    className="bg-romantic-gradient-dark"
                  >
                    Next Step
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair text-2xl font-semibold text-foreground">Gift Preview</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPreview(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={24} />
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Preview content would go here */}
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <Icon name="Eye" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h4 className="font-inter font-medium text-foreground mb-2">Preview Coming Soon</h4>
                <p className="text-sm text-muted-foreground">
                  Your beautiful gift preview will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '9s' }}></div>
      </div>
    </div>
  );
};

export default LoveStoryBuilderPersonalizationStudio;