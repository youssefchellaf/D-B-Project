import React from 'react';
import { GlassWater, Dessert, Utensils, Sparkles } from 'lucide-react';

export default function Features() {
  const cards = [
    {
      id: 'juice',
      icon: <GlassWater className="w-8 h-8 text-[#D4AF37]" />,
      emoji: '🥤',
      title: 'عصائر طبيعية',
      description: 'محضرة من أجود الفواكه الطازجة الطبيعية 100% والمستخلصة بكل عناية لتحظوا بمذاق غني بالانتعاش والحيوية.',
      badge: 'طازجة ومبردة',
    },
    {
      id: 'dessert',
      icon: <Dessert className="w-8 h-8 text-[#D4AF37]" />,
      emoji: '🍮',
      title: 'تحليات فاخرة',
      description: 'وصفات منزلية بطابع راقٍ تمتزج فيها النكهات الأصيلة والمكونات الممتازة لتصنع لكم أوقاتاً ممتعة وحلوة.',
      badge: 'صنع منزلي بلمسة ملكية',
    },
    {
      id: 'catering',
      icon: <Utensils className="w-8 h-8 text-[#D4AF37]" />,
      emoji: '👑',
      title: 'صواني تقديم وحفلات',
      description: 'تشكيلة كاملة وصواني تقديم مبتكرة من العصائر والتحليات الفاخرة لمناسباتكم، حفلاتكم، وأوقاتكم العائلية الخاصة.',
      badge: 'مستوى ضيافة متميز',
    }
  ];

  return (
    <section id="features" className="py-24 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Layout */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-purple tracking-widest uppercase bg-brand-purple/5 px-3 py-1 rounded-full border border-brand-purple/10">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" /> مميزات تجربة بسمة ودعاء
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-brand-purple leading-tight">
            ما نقدمه ليرتقي بمناسباتكم
          </h2>
          <p className="text-sm text-slate-500 font-sans leading-relaxed">
            سر جودة منتجاتنا يكمن في الاختيار الدقيق لأجود الفواكه المحلية الطرية والالتزام بمعايير الضيافة الراقية.
          </p>
        </div>

        {/* 3 Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {cards.map((card, index) => {
            return (
              <div
                key={card.id}
                className="group relative bg-[#F8F6F2] hover:bg-white rounded-3xl p-8 border border-brand-gold/15 hover:border-brand-purple/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                style={{
                  boxShadow: '0 8px 24px rgba(90, 20, 142, 0.02)',
                }}
              >
                {/* Decorative Pattern behind hover */}
                <div className="absolute inset-0 z-0 zellige-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl" />
                
                {/* Floating shine dot */}
                <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-brand-gold opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-6 relative z-10 text-right">
                  {/* Icon Frame */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-brand-gold/20 shadow-sm group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                      <div className="group-hover:text-brand-gold-light transition-colors">
                        {card.icon}
                      </div>
                    </div>
                    {/* Big faint emoji background */}
                    <span className="text-4xl select-none opacity-20 filter grayscale-0 group-hover:scale-110 transition-transform duration-300">{card.emoji}</span>
                  </div>

                  {/* Badge */}
                  <span className="inline-block text-[10px] font-bold tracking-wider px-2.5 py-1 bg-brand-purple/5 text-brand-purple rounded-md font-sans">
                    {card.badge}
                  </span>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-purple transition-colors duration-200 group-hover:text-brand-purple-dark">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-sans leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Footer anchor */}
                <div className="pt-6 mt-6 border-t border-brand-gold/10 relative z-10 flex items-center justify-end group">
                  <span className="text-xs font-bold text-brand-purple-dark group-hover:text-brand-gold transition-colors duration-150 font-sans">
                    سيكون متوفراً قريباً ✦
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
