import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Image as ImageIcon, Layers, ZapOff } from 'lucide-react';

interface ChallengesProps {
  title?: string;
}

const Challenges: React.FC<ChallengesProps> = ({ 
  title = "Key challenges in accurate chest X-ray diagnosis using AI" 
}) => {
  const challenges = [
    {
      title: "Data Imbalance",
      description: "Significant disparity in the number of normal vs. rare disease cases in clinical datasets.",
      icon: Layers,
      color: "bg-blue-500",
    },
    {
      title: "Low Image Quality",
      description: "Noise, artifacts, and varying exposure levels in portable X-ray scans affecting accuracy.",
      icon: ImageIcon,
      color: "bg-amber-500",
    },
    {
      title: "Disease Similarity",
      description: "Overlapping visual features between conditions like pneumonia and lung opacity.",
      icon: AlertTriangle,
      color: "bg-rose-500",
    },
    {
      title: "Model Generalization",
      description: "Ensuring AI models perform consistently across different patient demographics and equipment.",
      icon: ZapOff,
      color: "bg-indigo-500",
    }
  ];

  return (
    <section id="features" className="py-24 bg-medical-light dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-1.5 bg-medical-blue mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700"
            >
              <div className={`w-14 h-14 ${challenge.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-${challenge.color.split('-')[1]}-200`}>
                <challenge.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                {challenge.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {challenge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Challenges;
