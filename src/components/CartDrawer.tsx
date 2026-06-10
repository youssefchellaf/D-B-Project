import React, { useState } from 'react';
import { ShoppingBag, Trash2, X, Plus, Minus, CheckCircle, Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  onClear: () => void;
  onShowMessage: (msg: string, success: boolean) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartCount,
  onClear,
  onShowMessage,
  onIncrement,
  onDecrement,
}: CartDrawerProps) {
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Fnideq'); // Default Fnideq
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      onShowMessage('يرجى كتابة الاسم ورقم الهاتف لتبسيط حجزك مسبقاً.', false);
      return;
    }

    setLoading(true);

    // Synchronize to backend waitlist
    const payload = `${name} | ${phone} | ${city === 'Fnideq' ? 'الفنيدق' : city === 'Mdiq' ? 'المضيق' : 'تطوان'} | السلال: ${cartCount} | ملاحظات: ${notes || 'لا يوجد'}`;

    fetch('/api/register-phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: payload })
    })
    .catch(err => console.error("Error registering waitlist phone:", err))
    .finally(() => {
      setSuccess(true);
      setLoading(false);
      onShowMessage('تم استلام طلب التذوق المسبق وتثبيت اسمك بقائمة الانتظار بنجاح!', true);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Absolute Backdrop */}
      <div 
        className="absolute inset-0 bg-[#3E0B64]/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 left-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-50 text-right animate-slide-in">
        
        {/* Header Block */}
        <div className="h-20 sm:h-24 flex items-center justify-between px-6 border-b border-brand-ivory shrink-0">
          <button
            id="btn-close-cart-drawer"
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand-ivory text-brand-purple hover:bg-brand-purple/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-black text-brand-purple text-lg sm:text-xl">حقيبة تذوقك المترقبة</h3>
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
          </div>
        </div>

        {/* Dynamic Inner views */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {success ? (
            <div className="space-y-6 py-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-brand-gold/15 rounded-full flex items-center justify-center border-2 border-brand-gold animate-bounce">
                <CheckCircle className="w-10 h-10 text-brand-purple" />
              </div>
              <h4 className="font-serif font-black text-2xl text-brand-purple">تم التسجيل بنجاح!</h4>
              <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-sm">
                مرحباً بك يا <strong>{name}</strong> في قائمة الانتظار الحصرية لعلامة <strong>"بسمة ودعاء"</strong>. نحن ممتنون جداً لاهتمامك بمشروعنا وباقات التذوق المجانية.
              </p>
              <div className="p-4 bg-brand-ivory rounded-2xl border border-brand-gold/20 text-xs text-brand-purple-dark text-right max-w-xs space-y-1">
                <p>📍 المدينة المختارة: <strong className="font-sans">{city === 'Fnideq' ? 'الفنيدق' : city === 'Mdiq' ? 'المضيق' : 'تطوان'}</strong></p>
                <p>📞 رقم الاتصال المسجل: <strong dir="ltr">{phone}</strong></p>
                <p>🏷️ الباقات المحجوزة: <strong>{cartCount} باقات تحليات فاخرة وعصائر طبيعية</strong></p>
              </div>
              <p className="text-[11px] text-brand-gold-dark font-sans font-bold">
                * سنقوم بمراسلتك هاتفياً أو عبر واتساب لدعوتك ليوم الافتتاح الخاص. حظاً طيباً!
              </p>
              <button
                id="btn-close-cart-success"
                onClick={() => {
                  setSuccess(false);
                  onClear();
                  onClose();
                }}
                className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl font-bold transition-all"
              >
                الموافقة والعودة للموقع
              </button>
            </div>
          ) : cartCount === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-brand-ivory rounded-full flex items-center justify-center border border-brand-gold/20">
                <ShoppingBag className="w-8 h-8 text-brand-purple/40" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-brand-purple">الحقيبة فارغة حالياً</h4>
                <p className="text-xs text-slate-500 font-sans mt-1">تصفح مستحضراتنا المترقبة أدناه وأضف باقتك مجاناً لتثبيتها في يوم الافتتاح!</p>
              </div>
              <button
                id="cart-action-back-btn"
                onClick={onClose}
                className="inline-block px-6 py-2 border border-brand-gold text-brand-gold rounded-full text-xs font-bold font-sans hover:bg-brand-cream"
              >
                اذهب لتصفح القائمة
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Product item display */}
              <div className="bg-brand-cream/80 p-5 rounded-2xl border border-brand-gold/10 space-y-4 text-right">
                <div className="flex items-center justify-between border-b border-brand-gold/10 pb-3">
                  <button 
                    id="btn-trash-all"
                    onClick={() => {
                      onClear();
                      onShowMessage('تم إفراغ سلة التذوق بنجاح.', true);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                    title="حذف الكل"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div>
                    <h5 className="font-serif font-black text-brand-purple">باقة التذوق المجانية المفتوحة</h5>
                    <p className="text-[10px] text-brand-gold-dark font-sans leading-none mt-1">عرابة عصائر وتحليات وحلويات مغربية فاخرة</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-qty-inc"
                      onClick={onIncrement}
                      className="w-8 h-8 rounded-lg bg-white text-brand-purple border border-brand-gold/20 flex items-center justify-center font-bold font-sans hover:bg-brand-ivory cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-lg text-brand-purple font-sans w-6 text-center">{cartCount}</span>
                    <button
                      id="btn-qty-dec"
                      onClick={onDecrement}
                      disabled={cartCount === 1}
                      className="w-8 h-8 rounded-lg bg-white text-brand-purple border border-brand-gold/20 flex items-center justify-center font-bold font-sans hover:bg-brand-ivory disabled:opacity-50 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                    🎁 تجربة مجانية حصرية (مجانياً)
                  </span>
                </div>
              </div>

              {/* Traditional Benefit Box */}
              <div className="bg-[#5A148E]/5 p-4 rounded-xl border border-brand-purple/20 flex gap-3 text-right">
                <div className="w-8 h-8 bg-brand-gold rounded-xl flex items-center justify-center text-[#3E0B64] shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-[#5A148E] font-serif">هدية حصرية ليوم الافتتاح</h6>
                  <p className="text-[10px] text-slate-600 font-sans leading-relaxed mt-0.5">
                    سيحصل جميع المسجلين بقائمة الانتظار على كوب عصير برتقال طبيعي معطر وصحن حلوى كعب الغزال مجاناً عند تلبية دعوتنا.
                  </p>
                </div>
              </div>

              {/* Booking Checkout form wrapper */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-brand-gold/15">
                <h4 className="font-serif font-black text-base text-brand-purple-dark">
                  أكمل تسجيل اسمك وحجز تذوقك الفاخر:
                </h4>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-sans">الاسم الكامل الكرم:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: يونس الشلاف"
                    className="w-full py-3 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple bg-white text-right text-brand-purple placeholder-brand-purple/30 font-sans text-sm outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-sans">رقم الهاتف للاتصال المباشر:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: +212 600-000000"
                    className="w-full py-3 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple bg-white text-right text-brand-purple placeholder-brand-purple/30 font-sans text-sm outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-sans">المدينة القريبة للضيافة:</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple bg-white text-right text-brand-purple font-sans text-sm outline-none transition-all"
                  >
                    <option value="Fnideq">الفنيدق (مدينة الافتتاح)</option>
                    <option value="Mdiq">المضيق</option>
                    <option value="Tetouan">تطوان</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-sans">ملاحظات أو تفضيلات الوجبات (اختياري):</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="لديك حساسية معينة أو تود حجز بسطيلة دجاج بنكهة إضافية؟"
                    rows={3}
                    className="w-full py-3 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple bg-white text-right text-brand-purple placeholder-brand-purple/30 font-sans text-sm outline-none transition-all resize-none"
                  />
                </div>

                <button
                  id="cart-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-brand-purple to-[#3E0B64] hover:from-[#3E0B64] hover:to-brand-purple text-white rounded-xl font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/20"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "تثبيت حجز تذوقي المجاني والموافقة 🚀"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
