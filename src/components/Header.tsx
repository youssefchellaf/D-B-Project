import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowLeft, Clock, Instagram, HelpCircle, Sparkles } from 'lucide-react';
import LuxuryLogo from './LuxuryLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onShowWaitlist: () => void;
}

export default function Header({ cartCount, onOpenCart, onShowWaitlist }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'من نحن', href: '#about-brand' },
    { name: 'مميزاتنا', href: '#features' },
    { name: 'قائمة التذوق', href: '#preview' },
    { name: 'تواصل معنا', href: '#newsletter' },
  ];

  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-brand-ivory select-none transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Left Side: Mustard Gold Cart Button with Purple Badge */}
        <button
          id="btn-cart"
          onClick={onOpenCart}
          className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#D4AF37] hover:bg-[#AA841B] text-white hover:scale-105 active:scale-95 transition-all duration-200"
          style={{
            borderRadius: '16px 4px 16px 16px',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
          }}
          aria-label="Shopping Cart"
        >
          {/* Cart SVG Icon */}
          <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
          
          {/* Purple Badge with Item Count */}
          {cartCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-[#5A148E] text-white text-xs font-bold rounded-full border-2 border-white animate-pulse"
              style={{ boxShadow: '0 2px 4px rgba(90, 20, 142, 0.4)' }}
            >
              {cartCount}
            </span>
          )}
        </button>

        {/* Center: Brand Name & Symmetrical Emblem */}
        <div className="flex-1 flex justify-center">
          <a href="#hero" className="flex flex-col items-center">
            {/* Elegant Brand representation */}
            <LuxuryLogo size="sm" />
          </a>
        </div>

        {/* Right Side: Hamburger Menu Button */}
        <button
          id="btn-mobile-menu"
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-ivory hover:bg-brand-gold/10 text-brand-purple hover:scale-105 active:scale-95 transition-all duration-200 border border-brand-gold/20"
          style={{ width: '44px', height: '44px' }}
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Navigation (Slide out from RIGHT for RTL Layout) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur overlay */}
          <div
            className="absolute inset-0 bg-brand-purple/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-out">
            {/* Drawer Header */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-brand-ivory">
              <span className="font-serif font-bold text-brand-purple text-lg">بسمة ودعاء</span>
              <button
                id="btn-close-menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand-ivory text-brand-purple hover:bg-brand-purple/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links and Actions */}
            <div className="flex-1 px-6 py-8 space-y-4 overflow-y-auto">
              <div className="text-center pb-6 border-b border-brand-ivory">
                <div className="w-16 h-16 mx-auto mb-2 bg-brand-ivory rounded-full flex items-center justify-center border border-brand-gold/30">
                  <Sparkles className="w-8 h-8 text-[#D4AF37] animate-spin-slow" />
                </div>
                <h3 className="font-serif font-black text-brand-purple">قريباً في المغرب</h3>
                <p className="text-xs text-brand-gold-dark mt-1">عصائر طبيعية وتحليات منزلية فاخرة</p>
              </div>

              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-base font-semibold text-[#5A148E] hover:bg-[#5A148E]/5 hover:text-[#5A148E] rounded-xl transition-all duration-150"
                  >
                    <span>{link.name}</span>
                  </a>
                ))}
              </nav>

              <div className="pt-6 border-t border-brand-ivory space-y-3">
                <button
                  id="drawer-waitlist-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onShowWaitlist();
                  }}
                  className="w-full py-3 bg-[#5A148E] text-white rounded-xl font-bold hover:bg-[#3E0B64] transition-all duration-150 text-center shadow-md shadow-[#5A148E]/20"
                >
                  انضم لقائمة الانتظار 🚀
                </button>
                <button
                  id="drawer-whats-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const text = encodeURIComponent("مرحباً، أود الاستفسار والتواصل معكم بخصوص خدماتكم الفاخرة للتحليات والعصائر المترقبة");
                    window.open(`https://wa.me/212705908383?text=${text}`, '_blank');
                  }}
                  className="w-full py-3 border border-brand-gold text-brand-gold rounded-xl font-bold hover:bg-brand-gold/5 transition-all duration-150 text-center"
                >
                  تواصل عير واتساب
                </button>
              </div>
            </div>

            {/* Drawer Footer info */}
            <div className="p-6 bg-brand-ivory text-center text-xs text-brand-gold-dark font-sans">
              <span>© 2026 Douaa & Basma</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
