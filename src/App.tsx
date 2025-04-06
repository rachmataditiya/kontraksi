import React, { useState, useEffect, useRef } from 'react';
import { Timer, AlertTriangle, Clock, ChevronRight, BookOpen, Activity, Calendar, Info, StopCircle, Trash2 } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { id } from 'date-fns/locale';
import { saveContraction, getContractions, clearOldContractions, updateContractionDuration, Contraction, db } from './db';
import Education from './pages/Education';
import { getStatusColors } from './theme';

// Definisikan tipe untuk halaman yang tersedia
type PageType = 'timer' | 'history' | 'education';

function App() {
  const [contractions, setContractions] = useState<Contraction[]>([]);
  const [interval, setInterval] = useState<number | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<'normal' | 'warning' | 'urgent'>('normal');
  const [showHistory, setShowHistory] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('timer');
  const [lastContractionTime, setLastContractionTime] = useState<Date | null>(null);
  const [contractionCount, setContractionCount] = useState(0);
  
  // State untuk timer kontraksi
  const [isContractionActive, setIsContractionActive] = useState(false);
  const [contractionDuration, setContractionDuration] = useState(0);
  const [contractionStartTime, setContractionStartTime] = useState<Date | null>(null);
  const timerRef = useRef<number | null>(null);
  const isTimerRunning = useRef<boolean>(false);

  useEffect(() => {
    loadContractions();
    clearOldContractions();
    
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const loadContractions = async () => {
    const stored = await getContractions();
    const sortedContractions = stored.sort((a, b) => b.timestamp - a.timestamp);
    setContractions(sortedContractions);
    setContractionCount(sortedContractions.length);
    if (sortedContractions.length > 0) {
      setLastContractionTime(new Date(sortedContractions[0].timestamp));
    }
  };

  useEffect(() => {
    if (contractions.length >= 2) {
      const lastTwo = contractions.slice(0, 2);
      const timeDiff = lastTwo[0].timestamp - lastTwo[1].timestamp;
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

  const startContractionTimer = () => {
    // Pastikan timer tidak berjalan dua kali
    if (isTimerRunning.current) return;
    
    const now = new Date();
    setContractionStartTime(now);
    setIsContractionActive(true);
    setContractionDuration(0);
    isTimerRunning.current = true;
    
    // Start timer
    timerRef.current = window.setInterval(() => {
      setContractionDuration(prev => prev + 1);
    }, 1000);
    
    // Save initial contraction
    saveContraction(now);
    
    // Vibrasi jika tersedia
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const stopContractionTimer = () => {
    // Pastikan timer sedang berjalan
    if (!isTimerRunning.current) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    isTimerRunning.current = false;
    setIsContractionActive(false);
    
    // Update the last contraction with duration
    if (contractionStartTime) {
      const durationMs = Date.now() - contractionStartTime.getTime();
      updateContractionDuration(contractionStartTime.getTime(), durationMs);
      
      // Reload contractions to get updated data
      loadContractions();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMessage = () => {
    if (!interval) return 'Tekan tombol saat kontraksi dimulai';
    if (interval <= 3) return 'SEGERA KE RUMAH SAKIT!';
    if (interval <= 5) return 'Bersiaplah ke rumah sakit';
    return 'Pantau terus kontraksi Anda';
  };

  const colors = getStatusColors(urgencyLevel);

  const clearAllContractions = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data kontraksi? Tindakan ini tidak dapat dibatalkan.')) {
      const tx = db.transaction('contractions', 'readwrite');
      const store = tx.objectStore('contractions');
      await store.clear();
      setContractions([]);
      setContractionCount(0);
      setLastContractionTime(null);
      setInterval(null);
      setUrgencyLevel('normal');
    }
  };

  // Render halaman berdasarkan currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'education':
        return <Education />;
      case 'history':
        return (
          <div className={`min-h-screen ${colors.bg} transition-colors duration-500 pb-24`}>
            <div className="max-w-md mx-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Riwayat Kontraksi</h2>
                <button 
                  onClick={clearAllContractions}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Reset Data</span>
                </button>
              </div>
              
              {/* Statistik Card */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-800 mb-3">Statistik</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-600">Total Kontraksi</span>
                    </div>
                    <p className="text-xl font-bold text-blue-700">{contractionCount}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600">Interval Rata-rata</span>
                    </div>
                    <p className="text-xl font-bold text-purple-700">
                      {interval ? `${interval.toFixed(1)} m` : '-'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Riwayat Kontraksi */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-gray-800 mb-2">Riwayat Terakhir</h3>
                {contractions.map((contraction, index) => (
                  <div
                    key={contraction.timestamp}
                    className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-xs">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-sm">
                          {format(new Date(contraction.timestamp), 'HH:mm', { locale: id })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(contraction.timestamp), { addSuffix: true, locale: id })}
                        </p>
                        {contraction.duration && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            Durasi: {formatDuration(Math.floor(contraction.duration / 1000))}
                          </p>
                        )}
                      </div>
                    </div>
                    {index < contractions.length - 1 && (
                      <div className="text-xs text-gray-500">
                        {((contraction.timestamp - contractions[index + 1].timestamp) / (1000 * 60)).toFixed(1)} m
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
            <div className="flex flex-col items-center p-4 md:p-6">
              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-4">
                {/* Status Display */}
                <div className={`w-full p-4 rounded-xl bg-white/80 backdrop-blur-xl border ${colors.border} shadow-lg`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Timer className={`w-5 h-5 ${colors.text}`} />
                      <span className="text-base font-medium text-gray-600">Interval</span>
                    </div>
                    <span className={`text-xl font-bold ${colors.text}`}>
                      {interval ? `${interval.toFixed(1)} menit` : '-'}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-2 mt-2 p-3 rounded-lg ${
                    urgencyLevel !== 'normal' ? 'bg-white/50' : 'bg-transparent'
                  }`}>
                    {urgencyLevel !== 'normal' ? (
                      <AlertTriangle className={`w-4 h-4 ${colors.text}`} />
                    ) : (
                      <Clock className={`w-4 h-4 ${colors.text}`} />
                    )}
                    <span className={`font-medium text-sm ${colors.text}`}>{getMessage()}</span>
                  </div>
                </div>

                {/* Info Card */}
                <div className="w-full bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Informasi Kontraksi</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">Total Kontraksi</span>
                      </div>
                      <span className="font-semibold text-gray-900">{contractionCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-700">Kontraksi Terakhir</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">
                        {lastContractionTime 
                          ? formatDistanceToNow(lastContractionTime, { addSuffix: true, locale: id })
                          : '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-gray-700">Status</span>
                      </div>
                      <span className={`font-semibold text-sm ${colors.text}`}>
                        {urgencyLevel === 'urgent' ? 'Siap Persalinan' : 
                         urgencyLevel === 'warning' ? 'Bersiap' : 'Normal'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contraction Button */}
                <button
                  onMouseDown={() => !isContractionActive && startContractionTimer()}
                  onMouseUp={() => isContractionActive && stopContractionTimer()}
                  onMouseLeave={() => isContractionActive && stopContractionTimer()}
                  onTouchStart={() => !isContractionActive && startContractionTimer()}
                  onTouchEnd={() => isContractionActive && stopContractionTimer()}
                  disabled={isContractionActive}
                  className={`w-40 h-40 rounded-full bg-gradient-to-br ${isContractionActive ? 'from-red-500 to-red-600' : colors.button}
                           flex items-center justify-center text-white text-lg font-bold
                           shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform
                           transition-all duration-200 hover:brightness-110
                           relative overflow-hidden isolate
                           ${isContractionActive ? 'scale-95 shadow-inner brightness-90' : 'scale-100'}
                           before:absolute before:inset-0 before:bg-gradient-to-t
                           before:from-black/10 before:to-white/20 before:rounded-full
                           after:absolute after:inset-[3px] after:rounded-full
                           after:bg-gradient-to-b after:from-white/80 after:via-transparent
                           after:to-transparent after:opacity-50 after:-z-10
                           ring-[16px] ${isContractionActive ? 'ring-red-500' : colors.ring} ring-opacity-20
                           ${isContractionActive ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className={`transform ${isContractionActive ? 'scale-95' : 'scale-100'} 
                                transition-transform duration-200`}>
                    {isContractionActive ? 'KONTRAKSI' : 'KONTRAKSI'}
                  </span>
                </button>
                
                {/* Contraction Timer */}
                {isContractionActive && (
                  <div className="mt-2 bg-white rounded-xl shadow-sm p-3 border border-gray-100 flex items-center justify-center gap-2">
                    <StopCircle className="w-5 h-5 text-red-500 animate-pulse" />
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Durasi Kontraksi</p>
                      <p className="text-xl font-bold text-red-600">{formatDuration(contractionDuration)}</p>
                    </div>
                  </div>
                )}
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => setCurrentPage('timer')}
            className={`flex flex-col items-center gap-0.5 ${
              currentPage === 'timer' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Timer className="w-5 h-5" />
            <span className="text-xs">Timer</span>
          </button>
          <button
            onClick={() => setCurrentPage('history')}
            className={`flex flex-col items-center gap-0.5 ${
              currentPage === 'history' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-xs">Riwayat</span>
          </button>
          <button
            onClick={() => setCurrentPage('education')}
            className={`flex flex-col items-center gap-0.5 ${
              currentPage === 'education' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Panduan</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;