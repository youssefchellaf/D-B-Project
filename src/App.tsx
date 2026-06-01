import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle2, MessageSquare, Instagram, Facebook } from 'lucide-react';
import LuxuryLogo from './components/LuxuryLogo';
import FloatingParticles from './components/FloatingParticles';
import NotificationToast from './components/NotificationToast';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSuccess, setToastSuccess] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Force Arabic RTL & document setup globally
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    document.title = 'بسمة ودعاء | الصفحة الرسمية لعلامة عصائر وتحليات فاخرة';
  }, []);

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

  const handleSubscribeMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      handleShowMessage('يرجى إدخال رقم الهاتف بشكل صحيح.', false);
      return;
    }
    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      handleShowMessage('رقم الهاتف المكتوب غير صالح.', false);
      return;
    }

    setLoading(true);

    // Call server API for centralized registration
    fetch('/api/register-phone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    })
    .then(() => {
      // Also write locally as fallback/cache
      const existing = JSON.parse(localStorage.getItem('waitlist_phones') || '[]');
      if (!existing.includes(phone)) {
        existing.push(phone);
        localStorage.setItem('waitlist_phones', JSON.stringify(existing));
      }
      setSubscribed(true);
      setLoading(false);
      
      setPhone('');
      handleShowMessage('تم تسجيل رقم هاتفك بنجاح! سنقوم بإعلامك عند الإطلاق.', true);
    })
    .catch((err) => {
      console.warn("Register fallback locally due to connection error:", err);
      // Fallback
      const existing = JSON.parse(localStorage.getItem('waitlist_phones') || '[]');
      if (!existing.includes(phone)) {
        existing.push(phone);
        localStorage.setItem('waitlist_phones', JSON.stringify(existing));
      }
      setSubscribed(true);
      setLoading(false);
      
      setPhone('');
      handleShowMessage('تم تسجيل رقم هاتفك بنجاح! سنقوم بإعلامك عند الإطلاق.', true);
    });
  };

  const handleWhatsappClick = () => {
    const text = encodeURIComponent("مرحباً، أود الاستفسار والتواصل معكم بخصوص خدماتكم الفاخرة للتحليات والعصائر المترقبة");
    window.open(`https://wa.me/212705908383?text=${text}`, '_blank');
  };

  // Render Admin Dashboard if path is /admin
  if (currentPath.startsWith('/admin')) {
    return (
      <>
        <AdminDashboard />
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
    <div className="relative min-h-[100dvh] bg-gradient-to-br from-[#FDFCF7] via-[#FAF8F2] to-[#F5EFE0] text-slate-800 font-sans antialiased text-right flex flex-col justify-between items-center px-6 py-6 sm:py-9 overflow-y-auto select-none selection:bg-brand-purple selection:text-white">
      
      {/* Premium ambient light glows matching the brand palette */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute top-10 right-10 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] rounded-full bg-brand-gold/15 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] rounded-full bg-brand-green/10 blur-[90px] pointer-events-none z-0" />

      {/* Luxury magical floating elements */}
      <FloatingParticles />

      {/* Symmetrical Top Anchor Header */}
      <div className="w-full max-w-md flex justify-between items-center z-10 text-[10px] sm:text-xs font-sans font-bold text-brand-purple/70">
        <span className="tracking-widest text-[#C19641]">قريباً</span>
        <span className="text-[#2E4F32] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E4F32] animate-pulse" />
          الفنيدق، المغرب
        </span>
      </div>

      {/* Core Centered Content Area */}
      <main className="w-full max-w-xl flex flex-col items-center text-center justify-center space-y-7 sm:space-y-8 my-auto z-10">
        
        {/* Luxury Custom-Crafted Arabesque Logo SVG - matches the uploaded logo perfectly */}
        <div className="transform scale-95 sm:scale-105 transition-all duration-500">
          <LuxuryLogo size="md" className="drop-shadow-[0_4px_20px_rgba(193,150,65,0.12)]" />
        </div>

        {/* Dynamic Typographical Heading */}
        <div className="space-y-3">
          <h1 className="font-serif font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#3F1058] tracking-tight leading-tight whitespace-nowrap">
            شيء مميز{" "}
            <span className="bg-gradient-to-r from-[#2E4F32] via-[#C19641] to-[#561C76] bg-clip-text text-transparent">
              قيد التحضير
            </span>
          </h1>
          
          <p className="font-sans font-medium text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            نعمل على إطلاق تجربة فاخرة تليق بكم لعرض أشهى العصائر الطبيعية والتحليات الفاخرة بلمسات نسائية مغربية متقنة وبكل حب وشغف.
          </p>
        </div>

        {/* Lead Capture Form & CTAs (Symmetrical, premium, aligned with logo colors) */}
        <div className="w-full max-w-md space-y-4">
          {subscribed ? (
            <div className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-2xl flex items-center justify-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
              <p className="text-xs font-bold text-brand-green-dark leading-relaxed">
                تم تسجيل رقم هاتفك بنجاح! سنقوم بدعوتك وإرسال باقة تذوق كبار الشخصيات بمجرد الإطلاق الرسمي.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribeMail} className="w-full flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="رقم واتساب (مثال: 0612345678)"
                  className="w-full py-3.5 pr-10 pl-4 rounded-xl border border-brand-gold/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 bg-white/90 backdrop-blur-md text-right text-slate-800 placeholder-slate-400 font-sans text-xs outline-none transition-all duration-150"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="py-3.5 px-6 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white font-bold font-sans text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-brand-purple/15 flex items-center justify-center gap-2 shrink-0"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "أخبرني فور الإطلاق"
                )}
              </button>
            </form>
          )}

          {/* Symmetrical Instant WhatsApp Direct CTA & Socials */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleWhatsappClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-green/30 hover:border-brand-green bg-brand-green/5 hover:bg-brand-green/10 text-brand-green text-xs font-bold font-sans transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 text-brand-green" />
              تواصل معنا مباشرة عبر واتساب
            </button>

            {/* Quick Iconic Links matching brand theme */}
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com/douaabasma_1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-brand-purple/10 hover:border-brand-gold text-[#561C76] hover:text-[#C19641] bg-brand-purple/5 hover:bg-brand-purple/10 flex items-center justify-center transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://m.facebook.com/douaabasma01/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-brand-purple/10 hover:border-brand-gold text-[#561C76] hover:text-[#C19641] bg-brand-purple/5 hover:bg-brand-purple/10 flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
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
          قريباً | COMING SOON
        </div>
        
        <p className="text-[10px] text-slate-400 font-sans tracking-wide">
          © 2026 Douaa & Basma - جميع الحقوق محفوظة
        </p>
      </div>

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
