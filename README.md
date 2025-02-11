# 📚Book Management API

## 📌Deskripsi
Aplikasi ini adalah RESTful API untuk manajemen buku menggunakan Node.js, Express, dan Sequelize sebagai ORM untuk MySQL. API ini memungkinkan pengguna untuk melakukan CRUD (Create, Read, Update, Delete) pada data buku dengan otorisasi berbasis peran (admin dan user biasa).

## 🚀Fitur
- **User** (pengguna biasa):
  - Melihat daftar semua buku
  - Melihat detail buku tertentu
- **Admin**:
  - Menambahkan buku baru
  - Mengedit data buku
  - Menghapus buku

## 🛠Teknologi yang Digunakan
- **Node.js** dengan **Express.js** sebagai backend
- **Sequelize ORM** untuk manajemen database
- **JWT (JSON Web Token)** untuk autentikasi
- **MySQL** sebagai database

## 🔐Middleware
- `mustLogin`: Middleware yang memverifikasi apakah pengguna sudah login.
- `mustAdmin`: Middleware yang memastikan hanya admin yang dapat mengakses fitur tertentu.

## 📌API Endpoint
| Metode | Endpoint           | Akses      | Deskripsi                       |
|--------|--------------------|------------|---------------------------------|
| POST   | /api/auth/register | Publik     | Mendaftarkan pengguna baru      |
| POST   | /api/auth/login    | Publik     | Login untuk mendapatkan token   |
| GET    | /api/book          | User/Admin | Mendapatkan daftar buku         |
| GET    | /api/book /:id     | User/Admin | Mendapatkan detail buku         |
| POST   | /api/book          | Admin      | Menambahkan buku baru           |
| PUT    | /api/book /:id     | Admin      | Mengedit data buku              |
| DELETE | /api/book /:id     | Admin      | Menghapus buku                  |

## 📌Instalasi & Menjalankan Aplikasi
1. Clone repository ini:
   ```sh
   git clone https://github.com/bachtiarrizaa/bookshelf-api-express.js.git
   cd repository
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Konfigurasi file `.env`:
   ```
   JWT_SECRET=your_secret_key
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=password
   DB_NAME=book_db
   ```
4. Jalankan migrasi database:
   ```sh
   npx sequelize db:migrate
   ```
5. Jalankan server:
   ```sh
   npm start
   ```

Akses API melalui Postman atau aplikasi client API lainnya.

---

Jika ada pertanyaan lebih lanjut atau ingin kontribusi, silakan buat _issue_ di repository ini. Terima kasih!