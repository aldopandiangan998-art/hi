# 🎂 Website Ucapan Ulang Tahun untuk Kakak (Single Page, Native Web)

Situs web ucapan selamat ulang tahun yang hangat, elegan, dan penuh makna, dibuat khusus untuk kakak perempuan tercinta. Dirancang menggunakan teknologi **Web Native murni (HTML5, CSS3, Vanilla JavaScript)** tanpa dependensi framework, tanpa build tools, sangat ringan, dan responsif dari layar ponsel terkecil (320px) hingga monitor layar lebar (1920px+).

---

## 📁 Struktur Berkas

```
ulta/
├── index.html            # Berkas HTML utama (struktur semantik & meta SEO/OG)
├── css/
│   └── style.css         # Desain responsif mobile-first, animasi, & tema warna
├── js/
│   └── script.js         # Konfigurasi data (CONFIG), efek konfeti, hitung mundur
├── assets/
│   ├── foto.jpg          # Foto utama kakak (ganti dengan foto asli)
│   └── foto.webp         # Versi WebP foto utama (opsional untuk performa)
├── README.md             # Panduan kustomisasi dan publikasi ini
└── implementasiplan.md   # Dokumen spesifikasi teknis proyek
```

---

## ✏️ Panduan Mengubah Konten (Kustomisasi)

Semua data teks, nama, usia, tanggal, dan pesan dapat diubah dengan sangat mudah di **satu tempat**, yaitu pada objek `CONFIG` di berkas [`js/script.js`](file:///c:/Users/ASUS/Downloads/ulta/js/script.js).

### 1. Mengubah Data Teks & Ucapan

Buka berkas `js/script.js` di baris teratas:

```javascript
const CONFIG = {
  // 1. Nama panggilan kakak
  name: 'Kak Sarah', // Ganti dengan nama kakak Anda

  // 2. Usia kakak (opsional)
  age: '25', // Isi usia kakak, atau kosongkan '' jika tidak ingin menampilkan usia

  // 3. Tanggal ulang tahun (format: YYYY-MM-DD)
  birthdayDate: '2026-11-23', // Digunakan untuk banner status hari-H atau hitung mundur

  // 4. Judul ucapan utama
  headline: 'Selamat Ulang Tahun',

  // 5. Deskripsi singkat di bagian atas (Hero)
  tagline: 'Hari ini adalah hari istimewa untuk merayakan orang yang begitu luar biasa dan penuh inspirasi.',

  // 6. Pesan & doa pribadi (bisa 2 sampai 4 paragraf)
  message: [
    'Selamat ulang tahun untuk kakak perempuan terbaik di dunia! Semoga di usia yang baru ini, setiap langkah Kakak senantiasa dipenuhi keberkahan, kebahagiaan, dan kemudahan dalam menggapai semua impian.',
    'Terima kasih sudah selalu menjadi sosok yang penyayang, pendengar yang baik, dan panutan yang luar biasa. Terima kasih atas tawa dan kehangatan yang selalu Kakak hadirkan untuk keluarga.',
    'Semoga kesehatan, kedamaian, dan kebahagiaan selalu menyertai hari-hari Kakak. Tetaplah menjadi pribadi yang bersinar dan selalu tersenyum manis!'
  ],

  // 7. Nama pengirim ucapan (nama adik)
  senderName: 'Adikmu Tersayang',

  // 8. Jalur berkas foto
  photo: 'assets/foto.jpg',
  photoWebp: 'assets/foto.webp',

  // 9. Durasi efek hujan konfeti (milidetik, default 3.5 detik)
  confettiDurationMs: 3500
};
```

---

### 2. Mengubah Foto Kakak

1. Siapkan 1 lembar foto terbaik kakak Anda.
2. Rekomendasi rasio aspek adalah **4:5** atau **potret vertikal** (contoh ukuran: `800 x 1000 px`).
3. Beri nama berkas foto tersebut: `foto.jpg`.
4. Salin dan timpa berkas tersebut ke folder:
   ```
   assets/foto.jpg
   ```
5. *(Opsional)* Jika Anda memiliki versi format WebP, Anda juga dapat menaruhnya di `assets/foto.webp` untuk mempercepat pemuatan gambar di browser modern.

---

## 🚀 Cara Menjalankan Secara Lokal

Situs ini tidak memerlukan Node.js, bundler, atau instalasi paket apa pun.

### Cara 1: Langsung Buka di Browser
Cukup klik dua kali (double click) pada berkas `index.html`, atau seret (*drag-and-drop*) berkas `index.html` ke jendela browser (Chrome, Edge, Safari, Firefox).

### Cara 2: Menggunakan Local Server (Python)
Jika ingin menguji lewat protokol HTTP lokal:
```bash
# Jalankan di folder ini
python -m http.server 8000
```
Lalu buka di browser: `http://localhost:8000`

---

## 🌐 Panduan Publikasi Gratis (Online Deployment)

Pilih salah satu layanan gratis berikut agar situs ini bisa diakses melalui tautan/link oleh kakak Anda di mana saja:

### Opsi A: Netlify Drop (Paling Cepat & Mudah, 30 Detik)
1. Buka [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Seret (*drag and drop*) seluruh isi folder `ulta` ke kotak yang tersedia di situs Netlify.
3. Tunggu beberapa detik, tautan situs Anda langsung jadi dan aktif secara gratis (misal: `kakak-tersayang.netlify.app`).

### Opsi B: GitHub Pages
1. Buat repositori baru di GitHub (misal: `ulang-tahun-kakak`).
2. Unggah berkas-berkas proyek ini ke repositori tersebut.
3. Buka menu **Settings** > **Pages** di repositori GitHub Anda.
4. Pada bagian **Branch**, pilih `main` / `root`, lalu klik **Save**.
5. Situs Anda akan aktif di `https://<username>.github.io/ulang-tahun-kakak/`.

### Opsi C: Cloudflare Pages
1. Masuk ke dashboard [Cloudflare Pages](https://pages.cloudflare.com/).
2. Hubungkan ke repositori Git Anda atau unggah folder langsung via Direct Upload.
3. Simpan dan deploy dalam hitungan detik.

---

## ✨ Fitur Utama

- **Pemberitahuan Hari Ulang Tahun Otomatis**: Mendeteksi secara cerdas apakah hari ini adalah hari ulang tahun kakak (berdasarkan tanggal di `CONFIG.birthdayDate`) atau menampilkan hitung mundur jika masih ada sisa hari/jam.
- **Efek Konfeti Canvas Interaktif**: Efek perayaan konfeti berhamburan saat pertama kali halaman dimuat, serta tombol interaktif *"Kejutan Untuk Kakak"* dan *"Rayakan Lagi!"*. Efek berhenti otomatis setelah 3.5 detik (hemat baterai & memori).
- **Aksesibilitas & Performa Tinggi**:
  - Mendukung `prefers-reduced-motion` untuk pengunjung yang sensitif terhadap gerakan animasi.
  - Memiliki link navigasi aksesibilitas (*skip link*) dan rasio kontras teks standar WCAG AA.
  - Skor Lighthouse optimal (beban total halaman tanpa font eksternal < 100 KB).
- **Pratinjau Media Sosial Lengkap (Open Graph)**: Tampilan kartu pratinjau yang rapi saat link dibagikan melalui WhatsApp, Telegram, atau Twitter.

---

## 📋 Checklist Sebelum Dibagikan ke Kakak

- [ ] Foto di `assets/foto.jpg` sudah diganti dengan foto asli kakak.
- [ ] Nama panggilan pada `name` di `js/script.js` sudah diubah.
- [ ] Tanggal ulang tahun pada `birthdayDate` di `js/script.js` sudah disesuaikan.
- [ ] Paragraf ucapan pada `message` di `js/script.js` sudah ditulis dengan doa & kata-kata pribadi Anda (hapus teks `[GANTI PESAN]`).
- [ ] Nama Anda sebagai pengirim pada `senderName` di `js/script.js` sudah diganti.
- [ ] Cek tampilan situs di ponsel Anda sebelum mengirimkan link ke kakak tercinta! 🎉
