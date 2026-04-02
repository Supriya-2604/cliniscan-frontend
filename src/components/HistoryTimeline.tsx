import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, CheckCircle2, AlertCircle, ArrowRight, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HistoryItem {
  id: string;
  date: string;
  prediction: string;
  status: string;
  severity: string;
}

const HistoryTimeline: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    fetch('/history')
      .then(res => res.json())
      .then(data => {
        setHistory(data.map((item: any) => ({
           id: item.id,
           date: item.date,
           prediction: item.prediction,
           status: item.status,
           severity: item.severity || (item.prediction === 'Normal' ? 'Normal' : 'Moderate')
        })));
      })
      .catch(err => console.error("Failed to fetch history:", err));
  }, []);

  const getStatusInfo = (prediction: string) => {
    if (prediction === 'Normal') return { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" };
    return { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" };
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-t dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t.history_title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t.history_subtitle}</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            <span>{t.filter_button}</span>
          </button>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <div className="space-y-12">
            {history.map((item, idx) => {
              const status = getStatusInfo(item.prediction);
              const Icon = status.icon;

              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex items-start sm:items-center space-x-0 sm:space-x-8"
                >
                  {/* Date Bubble */}
                  <div className="hidden sm:flex flex-col items-center z-10">
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-lg`}>
                        <div className="text-center">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.date.split(' ')[0]}</p>
                           <p className="text-lg font-black text-slate-900 dark:text-white leading-none">{item.date.split(' ')[1].replace(',', '')}</p>
                        </div>
                     </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 group hover:border-medical-blue/30 transition-all cursor-default">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl ${status.bg} dark:bg-slate-700/50 flex items-center justify-center ${status.color}`}>
                           <Icon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                             <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.prediction}</h4>
                             <span className="text-[10px] font-bold text-slate-400">ID: {item.id}</span>
                          </div>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                             <Calendar size={12} />
                             {item.date}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 w-full md:w-auto">
                         <button className="flex-1 md:flex-none px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2">
                            <FileText size={14} />
                            <span>{t.report_button}</span>
                         </button>
                         <button className="flex-1 md:flex-none px-4 py-2 bg-medical-blue/10 text-medical-blue text-xs font-bold rounded-lg hover:bg-medical-blue hover:text-white transition-all flex items-center justify-center space-x-2 group-hover:bg-medical-blue group-hover:text-white">
                            <span>{t.compare_button}</span>
                            <ArrowRight size={14} />
                         </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
