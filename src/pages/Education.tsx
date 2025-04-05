import { Clock, AlertCircle, Info, Baby, Timer, Heart, ArrowLeft, CheckCircle2, BookOpen } from 'lucide-react';
import { theme } from '../theme';

const Education = () => {
  const stages = [
    {
      title: "Kontraksi Awal (Latent Phase)",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
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
      icon: <Timer className="w-6 h-6 text-purple-500" />,
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
      icon: <Heart className="w-6 h-6 text-red-500" />,
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
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
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

  return (
    <div className="min-h-screen bg-blue-50 transition-colors duration-500 pb-24">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header yang ditingkatkan */}
        <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 shadow-lg">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519824144890-9d9e6f5a5c5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-white/20 p-3 backdrop-blur-sm">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Panduan Kontraksi</h1>
            <p className="text-blue-100 max-w-md">Pelajari tahapan kontraksi dan kapan harus ke rumah sakit</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-purple-300"></div>
        </div>

        {/* Tahapan Kontraksi */}
        <div className="space-y-8 mb-12">
          {stages.map((stage, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-${stage.color}-50 rounded-lg`}>
                  {stage.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{stage.title}</h2>
                  <p className="text-gray-600 mb-4">{stage.description}</p>
                  <div className="space-y-2">
                    {stage.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className={`w-4 h-4 text-${stage.color}-500`} />
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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Teknik Pernapasan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {breathingTechniques.map((technique, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{technique.title}</h3>
                <ol className="space-y-3">
                  {technique.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 font-medium text-sm">{stepIndex + 1}</span>
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Tanda Bahaya */}
        {warningSigns.map((warning, index) => (
          <div key={index} className="bg-red-50 rounded-xl p-6 border border-red-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                {warning.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-red-900 mb-2">{warning.title}</h2>
                <p className="text-red-700 mb-4">{warning.description}</p>
                <ul className="space-y-2">
                  {warning.signs.map((sign, signIndex) => (
                    <li key={signIndex} className="flex items-center gap-2 text-red-700">
                      <Baby className="w-4 h-4" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Tips Tambahan */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Info className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Tips Tambahan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Persiapan Sebelum Persalinan</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Siapkan tas persalinan sejak minggu ke-36</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Tentukan rute ke rumah sakit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Latih teknik pernapasan secara teratur</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Diskusikan rencana persalinan dengan dokter/bidan</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Selama Proses Persalinan</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Tetaplah tenang dan fokus pada pernapasan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Cari posisi yang nyaman untuk Anda</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Minum air putih secara teratur</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Percayalah pada tim medis yang menangani Anda</span>
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