import { Clock, AlertCircle, Info, Baby, Timer, Heart, ArrowLeft, CheckCircle2, BookOpen, Smartphone, PlayCircle, PauseCircle } from 'lucide-react';
import { theme } from '../theme';

const Education = () => {
  const stages = [
    {
      title: "Kontraksi Awal (Latent Phase)",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      description: "Kontraksi mulai terasa dengan interval 5-20 menit dan durasi 30-45 detik. Fase ini bisa berlangsung beberapa jam hingga beberapa hari.",
      tips: [
        "Tinggal di rumah dan istirahat cukup",
        "Minum banyak air putih",
        "Lakukan teknik pernapasan",
        "Jalan-jalan ringan untuk membantu proses"
      ],
      color: "blue"
    },
    {
      title: "Kontraksi Aktif",
      icon: <Timer className="w-5 h-5 text-purple-500" />,
      description: "Kontraksi menjadi lebih kuat dengan interval 3-5 menit dan durasi 45-60 detik. Saatnya ke rumah sakit.",
      tips: [
        "Siapkan tas persalinan",
        "Hubungi dokter/bidan",
        "Fokus pada teknik pernapasan",
        "Cari posisi yang nyaman"
      ],
      color: "purple"
    },
    {
      title: "Kontraksi Transisi",
      icon: <Heart className="w-5 h-5 text-red-500" />,
      description: "Kontraksi sangat kuat dengan interval 2-3 menit dan durasi 60-90 detik. Fase terakhir sebelum persalinan.",
      tips: [
        "Ikuti instruksi dokter/bidan",
        "Tetaplah tenang dan fokus",
        "Gunakan teknik pernapasan yang diajarkan",
        "Percayalah pada tim medis"
      ],
      color: "red"
    }
  ];

  const warningSigns = [
    {
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      title: "Tanda Bahaya",
      description: "Segera ke rumah sakit jika mengalami:",
      signs: [
        "Pendarahan yang tidak normal",
        "Air ketuban pecah",
        "Kontraksi sangat menyakitkan",
        "Tidak merasakan gerakan bayi",
        "Demam atau sakit kepala parah"
      ]
    }
  ];

  const breathingTechniques = [
    {
      title: "Teknik Pernapasan Dasar",
      steps: [
        "Tarik napas dalam melalui hidung (4 hitungan)",
        "Tahan napas (4 hitungan)",
        "Hembuskan napas perlahan melalui mulut (4 hitungan)",
        "Ulangi selama kontraksi berlangsung"
      ]
    },
    {
      title: "Teknik Pernapasan untuk Kontraksi Kuat",
      steps: [
        "Tarik napas cepat dan dangkal (seperti anjing terengah-engah)",
        "Fokus pada pernapasan, bukan rasa sakit",
        "Jaga ritme pernapasan tetap teratur",
        "Berhenti saat kontraksi selesai"
      ]
    }
  ];

  const appUsageGuide = [
    {
      title: "Cara Menggunakan Timer Kontraksi",
      icon: <Smartphone className="w-5 h-5 text-blue-500" />,
      steps: [
        {
          title: "Mulai Timer",
          icon: <PlayCircle className="w-4 h-4 text-green-500" />,
          description: "Tekan dan tahan tombol 'KONTRAKSI' saat kontraksi dimulai. Tombol akan berubah warna menjadi merah dan timer akan mulai berjalan."
        },
        {
          title: "Selesai Timer",
          icon: <PauseCircle className="w-4 h-4 text-red-500" />,
          description: "Lepaskan tombol saat kontraksi berakhir. Timer akan berhenti dan data kontraksi akan disimpan."
        },
        {
          title: "Pantau Interval",
          icon: <Clock className="w-4 h-4 text-purple-500" />,
          description: "Aplikasi akan menghitung interval antara kontraksi dan memberikan peringatan jika sudah waktunya ke rumah sakit."
        }
      ]
    },
    {
      title: "Fitur Aplikasi",
      icon: <Info className="w-5 h-5 text-blue-500" />,
      features: [
        {
          title: "Timer Kontraksi",
          description: "Catat waktu mulai dan durasi setiap kontraksi dengan mudah."
        },
        {
          title: "Riwayat Kontraksi",
          description: "Lihat riwayat kontraksi sebelumnya, termasuk interval dan durasi."
        },
        {
          title: "Peringatan Otomatis",
          description: "Dapatkan peringatan ketika interval kontraksi sudah mendekati waktu persalinan."
        },
        {
          title: "Panduan Lengkap",
          description: "Akses informasi tentang tahapan kontraksi dan tips persalinan."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 transition-colors duration-500 pb-24">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header yang ditingkatkan */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-lg">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519824144890-9d9e6f5a5c5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-3 rounded-full bg-white/20 p-2 backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-md">Panduan Kontraksi</h1>
            <p className="text-blue-100 text-sm max-w-md">Pelajari tahapan kontraksi dan kapan harus ke rumah sakit</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-purple-300"></div>
        </div>

        {/* Panduan Penggunaan Aplikasi */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Cara Menggunakan Aplikasi</h2>
          </div>
          
          {appUsageGuide.map((guide, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                {guide.icon}
                <h3 className="text-base font-semibold text-gray-800">{guide.title}</h3>
              </div>
              
              {guide.steps && (
                <div className="space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <div className="p-1.5 bg-gray-100 rounded-lg mt-0.5">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {guide.features && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guide.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-800 mb-1">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tahapan Kontraksi */}
        <div className="space-y-4 mb-8">
          {stages.map((stage, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`p-2 bg-${stage.color}-50 rounded-lg`}>
                  {stage.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{stage.title}</h2>
                  <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                  <div className="space-y-1">
                    {stage.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-center gap-2 text-gray-700 text-sm">
                        <CheckCircle2 className={`w-3.5 h-3.5 text-${stage.color}-500`} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teknik Pernapasan */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Heart className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Teknik Pernapasan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {breathingTechniques.map((technique, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-800 mb-3">{technique.title}</h3>
                <ol className="space-y-2">
                  {technique.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 font-medium text-xs">{stepIndex + 1}</span>
                      </div>
                      <span className="text-sm text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Tanda Bahaya */}
        {warningSigns.map((warning, index) => (
          <div key={index} className="bg-red-50 rounded-xl p-4 border border-red-100 mb-8">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                {warning.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-900 mb-1">{warning.title}</h2>
                <p className="text-sm text-red-700 mb-3">{warning.description}</p>
                <ul className="space-y-1">
                  {warning.signs.map((sign, signIndex) => (
                    <li key={signIndex} className="flex items-center gap-2 text-red-700 text-sm">
                      <Baby className="w-3.5 h-3.5" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Tips Tambahan */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Info className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Tips Tambahan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-base font-medium text-gray-800 mb-2">Persiapan Sebelum Persalinan</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Siapkan tas persalinan sejak minggu ke-36</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Tentukan rute ke rumah sakit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Latih teknik pernapasan secara teratur</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Diskusikan rencana persalinan dengan dokter/bidan</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-800 mb-2">Selama Proses Persalinan</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Tetaplah tenang dan fokus pada pernapasan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Cari posisi yang nyaman untuk Anda</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Minum air putih secara teratur</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">Percayalah pada tim medis yang menangani Anda</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education; 