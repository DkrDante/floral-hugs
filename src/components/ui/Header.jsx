import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage-romantic-digital-gifting-platform', icon: 'Heart' },
    { name: 'Gift Gallery', path: '/gift-gallery-interactive-catalog', icon: 'Gift' },
    { name: 'Love Story Builder', path: '/love-story-builder-personalization-studio', icon: 'PenTool' },
    { name: 'Moment Scheduler', path: '/moment-scheduler-delivery-experience', icon: 'Calendar' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-romantic">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/homepage-romantic-digital-gifting-platform" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center shadow-romantic group-hover:animate-bloom transition-all duration-300">
                  <Icon name="Heart" size={20} className="text-secondary" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-gentle"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-playfair text-2xl font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">
                  Floral Hugs
                </h1>
                <p className="font-dancing text-sm text-muted-foreground -mt-1">Love Made Tangible</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-inter font-medium transition-all duration-300 hover:bg-primary/10 hover:text-secondary group ${
                  isActivePath(item?.path)
                    ? 'text-secondary bg-primary/20 shadow-romantic'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={`transition-all duration-300 group-hover:animate-bloom ${
                    isActivePath(item?.path) ? 'text-secondary' : 'text-muted-foreground group-hover:text-secondary'
                  }`} 
                />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="User"
              iconPosition="left"
              className="text-muted-foreground hover:text-secondary border-border hover:border-secondary/30"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Heart"
              iconPosition="left"
              className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300 animate-pulse-gentle"
            >
              Send Love Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-muted-foreground hover:text-secondary"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card/95 backdrop-blur-sm border-t border-border shadow-romantic-lg">
            <div className="px-4 py-6 space-y-4">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-inter font-medium transition-all duration-300 hover:bg-primary/10 hover:text-secondary group ${
                    isActivePath(item?.path)
                      ? 'text-secondary bg-primary/20 shadow-romantic'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={`transition-all duration-300 group-hover:animate-bloom ${
                      isActivePath(item?.path) ? 'text-secondary' : 'text-muted-foreground group-hover:text-secondary'
                    }`} 
                  />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {/* Mobile CTAs */}
              <div className="pt-4 space-y-3 border-t border-border">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="User"
                  iconPosition="left"
                  className="text-muted-foreground hover:text-secondary border-border hover:border-secondary/30"
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Heart"
                  iconPosition="left"
                  className="bg-romantic-gradient-dark hover:shadow-romantic-lg transition-all duration-300 animate-pulse-gentle"
                >
                  Send Love Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-8 right-1/3 w-1.5 h-1.5 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-6 right-1/4 w-1 h-1 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
    </header>
  );
};

export default Header;