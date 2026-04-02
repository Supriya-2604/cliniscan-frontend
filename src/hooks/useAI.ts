import { useState } from 'react';

export interface AIResult {
  prediction: string;
  confidence: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Normal';
  explanation: string;
  originalImage: string;
  heatmapImage: string;
  detectionImage: string;
  metrics: { label: string; value: number }[];
}

export const useAI = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      const res = data[0]; // Backend returns a list

      const result: AIResult = {
        prediction: res.prediction,
        confidence: res.confidence,
        accuracy: res.accuracy,
        precision: res.precision,
        recall: res.recall,
        f1Score: res.f1_score,
        severity: res.severity,
        explanation: res.explanation,
        originalImage: `/uploads/${res.image}`,
        heatmapImage: `/uploads/${res.gradcam_image}`,
        detectionImage: `/uploads/${res.output_image}`,
        metrics: [
          { label: "Accuracy", value: res.accuracy },
          { label: "Precision", value: res.precision },
          { label: "Recall", value: res.recall },
          { label: "F1 Score", value: res.f1_score }
        ]
      };

      setResult(result);
    } catch (err: any) {
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResult(null);
    setIsAnalyzing(false);
    setError(null);
  };

  return { analyzeImage, isAnalyzing, result, error, reset };
};
