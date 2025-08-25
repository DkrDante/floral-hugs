import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RomanceAcademy = () => {
  const academyContent = [
    {
      id: 1,
      title: "Understanding Love Languages in Digital Age",
      description: "Discover how to express the five love languages through digital gifts and create deeper connections with your partner",
      category: "Love Psychology",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=250&fit=crop&crop=center",
      author: "Dr. Sarah Chen",
      authorTitle: "Relationship Therapist",
      publishDate: "2 days ago",
      tags: ["Love Languages", "Digital Romance", "Psychology"]
    },
    {
      id: 2,
      title: "Long-Distance Relationship Survival Guide",
      description: "Expert tips and digital tools to maintain intimacy and connection when miles apart from your loved one",
      category: "Relationship Tips",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=250&fit=crop&crop=center",
      author: "Michael Torres",
      authorTitle: "Couples Coach",
      publishDate: "1 week ago",
      tags: ["Long Distance", "Communication", "Digital Tools"]
    },
    {
      id: 3,
      title: "Creative Date Ideas for Every Season",
      description: "Seasonal romantic activities and digital experiences to keep the spark alive throughout the year",
      category: "Date Ideas",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop&crop=center",
      author: "Emma Rodriguez",
      authorTitle: "Romance Expert",
      publishDate: "3 days ago",
      tags: ["Date Ideas", "Seasonal", "Creativity"]
    }
  ];

  const quickTips = [
    {
      icon: "MessageCircle",
      title: "Daily Love Notes",
      tip: "Send a small digital surprise every morning to start their day with a smile"
    },
    {
      icon: "Calendar",
      title: "Milestone Reminders",
      tip: "Never forget important dates with our automated anniversary and special occasion alerts"
    },
    {
      icon: "Heart",
      title: "Random Acts of Love",
      tip: "Surprise them with unexpected gifts on ordinary days to show you're thinking of them"
    },
    {
      icon: "Users",
      title: "Shared Experiences",
      tip: "Create digital date nights and shared activities to bond over common interests"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground">
            Romance
            <span className="block text-secondary">Academy</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guidance and insights to help you nurture deeper connections and create lasting romantic memories
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Articles */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-playfair text-2xl font-bold text-foreground">Latest Articles</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                className="text-secondary hover:text-secondary/80"
              >
                View All
              </Button>
            </div>

            <div className="space-y-6">
              {academyContent?.map((article) => (
                <article key={article?.id} className="bg-card rounded-2xl overflow-hidden shadow-romantic hover:shadow-romantic-lg transition-all duration-300 group">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Article Image */}
                    <div className="md:col-span-1">
                      <div className="aspect-[4/3] md:aspect-square relative overflow-hidden">
                        <Image
                          src={article?.image}
                          alt={article?.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-romantic-gradient/10"></div>
                        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-inter font-medium">
                          {article?.category}
                        </div>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="md:col-span-2 p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-playfair text-xl font-bold text-foreground group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                            {article?.title}
                          </h4>
                          <p className="font-inter text-muted-foreground mt-2 line-clamp-2">
                            {article?.description}
                          </p>
                        </div>

                        {/* Article Meta */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Icon name="User" size={14} />
                              <span>{article?.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="Clock" size={14} />
                              <span>{article?.readTime}</span>
                            </div>
                          </div>
                          <span>{article?.publishDate}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {article?.tags?.map((tag, index) => (
                            <span key={index} className="bg-muted/50 text-muted-foreground px-2 py-1 rounded-lg text-xs font-inter">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Quick Tips Sidebar */}
          <div className="space-y-8">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-6">Quick Romance Tips</h3>
              <div className="space-y-4">
                {quickTips?.map((tip, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 shadow-romantic hover:shadow-romantic-lg transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:animate-bloom transition-all duration-300">
                        <Icon name={tip?.icon} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-inter font-semibold text-foreground mb-2">{tip?.title}</h4>
                        <p className="font-inter text-sm text-muted-foreground">{tip?.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-romantic-gradient rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Mail" size={24} className="text-secondary" />
              </div>
              <div>
                <h4 className="font-playfair text-xl font-bold text-foreground mb-2">Weekly Love Tips</h4>
                <p className="font-inter text-sm text-muted-foreground">
                  Get expert relationship advice delivered to your inbox every week
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                className="bg-white text-secondary hover:bg-white/90"
              >
                Subscribe Now
              </Button>
            </div>

            {/* Popular Topics */}
            <div>
              <h4 className="font-playfair text-xl font-bold text-foreground mb-4">Popular Topics</h4>
              <div className="space-y-2">
                {[
                  "Anniversary Ideas",
                  "Long Distance Love",
                  "Digital Romance",
                  "Surprise Planning",
                  "Love Languages",
                  "Relationship Goals"
                ]?.map((topic, index) => (
                  <button key={index} className="w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors duration-300 font-inter">
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Academy CTA */}
        <div className="bg-card rounded-3xl p-8 lg:p-12 text-center shadow-romantic-lg">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-romantic-gradient rounded-full flex items-center justify-center mx-auto">
              <Icon name="BookOpen" size={32} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-playfair text-3xl font-bold text-foreground mb-4">
                Become a Romance Expert
              </h3>
              <p className="font-inter text-lg text-muted-foreground">
                Join thousands of couples who have transformed their relationships with our comprehensive guides, expert tips, and personalized advice
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300"
              >
                Explore All Articles
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Users"
                iconPosition="left"
                className="text-secondary border-secondary/30 hover:border-secondary hover:bg-secondary/10"
              >
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RomanceAcademy;