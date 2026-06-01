import React from 'react';
import { Sparkles, Heart, Landmark, Award } from 'lucide-react';

export default function AboutBrand() {
  return (
    <section id="about-brand" className="py-20 bg-brand-cream border-t border-b border-brand-gold/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Title Layout */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-gold bg-brand-purple/5 border border-brand-gold/20">
            👑 روح الضيافة المغربية الأصيلة
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-brand-purple leading-tight">
            قصة "بسمة ودعاء" ونشأتنا
          </h2>
          <div className="flex items-center justify-center w-24 gap-1.5 mx-auto">
            <span className="h-[1px] w-full bg-brand-gold" />
            <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
            <span className="h-[1px] w-full bg-brand-gold" />
          </div>
          <p className="text-sm font-medium text-slate-500 font-sans">
            من شغف الطهي العائلي والتقاليد العريقة والملعقة المغربية الذهبية
          </p>
        </div>

        {/* Content Columns: Text narrative left, decorative values card right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Narrative Text - span 7 */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="space-y-4">
              <h3 className="font-serif font-black text-2xl text-brand-purple-dark">
                كيف بدأ مشروعنا العائلي؟
              </h3>
              <p className="text-base text-slate-700 leading-relaxed font-sans">
                بدأت رحلة <strong>"بسمة ودعاء"</strong> في كنف عائلة مغربية تفخر بمطبخها وتقاليدها المتوارثة عبر الأجيال. كعصاميات شغوفات بالتفاصيل، لاحظنا أن هناك فراغاً لعرض العصائر الطبيعية الطازجة والتحليات الفاخرة بطابع منزلي خالص وبلمسة تقديم راقية تليق بالمناسبات الخاصة بمناطق شمال المغرب العزيز.
              </p>
              <p className="text-base text-slate-700 leading-relaxed font-sans">
                قررنا معاً المزج بين المذاق المنعش للعصائر الطبيعية الحيوية المستخلصة من فواكه طازجة منتقاة بكل حب، وبراعة التحليات والحلويات المغربية والراقية المبتكرة، لنقدم لبيوتكم كرم الضيافة الملكية وبشكل عصري مبهر.
              </p>
            </div>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-5 rounded-2xl border border-brand-gold/10 flex gap-4 text-right">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-purple shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#5A148E] text-base">بأيدي نسائية 100%</h4>
                  <p className="text-xs text-slate-500 font-sans mt-1">مشروع منزلي نسائي يعتني بأدق التفاصيل والتقديم الفاخر.</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-brand-gold/10 flex gap-4 text-right">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-gold shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#5A148E] text-base">جودة وطراوة مطلقة</h4>
                  <p className="text-xs text-slate-500 font-sans mt-1">فواكه منتقاة بعناية ومكونات فاخرة خالية تماما من الحوافظ.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Showcase Card - span 5 */}
          <div className="lg:col-span-5">
            <div 
              className="relative p-8 rounded-3xl bg-brand-purple text-white overflow-hidden"
              style={{
                boxShadow: '0 16px 32px rgba(90,20,142,0.15)'
              }}
            >
              {/* Mosaic outline decoration */}
              <div className="absolute inset-0 z-0 zellige-overlay opacity-15" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-brand-gold/20 rounded-full blur-2xl" />
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-brand-purple-dark rounded-full blur-2xl" />

              <div className="relative z-10 space-y-6 text-right">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-brand-gold" />
                </div>
                
                <h3 className="font-serif font-bold text-xl text-brand-gold">
                  شعارنا الدائم للضيافة ⚜️
                </h3>
                
                <blockquote className="font-serif italic text-lg leading-relaxed text-brand-ivory">
                  "الجودة ليست خياراً بل هي انعكاس لأصالتنا. كل كوب عصير طازج وكل قطعة تحلية نصنعها في مطبخ بسمة ودعاء نعتبرها تحفة فنية نحضرها لصنع ذكريات لا تُنسى في مجالسكم المميزة."
                </blockquote>

                <div className="pt-4 border-t border-white/20 flex justify-between items-center text-xs text-brand-gold-light">
                  <div className="flex gap-2">
                    <span className="font-sans font-bold">الملاك والمؤسسون</span>
                  </div>
                  <span className="font-serif font-medium">بسمة ودعاء</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
