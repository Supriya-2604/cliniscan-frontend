import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, ShieldCheck, UserCircle2 } from 'lucide-react';

interface AuthProps {
  onLogin: (user: { name: string, role: string }) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'Doctor' | 'Patient'>('Doctor');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: role === 'Doctor' ? 'Dr. Smith' : 'John Doe', role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 p-10 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Lock size={120} />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join CliniScan'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {isLogin ? 'Enter your credentials to access reports' : 'Create an account to start diagnostic scans'}
            </p>
          </div>

          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8">
             <button 
              onClick={() => setRole('Doctor')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'Doctor' ? 'bg-white dark:bg-slate-700 text-medical-blue shadow-md' : 'text-slate-500'}`}
             >
                <ShieldCheck size={18} />
                <span>Doctor</span>
             </button>
             <button 
              onClick={() => setRole('Patient')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'Patient' ? 'bg-white dark:bg-slate-700 text-medical-blue shadow-md' : 'text-slate-500'}`}
             >
                <UserCircle2 size={18} />
                <span>Patient</span>
             </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-medical-blue/20 transition-all dark:text-white"
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-medical-blue/20 transition-all dark:text-white"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-medical-blue/20 transition-all dark:text-white"
              />
            </div>

            <button className="w-full py-4 bg-medical-blue text-white rounded-2xl font-bold shadow-xl shadow-medical-blue/30 hover:bg-blue-700 transition-all flex items-center justify-center group">
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
             {isLogin ? "Don't have an account?" : "Already have an account?"}
             <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-medical-blue font-bold hover:underline"
             >
                {isLogin ? 'Sign Up' : 'Sign In'}
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
