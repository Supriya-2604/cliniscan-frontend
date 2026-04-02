import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'EN' | 'HI' | 'TE' | 'TA' | 'KN';

interface Translation {
  hero_title: string;
  hero_subtitle: string;
  upload_title: string;
  upload_subtitle: string;
  challenges_title: string;
  solution_title: string;
  capabilities_title: string;
  abnormalities_title: string;
  dashboard_title: string;
  history_title: string;
  history_subtitle: string;
  download_report: string;
  filter_button: string;
  report_button: string;
  compare_button: string;
}

const translations: Record<Language, Translation> = {
  EN: {
    hero_title: "Advanced Chest X-ray Analysis",
    hero_subtitle: "Empowering healthcare professionals with real-time AI diagnostics.",
    upload_title: "Upload & Smart Analysis",
    upload_subtitle: "Drag and drop a chest X-ray image for instantaneous diagnosis.",
    challenges_title: "Key challenges in accurate chest X-ray diagnosis",
    solution_title: "Our AI-driven system ensures accurate diagnosis",
    capabilities_title: "Powerful AI Capabilities",
    abnormalities_title: "Comprehensive Disease Detection",
    dashboard_title: "Diagnostic Analytics Dashboard",
    history_title: "Patient Diagnostic History",
    history_subtitle: "Timeline view of previous diagnostic scans.",
    download_report: "Download PDF Report",
    filter_button: "Filter",
    report_button: "Report",
    compare_button: "Compare"
  },
  HI: {
    hero_title: "उन्नत छाती एक्स-रे विश्लेषण",
    hero_subtitle: "वास्तविक समय के एआई निदान के साथ स्वास्थ्य पेशेवरों को सशक्त बनाना।",
    upload_title: "अपलोड और स्मार्ट विश्लेषण",
    upload_subtitle: "तत्काल निदान के लिए छाती एक्स-रे छवि को ड्रैग और ड्रॉप करें।",
    challenges_title: "सटीक छाती एक्स-रे निदान में मुख्य चुनौतियाँ",
    solution_title: "हमारा एआई-आधारित सिस्टम सटीक निदान सुनिश्चित करता है",
    capabilities_title: "शक्तिशाली एआई क्षमताएं",
    abnormalities_title: "व्यापक रोग पहचान",
    dashboard_title: "नैदानिक विश्लेषण डैशबोर्ड",
    history_title: "रोगी नैदानिक इतिहास",
    history_subtitle: "पिछले नैदानಿಕ स्कैन का टाइमलाइन दृश्य।",
    download_report: "पीडीएफ रिपोर्ट डाउनलोड करें",
    filter_button: "फ़िल्टर",
    report_button: "रिपोर्ट",
    compare_button: "तुलना करें"
  },
  TE: {
    hero_title: "అధునాతన ఛాతీ ఎక్స్-రే విశ్లేషణ",
    hero_subtitle: "రియల్ టైమ్ AI డయాగ్నస్టిక్స్‌తో ఆరోగ్య నిపుణులను బలోపేతం చేయండి.",
    upload_title: "అప్‌లోడ్ & స్మార్ట్ విశ్లేషణ",
    upload_subtitle: "తక్షణ నిర్ధారణ కోసం ఛాతీ ఎక్స్-రే చిత్రాన్ని ఇక్కడ ఉంచండి.",
    challenges_title: "ఛాతీ ఎక్స్-రే నిర్ధారణలో కీలక సవాళ్లు",
    solution_title: "మా AI సిస్టమ్ ఖచ్చితమైన నిర్ధారణను నిర్ధారిస్తుంది",
    capabilities_title: "శక్తివంతమైన AI సామర్థ్యాలు",
    abnormalities_title: "సమగ్ర వ్యాధి గుర్తింపు",
    dashboard_title: "డయాగ్నస్టిక్ అనలిటిక్స్ డాష్‌బోర్డ్",
    history_title: "రోగి డయాగ్నస్టిక్ చరిత్ర",
    history_subtitle: "మునుపటి డయాగ్నస్టిక్ స్కాన్‌ల టైమ్‌లైన్ వీక్షణ.",
    download_report: "PDF నివేదికను డౌన్‌లోడ్ చేయండి",
    filter_button: "ఫిల్టర్",
    report_button: "నివేదిక",
    compare_button: "పోల్చండి"
  },
  TA: {
    hero_title: "மேம்பட்ட மார்பு எக்ஸ்-ரே பகுப்பாய்வு",
    hero_subtitle: "உண்நேர AI நோயறிதல் மூலம் சுகாதார நிபுணர்களுக்கு அதிகாரம் அளித்தல்.",
    upload_title: "பதிவேற்றம் மற்றும் ஸ்மார்ட் பகுப்பாய்வு",
    upload_subtitle: "உடனடி நோயறிதலுக்கு மார்பு எக்ஸ்-రే படத்தைத் இழுத்து விடவும்.",
    challenges_title: "துல்லியமான மார்பு எக்ஸ்-ரே நோயறிதலில் உள்ள முக்கிய சவால்கள்",
    solution_title: "எங்கள் AI-இயங்கும் அமைப்பு துல்லியமான நோயறிதலை உறுதி செய்கிறது",
    capabilities_title: "வலிமையான AI திறன்கள்",
    abnormalities_title: "விரிவான நோய் கண்டறிதல்",
    dashboard_title: "நோய் கண்டறியும் பகுப்பாய்வு டாஷ்போர்டு",
    history_title: "நோயாளி நோயறிதல் வரலாறு",
    history_subtitle: "முந்தைய நோயறிதல் ஸ்கேன்களின் காலவரிசை பார்வை.",
    download_report: "PDF அறிக்கையைப் பதிவிறக்கவும்",
    filter_button: "வடிகட்டி",
    report_button: "அறிக்கை",
    compare_button: "ஒப்பிடுக"
  },
  KN: {
    hero_title: "ಸುಧಾರಿತ ಎದೆಯ ಎಕ್ಸ್-ರೇ ವಿಶ್ಲೇಷಣೆ",
    hero_subtitle: "ನೈಜ-ಸಮಯದ AI ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್‌ನೊಂದಿಗೆ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು.",
    upload_title: "ಅಪ್‌ಲೋಡ್ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ವಿಶ್ಲೇಷಣೆ",
    upload_subtitle: "ತಕ್ಷಣದ ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ ಎದೆಯ ಎಕ್ಸ್-ರೇ ಚಿತ್ರವನ್ನು ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ.",
    challenges_title: "ನಿಖರವಾದ ಎದೆಯ ಎಕ್ಸ್-ರೇ ರೋಗನಿರ್ಣಯದಲ್ಲಿ ಪ್ರಮುಖ ಸವಾಲುಗಳು",
    solution_title: "ನಮ್ಮ AI-ಆಧಾರಿತ ಸಿಸ್ಟಮ್ ನಿಖರವಾದ ರೋಗನಿರ್ಣಯವನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ",
    capabilities_title: "ಶಕ್ತಿಯುತ AI ಸಾಮರ್ಥ್ಯಗಳು",
    abnormalities_title: "ಸಮಗ್ರ ರೋಗ ಪತ್ತೆಹಚ್ಚುವಿಕೆ",
    dashboard_title: "ರೋಗನಿರ್ಣಯದ ಅನಾಲಿಟಿಕ್ಸ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    history_title: "ರೋಗಿಯ ರೋಗನಿರ್ಣಯದ ಇತಿಹಾಸ",
    history_subtitle: "ಹಿಂದಿನ ರೋಗನಿರ್ಣಯದ ಸ್ಕ್ಯಾನ್‌ಗಳ ಟೈಮ್‌ಲೈನ್ ವೀಕ್ಷಣೆ.",
    download_report: "PDF ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    filter_button: "ಫಿಲ್ಟರ್",
    report_button: "ವರದಿ",
    compare_button: "ಹೋಲಿಕೆ"
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
