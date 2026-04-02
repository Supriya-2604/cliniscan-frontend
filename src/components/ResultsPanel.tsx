import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Save, Share2, AlertCircle, Info, Activity, ShieldAlert, Download } from 'lucide-react';
import type { AIResult } from '../hooks/useAI';
import { generatePDFReport } from '../utils/reportGenerator';
import { useLanguage } from '../context/LanguageContext';

interface ResultsPanelProps {
  result: AIResult;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isDownloadingDetection, setIsDownloadingDetection] = React.useState(false);
  const [isDownloadingGradcam, setIsDownloadingGradcam] = React.useState(false);

  const handleImageDownload = async (imageUrl: string, filename: string, setLoading: (v: boolean) => void) => {
    setLoading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error('Download failed:', error);
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      generatePDFReport(result);
      // Give it a moment to simulate/ensure download start
      setTimeout(() => setIsDownloading(false), 2000);
    } catch (error) {
      console.error(error);
      setIsDownloading(false);
    }
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800';
      case 'Moderate': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'Mild': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default: return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-24 bg-slate-50 dark:bg-slate-950 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Visual Content (Images) */}
          <div className="lg:w-2/3 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original & Grad-CAM */}
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Original Scan</span>
                    <Info size={16} className="text-slate-300" />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden border dark:border-slate-800">
                    <img src={result.originalImage} alt="Original" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border dark:border-slate-800 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-sm font-bold text-medical-blue uppercase tracking-widest">Grad-CAM Heatmap</span>
                    <button
                      onClick={() => handleImageDownload(result.heatmapImage, `CliniScan_GradCAM_${result.prediction}.png`, setIsDownloadingGradcam)}
                      disabled={isDownloadingGradcam}
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-medical-blue hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
                      title="Download GradCAM Image"
                    >
                      {isDownloadingGradcam ? <Loader2Icon size={12} className="animate-spin" /> : <Download size={12} />}
                      <span>{isDownloadingGradcam ? 'Saving...' : 'Save'}</span>
                    </button>
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden border border-blue-100 dark:border-slate-800">
                    <img src={result.heatmapImage} alt="Heatmap" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BrainIcon size={80} />
                  </div>
                </div>
              </div>

              {/* Bounding Box & Stats */}
              <div className="flex flex-col gap-6">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border dark:border-slate-800 flex-1">
                   <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-sm font-bold text-rose-500 uppercase tracking-widest">Detection Bounding Box</span>
                    <ShieldAlert size={16} className="text-rose-500" />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden border border-rose-100 dark:border-slate-800">
                    <img src={result.detectionImage} alt="Detection" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => handleImageDownload(result.detectionImage, `CliniScan_Detection_${result.prediction}.png`, setIsDownloadingDetection)}
                    disabled={isDownloadingDetection}
                    className={`mt-4 w-full py-3 rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 ${
                      isDownloadingDetection
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-rose-500/25 hover:shadow-rose-500/40'
                    }`}
                  >
                    {isDownloadingDetection ? (
                      <>
                        <Loader2Icon size={16} className="animate-spin" />
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        <span>Download Detection Image</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {result.metrics.map(m => (
                    <div key={m.label} className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border dark:border-slate-800">
                       <p className="text-xs font-bold text-slate-400 uppercase mb-1">{m.label}</p>
                       <p className="text-2xl font-black text-slate-900 dark:text-white">{m.value}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Insights */}
          <div className="lg:w-1/3 flex flex-col gap-8">
             <div className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border dark:border-slate-800 relative overflow-hidden sticky top-32">
                <div className="relative z-10">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border mb-6 ${getSeverityColor(result.severity)}`}>
                    <AlertCircle size={14} />
                    <span>Severity: {result.severity}</span>
                  </div>
                  
                  <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
                    {result.prediction}
                  </h2>
                  <p className="text-lg font-bold text-medical-blue mb-6">AI Confidence: {result.confidence}%</p>
                  
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-8 border dark:border-slate-700">
                     <p className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                        <Info size={14} />
                        AI Explanation
                     </p>
                     <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {result.explanation}
                     </p>
                  </div>

                  <div className="space-y-4">
                     <button 
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center space-x-3 ${isDownloading ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-medical-blue text-white shadow-medical-blue/30 hover:bg-blue-700'}`}
                    >
                        {isDownloading ? (
                          <>
                            <Loader2Icon size={20} className="animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <FileDown size={20} />
                            <span>{t.download_report}</span>
                          </>
                        )}
                     </button>
                     <div className="grid grid-cols-2 gap-4">
                        <button className="py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2">
                           <Save size={18} />
                           <span>Save</span>
                        </button>
                        <button className="py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2">
                           <Share2 size={18} />
                           <span>Share</span>
                        </button>
                     </div>
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 opacity-5">
                   <Activity size={200} className="text-medical-blue" />
                </div>
             </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};


const BrainIcon: React.FC<{ size?: number, className?: string }> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />
  </svg>
);

const Loader2Icon: React.FC<{ size?: number, className?: string }> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v4" />
    <path d="m16.2 7.8 2.9-2.9" />
    <path d="M18 12h4" />
    <path d="m16.2 16.2 2.9 2.9" />
    <path d="M12 18v4" />
    <path d="m4.9 19.1 2.9-2.9" />
    <path d="M2 12h4" />
    <path d="m4.9 4.9 2.9 2.9" />
  </svg>
);

export default ResultsPanel;
