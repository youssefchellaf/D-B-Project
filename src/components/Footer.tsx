import React from 'react';
import { ArrowUp, MapPin, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3E0B64] text-brand-ivory py-16 px-4 md:px-8 border-t-2 border-[#D4AF37] select-none relative overflow-hidden text-right">
      {/* Decorative background overlay */}
      <div className="absolute inset-0 z-0 zellige-overlay opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-brand-gold/15">
        
        {/* Brand visual description - spans 5 */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif font-extrabold text-2xl text-[#D4AF37] tracking-wider font-sans">
              Douaa & Basma
            </h3>
            <span className="font-serif font-bold text-lg text-white block">بسمة ودعاء</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
            نحن مشروع نسائي منزلي فاخر نلتزم بأعلى معايير الإتقان والجودة لتحضير أرقى المشروبات الطبيعية والتحليات الفاخرة المبتكرة في مدينة الفنيدق لتزين مناسباتكم الخاصة وجلساتكم الراقية.
          </p>
        </div>

        {/* Categories / Quick lists - spans 3 */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif font-black text-[#D4AF37] text-base">باقاتنا الفاخرة</h4>
          <ul className="space-y-2.5 text-sm text-slate-300 font-sans">
            <li>✦ عصائر طبيعية مبردة</li>
            <li>✦ تحليات ومخبوزات منزلية</li>
            <li>✦ صواني تقديم وحفلات</li>
            <li>✦ حلويات طازجة للمناسبات</li>
          </ul>
        </div>

        {/* Dynamic Location / Contact layout - spans 4 */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-serif font-black text-[#D4AF37] text-base">مكان الخدمة</h4>
          <ul className="space-y-3.5 text-sm text-slate-200 font-sans">
            <li className="flex items-center gap-2.5 justify-end">
              <span>الفنيدق، جهة طنجة تطوان الحسيمة، المغرب</span>
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
            </li>
            <li className="flex items-center gap-2.5 justify-end">
              <span dir="ltr">+212 600-000000</span>
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
            </li>
            <li className="flex items-center gap-2.5 justify-end">
              <span>مشروع عائلي نسائي نبع من القلب</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
            </li>
          </ul>
        </div>

      </div>

      {/* Mandatory Copyright and Scroll-to-top */}
      <div className="relative z-10 max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs sm:text-sm text-slate-300 font-sans text-right">
          © 2026 Douaa & Basma - جميع الحقوق محفوظة
        </p>

        {/* Scroll back up */}
        <button
          id="footer-back-to-top"
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-[#3E0B64] hover:bg-white hover:text-brand-purple rounded-xl text-xs font-bold font-sans cursor-pointer active:scale-95 transition-all duration-150"
        >
          <span>الرجوع للأعلى</span>
          <ArrowUp className="w-4 h-4 border border-brand-purple/20 rounded-full p-0.5" />
        </button>
      </div>
    </footer>
  );
}
