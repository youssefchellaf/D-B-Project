import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  t: {
    countdownTitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  serifFont: string;
}

export default function CountdownTimer({ t, serifFont }: CountdownTimerProps) {
  // Opening Date: July 4, 2026 at 08:00:00 local time
  const targetDate = new Date('2026-07-04T08:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d,
        hours: h,
        minutes: m,
        seconds: s,
        isExpired: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="w-full max-w-sm mx-auto bg-brand-purple/5 border border-brand-gold/30 rounded-[20px] p-3 text-center">
        <span className={`text-[#3F1058] font-bold text-sm ${serifFont}`}>
          ✨ أهلاً بكم! لقد تم الافتتاح الرسمي ✨
        </span>
      </div>
    );
  }

  const formatNum = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-md border border-brand-gold/35 rounded-[24px] p-4 sm:p-5 shadow-[0_12px_32px_rgba(86,28,118,0.05)] relative overflow-hidden group select-none">
      {/* Delicate background glows inside the card */}
      <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-brand-gold/10 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-120" />
      <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-brand-green/10 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-120" />

      {/* Decorative stars / header */}
      <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 text-center">
        <Sparkles className="w-3.5 h-3.5 text-[#C19641] animate-pulse" />
        <span className={`text-xs font-black text-brand-purple tracking-wide ${serifFont}`}>
          {t.countdownTitle}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#C19641] animate-pulse" />
      </div>

      {/* Modern bento-style timers */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3" dir="ltr">
        {/* Days Box */}
        <div className="flex flex-col items-center">
          <div className="w-full bg-[#FAF9F6] border border-brand-gold/20 rounded-2xl py-2 flex items-center justify-center shadow-inner relative overflow-hidden">
            <span className="font-mono text-xl sm:text-2xl font-black text-brand-purple tracking-tight">
              {formatNum(timeLeft.days)}
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-500 mt-2 font-sans">
            {t.days}
          </span>
        </div>

        {/* Hours Box */}
        <div className="flex flex-col items-center">
          <div className="w-full bg-[#FAF9F6] border border-brand-gold/20 rounded-2xl py-2 flex items-center justify-center shadow-inner relative overflow-hidden">
            <span className="font-mono text-xl sm:text-2xl font-black text-brand-purple tracking-tight">
              {formatNum(timeLeft.hours)}
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-500 mt-2 font-sans">
            {t.hours}
          </span>
        </div>

        {/* Minutes Box */}
        <div className="flex flex-col items-center">
          <div className="w-full bg-[#FAF9F6] border border-brand-gold/20 rounded-2xl py-2 flex items-center justify-center shadow-inner relative overflow-hidden">
            <span className="font-mono text-xl sm:text-2xl font-black text-brand-purple tracking-tight">
              {formatNum(timeLeft.minutes)}
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-500 mt-2 font-sans">
            {t.minutes}
          </span>
        </div>

        {/* Seconds Box */}
        <div className="flex flex-col items-center">
          <div className="w-full bg-[#FAF9F6] border border-brand-gold/20 rounded-2xl py-2 flex items-center justify-center shadow-inner relative overflow-hidden">
            <span className="font-mono text-xl sm:text-2xl font-black text-brand-green tracking-tight">
              {formatNum(timeLeft.seconds)}
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-500 mt-2 font-sans">
            {t.seconds}
          </span>
        </div>
      </div>
    </div>
  );
}
