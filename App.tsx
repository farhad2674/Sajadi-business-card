import React, { useRef, useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Instagram, 
  Download, 
  Share2, 
  X,
  MapPin,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toJpeg } from 'html-to-image';
import QRCode from 'react-qr-code';

import ProfileHeader from './components/ProfileHeader';
import ContactButton from './components/ContactButton';
import AddressCard from './components/AddressCard';
import LocationLinks from './components/LocationLinks';
import CompanyList from './components/CompanyList';
import ElectricBorder from './components/ElectricBorder';
import { ContactDetails, Company, Language } from './types';

// Data Configuration
const contactInfo: ContactDetails = {
  nameFa: "علیرضا سجادی",
  nameEn: "Alireza Sajadi",
  // Using pipe | to separate multiple roles
  titleFa: "رئیس هیئت مدیره شرکت ای بی ام صنعت ایرانیان|مدیر عامل شرکت همیار انرژی خاور میانه|رئیس هیئت مدیره شرکت بین المللی همراه معامله گر بازار",
  titleEn: "Chairman of ABM Sanat Iranian|CEO of Hamyar Energy Middle East|Chairman of Hamrah Moamelegar Bazar Int. Co.",
  phone: "09126784005",
  email: "alireza.sajjadi75@gmail.com",
  instagram: "alireza_sajjadi_ghaemmaghami",
  addressFa: "تهران، خیابان مفتح، خیابان ورزنده، خیابان ملک الشعرای بهار، پاساژ ایران بک، طبقه 4، واحد 11",
  addressEn: "Unit 11, 4th Floor, Iran Back Passage, Malekoshoara Bahar St, Varzandeh St, Mofatteh St, Tehran, Iran",
  wazeLink: "https://www.waze.com/en/live-map/directions?latlng=35.70735314848069%2C51.42713069915772",
  neshanLink: "https://nshn.ir/b3_bvPxbexiaFt"
};

const companies: Company[] = [
  {
    nameFa: "همیار انرژی خاورمیانه",
    nameEn: "Hamyar Energy Middle East",
    websiteLabel: "irangoldhouse.com",
    url: "https://irangoldhouse.com",
    descriptionFa: "مالک برند و وب‌سایت معتبر «خانه طلا ایران» و دارنده مجوز رسمی از اتحادیه طلا و جواهر کشور. این مجموعه به عنوان مرجع تخصصی فروش عمده شمش‌های استاندارد طلا و نقره در ایران فعالیت کرده و زیرساخت‌های نوین سرمایه‌گذاری امن در فلزات گرانبها را فراهم می‌کند.",
    descriptionEn: "Owner of the prestigious 'Iran Gold House' brand and website, holding official licenses from the National Gold and Jewelry Union. A specialized reference for wholesale standard gold and silver bullion in Iran, providing modern infrastructure for secure investment in precious metals.",
    iconType: 'gold'
  },
  {
    nameFa: "همراه معامله گر بازار",
    nameEn: "Market Trader Companion",
    websiteLabel: "hamrah.me",
    url: "https://hamrah.me",
    descriptionFa: "پلتفرم جامع و پیشرو در زمینه آموزش تخصصی و تحلیل تکنیکال بازارهای مالی. ما با ارائه پیشرفته‌ترین ابزارهای ژورنال‌نویسی (Trading Journal) و مدیریت ریسک، به معامله‌گران حرفه‌ای کمک می‌کنیم تا عملکرد خود را بهینه‌سازی کرده و مسیر سودآوری مستمر را هموار سازند.",
    descriptionEn: "A comprehensive platform for specialized education and technical analysis of financial markets. We help professional traders optimize performance and achieve consistent profitability by providing advanced Trading Journal tools and risk management solutions.",
    iconType: 'chart'
  },
  {
    nameFa: "دیجی چین",
    nameEn: "DigiChain",
    websiteLabel: "digichain.ai",
    url: "https://digichain.ai",
    descriptionFa: "مرکز تخصصی آموزش و توسعه فناوری‌های بلاکچین (Blockchain) و هوش مصنوعی (AI). دیجی‌چین با تمرکز بر آینده تکنولوژی، راهکارهای نوین و زیرساخت‌های نرم‌افزاری پیشرفته را برای علاقه‌مندان و کسب‌وکارهای فعال در حوزه فناوری‌های غیرمتمرکز ارائه می‌دهد.",
    descriptionEn: "A specialized center for education and development in Blockchain and Artificial Intelligence (AI) technologies. DigiChain focuses on the future of tech, offering innovative solutions and advanced software infrastructure for decentralized technology enthusiasts and businesses.",
    iconType: 'bitcoin'
  },
  {
    nameFa: "فارکس سنتر",
    nameEn: "Forex Center",
    websiteLabel: "fxcenter.org",
    url: "https://fxcenter.org",
    descriptionFa: "مرجع تخصصی اخبار لحظه‌ای، تحلیل‌های عمیق و آموزش‌های کاربردی بازار فارکس و بازارهای جهانی. این مرکز بستری حرفه‌ای برای سرمایه‌گذاران حوزه‌های CFD، آپشن (Options) و فیوچرز (Futures) فراهم کرده تا با آگاهی کامل در بازارهای بین‌المللی فعالیت کنند.",
    descriptionEn: "The specialized reference for real-time news, deep analysis, and practical education on Forex and global markets. This center provides a professional platform for CFD, Options, and Futures investors to operate with full awareness in international markets.",
    iconType: 'dollar'
  },
  {
    nameFa: "سایت جامع بورس ایران",
    nameEn: "Iran Stock Market Portal",
    websiteLabel: "Coming Soon",
    url: undefined,
    descriptionFa: "بزرگترین پایگاه داده و تحلیل بازار بورس ایران، به زودی با امکانات منحصر به فرد رونمایی خواهد شد.",
    descriptionEn: "The largest database and analysis platform for the Iran Stock Market, unveiling soon with unique features.",
    iconType: 'lock'
  }
];

// UI Translations
const uiText = {
  fa: {
    call: "تماس مستقیم",
    instagram: "اینستاگرام",
    instagramSub: "صفحه رسمی",
    email: "ایمیل",
    save: "ذخیره کارت",
    saving: "در حال ذخیره...",
    share: "اشتراک",
    scan: "برای اشتراک گذاری اسکن کنید",
    portfolio: "پورتفولیو و شرکت‌ها",
    addressTitle: "مسیریابی و آدرس",
    addressHeader: "آدرس دفتر",
    copy: "کپی آدرس متنی",
    copied: "آدرس کپی شد",
    wazeSub: "مسیریابی سریع",
    neshanSub: "نقشه فارسی",
    visit: "بازدید از وب‌سایت",
    soon: "به زودی"
  },
  en: {
    call: "Direct Call",
    instagram: "Instagram",
    instagramSub: "Official Page",
    email: "Email",
    save: "Save Card",
    saving: "Saving...",
    share: "Share",
    scan: "Scan to share",
    portfolio: "Portfolio & Companies",
    addressTitle: "Location & Address",
    addressHeader: "Office Address",
    copy: "Copy Address",
    copied: "Copied!",
    wazeSub: "Fast Navigation",
    neshanSub: "Persian Map",
    visit: "Visit Website",
    soon: "Coming Soon"
  }
};

const App: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const printableRef = useRef<HTMLDivElement>(null);
  const [showQR, setShowQR] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lang, setLang] = useState<Language>('fa');

  // Handle Body Class for Fonts
  useEffect(() => {
    document.body.className = `lang-${lang}`;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'fa' ? 'en' : 'fa');
  };

  const t = uiText[lang];

  const handleSaveCard = async () => {
    if (printableRef.current === null) return;
    
    setIsSaving(true);
    try {
      // Small delay to ensure rendering
      await new Promise(r => setTimeout(r, 100));
      
      const dataUrl = await toJpeg(printableRef.current, { 
        quality: 1.0, 
        backgroundColor: '#020617',
        cacheBust: true,
        // Ensure high resolution
        width: 1080,
        height: 1080
      });
      
      const link = document.createElement('a');
      link.download = 'alireza-sajadi-business-card.jpg';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save image', err);
    } finally {
      setIsSaving(false);
    }
  };

  const shareContact = () => {
    if (navigator.share) {
      navigator.share({
        title: contactInfo.nameEn,
        text: `Check out ${contactInfo.nameEn}'s business card`,
        url: window.location.href,
      });
    } else {
      setShowQR(true);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden relative selection:bg-amber-500/30 selection:text-white ${lang === 'fa' ? 'font-[Vazirmatn]' : 'font-[Plus_Jakarta_Sans]'}`}>
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute inset-0 bg-grid-pattern opacity-[0.12]"></div>
         <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[100px] animate-blob"></div>
         <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-amber-900/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <main className="max-w-md mx-auto min-h-screen relative z-10 pb-24">
        
        {/* Language Toggle */}
        <div className="absolute top-4 right-4 z-50">
           <button 
             onClick={toggleLanguage}
             className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-full text-xs font-bold text-slate-300 hover:bg-slate-700 transition-colors shadow-lg"
           >
             <Languages size={14} />
             <span>{lang === 'fa' ? 'English' : 'فارسی'}</span>
           </button>
        </div>

        {/* Main Card Scrollable Container */}
        <div ref={cardRef} className="px-5 pt-12 pb-12 bg-slate-950/40 backdrop-blur-[2px]">
          
          <ProfileHeader 
            nameFa={contactInfo.nameFa}
            nameEn={contactInfo.nameEn}
            titleFa={contactInfo.titleFa}
            titleEn={contactInfo.titleEn}
            lang={lang}
          />

          <div className="space-y-3 mt-6">
            <ContactButton 
              icon={<Phone size={20} />}
              label={contactInfo.phone}
              subLabel={t.call}
              onClick={() => window.location.href = `tel:${contactInfo.phone}`}
              variant="primary"
              delay={0.3}
              lang={lang}
            />

            <ContactButton 
              icon={<Instagram size={20} />}
              label={t.instagram}
              subLabel={t.instagramSub}
              onClick={() => window.open(`https://instagram.com/${contactInfo.instagram}`, '_blank')}
              variant="instagram"
              delay={0.4}
              lang={lang}
            />
            
            <ContactButton 
              icon={<Mail size={20} />}
              label={t.email}
              subLabel={contactInfo.email}
              onClick={() => window.location.href = `mailto:${contactInfo.email}`}
              variant="email"
              delay={0.5}
              lang={lang}
            />
          </div>

          <CompanyList companies={companies} lang={lang} t={t} />

          <div className="mt-10 mb-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-5 px-2"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                 <MapPin size={10} />
                 {t.addressTitle}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            </motion.div>

            <div className="space-y-4">
              <LocationLinks 
                wazeLink={contactInfo.wazeLink} 
                neshanLink={contactInfo.neshanLink} 
                t={t}
              />
              <AddressCard 
                address={lang === 'fa' ? contactInfo.addressFa : contactInfo.addressEn} 
                t={t}
                lang={lang}
              />
            </div>
          </div>
          
          <div className="py-8 flex justify-center opacity-30">
             <div className="w-16 h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent rounded-full"></div>
          </div>
        </div>
      </main>

      {/* 
        HIDDEN PRINTABLE CARD TEMPLATE 
        This is positioned off-screen and used solely for generating the image.
      */}
      <div className="fixed left-[-9999px] top-[-9999px]">
        <div 
          ref={printableRef} 
          className={`w-[1080px] h-[1080px] bg-slate-950 relative flex flex-col items-center justify-between p-16 text-center overflow-hidden ${lang === 'fa' ? 'font-[Vazirmatn]' : 'font-[Plus_Jakarta_Sans]'}`}
          dir={lang === 'fa' ? 'rtl' : 'ltr'}
        >
           {/* Background Elements */}
           <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]"></div>
           <div className="absolute top-[-20%] right-[-20%] w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px]"></div>
           <div className="absolute bottom-[-20%] left-[-20%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px]"></div>
           
           {/* Content */}
           <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
              
              {/* Header Info */}
              <div className="flex flex-col items-center w-full mt-8">
                  <div className="w-64 h-64 rounded-full p-2 border-4 border-amber-500/40 bg-slate-900 shadow-2xl relative mb-10">
                      <img 
                        src="https://picsum.photos/400/400" 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                      <div className="absolute inset-0 rounded-full border border-amber-400/30 shadow-[0_0_60px_rgba(251,191,36,0.15)]"></div>
                  </div>
                  
                  <h1 className="text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
                    {lang === 'fa' ? contactInfo.nameFa : contactInfo.nameEn}
                  </h1>

                  <div className="flex flex-col gap-3 w-full max-w-3xl">
                    {(lang === 'fa' ? contactInfo.titleFa : contactInfo.titleEn).split('|').slice(0, 3).map((title, i) => (
                       <span key={i} className="text-2xl text-slate-300 font-medium tracking-wide block py-1 border-b border-slate-800/50 last:border-0">
                          {title.trim()}
                       </span>
                    ))}
                  </div>
              </div>

              {/* Contact Footer */}
              <div className="w-full max-w-3xl bg-slate-900/60 backdrop-blur-xl p-10 rounded-[3rem] border border-slate-800 shadow-2xl mb-8 flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-lg shrink-0">
                          <Phone size={40} />
                      </div>
                      <div className="flex flex-col items-start">
                          <span className="text-slate-400 text-xl font-medium uppercase tracking-widest mb-1">{lang === 'fa' ? 'شماره تماس' : 'Phone Number'}</span>
                          <span className="text-4xl font-bold text-white tracking-wider dir-ltr font-[Plus_Jakarta_Sans]">{contactInfo.phone}</span>
                      </div>
                  </div>

                  <div className="w-full h-px bg-slate-700/50"></div>

                  <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-lg shrink-0">
                          <Mail size={40} />
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                          <span className="text-slate-400 text-xl font-medium uppercase tracking-widest mb-1">{lang === 'fa' ? 'ایمیل' : 'Email Address'}</span>
                          <span className="text-3xl font-bold text-white truncate w-full font-[Plus_Jakarta_Sans]">{contactInfo.email}</span>
                      </div>
                  </div>
              </div>
              
           </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent backdrop-blur-[4px]">
        <div className="max-w-md mx-auto flex items-end justify-center gap-3">
            
          {/* Electric Save Button */}
          <div className="flex-1 h-[48px] relative group">
            <ElectricBorder color="#0ea5e9" borderRadius={18} chaos={0.15} speed={1.5}>
                <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleSaveCard}
                disabled={isSaving}
                className="w-full h-full bg-slate-900 text-sky-400 font-medium text-sm rounded-[18px] flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800 transition-colors z-10 relative overflow-hidden"
                >
                <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Download size={18} className="group-hover:animate-bounce" />
                <span>{isSaving ? t.saving : t.save}</span>
                </motion.button>
            </ElectricBorder>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={shareContact}
            className="flex-1 h-[48px] bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 rounded-[18px] shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 font-bold text-sm border border-amber-300/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Share2 size={18} />
            {t.share}
          </motion.button>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-6"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/90 border border-slate-700 rounded-3xl p-8 relative w-full max-w-sm text-center shadow-2xl backdrop-blur-xl"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors bg-slate-800 p-2 rounded-full"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-white text-2xl font-black mb-2">QR Code</h3>
              <p className="text-slate-400 text-sm mb-8">{t.scan}</p>
              
              <div className="bg-white p-4 rounded-2xl inline-block shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                 <QRCode value={window.location.href} size={200} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;