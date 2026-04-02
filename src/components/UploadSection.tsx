import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react';
import ImageQualityChecker from './ImageQualityChecker';

interface UploadSectionProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
  title?: string;
  subtitle?: string;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  onUpload, 
  isAnalyzing,
  title = "Upload & Smart Analysis",
  subtitle = "Drag and drop a chest X-ray image for instantaneous AI-driven diagnosis."
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid image file (JPG, PNG, DICOM).");
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section id="upload" className="py-24 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {title.includes('&') ? (
              <>
                {title.split('&')[0]}
                <span className="text-medical-blue">& {title.split('&')[1]}</span>
              </>
            ) : title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div 
            className={`relative h-80 rounded-[3rem] border-4 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 
              ${dragActive ? 'border-medical-blue bg-blue-50/50 dark:bg-blue-900/10 scale-[1.02]' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'}
              ${selectedFile ? 'border-emerald-500 bg-emerald-50/10' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              ref={inputRef}
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
            />

            <AnimatePresence mode="wait">
              {!selectedFile ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-medical-blue/10 rounded-2xl flex items-center justify-center text-medical-blue mb-4">
                    <Upload size={28} />
                  </div>
                  <p className="text-md font-bold text-slate-700 dark:text-slate-200 mb-1">Drag & Drop Image</p>
                  <p className="text-xs text-slate-400 mb-4 font-medium">DICOM, JPG, PNG (Max 10MB)</p>
                  <button 
                    onClick={() => inputRef.current?.click()}
                    className="px-6 py-2 bg-medical-blue text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all"
                  >
                    Browse Files
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="selected"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full flex items-center justify-center relative rounded-2xl overflow-hidden"
                >
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Selected X-ray" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/20" />
                  <button 
                    onClick={clearFile}
                    className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 shadow-xl"
                  >
                    <X size={16} />
                  </button>
                  {isAnalyzing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 text-white p-6 text-center backdrop-blur-sm">
                      <Loader2 size={36} className="animate-spin mb-4" />
                      <p className="text-lg font-bold">Analyzing Diagnostic Features...</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-full flex flex-col">
             <ImageQualityChecker file={selectedFile} onValidation={setIsValid} />
             {selectedFile && !isAnalyzing && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => onUpload(selectedFile)}
                  disabled={!isValid}
                  className={`mt-4 w-full py-4 rounded-2xl font-bold shadow-xl transition-all ${isValid ? 'bg-medical-blue text-white shadow-medical-blue/30 hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  Start Diagnosis
                </motion.button>
             )}
          </div>
        </div>
        
        {/* Verification Checklist */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: "Privacy Secure", icon: CheckCircle2 },
             { label: "High Resolution", icon: CheckCircle2 },
             { label: "AI Validated", icon: CheckCircle2 },
             { label: "Instant Report", icon: CheckCircle2 }
           ].map((item, i) => (
             <div key={i} className="flex items-center space-x-2 text-slate-400 dark:text-slate-500">
                <item.icon size={14} className="text-emerald-500" />
                <span className="text-xs font-medium">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
