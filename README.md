# UAS KPL - Book Management REST API

Backend API sederhana untuk manajemen buku, dibangun menggunakan **Node.js** dan **Express.js**. Project ini dibuat sebagai pemenuhan Tugas Akhir Semester (UAS) mata kuliah Kualitas Perangkat Lunak (KPL). 

Fokus utama project ini adalah pada pembuatan backend API yang solid dengan implementasi CRUD (Create, Read, Update, Delete) lengkap beserta validasi input dan penanganan error (Error Handling) yang mumpuni, untuk kemudian diuji menggunakan **Postman**.

---

## Fitur Utama
- **CRUD Lengkap (6 Endpoint):** Mengakomodasi operasi dasar (GET, POST, PUT, DELETE) beserta 2 endpoint tambahan (GET by ID & PATCH) untuk fungsionalitas yang lebih spesifik.
- **In-Memory Storage:** Menggunakan array sementara (RAM) sebagai *mock database* agar project mudah dijalankan tanpa perlu setup database eksternal (MySQL/MongoDB).
- **Validasi Input:** Memastikan setiap request body (khususnya untuk POST, PUT, dan PATCH) memiliki format data yang valid dan tipe data yang benar sebelum diproses.
- **Global Error Handling:** Menangkap error dari JSON parsing yang salah (Malformed JSON), endpoint yang tidak ditemukan (404 Not Found), serta *internal server error* (500).

---

## Teknologi yang Digunakan
- **Node.js** - Runtime environment.
- **Express.js** - Web framework untuk routing dan middleware.
- **Cors** - Middleware untuk Cross-Origin Resource Sharing.
- **Nodemon** - Dev tool untuk *auto-restart* server saat ada perubahan kode.

---

## Panduan Instalasi & Menjalankan Server

### Prasyarat
Pastikan komputer kamu sudah terinstall **Node.js** (rekomendasi versi LTS).

### Langkah-langkah
1. **Clone/Download** repository project ini ke komputer lokal kamu.
2. Buka terminal atau command prompt, lalu arahkan (*cd*) ke direktori project ini.
3. **Install Dependencies:**
   Jalankan perintah berikut untuk mengunduh semua library yang dibutuhkan:
   ```bash
   npm install
   ```
4. **Jalankan Server (Mode Development):**
   ```bash
   npm run dev
   ```
   *Atau jika ingin menjalankan dalam mode biasa:*
   ```bash
   npm start
   ```
5. Jika berhasil, kamu akan melihat pesan di terminal:
   `Server is running successfully on http://localhost:3000`

---

## Dokumentasi API Endpoints

Base URL: `http://localhost:3000`

### 1. Check Health / Root
- **Method:** `GET`
- **URL:** `/`
- **Fungsi:** Mengecek status apakah server berjalan dengan baik.

### 2. Ambil Semua Buku (Get All Books)
- **Method:** `GET`
- **URL:** `/api/books`
- **Fungsi:** Menampilkan daftar seluruh buku yang tersimpan di sistem.
- **Response:** `200 OK` (Mengembalikan Array berisi objek buku).

### 3. Ambil Detail Buku (Get Book by ID)
- **Method:** `GET`
- **URL:** `/api/books/:id`
- **Fungsi:** Mengambil satu data buku spesifik berdasarkan ID.
- **Response:**
  - `200 OK` jika buku ditemukan.
  - `404 Not Found` jika ID tidak terdaftar.

### 4. Tambah Buku Baru (Create Book)
- **Method:** `POST`
- **URL:** `/api/books`
- **Fungsi:** Menambahkan entitas buku baru ke dalam database.
- **Header Wajib:** `Content-Type: application/json`
- **Body Request Contoh:**
  ```json
  {
    "judul": "Clean Architecture",
    "penulis": "Robert C. Martin",
    "tahun": 2017,
    "genre": "Software Design",
    "stok": 15
  }
  ```
- **Response:** 
  - `201 Created` jika berhasil ditambahkan.
  - `400 Bad Request` jika ada field yang kosong/tipe data salah.

### 5. Update Keseluruhan (Full Update Book)
- **Method:** `PUT`
- **URL:** `/api/books/:id`
- **Fungsi:** Mengganti *seluruh* data/informasi dari buku yang dipilih.
- **Header Wajib:** `Content-Type: application/json`
- **Body Request:** (Semua field `judul`, `penulis`, `tahun`, `genre`, `stok` wajib dikirimkan).
- **Response:** 
  - `200 OK` jika berhasil diupdate.
  - `400 Bad Request` jika data tidak lengkap/valid.
  - `404 Not Found` jika ID tidak ditemukan.

### 6. Update Sebagian (Partial Update Book)
- **Method:** `PATCH`
- **URL:** `/api/books/:id`
- **Fungsi:** Memperbarui *sebagian* informasi buku (misal: hanya mengupdate field `stok`).
- **Header Wajib:** `Content-Type: application/json`
- **Body Request Contoh:**
  ```json
  {
    "stok": 50
  }
  ```
- **Response:** 
  - `200 OK` jika berhasil diupdate.
  - `400 Bad Request` jika field yang dikirim tidak valid.
  - `404 Not Found` jika ID tidak ditemukan.

### 7. Hapus Buku (Delete Book)
- **Method:** `DELETE`
- **URL:** `/api/books/:id`
- **Fungsi:** Menghapus data buku beserta ID-nya secara permanen dari memori.
- **Response:**
  - `200 OK` jika berhasil dihapus.
  - `404 Not Found` jika ID tidak ditemukan.

---

##  Pengujian dengan Postman
Project ini didesain khusus untuk diuji menggunakan Postman sesuai instruksi UAS. 

**Tips Pengujian:**
1. Pastikan server lokal kamu (`npm run dev`) dalam keadaan berjalan (running) sebelum membuka Postman.
2. Tes endpoint secara berurutan: **GET All** -> **POST** -> **GET ID** -> **PUT** -> **PATCH** -> **DELETE**.
3. Cobalah untuk menyisipkan *Error Testing* (misal: POST tanpa mengisi field 'judul', atau GET ID '999') untuk melihat struktur Error Handling (`400` atau `404`) bekerja dengan baik. Ini berpotensi memberikan nilai tambah!

---

## Struktur Folder
```text
UAS KPL/
├── .gitignore              # Daftar file/folder yang diabaikan oleh Git
├── package.json            # Konfigurasi dependensi project npm
├── server.js               # Entry-point utama & konfigurasi Express server
└── routes/
    └── books.js            # In-memory database & kumpulan router/endpoint (CRUD)
```
