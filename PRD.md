# Product Requirement Document (PRD)

# Reflection Journey
### Guided Self Reflection Experience for Workshop

| | |
|---|---|
| **Status** | Draft v3.4 |
| **Owner** | MAPID – Journaling & Self Reflection Workshop Team |
| **Last Updated** | 3 Agustus 2026 |
| **Version** | 3.4 |

> **Perubahan utama dari v2:** Fitur Reflection Board (papan jawaban bersama) **dihapus**. Aplikasi kini sepenuhnya privat per-perangkat · tidak ada backend, tidak ada database, tidak ada data yang terkirim ke mana pun. Ditambahkan: autosave, tombol Ulangi Refleksi, dan export ringkasan ke PDF. Empat pertanyaan direvisi. Rencana hosting: Netlify (situs statis).

---

## Daftar Isi

1. [Product Overview](#1-product-overview)
2. [Product Objective](#2-product-objective)
3. [Target User](#3-target-user)
4. [Design Principles](#4-design-principles)
5. [Information Architecture](#5-information-architecture)
6. [Reflection Flow](#6-reflection-flow)
7. [Onboarding Screen](#7-onboarding-screen)
8. [Question Categories & Labels](#8-question-categories--labels)
9. [Question List](#9-question-list)
10. [2 Ways Reflection Mechanic](#10-2-ways-reflection-mechanic)
11. [Autosave](#11-autosave)
12. [Retake (Ulangi Refleksi)](#12-retake-ulangi-refleksi)
13. [PDF Export](#13-pdf-export)
14. [Closing Screen](#14-closing-screen)
15. [User Interface Direction](#15-user-interface-direction)
16. [Data & Privacy Architecture](#16-data--privacy-architecture)
17. [Success Metrics](#17-success-metrics)
18. [Out of Scope](#18-out-of-scope)
19. [Open Questions](#19-open-questions)

---

## 1. Product Overview

### Background

Pada workshop **"Journaling & Self Reflection"**, peserta tidak hanya diperkenalkan mengenai konsep journaling, tetapi juga diajak untuk mempraktikkan proses refleksi diri secara langsung. Selama ini aktivitas refleksi biasanya dilakukan menggunakan buku catatan atau Google Form yang bersifat statis. Pendekatan tersebut kurang mampu memberikan pengalaman yang tenang, personal, dan terstruktur.

Aplikasi **Reflection Journey** dikembangkan sebagai media pendamping workshop yang menghadirkan pengalaman refleksi yang dipandu *(guided reflection)*. Peserta tidak akan melihat daftar pertanyaan sekaligus, melainkan akan diajak menjawab satu pertanyaan pada satu waktu · seperti sebuah quiz berurutan · sehingga mereka dapat lebih fokus terhadap proses berpikir dibanding sekadar mengisi formulir.

Konsep aplikasi mengambil inspirasi dari pengalaman pengguna aplikasi **Stoic**, yaitu bagaimana sebuah pertanyaan yang sederhana mampu membantu seseorang mengenali emosinya, memahami pengalaman yang sedang dialami, kemudian mengubah hasil refleksi tersebut menjadi pembelajaran yang bermakna.

Aplikasi ini dirancang **sepenuhnya privat**: seluruh jawaban hanya tersimpan di perangkat peserta sendiri, tidak pernah dikirim atau disimpan di server mana pun. Sebagian pertanyaan tetap diberi label "untuk didiskusikan bersama" · namun proses berbagi tersebut terjadi secara **lisan/langsung** dalam sesi workshop (dipandu fasilitator), bukan lewat sistem digital.

---

## 2. Product Objective

Reflection Journey bertujuan membantu peserta workshop melakukan refleksi diri secara sederhana namun bermakna dalam waktu sekitar **10 menit**.

Aplikasi harus mampu memberikan pengalaman yang:
- Terasa nyaman dan tidak menghakimi
- Mudah dipahami oleh pengguna pertama kali (*first-time user*)
- Dapat digunakan hanya menggunakan smartphone **tanpa login maupun registrasi**
- **Menjamin privasi penuh** · tidak ada satu pihak pun (termasuk penyelenggara workshop) yang dapat mengakses jawaban peserta lain
- Menghasilkan sesuatu yang bisa dibawa pulang peserta (ringkasan PDF) dan dapat diulang kembali kapan saja

---

## 3. Target User

Target pengguna utama adalah **peserta workshop internal** yang mengikuti sesi "Journaling & Self Reflection". Sebagian besar pengguna belum pernah menggunakan aplikasi journaling sehingga antarmuka harus dibuat sangat sederhana.

**Karakteristik pengguna:**

- Menggunakan smartphone Android maupun iPhone · **aplikasi wajib mobile-friendly** (responsive, mudah disentuh, teks terbaca tanpa zoom)
- Mengakses aplikasi melalui QR Code yang diberikan fasilitator
- Bisa menggunakan aplikasi lebih dari sekali (retake), tidak hanya satu kali pakai
- Tidak ingin menghabiskan waktu memahami cara penggunaan aplikasi
- Menginginkan pengalaman yang sederhana, tenang, dan intuitif

---

## 4. Design Principles

| Prinsip | Deskripsi |
|---|---|
| **Calm Experience** | Pengguna harus merasa tenang ketika membuka aplikasi. Hindari warna yang terlalu mencolok maupun animasi yang berlebihan. |
| **Guided Reflection** | Pengguna tidak boleh merasa sedang mengisi survei atau formulir. Aplikasi harus terasa seperti sedang berdialog dengan dirinya sendiri. |
| **One Focus Per Screen** | Setiap halaman hanya memiliki satu tujuan. Pengguna hanya melihat satu pertanyaan dalam satu waktu agar fokus tidak terpecah. |
| **Safe Space** | Sejak awal pengguna harus mengetahui mana pertanyaan yang bersifat pribadi dan mana yang didiskusikan bersama secara lisan. |
| **Privacy by Design** | Tidak ada backend, tidak ada database, tidak ada data yang meninggalkan perangkat pengguna. Ini bukan sekadar kebijakan, tetapi keputusan arsitektur. |

---

## 5. Information Architecture

Navigasi menggunakan **header atas** (bukan sidebar kiri seperti draft sebelumnya), berisi brand mark dan satu menu utama. Header bersifat `sticky` (selalu terlihat saat scroll), responsif tanpa perlu drawer/hamburger karena hanya berisi satu pill nav:

| Menu | Fungsi |
|---|---|
| **Reflection Question** | Satu-satunya alur aplikasi · quiz berurutan berisi 10 pertanyaan refleksi. Mengklik menu ini selalu melanjutkan dari langkah terakhir yang sedang dikerjakan (lihat [Autosave](#11-autosave)). |

Catatan privasi singkat ("Semua jawabanmu hanya tersimpan di perangkat ini...") dipindahkan ke **footer** di bagian bawah halaman, bukan lagi di sidebar.

> Menu **Submitted / Reflection Board** yang ada pada draft sebelumnya **dihapus sepenuhnya** · lihat [Data & Privacy Architecture](#16-data--privacy-architecture) untuk alasannya.

---

## 6. Reflection Flow

1. Pengguna membuka aplikasi (via QR Code).
2. **Landing screen** · judul "Reflection Journey" beserta intro singkat (lihat [Onboarding Screen](#7-onboarding-screen)). Jika ada sesi tersimpan (autosave), tombol berubah menjadi "Lanjutkan Refleksi".
3. **Mood check-in** · layar terpisah berisi face-icon selector "Bagaimana perasaanmu hari ini?" sebagai pemanasan sebelum masuk ke pertanyaan inti.
4. Pengguna menjawab **Question 1 s/d 10** secara berurutan (quiz style · satu pertanyaan per layar). Setiap perubahan jawaban langsung ter-autosave.
5. Setiap selesai menjawab satu pertanyaan, pengguna menekan tombol **Next** untuk lanjut; tombol **Kembali** selalu tersedia untuk mengedit jawaban sebelumnya selama sesi masih berjalan.
6. **Tidak ada lagi layar interstitial terpisah per kategori** (categoryIntro dihapus). Penjelasan kategori (Personal/Shared/Friends) kini muncul langsung sebagai catatan kecil di dalam setiap kartu pertanyaan yang bersangkutan — lihat [Question Categories & Labels](#8-question-categories--labels).
7. Setelah 10 pertanyaan selesai, aplikasi menampilkan **Closing Screen** dengan opsi **Download PDF** dan **Ulangi Refleksi**.

---

## 7. Onboarding Screen

Copy landing screen (ditampilkan persis sebelum mood check-in):

> **Reflection Journey** *(dengan ikon sprout custom di atas judul)*
> Take 10 minutes to reconnect with yourself.
>
> Tidak ada jawaban yang benar atau salah. Jawablah dengan jujur dan secukupnya. Beberapa pertanyaan hanya dapat dilihat olehmu, sedangkan beberapa pertanyaan akan didiskusikan bersama sebagai bagian dari aktivitas workshop. Semua jawabanmu tersimpan otomatis hanya di perangkat ini.

CTA: tombol **Mulai Refleksi** (atau **Lanjutkan Refleksi** jika ada sesi tersimpan) → lanjut ke layar Mood Check-in / langkah terakhir.

---

## 8. Question Categories & Labels

Tiga kategori label, masing-masing dengan penjelasan singkat yang tampil di awal section-nya:

### 🔒 PERSONAL REFLECTION (4 pertanyaan)
> Jawaban hanya dapat dilihat oleh dirimu sendiri. Gunakan ruang ini untuk berhenti sejenak dan berdialog dengan diri sendiri.

### 🌍 SHARED REFLECTION (3 pertanyaan)
> Pertanyaan ini cocok untuk dibagikan dalam forum bersama seluruh peserta, bukan sesi kelompok kecil. Jawabanmu tetap tersimpan hanya di perangkatmu sendiri, tidak dikirim atau disimpan oleh sistem mana pun.

*(Catatan: pada v2, kategori ini dijanjikan tampil otomatis secara anonim di "Reflection Board" digital. Karena fitur tersebut dihapus demi privasi penuh, label ini sekarang murni penanda "topik yang cocok dibahas di forum besar/pleno", bukan diskusi kelompok kecil maupun mekanisme publikasi digital.)*

### 👥 2 WAYS REFLECTION (3 pertanyaan)
> Bagian ini didiskusikan langsung dengan teman di sebelahmu secara bergantian. Tujuannya bukan mencari jawaban terbaik, tetapi saling mengenal dan berbagi hal sederhana yang mungkin membawa senyum atau inspirasi.

*(Nama kategori ini sebelumnya "Share with Friends", diganti menjadi "2 Ways Reflection". Label dan seluruh referensinya di aplikasi & dokumen ini sudah diperbarui.)*

---

## 9. Question List

Total **10 pertanyaan**: 4 Personal, 3 Shared, 3 kategori 2 Ways Reflection.

| # | Kategori | Judul | Tipe |
|---|---|---|---|
| 1 | 🔒 Personal | One Word Check-in | Essay Singkat |
| 2 | 🔒 Personal | The Conversation in Your Head | Essay Panjang |
| 3 | 🔒 Personal | Grateful Right Now | Essay Panjang |
| 4 | 🔒 Personal | MidTerm Review | Essay Pendek |
| 5 | 🌍 Shared | Small Wins | Essay Pendek |
| 6 | 🌍 Shared | A Sentence You Keep Returning To | Essay Singkat |
| 7 | 🌍 Shared | A Film That Inspires You | Essay Panjang |
| 8 | 👥 2 Ways Reflection | **An Opinion Worth Sharing** *(revisi)* | Essay Singkat |
| 9 | 👥 2 Ways Reflection | **Your Hot Take** *(revisi)* | Essay Pendek |
| 10 | 👥 2 Ways Reflection | Leave Something Behind | Essay Singkat |

### Detail per Pertanyaan

**1. One Word Check-in** · 🔒 Personal · *Essay Singkat*
**Pertanyaan:** Kalau minggu ini hanya boleh diberi satu judul, apa judul yang paling menggambarkan minggu ini?
**Contoh:** Jalani Saja · Banyak Pikiran · I try my best · Butuh rehat

**2. The Conversation in Your Head** · 🔒 Personal · *Essay Panjang*
**Pertanyaan:** Apa percakapan yang paling sering terjadi di dalam kepalamu akhir-akhir ini?
**Panduan:** Bisa berupa harapan, keraguan, rasa takut, atau pertanyaan yang terus muncul di pikiranmu.

**3. Grateful Right Now** · 🔒 Personal · *Essay Panjang*
**Pertanyaan:** Apa satu hal yang sangat kamu syukuri sampai detik ini?
**Panduan:** Bisa berupa orang, momen, pencapaian kecil, atau hal sederhana yang mungkin jarang kamu sadari.

**4. MidTerm Review** · 🔒 Personal · *Essay Pendek*
**Pertanyaan:** Mengingat sekarang kita sedang di tengah tahun, ada satu atau dua target apa yang sangat ingin kamu capai di akhir tahun 2026 ini?
**Contoh:** Lulus sertifikasi tertentu · Konsisten olahraga 3x seminggu · Menabung untuk tujuan tertentu

**5. Small Wins** · 🌍 Shared · *Essay Pendek*
**Pertanyaan:** Tantangan atau kebiasaan kecil apa yang berhasil kamu lewati/lakukan akhir-akhir ini?
**Contoh:** Olahraga (Strava) 2x minggu ini · Belajar bass selama 1 jam · Mengurangi screen time dari 6 jam ke 4 jam sehari

**6. A Sentence You Keep Returning To** · 🌍 Shared · *Essay Singkat*
**Pertanyaan:** Kalimat, nasihat, atau kutipan apa yang selalu berhasil mengingatkanmu ketika hidup terasa berat?
**Contoh:** "Done is better than perfect." · "No sacrifice too great." · "Ada anak bertanya dengan bokapnya.."

**7. A Film That Inspires You** · 🌍 Shared · *Essay Panjang*
**Pertanyaan:** Sebutkan satu film yang memotivasi atau menjadi favoritmu karena menjadi inspirasi bagimu. Ceritakan sedikit alasannya.
**Panduan:** Bisa dari genre apa pun, yang penting menginspirasimu.

**8. An Opinion Worth Sharing** *(revisi dari "Someone Who Inspires You")* · 👥 2 Ways Reflection · *Essay Singkat*
**Pertanyaan:** Menurutmu, apa satu hal yang sering dianggap penting oleh banyak orang, tetapi sebenarnya tidak terlalu penting?
**Contoh:** Harus selalu membalas chat secepat mungkin. · Harus selalu produktif setiap hari. · Jumlah followers. · Punya barang yang selalu terbaru. · Tampil sempurna di media sosial.
**Panduan:** Tidak ada jawaban benar atau salah. Ceritakan pendapatmu dengan santai.

**9. Your Hot Take** *(revisi dari "A Message to Your Past Friend")* · 👥 2 Ways Reflection · *Essay Pendek*
**Pertanyaan:** Apa pendapat atau "hot take" ringan yang mungkin tidak disetujui semua orang, tetapi menurutmu masuk akal?
**Contoh:** Nasi goreng lebih enak daripada mie goreng. · Kerja pagi jauh lebih nyaman daripada kerja malam. · Film tidak harus selalu lebih bagus daripada bukunya. · Liburan tidak harus ke luar negeri agar berkesan. · Tidur siang seharusnya dianggap produktif.
**Panduan:** Jaga tetap ringan, sopan, dan menyenangkan. Hindari topik sensitif seperti politik, agama, atau menyerang individu.

**10. Leave Something Behind** · 👥 2 Ways Reflection · *Essay Singkat*
**Pertanyaan:** Satu hal (nasihat, tips, quotes, pesan) yang ingin kamu bagikan dengan temanmu di sebelahmu?
**Panduan:** Boleh berupa nasihat sederhana, rekomendasi lagu atau film, fun fact, life hack, quotes favorit, atau pesan lucu yang mungkin bisa membuat harinya lebih baik.
**Contoh:** "Bekerjalah seperti kau hidup selamanya, beribadahlah seperti kau akan mati besok." · "Lo hrs tau, Diskon di Friendstershop lebih murah dari tiktokshop" · "Harapku tinggi selangit, tapi di sudut hati yang sempit, kuhanya memujamu di sebaris bait" · "Terima kasih sudah menjadi rekan kerja yang selalu bisa diandalkan di masa-masa sulit" · "Lo harus nonton Odyssey sumpah keren banget karena ..."

---

## 10. 2 Ways Reflection Mechanic

Kategori **2 Ways Reflection** *(sebelumnya bernama "Share with Friends")* dirancang sebagai **aktivitas diskusi lisan/langsung** di dalam ruangan, bukan sistem pairing digital:

- Semua peserta mendapat pertanyaan yang sama.
- Fasilitator memandu peserta bergiliran memimpin tiap pertanyaan · misalnya Pertanyaan 8 dipimpin/ditanyakan oleh Peserta X ke pasangannya, Pertanyaan 9 dipimpin oleh Peserta Y, dan seterusnya sampai ketiga pertanyaan selesai didiskusikan.
- **Kolom jawaban di aplikasi diisi dengan jawaban TEMAN, bukan jawaban milik peserta sendiri.** Peserta menanyakan pertanyaan ke teman di sebelahnya, lalu menuliskan jawaban temannya di kolom tersebut (placeholder input: "Tulis jawaban temanmu di sini..."). Bergantian: giliran peserta juga akan ditanya oleh temannya.
- Aplikasi hanya menampilkan teks pertanyaan sebagai prompt diskusi dan tempat mencatat; proses "berbagi" yang sesungguhnya tetap terjadi secara verbal/tatap muka.
- Jawaban kategori ini **tidak pernah** meninggalkan perangkat peserta.

> ⚠️ **Catatan implementasi:** mekanisme rotasi "siapa memimpin pertanyaan mana" perlu dituliskan sebagai instruksi/naskah fasilitator (di luar aplikasi).

---

## 11. Autosave

- Setiap kali peserta mengetik jawaban, memilih mood, atau berpindah langkah, aplikasi menyimpan progres ke **penyimpanan lokal perangkat** (browser local storage) · bukan ke server.
- Jika peserta menutup tab, me-refresh halaman, atau berpindah aplikasi lalu kembali, sesi refleksi akan **otomatis dilanjutkan** dari langkah terakhir (tombol landing berubah menjadi "Lanjutkan Refleksi").
- Data autosave ini hanya ada di perangkat peserta itu sendiri, dan otomatis terhapus saat peserta menekan **Ulangi Refleksi** (lihat [Section 12](#12-retake-ulangi-refleksi)) atau membersihkan data browser secara manual.

---

## 12. Retake (Ulangi Refleksi)

- Pada Closing Screen, tersedia tombol **🔁 Ulangi Refleksi**.
- Menekan tombol ini akan memunculkan konfirmasi, lalu menghapus seluruh jawaban & autosave, dan mengembalikan peserta ke Landing Screen untuk memulai sesi baru dari awal.
- Fitur ini memungkinkan aplikasi dipakai ulang oleh peserta yang sama di kesempatan lain (mis. workshop lanjutan, refleksi bulanan pribadi), atau bergantian di perangkat yang sama antar peserta.

---

## 13. PDF Export

- Pada Closing Screen, tersedia tombol **📄 Download Ringkasan (PDF)**.
- Menekan tombol ini membuka dialog **cetak/print bawaan browser** (mendukung "Save as PDF" di semua browser mobile & desktop modern · Chrome, Safari, Edge) berisi ringkasan rapi dari seluruh 10 pertanyaan beserta jawaban peserta dan mood check-in.
- Proses ini **sepenuhnya berjalan di perangkat peserta** · tidak ada file yang diunggah ke server mana pun.
- Ini menjadi satu-satunya cara peserta menyimpan hasil refleksinya secara permanen, karena aplikasi sendiri tidak menyimpan data secara jangka panjang di luar perangkat.

---

## 14. Closing Screen

Copy layar penutup setelah pertanyaan ke-10 selesai dijawab:

> **Penutup**
>
> Terima kasih sudah meluangkan waktu untuk berhenti sejenak.
>
> Tidak semua jawaban harus langsung mengubah hidupmu. Kadang, pertanyaan yang tepat sudah cukup untuk membuat kita melihat hidup dari sudut pandang yang berbeda.
>
> *"You feel depressed and messed up doesn't mean you're broken, it just means you're human."*
> David Mitchell

CTA: **Download Ringkasan (PDF)** dan **Ulangi Refleksi**.

---

## 15. User Interface Direction

**Status: sudah diimplementasikan (v3.4) — mengadopsi design system "Serene Narrative" (spesifikasi dari Google Stitch yang diberikan tim).** Ini menggantikan seluruh eksperimen palet manual sebelumnya (Stoic-minimal → pop-art Jepang → coklat/coffee → sage&blush → biru) sebagai *source of truth* desain final.

- **Konsep:** "Mindful Materiality" — perpaduan Modern Minimalism dengan sentuhan tactile/skeuomorphic ringan (kartu ala notebook dengan lubang jilid spiral di kiri), shadow lembut, dan tipografi berkualitas tinggi untuk kesan tenang dan reflektif.
- **Warna:** dasar krem sangat lembut (`#FBF9F4`), kartu putih (`#FFFFFF`) dengan border 1px halus dan shadow lembut (`0 4px 20px rgba(0,0,0,0.06)`, bukan lagi *hard offset shadow* "stiker"). Tiga warna tonal untuk kategori & tombol:
  - **Primary / Shared Reflection** — sage green (`#47645D`, tonal chip `#C9E9E0`)
  - **Secondary / Personal Reflection** — stone/muted gold (`#645E50`, tonal chip `#E8DFCD`)
  - **Tertiary / 2 Ways Reflection** — terracotta (`#894B38`, tonal chip `#FFDBD0`)
- **Tipografi:** Playfair Display (serif) untuk heading & teks pertanyaan aktif — memberi nuansa "buku" yang reflektif; Inter (sans-serif) untuk body text, label, dan kontrol UI. Dimuat via Google Fonts dengan fallback system font (Georgia/system-ui) jika offline.
- **Tombol** mengikuti hierarki 3 tingkat: **Primary** (solid sage, untuk Lanjut/Selesai/Download PDF), **Secondary** (outline sage, untuk Kembali), **Tertiary/Quiet** (teks saja warna stone, untuk Ulangi Refleksi) — bentuk rounded-md (8px), bukan pill penuh (kecuali progress bar yang tetap pill).
- **Input jawaban** memakai efek "punch-out" (sedikit resesi dengan inner shadow tipis) alih-alih border bawah saja, berubah ke border sage penuh saat fokus.
- **Elemen jilid spiral** (lubang ring dekoratif di kiri kartu) dipertahankan dari iterasi notebook sebelumnya karena sesuai dengan spesifikasi Stitch ("Small circular binder holes... to lean into the stationery metaphor"), namun kini digambar lebih halus (garis tipis, bukan outline tebal).
- **Landing screen menampilkan preview 3 fase** (Personal/Shared/2 Ways Reflection) sebagai checklist ringkas dengan warna tonal per kategori, sebelum peserta mulai menjawab.
- **Layout:** header atas (bukan sidebar), lihat [Information Architecture](#5-information-architecture).
- Ikon tetap 100% custom SVG line-icon (`icons.js`), tanpa emoji maupun ikon-font eksternal.
- Detail implementasi ada di `reflection-journey-app/public/styles.css`, `icons.js`, dan `app.js`.

---

## 16. Data & Privacy Architecture

Ini adalah perubahan paling mendasar dari draft sebelumnya:

- **Tidak ada backend, tidak ada database, tidak ada API yang menyimpan jawaban peserta.**
- Seluruh logika aplikasi (pertanyaan, alur, autosave, PDF export) berjalan di sisi klien (browser), memakai *local storage* milik perangkat masing-masing peserta.
- Karena tidak ada data yang terkirim ke server, aplikasi dapat di-deploy sebagai **situs statis murni** · cocok untuk hosting di **Netlify** tanpa biaya tambahan, tanpa server yang perlu dirawat, dan tanpa risiko kebocoran data peserta ke pihak lain (termasuk penyelenggara/fasilitator workshop).
- Konsekuensi: fitur **Reflection Board** (papan jawaban bersama lintas peserta) yang ada di draft v1/v2 **tidak lagi digital** · bagian "berbagi" kini sepenuhnya terjadi secara lisan dalam sesi workshop (lihat [2 Ways Reflection Mechanic](#10-2-ways-reflection-mechanic) dan catatan di [Section 8](#8-question-categories--labels)).

---

## 17. Success Metrics

- Completion rate: persentase peserta yang menyelesaikan seluruh 10 pertanyaan.
- Waktu rata-rata penyelesaian sesi (target ~10 menit).
- Jumlah peserta yang menggunakan tombol Download PDF.
- Jumlah peserta yang menggunakan Ulangi Refleksi (indikasi retensi/pemakaian ulang).

*(Catatan: karena tidak ada backend, metrik ini tidak bisa diukur otomatis oleh sistem · perlu survei manual/self-report ke peserta jika benar-benar ingin diukur.)*

---

## 18. Out of Scope

- Login/registrasi akun pengguna.
- Backend, API, atau database dalam bentuk apa pun.
- Reflection Board digital / agregasi jawaban lintas peserta.
- Sistem pairing digital untuk fitur 2 Ways Reflection (mekanismenya lisan/fasilitator-driven).
- Analytics/tracking yang mengidentifikasi peserta.
- Sinkronisasi jawaban lintas perangkat (jawaban terikat ke satu perangkat/browser saja).

---

## 19. Open Questions

- Naskah/skrip rotasi fasilitator untuk kategori 2 Ways Reflection (siapa memimpin pertanyaan mana) · perlu disiapkan terpisah dari aplikasi.
- Apakah perlu versi cetak/QR fallback untuk peserta yang browsernya tidak mendukung "Save as PDF" dari dialog print?
- Domain/nama proyek final di Netlify untuk QR Code workshop.
