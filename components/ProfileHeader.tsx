import React from 'react';
import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';
import { Language } from '../types';

interface ProfileHeaderProps {
  nameFa: string;
  nameEn: string;
  titleFa: string;
  titleEn: string;
  lang: Language;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ nameFa, nameEn, titleFa, titleEn, lang }) => {
  
  // Split titles by pipe character
  const currentTitleString = lang === 'fa' ? titleFa : titleEn;
  const titles = currentTitleString.split('|');

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-6 text-center relative z-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="relative mb-6"
      >
        <div className="relative">
            {/* Glow Effect behind avatar */}
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl opacity-50 animate-pulse"></div>
            
            <ElectricBorder color="#fbbf24" borderRadius={999} chaos={0.15} speed={1.5}>
                <div className="w-28 h-28 rounded-full bg-slate-950 p-1 overflow-hidden relative z-10">
                <img 
                    src="https://picsum.photos/400/400" 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover shadow-2xl"
                />
                </div>
            </ElectricBorder>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center w-full px-2"
      >
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 mb-2 drop-shadow-sm tracking-tight">
          {lang === 'fa' ? nameFa : nameEn}
        </h1>
        <h2 className={`text-xs font-bold tracking-[0.25em] mb-5 uppercase text-cyan-500/90 ${lang === 'fa' ? '' : 'tracking-[0.15em]'}`}>
          {lang === 'fa' ? nameEn : nameFa}
        </h2>
        
        {/* Titles List */}
        <div className="flex flex-col gap-2.5 w-full">
            {titles.map((title, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="relative"
                >
                    <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-transparent via-slate-800/40 to-transparent border-y border-slate-800/50">
                        <span className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed block">
                            {title.trim()}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>

      </motion.div>
    </div>
  );
};

export default ProfileHeader;