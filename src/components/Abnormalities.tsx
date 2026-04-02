import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Thermometer, ShieldAlert, FileWarning, CheckCircle } from 'lucide-react';

interface AbnormalitiesProps {
  title?: string;
}

const Abnormalities: React.FC<AbnormalitiesProps> = ({ 
  title = "Comprehensive Disease Detection" 
}) => {
  const conditions = [
    { title: "Pneumonia", icon: Thermometer, color: "text-rose-600", bg: "bg-rose-50", darkBg: "dark:bg-rose-900/10" },
    { title: "Tuberculosis", icon: Activity, color: "text-amber-600", bg: "bg-amber-50", darkBg: "dark:bg-amber-900/10" },
    { title: "Lung Opacity", icon: ShieldAlert, color: "text-blue-600", bg: "bg-blue-50", darkBg: "dark:bg-blue-900/10" },
    { title: "COVID-19", icon: FileWarning, color: "text-emerald-600", bg: "bg-emerald-50", darkBg: "dark:bg-emerald-900/10" },
    { title: "Infiltration", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50", darkBg: "dark:bg-indigo-900/10" },
    { title: "Normal Condition", icon: CheckCircle, color: "text-slate-600", bg: "bg-slate-50", darkBg: "dark:bg-slate-900/10" }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6"
            >
              {title}
            </motion.h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Our AI models are trained on over 500,000+ clinical images to detect specialized conditions with medical-grade precision.
            </p>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                 <img src={`https://i.pravatar.cc/100?u=${idx}`} alt="doctor" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-medical-blue flex items-center justify-center text-[10px] font-bold text-white">
              +12
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {conditions.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-3xl ${item.bg} ${item.darkBg} flex flex-col items-center justify-center text-center transition-all cursor-default border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-none`}
            >
              <item.icon size={32} className={`${item.color} mb-4`} />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </h4>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-br from-medical-blue to-indigo-700 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-10">
              <ShieldAlert size={120} />
           </div>
           <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h3 className="text-3xl font-bold mb-4 tracking-tight">Ready for clinical integration?</h3>
                 <p className="text-blue-100 mb-6 text-lg">Our API easily plugs into existing Radiology Information Systems (RIS) and Hospital Information Systems (HIS).</p>
                 <div className="flex space-x-4">
                    <button className="px-6 py-3 bg-white text-medical-blue font-bold rounded-xl hover:bg-blue-50 transition-colors">Request API Access</button>
                    <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20">Documentation</button>
                 </div>
              </div>
              <div className="hidden lg:flex items-center justify-end">
                 <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
                    <div className="flex items-center space-x-2 mb-3">
                       <div className="w-3 h-3 rounded-full bg-emerald-400" />
                       <span className="text-xs font-bold uppercase tracking-wider">Predictive API Pulse</span>
                    </div>
                    <div className="flex items-end space-x-1 h-12">
                       {[20, 50, 30, 80, 40, 90, 60, 30, 70, 50].map((h, i) => (
                          <motion.div 
                             key={i}
                             animate={{ height: [`${h}%`, `${h+20}%`, `${h}%`] }}
                             transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                             className="w-1.5 bg-white/40 rounded-full"
                          />
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Abnormalities;
