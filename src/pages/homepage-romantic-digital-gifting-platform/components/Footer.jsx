import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Gift Gallery', path: '/gift-gallery-interactive-catalog' },
      { name: 'Love Story Builder', path: '/love-story-builder-personalization-studio' },
      { name: 'Moment Scheduler', path: '/moment-scheduler-delivery-experience' },
      { name: 'Romance Academy', path: '#' }
    ],
    support: [
      { name: 'Help Center', path: '#' },
      { name: 'Contact Us', path: '#' },
      { name: 'Gift Guide', path: '#' },
      { name: 'Delivery Info', path: '#' }
    ],
    company: [
      { name: 'About Us', path: '#' },
      { name: 'Our Story', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Press Kit', path: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
      { name: 'Refund Policy', path: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', url: '#', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: 'Facebook', url: '#', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { name: 'Pinterest', icon: 'Heart', url: '#', color: 'hover:text-red-500' },
    { name: 'YouTube', icon: 'Play', url: '#', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/homepage-romantic-digital-gifting-platform" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-romantic-gradient rounded-full flex items-center justify-center shadow-romantic group-hover:animate-bloom transition-all duration-300">
                  <Icon name="Heart" size={24} className="text-secondary" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse-gentle"></div>
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">
                  Floral Hugs
                </h3>
                <p className="font-dancing text-sm text-muted-foreground -mt-1">Love Made Tangible</p>
              </div>
            </Link>
            
            <p className="font-inter text-muted-foreground leading-relaxed">
              Transforming feelings into beautiful digital experiences that touch hearts across any distance. 
              Creating magical romantic moments, one gift at a time.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-primary" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span>Award Winning</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-inter font-semibold text-foreground mb-4">Follow Our Love Story</h4>
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    className={`w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-romantic ${social?.color}`}
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="font-inter font-semibold text-foreground">Platform</h4>
            <ul className="space-y-3">
              {footerLinks?.platform?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className="font-inter text-muted-foreground hover:text-secondary transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <Icon name="ArrowRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-inter font-semibold text-foreground">Support</h4>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className="font-inter text-muted-foreground hover:text-secondary transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <Icon name="ArrowRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-inter font-semibold text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className="font-inter text-muted-foreground hover:text-secondary transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <Icon name="ArrowRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-inter font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className="font-inter text-muted-foreground hover:text-secondary transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <Icon name="ArrowRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Newsletter Section */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-playfair text-2xl font-bold text-foreground mb-2">
                Stay Connected to Love
              </h4>
              <p className="font-inter text-muted-foreground">
                Get romantic inspiration, relationship tips, and exclusive gift ideas delivered to your inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-romantic-gradient-dark text-white rounded-xl font-inter font-semibold hover:shadow-romantic-lg transition-all duration-300 flex items-center space-x-2">
                <Icon name="Mail" size={18} />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <p className="font-inter">
                © {currentYear} Floral Hugs. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>Made with ❤️ worldwide</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-success" />
                <span>50,000+ Happy Couples</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} className="text-error" />
                <span>2M+ Gifts Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-32 right-20 w-1.5 h-1.5 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-16 left-1/3 w-1 h-1 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '6s' }}></div>
      </div>
    </footer>
  );
};

export default Footer;