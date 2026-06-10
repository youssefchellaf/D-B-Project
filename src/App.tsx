import React, { useState, useEffect } from 'react';
import { MessageSquare, Instagram, Facebook, BookOpen, X, Sparkles, Heart, Award, Landmark, MapPin } from 'lucide-react';
import LuxuryLogo from './components/LuxuryLogo';
import FloatingParticles from './components/FloatingParticles';
import NotificationToast from './components/NotificationToast';
import AdminDashboard from './components/AdminDashboard';

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

  // Admin state indicator
  const [isAdminState, setIsAdminState] = useState<boolean>(false);

  // Modal display for "تعرف على مشروعنا"
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  // Logo secret 5 clicks click count to enter admin page
  const [logoClickCount, setLogoClickCount] = useState<number>(0);

  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setIsAdminState(true);
        handleShowMessage("تم تصفح اللوحة الإدارية الفاخرة بنجاح!", true);
        return 0;
      }
      return next;
    });
  };

  // Reset the click count after 3 seconds of silence
  useEffect(() => {
    if (logoClickCount > 0) {
      const timer = setTimeout(() => {
        setLogoClickCount(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [logoClickCount]);

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

  // Force Arabic RTL & document setup globally
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    if (settings.pageTitle) {
      document.title = settings.pageTitle;
    }
  }, [settings.pageTitle]);

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

  // Silently synchronize any existing locally registered numbers to the cloud server
  useEffect(() => {
    const localPhones = JSON.parse(localStorage.getItem('waitlist_phones') || '[]');
    if (localPhones.length > 0) {
      localPhones.forEach((p: string) => {
        fetch('/api/register-phone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: p })
        }).catch(err => console.debug("Sync failed", err));
      });
    }
  }, []);

  const handleShowMessage = (msg: string, success: boolean) => {
    setToastMessage(msg);
    setToastSuccess(success);
    setShowToast(true);
  };

  const handleWhatsappClick = () => {
    const text = encodeURIComponent(settings.whatsappMsg);
    window.open(`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleBackToMain = () => {
    setIsAdminState(false);
    if (currentPath.startsWith('/admin')) {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
  };

  // Render Admin Dashboard if path is /admin or state indicates admin view
  if (isAdminState || currentPath.startsWith('/admin')) {
    return (
      <>
        <AdminDashboard onBack={handleBackToMain} />
        {showToast && (
          <NotificationToast 
            message={toastMessage} 
            success={toastSuccess} 
            onClose={() => setShowToast(false)} 
          />
        )}
      </>
    );
  }

  return (
    <div className="relative min-h-[100dvh] bg-gradient-to-br from-[#FDFCF7] via-[#FAF8F2] to-[#F5EFE0] text-slate-800 font-sans antialiased text-right flex flex-col justify-center items-center p-0 md:p-6 sm:p-4 overflow-y-auto select-none selection:bg-brand-purple selection:text-white">
      
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

        {/* Symmetrical Top Anchor Header */}
        <div className="w-full flex justify-between items-center z-10 text-[10px] sm:text-xs font-sans font-bold text-brand-purple/70">
          <span className="tracking-widest text-[#C19641]">{settings.statusTag}</span>
          <span className="text-[#2E4F32] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#2E4F32] animate-pulse shrink-0" />
            {settings.location}
          </span>
        </div>

        {/* Core Centered Content Area */}
        <main className="w-full flex flex-col items-center text-center justify-center space-y-7 sm:space-y-8 my-auto z-10 py-6">
          
          {/* Luxury Custom-Crafted Arabesque Logo SVG - interactive bounce and scale */}
          <div className="transform scale-95 sm:scale-105 hover:scale-[1.05] transition-all duration-300 cursor-pointer active:scale-95">
            <LuxuryLogo onClick={handleLogoClick} size="md" className="drop-shadow-[0_4px_20px_rgba(193,150,65,0.12)]" />
          </div>

          {/* Dynamic Typographical Heading */}
          <div className="space-y-3">
            <h1 className="font-serif font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#3F1058] tracking-tight leading-tight whitespace-nowrap">
              {settings.title.includes(' ') ? (
                <>
                  {settings.title.substring(0, settings.title.indexOf(' '))}{" "}
                  <span className="bg-gradient-to-r from-[#2E4F32] via-[#C19641] to-[#561C76] bg-clip-text text-transparent">
                    {settings.title.substring(settings.title.indexOf(' ') + 1)}
                  </span>
                </>
              ) : (
                settings.title
              )}
            </h1>
            
            <p className="font-sans font-medium text-slate-600 text-sm sm:text-base max-w-sm mx-auto leading-relaxed select-text">
              {settings.description}
            </p>
          </div>

          {/* Symmetrical Instant WhatsApp Direct CTA & Socials */}
          <div className="w-full max-w-md pt-2 space-y-4">
            <div className="flex flex-col items-center gap-3 w-full">
              <button
                onClick={handleWhatsappClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-brand-green/30 hover:border-brand-green bg-brand-green/5 hover:bg-brand-green/10 text-brand-green text-sm font-bold font-sans transition-all duration-200 cursor-pointer hover:scale-[1.02] shadow-sm active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-brand-green" />
                تواصل معنا مباشرة عبر واتساب
              </button>

              <button
                onClick={() => setShowAboutModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-brand-gold/30 hover:border-brand-gold bg-brand-gold/5 hover:bg-brand-gold/10 text-brand-gold hover:text-brand-gold-dark text-sm font-bold font-sans transition-all duration-200 cursor-pointer hover:scale-[1.02] shadow-sm active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-brand-gold" />
                تعرف على مشروعنا
              </button>
            </div>

            {/* Quick Iconic Links matching brand theme */}
            <div className="flex items-center justify-center gap-3">
              <a 
                href={settings.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-brand-purple/10 hover:border-brand-gold text-[#561C76] hover:text-[#C19641] bg-brand-purple/5 hover:bg-brand-purple/10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a 
                href={settings.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-brand-purple/10 hover:border-brand-gold text-[#561C76] hover:text-[#C19641] bg-brand-purple/5 hover:bg-brand-purple/10 flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </main>

        {/* Bottom Anchor - Symmetrical coming soon indicator badge aligned with new brand elements */}
        <div className="w-full flex flex-col items-center space-y-2.5 z-10 pt-5 sm:pt-6 border-t border-brand-gold/10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold text-brand-purple bg-brand-gold/10 border border-brand-gold/20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            {settings.statusTag} | COMING SOON
          </div>
          
          <p className="text-[10px] text-slate-400 font-sans tracking-wide">
            © 2026 Douaa & Basma - جميع الحقوق محفوظة
          </p>
        </div>

      </div>

      {/* "تعرف على مشروعنا" Backstory Royal Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-[#3F1058]/55 backdrop-blur-md z-50 flex items-center justify-center p-4">
          {/* Card Outer Container */}
          <div className="bg-[#FDFCF7] border-2 border-brand-gold/30 rounded-[32px] max-w-lg w-full max-h-[85vh] overflow-y-auto relative p-6 sm:p-8 shadow-[0_24px_60px_rgba(90,20,142,0.3)] text-right flex flex-col justify-start">
            
            {/* Custom inner beautiful gold border */}
            <div className="absolute inset-2 sm:inset-3 rounded-[24px] border border-brand-gold/15 pointer-events-none" />
            
            {/* Close button - Top Left */}
            <button
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 left-4 sm:top-5 sm:left-5 w-9 h-9 rounded-full bg-brand-gold/10 hover:bg-brand-purple/10 text-brand-purple hover:text-brand-gold flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 z-20"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="relative z-10 space-y-6 pt-4">
              
              {/* Top luxury header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-brand-gold bg-brand-purple/5 border border-brand-gold/20 mx-auto">
                  👑 قصة مشروعنا الفاخر
                </div>
                <h3 className="font-serif font-black text-2xl text-brand-purple leading-tight pt-1">
                  مشروع "بسمة ودعاء" المنزلي
                </h3>
                <p className="font-serif text-sm text-brand-gold font-bold">
                  مذاق طبيعي... بلمسة فاخرة ✨
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
                  بدأت رحلة <strong>"بسمة ودعاء"</strong> في كنف عائلة مغربية تفخر بمطبخها وتقاليدها المتوارثة عبر الأجيال بمدينة الفنيدق والمناطق المجاورة.
                </p>
                <p>
                  كعصاميات شغوفات بالتفاصيل، لاحظنا أن هناك فراغاً لعرض العصائر الطبيعية الطازجة والتحليات الفاخرة بطابع منزلي خالص وبلمسة تقديم راقية وملكية تليق بمناسباتكم وجلساتكم الفاخرة.
                </p>
                <p>
                  وقررنا معاً المزج بين المذاق المنعش للعصائر الطبيعية المستخلصة من الفواكه المنقاة بكل حب، وبراعة التحليات المغربية والراقية المبتكرة لتصل إلى مائدتكم بأبهى حلة.
                </p>
              </div>

              {/* Grid highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                
                {/* Highlight 1 */}
                <div className="bg-white p-4 rounded-2xl border border-brand-gold/15 flex gap-3 text-right">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-purple shrink-0">
                    <Heart className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#561C76] text-sm">بأيدي نسائية 100%</h4>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5 leading-normal">مشروع منزلي نسائي يعتني بأدق التفاصيل والتقديم الراقي.</p>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className="bg-white p-4 rounded-2xl border border-brand-gold/15 flex gap-3 text-right">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-gold shrink-0">
                    <Award className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#561C76] text-sm font-sans">جودة وطراوة مطلقة</h4>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5 leading-normal">فواكه عذبة ومكونات فاخرة خالية تماما من الحوافظ والمضافات.</p>
                  </div>
                </div>

              </div>

              {/* Sh'aar / Quote */}
              <div className="bg-brand-purple text-white p-5 rounded-2xl relative overflow-hidden text-center space-y-2 mt-4 shadow-inner">
                <div className="absolute inset-0 z-0 zellige-overlay opacity-15" />
                <div className="relative z-10">
                  <span className="text-xl">⚜️</span>
                  <p className="font-serif italic text-xs leading-relaxed text-brand-ivory mt-1">
                    "الجودة ليست خياراً بل هي انعكاس لأصالتنا. كل كوب عصير طازج وكل قطعة تحلية نصنعها في مطبخنا، نعتبرها تحفة فنية مميزة نسعد بتقديمها لكم."
                  </p>
                  <p className="text-[10px] text-brand-gold pt-2 font-display">
                    — بسمة ودعاء
                  </p>
                </div>
              </div>

              {/* Modal footer / close CTA */}
              <div className="flex justify-center pt-3">
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="px-6 py-2 rounded-full bg-brand-purple hover:bg-brand-purple-light text-white text-xs font-bold font-sans transition-all duration-200 cursor-pointer active:scale-95"
                >
                  حسناً، فهمت 🤎
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
