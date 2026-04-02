import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface QualityReport {
  isBlurry: boolean;
  isLowRes: boolean;
  score: number;
}

interface ImageQualityCheckerProps {
  file: File | null;
  onValidation: (isValid: boolean) => void;
}

const ImageQualityChecker: React.FC<ImageQualityCheckerProps> = ({ file, onValidation }) => {
  if (!file) return null;

  // Simulated quality check logic
  const checkQuality = (f: File): QualityReport => {
    const isLowRes = f.size < 50000; // Less than 50KB as a proxy for low res
    const isBlurry = Math.random() > 0.8; // Randomly simulate blur for demo
    const score = isLowRes ? 45 : isBlurry ? 60 : 98;
    
    return { isBlurry, isLowRes, score };
  };

  const report = checkQuality(file);
  const isValid = !report.isBlurry && !report.isLowRes;

  React.useEffect(() => {
    onValidation(isValid);
  }, [isValid, onValidation]);

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-6 p-6 glass rounded-2xl border dark:border-slate-800 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
           <Info size={16} className="text-medical-blue" />
           <span className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wider">Image Quality Report</span>
        </div>
        <div className="flex items-center space-x-1">
           <span className={`text-sm font-black ${isValid ? 'text-emerald-500' : 'text-rose-500'}`}>{report.score}%</span>
           <span className="text-[10px] text-slate-400 font-bold">Health</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-3 rounded-xl border flex items-center space-x-3 ${report.isLowRes ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'} dark:bg-slate-800 dark:border-slate-700`}>
          {report.isLowRes ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
          <span className="text-xs font-bold">{report.isLowRes ? 'Low Resolution' : 'Optimal Density'}</span>
        </div>
        <div className={`p-3 rounded-xl border flex items-center space-x-3 ${report.isBlurry ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'} dark:bg-slate-800 dark:border-slate-700`}>
          {report.isBlurry ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
          <span className="text-xs font-bold">{report.isBlurry ? 'Blur Detected' : 'Crystal Clear'}</span>
        </div>
      </div>

      {!isValid && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-rose-500/10 rounded-lg border border-rose-500/20 text-[11px] text-rose-500 font-medium"
        >
          Warning: Low quality images may significantly reduce AI diagnostic accuracy. Consider re-scanning with higher resolution settings.
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageQualityChecker;
