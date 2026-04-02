import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, FileCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AnalyticsDashboard: React.FC = () => {
  const [barData, setBarData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [totalScans, setTotalScans] = useState("0");
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/analytics')
      .then(res => res.json())
      .then(data => {
        setTotalScans(data.total_scans.toString());
        setBarData(data.weekly_trends);
        
        const counts = data.disease_counts;
        const total = Object.values(counts).reduce((a: any, b: any) => a + b, 0) as number;
        const pie = Object.keys(counts).map(key => ({
          name: key,
          value: Math.round((counts[key] / total) * 100)
        }));
        setPieData(pie);
      })
      .catch(err => console.error("Failed to fetch analytics:", err));
  }, []);

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

  const stats = [
    { label: "Total Scans", value: totalScans, icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Predictive Health", value: "94.2%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Clinical Precision", value: "91.5%", icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Automated Reports", value: totalScans, icon: FileCheck, color: "text-indigo-600", bg: "bg-indigo-50" }
  ];

  const { t } = useLanguage();

  return (
    <section id="dashboard" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {t.dashboard_title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Real-time insights into screening trends and model performance.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border dark:border-slate-700"
            >
              <div className={`w-12 h-12 ${stat.bg} dark:bg-slate-700/50 rounded-2xl flex items-center justify-center ${stat.color} mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border dark:border-slate-700 h-[450px]"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Detection Frequency (Weekly)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#e2e8f0"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: isDarkMode ? '#94a3b8' : '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: isDarkMode ? '#94a3b8' : '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }} 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                      color: isDarkMode ? '#f8fafc' : '#0f172a'
                    }}
                  />
                  <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border dark:border-slate-700 h-[450px] flex flex-col"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Distribution</h3>
            <div className="flex-1 w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
               {pieData.map((item, idx) => (
                 <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                       <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold dark:text-white">{item.value}%</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
