'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Sparkles, Globe,  Zap } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check for dark mode preference
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                    document.body.classList.contains('bg-gray-900') ||
                    window.getComputedStyle(document.body).backgroundColor === 'rgb(17, 24, 39)';
      setDarkMode(isDark);
    };

    // Initial check
    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    {
    href: 'https://trend-wise-flax.vercel.app/',
    label: 'Newsletter',
    external: true, // 👈 Add this flag to open in new tab
  },
  ];

  const themeClasses = {
    // Main navbar background
    navBg: darkMode 
      ? (scrolled ? 'bg-gray-900/90 border-gray-700/50' : 'bg-gray-800/95 border-gray-700/30')
      : (scrolled ? 'bg-white/90 border-white/20' : 'bg-white/95 border-white/10'),
    
    // Text colors
    primaryText: darkMode ? 'text-white' : 'text-gray-900',
    secondaryText: darkMode ? 'text-gray-300' : 'text-gray-700',
    
    // Logo gradient
    logoGradient: darkMode 
      ? 'from-emerald-400 to-cyan-400'
      : 'from-emerald-600 to-teal-600',
    
    // Logo background
    logoBg: darkMode 
      ? 'from-emerald-500 to-cyan-500'
      : 'from-emerald-500 to-teal-600',
    
    // Active link
    activeLink: darkMode
      ? 'text-white bg-gradient-to-r from-emerald-500 to-cyan-500'
      : 'text-white bg-gradient-to-r from-emerald-500 to-teal-600',
    
    // Hover effects
    hoverEffect: darkMode
      ? 'hover:text-emerald-400 hover:bg-gradient-to-r hover:from-emerald-900/30 hover:to-cyan-900/30'
      : 'hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50',
    
    // Dropdown
    dropdownBg: darkMode
      ? 'bg-gray-800/95 border-gray-700/50'
      : 'bg-white/95 border-gray-200/50',
    
    // Mobile menu
    mobileBg: darkMode
      ? 'bg-gray-900/95 border-gray-700/50'
      : 'bg-white/95 border-gray-200/50',
    
    // Accent colors
    accentPrimary: darkMode ? 'bg-emerald-400' : 'bg-emerald-500',
    accentSecondary: darkMode ? 'bg-cyan-400' : 'bg-teal-500',
  };

  return (
    <>
      {/* Floating Container */}
      <div className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto">
        <header className={cn(
          'transition-all duration-700 ease-out rounded-2xl shadow-2xl backdrop-blur-2xl border transform',
          themeClasses.navBg,
          scrolled 
            ? 'shadow-black/20 scale-[0.98] translate-y-1' 
            : 'shadow-black/10 scale-100 translate-y-0',
          darkMode && 'shadow-black/40'
        )}>
          {/* Animated background glow */}
          <div className={cn(
            'absolute inset-0 rounded-2xl transition-all duration-700',
            darkMode 
              ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10'
              : 'bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5'
          )}></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'absolute w-1 h-1 rounded-full animate-pulse',
                  darkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                )}
                style={{
                  left: `${20 + i * 30}%`,
                  top: '50%',
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${2 + i * 0.5}s`,
                  opacity: 0.6
                }}
              />
            ))}
          </div>

          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Enhanced Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Glow effect */}
                  <div className={cn(
                    'absolute inset-0 rounded-xl blur-md transition-all duration-500 group-hover:blur-lg',
                    `bg-gradient-to-br ${themeClasses.logoBg}`,
                    'opacity-60 group-hover:opacity-80'
                  )}></div>
                  
                  {/* Main logo container */}
                  <div className={cn(
                    'relative w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center',
                    'shadow-xl group-hover:shadow-2xl transition-all duration-500',
                    'group-hover:scale-110 group-hover:rotate-6',
                    themeClasses.logoBg
                  )}>
                    <Sparkles className="w-6 h-6 text-white animate-pulse group-hover:animate-spin" />
                  </div>
                  
                  {/* Animated indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                  
                  {/* Lightning effect */}
                  <Zap className="absolute -bottom-1 -left-1 w-3 h-3 text-yellow-400 animate-bounce opacity-80" />
                </div>
                
                <div className="flex flex-col">
                  <span className={cn(
                    'text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
                    'group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-500',
                    themeClasses.logoGradient
                  )}>
                    GDG MAIT
                  </span>
                  <span className={cn(
                    'text-xs font-medium opacity-60 transition-all duration-300',
                    themeClasses.secondaryText
                  )}>
                    Community Hub
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-500 group overflow-hidden',
                        isActive ? themeClasses.activeLink : themeClasses.hoverEffect
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Animated background */}
                      <div className={cn(
                        'absolute inset-0 transition-all duration-500 rounded-xl',
                        isActive 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 opacity-100' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-20'
                      )}></div>
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700"></div>
                      
                      <span className="relative z-10 flex items-center gap-2">
                        {link.label}
                        {isActive && <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>}
                      </span>
                    </Link>
                  );
                })}

                {/* Enhanced Societies Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-500 group overflow-hidden',
                      dropdownOpen ? themeClasses.activeLink : themeClasses.hoverEffect
                    )}
                  >
                    {/* Animated background */}
                    <div className={cn(
                      'absolute inset-0 transition-all duration-500 rounded-xl',
                      dropdownOpen 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 opacity-100' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-20'
                    )}></div>
                    
                    <Globe className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Societies</span>
                    <ChevronDown className={cn(
                      'w-4 h-4 relative z-10 transition-all duration-300',
                      dropdownOpen && 'rotate-180'
                    )} />
                  </button>

                  {/* Enhanced Dropdown */}
                  {dropdownOpen && (
                    <div className={cn(
                      'absolute top-full right-0 mt-3 w-64 backdrop-blur-2xl shadow-2xl border rounded-2xl overflow-hidden',
                      'animate-in slide-in-from-top-2 duration-500',
                      themeClasses.dropdownBg
                    )}>
                      {/* Glow effect */}
                      <div className={cn(
                        'absolute inset-0 bg-gradient-to-r opacity-10 rounded-2xl',
                        darkMode 
                          ? 'from-emerald-500 to-cyan-500'
                          : 'from-emerald-500 to-teal-600'
                      )}></div>
                      
                      <div className="relative p-3 space-y-1">
                        <div className={cn(
                          'text-xs font-bold uppercase tracking-wider px-3 py-2',
                          themeClasses.secondaryText
                        )}>
                          Society Portal
                        </div>
                        
                        {[
                          { href: '/society/login', label: 'Login', icon: '🔐' },
                          { href: '/society/login', label: 'Register', icon: '🚀' }
                        ].map((item, index) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              'flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl',
                              'transition-all duration-300 group relative overflow-hidden',
                              themeClasses.hoverEffect
                            )}
                            onClick={() => setDropdownOpen(false)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
                            
                            <div className={cn(
                              'w-2 h-2 rounded-full group-hover:animate-pulse transition-all duration-300',
                              index === 0 ? themeClasses.accentPrimary : themeClasses.accentSecondary
                            )}></div>
                            
                            <span className="flex-1 relative z-10">{item.label}</span>
                            <span className="text-lg relative z-10 group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  'md:hidden p-3 rounded-xl transition-all duration-300 group relative overflow-hidden',
                  themeClasses.hoverEffect
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-xl"></div>
                <div className="relative z-10">
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 rotate-90 group-hover:rotate-180 transition-transform duration-300" />
                  ) : (
                    <Menu className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 md:hidden">
          <div className={cn(
            'backdrop-blur-2xl shadow-2xl border rounded-2xl overflow-hidden',
            'animate-in slide-in-from-top-4 duration-500',
            themeClasses.mobileBg
          )}>
            {/* Glow effect */}
            <div className={cn(
              'absolute inset-0 bg-gradient-to-r opacity-5 rounded-2xl',
              darkMode 
                ? 'from-emerald-500 to-cyan-500'
                : 'from-emerald-500 to-teal-600'
            )}></div>
            
            <div className="relative p-6 space-y-2">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 group relative overflow-hidden',
                      isActive ? themeClasses.activeLink : themeClasses.hoverEffect
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={cn(
                      'absolute inset-0 transition-all duration-500 rounded-xl',
                      isActive 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 opacity-100' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-20'
                    )}></div>
                    
                    <span className="relative z-10 flex items-center gap-2">
                      {link.label}
                      {isActive && <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>}
                    </span>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200/20">
                <div className={cn(
                  'text-xs font-bold uppercase tracking-wider px-4 py-2 mb-2',
                  themeClasses.secondaryText
                )}>
                  Society Portal
                </div>
                
                {[
                  { href: '/society/login', label: 'Society Login', icon: '🔐' },
                  { href: '/society/login', label: 'Society Register', icon: '🚀' }
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl',
                      'transition-all duration-300 group relative overflow-hidden',
                      themeClasses.hoverEffect
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-10 transition-all duration-300 rounded-xl"></div>
                    
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {(dropdownOpen || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setDropdownOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}

      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  );
}