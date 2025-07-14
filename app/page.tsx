'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {Calendar,Users,Trophy,ArrowRight,Star,BookOpen,Target,Globe,Moon,Sun,ChevronDown,Sparkles,Zap,Heart,Award} from 'lucide-react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

 

  const stats = [
    { number: "50+", label: "Active Societies", icon: Users, color: "from-emerald-500 to-teal-600" },
    { number: "500+", label: "Events Hosted", icon: Calendar, color: "from-blue-500 to-cyan-600" },
    { number: "10K+", label: "Students Connected", icon: Target, color: "from-indigo-500 to-purple-600" },
    { number: "95%", label: "Satisfaction Rate", icon: Star, color: "from-green-500 to-emerald-600" }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Event Management",
      description: "Create, manage, and promote events with our intuitive platform designed for seamless organization",
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      darkBgColor: "from-emerald-900/20 to-teal-900/20"
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Connect with like-minded peers and build lasting relationships that extend beyond college",
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      darkBgColor: "from-blue-900/20 to-cyan-900/20"
    },
    {
      icon: Trophy,
      title: "Competitions & Awards",
      description: "Participate in competitions and showcase your talents on a platform built for winners",
      gradient: "from-indigo-500 to-purple-600",
      bgColor: "from-indigo-50 to-purple-50",
      darkBgColor: "from-indigo-900/20 to-purple-900/20"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access workshops, seminars, and educational content curated by industry experts",
      gradient: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      darkBgColor: "from-green-900/20 to-emerald-900/20"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "CSE '24",
      content: "This platform has revolutionized how I discover and participate in college events. The interface is intuitive and the community is amazing!",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Arjun Patel",
      role: "President, Tech Society",
      content: "Managing our society events has never been easier. The analytics dashboard and participant management features are game-changing.",
      rating: 5,
      avatar: "AP"
    },
    {
      name: "Sneha Gupta",
      role: "IT '23",
      content: "I've attended over 20 events through this platform. The quality of events and seamless organization consistently exceed expectations.",
      rating: 5,
      avatar: "SG"
    }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const themeClasses = {
    bg: darkMode ? 'bg-gray-900' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    cardBorder: darkMode ? 'border-gray-700' : 'border-gray-200',
    sectionBg: darkMode ? 'bg-gray-800' : 'bg-gray-50',
    gradientBg: darkMode ? 'from-gray-800 to-gray-900' : 'from-gray-50 to-gray-100'
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.bg}`}>
      <Navbar />
      
       {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
            darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-900 text-white'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
     

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
            : 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600'
        }`}></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-60`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
          
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-yellow-400 font-semibold text-lg">Welcome to the Future</span>
              <Sparkles className="w-8 h-8 text-yellow-400 ml-2 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Connect with
              <span className="block bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                GDG MAIT
              </span>
              Community
            </h1>
            
            <p className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-4xl mx-auto leading-relaxed">
              The official hub for MAIT college societies and students to connect, create, and celebrate together. 
              Join thousands of students in building the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/student/login" className="group">
              <button className="group bg-white text-teal-600 px-8 py-4 rounded-2xl font-semibold hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105">
                <Users size={20} className="group-hover:animate-bounce" />
                <span>Join as Student</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
              <Link href="/society/login" className="group">
              <button className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-2xl transform hover:-translate-y-2">
                <Globe size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Register your Society</span>
              </button>
              </Link>
            </div>

            {/* Features Preview */}
            <div className="flex flex-wrap justify-center gap-6 opacity-80">
              {[
                { icon: Zap, text: "Lightning Fast" },
                { icon: Heart, text: "Community Driven" },
                { icon: Award, text: "Award Winning" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <item.icon size={16} className="animate-pulse" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 opacity-80">Scroll to explore</span>
            <ChevronDown size={24} className="animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 transition-all duration-500 bg-gradient-to-r ${themeClasses.gradientBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.text}`}>
              Trusted by Thousands
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary}`}>
              Join a thriving community of learners and leaders
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className={`${themeClasses.cardBg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border ${themeClasses.cardBorder} hover:border-teal-300`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-4xl font-bold mb-2 ${themeClasses.text}`}>{stat.number}</div>
                  <div className={`font-medium ${themeClasses.textSecondary}`}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 transition-all duration-500 ${themeClasses.bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${themeClasses.text}`}>
              Why Choose Our Platform?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${themeClasses.textSecondary}`}>
              Experience the next generation of event management and community building with cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group cursor-pointer h-full"
              >
                <div className={`${themeClasses.cardBg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border ${themeClasses.cardBorder} hover:border-teal-300 transform hover:-translate-y-3 hover:rotate-1 h-full flex flex-col`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${themeClasses.text} group-hover:text-teal-600 transition-colors`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed flex-1 ${themeClasses.textSecondary}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 transition-all duration-500 ${themeClasses.sectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${themeClasses.text}`}>
              What Our Community Says
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${themeClasses.textSecondary}`}>
              Join thousands of satisfied students and societies who have transformed their college experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border ${themeClasses.cardBorder} hover:border-teal-300 group cursor-pointer`}
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current group-hover:animate-pulse" />
                  ))}
                </div>
                <p className={`mb-6 italic leading-relaxed text-lg ${themeClasses.textSecondary}`}>
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className={`font-bold text-lg ${themeClasses.text}`}>{testimonial.name}</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.3
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join the MAIT community today and discover amazing opportunities that will shape your future
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-white text-teal-600 px-10 py-5 rounded-2xl font-bold hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105">
              <Calendar size={24} className="group-hover:animate-bounce" />
              <span>Browse Events</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="group bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-teal-600 transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-2xl transform hover:-translate-y-2">
              <Users size={24} className="group-hover:rotate-12 transition-transform" />
              <span>Explore Societies</span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}