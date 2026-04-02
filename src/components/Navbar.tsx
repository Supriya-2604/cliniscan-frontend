import React, { useState, useEffect } from 'react';
import { Moon, Sun, Languages, ChevronDown, Activity, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Solutions', href: '#features' },
    { name: 'AI Labs', href: '#capabilities' },
    { name: 'Dashboard', href: '#dashboard' },
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'Hindi' },
    { code: 'TE', name: 'Telugu' },
    { code: 'TA', name: 'Tamil' },
    { code: 'KN', name: 'Kannada' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-lg' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-medical-blue rounded-lg text-white shadow-lg shadow-medical-blue/30">
            <Activity size={20} />
          </div>
          <span className="text-2xl font-black tracking-tight text-medical-dark dark:text-medical-light">
            Clini<span className="text-medical-blue">Scan</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-medical-blue transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Toggles */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center space-x-2">
              <Languages size={18} />
              <span className="text-xs font-black uppercase">{language}</span>
              <ChevronDown size={14} className="opacity-50" />
            </button>
            
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border dark:border-slate-700 overflow-hidden z-20">
               {languages.map(lang => (
                 <button 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`w-full px-4 py-3 text-left text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 border-b last:border-0 dark:border-slate-700 ${language === lang.code ? 'text-medical-blue bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-300'}`}
                >
                   {lang.name}
                 </button>
               ))}
            </div>
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-bold text-slate-700 dark:text-slate-200 hover:text-medical-blue"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 px-4 py-3 border-t dark:border-slate-800 mt-2">
                <span className="text-sm text-slate-500">Language</span>
                <Globe size={18} className="text-slate-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
