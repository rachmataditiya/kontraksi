import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle, Clock, ChevronRight, BookOpen, Activity, Calendar, Info } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { id } from 'date-fns/locale';
import { saveContraction, getContractions, clearOldContractions } from './db';
import Education from './pages/Education';
import { getStatusColors } from './theme';

// Definisikan tipe untuk halaman yang tersedia
type PageType = 'timer' | 'history' | 'education';

function App() {
  const [contractions, setContractions] = useState<Date[]>([]);
  const [interval, setInterval] = useState<number | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<'normal' | 'warning' | 'urgent'>('normal');
  const [showHistory, setShowHistory] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('timer');
  const [lastContractionTime, setLastContractionTime] = useState<Date | null>(null);
  const [contractionCount, setContractionCount] = useState(0);

  useEffect(() => {
    loadContractions();
    clearOldContractions();
  }, []);

  const loadContractions = async () => {
    const stored = await getContractions();
    const dates = stored.map(c => new Date(c.timestamp)).sort((a, b) => b.getTime() - a.getTime());
    setContractions(dates);
    setContractionCount(dates.length);
    if (dates.length > 0) {
      setLastContractionTime(dates[0]);
    }
  };

  useEffect(() => {
    if (contractions.length >= 2) {
      const lastTwo = contractions.slice(-2);
      const timeDiff = lastTwo[1].getTime() - lastTwo[0].getTime();
      const intervalMinutes = timeDiff / (1000 * 60);
      setInterval(intervalMinutes);

      if (intervalMinutes <= 3) {
        setUrgencyLevel('urgent');
      } else if (intervalMinutes <= 5) {
        setUrgencyLevel('warning');
      } else {
        setUrgencyLevel('normal');
      }
    }
  }, [contractions]);

  const handleContraction = async () => {
    const now = new Date();
    await saveContraction(now);
    setContractions([now, ...contractions]);
    setLastContractionTime(now);
    setContractionCount(prev => prev + 1);
    
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const getMessage = () => {
    if (!interval) return 'Tekan tombol saat kontraksi dimulai';
    if (interval <= 3) return 'SEGERA KE RUMAH SAKIT!';
    if (interval <= 5) return 'Bersiaplah ke rumah sakit';
    return 'Pantau terus kontraksi Anda';
  };

  const colors = getStatusColors(urgencyLevel);

  // Render halaman berdasarkan currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'education':
        return <Education />;
      case 'history':
        return (
          <div className={`min-h-screen ${colors.bg} transition-colors duration-500 pb-24`}>
            <div className="max-w-md mx-auto p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Kontraksi</h2>
              
              {/* Statistik Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Total Kontraksi</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{contractionCount}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">Interval Rata-rata</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-700">
                      {interval ? `${interval.toFixed(1)} m` : '-'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Riwayat Kontraksi */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Riwayat Terakhir</h3>
                {contractions.map((time, index) => (
                  <div
                    key={time.getTime()}
                    className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">
                          {format(time, 'HH:mm', { locale: id })}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDistanceToNow(time, { addSuffix: true, locale: id })}
                        </p>
                      </div>
                    </div>
                    {index < contractions.length - 1 && (
                      <div className="text-sm text-gray-500">
                        {((time.getTime() - contractions[index + 1].getTime()) / (1000 * 60)).toFixed(1)} m
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'timer':
      default:
        return (
          <div className={`min-h-screen ${colors.bg} transition-colors duration-500 pb-24`}>
            <div className="flex flex-col items-center p-6 md:p-8">
              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-8">
                {/* Status Display */}
                <div className={`w-full p-6 rounded-2xl bg-white/80 backdrop-blur-xl border ${colors.border} shadow-xl`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Timer className={`w-6 h-6 ${colors.text}`} />
                      <span className="text-lg font-medium text-gray-600">Interval</span>
                    </div>
                    <span className={`text-2xl font-bold ${colors.text}`}>
                      {interval ? `${interval.toFixed(1)} menit` : '-'}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-3 mt-4 p-4 rounded-xl ${
                    urgencyLevel !== 'normal' ? 'bg-white/50' : 'bg-transparent'
                  }`}>
                    {urgencyLevel !== 'normal' ? (
                      <AlertTriangle className={`w-5 h-5 ${colors.text}`} />
                    ) : (
                      <Clock className={`w-5 h-5 ${colors.text}`} />
                    )}
                    <span className={`font-medium ${colors.text}`}>{getMessage()}</span>
                  </div>
                </div>

                {/* Info Card */}
                <div className="w-full bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Kontraksi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Total Kontraksi</span>
                      </div>
                      <span className="font-semibold text-gray-900">{contractionCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700">Kontraksi Terakhir</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {lastContractionTime 
                          ? formatDistanceToNow(lastContractionTime, { addSuffix: true, locale: id })
                          : '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-amber-500" />
                        <span className="text-gray-700">Status</span>
                      </div>
                      <span className={`font-semibold ${colors.text}`}>
                        {urgencyLevel === 'urgent' ? 'Siap Persalinan' : 
                         urgencyLevel === 'warning' ? 'Bersiap' : 'Normal'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contraction Button */}
                <button
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                  onMouseLeave={() => setIsPressed(false)}
                  onTouchStart={() => setIsPressed(true)}
                  onTouchEnd={() => setIsPressed(false)}
                  onClick={handleContraction}
                  className={`w-48 h-48 rounded-full bg-gradient-to-br ${colors.button}
                           flex items-center justify-center text-white text-xl font-bold
                           shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform
                           transition-all duration-200 hover:brightness-110
                           relative overflow-hidden isolate
                           ${isPressed ? 'scale-95 shadow-inner brightness-90' : 'scale-100'}
                           before:absolute before:inset-0 before:bg-gradient-to-t
                           before:from-black/10 before:to-white/20 before:rounded-full
                           after:absolute after:inset-[3px] after:rounded-full
                           after:bg-gradient-to-b after:from-white/80 after:via-transparent
                           after:to-transparent after:opacity-50 after:-z-10
                           ring-[16px] ${colors.ring} ring-opacity-20`}
                >
                  <span className={`transform ${isPressed ? 'scale-95' : 'scale-100'} 
                                transition-transform duration-200`}>
                    KONTRAKSI
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${colors.bg} transition-colors duration-500`}>
      {/* Render halaman aktif */}
      {renderPage()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => setCurrentPage('timer')}
            className={`flex flex-col items-center gap-1 ${
              currentPage === 'timer' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Timer className="w-6 h-6" />
            <span className="text-sm">Timer</span>
          </button>
          <button
            onClick={() => setCurrentPage('history')}
            className={`flex flex-col items-center gap-1 ${
              currentPage === 'history' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Clock className="w-6 h-6" />
            <span className="text-sm">Riwayat</span>
          </button>
          <button
            onClick={() => setCurrentPage('education')}
            className={`flex flex-col items-center gap-1 ${
              currentPage === 'education' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-sm">Panduan</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;