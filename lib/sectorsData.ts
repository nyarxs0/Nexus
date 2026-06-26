export interface Vocabulary {
  id: string;
  word: string;
  definition: string;
  pronunciation?: string;
  context: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  summary: string;     // Mode Santai: 2-3 mins summary with key bullets
  caseStudy: string;   // Mode Menengah: detail content + real world case study
  deepDive: string;    // Mode Serius: rigorous theory + academic references + mini-project prompt
}

export interface Jembatan {
  text: string;
  targetSectorId: string;
  targetTopicId?: string;
  bridgeReason: string;
}

export interface Topic {
  id: string;
  title: string;
  difficulty: "Santai" | "Menengah" | "Serius";
  progress: number; // percentage completed
  content: LessonContent;
  jembatan: Jembatan[];
  quiz: QuizQuestion[];
  vocabIds: string[];
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  color: string; // hex or tailwind class name
  accentGlow: string; // glow color style
  icon: string; // Lucide icon string name
  x: number; // coordinate for map visualization
  y: number; // coordinate for map visualization
  connectedSectorIds: string[];
  topics: Topic[];
}

export interface CrossSectorChallenge {
  id: string;
  title: string;
  description: string;
  sectors: string[]; // e.g. ["teknologi", "filsafat"]
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  badgeName: string;
}

export const VOCABULARY_LIST: Record<string, Vocabulary> = {
  api: {
    id: "api",
    word: "API",
    pronunciation: "/ˌeɪ.piːˈaɪ/",
    definition: "Application Programming Interface - Protokol/perantara digital yang memungkinkan dua sistem perangkat lunak untuk saling berbicara dan bertukar data secara otomatis.",
    context: "Sektor: Teknologi, Ekonomi"
  },
  coding: {
    id: "coding",
    word: "Coding",
    pronunciation: "/ˈkoʊ.dɪŋ/",
    definition: "Proses menulis instruksi dalam bahasa pemrograman terstruktur agar komputer dapat mengeksekusi tugas spesifik sesuai logika algoritma.",
    context: "Sektor: Teknologi, Filsafat"
  },
  python: {
    id: "python",
    word: "Python",
    pronunciation: "/ˈpaɪ.θɑːn/",
    definition: "Bahasa pemrograman tingkat tinggi yang menekankan keterbacaan kode, sangat populer digunakan untuk data science, otomatisasi, dan pengembangan AI.",
    context: "Sektor: Teknologi, AI/ML"
  },
  neural_networks: {
    id: "neural_networks",
    word: "Neural Networks",
    pronunciation: "/ˈnʊr.əl ˈnet.wɜːrks/",
    definition: "Jaringan Saraf Tiruan - Arsitektur machine learning yang terinspirasi oleh interaksi sinapsis neuron biologis di dalam otak manusia.",
    context: "Sektor: AI/ML, Sains"
  },
  prompt_engineering: {
    id: "prompt_engineering",
    word: "Prompt Engineering",
    pronunciation: "/prɑːmpt ˌen.dʒɪˈnɪr.ɪŋ/",
    definition: "Teknik memformulasikan instruksi atau query secara presisi agar model kecerdasan buatan generatif memberikan respons berkualitas tinggi dan terarah.",
    context: "Sektor: AI/ML, Kehidupan (Psikologi)"
  },
  etika: {
    id: "etika",
    word: "Etika",
    pronunciation: "/ˈe.ti.ka/",
    definition: "Cabang filsafat nilai yang menyelidiki prinsip moral tentang keputusan benar dan salah, serta dampak tindakan manusia terhadap individu dan masyarakat.",
    context: "Sektor: Filsafat, AI/ML"
  },
  inflasi: {
    id: "inflasi",
    word: "Inflasi",
    pronunciation: "/inˈfla.si/",
    definition: "Kecenderungan kenaikan harga barang dan jasa secara umum serta terus-menerus yang menurunkan daya beli mata uang domestik.",
    context: "Sektor: Ekonomi, Cara Kerja Dunia"
  },
  ipo: {
    id: "ipo",
    word: "IPO",
    pronunciation: "/ˌaɪ.piːˈoʊ/",
    definition: "Initial Public Offering - Penawaran Umum Perdana di mana perusahaan tertutup menjual sahamnya kepada masyarakat umum untuk pertama kali di bursa efek.",
    context: "Sektor: Ekonomi, Bisnis"
  },
  defi: {
    id: "defi",
    word: "DeFi",
    pronunciation: "/ˈdiː.faɪ/",
    definition: "Decentralized Finance - Ekosistem keuangan berbasis blockchain terdesentralisasi yang meniadakan perantara tradisional seperti bank atau pialang.",
    context: "Sektor: Ekonomi, Teknologi"
  },
  dns: {
    id: "dns",
    word: "DNS",
    pronunciation: "/ˌdiː.enˈes/",
    definition: "Domain Name System - Buku telepon internet yang memetakan nama domain situs yang mudah diingat manusia (seperti google.com) menjadi alamat IP numerik mesin.",
    context: "Sektor: Cara Kerja Dunia, Teknologi"
  },
  kuantum: {
    id: "kuantum",
    word: "Mekanika Kuantum",
    pronunciation: "/kuˈan.tum/",
    definition: "Cabang fisika teoretis yang mempelajari perilaku materi dan radiasi energi pada tingkat partikel subatomik yang sangat kecil.",
    context: "Sektor: Sains, Teknologi"
  },
  logical_fallacy: {
    id: "logical_fallacy",
    word: "Logical Fallacy",
    pronunciation: "/ˈlɑː.dʒɪ.kəl ˈfæl.ə.si/",
    definition: "Kesesatan Berpikir - Pola argumen atau penalaran yang terdengar persuasif tetapi mengandung cacat logika dasar yang merusak kesahihan konklusinya.",
    context: "Sektor: Filsafat, Kehidupan"
  },
  design_thinking: {
    id: "design_thinking",
    word: "Design Thinking",
    pronunciation: "/dɪˈzaɪn ˈθɪŋ.kɪŋ/",
    definition: "Metodologi penyelesaian masalah berpusat pada manusia (human-centered) yang mengutamakan empati, pendefinisian ulang problem, ideasi kreatif, dan eksperimentasi.",
    context: "Sektor: Seni & Kreativitas, Bisnis"
  },
  psikologi_kognitif: {
    id: "psikologi_kognitif",
    word: "Psikologi Kognitif",
    pronunciation: "/saɪˈkɑː.lə.dʒi ˈkɑːɡ.nə.t̬ɪv/",
    definition: "Studi ilmiah mengenai proses mental internal manusia termasuk memori, persepsi, cara berpikir, belajar, bahasa, dan pengambilan keputusan.",
    context: "Sektor: Kehidupan, AI/ML"
  }
};

export const SECTORS_DATA: Sector[] = [
  {
    id: "teknologi",
    name: "Teknologi",
    description: "Infrastruktur digital, arsitektur kode, perangkat keras, dan sistem pertukaran data modern yang menopang peradaban modern.",
    color: "#00d4ff",
    accentGlow: "rgba(0, 212, 255, 0.4)",
    icon: "Cpu",
    x: 200,
    y: 150,
    connectedSectorIds: ["ai_ml", "ekonomi", "cara_kerja_dunia", "sains", "filsafat"],
    topics: [
      {
        id: "apa_itu_api",
        title: "Apa itu API? (dan kenapa ekonomi butuh API)",
        difficulty: "Santai",
        progress: 0,
        vocabIds: ["api", "defi"],
        content: {
          summary: `### 🌐 Konsep API dalam 3 Menit
Analogikan **API (Application Programming Interface)** seperti **Pelayan di Restoran**.
*   **Anda (Pengguna/Aplikasi Client)** memesan makanan dari menu.
*   **Dapur Restoran (Server/Sistem Database)** memiliki bahan dan memasak makanan tersebut.
*   **Pelayan (API)** membawa pesanan Anda ke dapur, lalu mengantarkan makanan yang sudah siap kembali ke meja Anda.

Tanpa pelayan, Anda harus masuk ke dapur sendiri—ini tidak efisien dan berbahaya (masalah keamanan sistem). API menjaga privasi dapur sembari memastikan pesanan Anda terkirim dengan sempurna.

#### 💡 Kenapa Ini Penting?
Di era modern, seluruh aplikasi saling terhubung. Saat Anda memesan Gojek, aplikasi membutuhkan Google Maps API untuk melacak peta, dan Midtrans API untuk memproses pembayaran bank. Semuanya berjalan berkat kolaborasi ribuan API yang tidak terlihat.`,
          caseStudy: `### 💼 Studi Kasus: Transformasi Perbankan Terbuka (Open Banking API)
Dahulu, bank adalah institusi yang sangat tertutup. Anda hanya bisa memeriksa saldo lewat ATM fisik atau aplikasi eksklusif milik bank bersangkutan. Namun, lahirnya konsep **Open Banking API** mengubah total industri keuangan.

#### 🛡️ Transformasi FinTech (Contoh: Stripe & GoPay)
Dengan membuka API transaksi secara aman ke pengembang pihak ketiga:
1.  **Integrasi Pembayaran Cepat:** Toko online e-commerce skala kecil dapat mengintegrasikan pembayaran kartu kredit, e-wallet, dan virtual account hanya dengan memasukkan beberapa baris kode API dari penyedia seperti Stripe atau Midtrans.
2.  **API Economy:** Ini menciptakan model bisnis baru yang disebut "API-First". Perusahaan seperti Stripe tidak membuat tampilan situs untuk pengguna akhir; mereka murni menjual "pipa konektivitas data pembayaran" lewat API. Semakin banyak transaksi yang mengalir lewat pipa ini, semakin besar keuntungan ekonomi yang dihasilkan.`,
          deepDive: `### 🔬 Deep-Dive Arsitektur API: REST vs GraphQL & Mini-Proyek
Dalam pengembangan sistem skala industri, terdapat standar protokol pengiriman data. Dua yang paling populer adalah **REST (Representational State Transfer)** dan **GraphQL**.

#### 📐 Perbandingan Arsitektur:
1.  **REST API:**
    *   Menggunakan endpoint URL terpisah untuk setiap resource (contoh: \`/api/users\`, \`/api/orders\`).
    *   Sering memicu masalah *over-fetching* (mengambil data lebih banyak dari yang dibutuhkan) atau *under-fetching* (harus memanggil API berkali-kali untuk mendapatkan informasi lengkap).
2.  **GraphQL:**
    *   Hanya memiliki satu endpoint tunggal.
    *   Client menulis query spesifik untuk meminta data yang diinginkan saja secara presisi (no over-fetching).

---

#### 🛠️ PROYEK MINI: Mengakses Web API dengan Fetch (JavaScript)
Salin kode berikut ke konsol browser Anda untuk melakukan pengambilan data nyata dari API publik (JSONPlaceholder) untuk mengambil profil pengguna:

\`\`\`javascript
// Meminta data dari pelayan digital (API)
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json()) // Menerjemahkan respons ke format JSON
  .then(userData => {
    console.log("=== KONEKSI API BERHASIL ===");
    console.log("Nama Pengguna:", userData.name);
    console.log("Email Pengguna:", userData.email);
    console.log("Kota Tinggal:", userData.address.city);
  })
  .catch(error => console.error("Koneksi API gagal:", error));
\`\`\`

#### 📚 Referensi Akademik:
*   *Fielding, R. T. (2000).* "Architectural Styles and the Design of Network-based Software Architectures." Disertasi PhD yang memperkenalkan konsep REST.`
        },
        jembatan: [
          {
            text: "Teknologi memungkinkan ekonomi digital via 'API Economy'",
            targetSectorId: "ekonomi",
            targetTopicId: "crypto_defi",
            bridgeReason: "API adalah jembatan teknis yang merevolusi cara uang mengalir antar ekosistem keuangan digital modern, termasuk integrasi gateway pembayaran ke blockchain."
          },
          {
            text: "Konsep API sebagai perantara bisnis skala makro",
            targetSectorId: "bisnis",
            targetTopicId: "model_bisnis",
            bridgeReason: "Model bisnis modern 'SaaS' (Software as a Service) dan 'API-First' menjual fungsionalitas murni via API, mengubah total bagaimana startup teknologi mengekspansi skala pasarnya."
          }
        ],
        quiz: [
          {
            question: "Jika dianalogikan sebagai restoran, apa peran 'API'?",
            options: [
              "Bahan makanan yang disimpan di gudang dapur",
              "Pelayan yang mengantarkan pesanan antara pelanggan dan dapur",
              "Koki yang memasak makanan di belakang layar",
              "Meja kasir tempat pelanggan membayar tagihan"
            ],
            correctIndex: 1,
            explanation: "API bertindak sebagai pembawa pesan (pelayan) yang menghubungkan permintaan aplikasi client (pelanggan) ke server/database (dapur) untuk mengambil data yang dibutuhkan."
          },
          {
            question: "Apa keunggulan utama GraphQL dibanding REST API tradisional?",
            options: [
              "GraphQL lebih lambat tapi lebih aman",
              "GraphQL mengizinkan client meminta data yang spesifik saja tanpa over-fetching",
              "GraphQL tidak membutuhkan koneksi internet",
              "GraphQL hanya bisa berjalan di bahasa pemrograman Python"
            ],
            correctIndex: 1,
            explanation: "GraphQL memungkinkan pengembang mendefinisikan query spesifik untuk mengambil data secara presisi, sehingga tidak terjadi pemborosan bandwidth (over-fetching)."
          },
          {
            question: "Bagaimana 'API' berkontribusi pada 'Open Banking' di sektor Ekonomi?",
            options: [
              "API membuat bank mencetak uang kertas lebih banyak",
              "API mengizinkan fintech pihak ketiga mengakses transaksi keuangan secara aman guna mempermudah pembayaran digital",
              "API menutup akses nasabah dari rekening pribadinya",
              "API melarang bank bertransaksi secara online"
            ],
            correctIndex: 1,
            explanation: "Open Banking menggunakan API aman untuk mengizinkan integrasi pembayaran pihak ketiga (seperti e-wallet atau e-commerce) langsung ke jaringan perbankan."
          }
        ]
      },
      {
        id: "apa_itu_coding",
        title: "Apa itu Coding? (dan hubungannya dengan logika filsafat)",
        difficulty: "Santai",
        progress: 0,
        vocabIds: ["coding", "api"],
        content: {
          summary: `### 💻 Hakikat Coding & Bahasa Mesin
Pada intinya, **Coding** adalah cara kita memberi tahu komputer apa yang harus dilakukan. Komputer sebenarnya sangat bodoh; mereka hanya memahami angka \`1\` (ada tegangan listrik) dan \`0\` (tidak ada tegangan). Kita menyebutnya **Binary Code**.

Karena menulis \`01101001\` sangat sulit bagi manusia, kita menciptakan **Bahasa Pemrograman** (seperti JavaScript, Python, atau C++) sebagai jembatan penengah yang mudah dipahami manusia namun bisa dikonversi menjadi bahasa biner mesin.

#### 💡 Struktur Berpikir Coding
Coding tidak selalu tentang mengetik di depan layar hitam. Menulis kode adalah proses mendesain **algoritma**—yaitu urutan instruksi logis, teratur, dan tanpa ambigu untuk menyelesaikan suatu masalah.`,
          caseStudy: `### 🧠 Jembatan Sejarah: Dari Logika Proposisi Aristotle ke Gerbang Logika Komputer
Semua komputer digital modern didasarkan pada **Boolean Logic** (Logika Aljabar George Boole pada abad ke-19), yang mana berasal langsung dari **Logika Silogisme** milik filsuf Yunani Kuno, **Aristotle**.

#### 🏛️ Contoh Logika Silogisme Filsafat:
1.  *Premis Mayor:* Semua manusia fana.
2.  *Premis Minor:* Sokrates adalah manusia.
3.  *Konklusi:* Sokrates fana.

Dalam pemrograman, kita merepresentasikan silogisme ini menggunakan kondisi percabangan **IF-ELSE**:
\`\`\`javascript
const sokrates = { tipe: "manusia" };
if (sokrates.tipe === "manusia") {
  sokrates.status = "fana"; // TRUE
} else {
  sokrates.status = "abadi"; // FALSE
}
\`\`\`
Sirkuit fisik mikroprosesor di dalam ponsel Anda menyusun miliaran "gerbang transistor" (AND, OR, NOT) murni untuk memproses logika filosofis ini dalam hitungan nanosekon.`,
          deepDive: `### 🔬 Bagaimana Kode Dieksekusi: Kompilator vs Interpreter
Bagaimana baris teks bahasa Inggris yang Anda tulis berubah menjadi pulsa listrik biner di dalam silikon CPU? Ada dua metode utama:

#### 1. Kompilasi (Compiled Languages - Contoh: C++, Rust, Go)
*   Kode sumber Anda dianalisis secara keseluruhan oleh program bernama **Compiler**.
*   Compiler menghasilkan satu file biner mandiri (.exe atau format biner mesin lainnya).
*   *Kelebihan:* Sangat cepat saat dijalankan karena sudah menjadi bahasa mesin murni sebelum digunakan.
*   *Kekurangan:* Proses kompilasi butuh waktu, dan file biner tidak bisa langsung dipindahkan antar sistem operasi yang berbeda tanpa dikompilasi ulang.

#### 2. Interpretasi (Interpreted Languages - Contoh: Python, JavaScript)
*   Kode sumber dibaca baris demi baris saat dijalankan oleh program bernama **Interpreter**.
*   *Kelebihan:* Mudah didebug karena langsung dijalankan, sangat portabel (bisa berjalan di OS apa saja selama ada interpreter).
*   *Kekurangan:* Eksekusi cenderung lebih lambat dibanding compiled languages.

---

#### 🛠️ PROYEK MINI: Menulis Algoritma Rekursif Pertama
Rekursif adalah fungsi yang memanggil dirinya sendiri—konsep matematika yang sangat elegan. Berikut adalah cara mencari bilangan faktorial (contoh: 5! = 5 x 4 x 3 x 2 x 1) di Javascript:

\`\`\`javascript
function faktorial(n) {
  // Base case (Kondisi Berhenti)
  if (n <= 1) return 1;
  // Recursive step
  return n * faktorial(n - 1);
}
console.log("Faktorial dari 5 adalah:", faktorial(5)); // Output: 120
\`\`\`

#### 📚 Referensi Akademik:
*   *Turing, A. M. (1936).* "On Computable Numbers, with an Application to the Entscheidungsproblem." Fondasi matematika teori komputasi modern.`
        },
        jembatan: [
          {
            text: "Logika coding berasal langsung dari logika filsafat",
            targetSectorId: "filsafat",
            targetTopicId: "logika_argumentasi",
            bridgeReason: "Gerbang logika komputer (AND, OR, NOT) murni bersandar pada aljabar boolean, yang akarnya ditarik dari kajian epistemologi dan logika formal filsafat klasik."
          }
        ],
        quiz: [
          {
            question: "Apa bahasa paling mendasar yang dipahami secara fisik oleh CPU komputer?",
            options: [
              "Bahasa Inggris terstruktur",
              "Bahasa Biner (angka 0 dan 1 / sinyal listrik)",
              "Bahasa pemrograman Python",
              "File spreadsheet Excel"
            ],
            correctIndex: 1,
            explanation: "Komputer secara fisik adalah sirkuit elektronik yang hanya memahami ada tidaknya tegangan listrik, direpresentasikan sebagai biner 0 dan 1."
          },
          {
            question: "Filsuf klasik mana yang meletakkan dasar pemikiran logika formal (silogisme) yang menginspirasi kode pemrograman?",
            options: [
              "Aristotle",
              "Karl Marx",
              "Friedrich Nietzsche",
              "Jean-Paul Sartre"
            ],
            correctIndex: 0,
            explanation: "Aristotle mengembangkan logika silogisme formal, struktur awal pengkondisian logis (jika premis benar, kesimpulan benar) yang kita pakai di percabangan IF-ELSE komputer."
          },
          {
            question: "Apa perbedaan utama antara bahasa pemrograman Compiled dan Interpreted?",
            options: [
              "Compiled tidak aman, Interpreted sangat aman",
              "Compiled menerjemahkan seluruh kode sekaligus menjadi file biner sebelum dijalankan, sedangkan Interpreted menerjemahkannya baris demi baris saat dijalankan",
              "Compiled hanya untuk membuat game, Interpreted hanya untuk data sains",
              "Tidak ada perbedaan sama sekali"
            ],
            correctIndex: 1,
            explanation: "Compiled memproses keseluruhan kode di awal untuk melahirkan file biner mandiri yang sangat cepat eksekusinya, sedangkan Interpreted membacanya dinamis baris demi baris pada saat runtime."
          }
        ]
      }
    ]
  },
  {
    id: "ai_ml",
    name: "AI & Machine Learning",
    description: "Sistem cerdas peniru kognisi manusia, jaringan saraf tiruan, model bahasa besar (LLM), dan otomatisasi adaptif berbasis data.",
    color: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.4)",
    icon: "BrainCircuit",
    x: 450,
    y: 150,
    connectedSectorIds: ["teknologi", "sains", "filsafat", "kehidupan"],
    topics: [
      {
        id: "neural_networks_otak",
        title: "Neural Networks (dan analogi dengan otak manusia)",
        difficulty: "Santai",
        progress: 0,
        vocabIds: ["neural_networks", "psikologi_kognitif"],
        content: {
          summary: `### 🧠 Apa itu Neural Network?
**Neural Network (Jaringan Saraf Tiruan)** adalah jantung dari kecerdasan buatan modern. Sesuai namanya, konsep ini meniru cara kerja **otak biologis manusia**.

Di otak kita, terdapat miliaran **neuron** yang saling terhubung lewat **sinapsis**. Saat Anda menyentuh benda panas, neuron sensorik mengirimkan sinyal listrik cepat melewati sirkuit neuron ini untuk menghasilkan keputusan: *"Tarik tangan segera!"*

Dalam komputer, kita membuat neuron tiruan digital (disebut **nodes** atau **perceptrons**) yang disusun dalam lapisan-lapisan (layers):
1.  **Input Layer:** Menerima data mentah (misal: piksel gambar kucing).
2.  **Hidden Layer(s):** Menganalisis pola tersembunyi (garis, lekukan, bentuk telinga kucing).
3.  **Output Layer:** Memberikan kesimpulan akhir (98% Kemungkinan ini Kucing).`,
          caseStudy: `### 🔬 Studi Kasus: Bagaimana AI Belajar Mengenali Wajah (Computer Vision)
Bagaimana komputer tahu bahwa sebuah foto adalah wajah manusia dan bukan sekadar pola acak warna? Neural Network melakukannya secara bertahap melalui struktur hirarki berlapis (**Deep Learning**).

#### 🖼️ Proses Pengenalan Wajah oleh AI:
*   **Lapisan Pertama (Deteksi Tepi):** Menganalisis bagian piksel mentah yang sangat kontras, mendeteksi garis-garis tepi vertikal, horizontal, dan diagonal.
*   **Lapisan Kedua (Deteksi Fitur Lokal):** Menggabungkan garis-garis tepi tersebut menjadi bentuk geometris sederhana: lingkaran mata, lengkungan hidung, garis bibir.
*   **Lapisan Ketiga (Hirarki Objek):** Menggabungkan hidung, mata, dan mulut menjadi kesatuan wajah utuh.
*   **Proses Training (Belajar dari Kesalahan):** Awalnya, AI menebak secara asal. Melalui jutaan sampel foto, model disesuaikan berat hubungannya (**weights**) menggunakan kalkulus optimasi, sehingga tebakan AI semakin akurat dari waktu ke waktu. Hal ini mirip dengan balita yang belajar mengenali hewan di sekitarnya lewat pengulangan.`,
          deepDive: `### 🔬 Matematika di Balik Belajar: Forward Propagation & Backpropagation
Di bawah visualisasi neuron digital yang indah, Neural Network hanyalah rumus aljabar linier dan kalkulus multivariat raksasa.

#### 📐 Persamaan Matematika Neuron Tunggal:
Tiap neuron menerima input $x$, mengalikannya dengan bobot (*weights*) $w$, menambahkan bias $b$, lalu menyalurkannya ke fungsi aktivasi $f$:

$$y = f(\sum (x_i w_i) + b)$$

*   **Bobot ($w$):** Menunjukkan seberapa penting input tersebut mempengaruhi keputusan.
*   **Bias ($b$):** Membantu menggeser fungsi aktivasi agar sesuai dengan data latihan.
*   **Fungsi Aktivasi (seperti ReLU atau Sigmoid):** Memperkenalkan sifat non-linier agar model bisa mempelajari pola yang rumit (bukan sekadar garis lurus).

#### 🔄 Siklus Pembelajaran:
1.  **Forward Propagation:** Sinyal masuk dari input, dihitung lewat lapisan tersembunyi, hingga melahirkan prediksi di output.
2.  **Loss Function:** Menghitung selisih (eror) antara prediksi AI dengan kebenaran asli (ground truth).
3.  **Backpropagation (Kalkulus Turunan Berantai):** Menghitung mundur untuk mencari kontribusi eror setiap neuron, lalu memperbarui bobot ($w$) menggunakan algoritma **Gradient Descent** agar eror di putaran berikutnya mengecil.

---

#### 🛠️ PROYEK MINI: Mengonseptualisasikan Bobot Neuron
Bayangkan Anda ingin membuat sistem klasifikasi sederhana untuk menentukan apakah Anda harus membeli rumah baru (Output: 1 atau 0) berdasarkan dua kriteria (Input):
*   $x_1$: Harga Murah (Nilai: 1 jika ya, 0 jika mahal)
*   $x_2$: Dekat Tempat Kerja (Nilai: 1 jika ya, 0 jika jauh)

Jika bagi Anda kedekatan ke kantor 3 kali lebih penting daripada harga murah, Anda akan mendesain bobot neuron seperti ini:
\`\`\`javascript
const input = { x1: 1, x2: 1 }; // Rumah murah dan dekat kantor
const weights = { w1: 1, w2: 3 }; // Bobot x2 jauh lebih tinggi
const bias = -2; // Ambang batas aktivasi

const sum = (input.x1 * weights.w1) + (input.x2 * weights.w2) + bias;
const output = sum > 0 ? "Beli Rumah!" : "Jangan Beli";

console.log("Nilai akumulasi logika neuron:", sum);
console.log("Keputusan akhir:", output); // Output: Beli Rumah! (sum = 2 > 0)
\`\`\`

#### 📚 Referensi Akademik:
*   *Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986).* "Learning representations by back-propagating errors." Jurnal dasar yang mempopulerkan backpropagation.`
        },
        jembatan: [
          {
            text: "Neural Networks didasarkan pada biologi sel otak",
            targetSectorId: "sains",
            targetTopicId: "sains_dasar",
            bridgeReason: "Struktur koneksi matematis buatan ini adalah representasi abstrak dari neuron biologis yang dipelajari dalam ilmu saraf dan biologi sains alam."
          },
          {
            text: "Cara kerja belajar AI mencerminkan psikologi kognitif manusia",
            targetSectorId: "kehidupan",
            targetTopicId: "psikologi_belajar",
            bridgeReason: "Konsep penyesuaian bobot (weights) saat AI mengalami kesalahan sangat identik dengan neuroplastisitas otak manusia dalam psikologi kognitif saat kita belajar dari kesalahan."
          }
        ],
        quiz: [
          {
            question: "Bagian dari Neural Network yang bertugas mengenali pola-pola abstrak tersembunyi di tengah sistem disebut...",
            options: [
              "Input Layer",
              "Hidden Layer",
              "Output Layer",
              "Database Layer"
            ],
            correctIndex: 1,
            explanation: "Hidden Layer terletak di antara Input dan Output, bertugas memproses dan mengidentifikasi pola kompleks yang tersembunyi dari data mentah."
          },
          {
            question: "Dalam matematika Neural Network, apa fungsi dari 'Backpropagation'?",
            options: [
              "Menghapus seluruh memori AI",
              "Menghitung kontribusi kesalahan mundur dari output untuk memperbaiki bobot neuron secara berkala",
              "Mengirim hasil prediksi langsung ke printer pengguna",
              "Mengubah kode Python menjadi HTML"
            ],
            correctIndex: 1,
            explanation: "Backpropagation menggunakan kalkulus turunan berantai untuk mendistribusikan sinyal eror kembali ke jaringan saraf guna memperbarui weights (bobot) agar model makin cerdas."
          },
          {
            question: "Bagaimana Neural Network belajar mengenali pola kompleks secara non-linier?",
            options: [
              "Menggunakan fungsi aktivasi (seperti ReLU atau Sigmoid) pada neuron",
              "Hanya membaca file teks biasa",
              "Membatasi komputer hanya memakai memori 1 GB",
              "Menghapus semua angka ganjil di dalam input"
            ],
            correctIndex: 0,
            explanation: "Fungsi Aktivasi memperkenalkan sifat non-linier ke dalam persamaan saraf tiruan, memungkinkan model mempelajari batasan bentuk yang rumit, bukan hanya relasi linear lurus."
          }
        ]
      },
      {
        id: "prompt_engineering_komunikasi",
        title: "Prompt Engineering (dan hubungannya dengan psikologi)",
        difficulty: "Santai",
        progress: 0,
        vocabIds: ["prompt_engineering", "psikologi_kognitif"],
        content: {
          summary: `### 💬 Seni Mengontrol AI: Prompt Engineering
Banyak orang mengira kecerdasan buatan (seperti LLM / ChatGPT) bisa membaca pikiran. Kenyataannya, AI bekerja murni berdasarkan pola statistik bahasa. Respons yang Anda dapatkan sangat bergantung pada kualitas kata-kata yang Anda berikan. Itulah esensi **Prompt Engineering**.

#### 💡 Hukum Emas Prompting: "Garbage In, Garbage Out"
Jika Anda memasukkan pertanyaan yang malas, kabur, atau tidak berstruktur, Anda akan mendapat jawaban yang dangkal. Sebaliknya, jika Anda memberikan konteks, instruksi spesifik, dan batasan yang jelas, AI akan melahirkan analisis yang luar biasa.

#### 🧠 Jembatan Psikologi: Teori Kognisi
Kenapa teknik prompting tertentu sangat efektif? Karena struktur penyusunan kalimat kita memicu bias statistik dalam database besar tempat AI dilatih—konsep yang menyerupai cara manusia distimulasi secara kognitif dalam psikologi komunikasi.`,
          caseStudy: `### 🛠️ Teknik Prompting Tingkat Lanjut: Zero-Shot, Few-Shot, & Chain of Thought
Mari kita bedah 3 teknik dasar yang biasa digunakan oleh insinyur kecerdasan buatan untuk merancang asisten AI yang hebat:

#### 1. Zero-Shot Prompting (Tanpa Contoh)
Kita langsung memerintahkan AI menyelesaikan tugas tanpa contoh.
*   *Contoh:* "Klasifikasikan kalimat ini apakah positif atau negatif: 'Layanan restoran ini sangat lambat, tapi makanannya enak.'"
*   *Penggunaan:* Bagus untuk tugas sederhana dan umum.

#### 2. Few-Shot Prompting (Dengan Contoh)
Kita memberikan beberapa pola contoh input-output terlebih dahulu sebelum meminta jawaban atas data baru.
*   *Contoh:*
    *   *Input:* "Mobil rusak" -> *Output:* "OTOMOTIF"
    *   *Input:* "Inflasi naik" -> *Output:* "EKONOMI"
    *   *Input:* "Pembedahan jantung" -> *Output:* "MEDIS"
    *   *Input:* "Sistem operasi komputer baru" -> *Output:* [AI Menjawab: "TEKNOLOGI"]
*   *Penggunaan:* Sangat efektif agar AI mengikuti format atau gaya bahasa tertentu secara konsisten.

#### 3. Chain-of-Thought (CoT - Penalaran Berantai)
Kita meminta AI untuk "berpikir selangkah demi selangkah" sebelum memberikan jawaban akhir.
*   *Contoh:* "Jika saya punya 5 apel, memakan 2, dan membeli lagi 4, berapa sisa apel saya? Berpikirlah selangkah demi selangkah."
*   *Penggunaan:* Mengaktifkan kemampuan penalaran mendalam pada model LLM untuk soal matematika, logika, atau koding rumit.`,
          deepDive: `### 🔬 Di Balik Layar: Perhatian Multi-Kepala (Multi-Head Attention) & Probabilitas Kata
Bagaimana model kecerdasan buatan memproses prompt Anda secara teknis? Semuanya berkat arsitektur **Transformer** yang diperkenalkan Google pada tahun 2017.

#### 🔑 Konsep Kunci: Self-Attention
Saat Anda memasukkan kalimat, model tidak membaca kata demi kata dari kiri ke kanan seperti manusia biasa. Model memproses semua kata sekaligus dan mengukur hubungan (*attention weights*) antar kata tersebut.

Misalnya, perhatikan dua kalimat berikut:
1.  "Bank Indonesia menurunkan suku bunga untuk menahan inflasi."
2.  "Saya duduk santai memandangi aliran sungai di pinggir bank." (Dalam bahasa Inggris, *bank* berarti tepian sungai).

Bagaimana AI tahu kata "bank" di kalimat pertama merujuk pada lembaga keuangan, sedangkan di kalimat kedua merujuk pada alam geografis?
*   Melalui mekanisme **Attention**, kata "bank" pada kalimat 1 akan ditarik kuat oleh kata "suku bunga" dan "inflasi".
*   Kata "bank" pada kalimat 2 ditarik kuat oleh kata "sungai" dan "duduk santai".
*   Hal ini menghasilkan representasi vektor kata (*embedding*) yang dinamis berdasarkan konteksnya.

---

#### 🛠️ PROYEK MINI: Membuat Template Prompt Berstruktur
Cobalah salin struktur prompt profesional ini dan gunakan saat Anda berinteraksi dengan AI di masa mendatang. Template ini menggunakan formula **R-T-C (Role, Task, Constraint)**:

\`\`\`text
[ROLE] Bertindaklah sebagai penasihat keuangan bisnis mikro yang kritis dan berpengalaman 15 tahun.
[TASK] Analisis model bisnis kedai kopi keliling yang mengincar pasar mahasiswa dengan modal 5 juta rupiah.
[CONTEXT] Mahasiswa menyukai kopi murah, cepat, namun butuh tempat stopkontak listrik untuk mengerjakan tugas kelompok.
[CONSTRAINT] Berikan analisis dalam bentuk 3 poin kelemahan fatal model bisnis ini beserta 3 solusi kreatifnya. Hindari saran klise seperti 'promosi di media sosial'. Berpikir secara kritis.
\`\`\`

#### 📚 Referensi Akademik:
*   *Vaswani, A., et al. (2017).* "Attention Is All You Need." Makalah legendaris pencipta arsitektur Transformer yang merevolusi AI dunia.`
        },
        jembatan: [
          {
            text: "Prompting adalah studi psikologi komunikasi antar kognisi",
            targetSectorId: "kehidupan",
            targetTopicId: "psikologi_belajar",
            bridgeReason: "Menyusun prompt yang efektif membutuhkan pemahaman mendalam tentang bagaimana instruksi, bias bahasa, dan pemecahan masalah bertahap (kognisi) berjalan pada agen berpikir."
          }
        ],
        quiz: [
          {
            question: "Teknik memandu AI dengan memberikan beberapa pasang contoh input-output sebelum meminta jawaban sesungguhnya disebut...",
            options: [
              "Zero-Shot Prompting",
              "Few-Shot Prompting",
              "Chain-of-Thought Prompting",
              "Recursive Prompting"
            ],
            correctIndex: 1,
            explanation: "Few-Shot prompting ditandai dengan penyediaan beberapa contoh (shots) di dalam teks prompt untuk membentuk pola respons yang diinginkan."
          },
          {
            question: "Mekanisme apa pada arsitektur AI Transformer yang mendeteksi hubungan makna antar kata berdasarkan konteks sekitarnya?",
            options: [
              "Kompilasi Biner",
              "Self-Attention Mechanism",
              "Linear Regression",
              "HTML Renderer"
            ],
            correctIndex: 1,
            explanation: "Self-Attention Mechanism mengukur relevansi dan keterkaitan kata satu dengan kata lainnya secara dinamis dalam satu konteks kalimat."
          },
          {
            question: "Mengapa instruksi 'berpikirlah selangkah demi selangkah' (Chain of Thought) sangat ampuh meningkatkan akurasi jawaban logika AI?",
            options: [
              "Karena membuat AI berjalan lebih cepat",
              "Karena memaksa model menguraikan langkah-langkah perhitungan antara sebelum menarik kesimpulan probabilitas akhir, mengurangi kemungkinan lompatan logika yang keliru",
              "Karena AI membutuhkan waktu istirahat sejenak",
              "Karena instruksi tersebut menghapus data sampah di database bank"
            ],
            correctIndex: 1,
            explanation: "Chain of Thought memaksa LLM menggenerasikan teks penalaran antara secara eksplisit. Hal ini mengarahkan kalkulasi probabilitas kata berikutnya pada jalur logika matematika yang runut."
          }
        ]
      }
    ]
  },
  {
    id: "ekonomi",
    name: "Ekonomi Makro & Mikro",
    description: "Siklus pasar finansial, kebijakan moneter negara, regulasi peredaran uang, inflasi-deflasi, dan desentralisasi ekosistem DeFi.",
    color: "#fbbf24",
    accentGlow: "rgba(251, 191, 36, 0.4)",
    icon: "TrendingUp",
    x: 700,
    y: 150,
    connectedSectorIds: ["teknologi", "ai_ml", "cara_kerja_dunia", "bisnis", "sejarah"],
    topics: [
      {
        id: "kosakata_pasar_finansial",
        title: "Kosakata Pasar: Bull, Bear, IPO, Inflasi, Deflasi",
        difficulty: "Santai",
        progress: 0,
        vocabIds: ["inflasi", "ipo", "defi"],
        content: {
          summary: `### 📈 Kamus Kilat Pasar Finansial
Dunia ekonomi penuh dengan jargon yang terdengar mengintimidasi. Mari kita sederhanakan istilah-istilah paling penting dalam 3 menit:

#### 🐂 1. Bull vs Bear Market (Tren Pasar)
*   **Bull Market (Pasar Banteng):** Kondisi di mana harga saham atau aset pasar sedang naik kencang secara konsisten. Banteng menyerang musuhnya dengan *menanduk ke atas*.
*   **Bear Market (Pasar Beruang):** Kondisi di mana pasar lesu dan harga-harga berjatuhan secara drastis. Beruang menyerang mangsanya dengan *mencakar ke bawah*.

#### 🏢 2. IPO (Initial Public Offering)
Momen ketika sebuah perusahaan tertutup (milik keluarga/pendiri) memutuskan untuk **Go Public**—menjual sebagian sahamnya di bursa efek agar bisa dibeli oleh masyarakat luas demi mendapatkan modal ekspansi masif.

#### 💸 3. Inflasi vs Deflasi (Daya Beli Uang)
*   **Inflasi:** Harga barang naik terus-menerus. Uang Anda kehilangan nilainya (Contoh: Dulu Rp10.000 dapat semangkuk bakso lengkap, sekarang hanya dapat kuahnya saja).
*   **Deflasi:** Harga barang menurun drastis karena tidak ada orang yang mau belanja. Terdengar bagus? Tidak, deflasi parah bisa memicu kebangkrutan massal karena produsen merugi dan mem-PHK karyawan.`,
          caseStudy: `### 🏛️ Studi Kasus: Krisis Hyperinflasi Zimbabwe & Kebijakan Suku Bunga Bank Sentral
Bagaimana inflasi yang tidak terkendali dapat menghancurkan peradaban? Perhatikan sejarah tragis **Zimbabwe pada tahun 2008**.

#### 🚨 Tragedi Cetak Uang Berlebih
Pemerintah Zimbabwe mengalami kemunduran ekonomi namun terus mencetak uang kertas dalam jumlah masif untuk melunasi utang. Akibatnya, nilai mata uang lokal hancur total:
*   Masyarakat harus membawa sekeranjang penuh uang kertas hanya untuk membeli sepotong roti.
*   Puncaknya, bank mengeluarkan lembaran uang kertas bernominal **100 Triliun Dolar Zimbabwe** yang nilainya bahkan tidak cukup untuk membeli tiket bus.

#### 🛡️ Bagaimana Bank Sentral Mengendalikannya?
Dalam ekonomi normal, untuk meredam inflasi yang memanas, Bank Sentral (seperti Federal Reserve di AS atau Bank Indonesia) akan **menaikkan suku bunga acuan**:
1.  **Suku Bunga Naik:** Pinjaman bank menjadi mahal (bunga kredit rumah/mobil naik). Konsumen dan korporasi menunda utang dan belanja.
2.  **Menabung Lebih Menarik:** Bunga deposito tabungan naik, masyarakat memilih menyimpan uang di bank daripada membelanjakannya.
3.  **Hasil Akhir:** Jumlah uang beredar di masyarakat menurun, permintaan barang melambat, dan kenaikan harga (inflasi) berhasil dijinakkan kembali ke level aman (biasanya sekitar 2-3% per tahun).`,
          deepDive: `### 🔬 Teori Moneter: Kuantitas Uang (MV = PT) & Mekanisme DeFi
Untuk memahami perputaran ekonomi secara ilmiah, para ekonom menggunakan formula klasik **Persamaan Kuantitas Uang** oleh Irving Fisher:

$$M \times V = P \times T$$

*   **M (Money Supply):** Jumlah uang beredar di masyarakat.
*   **V (Velocity of Money):** Kecepatan perputaran uang (seberapa sering satu lembar uang berpindah tangan dalam setahun).
*   **P (Price Level):** Tingkat harga rata-rata barang dan jasa.
*   **T (Transactions):** Volume total transaksi riil dalam perekonomian.

Jika bank sentral melipatgandakan jumlah cetakan uang ($M$ naik) sementara jumlah barang yang diproduksi ($T$) tetap konstan, maka satu-satunya variabel yang dipaksa ikut melonjak tinggi adalah tingkat harga ($P$ naik)—inilah pemicu ilmiah terjadinya **Inflasi**.

---

#### 🛠️ PROYEK MINI: Menghitung Kerugian Riil Akibat Dampak Inflasi (Daya Beli)
Kalkulasikan daya beli tabungan Anda di masa depan dengan rumus matematika inflasi tahunan majemuk:

$$FV = \frac{PV}{(1 + r)^n}$$

*   $FV$: Nilai Masa Depan (Future Value) dalam hal daya beli riil.
*   $PV$: Nilai Sekarang (Present Value) tabungan Anda (Contoh: Rp100.000.000).
*   $r$: Estimasi tingkat inflasi tahunan rata-rata (misalkan 4% atau 0.04).
*   $n$: Jumlah tahun ke depan (misalkan 10 tahun).

Mari kita hitung menggunakan kode JavaScript sederhana untuk melihat daya beli uang 100 juta Anda setelah 10 tahun tergerus inflasi 4% per tahun:

\`\`\`javascript
const pv = 100000000; // 100 Juta Rupiah
const r = 0.04; // Inflasi 4% per tahun
const n = 10; // 10 tahun

const fv = pv / Math.pow((1 + r), n);

console.log("=== HITUNG PENYUSUTAN DAYA BELI INFLASI ===");
console.log("Uang nominal di rekening:", pv.toLocaleString('id-ID'));
console.log("Daya beli riil setara nilai sekarang setelah 10 tahun:", Math.round(fv).toLocaleString('id-ID'));
console.log("Nilai kekayaan Anda yang 'menguap' tak terlihat:", Math.round(pv - fv).toLocaleString('id-ID'));
\`\`\`

#### 📚 Referensi Akademik:
*   *Fisher, I. (1911).* "The Purchasing Power of Money." Fondasi utama teori ekonomi moneter klasik.`
        },
        jembatan: [
          {
            text: "Suku bunga dikontrol oleh sistem Bank Sentral",
            targetSectorId: "cara_kerja_dunia",
            targetTopicId: "cara_kerja_bank",
            bridgeReason: "Bank sentral bukan sekadar badan ekonomi, melainkan simpul jaringan institusional (Cara Kerja Dunia) yang mengendalikan aliran darah finansial global melalui pipa transmisi perbankan."
          }
        ],
        quiz: [
          {
            question: "Apa arti istilah 'Bear Market' di pasar saham?",
            options: [
              "Pasar di mana harga-harga aset meroket sangat cepat",
              "Kondisi pasar lesu di mana harga-harga cenderung jatuh secara berkala",
              "Pasar yang menjual hewan beruang secara legal",
              "Mekanisme peluncuran koin kripto baru"
            ],
            correctIndex: 1,
            explanation: "Bear Market dianalogikan dengan beruang mencakar ke bawah, menandakan pasar sedang mengalami tren penurunan harga secara signifikan."
          },
          {
            question: "Mengapa Hyperinflasi dahsyat bisa terjadi di Zimbabwe pada 2008?",
            options: [
              "Karena mereka kehabisan kertas untuk mencetak peta",
              "Karena pemerintah mencetak mata uang berlebih melampaui produktivitas barang riil di ekosistem pasar",
              "Karena bank ditutup oleh serangan hacker dari luar negeri",
              "Karena masyarakat menolak menggunakan internet"
            ],
            correctIndex: 1,
            explanation: "Merujuk persamaan MV=PT, peningkatan masif jumlah uang beredar (M) tanpa diimbangi peningkatan kapasitas produksi transaksi riil (T) menyebabkan naiknya harga barang (P) secara ekstrem."
          },
          {
            question: "Kebijakan apa yang biasa ditempuh Bank Sentral untuk menstabilkan perekonomian jika inflasi melonjak terlalu tinggi?",
            options: [
              "Menurunkan suku bunga serendah mungkin",
              "Menaikkan suku bunga acuan untuk menekan konsumsi dan menarik uang beredar kembali ke dalam tabungan bank",
              "Mencetak uang baru dalam jumlah dua kali lipat lebih banyak",
              "Melarang masyarakat melakukan penawaran saham (IPO)"
            ],
            correctIndex: 1,
            explanation: "Menaikkan suku bunga membuat biaya meminjam uang menjadi mahal dan menabung lebih menguntungkan, sehingga meredam perputaran belanja masyarakat dan menstabilkan inflasi."
          }
        ]
      }
    ]
  },
  {
    id: "bisnis",
    name: "Bisnis & Entrepreneurship",
    description: "Model bisnis, ekosistem startup, pendanaan modal ventura, riset pasar, dan strategi growth marketing.",
    color: "#ec4899",
    accentGlow: "rgba(236, 72, 153, 0.4)",
    icon: "Briefcase",
    x: 900,
    y: 150,
    connectedSectorIds: ["ekonomi", "teknologi", "seni"],
    topics: [
      {
        id: "model_bisnis",
        title: "Model Bisnis Modern (SaaS, B2B, B2C)",
        difficulty: "Menengah",
        progress: 0,
        vocabIds: ["saas", "api"],
        content: {
          summary: `### 🏢 Bagaimana Perusahaan Mendapatkan Uang?
**Model Bisnis** adalah cetak biru tentang bagaimana sebuah bisnis menciptakan, mengantarkan, dan menangkap nilai ekonomi (menghasilkan profit).

#### 🔄 Tiga Kategori Model Bisnis Terpopuler:
1.  **B2C (Business to Consumer):** Perusahaan menjual langsung ke pengguna akhir. (Contoh: Netflix menjual langganan film ke Anda; Tokopedia menjual barang ke konsumen e-commerce).
2.  **B2B (Business to Business):** Perusahaan menjual produk/jasa ke perusahaan lain. Nilai transaksinya biasa sangat besar dengan kontrak jangka panjang. (Contoh: Slack menjual ruang obrolan kerja ke kantor-kantor; Oracle menjual database ke bank).
3.  **SaaS (Software as a Service):** Distribusi perangkat lunak lewat cloud dengan sistem berlangganan (subskripsi) bulanan atau tahunan. (Contoh: Figma, Canva, Adobe Creative Cloud).`,
          caseStudy: `### 💡 Studi Kasus: Transformasi Bisnis Adobe dari Lisensi Sekali Bayar ke SaaS Berlangganan
Sebelum tahun 2013, Adobe menjual software kreatif (Photoshop, Illustrator) menggunakan metode **Lisensi Perpetual** (sekali beli). Pengguna harus membayar sekitar $1.000 hingga $2.500 untuk membeli CD-installer fisik.

#### 🚨 Masalah Model Lama:
*   **Biaya Awal Sangat Mahal:** Mahasiswa atau desainer pemula tidak mampu membelinya, memicu tingginya pembajakan software.
*   **Pendapatan Fluktuatif:** Pendapatan Adobe naik tajam hanya saat meluncurkan versi baru (misal CS5 ke CS6), lalu merosot drastis selama tahun-tahun pengembangan produk berikutnya.

#### 🚀 Solusi SaaS: Adobe Creative Cloud (2013)
Adobe menghentikan penjualan CD fisik dan meluncurkan Creative Cloud dengan biaya langganan bulanan terjangkau (sekitar $20-$50 per bulan).
*   **Hasil Finansial:** Pendapatan Adobe melonjak tinggi dan menjadi sangat stabil (*Recurring Revenue*). Valuasi saham Adobe naik lebih dari 1.000% dalam dekade berikutnya karena investor menyukai model bisnis berlangganan yang dapat diprediksi secara matematis.`,
          deepDive: `### 🔬 Metrik Vital Evaluasi Startup SaaS (LTV, CAC, Churn)
Dalam mengoperasikan model bisnis digital SaaS, ada tiga metrik suci yang wajib dihitung dengan sangat presisi untuk menentukan sehat tidaknya kesehatan keuangan startup:

#### 1. CAC (Customer Acquisition Cost)
Biaya total pemasaran dan penjualan untuk mendapatkan satu pelanggan baru.

$$CAC = \frac{\text{Biaya Pemasaran + Biaya Sales}}{\text{Jumlah Pelanggan Baru Terakuisisi}}$$

#### 2. LTV (Customer Lifetime Value)
Total estimasi pendapatan kotor yang akan dihasilkan oleh seorang pelanggan selama mereka berlangganan produk Anda.

#### 3. Churn Rate
Persentase pelanggan yang berhenti berlangganan dalam periode waktu tertentu.

$$\text{Churn Rate} = \frac{\text{Pelanggan Hilang di Akhir Periode}}{\text{Pelanggan Aktif di Awal Periode}} \times 100\%$$

*   **Rasio Emas Bisnis:** Startup yang sehat secara finansial **WAJIB** memiliki rasio $LTV : CAC > 3x$. Artinya, nilai ekonomi yang diberikan satu pelanggan harus minimal tiga kali lebih tinggi dari biaya yang dikeluarkan untuk membujuk mereka masuk membeli produk.

---

#### 🛠️ PROYEK MINI: Menghitung Kelayakan Ekonomi Startup SaaS
Gunakan kode JavaScript ini untuk mengevaluasi apakah simulasi keuangan startup SaaS Anda layak didanai Venture Capital berdasarkan rasio LTV:CAC dan tingkat Churn bulanan:

\`\`\`javascript
const monthlyFee = 150000; // Harga langganan bulanan Rp150.000
const monthlyChurnRate = 0.05; // 5% Churn Rate bulanan
const marketingSpend = 50000000; // Pengeluaran iklan bulanan Rp50 Juta
const usersAcquired = 1000; // Mendapatkan 1.000 user baru dari iklan

// Menghitung CAC
const cac = marketingSpend / usersAcquired;

// Menghitung LTV (Formula Sederhana: Biaya Bulanan / Churn Rate)
const ltv = monthlyFee / monthlyChurnRate;

// Rasio LTV to CAC
const ratio = ltv / cac;

console.log("=== EVALUASI STARTUP SAAS ===");
console.log("Customer Acquisition Cost (CAC): Rp", cac.toLocaleString('id-ID'));
console.log("Customer Lifetime Value (LTV): Rp", ltv.toLocaleString('id-ID'));
console.log("Rasio LTV : CAC:", ratio.toFixed(2) + "x");
console.log("Keputusan Kelayakan Bisnis:", ratio > 3 ? "LAYAK INVESTASI (Sangat Efisien)" : "TIDAK LAYAK (Iklan Terlalu Boros/Churn Tinggi)");
\`\`\`

#### 📚 Referensi Akademik:
*   *Skok, D. (2010).* "SaaS Metrics 2.0 - A Guide to Measuring and Improving what Matters." Panduan industri paling komprehensif bagi metrik startup cloud.`
        },
        jembatan: [
          {
            text: "Bisnis SaaS mengandalkan arsitektur cloud computing",
            targetSectorId: "teknologi",
            targetTopicId: "apa_itu_api",
            bridgeReason: "Model subskripsi SaaS membutuhkan tulang punggung teknologi API dan komputasi awan (Cloud) agar pengguna dapat menyewa kapasitas software jarak jauh tanpa perlu memiliki infrastruktur fisik lokal."
          }
        ],
        quiz: [
          {
            question: "Model bisnis di mana produk perangkat lunak diakses melalui cloud dengan cara membayar subskripsi berlangganan rutin disebut...",
            options: [
              "B2C",
              "SaaS (Software as a Service)",
              "B2B Hardware",
              "Lisensi Perpetual Sekali Beli"
            ],
            correctIndex: 1,
            explanation: "SaaS adalah model distribusi software di mana aplikasi di-host di server cloud dan diakses pengguna dengan skema subskripsi berlangganan."
          },
          {
            question: "Berapa rasio sehat minimal antara LTV (Lifetime Value) terhadap CAC (Customer Acquisition Cost) yang dicari investor venture capital?",
            options: [
              "Minimal 1x lipat",
              "Minimal 3x lipat",
              "Maksimal 0.5x lipat",
              "Tepat 100x lipat"
            ],
            correctIndex: 1,
            explanation: "Startup yang sehat disarankan memiliki rasio LTV:CAC di atas 3x, yang menandakan pengembalian dari retensi pengguna jauh melampaui biaya akuisisi pemasarannya."
          },
          {
            question: "Apa dampak transformatif yang dirasakan Adobe saat beralih dari model Lisensi Perpetual ke SaaS?",
            options: [
              "Pendapatan Adobe menjadi tidak terduga dan pembajakan meningkat",
              "Arus pendapatan bulanan menjadi stabil (recurring revenue), biaya awal pengguna berkurang, dan valuasi korporasi melonjak drastis",
              "Adobe bangkrut karena tidak ada yang mau menyewa software",
              "Adobe berhenti mengembangkan produk Photoshop"
            ],
            correctIndex: 1,
            explanation: "Model SaaS memberikan kestabilan keuangan berulang (recurring revenue) yang disukai investor dan membuat produk lebih ramah di kantong konsumen baru lewat cicilan subskripsi murah."
          }
        ]
      }
    ]
  },
  {
    id: "cara_kerja_dunia",
    name: "Cara Kerja Dunia (Systems)",
    description: "Sistem-sistem fundamental yang menggerakkan kehidupan harian: internet, sirkulasi perbankan, energi listrik, dan hukum.",
    color: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.4)",
    icon: "Network",
    x: 550,
    y: 320,
    connectedSectorIds: ["teknologi", "ekonomi", "sains", "sejarah"],
    topics: [
      {
        id: "cara_kerja_internet",
        title: "Cara Kerja Internet (Kabel Bawah Laut, DNS, Server)",
        difficulty: "Santai",
        progress: 0,
        vocabIds: ["dns", "api"],
        content: {
          summary: `### 🌐 Fisika di Balik Klik: Bagaimana Internet Bekerja?
Banyak orang mengira internet adalah entitas gaib di awan (cloud) yang ditransmisikan lewat satelit luar angkasa secara nirkabel. Faktanya, **99% lalu lintas internet global dialirkan lewat kabel fisik tebal yang membentang di dasar samudra**.

Saat Anda mengetik \`google.com\` di ponsel Anda:
1.  **Sinyal WiFi/Seluler:** Mengirim pulsa radio ke menara BTS terdekat.
2.  **Kabel Fiber Optik Darat:** BTS menyalurkannya ke kabel serat optik daratan menuju Pusat Data nasional.
3.  **Kabel Bawah Laut:** Sinyal melesat secepat kecepatan cahaya melintasi dasar lautan antar benua menuju server pusat Google di Amerika Serikat.
4.  **Respons Cepat:** Server mengirimkan paket data gambar dan teks kembali ke jalur yang sama dalam hitungan milidetik.`,
          caseStudy: `### 📡 Studi Kasus: Menjelajahi Peran Vital DNS (Buku Telepon Raksasa Internet)
Komputer sebenarnya tidak tahu apa itu "google.com" atau "instagram.com". Mereka adalah mesin yang berkomunikasi murni menggunakan angka unik yang disebut **IP Address** (seperti \`142.250.190.46\`).

#### 🗺️ Proses Kerja DNS (Domain Name System):
*   Menghafal IP Address angka sangat mustahil bagi manusia. Karena itu kita memakai nama domain seperti \`wikipedia.org\`.
*   Saat Anda mengakses domain, browser Anda akan menghubungi **DNS Resolver** terlebih dahulu.
*   DNS bertindak seperti buku alamat telepon raksasa yang mencocokkan nama "wikipedia.org" dengan IP asli \`198.35.26.96\`.
*   Setelah mendapatkan alamat IP tersebut, barulah browser Anda melesat mengirimkan paket data ke alamat tujuan yang tepat.
*   **Bencana DNS Terbesar (Contoh: Facebook Down 2021):** Pada tahun 2021, Facebook, Instagram, dan WhatsApp lenyap dari jagat internet selama 6 jam bukan karena servernya terbakar, melainkan karena kesalahan konfigurasi protokol rute (BGP) yang menghapus "buku petunjuk arah" DNS mereka. Internet global lupa bagaimana cara mencari alamat IP server Facebook!`,
          deepDive: `### 🔬 Anatomi Protokol Internet: TCP/IP & Enkripsi Kriptografi TLS/HTTPS
Ketika data berjalan melintasi kabel samudra, data tersebut tidak dikirim dalam satu file utuh raksasa. File tersebut dipecah-pecah menjadi potongan-potongan mikroskopis yang disebut **Paket Data**.

#### 📦 Paketisasi Data dengan TCP/IP:
1.  **IP (Internet Protocol):** Bertugas membubuhkan alamat "Pengirim" dan "Penerima" pada amplop setiap paket data.
2.  **TCP (Transmission Control Protocol):** Bertugas memastikan semua paket data sampai dengan selamat tanpa ada yang rusak di tengah jalan. TCP mengurutkan kembali pecahan paket di sisi penerima. Jika ada 1 paket kecil yang hilang terkena gangguan kabel bawah laut, TCP akan meminta server mengirim ulang paket yang hilang itu saja.

#### 🔐 Keamanan Jalur dengan HTTPS (TLS Handshake):
Agar data kartu kredit atau password Anda tidak disadap oleh hacker di tengah lautan, kita memakai enkripsi HTTPS (SSL/TLS):
*   Browser dan Server melakukan "jabat tangan raksasa" secara kriptografi di awal koneksi.
*   Mereka bertukar kunci publik matematis guna merumuskan kunci enkripsi simetris rahasia yang hanya bisa dibaca oleh perangkat Anda dan server tujuan. Semua pihak di tengah jalan hanya akan melihat teks acak yang mustahil didekripsi.

---

#### 🛠️ PROYEK MINI: Melacak Rute Paket Data Riil (Traceroute)
Mari kita lacak secara riil rute fisik perjalanan data Anda melompat dari router rumah Anda hingga ke server tujuan.
*   *Bagi Pengguna Windows:* Buka Command Prompt (cmd), ketik \`tracert google.com\` dan tekan Enter.
*   *Bagi Pengguna Mac/Linux:* Buka Terminal, ketik \`traceroute google.com\` dan tekan Enter.

Anda akan melihat daftar "Hop" (lompatan) router beserta waktu respon dalam milidetik (ms). Anda sedang menyaksikan bukti fisik bahwa internet adalah rangkaian simpul fisik yang menyambung di dunia nyata!

#### 📚 Referensi Akademik:
*   *Cerf, V. G., & Kahn, R. E. (1974).* "A Protocol for Packet Network Intercommunication." Makalah ilmiah kelahiran protokol TCP/IP.`
        },
        jembatan: [
          {
            text: "Kabel fiber optik internet didasarkan pada fisika cahaya",
            targetSectorId: "sains",
            targetTopicId: "sains_dasar",
            bridgeReason: "Sinyal internet fiber optik mentransmisikan data digital berkecepatan cahaya di dasar laut menggunakan prinsip fisika optik: pemantulan internal sempurna cahaya di dalam tabung kaca tipis."
          }
        ],
        quiz: [
          {
            question: "Bagaimana mayoritas (99%) lalu lintas data internet global ditransmisikan antar benua?",
            options: [
              "Melalui gelombang nirkabel satelit luar angkasa",
              "Melalui jaringan fisik kabel serat optik tebal yang membentang di dasar samudra lautan",
              "Menggunakan pemancar udara balon Google Loon",
              "Melalui kabel listrik PLN tegangan tinggi"
            ],
            correctIndex: 1,
            explanation: "Meskipun kita mengakses internet nirkabel di smartphone, tulang punggung koneksi global antar benua bergantung sepenuhnya pada jaringan fisik kabel serat optik di dasar samudra."
          },
          {
            question: "Apa fungsi utama dari DNS (Domain Name System) di internet?",
            options: [
              "Menghapus virus di komputer secara otomatis",
              "Menerjemahkan nama domain yang mudah dibaca manusia menjadi alamat IP numerik yang dipahami mesin",
              "Mempercepat pengisian daya baterai ponsel",
              "Mengubah koneksi internet menjadi gratis"
            ],
            correctIndex: 1,
            explanation: "DNS bertindak seperti buku telepon raksasa yang menerjemahkan nama situs teks seperti google.com menjadi alamat IP numerik biner agar browser tahu ke mana harus mengarah."
          },
          {
            question: "Protokol apa yang bertugas menjamin semua pecahan paket data internet terkirim utuh tanpa ada yang hilang atau rusak?",
            options: [
              "HTML",
              "TCP (Transmission Control Protocol)",
              "Python Interpreter",
              "CSS Media Queries"
            ],
            correctIndex: 1,
            explanation: "TCP mengatur pemecahan file menjadi paket kecil, penomoran urutan, pendeteksian eror, dan permintaan pengiriman ulang jika ada paket yang hilang di perjalanan."
          }
        ]
      }
    ]
  },
  {
    id: "sains",
    name: "Sains & Alam",
    description: "Hukum fisika alam semesta, mekanika kuantum, kode genetika biologi, material kimiawi, dan astrofisika ruang angkasa.",
    color: "#22c55e",
    accentGlow: "rgba(34, 197, 94, 0.4)",
    icon: "Atom",
    x: 150,
    y: 480,
    connectedSectorIds: ["teknologi", "ai_ml", "cara_kerja_dunia", "filsafat"],
    topics: [
      {
        id: "sains_dasar",
        title: "Fisika Dasar (Relativitas, Kuantum, Semikonduktor)",
        difficulty: "Serius",
        progress: 0,
        vocabIds: ["kuantum", "neural_networks"],
        content: {
          summary: `### ⚛️ Dua Pilar Fisika Modern
Fisika alam semesta kita terbelah menjadi dua pilar agung yang tampak bertentangan namun mengagumkan:

#### 🌌 1. Teori Relativitas Umum (Albert Einstein)
Mempelajari objek skala masif (bintang, galaksi, gravitasi). Einstein membuktikan bahwa ruang dan waktu tidak statis; mereka adalah satu kesatuan kain jaring fleksibel yang bisa **melengkung** akibat massa benda berat (seperti matahari melengkungkan kain ruang-waktu sehingga bumi mengorbit meluncur di lengkungan tersebut).

#### 🔬 2. Mekanika Kuantum (Max Planck, Schrödinger)
Mempelajari objek skala sangat mikro (atom, elektron, foton). Di tingkat subatomik, hukum fisika biasa runtuh. Elektron bisa berada di dua tempat sekaligus (**Superposisi**) dan saling terhubung instan lintas jarak kosmik (**Quantum Entanglement**).`,
          caseStudy: `### 💾 Studi Kasus: Semikonduktor (Bagaimana Fisika Kuantum Menciptakan Silikon Chip HP Anda)
Tanpa penemuan mekanika kuantum pada awal abad ke-20, seluruh komputer, ponsel pintar, dan pusat data AI modern **tidak akan pernah ada**. Kita akan tetap terjebak di era tabung hampa udara raksasa yang lambat.

#### 🎛️ Transistor & Efek Terowongan Kuantum (Quantum Tunneling):
*   **Semikonduktor** adalah bahan (seperti Silikon) yang bisa diatur perilakunya: kadang menghantarkan listrik (konduktor), kadang menolak listrik (isolator).
*   Kita menyusun material ini menjadi **Transistor**—sakelar listrik mikroskopis yang merepresentasikan biner \`1\` (ON) dan \`0\` (OFF).
*   Saat ini, ukuran satu transistor di dalam chip smartphone Anda sangat kecil, hanya berukuran **3 nanometer** (setara ketebalan beberapa atom!).
*   Pada ukuran seekstrem ini, elektron mulai melakukan kenakalan kuantum: mereka bisa menembus penghalang fisik padat begitu saja karena sifat dualisme gelombang-partikel (*Quantum Tunneling*). Para insinyur chip tercerdas di dunia harus menggunakan persamaan kuantum tingkat lanjut guna mengendalikan kenakalan partikel ini agar kode biner data Anda tidak rusak!`,
          deepDive: `### 🔬 Persamaan Gelombang Schrödinger & Masa Depan Komputasi Kuantum
Dalam mekanika kuantum, kita tidak bisa menentukan posisi pasti elektron dengan akurasi mutlak. Kita hanya bisa memprediksi probabilitas di mana elektron berada menggunakan **Persamaan Gelombang Schrödinger**:

$$i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)$$

*   $\Psi$ (Psi): Mewakili fungsi gelombang probabilitas keadaan partikel.
*   Keadaan ini runtuh menjadi satu kepastian fisik konkrit hanya ketika manusia melakukan pengukuran/observasi langsung.

---

#### 🚀 Komputasi Kuantum: Lompatan Komputasi Eksponensial
Komputer biasa memproses data lewat **Bit** yang bernilai statis \`0\` atau \`1\`. Komputer Kuantum menggunakan **Qubit** (Quantum Bit) yang memanfaatkan fenomena superposisi sehingga bisa bernilai \`0\`, \`1\`, atau **keduanya secara bersamaan**.

Hal ini memungkinkan komputer kuantum menyelesaikan perhitungan kompleks (seperti enkripsi keamanan kriptografi, pemodelan molekul obat baru, dan optimasi logistik global) dalam hitungan detik—tugas yang membutuhkan waktu ribuan tahun bagi superkomputer klasik tercanggih sekalipun.

---

#### 🛠️ PROYEK MINI: Memahami Superposisi Koin Sederhana
Lakukan eksperimen mental sederhana ini untuk merasakan analogi Superposisi Kuantum:
1.  Ambil sebuah koin logam biasa. Di atas meja, koin bernilai statis: angka (0) atau gambar (1). Ini adalah **Bit Klasik**.
2.  Sekarang, **putar koin tersebut dengan kencang** di atas meja.
3.  Selagi koin berputar cepat, apakah koin tersebut bernilai angka atau gambar? Jawabannya adalah: **koin berada dalam superposisi dari kedua keadaan tersebut sekaligus**. Koin mewakili **Qubit**.
4.  Hentikan putaran koin dengan telapak tangan Anda (melakukan tindakan "Observasi/Pengukuran"). Keadaan superposisi runtuh seketika, memaksa koin memilih satu nilai konkrit: angka saja atau gambar saja.

#### 📚 Referensi Akademik:
*   *Schrödinger, E. (1926).* "An Undulatory Theory of the Mechanics of Atoms and Molecules." Jurnal pengenalan mekanika kuantum.`
        },
        jembatan: [
          {
            text: "Fisika kuantum semikonduktor menciptakan silikon komputer",
            targetSectorId: "teknologi",
            targetTopicId: "apa_itu_coding",
            bridgeReason: "Komputer digital fisik dan arsitektur eksekusi kode biner hanya bisa diproduksi berkat rekayasa semikonduktor silikon berbasis teori fisika kuantum partikel."
          }
        ],
        quiz: [
          {
            question: "Fenomena di mana partikel subatomik bisa berada di beberapa keadaan/nilai sekaligus sebelum diukur oleh pengamat disebut...",
            options: [
              "Quantum Entanglement",
              "Superposisi Kuantum",
              "Relativitas Umum",
              "Mekanisme Keping Silikon"
            ],
            correctIndex: 1,
            explanation: "Superposisi kuantum menjelaskan kemampuan partikel mikroskopis mengeksistensikan berbagai kemungkinan kondisi secara serentak hingga ada interaksi pengukuran luar yang meruntuhkan fungsinya."
          },
          {
            question: "Bahan materi apa yang umumnya dipakai di dalam transistor mikroprosesor karena sifat konduktivitas listriknya bisa dikontrol dinamis?",
            options: [
              "Logam emas murni",
              "Semikonduktor (seperti Silikon)",
              "Kaca transparan serat optik",
              "Minyak bumi mentah"
            ],
            correctIndex: 1,
            explanation: "Silikon adalah semikonduktor yang memungkinkannya berperan gampang diatur sebagai sakelar konduktor (ON) maupun isolator (OFF) di dalam chip sirkuit terpadu komputer."
          },
          {
            question: "Apa perbedaan paling fundamental antara Qubit pada Komputer Kuantum dengan Bit pada Komputer Klasik?",
            options: [
              "Qubit lebih besar ukuran fisiknya daripada bit",
              "Bit hanya bisa bernilai 0 atau 1 secara kaku, sedangkan Qubit memanfaatkan superposisi sehingga bisa mewakili 0 dan 1 sekaligus secara bersamaan untuk mempercepat komputasi",
              "Bit berjalan di kabel serat optik, sedangkan qubit berjalan tanpa kabel sama sekali",
              "Qubit tidak menggunakan matematika"
            ],
            correctIndex: 1,
            explanation: "Dengan memanfaatkan properti superposisi fisik, Qubit sanggup mengeksplorasi miliaran kemungkinan jalur solusi kalkulasi matematika kompleks secara simultan."
          }
        ]
      }
    ]
  },
  {
    id: "filsafat",
    name: "Filsafat & Berpikir Kritis",
    description: "Metodologi argumen formal, epistemologi ilmu, etika moral, eksistensialisme, dan kebijaksanaan hidup rasional.",
    color: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.4)",
    icon: "Compass",
    x: 420,
    y: 480,
    connectedSectorIds: ["teknologi", "ai_ml", "sains", "kehidupan"],
    topics: [
      {
        id: "logika_argumentasi",
        title: "Logika & Argumentasi (Logical Fallacies / Cacat Berpikir)",
        difficulty: "Santai",
        progress: 0,
        vocabIds: ["logical_fallacy", "psikologi_kognitif"],
        content: {
          summary: `### 🧠 Senjata Berpikir Kritis: Menghindari Logical Fallacy
**Filsafat** bukanlah sekadar merenung di bawah pohon. Filsafat adalah disiplin ilmiah yang mengajarkan kita **bagaimana cara berpikir secara benar, jernih, dan kokoh**.

Inti dari berpikir kritis adalah mendeteksi **Logical Fallacy (Kesesatan Berpikir)**—cacat dalam penalaran yang sering dipakai politisi, pembuat iklan, atau netizen di media sosial untuk memenangkan argumen secara manipulatif.

#### 🚨 3 Cacat Berpikir Paling Populer:
1.  **Ad Hominem (Menyerang Pribadi):** Menolak argumen seseorang dengan cara menyerang fisik, latar belakang, atau karakter pribadi mereka, bukan mendebat isi argumennya.
2.  **Strawman (Argumen Manusia Jerami):** Memelintir argumen lawan menjadi sangat ekstrem atau konyol agar mudah Anda serang balik.
3.  **Slippery Slope (Efek Domino Berlebih):** Mengklaim bahwa satu langkah kecil tanpa bukti akan memicu bencana domino raksasa yang mengerikan di masa depan.`,
          caseStudy: `### 🗣️ Studi Kasus: Deteksi Manipulasi Argumen di Ruang Publik & Media Sosial
Mari kita analisis bagaimana cacat berpikir digunakan untuk membelokkan opini publik dalam diskusi tentang teknologi kecerdasan buatan:

#### 👥 Contoh Percakapan Manipulatif:
*   **Andi (Argumen Rasional):** *"Kita perlu membuat undang-undang regulasi yang membatasi hak cipta penggunaan data seniman lokal oleh model AI."*
*   **Budi (Cacat Berpikir - Strawman):** *"Oh, jadi Andi ingin melarang seluruh teknologi kecerdasan buatan berkembang di negara kita dan membuat kita terbelakang dari negara barat?"*

#### 🔍 Analisis Kritis:
Budi tidak menjawab argumen regulasi hak cipta milik Andi. Budi justru membuat "manusia jerami" (klaim ekstrem bohong bahwa Andi ingin melarang seluruh teknologi AI), lalu membakar/menyerang klaim bohong buatannya sendiri agar penonton diskusi mengira Andi adalah sosok anti-kemajuan yang bodoh.

Dengan memahami filsafat logika, Anda dilatih mendeteksi trik retorika murahan ini secara instan, membuat keputusan finansial, karir, dan politik Anda terhindar dari penipuan manipulasi opini.`,
          deepDive: `### 🔬 Silogisme Kategoris, Validitas vs Kebenaran, & Epistemologi Formal
Dalam filsafat logika formal, kita memisahkan konsep **Validitas Struktur** dengan **Kebenaran Isi**. Argumen bisa saja sangat valid secara struktur, namun salah secara kebenaran faktual jika asumsi dasarnya keliru.

#### 📐 Contoh Struktur Logika Valid tapi Salah secara Faktual:
1.  *Premis Mayor (Salah):* Semua anjing bisa terbang.
2.  *Premis Minor (Benar):* Golden Retriever adalah anjing.
3.  *Konklusi (Salah):* Golden Retriever bisa terbang.

Struktur silogisme di atas **100% Valid** secara matematis (Jika $A=B$ dan $B=C$, maka $A=C$). Namun kesimpulannya salah karena Premis Mayor bertentangan dengan kebenaran ilmiah dunia nyata.

---

#### 🛠️ PROYEK MINI: Menulis Argumen Bebas Cacat Logika (Formula Premis-Konklusi)
Susunlah sebuah tulisan pendek argumen persuasif tentang pentingnya privasi data digital Anda di internet menggunakan formula logika deduktif formal:

1.  *Premis Mayor (Asumsi Umum yang Teruji):* Semua entitas yang memiliki akses ke data finansial pribadi tanpa pengawasan berpotensi menyalahgunakannya demi keuntungan sepihak.
2.  *Premis Minor (Fakta Spesifik):* Aplikasi pinjaman online ilegal mengumpulkan seluruh log panggilan ponsel nasabah tanpa regulasi pengawasan pemerintah.
3.  *Konklusi (Kesimpulan Logis):* Oleh karena itu, aplikasi pinjaman online ilegal berpotensi menyalahgunakan log panggilan ponsel nasabah demi keuntungan sepihak.

Latihlah pola menulis berstruktur deduktif ini dalam esai, email kerja, atau negosiasi bisnis harian untuk menghasilkan daya persuasi yang tidak tergoyahkan oleh argumen lawan.

#### 📚 Referensi Akademik:
*   *Aristotle.* "Prior Analytics." Tulisan klasik yang mendirikan studi formal silogisme deduktif.`
        },
        jembatan: [
          {
            text: "Cacat berpikir merusak bias analisis keputusan hidup",
            targetSectorId: "kehidupan",
            targetTopicId: "psikologi_belajar",
            bridgeReason: "Logical Fallacy adalah cacat di tingkat perangkat lunak berpikir kita (Filsafat) yang berinteraksi erat dengan bias kognitif sistem otak biologis kita (Psikologi Kehidupan)."
          }
        ],
        quiz: [
          {
            question: "Saat mendebat lawan, alih-alih menjawab argumennya, Anda justru mencela karakter atau latar belakang pribadinya. Cacat berpikir ini dinamakan...",
            options: [
              "Strawman Fallacy",
              "Ad Hominem",
              "Slippery Slope",
              "Circular Reasoning"
            ],
            correctIndex: 1,
            explanation: "Ad Hominem secara literal berarti 'kepada orangnya'—menyerang karakteristik personal lawan bicara alih-alih membedah keabsahan tesis argumennya."
          },
          {
            question: "Apa perbedaan antara 'Validitas' struktur argumen dan 'Kebenaran' isi argumen dalam filsafat logika?",
            options: [
              "Tidak ada perbedaan, keduanya adalah hal yang sama",
              "Validitas membahas ketepatan alur rantai penalaran deduktif, sedangkan Kebenaran membahas keselarasan isi asumsi premis dengan fakta riil di dunia nyata",
              "Validitas hanya untuk ilmu sains, kebenaran hanya untuk ilmu hukum",
              "Validitas ditentukan oleh komputer, kebenaran ditentukan oleh perasaan"
            ],
            correctIndex: 1,
            explanation: "Argumen dapat memiliki struktur runtut yang valid secara silogisme matematis, namun kesimpulannya bisa salah secara faktual apabila fondasi premis dasarnya tidak sesuai dengan realitas empiris."
          },
          {
            question: "Bagaimana cara kerja dari manipulasi argumen 'Strawman Fallacy'?",
            options: [
              "Lawan membuat argumen yang sangat panjang sehingga kita lelah membacanya",
              "Lawan memelintir argumen kita menjadi versi yang ekstrem, cacat, atau konyol agar gampang diserang dan dijatuhkan di hadapan penonton",
              "Lawan menolak berbicara sama sekali",
              "Lawan menyuap juri penilai diskusi"
            ],
            correctIndex: 1,
            explanation: "Strawman merujuk pada taktik mendirikan boneka jerami yang lemah untuk dipukul jatuh dengan mudah, membiaskan perhatian audiens dari poin esensi argumen asli kita."
          }
        ]
      }
    ]
  },
  {
    id: "sejarah",
    name: "Sejarah & Peradaban",
    description: "Evolusi sosiokultural manusia, sejarah sirkulasi uang, revolusi industri, dan perubahan tatanan global.",
    color: "#e11d48",
    accentGlow: "rgba(225, 29, 72, 0.4)",
    icon: "History",
    x: 680,
    y: 480,
    connectedSectorIds: ["ekonomi", "cara_kerja_dunia", "seni"],
    topics: [
      {
        id: "revolusi_industri",
        title: "Revolusi Industri 1.0 sampai 4.0 (dan Masa Depan AI)",
        difficulty: "Menengah",
        progress: 0,
        vocabIds: ["api", "neural_networks"],
        content: {
          summary: `### 🚂 Kilas Balik Lompatan Peradaban
Sejarah manusia ditentukan oleh gelombang lompatan produktivitas yang radikal yang kita sebut **Revolusi Industri**. Tiap gelombang melahirkan tatanan dunia baru yang tak terbayangkan sebelumnya:

1.  **Revolusi Industri 1.0 (Akhir Abad 18):** Ditemukannya **Mesin Uap**. Produksi beralih dari tenaga otot manusia dan kuda ke mekanisasi pabrik tekstil. Kereta api uap lahir menghubungkan kota-kota.
2.  **Revolusi Industri 2.0 (Awal Abad 20):** Ditemukannya **Listrik & Perakitan Massal**. Lahirnya konsep pabrik mobil raksasa Henry Ford, telepon, dan lampu pijar.
3.  **Revolusi Industri 3.0 (Akhir Abad 20):** Ditemukannya **Komputer & Internet**. Lahirnya otomatisasi sirkuit digital, email, dan integrasi data global.
4.  **Revolusi Industri 4.0 (Hari Ini):** Era **Konektivitas Cerdas (Cyber-Physical Systems)**. Integrasi Big Data, IoT, Cloud Computing, dan puncaknya adalah Kecerdasan Buatan (AI).`,
          caseStudy: `### 🎭 Studi Kasus: Ketakutan Kaum Luddite (Inggris, 1811) vs Era Kecemasan Kerja AI Hari Ini
Setiap kali teknologi revolusioner lahir, masyarakat selalu dilanda kecemasan massal akan masa depannya. Mari kita ambil contoh gerakan **Kaum Luddite** di Inggris pada tahun 1811.

#### 🔨 Pemberontakan Kaum Luddite:
*   Para penenun tekstil tradisional Inggris mendapati pekerjaan mereka digantikan oleh mesin tenun uap mekanis baru yang jauh lebih cepat dan murah.
*   Merasa terancam kelaparan, sekelompok buruh dipimpin tokoh mitologis "Ned Ludd" menyerang pabrik-pabrik di malam hari untuk **menghancurkan mesin-mesin tenun** tersebut dengan palu besar sebagai aksi protes.
*   **Hasil Sejarah:** Pemerintah meredam paksa gerakan Luddite. Namun, mesin uap tidak menghapuskan pekerjaan manusia; mesin justru melahirkan jutaan jenis pekerjaan baru yang tidak pernah dibayangkan kaum penenun (seperti teknisi mesin, operator kereta api, akuntan industri, dan desainer garmen).
*   **Analogi Hari Ini:** Ketakutan desainer, penulis, dan programmer digantikan Generative AI adalah gema sejarah langsung dari gerakan Luddite 200 tahun lalu. Polanya selalu sama: Teknologi mengubah wajah pekerjaan, namun manusia yang beradaptasi memanfaatkan alat baru tersebut akan selalu keluar sebagai pemenang ekonomi.`,
          deepDive: `### 🔬 Siklus Kondratiev (K-Waves): Teori Gelombang Makroekonomi Panjang
Bagaimana sejarah membuktikan bahwa inovasi teknologi memicu siklus pertumbuhan ekonomi yang berulang? Ekonom Rusia **Nikolai Kondratiev** memperkenalkan **Gelombang Kondratiev (K-Waves)**:

Siklus pertumbuhan ekonomi global bergerak dalam gelombang panjang berdurasi **50-60 tahun** yang dipicu langsung oleh inovasi teknologi radikal:

| Gelombang | Teknologi Pemicu | Sektor Ekonomi Utama yang Terpengaruh | Periode |
| :--- | :--- | :--- | :--- |
| **Gelombang 1** | Mesin Uap & Tekstil | Industri Katun, Batubara, Kereta Api Awal | 1780-1840 |
| **Gelombang 2** | Baja & Perkeretaapian | Transportasi Massal, Ekspansi Geografis | 1840-1890 |
| **Gelombang 3** | Listrik & Kimia Industri | Pencahayaan, Komunikasi Telepon, Otomotif Awal | 1890-1940 |
| **Gelombang 4** | Petrokimia & Transistor | Plastik, Penerbangan, Komputer Awal | 1940-1990 |
| **Gelombang 5** | Teknologi Informasi & Internet | Software, Digitalisasi Finansial, Telekomunikasi | 1990-2020 |
| **Gelombang 6** | Kecerdasan Buatan & Robotika | AI Generatif, Biotech, Quantum Computing | 2020+ (Masa Depan) |

Tiap transisi gelombang ditandai dengan guncangan krisis hebat (creative destruction), diikuti fase ledakan kemakmuran baru bagi peradaban yang paling cepat mengadopsi pemicu gelombang tersebut.

---

#### 🛠️ PROYEK MINI: Memetakan Skill Kerja Anda Menghadapi Gelombang 6 AI
Buatlah tabel analisis matriks pribadi yang memetakan aktivitas belajar dan bekerja harian Anda saat ini:
1.  **Aktivitas Berulang (Low-Cognitive / Mudah Diotomatisasi):** Menyalin data, menerjemahkan teks mentah secara harfiah, membuat format email berulang. *(Strategi: Mulailah mendelegasikan tugas ini ke asisten AI mulai hari ini).*
2.  **Aktivitas Kompleks (High-Cognitive / Membutuhkan Sentuhan Manusia):** Merumuskan empati kebutuhan klien, mendesain konsep arsitektur orisinal, negosiasi interpersonal, memilah kebenaran informasi hasil AI. *(Strategi: Fokuskan 80% energi belajar Anda untuk mengasah kapabilitas non-otomatisasi ini).*

#### 📚 Referensi Akademik:
*   *Schumpeter, J. A. (1942).* "Capitalism, Socialism, and Democracy." Karya ilmiah yang memperkenalkan konsep *Creative Destruction* (Penghancuran Kreatif) akibat lahirnya inovasi teknologi baru.`
        },
        jembatan: [
          {
            text: "Setiap revolusi industri memicu tatanan sistem ekonomi baru",
            targetSectorId: "ekonomi",
            targetTopicId: "kosakata_pasar_finansial",
            bridgeReason: "Evolusi mesin uap hingga komputer digital secara radikal mendefinisikan ulang instrumen finansial, mulai dari lahirnya sistem korporasi saham gabungan hingga kemunculan DeFi modern."
          }
        ],
        quiz: [
          {
            question: "Inovasi teknologi apa yang memicu dimulainya Revolusi Industri 1.0 pada akhir abad ke-18?",
            options: [
              "Ditemukannya listrik arus searah",
              "Ditemukannya Mesin Uap untuk mekanisasi pabrik",
              "Ditemukannya jaringan internet global nirkabel",
              "Peluncuran satelit luar angkasa pertama"
            ],
            correctIndex: 1,
            explanation: "Mesin uap James Watt memicu transformasi mekanis raksasa yang menggantikan tenaga hewan/manusia menjadi tenaga mekanis pabrik manufaktur di Inggris."
          },
          {
            question: "Gerakan kelompok pekerja sosial di Inggris pada tahun 1811 yang memprotes hilangnya lapangan kerja dengan cara menghancurkan mesin-mesin tenun pabrik disebut...",
            options: [
              "Gerakan Komunis",
              "Kaum Luddite",
              "Serikat Kriptografi",
              "Kaum Borjuasi"
            ],
            correctIndex: 1,
            explanation: "Kaum Luddite adalah gerakan perlawanan historis pengrajin tekstil yang menghancurkan alat tenun mekanis karena khawatir digantikan oleh otomatisasi uap industri."
          },
          {
            question: "Bagaimana teori 'Gelombang Kondratiev' (K-Waves) menjelaskan pertumbuhan peradaban manusia?",
            options: [
              "Peradaban manusia tumbuh linear tanpa hambatan",
              "Pertumbuhan sosiokultural dan ekonomi global bergerak naik turun dalam siklus panjang (50-60 tahun) yang dikendalikan oleh lahirnya terobosan teknologi radikal baru",
              "Peradaban manusia ditentukan oleh perubahan iklim kutub saja",
              "Ekonomi dunia akan runtuh setiap 5 tahun sekali secara acak"
            ],
            correctIndex: 1,
            explanation: "Teori K-Waves menunjukkan bahwa inovasi klaster teknologi (seperti uap, kereta api, listrik, internet, dan kini AI) menjadi motor siklus makroekonomi berjangka panjang."
          }
        ]
      }
    ]
  },
  {
    id: "seni",
    name: "Seni & Kreativitas",
    description: "Pendekatan inovasi desain, storytelling visual, keindahan ekspresi, struktur matematika nada, dan kreativitas lintas disiplin.",
    color: "#ec4899",
    accentGlow: "rgba(236, 72, 153, 0.4)",
    icon: "Palette",
    x: 950,
    y: 480,
    connectedSectorIds: ["bisnis", "sejarah", "kehidupan"],
    topics: [
      {
        id: "design_thinking_seni",
        title: "Design Thinking (Metode Memecahkan Masalah dengan Empati)",
        difficulty: "Menengah",
        progress: 0,
        vocabIds: ["design_thinking", "psikologi_kognitif"],
        content: {
          summary: `### 🎨 Seni Memecahkan Masalah: Design Thinking
Banyak orang berpikir kreativitas adalah bakat murni bawaan lahir—seperti kemampuan melukis indah atau menciptakan musik syahdu secara spontan. Nyatanya, kreativitas adalah **metodologi berpikir yang terstruktur dan bisa dilatih**.

Salah satu metode kreativitas paling populer di dunia inovasi bisnis modern adalah **Design Thinking**. Ini adalah pendekatan pemecahan masalah yang berpusat sepenuhnya pada **Empati** manusia.

#### 🧩 5 Tahap Siklus Design Thinking:
1.  **Empathize (Berempati):** Memahami perasaan, frustrasi, dan kebutuhan nyata pengguna dengan cara mengobservasi dan mewawancarai mereka langsung (menyingkirkan asumsi pribadi).
2.  **Define (Menentukan):** Menyimpulkan masalah utama pengguna secara tajam dan fokus.
3.  **Ideate (Menghasilkan Ide):** Melakukan brain-storming memunculkan sebanyak mungkin solusi radikal tanpa sensor.
4.  **Prototype (Membuat Purwarupa):** Membuat representasi fisik/digital sederhana yang murah dari ide Anda (misal coretan kertas atau mock-up instan).
5.  **Test (Uji Coba):** Menunjukkan prototipe ke pengguna nyata guna mendapatkan masukan jujur untuk menyempurnakannya.`,
          caseStudy: `### 🚀 Studi Kasus: Bagaimana Desain MRI Pintar Ramah Anak Menyelamatkan Rumah Sakit
Rumah sakit sering menghadapi masalah besar: anak-anak balita sangat ketakutan saat harus menjalani pemindaian mesin **MRI (Magnetic Resonance Imaging)**.

#### 🚨 Masalah Awal:
*   Mesin MRI sangat berisik, dingin, berlubang sempit menyerupai liang lahat, dan mengintimidasi.
*   Lebih dari 80% anak kecil harus dibius penenang (anestesi medis) agar bisa diam tidak bergerak selama proses pemindaian 30 menit. Hal ini meningkatkan risiko kesehatan anak dan biaya operasional rumah sakit membengkak.
*   Insinyur GE Healthcare, **Doug Dietz**, awalnya mendesain mesin MRI dengan fokus murni pada kecanggihan teknologi fisik scan medisnya saja (mengabaikan empati psikologis anak).

#### 🛡️ Solusi Kreatif Berbasis Design Thinking: "The Adventure Series"
Doug Dietz meriset ulang menggunakan metode Empati dengan mengobservasi anak-anak langsung di TK. Dia menyadari bahwa bagi anak kecil, dunia adalah ruang petualangan imajinatif.
*   Doug merombak total tampilan fisik mesin MRI tanpa mengubah teknologi intinya sama sekali.
*   Dia mendekorasi mesin MRI menyerupai **Kapal Bajak Laut** yang sedang mengarungi lautan, dan dinding ruangan disulap menjadi dekorasi pulau harta karun yang indah.
*   Sebelum masuk mesin, perawat (yang dilatih bertindak sebagai kapten bajak laut) memberi instruksi: *"Sekarang kamu harus merayap masuk ke kabin kapal selam, berbaringlah diam di kasur, dan dengarkan suara gemuruh mesin kapal menyelam di bawah laut (yang aslinya adalah suara bising mesin scan MRI!)."*
*   **Hasil Luar Biasa:** Angka anak kecil yang perlu dibius merosot tajam dari 80% menjadi di bawah 1%. Anak-anak justru bertanya ke orang tuanya: *"Bolehkah besok kita main kapal bajak laut di sini lagi?"* Ini adalah kemenangan mutlak dari desain kreatif berbasis empati sosiologis!`,
          deepDive: `### 🔬 Filsafat Desain: Fungsionalisme vs Estetika & Empati Kognitif
Filsuf seni dan desain sering mendebat hubungan antara bentuk fisik (*form*) dengan fungsionalitas kegunaan (*function*).

#### 📐 Doktrin Desain: "Form Follows Function" (Louis Sullivan)
Menyatakan bahwa keindahan sejati suatu objek lahir secara alami dari seberapa efisien objek tersebut memenuhi fungsi utamanya tanpa hiasan dekoratif yang berlebihan. Hal ini diadopsi kuat oleh sekolah seni **Bauhaus** di Jerman dan direpresentasikan sempurna pada produk-produk Apple rancangan Jony Ive.

---

#### 🛠️ PROYEK MINI: Merancang Aplikasi Berbasis Empati Pengguna
Pilihlah satu problem harian teman dekat Anda (misalkan: mereka sering lupa minum air putih atau sulit mengatur prioritas tugas kuliah harian).
1.  **Lakukan Wawancara Empati (Empathize):** Ajukan pertanyaan *"Mengapa"* sebanyak 5 kali untuk memahami akar psikologis kenapa mereka sulit melakukannya.
2.  **Tulis "Problem Statement" (Define):** *"Teman saya [Nama] membutuhkan cara yang tidak mengganggu perhatian belajarnya untuk minum air, karena dia sering terlalu fokus di depan laptop hingga lupa dehidrasi."*
3.  **Gambarkan Coretan Kertas Prototipe (Prototype):** Buatlah coretan 3 layar fungsional sederhana di kertas tentang cara sistem aplikasi menyelesaikan masalah tersebut secara minimalis. Tunjukkan ke mereka untuk meminta masukan langsung (Test).

#### 📚 Referensi Akademik:
*   *Brown, T. (2008).* "Design Thinking." Harvard Business Review. Tulisan legendaris CEO IDEO yang memperkenalkan metodologi ini ke dunia bisnis global.`
        },
        jembatan: [
          {
            text: "Design Thinking mengutamakan empati untuk inovasi bisnis",
            targetSectorId: "bisnis",
            targetTopicId: "model_bisnis",
            bridgeReason: "Menciptakan model bisnis digital yang sukses (SaaS/B2C) murni bersandar pada seberapa tajam kita menerapkan empati kreativitas (Design Thinking) untuk menjawab frustrasi pengguna."
          }
        ],
        quiz: [
          {
            question: "Apa langkah paling awal dan krusial dalam metodologi berpikir inovasi 'Design Thinking'?",
            options: [
              "Menulis kode pemrograman aplikasi",
              "Mencari investor pendanaan startup",
              "Empathize (Berempati memahami frustrasi dan kebutuhan nyata pengguna langsung)",
              "Membuat brosur iklan promosi"
            ],
            correctIndex: 2,
            explanation: "Design thinking selalu diawali dengan Empathize—turun langsung memahami sudut pandang, perasaan, dan hambatan hidup pengguna tanpa asumsi pribadi."
          },
          {
            question: "Pada studi kasus mesin MRI anak rancangan Doug Dietz, apa perubahan radikal yang menghasilkan kesuksesan luar biasa?",
            options: [
              "Membeli komponen chip komputer yang jauh lebih mahal",
              "Menggunakan empati desain untuk menyulap mesin bising menakutkan menjadi petualangan kapal bajak laut imajinatif bagi anak",
              "Melarang anak-anak masuk ke rumah sakit",
              "Mengubah fungsi mesin MRI menjadi mesin kasir"
            ],
            correctIndex: 1,
            explanation: "Inovasi sejati MRI Bajak Laut tidak terletak pada teknologi mesin pemindainya, melainkan pada rekonstruksi pengalaman psikologis anak melalui desain visual dan narasi petualangan bajak laut kreatif."
          },
          {
            question: "Doktrin seni 'Form Follows Function' bermakna bahwa...",
            options: [
              "Keindahan desain harus diutamakan meskipun produknya rusak tidak bisa dipakai",
              "Tampilan visual suatu objek harus menyesuaikan diri secara efisien dengan fungsionalitas utilitas utamanya",
              "Produk harus dibuat semahal mungkin",
              "Seni tidak boleh digabungkan dengan bisnis"
            ],
            correctIndex: 1,
            explanation: "Form Follows Function menegaskan bahwa wujud estetika terbaik suatu produk lahir secara organik dari pemenuhan fungsi praktisnya secara murni dan efisien."
          }
        ]
      }
    ]
  },
  {
    id: "kehidupan",
    name: "Kehidupan (Life Skills)",
    description: "Psikologi kognitif proses belajar, pengembangan habit produktif, literasi finansial mandiri, dan kemampuan komunikasi interpersonal.",
    color: "#e11d48",
    accentGlow: "rgba(225, 29, 72, 0.4)",
    icon: "Heart",
    x: 550,
    y: 640,
    connectedSectorIds: ["ai_ml", "filsafat", "seni"],
    topics: [
      {
        id: "psikologi_belajar",
        title: "Psikologi Kognitif (Cara Otak Kita Belajar & Memori)",
        difficulty: "Santai",
        progress: 0,
        vocabIds: ["psikologi_kognitif", "neural_networks"],
        content: {
          summary: `### 🧠 Menembus Batas Otak: Bagaimana Kita Belajar?
Banyak siswa menghabiskan waktu semalaman membaca ulang buku teks demi menghadapi ujian besok pagi. Sayangnya, psikologi kognitif membuktikan bahwa **membaca ulang adalah salah satu metode belajar terburuk** di dunia. Itu hanya menciptakan ilusi pemahaman (*illusion of competence*).

Otak kita mengingat informasi melalui penguatan koneksi sel saraf biologis (Neuroplastisitas). Agar ingatan tersebut bertahan lama, kita harus memaksa otak bekerja keras memanggil memori tersebut.

#### 🛡️ 2 Teknik Belajar Terkuat Berdasarkan Sains:
1.  **Active Recall (Mengingat Aktif):** Menguji diri sendiri dengan kartu pertanyaan (flashcards) atau menutup buku lalu menulis ulang apa saja yang Anda ingat. Memaksa otak memeras memori memperkuat jalur sinapsis saraf secara permanen.
2.  **Spaced Repetition (Pengulangan Berjarak):** Mengulangi materi pelajaran pada interval waktu yang semakin renggang (Hari ke-1, Hari ke-3, Hari ke-7, Hari ke-30). Teknik ini menentang kurva lupa alami otak manusia (*Ebbinghaus Forgetting Curve*).`,
          caseStudy: `### 📚 Studi Kasus: Kurva Lupa Ebbinghaus & Efisiensi Sistem Flashcard Anki
Pada tahun 1885, psikolog Jerman **Hermann Ebbinghaus** melakukan eksperimen ilmiah mandiri yang legendaris untuk mengukur seberapa cepat memori manusia melupakan informasi baru.

#### 📉 Hasil Temuan Kurva Lupa (Forgetting Curve):
*   Dalam waktu **20 menit** setelah belajar, manusia melupakan hampir **42%** materi baru.
*   Dalam waktu **24 jam**, memori yang tersisa hanya sekitar **33%**.
*   Setelah **30 hari**, memori yang tersisa murni tersisa **21%** saja jika tidak dilakukan pengulangan.

#### 🚀 Solusi Teknologi: Sistem Algoritma Spaced Repetition (Contoh: Anki App)
Aplikasi flashcard modern seperti Anki menggunakan algoritma pintar berbasis matematika Kurva Lupa Ebbinghaus:
*   Saat Anda mengingat sebuah kartu kosakata dengan mudah, aplikasi akan menjadwalkan kartu tersebut muncul kembali 7 hari kemudian.
*   Jika Anda merasa kesulitan mengingat kartu tersebut, algoritma memaksa kartu muncul lagi dalam waktu 5 menit berikutnya.
*   Dengan mereview materi tepat di titik kritis sebelum otak Anda hampir melupakannya, waktu belajar Anda terpangkas 70% sementara retensi ingatan jangka panjang melesat hingga 90%. Ini adalah rahasia para polyglot (penguasai banyak bahasa) dan mahasiswa kedokteran menghafal ribuan istilah rumit dalam hitungan bulan.`,
          deepDive: `### 🔬 Neurosains Belajar: Sinapsis Hebbian, Mielinisasi, & AI Deep Learning
Bagaimana proses belajar terjadi di level fisik sel otak kita? Jawabannya dirangkum dalam **Hukum Hebbian (Hebbian Theory)**:

$$\text{"Neurons that fire together, wire together."}$$

Ketika kita mempelajari suatu keterampilan baru (misal memetik gitar atau menulis kode):
1.  Neuron-neuron tertentu di otak melepas muatan listrik secara serempak.
2.  Setiap kali gerakan atau ingatan diulang, celah sinapsis antar neuron menyempit, membuat transmisi kimiawi saraf berikutnya berjalan lebih mudah.
3.  **Mielinisasi (Myelination):** Tubuh membungkus serat saraf (akson) menggunakan lapisan lemak isolator bernama **Mielin**. Mielin bertindak seperti pembungkus karet kabel listrik yang mempercepat laju sinyal saraf hingga 100 kali lipat. Latihan berulang adalah proses fisik menebalkan mielin pada sirkuit saraf spesifik tersebut.

---

#### 🧠 Analogi dengan AI Deep Learning:
Di sektor **AI/ML**, kita meniru sistem biologi ini dengan menyesuaikan bobot matematis (*weights*) di dalam Neural Network tiruan kita saat melakukan training. Kesamaan pola belajar ini membuktikan bahwa biologi alam, psikologi manusia, dan rekayasa teknologi kecerdasan buatan murni saling terhubung dalam satu benang merah universal!

---

#### 🛠️ PROYEK MINI: Merancang Jadwal Spaced Repetition Pribadi
Buatlah kalender belajar untuk topik tersulit yang sedang Anda pelajari saat ini (misalkan: Konsep API atau Persamaan Kuantitas Uang) menggunakan sistem 4 Kotak Leibniz:
*   **Kotak 1:** Review setiap hari (Topik baru yang baru dipelajari hari ini).
*   **Kotak 2:** Review setiap 3 hari sekali (Topik yang sudah mulai Anda hafal dengan sedikit usaha).
*   **Kotak 3:** Review seminggu sekali (Topik yang sudah Anda pahami dengan baik).
*   **Kotak 4:** Review sebulan sekali (Topik yang sudah sangat Anda kuasai di luar kepala).

Jika Anda gagal menjawab pertanyaan topik saat review di Kotak 3, Anda wajib menurunkannya kembali ke Kotak 1 demi memaksa neuroplastisitas otak Anda menyusun ulang sirkuit memorinya.

#### 📚 Referensi Akademik:
*   *Hebb, D. O. (1949).* "The Organization of Behavior." Buku fundamental peletak teori neurosains belajar modern.`
        },
        jembatan: [
          {
            text: "Neuroplastisitas belajar menginspirasi arsitektur AI",
            targetSectorId: "ai_ml",
            targetTopicId: "neural_networks_otak",
            bridgeReason: "Bagaimana otak biologis menguatkan sinapsis saat belajar (Psikologi Kognitif) adalah basis teoretis utama yang melahirkan pemodelan Jaringan Saraf Tiruan (Neural Network) dalam AI."
          }
        ],
        quiz: [
          {
            question: "Mengapa membaca ulang buku teks berulang kali dianggap metode belajar yang kurang efisien berdasarkan psikologi kognitif?",
            options: [
              "Karena merusak kertas buku",
              "Karena hanya menciptakan ilusi kompetensi (merasa paham padahal hanya mengenali tulisan saja), tanpa memaksa otak aktif memanggil ingatan (active recall)",
              "Karena membaca ulang membutuhkan koneksi internet berkecepatan tinggi",
              "Karena dilarang oleh kurikulum sekolah"
            ],
            correctIndex: 1,
            explanation: "Membaca ulang bersifat pasif. Otak tidak dipaksa melakukan kalkulasi aktif memanggil informasi, sehingga tidak memicu neuroplastisitas penebalan mielin pada sel saraf secara permanen."
          },
          {
            question: "Berapa rata-rata persentase informasi baru yang dilupakan otak manusia dalam waktu 24 jam pertama jika tidak dilakukan review berdasarkan Kurva Lupa Ebbinghaus?",
            options: [
              "Hanya sekitar 5%",
              "Hampir 67% (menyisakan sekitar 33% saja)",
              "Tepat 100% lupa total",
              "Tidak ada yang dilupakan"
            ],
            correctIndex: 1,
            explanation: "Ebbinghaus membuktikan penurunan ingatan jangka pendek terjadi sangat curam di awal: manusia melupakan hampir dua pertiga informasi baru dalam satu hari pertama pasca-belajar."
          },
          {
            question: "Hukum Hebbian menyatakan bahwa 'Neurons that fire together, wire together'. Dalam kehidupan harian kita, proses ini terjadi melalui...",
            options: [
              "Membaca komik di akhir pekan",
              "Latihan berulang secara konsisten yang menguatkan sinapsis dan menebalkan lapisan pelindung mielin pada jalur saraf spesifik",
              "Meminum air putih dingin",
              "Menghapus memori ponsel"
            ],
            correctIndex: 1,
            explanation: "Latihan aktif berulang memicu pelepasan muatan listrik serentak antar neuron terkait, melahirkan struktur fisik sinapsis yang semakin erat (wire together) dan keahlian baru terbentuk."
          }
        ]
      }
    ]
  }
];

export const CROSS_SECTOR_CHALLENGES: CrossSectorChallenge[] = [
  {
    id: "challenge_1",
    title: "Tantangan Lintas Sektor: AI & Filsafat Etika",
    description: "Evaluasi bagaimana teori filsafat klasik diterapkan untuk menyelesaikan masalah kecerdasan buatan.",
    sectors: ["ai_ml", "filsafat"],
    question: "Ketika mobil otonom bertenaga AI harus memilih antara menabrak 5 pejalan kaki di depannya atau membanting setir menabrak tembok yang akan mengorbankan 1 penumpangnya, kerangka filsafat etika apa yang murni digunakan jika AI diprogram untuk mengorbankan 1 orang demi keselamatan 5 orang?",
    options: [
      "Egoisme Etis",
      "Utilitarianisme (Mengutamakan kebahagiaan/keselamatan jumlah terbanyak)",
      "Deontologi Immanuel Kant (Kewajiban kaku tanpa tawar-menawar)",
      "Eksistensialisme Absurd"
    ],
    correctIndex: 1,
    explanation: "Utilitarianisme (oleh Jeremy Bentham & John Stuart Mill) mengajarkan bahwa keputusan moral yang benar adalah tindakan yang memaksimalkan utilitas, yaitu membawa kebaikan terbesar bagi jumlah orang terbanyak.",
    badgeName: "Socrates of Silicon"
  },
  {
    id: "challenge_2",
    title: "Tantangan Lintas Sektor: Teknologi & Ekonomi Moneter",
    description: "Ujilah pemahaman Anda mengenai integrasi infrastruktur digital dengan peredaran uang di masyarakat.",
    sectors: ["teknologi", "ekonomi"],
    question: "Bagaimana ekosistem Keuangan Terdesentralisasi (DeFi) di blockchain mampu mengeksekusi pinjam-meminjam uang secara otomatis tanpa membutuhkan perantara institusi Bank?",
    options: [
      "Menggunakan pegawai bank yang bekerja shift malam secara remote",
      "Menggunakan Smart Contract—kode pemrograman terenkripsi di blockchain yang mengeksekusi perjanjian secara otomatis jika syarat agunan terpenuhi",
      "Dengan meminta pengguna saling percaya satu sama lain tanpa jaminan",
      "DeFi tidak bisa berjalan secara otomatis"
    ],
    correctIndex: 1,
    explanation: "Smart Contract adalah program komputer yang berjalan di atas blockchain, bertindak sebagai perantara otomatis tepercaya yang mengeksekusi logika perjanjian (jika syarat X terpenuhi, transfer dana Y dilakukan) tanpa intervensi manusia.",
    badgeName: "Bridge Builder"
  },
  {
    id: "challenge_3",
    title: "Tantangan Lintas Sektor: Sains Fisika & Teknologi Komputer",
    description: "Koneksikan teori fisika paling ekstrem dengan perangkat genggam Anda.",
    sectors: ["sains", "teknologi"],
    options: [
      "Mekanika relativitas waktu melambatkan aliran listrik kabel charger",
      "Semikonduktor silikon bekerja dengan mengandalkan sakelar transistor berukuran nanometer, di mana perilaku elektronnya diatur berdasarkan persamaan probabilitas mekanika kuantum",
      "Gaya gravitasi matahari menggerakkan kursor di layar ponsel",
      "Sains fisika tidak memiliki hubungan dengan komputer"
    ],
    question: "Kenapa mekanika kuantum (ilmu fisika partikel subatomik) dianggap sebagai juru selamat lahirnya komputer modern?",
    correctIndex: 1,
    explanation: "Tanpa kajian teoretis mekanika kuantum yang melahirkan pemahaman tentang konduktivitas elektron dalam bahan padat semikonduktor silikon, kita tidak bisa menciptakan transistor mikroprosesor.",
    badgeName: "Quantum Developer"
  }
];
