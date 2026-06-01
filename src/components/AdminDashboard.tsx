import React, { useState, useEffect } from 'react';
import { Phone, Lock, Download, Trash2, ExternalLink, Search, Users, Calendar, ArrowRight, ShieldCheck, LogOut, RefreshCw } from 'lucide-react';
import LuxuryLogo from './LuxuryLogo';

interface PhoneRecord {
  phone: string;
  registeredAt: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [records, setRecords] = useState<PhoneRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Check existing session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('douaa_basma_admin_password');
    if (savedToken) {
      verifySavedPassword(savedToken);
    }
  }, []);

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
            <div className="text-right">
              <h2 className="font-serif font-black text-xl text-[#3F1058]">لوحة التحكم الفاخرة</h2>
              <p className="text-xs text-slate-500 font-medium font-mono">www.douaabasma.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href="/"
              className="px-3.5 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-150 inline-flex items-center gap-1.5"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              العودة للموقع الرئيسي
            </a>

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
          <div className="space-y-6 flex-1 flex flex-col">
            
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat Card 1: Total */}
              <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-brand-gold/15 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500">إجمالي المشتركين</p>
                  <p className="font-serif font-black text-3xl text-brand-purple">{totalSubscribers}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-purple/5 border border-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Stat Card 2: Today */}
              <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-brand-gold/15 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500">المسجلين اليوم</p>
                  <p className="font-serif font-black text-3xl text-[#2E4F32]">{todayCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#2E4F32]/5 border border-[#2E4F32]/10 flex items-center justify-center text-[#2E4F32]">
                  <Calendar className="w-6 h-6 animate-pulse" />
                </div>
              </div>

            </div>

            {/* List Controls & Table Container */}
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-brand-gold/20 shadow-md flex-1 flex flex-col space-y-4">
              
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
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  
                  <button
                    onClick={exportToCSV}
                    disabled={records.length === 0}
                    className="py-2.5 px-4 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center gap-2 shadow-sm shadow-brand-purple/10 disabled:opacity-50 disabled:pointer-events-none"
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
                    <span className="text-xs font-bold">لا يوجد أرقام هواتف مسجلة تطابق بحثك.</span>
                  </div>
                ) : (
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-brand-purple/5 text-[#3F1058] border-b border-brand-gold/15 font-bold">
                        <th className="px-4 py-3 leading-tight text-center">#</th>
                        <th className="px-4 py-3 leading-tight">رقم الهاتف</th>
                        <th className="px-4 py-3 leading-tight">وقت ومستودع الاشتراك</th>
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
                            <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-left" dir="ltr">
                              {record.phone}
                            </td>
                            <td className="px-4 py-3 text-slate-500 font-sans">{displayDate}</td>
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
                                    >
                                      نعم
                                    </button>
                                    <button
                                      onClick={() => setConfirmDelete(null)}
                                      className="py-1 px-2.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px] hover:bg-slate-300 transition-colors cursor-pointer"
                                    >
                                      إلغاء
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setConfirmDelete(record.phone)}
                                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-150 text-red-600 transition-colors cursor-pointer"
                                    title="حذف الرقم"
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

          </div>
        )}

      </div>
    </div>
  );
}
