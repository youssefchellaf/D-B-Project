import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  success: boolean;
  onClose: () => void;
}

export default function NotificationToast({ message, success, onClose }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full mx-auto p-4 rounded-2xl bg-white shadow-2xl border border-brand-gold/20 flex gap-3 text-right animate-slide-in">
      {/* Icon based on success */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      </div>

      <div className="flex-1 space-y-1">
        <h5 className="font-serif font-bold text-[#5A148E] text-sm">
          {success ? 'تأكيد العملية' : 'تنبيه'}
        </h5>
        <p className="text-xs text-slate-600 font-sans leading-relaxed">
          {message}
        </p>
      </div>

      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 text-sm font-sans shrink-0 self-center pl-1"
      >
        ✕
      </button>
    </div>
  );
}
