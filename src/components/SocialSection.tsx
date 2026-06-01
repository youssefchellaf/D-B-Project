import React from 'react';
import { Instagram, Facebook, Share2, Sparkles, AlertCircle } from 'lucide-react';

interface SocialSectionProps {
  onShowMessage: (msg: string, success: boolean) => void;
}

export default function SocialSection({ onShowMessage }: SocialSectionProps) {
  
  const socialLinks = [
    {
      platform: 'instagram',
      name: 'انستغرام الرسمية',
      handle: '@douaabasma_1',
      url: 'https://instagram.com/douaabasma_1',
      followers: '1.2K متابع نشط',
      color: 'from-[#833AB4] via-[#FD1D1D] to-[#F56040]',
      icon: <Instagram className="w-6 h-6 text-white" />,
      tagline: 'كواليس إعداد العصائر والتحليات الفاخرة يومياً',
    },
    {
      platform: 'facebook',
      name: 'صفحة فيسبوك',
      handle: '@douaabasma01',
      url: 'https://m.facebook.com/douaabasma01/',
      followers: '2.4K معجب بالخدمة',
      color: 'from-[#1877F2] to-[#115293]',
      icon: <Facebook className="w-6 h-6 text-white" />,
      tagline: 'تحديثات الإطلاق ومراجعات زبائننا الكرام',
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'بسمة ودعاء - عصائر وتحليات فاخرة قريباً',
        text: 'انضم لقائمة الانتظار واحجز باقة التجربة المجانية من بسمة ودعاء بمدينة الفنيدق والمضيق.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowMessage('تم نسخ رابط الموقع بنجاح! شاركه مع عائلتك وأصدقائك.', true);
    }
  };

  return (
    <section id="social" className="py-24 bg-white relative overflow-hidden select-none">
      {/* Decorative Zellige subtle overlay */}
      <div className="absolute inset-0 z-0 zellige-overlay opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Layout */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-purple bg-brand-purple/5 border border-brand-purple/10">
            💬 مجتمع بسمة ودعاء عائلتي
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-brand-purple leading-tight">
            تابعونا لمعرفة آخر المستجدات
          </h2>
          <p className="text-sm text-slate-500 font-sans leading-relaxed">
            نشارك معكم كواليس تحضير الطلبيات وتفاصيل تجارب تذوق منتجاتنا الفاخرة عبر منصات التواصل الاجتماعي الخاصة بنا.
          </p>
        </div>

        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#FAF9F6] p-8 rounded-3xl border border-brand-gold/15 hover:border-brand-purple/20 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between text-right"
            >
              <div className="space-y-6">
                {/* Social Header */}
                <div className="flex items-center justify-between">
                  {/* Followers Indicator */}
                  <span className="text-xs font-bold text-brand-gold bg-brand-purple/5 px-3 py-1 rounded-full border border-brand-gold/10">
                    {link.followers}
                  </span>
                  
                  {/* Colored Brand Circle */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${link.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}>
                    {link.icon}
                  </div>
                </div>

                {/* Handles */}
                <div className="space-y-1.5">
                  <h3 className="font-serif font-black text-xl text-brand-purple">
                    {link.name}
                  </h3>
                  <p className="text-base font-bold text-brand-gold-dark font-sans tracking-wide" dir="ltr">
                    {link.handle}
                  </p>
                </div>

                <p className="text-sm text-slate-600 font-sans leading-relaxed">
                  {link.tagline}
                </p>
              </div>

              {/* Anchor footer */}
              <div className="pt-6 mt-6 border-t border-brand-gold/10 flex items-center justify-end">
                <span className="text-xs font-black text-brand-purple hover:text-brand-gold-dark transition-colors duration-200 flex items-center gap-1">
                  زوروا صفحتنا الرسمية الآن ✦
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Share Button Block */}
        <div className="text-center mt-16 pb-4">
          <button
            id="social-share-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white text-sm font-bold font-sans cursor-pointer transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-brand-purple/20"
          >
            <Share2 className="w-4 h-4" />
            أنشر الخبر وشارك هذا الموقع الفاخر مع صديقك
          </button>
          
          <p className="text-[11px] text-slate-400 font-sans mt-3">
            ساعد جيرانك وأحبائك على الانضمام لقرية المشروبات الطازجة والتحليات الحقيقية بمدينة الفنيدق والمضيق.
          </p>
        </div>

      </div>
    </section>
  );
}
