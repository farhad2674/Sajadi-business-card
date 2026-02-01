import React, { useState } from 'react';
import { MapPin, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language } from '../types';

interface AddressCardProps {
  address: string;
  t: any;
  lang: Language;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, t, lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-2xl relative overflow-hidden group border border-slate-800 bg-slate-950 shadow-2xl transition-colors hover:border-slate-700/50"
    >
      {/* Background Image with Effects */}
      <div className="absolute inset-0 z-0">
         {/* Map Image */}
         <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600" 
            alt="Map Background" 
            className="w-full h-full object-cover opacity-[0.15] grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
         />
         {/* Gradient Overlay/Mask */}
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 mix-blend-multiply"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-transparent"></div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none z-0"></div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-start gap-4">
            <div className="p-3.5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 text-amber-500 shadow-xl shrink-0 group-hover:border-amber-500/30 transition-colors">
                <MapPin size={24} className="group-hover:text-amber-400 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-slate-100 mb-2 flex items-center gap-2 drop-shadow-md">
                    {t.addressHeader}
                </h3>
                <p className={`text-slate-300 text-sm leading-7 text-justify font-light opacity-90 ${lang === 'en' ? 'text-left' : ''}`}>
                    {address}
                </p>
            </div>
        </div>

        <div className="mt-5 pt-5 border-t border-slate-800/50">
            <button
                onClick={handleCopy}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold rounded-xl transition-all duration-300 border border-slate-700/50
                bg-slate-800/40 backdrop-blur-sm text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 active:scale-[0.98]"
            >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                {copied ? t.copied : t.copy}
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddressCard;