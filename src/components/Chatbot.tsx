import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, HelpCircle } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your CliniScan AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    // Simulated bot response
    setTimeout(() => {
      let response = "I'm analyzing your request. You can upload an X-ray in the 'Upload' section for a detailed diagnosis.";
      if (input.toLowerCase().includes('pneumonia')) {
        response = "Pneumonia is an infection that inflames the air sacs in one or both lungs. Our AI can detect it with high precision by identifying consolidation areas.";
      } else if (input.toLowerCase().includes('report')) {
        response = "Once the analysis is complete, you can download a professional PDF report from the results panel.";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-96 glass rounded-3xl shadow-2xl border dark:border-slate-800 flex flex-col h-[500px] overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-medical-blue text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <p className="font-bold">CliniScan Assistant</p>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">24/7 AI Support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-medical-blue text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm rounded-tl-none border dark:border-slate-700'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ Quick Links */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t dark:border-slate-800">
               {['Upload X-ray', 'PDF Report', 'Explain AI'].map(faq => (
                 <button 
                  key={faq}
                  onClick={() => setInput(faq)}
                  className="whitespace-nowrap px-3 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-xs font-medium text-slate-500 hover:border-medical-blue transition-colors shadow-sm"
                >
                   {faq}
                 </button>
               ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border dark:border-slate-700">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent px-2 text-sm focus:outline-none dark:text-white"
                />
                <button 
                  onClick={handleSend}
                  className="p-2 bg-medical-blue text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-medical-blue text-white rounded-3xl shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all border-4 border-white dark:border-slate-900"
      >
        {isOpen ? <HelpCircle size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
