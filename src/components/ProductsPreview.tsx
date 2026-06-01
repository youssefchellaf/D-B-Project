import React, { useState } from 'react';
import { Eye, ShoppingBag, Flame, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  category: 'juice' | 'dessert' | 'bastilla';
  categoryLabel: string;
  image: string;
  tag: string;
  desc: string;
  ingredients: string[];
}

interface ProductsPreviewProps {
  onAddToCart: () => void;
  onShowMessage: (msg: string, success: boolean) => void;
}

export default function ProductsPreview({ onAddToCart, onShowMessage }: ProductsPreviewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'juice' | 'dessert' | 'bastilla'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Map generated images to variables
  const imgJuice = '/src/assets/images/glass_juice_cup_1780257175687.png';
  const imgDesserts = '/src/assets/images/moroccan_desserts_1780257194613.png';
  const imgBastilla = '/src/assets/images/moroccan_bastilla_1780257212278.png';

  const products: Product[] = [
    {
      id: 'prod-1',
      title: 'عصير البرتقال المنعش بالزعفران الحر والنعناع',
      category: 'juice',
      categoryLabel: 'عصائر طبيعية فاخرة',
      image: imgJuice,
      tag: 'الأكثر طلباً ✨',
      desc: 'مشروب منعش محضّر من أجود ثمار البرتقال واليوسفي المغربي المعصور بارداً، مع نفحة من الزعفران التاليويني الأصيل وأوراق النعناع الطازجة.',
      ingredients: ['برتقال مغربي طازج', 'زعفران تاليوين حر', 'أوراق النعناع', 'مستخلص الزهر'],
    },
    {
      id: 'prod-2',
      title: 'صينية الحلويات المغربية الملكية المشكلة',
      category: 'dessert',
      categoryLabel: 'تحليات منزلية فاخرة',
      image: imgDesserts,
      tag: 'إعداد تقليدي عريق 👑',
      desc: 'تشكيلة راقية من غزال اللوز المعطر بماء زهر البرتقال الحر والبريواة المقرمشة بالعسل المغربي الصافي والمخبّز باللوز الفاخر لتزيين مجالس ضيافتكم.',
      ingredients: ['لوز بلدي مطحون', 'ماء زهر حر', 'عسل طبيعي ممتاز', 'مسكة حرة'],
    },
    {
      id: 'prod-3',
      title: 'بسطيلة الدجاج البلدية التقليدية باللوز المقرمش',
      category: 'bastilla',
      categoryLabel: 'بسطيات ومعجنات',
      image: imgBastilla,
      tag: 'تراث أصيل ✦',
      desc: 'بسطيلة مغربية أصيلة بأوراق مقرمشة حشوة غنية بالدجاج المتبل بالبهارات المغربية مع طبقة سخية من اللوز المحمص المفروم وهزة السكر والقرفة الدافئة.',
      ingredients: ['دجاج بلدي متبل', 'لوز بلدي محمص ومفروم', 'بيض بلدي', 'زعفران وقرفة'],
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  const handlePreorder = (title: string) => {
    onAddToCart();
    onShowMessage(`تمت إضافة "${title}" إلى حقيبة التذوق المترقبة بنجاح!`, true);
  };

  return (
    <section id="preview" className="py-24 bg-brand-ivory select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Layout */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-purple bg-brand-purple/5 border border-brand-gold/20">
            🍽️ معاينة حصرية للقائمة الفاخرة
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-brand-purple leading-tight">
            مستحضرات "بسمة ودعاء" المرتقبة
          </h2>
          <p className="text-sm text-slate-500 font-sans leading-relaxed">
            تصفح عينة من عصائرنا الطبيعية وتحلياتنا الفواحة الحصرية واطلب حجز تذوقك مسبقاً قبل الافتتاح.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'الكل ✦' },
            { id: 'juice', label: '🥤 عصائر طبيعية' },
            { id: 'dessert', label: '🍮 تحليات فاخرة' },
            { id: 'bastilla', label: '👑 صواني تقديم فاخرة' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold leading-none cursor-pointer transition-all duration-200 border ${
                activeTab === tab.id
                  ? 'bg-[#5A148E] text-white border-[#5A148E] shadow-sm shadow-[#5A148E]/15'
                  : 'bg-white text-brand-purple border-brand-gold/15 hover:border-brand-purple/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-gold/10 hover:border-brand-purple/10 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              style={{
                boxShadow: '0 10px 30px rgba(90, 20, 142, 0.02)'
              }}
            >
              {/* Product Header Thumbnail */}
              <div className="relative pt-[80%] overflow-hidden bg-brand-cream border-b border-brand-gold/5 shrink-0">
                {/* Product Image Asset */}
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Top Overlay details */}
                <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#5A148E] text-white text-[10px] font-bold rounded-lg tracking-wide shadow-sm shadow-[#5A148E]/20">
                  {product.tag}
                </span>

                <span className="absolute bottom-4 left-4 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-brand-purple-dark text-[10px] font-extrabold rounded-md border border-brand-gold/20">
                  {product.categoryLabel}
                </span>
                
                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Product Content Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h3 className="font-serif font-black text-lg sm:text-xl text-brand-purple leading-snug hover:text-[#3E0B64] transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 font-sans leading-relaxed text-right line-clamp-3">
                    {product.desc}
                  </p>

                  {/* Tiny Ingredient List */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.ingredients.map((ing, i) => (
                      <span 
                        key={i} 
                        className="inline-block text-[9px] font-bold bg-brand-ivory text-brand-gold-dark px-2 py-0.5 rounded-full border border-brand-gold/10"
                      >
                        ✦ {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive pre-order actions */}
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between">
                  <button
                    id={`btn-view-${product.id}`}
                    onClick={() => setSelectedProduct(product)}
                    className="p-2.5 rounded-xl border border-brand-gold/20 text-brand-purple hover:bg-brand-purple/5 transition-all duration-150 cursor-pointer"
                    title="معاينة التفاصيل"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    id={`btn-pre-order-${product.id}`}
                    onClick={() => handlePreorder(product.title)}
                    className="flex-1 mr-3 py-2.5 px-4 bg-gradient-to-l from-brand-purple to-brand-purple-dark hover:from-brand-purple-dark hover:to-brand-purple text-white text-xs font-bold rounded-xl shadow-md shadow-brand-purple/10 hover:shadow-brand-purple/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    اضم لحقيبة التجربة مجاناً
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal/Lightbox Detail View */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[#3E0B64]/50 backdrop-blur-md transition-opacity duration-300"
              onClick={() => setSelectedProduct(null)}
            />

            {/* Modal Body Container */}
            <div 
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/20 z-50 animate-fade-in text-right"
              style={{
                boxShadow: '0 25px 50px -12px rgba(90, 20, 142, 0.25)'
              }}
            >
              {/* Image banner */}
              <div className="relative pt-[60%] shrink-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  id="btn-close-modal"
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Dynamic Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-brand-gold bg-brand-purple/5 border border-brand-gold/15 px-2.5 py-1 rounded-md">
                    {selectedProduct.categoryLabel}
                  </span>
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-brand-purple pt-2">
                    {selectedProduct.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-brand-purple-dark">تفاصيل المذاق:</h4>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    {selectedProduct.desc}
                  </p>
                </div>

                {/* Key specs or Ingredients list */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-brand-purple-dark">المكونات الطبيعية الفاخرة:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-sans font-medium">
                    {selectedProduct.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-1.5 justify-end">
                        <span>{ing}</span>
                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preorder trigger */}
                <div className="pt-6 border-t border-brand-gold/10 flex items-center justify-end gap-3">
                  <button
                    id="modal-cancel-btn"
                    onClick={() => setSelectedProduct(null)}
                    className="px-5 py-3 rounded-xl border border-brand-gold/20 text-brand-purple hover:bg-brand-purple/5 font-sans font-semibold text-xs cursor-pointer"
                  >
                    تراجع
                  </button>

                  <button
                    id="modal-order-btn"
                    onClick={() => {
                      handlePreorder(selectedProduct.title);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 px-6 bg-[#5A148E] text-white rounded-xl font-sans font-bold text-xs hover:bg-[#3E0B64] transition-all duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    احجز طبق التجربة الخاص بك
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
