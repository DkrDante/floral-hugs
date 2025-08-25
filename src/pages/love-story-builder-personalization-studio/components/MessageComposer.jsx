import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MessageComposer = ({ messageData, onMessageUpdate }) => {
  const [message, setMessage] = useState(messageData?.content || '');
  const [selectedFont, setSelectedFont] = useState(messageData?.font || 'inter');
  const [selectedStyle, setSelectedStyle] = useState(messageData?.style || 'romantic');
  const [wordCount, setWordCount] = useState(messageData?.content?.split(' ')?.length || 0);

  const fontOptions = [
    { value: 'inter', label: 'Modern Sans-Serif (Inter)' },
    { value: 'playfair', label: 'Elegant Serif (Playfair)' },
    { value: 'dancing', label: 'Handwritten Script (Dancing)' },
    { value: 'cursive', label: 'Classic Cursive' },
    { value: 'monospace', label: 'Typewriter Style' }
  ];

  const styleOptions = [
    { value: 'romantic', label: 'Romantic & Sweet' },
    { value: 'playful', label: 'Playful & Fun' },
    { value: 'elegant', label: 'Elegant & Sophisticated' },
    { value: 'passionate', label: 'Passionate & Bold' },
    { value: 'gentle', label: 'Gentle & Tender' }
  ];

  const messageTemplates = [
    {
      category: 'Sweet & Simple',
      templates: [
        "Every day with you feels like a beautiful dream come true. You make my heart smile in ways I never knew possible.",
        "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my mate.",
        "You are my today and all of my tomorrows. Thank you for being the most amazing part of my life."
      ]
    },
    {
      category: 'Passionate & Deep',
      templates: [
        "My love for you grows stronger with each passing moment. You are not just my partner, you are my everything.",
        "When I look at you, I see the rest of my life in front of my eyes. You complete me in every way possible.",
        "You have painted my life with the most beautiful colors of love, joy, and happiness."
      ]
    },
    {
      category: 'Playful & Fun',
      templates: [
        "You're my favorite notification, my best adventure, and my sweetest distraction all rolled into one!",
        "If loving you is wrong, I don't want to be right. If being with you is a dream, I never want to wake up!",
        "You stole my heart, but I'll let you keep it because you take such good care of it!"
      ]
    }
  ];

  const handleMessageChange = (newMessage) => {
    setMessage(newMessage);
    const words = newMessage?.trim() ? newMessage?.trim()?.split(/\s+/)?.length : 0;
    setWordCount(words);
    
    onMessageUpdate({
      content: newMessage,
      font: selectedFont,
      style: selectedStyle,
      wordCount: words
    });
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
    onMessageUpdate({
      content: message,
      font: font,
      style: selectedStyle,
      wordCount: wordCount
    });
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
    onMessageUpdate({
      content: message,
      font: selectedFont,
      style: style,
      wordCount: wordCount
    });
  };

  const insertTemplate = (template) => {
    setMessage(template);
    handleMessageChange(template);
  };

  const getFontClass = () => {
    const fontClasses = {
      inter: 'font-inter',
      playfair: 'font-playfair',
      dancing: 'font-dancing',
      cursive: 'font-cursive',
      monospace: 'font-mono'
    };
    return fontClasses?.[selectedFont] || 'font-inter';
  };

  const getStyleClass = () => {
    const styleClasses = {
      romantic: 'text-secondary',
      playful: 'text-accent',
      elegant: 'text-foreground',
      passionate: 'text-error',
      gentle: 'text-muted-foreground'
    };
    return styleClasses?.[selectedStyle] || 'text-foreground';
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center">
          <Icon name="PenTool" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-playfair text-xl font-semibold text-foreground">Compose Your Message</h3>
          <p className="text-sm text-muted-foreground">Write from the heart with beautiful typography</p>
        </div>
      </div>
      {/* Typography Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select
          label="Font Style"
          options={fontOptions}
          value={selectedFont}
          onChange={handleFontChange}
          placeholder="Choose typography"
        />
        
        <Select
          label="Message Tone"
          options={styleOptions}
          value={selectedStyle}
          onChange={handleStyleChange}
          placeholder="Select tone"
        />
      </div>
      {/* Message Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Love Message
        </label>
        <textarea
          value={message}
          onChange={(e) => handleMessageChange(e?.target?.value)}
          placeholder="Pour your heart out here... Share what makes your love special, a cherished memory, or simply how they make you feel."
          className="w-full h-40 p-4 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {wordCount} words • Recommended: 50-200 words for optimal impact
          </span>
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {wordCount < 50 ? 'Add more details' : wordCount > 200 ? 'Consider shortening' : 'Perfect length!'}
            </span>
          </div>
        </div>
      </div>
      {/* Live Preview */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Live Preview
        </label>
        <div className="p-6 bg-romantic-gradient rounded-lg border border-primary/20 min-h-[120px]">
          <div className={`${getFontClass()} ${getStyleClass()} leading-relaxed`}>
            {message ? (
              <p className="text-lg">
                {message}
              </p>
            ) : (
              <p className="text-muted-foreground italic">
                Your beautiful message will appear here as you type...
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Message Templates */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-inter font-medium text-foreground">Need Inspiration?</h4>
          <Button
            variant="ghost"
            size="sm"
            iconName="Shuffle"
            iconPosition="left"
            className="text-muted-foreground hover:text-secondary"
          >
            Random Template
          </Button>
        </div>
        
        <div className="space-y-4">
          {messageTemplates?.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h5 className="text-sm font-medium text-muted-foreground mb-2">{category?.category}</h5>
              <div className="grid grid-cols-1 gap-2">
                {category?.templates?.map((template, templateIndex) => (
                  <button
                    key={templateIndex}
                    onClick={() => insertTemplate(template)}
                    className="text-left p-3 bg-background rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <p className="text-sm text-foreground line-clamp-2 group-hover:text-secondary">
                      {template}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Writing Tips */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-inter font-medium text-foreground mb-1">Writing Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be specific about what you love about them</li>
              <li>• Include a shared memory or inside joke</li>
              <li>• Use "you" statements to make it personal</li>
              <li>• End with a future-focused sentiment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;