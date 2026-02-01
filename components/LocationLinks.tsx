import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Map } from 'lucide-react';

interface LocationLinksProps {
  wazeLink: string;
  neshanLink: string;
  t: any;
}

const LocationLinks: React.FC<LocationLinksProps> = ({ wazeLink, neshanLink, t }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Waze Button */}
      <motion.a
        href={wazeLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group overflow-hidden rounded-2xl p-[1px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#33ccff] to-[#00aaff] opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative h-full bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-[#33ccff]/20 group-hover:border-transparent transition-colors">
            <div className="p-3 rounded-full bg-[#33ccff]/10 text-[#33ccff] group-hover:bg-[#33ccff] group-hover:text-white transition-colors duration-300">
                <Navigation size={22} />
            </div>
            <div className="text-center">
                <span className="block font-bold text-slate-200 group-hover:text-white transition-colors">Waze</span>
                <span className="text-[10px] text-slate-500 group-hover:text-[#33ccff]/80 font-medium">{t.wazeSub}</span>
            </div>
        </div>
      </motion.a>

      {/* Neshan Button */}
      <motion.a
        href={neshanLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group overflow-hidden rounded-2xl p-[1px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0054a6] to-[#003366] opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative h-full bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-[#0054a6]/30 group-hover:border-transparent transition-colors">
            <div className="p-3 rounded-full bg-[#0054a6]/20 text-[#4d94ff] group-hover:bg-[#0054a6] group-hover:text-white transition-colors duration-300">
                <Map size={22} />
            </div>
            <div className="text-center">
                <span className="block font-bold text-slate-200 group-hover:text-white transition-colors">
                    {t.neshanSub === "Persian Map" ? "Neshan" : "نشان"}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-[#4d94ff]/80 font-medium">{t.neshanSub}</span>
            </div>
        </div>
      </motion.a>
    </div>
  );
};

export default LocationLinks;