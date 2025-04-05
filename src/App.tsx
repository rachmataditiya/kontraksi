import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle, Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { saveContraction, getContractions, clearOldContractions } from './db';

function App() {
  const [contractions, setContractions] = useState<Date[]>([]);
  const [interval, setInterval] = useState<number | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<'normal' | 'warning' | 'urgent'>('normal');
  const [showHistory, setShowHistory] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    loadContractions();
    clearOldContractions();
  }, []);

  const loadContractions = async () => {
    const stored = await getContractions();
    const dates = stored.map(c => new Date(c.timestamp)).sort((a, b) => b.getTime() - a.getTime());
    setContractions(dates);
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
    setContractions([...contractions, now]);
    
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const getStatusColor = () => {
    switch (urgencyLevel) {
      case 'urgent':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-100',
          button: 'from-red-500 to-red-600',
          shadow: 'shadow-red-200',
          ring: 'ring-red-200'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-100',
          button: 'from-amber-500 to-amber-600',
          shadow: 'shadow-amber-200',
          ring: 'ring-amber-200'
        };
      default:
        return {
          bg: 'bg-blue-50',
          text: 'text-[#1E4C94]',
          border: 'border-blue-100',
          button: 'from-[#1E4C94] to-[#361F75]',
          shadow: 'shadow-blue-200',
          ring: 'ring-blue-200'
        };
    }
  };

  const getMessage = () => {
    if (!interval) return 'Tekan tombol saat kontraksi dimulai';
    if (interval <= 3) return 'SEGERA KE RUMAH SAKIT!';
    if (interval <= 5) return 'Bersiaplah ke rumah sakit';
    return 'Pantau terus kontraksi Anda';
  };

  const colors = getStatusColor();

  return (
    <div className={`min-h-screen ${colors.bg} transition-colors duration-500`}>
      <div className="min-h-screen flex flex-col items-center p-6 md:p-8">
        {/* Header */}
        <div className="w-full text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3648]">
            Pemantau Kontraksi
          </h1>
        </div>

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

        {/* History Toggle */}
        <div className="w-full max-w-md mt-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm border ${colors.border}
                       flex items-center justify-between transition-colors duration-200
                       hover:bg-white/90`}
          >
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="font-semibold text-[#2D3648]">Riwayat Kontraksi</span>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform duration-200
                                   ${showHistory ? 'rotate-90' : ''}`} />
          </button>

          {/* Collapsible History */}
          <div className={`mt-2 space-y-2 transition-all duration-300 overflow-hidden
                          ${showHistory ? 'max-h-96' : 'max-h-0'}`}>
            <div className="pr-2 max-h-80 overflow-y-auto space-y-2">
              {contractions.map((time) => (
                <div
                  key={time.getTime()}
                  className={`p-4 rounded-xl bg-white/80 backdrop-blur-sm border ${colors.border}
                            flex items-center gap-3`}
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 font-medium">
                    {formatDistanceToNow(time, { addSuffix: true, locale: id })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;