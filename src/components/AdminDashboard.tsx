import React, { useState, useEffect } from 'react';
import { Phone, Lock, Download, Trash2, ExternalLink, Search, Users, Calendar, ArrowRight, ShieldCheck, LogOut, RefreshCw, Settings, Globe, Upload, Image, Code } from 'lucide-react';
import LuxuryLogo from './LuxuryLogo';

interface PhoneRecord {
  phone: string;
  registeredAt: string;
}

interface AdminDashboardProps {
  onBack?: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'subscribers' | 'settings'>('subscribers');
  const [records, setRecords] = useState<PhoneRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Settings state matching backend model
  const [settingsForm, setSettingsForm] = useState({
    location: "الفنيدق، المغرب",
    statusTag: "قريباً",
    title: "شيء مميز قيد التحضير",
    description: "نعمل على إطلاق تجربة فاخرة تليق بكم لعرض أشهى العصائر الطبيعية والتحليات الفاخرة بلمسات نسائية مغربية متقنة وبكل حب وشغف.",
    pageTitle: "بسمة ودعاء | الصفحة الرسمية لعلامة عصائر وتحليات فاخرة",
    whatsapp: "212705908383",
    whatsappMsg: "مرحباً، أود الاستفسار والتواصل معكم بخصوص خدماتكم الفاخرة للتحليات والعصائر المترقبة",
    instagram: "https://instagram.com/douaabasma_1",
    facebook: "https://m.facebook.com/douaabasma01/",
    faviconSvg: "",
  });
  const [savingSettings, setSavingSettings] = useState(false);

  // Favicon Upload & Drag State
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showRawSvgEditor, setShowRawSvgEditor] = useState(false);

  const processFaviconFile = (file: File) => {
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setSettingsForm(prev => ({ ...prev, faviconSvg: text }));
      };
      reader.readAsText(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        // Embed the image in an SVG wrapper
        const wrappedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">\n  <image href="${dataUrl}" x="0" y="0" width="512" height="512" />\n</svg>`;
        setSettingsForm(prev => ({ ...prev, faviconSvg: wrappedSvg }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFaviconFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFaviconFile(file);
    }
  };

  // Check existing session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('douaa_basma_admin_password');
    if (savedToken) {
      verifySavedPassword(savedToken);
    }
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.settings) {
          setSettingsForm(data.settings);
        }
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  const verifySavedPassword = async (savedPw: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: savedPw }),
      });
      if (response.ok) {
        setIsAuthenticated(true);
        fetchRecords(savedPw);
        fetchSettings();
      } else {
        sessionStorage.removeItem('douaa_basma_admin_password');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async (pw: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/registered-phones', {
        headers: {
          'Authorization': `Bearer ${pw}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRecords(data.phones || []);
      } else {
        showStatus('فشل تحميل قائمة الأرقام.', false);
      }
    } catch (err) {
      console.error(err);
      showStatus('فشل في الاتصال بالخادم.', false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoginLoading(true);
    setLoginError('');
    try {
      const response = await fetch('/api/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('douaa_basma_admin_password', password);
        fetchRecords(password);
        fetchSettings();
      } else {
        setLoginError('كلمة المرور غير صحيحة. يرجى المحاولة مجدداً.');
      }
    } catch (err) {
      setLoginError('حدث خطأ أثناء محاولة تسجيل الدخول.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('douaa_basma_admin_password');
    setIsAuthenticated(false);
    setRecords([]);
    setPassword('');
  };

  const handleDelete = async (phone: string) => {
    const pw = sessionStorage.getItem('douaa_basma_admin_password') || password;
    try {
      const response = await fetch('/api/delete-phone', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pw}`,
        },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        setRecords(prev => prev.filter(r => r.phone !== phone));
        setConfirmDelete(null);
        showStatus('تم حذف الرقم بنجاح.', true);
      } else {
        showStatus('فشل حذف الرقم.', false);
      }
    } catch (err) {
      console.error(err);
      showStatus('حدث خطأ أثناء محاولة الحذف.', false);
    }
  };

  const showStatus = (text: string, success: boolean) => {
    setStatusMessage({ text, success });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    const pw = sessionStorage.getItem('douaa_basma_admin_password') || password;
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pw}`,
        },
        body: JSON.stringify({ settings: settingsForm }),
      });
      if (response.ok) {
        showStatus('تم حفظ وتحديث إعدادات ونصوص الصفحة الرئيسية بنجاح!', true);
      } else {
        const errData = await response.json();
        showStatus(errData.error || 'فشل حفظ الإعدادات.', false);
      }
    } catch (err) {
      console.error(err);
      showStatus('حدث خطأ أثناء الاتصال بالخادم.', false);
    } finally {
      setSavingSettings(false);
    }
  };

  // Export database to CSV
  const exportToCSV = () => {
    if (records.length === 0) {
      showStatus('لا توجد أرقام لتصديرها.', false);
      return;
    }

    // Header UTF-8 BOM to display Arabic correctly in Excel
    const BOM = '\uFEFF';
    let csvContent = BOM + 'رقم الهاتف,تاريخ التسجيل,تاريخ منسّق\n';
    
    records.forEach(r => {
      const dateFormatted = new Date(r.registeredAt).toLocaleString('ar-MA', { timeZone: 'Africa/Casablanca' });
      csvContent += `"${r.phone}","${r.registeredAt}","${dateFormatted}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `قائمة_عملاء_بسمة_ودعاء_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus('تم تصدير ملف CSV بنجاح.', true);
  };

  // Filter records based on search query
  const filteredRecords = records.filter(r => 
    r.phone.includes(searchQuery) ||
    new Date(r.registeredAt).toLocaleDateString().includes(searchQuery)
  );

  // Statistics calculation
  const totalSubscribers = records.length;
  
  const todayCount = records.filter(r => {
    const regDate = new Date(r.registeredAt);
    const today = new Date();
    return regDate.getDate() === today.getDate() &&
           regDate.getMonth() === today.getMonth() &&
           regDate.getFullYear() === today.getFullYear();
  }).length;

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDFCF7] via-[#FAF8F2] to-[#F5EFE0] flex flex-col justify-center items-center font-sans antialiased">
        <span className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></span>
        <p className="mt-4 text-brand-purple font-bold">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] bg-gradient-to-br from-[#FDFCF7] via-[#FAF8F2] to-[#F5EFE0] text-slate-800 font-sans antialiased text-right flex flex-col select-none px-4 py-8 sm:px-6 sm:py-12">
      
      {/* Decorative ambient spots */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-brand-purple/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto z-10 flex-1 flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-brand-gold/10 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <LuxuryLogo size="sm" />
          </div>
          
          <div className="flex items-center gap-2">
            {onBack ? (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                }}
                className="px-3.5 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                العودة للموقع الرئيسي
              </button>
            ) : (
              <a 
                href="/"
                className="px-3.5 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-150 inline-flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                العودة للموقع الرئيسي
              </a>
            )}

            {isAuthenticated && (
              <button 
                onClick={handleLogout}
                className="px-3.5 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                تسجيل الخروج
              </button>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {statusMessage && (
          <div className={`mb-4 p-3 rounded-xl border text-xs font-bold text-center animate-fade-in ${
            statusMessage.success 
              ? 'bg-brand-green/10 border-brand-green/20 text-brand-green-dark' 
              : 'bg-red-50 border-red-100 text-red-700'
          }`}>
            {statusMessage.text}
          </div>
        )}

        {/* 1. Login form if not authenticated */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center py-10">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-brand-gold/20 shadow-xl shadow-brand-purple/5 space-y-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-brand-purple/5 border border-brand-purple/15 flex items-center justify-center text-brand-purple">
                <Lock className="w-5 h-5" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#3F1058]">الوصول الآمن للوحة التحكم</h3>
                <p className="text-xs text-slate-500 leading-normal">يرجى إدخال كلمة مرور الإدارة لعرض وتنزيل قائمة أرقام المسجلين.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة مرور المدير"
                    className="w-full py-3 pr-10 pl-4 rounded-xl border border-brand-gold/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 bg-white text-right text-slate-800 placeholder-slate-400 text-xs outline-none transition-all duration-150 font-sans"
                  />
                </div>

                {loginError && (
                  <p className="text-[11px] text-red-600 font-bold bg-red-50 py-2 px-3 rounded-lg border border-red-100 text-right">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-brand-purple/15"
                >
                  {loginLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      التحقق والدخول
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          // 2. Main Dashboard content
          <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
            
            {/* Elegant Tab Buttons */}
            <div className="flex border-b border-brand-gold/15 gap-2">
              <button
                onClick={() => setActiveTab('subscribers')}
                className={`py-3 px-6 text-xs font-bold leading-none select-none duration-150 flex items-center gap-2 border-b-2 hover:text-[#3F1058] cursor-pointer ${
                  activeTab === 'subscribers'
                    ? 'border-brand-purple text-[#3F1058] bg-[#3F1058]/5'
                    : 'border-transparent text-slate-400 bg-transparent'
                } rounded-t-xl`}
              >
                <Users className="w-4 h-4" />
                قائمة المسجلين والأرقام ({records.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-6 text-xs font-bold leading-none select-none duration-150 flex items-center gap-2 border-b-2 hover:text-[#3F1058] cursor-pointer ${
                  activeTab === 'settings'
                    ? 'border-brand-purple text-[#3F1058] bg-[#3F1058]/5'
                    : 'border-transparent text-slate-400 bg-transparent'
                } rounded-t-xl`}
              >
                <Settings className="w-4 h-4" />
                إعدادات ونصوص الصفحة والـ Favicon
              </button>
            </div>

            {activeTab === 'settings' ? (
              // Site settings config form
              <form onSubmit={handleSaveSettings} className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-brand-gold/20 shadow-md flex flex-col space-y-6 animate-fade-in text-right">
                <div className="border-b border-brand-gold/10 pb-4 text-right">
                  <h3 className="font-serif font-black text-base text-[#3F1058] flex items-center gap-2 justify-start">
                    <Globe className="w-5 h-5 text-[#C19641]" />
                    الملف التعريفي والتحكم بنصوص وهوية الموقع
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    من هنا يمكنك التحكم في جميع نصوص الصفحة الرئيسية المعروضة للمستخدمين، وتحديث favicon (أيقونة الموقع) بلمسة واحدة.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-right">
                  {/* Page Title */}
                  <div className="space-y-1 text-right">
                    <label className="text-[11px] font-bold text-slate-600 block text-right">عنوان التبويب بمستند المتصفح (Meta Page Title)</label>
                    <input
                      type="text"
                      value={settingsForm.pageTitle}
                      onChange={e => setSettingsForm(prev => ({ ...prev, pageTitle: e.target.value }))}
                      className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-right placeholder-slate-400"
                    />
                  </div>

                  {/* Top Status Tag */}
                  <div className="space-y-1 text-right">
                    <label className="text-[11px] font-bold text-slate-600 block text-right">شارة الحالة / الإعلان (مثال: قريباً)</label>
                    <input
                      type="text"
                      value={settingsForm.statusTag}
                      onChange={e => setSettingsForm(prev => ({ ...prev, statusTag: e.target.value }))}
                      className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-right placeholder-slate-400"
                    />
                  </div>

                  {/* Header Location Tag */}
                  <div className="space-y-1 text-right">
                    <label className="text-[11px] font-bold text-slate-600 block text-right">الموقع الجغرافي المعروض بالرأس</label>
                    <input
                      type="text"
                      value={settingsForm.location}
                      onChange={e => setSettingsForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-right placeholder-slate-400"
                    />
                  </div>

                  {/* Hero Title */}
                  <div className="space-y-1 text-right">
                    <label className="text-[11px] font-bold text-slate-600 block text-right">العنوان المركزي في الواجهة (Hero Title)</label>
                    <input
                      type="text"
                      value={settingsForm.title}
                      onChange={e => setSettingsForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-right placeholder-slate-400 font-serif"
                    />
                  </div>

                  {/* WhatsApp contact number */}
                  <div className="space-y-1 text-right">
                    <label className="text-[11px] font-bold text-slate-600 block text-right">رقم الواتساب للتواصل المباشر (بالرمز الدولي بدون +)</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={e => setSettingsForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                      className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-left placeholder-slate-400"
                      dir="ltr"
                    />
                  </div>

                  {/* Instagram URL */}
                  <div className="space-y-1 text-right">
                    <label className="text-[11px] font-bold text-slate-600 block text-right">رابط حساب إنستغرام (Instagram)</label>
                    <input
                      type="text"
                      value={settingsForm.instagram}
                      onChange={e => setSettingsForm(prev => ({ ...prev, instagram: e.target.value }))}
                      className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-left placeholder-slate-400"
                      dir="ltr"
                    />
                  </div>

                  {/* Facebook URL */}
                  <div className="space-y-1 text-right">
                    <label className="text-[11px] font-bold text-slate-600 block text-right">رابط صفحة فيسبوك (Facebook)</label>
                    <input
                      type="text"
                      value={settingsForm.facebook}
                      onChange={e => setSettingsForm(prev => ({ ...prev, facebook: e.target.value }))}
                      className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-left placeholder-slate-400"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Hero Description */}
                <div className="space-y-1 text-right">
                  <label className="text-[11px] font-bold text-slate-600 block text-right">الوصف التسريحي الفاخر (Hero Description)</label>
                  <textarea
                    rows={2}
                    value={settingsForm.description}
                    onChange={e => setSettingsForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/25 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-right placeholder-slate-400 leading-relaxed"
                  />
                </div>

                {/* WhatsApp message */}
                <div className="space-y-1 text-right">
                  <label className="text-[11px] font-bold text-slate-600 block text-right">الرسالة المجهزة تلقائياً عند النقر تواصل واتساب</label>
                  <textarea
                    rows={2}
                    value={settingsForm.whatsappMsg}
                    onChange={e => setSettingsForm(prev => ({ ...prev, whatsappMsg: e.target.value }))}
                    className="w-full py-2.5 px-4 rounded-xl border border-brand-gold/25 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white text-xs outline-none transition-all font-sans text-right placeholder-slate-400 leading-relaxed"
                  />
                </div>

                {/* Favicon SVG/Image Section */}
                <div className="space-y-3 border-t border-brand-gold/10 pt-4 text-right">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-right">
                    <div className="text-right">
                      <h4 className="text-xs font-bold text-slate-700 block text-right">أيقونة الموقع الفاخرة (Favicon)</h4>
                      <p className="text-[10px] text-slate-400 leading-normal block text-right">
                        قم برفع وتغيير أيقونة الموقع مباشرة من معرض الصور الخاص بجهازك أو هاتفكم (متوافق مع SVG، PNG، JPG، WEBP).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch text-right">
                    <div className="md:col-span-3 flex flex-col justify-between">
                      {/* Drag & Drop Upload Zone */}
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 text-center select-none min-h-[142px] ${
                          isDragging 
                            ? 'border-brand-purple bg-brand-purple/5 scale-[1.01]' 
                            : 'border-brand-gold/25 bg-slate-50/50 hover:bg-slate-50 hover:border-brand-purple/40'
                        }`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFaviconFileChange}
                          accept="image/*"
                          className="hidden" 
                        />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isDragging ? 'bg-brand-purple/10 text-brand-purple' : 'bg-brand-gold/10 text-[#C19641]'
                        }`}>
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-700">اسحب صورتك هنا أو انقر لتصفح معرض الصور</p>
                          <p className="text-[10px] text-slate-400 font-sans">تنسيقات مدعومة: SVG, PNG, JPG, ICO, WEBP</p>
                        </div>
                      </div>
                    </div>

                    {/* Preview Box */}
                    <div className="bg-brand-purple/5 p-4 rounded-2xl border border-brand-gold/15 flex flex-col items-center justify-center space-y-2 text-center min-h-[142px]">
                      <span className="text-[10px] font-bold text-slate-500">معاينة الأيقونة الفاخرة</span>
                      {settingsForm.faviconSvg ? (
                        <div className="flex flex-col items-center gap-2">
                          <div 
                            className="w-16 h-16 bg-white p-1.5 rounded-lg border border-brand-gold/20 shadow-sm flex items-center justify-center pointer-events-none"
                            dangerouslySetInnerHTML={{ __html: settingsForm.faviconSvg }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSettingsForm(prev => ({ ...prev, faviconSvg: "" }));
                            }}
                            className="text-[10px] text-red-600 font-bold hover:underline cursor-pointer"
                          >
                            حذف الأيقونة الحالية
                          </button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-white rounded-lg border border-brand-gold/10 border-dashed flex items-center justify-center text-slate-300 text-[10px]">
                          لا توجد معاينة
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expandable Manual XML/SVG code editor */}
                  <div className="pt-1 text-right">
                    <button
                      type="button"
                      onClick={() => setShowRawSvgEditor(!showRawSvgEditor)}
                      className="text-[10px] text-brand-purple/85 font-semibold hover:underline flex items-center gap-1 cursor-pointer justify-start"
                    >
                      <Code className="w-3 h-3" />
                      {showRawSvgEditor ? "إخفاء محرر كود SVG اليدوي" : "عرض وتعديل كود SVG المصدري يدوياً (للمحترفين)"}
                    </button>

                    {showRawSvgEditor && (
                      <div className="mt-2 space-y-1.5 animate-fade-in text-right">
                        <textarea
                          rows={4}
                          placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">...'
                          value={settingsForm.faviconSvg}
                          onChange={e => setSettingsForm(prev => ({ ...prev, faviconSvg: e.target.value }))}
                          className="w-full py-2 px-3 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-mono text-[9px] font-mono outline-none transition-all text-left placeholder-slate-400"
                          dir="ltr"
                        />
                        <p className="text-[9px] text-slate-400 leading-normal block text-right">
                          سيتم تحديث المعاينة مباشرة عند طباعة البيانات هنا.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="py-3 px-8 rounded-xl bg-[#2E4F32] hover:bg-[#223B25] text-white font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center gap-2 shadow-md shadow-brand-green/10"
                  >
                    {savingSettings ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        حفظ جميع الإعدادات الفاخرة
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // Subscribers list and stats view
              <>
                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Stat Card 1: Total */}
                  <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-brand-gold/15 shadow-sm flex items-center justify-between">
                    <div className="space-y-1 text-right">
                      <p className="text-xs font-bold text-slate-500 block text-right">إجمالي المشتركين</p>
                      <p className="font-serif font-black text-3xl text-brand-purple">{totalSubscribers}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-brand-purple/5 border border-brand-purple/10 flex items-center justify-center text-brand-purple">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Stat Card 2: Today */}
                  <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-brand-gold/15 shadow-sm flex items-center justify-between">
                    <div className="space-y-1 text-right">
                      <p className="text-xs font-bold text-slate-500 block text-right">المسجلين اليوم</p>
                      <p className="font-serif font-black text-3xl text-brand-purple">{todayCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#2E4F32]/5 border border-[#2E4F32]/10 flex items-center justify-center text-[#2E4F32]">
                      <Calendar className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* List Controls & Table Container */}
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-brand-gold/20 shadow-md flex-1 flex flex-col space-y-4 text-right">
                  
                  {/* Controls bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative w-full sm:max-w-xs">
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث بالرقم أو التاريخ..."
                        className="w-full py-2.5 pr-9 pl-4 rounded-xl border border-brand-gold/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 bg-white/50 text-right text-slate-800 placeholder-slate-400 text-xs outline-none transition-all duration-150 font-sans"
                      />
                    </div>

                    {/* Actions group */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => fetchRecords(sessionStorage.getItem('douaa_basma_admin_password') || password)}
                        disabled={loading}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 transition-all duration-150 cursor-pointer"
                        title="تحديث البيانات"
                        type="button"
                      >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      </button>
                      
                      <button
                        onClick={exportToCSV}
                        disabled={records.length === 0}
                        className="py-2.5 px-4 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center gap-2 shadow-sm shadow-brand-purple/10 disabled:opacity-50 disabled:pointer-events-none"
                        type="button"
                      >
                        <Download className="w-4 h-4" />
                        تصدير ملف Excel / CSV
                      </button>
                    </div>
                  </div>

                  {/* Responsive Table */}
                  <div className="overflow-x-auto border border-brand-gold/10 rounded-2xl flex-1 min-h-[300px]">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-2">
                        <span className="w-8 h-8 border-3 border-brand-purple border-t-transparent rounded-full animate-spin"></span>
                        <span className="text-xs">جاري تحميل البيانات...</span>
                      </div>
                    ) : filteredRecords.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-1">
                        <Phone className="w-8 h-8 text-slate-300" />
                        <span className="text-xs font-bold text-center w-full">لا يوجد أرقام هواتف مسجلة تطابق بحثك.</span>
                      </div>
                    ) : (
                      <table className="w-full text-right text-xs">
                        <thead>
                          <tr className="bg-brand-purple/5 text-[#3F1058] border-b border-brand-gold/15 font-bold">
                            <th className="px-4 py-3 leading-tight text-center">#</th>
                            <th className="px-4 py-3 leading-tight text-right">رقم الهاتف</th>
                            <th className="px-4 py-3 leading-tight text-right">وقت ومستودع الاشتراك</th>
                            <th className="px-4 py-3 leading-tight text-center">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredRecords.map((record, index) => {
                            const dateObj = new Date(record.registeredAt);
                            const displayDate = dateObj.toLocaleDateString('ar-MA') + ' - ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            
                            return (
                              <tr key={record.phone} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3 text-center text-slate-400 font-mono font-medium">{index + 1}</td>
                                <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-right" dir="ltr">
                                  {record.phone}
                                </td>
                                <td className="px-4 py-3 text-right text-slate-500 font-sans">{displayDate}</td>
                                <td className="px-4 py-3 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    {/* WhatsApp contact */}
                                    <a
                                      href={`https://wa.me/${record.phone.replace(/[^0-9]/g, '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors inline-block"
                                      title="تواصل معنا عبر واتساب"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>

                                    {/* Delete phone */}
                                    {confirmDelete === record.phone ? (
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={() => handleDelete(record.phone)}
                                          className="py-1 px-2.5 rounded bg-red-600 text-white font-bold text-[10px] hover:bg-red-700 transition-colors cursor-pointer"
                                          type="button"
                                        >
                                          نعم
                                        </button>
                                        <button
                                          onClick={() => setConfirmDelete(null)}
                                          className="py-1 px-2.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px] hover:bg-slate-300 transition-colors cursor-pointer"
                                          type="button"
                                        >
                                          إلغاء
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => setConfirmDelete(record.phone)}
                                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-150 text-red-600 transition-colors cursor-pointer"
                                        title="حذف الرقم"
                                        type="button"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* Bottom indicators */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>يتم تحديث البيانات لحظياً وتخزينها بأمان وسرية تامة</span>
                    <span>تظهر أولى {filteredRecords.length} أرقام مطابقة</span>
                  </div>
                </div>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
