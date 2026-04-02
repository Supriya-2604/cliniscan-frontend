import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Play, Shield, Zap, Search } from 'lucide-react';
import heroXray from '../assets/hero_xray.png';

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title = "Advanced Chest X-ray Analysis", 
  subtitle = "Empowering healthcare professionals with real-time AI diagnostics." 
}) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50/50 dark:bg-blue-900/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-2/3 bg-emerald-50/50 dark:bg-emerald-900/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-medical-blue/10 text-medical-blue text-sm font-semibold mb-6">
              <Zap size={16} />
              <span>AI-Powered Diagnostics</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8">
              {title.includes('Analysis') ? (
                <>
                  {title.split('Analysis')[0]}
                  <span className="text-medical-blue italic font-serif">Analysis</span>
                </>
              ) : title}
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-medical-blue text-white rounded-2xl font-bold shadow-lg shadow-medical-blue/30 hover:bg-blue-700 transition-all"
              >
                <Upload size={20} />
                <span>Upload X-ray</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                <Play size={20} className="fill-current" />
                <span>View Demo</span>
              </motion.button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { icon: Shield, label: "99% Precision", color: "text-blue-500" },
                { icon: Search, label: "Grad-CAM AI", color: "text-emerald-500" },
                { icon: Activity, label: "Real-time", color: "text-purple-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start">
                  <item.icon size={24} className={`${item.color} mb-2`} />
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Animated Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img 
                src={heroXray} 
                alt="AI Chest X-ray Visualization" 
                className="w-full h-auto object-cover"
              />
              {/* Dynamic Scanning Line */}
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-1 bg-medical-blue/60 shadow-[0_0_15px_rgba(37,99,235,0.8)] z-20 pointer-events-none"
              />
              {/* Pulsing AI Overlays */}
              <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay animate-pulse" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-medical-blue/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            
            {/* Floating Info Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-20 -left-6 glass p-4 rounded-2xl shadow-xl border dark:border-slate-700 z-30"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Processing Rate</p>
                  <p className="text-sm font-bold">128 ms / Scan</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple Activity component since it's not imported directly from lucide-react but used in mapping
const Activity: React.FC<{ size?: number, className?: string }> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default Hero;
