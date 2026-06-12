import React, { useState, useEffect } from 'react';
import { MessageSquare, Instagram, Facebook, X, Sparkles, Heart, Award, Landmark, MapPin, Languages, ChevronDown } from 'lucide-react';
import LuxuryLogo from './components/LuxuryLogo';
import FloatingParticles from './components/FloatingParticles';
import NotificationToast from './components/NotificationToast';
import { translations, LanguageType } from './translations';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Dynamic Settings state with defaults
  const [settings, setSettings] = useState({
    location: "الفنيدق، المغرب",
    statusTag: "قريباً...",
    title: "شيء مميز قيد التحضير",
    description: "نعمل على إطلاق تجربة فاخرة تليق بكم لعرض أشهى العصائر الطبيعية والتحليات الفاخرة بلمسات نسائية مغربية متقنة وبكل حب وشغف.",
    pageTitle: "بسمة ودعاء | الصفحة الرسمية لعلامة عصائر وتحليات فاخرة",
    whatsapp: "212705908383",
    whatsappMsg: "مرحباً، أود الاستفسار والتواصل معكم بخصوص خدماتكم الفاخرة للتحليات والعصائر المترقبة",
    instagram: "https://instagram.com/douaabasma75",
    facebook: "https://facebook.com/douaabasma75",
  });
  
  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSuccess, setToastSuccess] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Modal display for "تعرف على مشروعنا"
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  // Language translation states
  const [lang, setLang] = useState<LanguageType>('ar');
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);

  const t = translations[lang];
  const serifFont = lang === 'ar' ? 'font-serif' : 'font-display';
  const isArabic = lang === 'ar';

  const displayStatusTag = lang === 'ar' ? (settings.statusTag || t.statusTag) : t.statusTag;
  const displayLocation = lang === 'ar' ? (settings.location || t.location) : t.location;
  const displayTitle = lang === 'ar' ? (settings.title || t.title) : t.title;
  const displayDescription = lang === 'ar' ? (settings.description || t.description) : t.description;
  const displayPageTitle = lang === 'ar' ? (settings.pageTitle || t.pageTitle) : t.pageTitle;

  const handleLogoClick = () => {
    // Just a normal click placeholder (no action needed)
  };

  // Load Settings from server
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(err => console.error("Error loading settings:", err));
  }, []);

  // Dynamically set HTML direction and document title based on selected language
  useEffect(() => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
    document.title = displayPageTitle;
  }, [lang, displayPageTitle]);

  // Listen to path updates (popstate)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const playSubtleClick = (type: 'whatsapp' | 'info' | 'social' | 'close' = 'info') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      
      let freq = 880; // A5
      let duration = 0.15;
      let volume = 0.03;
      
      if (type === 'whatsapp') {
        freq = 659.25; // E5
        duration = 0.18;
      } else if (type === 'social') {
        freq = 987.77; // B5
        duration = 0.12;
      } else if (type === 'close') {
        freq = 523.25; // C5
        duration = 0.14;
      }
      
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.1, ctx.currentTime + duration);
      
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
      
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, duration * 1000 + 50);
    } catch (e) {
      console.debug("Audio play failed:", e);
    }
  };

  const handleShowMessage = (msg: string, success: boolean) => {
    setToastMessage(msg);
    setToastSuccess(success);
    setShowToast(true);
  };

  const handleWhatsappClick = () => {
    playSubtleClick('whatsapp');
    const text = encodeURIComponent(settings.whatsappMsg);
    window.open(`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className={`relative min-h-[100dvh] bg-gradient-to-br from-[#FDFCF7] via-[#FAF8F2] to-[#F5EFE0] text-slate-800 font-sans antialiased ${lang === 'ar' ? 'text-right' : 'text-left'} flex flex-col justify-center items-center p-0 md:p-6 sm:p-4 overflow-y-auto select-none selection:bg-brand-purple selection:text-white`}>
      
      {/* Premium ambient light glows matching the brand palette */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute top-10 right-10 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] rounded-full bg-brand-gold/15 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] rounded-full bg-brand-green/10 blur-[90px] pointer-events-none z-0" />

      {/* Floating particles background for immersive experience */}
      <FloatingParticles />

      {/* Royal Presentation Card: Seamless full screen on mobile, gorgeously framed card with decorative gold borders on desktop */}
      <div className="w-full max-w-xl md:max-w-xl min-h-[100dvh] md:min-h-[760px] md:bg-white/45 md:backdrop-blur-md md:rounded-[36px] md:border md:border-brand-gold/25 md:shadow-[0_24px_60px_rgba(193,150,65,0.12)] p-6 sm:p-9 md:p-12 flex flex-col justify-between items-center relative z-10 transition-all duration-300">
        
        {/* Subtle royal double layout border on desktop panels to add traditional luxury Moroccan touch */}
        <div className="absolute inset-3 rounded-[28px] border border-brand-gold/15 pointer-events-none hidden md:block" />
        <div className="absolute inset-4 rounded-[24px] border border-brand-gold/5 pointer-events-none hidden md:block" />

        {/* Symmetrical Top Anchor Header - Conditionally aligned based on language */}
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="w-full flex justify-between items-center z-20 text-[10px] sm:text-xs font-sans font-bold text-brand-purple/70">
          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { playSubtleClick('info'); setShowLangDropdown(!showLangDropdown); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-brand-gold/25 bg-brand-gold/5 text-brand-purple hover:bg-brand-gold/15 transition-all text-xs font-sans font-black cursor-pointer active:scale-95"
                title="Change Language"
                aria-label="Change Language"
              >
                <span className="uppercase">{lang}</span>
              </button>

              {showLangDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowLangDropdown(false)} />
                  <div className={`absolute top-full mt-1.5 z-40 w-16 bg-[#FDFCF7] border border-brand-gold/25 rounded-xl shadow-lg p-1 animate-fade-in ${lang === 'ar' ? 'right-0' : 'left-0'}`}>
                    {[
                      { code: 'ar', label: 'AR' },
                      { code: 'en', label: 'EN' },
                      { code: 'es', label: 'ES' },
                      { code: 'fr', label: 'FR' }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          playSubtleClick('info');
                          setLang(item.code as LanguageType);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full text-center py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer block ${
                          lang === item.code 
                            ? 'bg-brand-purple text-white font-black' 
                            : 'text-slate-700 hover:bg-brand-gold/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <span className={isArabic ? 'text-[#C19641]' : 'tracking-widest text-[#C19641]'}>{displayStatusTag}</span>
          </div>

          <span className="text-[#2E4F32] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#2E4F32] animate-pulse shrink-0" />
            <span className="font-sans font-bold">{displayLocation}</span>
          </span>
        </div>

        {/* Core Centered Content Area */}
        <main className="w-full flex flex-col items-center text-center justify-center space-y-7 sm:space-y-8 my-auto z-10 py-6">
          
          {/* Luxury Custom-Crafted Arabesque Logo SVG - interactive bounce and scale */}
          <div className="transform scale-95 sm:scale-105 hover:scale-[1.05] transition-all duration-300 cursor-pointer active:scale-95">
            <LuxuryLogo onClick={handleLogoClick} size="md" className="drop-shadow-[0_4px_20px_rgba(193,150,65,0.12)]" tagline={t.logoTagline} />
          </div>

          {/* Dynamic Typographical Heading */}
          <div className="space-y-4 w-full px-2 sm:px-4">
            <p className="font-sans font-medium text-slate-700 text-sm sm:text-base max-w-sm mx-auto leading-relaxed select-text">
              {displayDescription}
            </p>

            <h1 className={`font-black tracking-tight leading-tight whitespace-normal break-words max-w-lg mx-auto ${
              isArabic 
                ? 'font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#3F1058]' 
                : 'font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#3F1058]'
            }`}>
              {displayTitle.includes(' ') ? (
                <>
                  {displayTitle.substring(0, displayTitle.indexOf(' '))}{" "}
                  <span className="bg-gradient-to-r from-[#2E4F32] via-[#C19641] to-[#561C76] bg-clip-text text-transparent">
                    {displayTitle.substring(displayTitle.indexOf(' ') + 1)}
                  </span>
                </>
              ) : (
                displayTitle
              )}
            </h1>
          </div>

          {/* Symmetrical Instant WhatsApp Direct CTA & Socials */}
          <div className="w-full max-w-md pt-2 space-y-4">
            <div className="flex flex-col items-center gap-3 w-full">
              <button
                onClick={handleWhatsappClick}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-brand-green/30 hover:border-brand-green bg-brand-green/5 hover:bg-brand-green/10 text-brand-green text-sm font-bold font-sans transition-all duration-200 cursor-pointer hover:scale-[1.02] shadow-sm active:scale-95 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <MessageSquare className="w-4 h-4 text-brand-green animate-pulse" />
                {t.whatsappBtn}
              </button>

              <button
                onClick={() => { playSubtleClick('info'); setShowAboutModal(true); }}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-brand-gold/30 hover:border-brand-gold bg-brand-gold/5 hover:bg-brand-gold/10 text-brand-gold hover:text-brand-gold-dark text-sm font-bold font-sans transition-all duration-200 cursor-pointer hover:scale-[1.02] shadow-sm active:scale-95 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {t.aboutBtn}
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
              </button>
            </div>

            {/* Quick Iconic Links matching brand theme */}
            <div className="flex items-center justify-center gap-3">
              <a 
                href={settings.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => playSubtleClick('social')}
                className="w-9 h-9 rounded-full border border-brand-purple/10 hover:border-brand-gold text-[#561C76] hover:text-[#C19641] bg-brand-purple/5 hover:bg-brand-purple/10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a 
                href={settings.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => playSubtleClick('social')}
                className="w-9 h-9 rounded-full border border-brand-purple/10 hover:border-brand-gold text-[#561C76] hover:text-[#C19641] bg-brand-purple/5 hover:bg-brand-purple/10 flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </main>

        {/* Coming Soon status badge raised above the bottom divider line */}
        <div className="w-full flex justify-center z-10 mb-2">
          <div className={`inline-flex items-center gap-2 py-2 rounded-full text-[11px] font-bold text-brand-purple bg-brand-gold/10 border border-brand-gold/20 transition-all duration-300 ${lang === 'ar' ? 'px-14 sm:px-16' : 'px-4'}`}>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            {lang === 'ar' ? (
              <span className="flex flex-row items-center gap-0.5" dir="ltr">
                <span className="font-sans">...</span>
                <span>{(settings.statusTag || 'قريباً').replace(/\./g, '').trim()}</span>
              </span>
            ) : (
              <span className="flex flex-row items-center gap-1.5 font-sans" dir="ltr">
                <span>{lang === 'es' ? 'PRÓXIMAMENTE' : lang === 'fr' ? 'BIENTÔT DISPONIBLE' : 'COMING SOON'}</span>
                <span className="text-[#561C76]/30 font-normal">|</span>
                <span className="flex flex-row items-center gap-0.5">
                  <span className="font-sans">...</span>
                  <span>{(settings.statusTag || 'قريباً').replace(/\./g, '').trim()}</span>
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Bottom Anchor - Symmetrical footer with divider line */}
        <div className="w-full flex flex-col items-center space-y-2.5 z-10 pt-5 sm:pt-6 border-t border-brand-gold/10">
          <p className="text-[10px] text-slate-400 font-sans tracking-wide">
            {t.footerRights}
          </p>
        </div>

      </div>

      {/* "تعرف على مشروعنا" Backstory Royal Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-[#3F1058]/55 backdrop-blur-md z-50 flex items-center justify-center p-4">
          {/* Card Outer Container */}
          <div className={`bg-[#FDFCF7] border-2 border-brand-gold/30 rounded-[32px] max-w-lg w-full max-h-[85vh] overflow-y-auto relative p-6 sm:p-8 shadow-[0_24px_60px_rgba(90,20,142,0.3)] ${lang === 'ar' ? 'text-right' : 'text-left'} flex flex-col justify-start`}>
            
            {/* Custom inner beautiful gold border */}
            <div className="absolute inset-2 sm:inset-3 rounded-[24px] border border-brand-gold/15 pointer-events-none" />
            
            {/* Close button - Top Left/Right depending on language */}
            <button
              onClick={() => { playSubtleClick('close'); setShowAboutModal(false); }}
              className={`absolute top-4 ${lang === 'ar' ? 'left-4 sm:top-5 sm:left-5' : 'right-4 sm:top-5 sm:right-5'} w-9 h-9 rounded-full bg-brand-gold/10 hover:bg-brand-purple/10 text-brand-purple hover:text-brand-gold flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 z-20`}
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="relative z-10 space-y-6 pt-4">
              
              {/* Top luxury header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-brand-gold bg-brand-purple/5 border border-brand-gold/20 mx-auto">
                  {t.modalBadge}
                </div>
                <h3 className={`${serifFont} font-black text-2xl text-brand-purple leading-tight pt-1`}>
                  {t.modalTitle}
                </h3>
                <p className={`${serifFont} text-sm text-brand-gold font-bold`}>
                  {t.modalSubtitle}
                </p>
                <div className="flex items-center justify-center w-16 gap-1 mx-auto pt-1">
                  <span className="h-[1px] w-full bg-brand-gold" />
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                  <span className="h-[1px] w-full bg-brand-gold" />
                </div>
              </div>

              {/* Main Backstory */}
              <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans select-text">
                <p>
                  {t.modalP1}
                </p>
                <p>
                  {t.modalP2}
                </p>
                <p>
                  {t.modalP3}
                </p>
              </div>

              {/* Grid highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                
                {/* Highlight 1 */}
                <div className={`bg-white p-4 rounded-2xl border border-brand-gold/15 flex gap-3 ${lang === 'ar' ? 'text-right flex-row' : 'text-left flex-row-reverse'}`}>
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-purple shrink-0">
                    <Heart className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className={`${serifFont} font-bold text-[#561C76] text-sm`}>{t.hl1Title}</h4>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5 leading-normal">{t.hl1Desc}</p>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className={`bg-white p-4 rounded-2xl border border-brand-gold/15 flex gap-3 ${lang === 'ar' ? 'text-right flex-row' : 'text-left flex-row-reverse'}`}>
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-gold shrink-0">
                    <Award className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className={`${serifFont} font-bold text-[#561C76] text-sm`}>{t.hl2Title}</h4>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5 leading-normal">{t.hl2Desc}</p>
                  </div>
                </div>

              </div>

              {/* Sh'aar / Quote */}
              <div className="bg-brand-purple text-white p-5 rounded-2xl relative overflow-hidden text-center space-y-2 mt-4 shadow-inner">
                <div className="absolute inset-0 z-0 zellige-overlay opacity-15" />
                <div className="relative z-10">
                  <span className="text-xl">⚜️</span>
                  <p className={`${serifFont} italic text-xs leading-relaxed text-brand-ivory mt-1`}>
                    {t.quoteText}
                  </p>
                  <p className="text-[10px] text-brand-gold pt-2 font-display">
                    {t.quoteAuthor}
                  </p>
                </div>
              </div>

              {/* Modal footer / close CTA */}
              <div className="flex justify-center pt-3">
                <button
                  onClick={() => { playSubtleClick('close'); setShowAboutModal(false); }}
                  className="px-6 py-2 rounded-full bg-brand-purple hover:bg-brand-purple-light text-white text-xs font-bold font-sans transition-all duration-200 cursor-pointer active:scale-95"
                >
                  {t.modalClose}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notifier */}
      {showToast && (
        <NotificationToast 
          message={toastMessage} 
          success={toastSuccess} 
          onClose={() => setShowToast(false)} 
        />
      )}

    </div>
  );
}
