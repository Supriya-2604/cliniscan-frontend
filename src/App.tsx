import React, { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Challenges from './components/Challenges';
import Solution from './components/Solution';
import Capabilities from './components/Capabilities';
import Abnormalities from './components/Abnormalities';
import UploadSection from './components/UploadSection';
import ResultsPanel from './components/ResultsPanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import HistoryTimeline from './components/HistoryTimeline';
import Chatbot from './components/Chatbot';
import Auth from './components/Auth';
import { useLanguage } from './context/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();

  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [demoResult, setDemoResult] = useState<any>(null);
  const [demoAnalyzing, setDemoAnalyzing] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleUpload = async (file: File) => {
    setDemoAnalyzing(true);

    setTimeout(() => {
      setDemoResult({
        prediction: "Pneumonia",
        confidence: 94,
        severity: "Moderate",

        explanation:
          "AI detected possible pneumonia with visible opacity in the left lung region.",

        abnormalities: [
          "Opacity in left lung",
          "Possible consolidation",
          "Mild infiltration"
        ],

        metrics: [
          { label: "Accuracy", value: 93 },
          { label: "Precision", value: 91 },
          { label: "Recall", value: 94 },
          { label: "F1 Score", value: 92 }
        ],

        originalImage: URL.createObjectURL(file),
        heatmapImage: URL.createObjectURL(file),
        detectionImage: URL.createObjectURL(file)
      });

      setDemoAnalyzing(false);

      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 2000);
  };

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <main>
        <Hero title={t.hero_title} subtitle={t.hero_subtitle} />
        <Challenges title={t.challenges_title} />
        <Solution title={t.solution_title} />
        <Capabilities title={t.capabilities_title} />
        <Abnormalities title={t.abnormalities_title} />

        <UploadSection
          onUpload={handleUpload}
          isAnalyzing={demoAnalyzing}
          title={t.upload_title}
          subtitle={t.upload_subtitle}
        />

        <div ref={resultsRef}>
          {demoResult && <ResultsPanel result={demoResult} />}
        </div>

        <AnalyticsDashboard />
        <HistoryTimeline />
      </main>

      <Chatbot />

      <footer className="py-10 text-center text-sm text-gray-500">
        © 2026 CliniScan AI. All Rights Reserved by Supriya
      </footer>
    </div>
  );
};

export default App;