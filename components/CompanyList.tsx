import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  ExternalLink, 
  Briefcase, 
  ChevronDown, 
  Bitcoin, 
  Coins, 
  TrendingUp, 
  BadgeDollarSign, 
  Lock 
} from 'lucide-react';
import { Company, CompanyIconType, Language } from '../types';

interface CompanyListProps {
  companies: Company[];
  lang: Language;
  t: any;
}

const getThemeStyles = (type: CompanyIconType) => {
  switch (type) {
    case 'gold':
      return {
        icon: <Coins size={22} />,
        expandedBg: 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500',
        expandedBorder: 'border-yellow-300/50',
        shadow: 'shadow-amber-500/20',
        headerText: 'text-slate-950',
        websiteLabel: 'text-slate-800',
        description: 'text-slate-900 font-medium leading-relaxed opacity-90',
        iconBoxOpen: 'bg-slate-950/10 text-slate-900',
        chevronOpen: 'text-slate-900',
        bgWatermark: 'text-amber-900/10',
        divider: 'via-slate-900/20',
        button: 'bg-slate-900 text-amber-400 hover:bg-slate-800 shadow-xl border border-slate-700/50',
        buttonIcon: 'text-amber-400'
      };
    case 'chart':
      return {
        icon: <TrendingUp size={22} />,
        expandedBg: 'bg-gradient-to-br from-emerald-600 to-teal-500',
        expandedBorder: 'border-emerald-400/50',
        shadow: 'shadow-emerald-500/20',
        headerText: 'text-white',
        websiteLabel: 'text-emerald-100',
        description: 'text-emerald-50 font-medium leading-relaxed drop-shadow-sm',
        iconBoxOpen: 'bg-white/20 text-white backdrop-blur-sm',
        chevronOpen: 'text-white',
        bgWatermark: 'text-white/10',
        divider: 'via-white/30',
        button: 'bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-md shadow-lg',
        buttonIcon: 'text-white'
      };
    case 'bitcoin':
      return {
        icon: <Bitcoin size={22} />,
        expandedBg: 'bg-gradient-to-br from-orange-600 to-red-500',
        expandedBorder: 'border-orange-400/50',
        shadow: 'shadow-orange-500/20',
        headerText: 'text-white',
        websiteLabel: 'text-orange-100',
        description: 'text-orange-50 font-medium leading-relaxed drop-shadow-sm',
        iconBoxOpen: 'bg-white/20 text-white backdrop-blur-sm',
        chevronOpen: 'text-white',
        bgWatermark: 'text-white/10',
        divider: 'via-white/30',
        button: 'bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-md shadow-lg',
        buttonIcon: 'text-white'
      };
    case 'dollar':
      return {
        icon: <BadgeDollarSign size={22} />,
        expandedBg: 'bg-gradient-to-br from-green-600 to-emerald-600',
        expandedBorder: 'border-green-400/50',
        shadow: 'shadow-green-500/20',
        headerText: 'text-white',
        websiteLabel: 'text-green-100',
        description: 'text-green-50 font-medium leading-relaxed drop-shadow-sm',
        iconBoxOpen: 'bg-white/20 text-white backdrop-blur-sm',
        chevronOpen: 'text-white',
        bgWatermark: 'text-white/10',
        divider: 'via-white/30',
        button: 'bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-md shadow-lg',
        buttonIcon: 'text-white'
      };
    default: // lock
      return {
        icon: <Lock size={22} />,
        expandedBg: 'bg-slate-800',
        expandedBorder: 'border-slate-600',
        shadow: 'shadow-slate-500/10',
        headerText: 'text-slate-200',
        websiteLabel: 'text-slate-400',
        description: 'text-slate-300',
        iconBoxOpen: 'bg-slate-700 text-slate-300',
        chevronOpen: 'text-slate-300',
        bgWatermark: 'text-slate-900/30',
        divider: 'via-slate-600',
        button: 'bg-slate-700 text-slate-300 cursor-not-allowed',
        buttonIcon: 'text-slate-400'
      };
  }
};

const CompanyItem: React.FC<{ company: Company; index: number; lang: Language; t: any }> = ({ company, index, lang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = getThemeStyles(company.iconType);
  const name = lang === 'fa' ? company.nameFa : company.nameEn;
  const description = lang === 'fa' ? company.descriptionFa : company.descriptionEn;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-2xl border transition-all duration-500 overflow-hidden
        ${isOpen 
            ? `${theme.expandedBg} ${theme.expandedBorder} ${theme.shadow} z-10` 
            : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
        }
      `}
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-4 flex items-center justify-between cursor-pointer z-10"
      >
        <div className="flex items-center gap-4">
          <motion.div 
            layout
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0
              ${isOpen 
                ? theme.iconBoxOpen 
                : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}
            `}
          >
            {theme.icon}
          </motion.div>

          <div className="flex flex-col min-w-0">
            <motion.span layout className={`font-bold text-base transition-colors duration-300 truncate ${isOpen ? theme.headerText : 'text-slate-200'}`}>
              {name}
            </motion.span>
            <motion.span layout className={`text-xs font-mono dir-ltr text-left ${lang === 'fa' ? 'text-right' : 'text-left'} transition-colors duration-300 ${isOpen ? theme.websiteLabel : 'text-slate-500'}`}>
              {company.websiteLabel}
            </motion.span>
          </div>
        </div>

        <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className={`transition-colors duration-300 ${isOpen ? theme.chevronOpen : 'text-slate-500'}`}
        >
            <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden relative"
          >
            <div className={`absolute -right-8 -bottom-8 transform rotate-12 scale-[4.5] pointer-events-none transition-colors duration-500 ${theme.bgWatermark}`}>
                {theme.icon}
            </div>

            <div className="px-5 pb-6 pt-1 relative z-10">
                <div className={`h-px w-full bg-gradient-to-r from-transparent ${theme.divider} to-transparent mb-4 opacity-50`}></div>
                
                <p className={`text-sm text-justify mb-6 ${theme.description} ${lang === 'en' ? 'text-left' : ''}`}>
                    {description}
                </p>

                {company.url ? (
                    <motion.a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 group ${theme.button}`}
                    >
                        <span>{t.visit}</span>
                        <ExternalLink size={18} className={theme.buttonIcon} />
                    </motion.a>
                ) : (
                    <div className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm border border-slate-700/50 ${theme.button}`}>
                        <span>{t.soon}</span>
                    </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CompanyList: React.FC<CompanyListProps> = ({ companies, lang, t }) => {
  return (
    <div className="mt-12 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-6 px-2"
      >
         <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
         <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/20 border border-cyan-500/20 backdrop-blur-sm">
            <Briefcase size={12} className="text-cyan-400" />
            {t.portfolio}
         </span>
         <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </motion.div>

      <div className="flex flex-col gap-3">
        {companies.map((company, index) => (
            <CompanyItem key={index} company={company} index={index} lang={lang} t={t} />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;