import React, { useState } from 'react';
import { Mail, CheckCircle2, MessageSquare, ArrowDown, Sparkles } from 'lucide-react';
import LuxuryLogo from './LuxuryLogo';

interface HeroProps {
  onSubscribe: (email: string) => void;
  onShowMessage: (msg: string, success: boolean) => void;
}

export default function Hero({ onSubscribe, onShowMessage }: HeroProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      onShowMessage('يرجى إدخال بريدك الإلكتروني بشكل صحيح الكرم.', false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      onShowMessage('البريد الإلكتروني المدخل غير صالح. يرجى التأكد منه.', false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSubscribe(email);
      setSubscribed(true);
      setLoading(false);
      setEmail('');
      onShowMessage('تم تسجيل بريدك الإلكتروني بنجاح! سنقوم بإخبارك فور الإطلاق.', true);
    }, 1200);
  };

  const handleWhatsappClick = () => {
    const text = encodeURIComponent("مرحباً، أود الاستفسار والتواصل معكم بخصوص خدماتكم الفاخرة للتحليات والعصائر المترقبة");
    window.open(`https://wa.me/212705908383?text=${text}`, '_blank');
  };

  // Image path from our generated images
  const bgImagePath = '/src/assets/images/moroccan_palace_bg_1780257156203.png';

  return (
    <section id="hero" className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-8 pb-16 px-4 overflow-hidden select-none">
      
      {/* Background Image Container with Luxury radial-gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-102 filter brightness-[0.75] transition-all duration-700"
        style={{
          backgroundImage: `url(${bgImagePath})`,
        }}
      />
      
      {/* Absolute Overlays for Luxury Palace feel */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-purple/40 via-brand-purple/70 to-white/95 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-0 z-0 zellige-overlay opacity-30" />

      {/* Hero Content Wrapper */}
      <div className="relative z-20 max-w-4xl w-full text-center flex flex-col items-center">
        
        {/* Soft Glassmorphism Card Frame holding Main Details */}
        <div 
          className="w-full bg-white/80 backdrop-blur-md px-6 sm:px-12 py-10 sm:py-16 rounded-3xl border border-white/40 shadow-2xl space-y-8 max-w-3xl"
          style={{
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.6)'
          }}
        >
          {/* Logo element top center */}
          <LuxuryLogo size="lg" withTagline={true} className="animate-pulse-slow mb-4" />

          {/* Badge: "الموقع الرسمي قيد الإطلاق" + "مشروع نسائي منزلي فاخر" */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span 
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-[#5A148E] bg-[#5A148E]/10 border border-[#5A148E]/20"
              style={{ letterSpacing: '0.025em' }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              🚀 الموقع الرسمي قيد الإطلاق
            </span>

            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-[#D4AF37] bg-brand-cream border border-brand-gold/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin-slow" />
              ✨ مشروع نسائي منزلي فاخر 100%
            </span>
          </div>

          {/* Heading layout */}
          <div className="space-y-3">
            <h2 className="font-serif font-black text-4xl sm:text-6xl text-brand-purple tracking-tight leading-tight">
              شيء مميز قادم قريباً
            </h2>
            <p className="font-serif font-bold text-2xl sm:text-3xl text-brand-gold">
              مذاق طبيعي... بلمسة فاخرة
            </p>
          </div>

          {/* Subheadline description */}
          <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl mx-auto font-medium">
            نعمل على إطلاق تجربة فاخرة لعرض أشهى العصائر الطبيعية المبردة المبتكرة والتحليات المنزلية المغربية بطابع راقٍ يستحقه ضيوفكم الكرام بمدينة الفنيدق والمناطق المجاورة.
          </p>

          <footer className="space-y-6 pt-4 border-t border-brand-gold/15">
            {/* Subscription and Call to action (Contained inside a tidy container) */}
            <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-purple-dark">
              📍 كن أول من يعلم عند الإطلاق الفاخر
            </h3>

            {subscribed ? (
              <div 
                className="max-w-md mx-auto p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl flex items-center justify-center gap-3 animate-fade-in"
              >
                <CheckCircle2 className="w-6 h-6 text-brand-purple" />
                <p className="text-sm font-bold text-brand-purple-dark font-sans text-right">
                  شكراً لانضمامك! سنقوم بإرسال دعوة خاصة لبريدك عند الافتتاح مباشرة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-brand-purple/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full py-3.5 pr-11 pl-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple bg-white text-right text-brand-purple placeholder-brand-purple/40 font-sans text-sm outline-none transition-all duration-150 shadow-inner"
                  />
                </div>
                <button
                  id="hero-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl font-bold font-sans text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-brand-purple/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "أخبرني عند الإطلاق"
                  )}
                </button>
              </form>
            )}

            {/* Alternative Action - WhatsApp Link */}
            <div className="pt-2">
              <button
                id="hero-whatsapp-btn"
                onClick={handleWhatsappClick}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl border-2 border-brand-gold text-brand-gold hover:text-white bg-transparent hover:bg-brand-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-bold font-sans text-sm shadow-md cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                تواصل معنا الآن عبر واتساب
              </button>
            </div>
          </footer>
        </div>

        {/* Floating Indicator Scroll Down */}
        <a 
          href="#about-brand" 
          className="mt-12 flex flex-col items-center text-white/80 hover:text-white transition-colors duration-200 animate-bounce cursor-pointer group"
        >
          <span className="text-xs font-semibold tracking-wider mb-1.5 font-sans">اكتشف تفاصيل مشروعنا</span>
          <ArrowDown className="w-4 h-4 border border-white/50 rounded-full p-0.5 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </section>
  );
}
