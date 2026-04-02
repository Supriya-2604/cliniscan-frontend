import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileSearch, Brain, Eye, FileText, ArrowRight } from 'lucide-react';

interface SolutionProps {
  title?: string;
}

const Solution: React.FC<SolutionProps> = ({ 
  title = "Our AI-driven system ensures accurate, explainable, and fast diagnosis" 
}) => {
  const steps = [
    {
      title: "Image Upload",
      description: "Securely upload DICOM or JPG X-ray images for analysis.",
      icon: Upload,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Preprocessing",
      description: "Automated enhancement using OpenCV to ensure high visibility.",
      icon: FileSearch,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "AI Analysis",
      description: "ResNet-50 & YOLO models predict abnormalities with 99% precision.",
      icon: Brain,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: "Grad-CAM AI",
      description: "Visual heatmaps highlight specific regions indicating diseases.",
      icon: Eye,
      color: "text-rose-600",
      bg: "bg-rose-100 dark:bg-rose-900/30",
    },
    {
      title: "Smart Report",
      description: "Instant generation of professional diagnostic PDF reports.",
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative">
           <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 relative z-10"
           >
              {title}
           </motion.h2>
          <div className="w-20 h-1.5 bg-medical-blue mx-auto rounded-full" />
        </div>

        {/* 5-Step Process Cards */}
        <div className="relative grid md:grid-cols-5 gap-6 mb-24">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 ${step.bg} rounded-3xl flex items-center justify-center ${step.color} mb-6 transition-transform group-hover:scale-110 shadow-lg`}>
                  <step.icon size={36} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 translate-x-1/2 z-10 text-slate-300 dark:text-slate-700">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Workflow Diagram (Simplified Visual) */}
        <div className="mt-16 p-8 lg:p-12 glass rounded-[3rem] shadow-2xl border dark:border-slate-800">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Activity size={24} className="text-medical-blue" />
                Workflow Pipeline
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Data Input", sub: "X-ray Imaging Modalities", percent: 100 },
                  { label: "Feature Extraction", sub: "Deep Convolutional Neural Nets", percent: 85 },
                  { label: "Abnormality Mapping", sub: "Gradient-weighted Class Activation", percent: 92 }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                      <span className="text-xs text-slate-400 font-medium italic">{item.sub}</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-medical-blue shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ rotateY: 20, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-2xl bg-slate-900 border-4 border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center"
            >
               {/* Minimalist Workflow UI Placeholder */}
               <div className="absolute inset-0 flex items-center justify-center space-x-4">
                  {[1, 2, 3].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: ["20%", "60%", "20%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className="w-12 bg-medical-blue/30 rounded-t-lg border-t-2 border-medical-blue"
                    />
                  ))}
               </div>
               <div className="text-white/20 font-mono text-xs p-4 flex flex-col justify-end w-full h-full">
                  <p>{">"} INITIALIZING SEQUENCE...</p>
                  <p>{">"} LOADING WEIGHTS (RESNET50)...</p>
                  <p>{">"} PIPELINE READY.</p>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Activity: React.FC<{ size?: number, className?: string }> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default Solution;
