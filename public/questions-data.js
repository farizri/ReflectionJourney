// Reflection Journey. Question set and category copy.
// Everything here stays on the participant's device only; nothing is sent anywhere.

const REFLECTION_CATEGORIES = {
  personal: {
    key: 'personal',
    icon: 'lock',
    label: 'Personal Reflection',
    short: 'Pertanyaan untuk dirimu sendiri, tidak dibagikan ke siapa pun.',
    intro: 'Jawaban hanya dapat dilihat oleh dirimu sendiri. Gunakan ruang ini untuk berhenti sejenak dan berdialog dengan diri sendiri.',
  },
  shared: {
    key: 'shared',
    icon: 'globe',
    label: 'Shared Reflection',
    short: 'Dibagikan dalam forum bersama seluruh peserta.',
    intro: 'Pertanyaan ini cocok untuk dibagikan dalam forum bersama seluruh peserta, bukan sesi kelompok kecil. Jawabanmu tetap tersimpan hanya di perangkatmu sendiri, tidak dikirim atau disimpan oleh sistem mana pun.',
  },
  friends: {
    key: 'friends',
    icon: 'users',
    label: '2 Ways Reflection',
    short: 'Didiskusikan berdua secara bergantian dengan teman di sebelahmu.',
    intro: 'Bagian ini didiskusikan langsung dengan teman di sebelahmu secara bergantian. Tujuannya bukan mencari jawaban terbaik, tetapi saling mengenal dan berbagi hal sederhana yang mungkin membawa senyum atau inspirasi.',
  },
};

const TYPE_LIMITS = {
  'Essay Singkat': 150,
  'Essay Pendek': 300,
  'Essay Panjang': 1000,
};

const REFLECTION_QUESTIONS = [
  {
    id: 1,
    category: 'personal',
    title: 'One Word Check-in',
    type: 'Essay Singkat',
    question: 'Kalau minggu ini hanya boleh diberi satu judul, apa judul yang paling menggambarkan minggu ini?',
    examples: ['Jalani Saja', 'Banyak Pikiran', 'I try my best', 'Butuh rehat'],
    guidance: null,
  },
  {
    id: 2,
    category: 'personal',
    title: 'The Conversation in Your Head',
    type: 'Essay Panjang',
    question: 'Apa percakapan yang paling sering terjadi di dalam kepalamu akhir-akhir ini?',
    examples: [],
    guidance: 'Bisa berupa harapan, keraguan, rasa takut, atau pertanyaan yang terus muncul di pikiranmu.',
  },
  {
    id: 3,
    category: 'personal',
    title: 'Grateful Right Now',
    type: 'Essay Panjang',
    question: 'Apa satu hal yang sangat kamu syukuri sampai detik ini?',
    examples: [],
    guidance: 'Bisa berupa orang, momen, pencapaian kecil, atau hal sederhana yang mungkin jarang kamu sadari.',
  },
  {
    id: 4,
    category: 'personal',
    title: 'MidTerm Review',
    type: 'Essay Pendek',
    question: 'Mengingat sekarang kita sedang di tengah tahun,  ada satu atau dua target apa yang sangat ingin kamu capai di akhir tahun 2026 ini?',
    examples: ['Lulus sertifikasi tertentu', 'Konsisten olahraga 3x seminggu', 'Menabung untuk tujuan tertentu'],
    guidance: null,
  },
  {
    id: 5,
    category: 'shared',
    title: 'Small Wins',
    type: 'Essay Pendek',
    question: 'Tantangan atau kebiasaan kecil apa yang berhasil kamu lewati/lakukan akhir-akhir ini?',
    examples: ['Olahraga (Strava) 2x minggu ini', 'Belajar bass selama 1 jam', 'Mengurangi screen time dari 6 jam ke 4 jam sehari'],
    guidance: null,
  },
  {
    id: 6,
    category: 'shared',
    title: 'A Sentence You Keep Returning To',
    type: 'Essay Singkat',
    question: 'Kalimat, nasihat, atau kutipan apa yang selalu berhasil mengingatkanmu ketika hidup terasa berat?',
    examples: ['"Done is better than perfect."', '"No sacrifice too great."', '"Ada anak bertanya dengan bokapnya.. "'],
    guidance: null,
  },
  {
    id: 7,
    category: 'shared',
    title: 'A Film That Inspires You',
    type: 'Essay Panjang',
    question: 'Sebutkan satu film yang memotivasi atau menjadi favoritmu karena menjadi inspirasi bagimu. Ceritakan sedikit alasannya.',
    examples: [],
    guidance: 'Bisa dari genre apa pun, yang penting menginspirasimu.',
  },
  {
    id: 8,
    category: 'friends',
    title: 'An Opinion Worth Sharing',
    type: 'Essay Singkat',
    question: 'Menurutmu, apa satu hal yang sering dianggap penting oleh banyak orang, tetapi sebenarnya tidak terlalu penting?',
    examples: [
      'Harus selalu membalas chat secepat mungkin.',
      'Harus selalu produktif setiap hari.',
      'Jumlah followers.',
      'Punya barang yang selalu terbaru.',
      'Tampil sempurna di media sosial.',
    ],
    guidance: 'Tidak ada jawaban benar atau salah. Ceritakan pendapatmu dengan santai.',
  },
  {
    id: 9,
    category: 'friends',
    title: 'Your Hot Take',
    type: 'Essay Pendek',
    question: 'Apa pendapat atau "hot take" ringan yang mungkin tidak disetujui semua orang, tetapi menurutmu masuk akal?',
    examples: [
      'Nasi goreng lebih enak daripada mie goreng.',
      'Kerja pagi jauh lebih nyaman daripada kerja malam.',
      'Film tidak harus selalu lebih bagus daripada bukunya.',
      'Liburan tidak harus ke luar negeri agar berkesan.',
      'Tidur siang seharusnya dianggap produktif.',
    ],
    guidance: 'Jaga tetap ringan, sopan, dan menyenangkan. Hindari topik sensitif seperti politik, agama, atau menyerang individu.',
  },
  {
    id: 10,
    category: 'friends',
    title: 'Leave Something Behind',
    type: 'Essay Singkat',
    question: 'Satu hal (nasihat, tips, quotes, pesan) yang ingin kamu bagikan dengan temanmu di sebelahmu?',
    examples: [
      'Contoh 1:\n"Bekerjalah seperti kau hidup selamanya,\nberibadahlah seperti kau akan mati besok."',
      'Contoh 2:\n"Lo hrs tau, Diskon di Friendstershop\nlebih murah dari tiktokshop"',
      'Contoh 3:\n"Harapku tinggi selangit, tapi di sudut hati yang sempit,\nkuhanya memujamu di sebaris bait"',
      'Contoh 4:\n"Terima kasih sudah menjadi rekan kerja\nyang selalu bisa diandalkan di masa-masa sulit"',
      'Contoh 5:\n"Lo harus nonton Odyssey sumpah keren banget karena ..."'
    ],
    guidance: 'Boleh berupa nasihat sederhana, rekomendasi lagu atau film, fun fact, life hack, quotes favorit, atau pesan lucu yang mungkin bisa membuat harinya lebih baik.',
  },
].map((q) => ({ ...q, maxLength: TYPE_LIMITS[q.type] }));
