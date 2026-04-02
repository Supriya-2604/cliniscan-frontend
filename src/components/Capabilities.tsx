import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Eye, Languages, FileDown, Smartphone, WifiOff } from 'lucide-react';

interface CapabilitiesProps {
  title?: string;
}

const Capabilities: React.FC<CapabilitiesProps> = ({ 
  title = "Powerful AI Capabilities" 
}) => {
  const features = [
    { name: "Real-time Prediction", icon: Zap, desc: "Instant chest X-ray analysis with sub-second latency.", color: "text-blue-500" },
    { name: "High Accuracy Classification", icon: Target, desc: "ResNet-50 driven precision for 6+ pulmonary conditions.", color: "text-emerald-500" },
    { name: "Explainable AI (Grad-CAM)", icon: Eye, desc: "Visual transparency showing exactly why AI made a prediction.", color: "text-rose-500" },
    { name: "Multi-language Support", icon: Languages, desc: "Built-in support for English, Hindi, Telugu, and more.", color: "text-purple-500" },
    { name: "PDF Report Export", icon: FileDown, desc: "Generate professional medical-standard PDF reports instantly.", color: "text-indigo-500" },
    { name: "Mobile-friendly Usage", icon: Smartphone, desc: "Responsive design optimized for doctors on the move.", color: "text-amber-500" },
    { name: "Offline Support (PWA)", icon: WifiOff, desc: "Analyze images even with limited or no internet connection.", color: "text-slate-500" }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
              Our platform combines state-of-the-art deep learning with clinical interpretability to provide the most reliable diagnostic support.
            </p>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border dark:border-slate-700 shadow-xl overflow-hidden relative">
              <div className="flex items-center space-x-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">System Status: Online</span>
              </div>
              <div className="h-24 flex items-end space-x-1">
                {[40, 70, 45, 90, 65, 80, 50, 85, 60].map((h, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [`${h}%`, `${h+10}%`, `${h}%`] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="flex-1 bg-medical-blue/20 rounded-t-sm"
                  />
                ))}
              </div>
              <div className="absolute top-0 right-0 p-4">
                <Target size={40} className="text-slate-100 dark:text-slate-700 rotate-12" />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="p-5 flex items-start space-x-4 glass group rounded-2xl border-transparent hover:border-medical-blue/30 transition-all cursor-default"
              >
                <div className={`mt-1 p-2 rounded-lg ${feature.color} bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform`}>
                  <feature.icon size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{feature.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
