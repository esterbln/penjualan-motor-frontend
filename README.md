# Penjualan Motor (Frontend)

[![Demo Dashboard](images/thumbnail.png)](https://youtu.be/D-oKJhtTTLk)

Aplikasi web penjualan motor yang dibuat dengan **Vue 3** dan **Quasar**. Aplikasi ini adalah pasangan dari backend [`penjualan-motor-api`](https://github.com/esterbln/penjualan-motor-api): semua data (pengguna, tipe motor, motor, pembayaran) diambil dan disimpan lewat API tersebut.

## Fitur

**Umum**
- Registrasi dan login pengguna
- Pembagian akses berdasarkan peran (admin dan user), dengan halaman yang berbeda untuk masing-masing

**Admin**
- Dasbor daftar pembayaran, lengkap dengan konfirmasi pembayaran
- Kelola tipe motor (tambah, ubah, hapus)
- Kelola motor (tambah, ubah, hapus) termasuk upload gambar

**User**
- Daftar motor bergambar dengan tombol beli
- Pembelian dengan menentukan jumlah (total harga dihitung otomatis)
- Riwayat pembayaran pribadi dengan status Unconfirmed atau Confirmed

## Teknologi

| Bagian | Yang dipakai |
| --- | --- |
| Framework | Vue 3, Quasar 2 |
| Routing | Vue Router (mode hash) |
| State | Pinia |
| Komunikasi ke API | Axios |
| Sesi login | Cookie (lewat plugin Cookies milik Quasar) |

## Struktur folder

```
src/
├── boot/axios.js     # alamat API dan instance Axios
├── helper/           # format harga, daftar peran, penyimpanan profil
├── layouts/          # tata letak halaman admin dan user
├── pages/
│   ├── auth/         # login dan register
│   ├── admin/        # dasbor, tipe, motor
│   └── user/         # daftar motor dan pembayaran
└── router/           # daftar route dan penjaga akses
```

## Cara menjalankan

Aplikasi ini **membutuhkan backend yang sedang berjalan**, jadi siapkan itu dulu.

1. **Jalankan API.** Ikuti petunjuk di repo [`penjualan-motor-api`](https://github.com/esterbln/penjualan-motor-api), sampai server menyala di `http://localhost:3000`. Pastikan MySQL juga menyala.
2. **Unduh atau clone repositori ini**, lalu masuk ke foldernya.
3. **Pasang dependensi** (disarankan Node.js versi 18 atau 20):
   ```
   npm install
   ```
4. **Jalankan aplikasi:**
   ```
   npm run dev
   ```
   Browser akan terbuka di `http://localhost:8080` dan menampilkan halaman login.

Alamat API ditulis langsung di `src/boot/axios.js` (`http://localhost:3000`). Kalau API berjalan di alamat lain, ubah nilainya di file itu.

## Membuat akun

Halaman register hanya membuat akun **user biasa**. Untuk mencoba sebagai admin:

1. Daftar akun seperti biasa lewat halaman register.
2. Di database `penjualan_motor`, buka tabel `pengguna`, lalu ubah kolom `role` pada akun itu dari `2` menjadi `1` (misalnya lewat phpMyAdmin).
3. Login ulang, dan halaman admin akan terbuka.

## Urutan mencoba

1. Login sebagai admin, lalu tambah beberapa **tipe** motor.
2. Tambah beberapa **motor** (merek, harga, tipe, penilaian, keterangan, dan gambar JPG di bawah 2 MB).
3. Logout, lalu login sebagai user dan **beli** satu motor.
4. Login lagi sebagai admin dan **konfirmasi** pembayarannya di dasbor.

## Keterbatasan yang diketahui

Proyek ini adalah latihan ujian, jadi beberapa hal belum dibuat:

- Pemisahan halaman admin dan user hanya dijaga di sisi aplikasi (lewat cookie). API belum memeriksa hak akses di sisi server.
- Alamat API masih tertulis langsung di kode, belum memakai variabel lingkungan.
- Belum ada pengujian otomatis.

## Pembuat

Ester Belen Wijaya, mahasiswa S1 Sistem Informasi, Universitas Bandar Lampung.
