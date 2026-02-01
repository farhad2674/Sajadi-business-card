import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';

interface ContactButtonProps {
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  onClick: () => void;
  delay?: number;
  variant?: 'primary' | 'instagram' | 'email' | 'default';
  lang: Language;
}

const ContactButton: React.FC<ContactButtonProps> = ({ 
  icon, 
  label, 
  subLabel, 
  onClick, 
  delay = 0,
  variant = 'default',
  lang
}) => {
  // Enhanced Variant styles configuration with richer backgrounds
  const styles = {
    primary: { // Phone - Gold/Amber
      container: "bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-slate-900/50 border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
      iconBox: "bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg shadow-amber-500/20",
      text: "text-amber-50",
      subtext: "text-amber-400/90",
      arrow: "text-amber-400"
    },
    instagram: { // Instagram - Pink/Purple/Orange
      container: "bg-gradient-to-r from-fuchsia-600/20 via-rose-500/10 to-slate-900/50 border-pink-500/30 hover:border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.1)]",
      iconBox: "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-500 text-white shadow-lg shadow-pink-500/20",
      text: "text-pink-50",
      subtext: "text-pink-300/90",
      arrow: "text-pink-400"
    },
    email: { // Email - Sky/Blue
      container: "bg-gradient-to-r from-sky-500/20 via-blue-600/10 to-slate-900/50 border-sky-500/30 hover:border-sky-400/60 shadow-[0_0_15px_rgba(14,165,233,0.1)]",
      iconBox: "bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/20",
      text: "text-sky-50",
      subtext: "text-sky-300/90",
      arrow: "text-sky-400"
    },
    default: {
      container: "bg-slate-900/60 border-slate-800 hover:border-slate-700",
      iconBox: "bg-slate-800 text-slate-400",
      text: "text-slate-300",
      subtext: "text-slate-500",
      arrow: "text-slate-600"
    }
  };

  const currentStyle = styles[variant];

  return (
    <motion.button
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      onClick={onClick}
      className={`
        w-full h-[64px] relative rounded-2xl border flex items-center justify-between px-5 transition-all duration-300 active:scale-[0.98] group overflow-hidden
        ${currentStyle.container}
        backdrop-blur-md
      `}
    >
        {/* Subtle Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
            {/* Icon Box */}
            <div className={`
                w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0
                ${currentStyle.iconBox}
            `}>
                {icon}
            </div>
            
            {/* Text Content */}
            <div className="flex flex-col items-start gap-0.5">
                <span className={`text-sm font-bold tracking-tight ${currentStyle.text}`}>
                    {label}
                </span>
                {subLabel && (
                    <span className={`text-[11px] font-medium tracking-wide ${currentStyle.subtext}`}>
                        {subLabel}
                    </span>
                )}
            </div>
        </div>

        {/* Action Arrow - Rotates based on language direction */}
        <div className={`transform transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 relative z-10 ${currentStyle.arrow}`}>
             <svg 
               width="20" 
               height="20" 
               viewBox="0 0 24 24" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="2.5" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               className={`opacity-90 ${lang === 'fa' ? 'rotate-180' : ''}`}
            >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
             </svg>
        </div>
    </motion.button>
  );
};

export default ContactButton;