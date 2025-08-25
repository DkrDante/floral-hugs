import React, { useState } from 'react';
import { Copy, Star, Edit, Trash2, Plus, Filter } from 'lucide-react';

const SavedTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 12 },
    { id: 'messages', name: 'Messages', count: 5 },
    { id: 'gifts', name: 'Gift Ideas', count: 4 },
    { id: 'dates', name: 'Date Plans', count: 3 }
  ];

  const templates = [
    {
      id: 1,
      title: 'Good Morning Sunshine',
      category: 'messages',
      type: 'Message Template',
      content: 'Good morning beautiful! I hope your day is as amazing as your smile. Thinking of you ☀️💕',
      usedCount: 8,
      lastUsed: '2 days ago',
      rating: 5,
      tags: ['morning', 'sweet', 'daily']
    },
    {
      id: 2,
      title: 'Comfort Care Package',
      category: 'gifts',
      type: 'Gift Template',
      content: 'Tea collection + cozy blanket + handwritten note + her favorite snacks + calming playlist',
      usedCount: 3,
      lastUsed: '1 week ago',
      rating: 5,
      tags: ['comfort', 'care', 'thoughtful']
    },
    {
      id: 3,
      title: 'Virtual Museum Date',
      category: 'dates',
      type: 'Date Plan',
      content: 'Online museum tour + wine tasting kit + art discussion + create art together + share interpretations',
      usedCount: 2,
      lastUsed: '2 weeks ago',
      rating: 4,
      tags: ['virtual', 'culture', 'creative']
    },
    {
      id: 4,
      title: 'Apology & Make-up',
      category: 'messages',
      type: 'Message Template',
      content: 'I\'m sorry for [specific issue]. I understand how that made you feel, and I want to do better. How can I make this right?',
      usedCount: 1,
      lastUsed: '3 weeks ago',
      rating: 4,
      tags: ['apology', 'sincere', 'relationship']
    },
    {
      id: 5,
      title: 'Surprise Delivery Box',
      category: 'gifts',
      type: 'Gift Template',
      content: 'Flowers + favorite dessert + personalized note + small meaningful item + playlist QR code',
      usedCount: 6,
      lastUsed: '5 days ago',
      rating: 5,
      tags: ['surprise', 'delivery', 'multi-item']
    },
    {
      id: 6,
      title: 'Weekly Check-in',
      category: 'messages',
      type: 'Message Template',
      content: 'How has your week been, love? What\'s been the highlight? What can I do to support you better?',
      usedCount: 12,
      lastUsed: '1 day ago',
      rating: 5,
      tags: ['check-in', 'support', 'weekly']
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates?.filter(template => template?.category === selectedCategory);

  const getTypeColor = (type) => {
    switch (type) {
      case 'Message Template':
        return 'bg-blue-100 text-blue-800';
      case 'Gift Template':
        return 'bg-purple-100 text-purple-800';
      case 'Date Plan':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-accent fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-romantic">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-playfair font-bold text-card-foreground">
          Saved Templates
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create
        </button>
      </div>
      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {templateCategories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category?.id
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category?.name}
            <span className="ml-2 text-xs opacity-70">({category?.count})</span>
          </button>
        ))}
      </div>
      {/* Templates Grid */}
      <div className="grid gap-4">
        {filteredTemplates?.map((template) => (
          <div
            key={template?.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">
                  {template?.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(template?.type)}`}>
                    {template?.type}
                  </span>
                  <div className="flex items-center gap-1">
                    {renderStars(template?.rating)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button className="p-1 text-muted-foreground hover:text-card-foreground transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {template?.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {template?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-background text-muted-foreground px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Used {template?.usedCount} times</span>
                <span>Last used {template?.lastUsed}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="text-xs text-secondary hover:text-secondary/80 font-medium">
                  Edit
                </button>
                <button className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded text-xs font-medium hover:bg-opacity-90 transition-colors">
                  <Copy className="w-3 h-3" />
                  Use Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Create Template Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-xl p-6 max-w-md w-full mx-6">
            <h3 className="text-xl font-playfair font-bold text-card-foreground mb-4">
              Create New Template
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  Template Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Anniversary Message"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="messages">Message Template</option>
                  <option value="gifts">Gift Template</option>
                  <option value="dates">Date Plan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  Content
                </label>
                <textarea
                  placeholder="Write your template content..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., romantic, special, surprise"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 border border-secondary text-secondary px-4 py-2 rounded-lg font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h4 className="text-lg font-bold text-card-foreground">{templates?.length}</h4>
            <p className="text-xs text-muted-foreground">Templates</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-card-foreground">
              {templates?.reduce((sum, template) => sum + template?.usedCount, 0)}
            </h4>
            <p className="text-xs text-muted-foreground">Times Used</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-card-foreground">4.8</h4>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedTemplates;