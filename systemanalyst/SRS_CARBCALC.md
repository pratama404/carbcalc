# Software Requirements Specification (SRS)
## Carbon Calculator App (CarbCalc)

**Version:** 1.0  
**Date:** December 2024  
**Prepared by:** System Analyst Team  
**Organization:** UINSA  

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [External Interface Requirements](#3-external-interface-requirements)
4. [System Features](#4-system-features)
5. [Non-functional Requirements](#5-non-functional-requirements)
6. [Other Requirements](#6-other-requirements)
7. [Appendices](#7-appendices)

---

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|-------------------|---------|
| System Analyst Team | 16 Oktober 2025 | Initial Document Creation | 1.0 |
| System Analyst Team | 17 Oktober 2025 | Added Documentation | 1.1 |
| System Analyst Team | 12 Desember 2024 | Updated with UML Diagrams | 1.2 |

---

## 1. Introduction

### 1.1 Purpose

Dokumen SRS ini secara resmi mendefinisikan seluruh kebutuhan fungsional dan non-fungsional untuk pengembangan Aplikasi Kalkulator Jejak Karbon **"CarbCalc"** versi 1.2. Dokumen ini berfungsi sebagai cetak biru (blueprint) arsitektur dan kontrak bersama yang memastikan semua pihak yang terlibat dalam proyek memiliki pemahaman yang sama, detail, dan terpadu mengenai produk akhir yang akan dihasilkan.

**Ruang lingkup yang dibahas:**
- Aplikasi utama yang berhadapan langsung dengan pengguna (untuk kalkulasi dan pelacakan jejak karbon)
- Panel administratif (untuk pengelolaan data master, pengguna, dan konten)
- Integrasi AI untuk rekomendasi personal
- Fitur social sharing dan gamifikasi

**Tujuan dokumen ini:**
- **Panduan bagi Tim Pengembang**: Menyediakan detail teknis yang jelas mengenai fitur, alur kerja, aturan bisnis, dan batasan yang harus diimplementasikan
- **Batasan Proyek untuk Manajer**: Mendefinisikan ruang lingkup proyek (scope) secara tegas untuk mengendalikan scope creep
- **Dasar Pengujian untuk Tim QA**: Berfungsi sebagai kriteria acuan absolut dalam pembuatan skenario pengujian (test cases)
- **Kejelasan bagi Klien**: Memastikan produk akhir sesuai dengan visi, ekspektasi, dan tujuan bisnis yang telah disepakati

### 1.2 Document Conventions

Untuk menjaga konsistensi dan kemudahan pembacaan, dokumen ini menggunakan konvensi berikut:

| Konvensi | Contoh | Deskripsi |
|----------|--------|-----------|
| Kode Kebutuhan Fungsional | **REQ-F.01** | Format unik untuk kebutuhan fungsional |
| Kode Kebutuhan Non-Fungsional | **REQ-NF.01** | Format unik untuk kebutuhan non-fungsional |
| Prioritas Tinggi | **[Tinggi]** | Fitur wajib untuk rilis awal |
| Prioritas Sedang | **[Sedang]** | Fitur penting untuk rilis berikutnya |
| Prioritas Rendah | **[Rendah]** | Fitur tambahan jika memungkinkan |
| Referensi Diagram | **[Lihat: 03_usecase_diagram.puml]** | Referensi ke file diagram |
| Referensi Use Case | **UC-01** | Kode use case |
| Referensi Activity | **AC-01** | Kode activity |
| Referensi Wireframe | **WF-01** | Kode wireframe |

### 1.3 Intended Audience and Reading Suggestions

**Target Pembaca dan Urutan Baca yang Disarankan:**

#### Klien dan Manajer Proyek
- **Mulai dengan:** Bagian 1 (Introduction) dan Bagian 2 (Overall Description)
- **Fokus pada:** Bagian 4 (System Features) untuk memahami fungsionalitas utama
- **Referensi:** [01_proses_bisnis_asis.puml](01_proses_bisnis_asis.puml) dan [02_proses_bisnis_tobe.puml](02_proses_bisnis_tobe.puml)

#### Tim Desainer UI/UX
- **Mulai dengan:** Bagian 2.3 (User Classes) untuk memahami persona pengguna
- **Fokus pada:** Bagian 3.1 (User Interfaces) dan wireframe references
- **Referensi:** File wireframe WF-01 sampai WF-07 dalam dokumentasi

#### Tim Pengembang (Developer)
- **Baca seluruh dokumen** untuk pemahaman konteks yang utuh
- **Fokus pada:** Bagian 3, 4, dan 5 sebagai panduan teknis utama
- **Referensi:** [09_class_diagram_domain.puml](09_class_diagram_domain.puml), [10_class_diagram_complete.puml](10_class_diagram_complete.puml)

#### Tim Penjaminan Kualitas (QA)
- **Mulai dengan:** Bagian 2 untuk pemahaman umum
- **Fokus pada:** Bagian 4 (System Features) dan Bagian 5 (Non-functional Requirements)
- **Referensi:** [07_sequence_menghitung_jejak_karbon.puml](07_sequence_menghitung_jejak_karbon.puml), [08_sequence_mengelola_rekomendasi.puml](08_sequence_mengelola_rekomendasi.puml)

### 1.4 Product Scope

**CarbCalc** adalah platform digital yang dirancang untuk memberdayakan individu agar dapat memahami dan mengambil tindakan nyata terhadap jejak karbon pribadi mereka. Platform ini berfungsi sebagai asisten lingkungan personal yang menerjemahkan data aktivitas sehari-hari menjadi laporan dampak lingkungan yang sederhana, visual, dan mudah dipahami.

**Manfaat Utama:**
- **Memberikan Kejelasan**: Mengubah data kompleks menjadi skor dampak lingkungan yang jelas dan terukur
- **Mengarahkan Aksi**: Memberikan rekomendasi solusi yang praktis, relevan, dan dipersonalisasi
- **Menjaga Motivasi**: Melalui pelacakan progres dan elemen gamifikasi

**Sasaran Proyek (Versi 1.2):**
- Implementasi kalkulator jejak karbon untuk 4 kategori emisi utama (Transportasi, Energi, Makanan, Limbah)
- Dashboard interaktif dengan visualisasi data yang efektif
- Mesin rekomendasi AI yang memberikan tips relevan dan personal
- Sistem gamifikasi dengan achievement dan social sharing
- Target akuisisi 1.000 pengguna aktif dalam 6 bulan pertama

### 1.5 References

1. **IEEE Std 830-1998** - IEEE Recommended Practice for Software Requirements Specifications
2. **Dokumen Analisis Sistem** - [DOKUMENTASI_SISTEM_CARBCALC.md](DOKUMENTASI_SISTEM_CARBCALC.md)
3. **PlantUML Diagrams** - [PLANTUML_DIAGRAMS.md](PLANTUML_DIAGRAMS.md)
4. **Wireframes Detail** - [WIREFRAMES_DETAIL.md](WIREFRAMES_DETAIL.md)
5. **IPCC Emission Factor Database** - https://www.ipcc-nggip.iges.or.jp/EFDB/
6. **KLHK SIGN-SMART** - http://signsmart.menlhk.go.id/

---

## 2. Overall Description

### 2.1 Product Perspective

CarbCalc adalah produk baru yang sepenuhnya mandiri (self-contained product). Sistem tidak menggantikan aplikasi yang sudah ada dan tidak memiliki ketergantungan fungsional pada perangkat lunak eksternal untuk menjalankan fitur-fitur intinya.

**Diagram Konteks Sistem:** [Lihat: 11_c4_architecture.puml](11_c4_architecture.puml)

**Posisi Produk:**
- **Mandiri**: Seluruh proses dari input hingga laporan dikelola internal
- **Modular**: Arsitektur dirancang untuk integrasi API di masa depan
- **Scalable**: Dapat menangani pertumbuhan pengguna secara horizontal

### 2.2 Product Functions

**Diagram Fungsional Utama:** [Lihat: 03_usecase_diagram.puml](03_usecase_diagram.puml)

**Kelompok Fungsionalitas Utama:**

#### 2.2.1 Manajemen Akun Pengguna
- Pendaftaran akun baru
- Proses login yang aman  
- Pengelolaan profil pribadi
- **Use Case:** UC-01 (Mengelola Autentikasi), UC-02 (Mengelola Profil)

#### 2.2.2 Input dan Kalkulasi Jejak Karbon
- Formulir input aktivitas terpandu
- Kalkulasi otomatis emisi CO₂e
- Validasi data real-time
- **Use Case:** UC-03 (Menghitung Jejak Karbon)
- **Activity Diagram:** [04_activity_diagram_main.puml](04_activity_diagram_main.puml)

#### 2.2.3 Dashboard dan Visualisasi Data
- Dashboard interaktif dengan chart
- Rincian emisi per kategori
- Pelacakan tren historis
- **Use Case:** UC-05 (Melihat Visualisasi Data)
- **Wireframe:** WF-01 (Dashboard Utama)

#### 2.2.4 Rekomendasi AI Personal
- Analisis pola emisi cerdas
- Tips dan saran yang relevan
- Prioritas berdasarkan emisi tertinggi
- **Use Case:** UC-06 (Mengelola Rekomendasi)
- **Sequence Diagram:** [08_sequence_mengelola_rekomendasi.puml](08_sequence_mengelola_rekomendasi.puml)

#### 2.2.5 Rencana Aksi dan Todo Management
- Konversi rekomendasi menjadi todo
- Tracking progress dan reminder
- Sistem prioritas dan deadline
- **Use Case:** UC-07 (Mengelola Rencana Aksi)
- **Activity Breakdown:** [06_activity_breakdown_mengelola_todo.puml](06_activity_breakdown_mengelola_todo.puml)

#### 2.2.6 Social Sharing dan Gamifikasi
- Generate infografis otomatis
- Sharing ke media sosial
- Sistem poin dan achievement
- **Use Case:** UC-08 (Mengelola Berbagi Media Sosial)

#### 2.2.7 Administrasi Sistem
- Pengelolaan data master faktor emisi
- Manajemen pengguna
- Monitoring sistem
- **Use Case:** UC-09 (Mengelola Sistem)

### 2.3 User Classes and Characteristics

**Prioritas Pengguna:**
- **Primer**: Pengguna Terdaftar (target utama)
- **Sekunder**: Pengguna Umum dan Administrator
- **Tersier**: Peneliti Lingkungan

| Karakteristik | Pengguna Umum | Pengguna Terdaftar | Administrator | Peneliti |
|---------------|---------------|-------------------|---------------|----------|
| **Persona** | "Rina, Si Penasaran" | "Budi, Si Berkomitmen" | "Citra, Si Penjaga Sistem" | "Dr. Santoso, Si Analis" |
| **Tujuan** | Eksplorasi dan trial | Tracking rutin dan improvement | Maintenance sistem | Riset dan analisis |
| **Frekuensi** | Jarang (1-2x) | Rutin (mingguan) | Sesuai kebutuhan | Periodik (bulanan) |
| **Keahlian Teknis** | Pemula | Dasar-Menengah | Ahli | Ahli |
| **Hak Akses** | Publik | Pengguna Terotentikasi | Admin Penuh | Akses Terbatas |

### 2.4 Operating Environment

#### 2.4.1 Client-Side Environment
**Hardware:** Tidak ada persyaratan khusus, dapat berjalan di PC, laptop, tablet, smartphone modern

**Operating Systems:**
- Microsoft Windows 10+
- Apple macOS 11+ (Big Sur)
- Google Android 9+ (Pie)
- Apple iOS 14+

**Browsers:** 2 versi mayor terakhir dari:
- Google Chrome
- Mozilla Firefox  
- Apple Safari
- Microsoft Edge

#### 2.4.2 Server-Side Environment
**Hardware Platform:** Cloud computing (AWS, Google Cloud, atau VPS)
- CPU: 2 vCPU
- RAM: 4 GB
- Storage: 50 GB SSD
- Scalable horizontal dan vertikal

**Operating System:** Linux Ubuntu Server 22.04 LTS

**Software Stack:**
- Web Server: Nginx (atau Vercel serverless untuk MVP)
- Runtime: Node.js 18.x LTS
- Database: MongoDB v8.0
- Cache: Redis untuk session management

### 2.5 Design and Implementation Constraints

#### [C-01] Kepatuhan UU Pelindungan Data Pribadi (PDP)
**Batasan:** Sistem harus mematuhi UU No. 27 Tahun 2022 tentang PDP
**Rasional:** Kepatuhan hukum, perlindungan privasi, dan membangun kepercayaan publik

#### [C-02] Teknologi yang Ditetapkan
**Batasan:** 
- Backend: Node.js (LTS)
- Database: MongoDB (stable)
- Frontend: React/Next.js
**Rasional:** Standardisasi tech stack, leverage existing expertise, long-term support

#### [C-03] Bahasa dan Internasionalisasi
**Batasan:** Bahasa Indonesia untuk rilis awal, arsitektur i18n-ready
**Rasional:** Target pasar Indonesia, skalabilitas global masa depan

#### [C-04] Desain Responsif
**Batasan:** UI responsif untuk mobile (<768px), tablet (768-1024px), desktop (>1024px)
**Rasional:** Konsistensi UX di semua perangkat

#### [C-05] Keamanan Komunikasi
**Batasan:** Seluruh komunikasi wajib HTTPS (TLS 1.2+)
**Rasional:** Perlindungan data transit, standar keamanan modern

#### [C-06] Standar Pemrograman
**Batasan:** Coding style guide (Airbnb JavaScript), Git Flow branching
**Rasional:** Kualitas kode, kolaborasi tim, maintainability

### 2.6 User Documentation

**Komponen Dokumentasi:**

1. **Pusat Bantuan Terintegrasi**
   - Portal utama untuk semua dokumentasi
   - Fungsi pencarian
   - Kategorisasi berdasarkan fitur

2. **Tutorial Step-by-Step**
   - Panduan untuk pengguna baru
   - Screenshots dengan anotasi
   - Video/GIF pendukung

3. **FAQ (Frequently Asked Questions)**
   - Pertanyaan umum dengan jawaban jelas
   - Pengelompokan berdasarkan kategori
   - Fitur pencarian

4. **Bantuan Kontekstual**
   - Tooltips dan ikon bantuan
   - Pop-up info singkat
   - Terintegrasi dalam UI

5. **Catatan Rilis**
   - Log pembaruan aplikasi
   - Informasi fitur baru dan perbaikan
   - Accessible dari menu Settings

### 2.7 Assumptions and Dependencies

#### Assumptions
**[A-01] Konektivitas dan Perangkat Pengguna**
- Target pengguna memiliki akses internet stabil
- Perangkat memadai untuk browser modern

**[A-02] Literasi Digital Pengguna**
- Pengguna memiliki literasi digital dasar
- Mampu navigasi web dan interpretasi grafik sederhana

**[A-03] Ketersediaan Sumber Daya Tim**
- Tim kunci tersedia sesuai jadwal
- Tidak ada kendala resource yang signifikan

#### Dependencies
**[D-01] Data Faktor Emisi**
- Bergantung pada validitas data KLHK dan IPCC
- Pembaruan berkala diperlukan untuk akurasi

**[D-02] Layanan Pihak Ketiga**
- Email service (SendGrid/Mailgun)
- AI service (Google Gemini)
- Social media APIs

**[D-03] Open Source Software**
- Node.js, MongoDB, React ecosystem
- Terikat pada lisensi dan security updates

---

## 3. External Interface Requirements

### 3.1 User Interfaces

**Filosofi Desain:**
- **Bersih dan Minimalis**: Bebas dari kekacauan visual
- **Memotivasi dan Positif**: Suportif, tidak menghakimi
- **Terpandu dan Intuitif**: Mudah digunakan tanpa training
- **Berbasis Data Visual**: Informasi key dalam bentuk grafik

**Standar dan Panduan:**
- **Responsivitas**: 3 breakpoint utama (mobile, tablet, desktop)
- **Navigasi Konsisten**: Menu utama di seluruh halaman
- **Tombol Standar**: Desain seragam untuk aksi utama
- **Pesan Sistem**: Notifikasi konsisten (success, error, warning)

**Komponen UI Utama:**
- **Halaman Publik**: Landing, Login, Registrasi, Artikel Edukasi
- **Halaman Pengguna**: Dashboard, Kalkulator, Riwayat, Profil, Rekomendasi, Todo, Sharing
- **Panel Admin**: Dashboard Admin, Manajemen Data, User Management

**Referensi Wireframe:** [WIREFRAMES_DETAIL.md](WIREFRAMES_DETAIL.md)
- WF-01: Dashboard Utama
- WF-02: Kalkulator Karbon
- WF-03: Halaman Rekomendasi
- WF-04: Rencana Aksi (Todo)
- WF-05: Sharing Media Sosial
- WF-06: Profil Pengguna
- WF-07: Laporan & Analytics

### 3.2 Hardware Interfaces

Tidak ada antarmuka langsung ke komponen hardware spesifik. Sebagai aplikasi web, interaksi dengan hardware (processor, memory, display, keyboard, mouse) sepenuhnya diabstraksi oleh OS dan browser. Persyaratan hardware minimum telah dijelaskan di Bagian 2.4.

### 3.3 Software Interfaces

#### 3.3.1 Internal Software Interfaces

**Antarmuka Aplikasi ke Database:**
- **Deskripsi**: Backend berkomunikasi dengan MongoDB server
- **Tujuan**: Operasi CRUD untuk semua data (users, activities, recommendations, etc.)
- **Mekanisme**: MongoDB driver untuk Node.js, koneksi aman via MongoDB protocol
- **Referensi**: [09_class_diagram_domain.puml](09_class_diagram_domain.puml)

**Antarmuka Client ke Server (API):**
- **Deskripsi**: Frontend berkomunikasi dengan backend via RESTful API
- **Tujuan**: Data exchange untuk semua operasi user
- **Mekanisme**: HTTP/HTTPS dengan JSON format
- **Referensi**: [07_sequence_menghitung_jejak_karbon.puml](07_sequence_menghitung_jejak_karbon.puml)

#### 3.3.2 External Software Interfaces

**Google Gemini AI API:**
- **Tujuan**: Generate personalized recommendations
- **Data Input**: User profile dan activity data
- **Data Output**: AI-generated recommendations
- **Format**: JSON via HTTPS REST API

**Social Media APIs:**
- **Twitter/X API**: Untuk sharing achievements
- **Instagram API**: Untuk sharing infographics
- **Format**: OAuth 2.0 authentication, JSON responses

### 3.4 Communications Interfaces

**Client-Server Communication:**
- **Protocol**: HTTP/2 over TLS (HTTPS)
- **Security**: TLS 1.2+ mandatory untuk semua komunikasi
- **Format**: JSON untuk data exchange
- **Authentication**: JWT tokens untuk session management

**Database Communication:**
- **Protocol**: MongoDB wire protocol
- **Security**: Encrypted connections, authentication required
- **Connection Pooling**: Untuk optimasi performance

**External API Communication:**
- **Protocol**: HTTPS REST APIs
- **Authentication**: API keys, OAuth 2.0 where applicable
- **Rate Limiting**: Respect third-party API limits
- **Error Handling**: Graceful degradation jika service unavailable

---

## 4. System Features

### 4.1 Manajemen Autentikasi (UC-01)

**Deskripsi:** Sistem untuk mengelola identitas dan akses pengguna ke aplikasi

**Priority:** [Tinggi]

**Functional Requirements:**

**REQ-F.01** [Tinggi] Sistem harus menyediakan form registrasi untuk pengguna baru
- Input: Email, password, nama lengkap, konfirmasi password
- Validasi: Email format valid, password minimal 8 karakter, email belum terdaftar
- Output: Akun pengguna baru terbuat, email konfirmasi dikirim

**REQ-F.02** [Tinggi] Sistem harus menyediakan form login untuk pengguna terdaftar
- Input: Email dan password
- Validasi: Kredensial valid, akun aktif
- Output: Session token, redirect ke dashboard

**REQ-F.03** [Sedang] Sistem harus menyediakan fitur reset password
- Input: Email pengguna
- Process: Generate reset token, kirim email reset
- Output: Link reset password valid 24 jam

**REQ-F.04** [Tinggi] Sistem harus menyediakan fitur logout
- Process: Invalidate session token
- Output: Redirect ke halaman login

**Referensi Diagram:**
- Use Case: [03_usecase_diagram.puml](03_usecase_diagram.puml) - UC-01
- Activity: [04_activity_diagram_main.puml](04_activity_diagram_main.puml) - AC-01 sampai AC-06

### 4.2 Menghitung Jejak Karbon (UC-03)

**Deskripsi:** Fitur inti untuk menghitung emisi CO2e berdasarkan aktivitas pengguna

**Priority:** [Tinggi]

**Functional Requirements:**

**REQ-F.05** [Tinggi] Sistem harus menyediakan form input untuk 4 kategori aktivitas:
- **Transportasi**: Jenis kendaraan, jarak, bahan bakar, jumlah penumpang
- **Energi**: Konsumsi listrik (kWh), gas, heating/cooling
- **Makanan**: Jenis makanan, porsi/berat, frekuensi konsumsi  
- **Limbah**: Jenis limbah, berat/volume, metode pembuangan

**REQ-F.06** [Tinggi] Sistem harus melakukan kalkulasi otomatis emisi CO2e
- Process: Ambil faktor emisi dari database, kalkulasi (jumlah × faktor)
- Validasi: Data input valid, faktor emisi tersedia
- Output: Nilai emisi dalam kg CO2e per aktivitas

**REQ-F.07** [Tinggi] Sistem harus menyimpan data aktivitas dengan timestamp
- Data: User ID, kategori, jenis aktivitas, jumlah, unit, emisi, tanggal
- Validasi: User terotentikasi, data lengkap
- Output: Data tersimpan, ID aktivitas generated

**REQ-F.08** [Sedang] Sistem harus menampilkan hasil perhitungan dengan breakdown
- Output: Total emisi hari ini, breakdown per kategori, perbandingan dengan target
- Format: Angka dengan unit, persentase, status indicator (baik/warning/buruk)

**Referensi Diagram:**
- Use Case: [03_usecase_diagram.puml](03_usecase_diagram.puml) - UC-03
- Activity: [05_activity_breakdown_menghitung.puml](05_activity_breakdown_menghitung.puml)
- Sequence: [07_sequence_menghitung_jejak_karbon.puml](07_sequence_menghitung_jejak_karbon.puml)
- Wireframe: WF-02 (Kalkulator Karbon)

### 4.3 Mengelola Rekomendasi AI (UC-06)

**Deskripsi:** Sistem AI untuk memberikan rekomendasi personal pengurangan emisi

**Priority:** [Tinggi]

**Functional Requirements:**

**REQ-F.09** [Tinggi] Sistem harus menganalisis pola emisi pengguna
- Input: Data aktivitas 30 hari terakhir, profil pengguna
- Process: Identifikasi kategori emisi tertinggi, pola aktivitas
- Output: Analysis result untuk input ke AI

**REQ-F.10** [Tinggi] Sistem harus generate rekomendasi menggunakan AI
- Integration: Google Gemini API
- Input: User analysis result
- Output: List rekomendasi dengan prioritas, estimasi pengurangan CO2e

**REQ-F.11** [Tinggi] Sistem harus menampilkan rekomendasi dengan kategori kesulitan
- **Easy**: 2-5 kg CO2e reduction/month, minimal effort
- **Medium**: 8-15 kg CO2e reduction/month, moderate effort  
- **Hard**: 20+ kg CO2e reduction/month, significant effort
- Format: Title, description, estimated reduction, difficulty, cost estimate

**REQ-F.12** [Sedang] Sistem harus memungkinkan pengguna menandai rekomendasi sebagai implemented
- Input: Recommendation ID, implementation date
- Process: Update status, calculate actual impact
- Output: Updated recommendation status, progress tracking

**Referensi Diagram:**
- Use Case: [03_usecase_diagram.puml](03_usecase_diagram.puml) - UC-06
- Sequence: [08_sequence_mengelola_rekomendasi.puml](08_sequence_mengelola_rekomendasi.puml)
- Wireframe: WF-03 (Halaman Rekomendasi)

### 4.4 Mengelola Rencana Aksi (UC-07)

**Deskripsi:** Sistem todo management untuk mengkonversi rekomendasi menjadi actionable tasks

**Priority:** [Sedang]

**Functional Requirements:**

**REQ-F.13** [Sedang] Sistem harus memungkinkan pembuatan todo dari rekomendasi
- Input: Recommendation ID, custom title/description, target date, priority
- Process: Create todo item, link to recommendation
- Output: Todo item created, reminder set

**REQ-F.14** [Sedang] Sistem harus menyediakan todo management
- **Create**: Manual todo creation
- **Read**: List todos dengan filter (status, priority, category)
- **Update**: Edit todo details, change status/priority
- **Delete**: Remove todo dengan konfirmasi

**REQ-F.15** [Sedang] Sistem harus melakukan progress tracking
- Metrics: Completion rate, average completion time, CO2e saved
- Status: Pending, In Progress, Completed, Cancelled, Overdue
- Output: Progress dashboard, statistics, achievements

**REQ-F.16** [Rendah] Sistem harus menyediakan reminder dan notifikasi
- Trigger: Target date approaching, overdue tasks
- Method: In-app notification, email (optional)
- Frequency: Configurable per user

**Referensi Diagram:**
- Use Case: [03_usecase_diagram.puml](03_usecase_diagram.puml) - UC-07
- Activity: [06_activity_breakdown_mengelola_todo.puml](06_activity_breakdown_mengelola_todo.puml)
- Wireframe: WF-04 (Rencana Aksi)

### 4.5 Visualisasi Data dan Dashboard (UC-05)

**Deskripsi:** Dashboard interaktif untuk menampilkan data emisi dan progress pengguna

**Priority:** [Tinggi]

**Functional Requirements:**

**REQ-F.17** [Tinggi] Sistem harus menampilkan dashboard utama dengan overview
- **Today's Summary**: Total emisi hari ini, status vs target
- **Monthly Progress**: Progress bulanan, trend chart
- **Achievements**: Level, eco points, badges earned
- **Quick Actions**: Shortcut ke kalkulator, rekomendasi

**REQ-F.18** [Tinggi] Sistem harus menyediakan visualisasi data dengan charts
- **Pie Chart**: Breakdown emisi per kategori
- **Line Chart**: Trend emisi historis (daily, weekly, monthly)
- **Bar Chart**: Perbandingan periode (month-to-month)
- **Progress Bar**: Target achievement, todo completion

**REQ-F.19** [Sedang] Sistem harus menyediakan historical data dan analytics
- **Time Range**: Filter by date range (last 7 days, 30 days, 3 months, 1 year)
- **Category Filter**: Filter by emission category
- **Export**: Download data as CSV/PDF
- **Comparison**: Compare with previous periods

**REQ-F.20** [Sedang] Sistem harus menampilkan insights dan recommendations
- **Best/Worst Days**: Identify patterns
- **Category Analysis**: Which category needs attention
- **Goal Tracking**: Progress towards reduction targets
- **Achievements**: Milestones reached, badges earned

**Referensi Diagram:**
- Use Case: [03_usecase_diagram.puml](03_usecase_diagram.puml) - UC-05
- Wireframe: WF-01 (Dashboard Utama), WF-07 (Laporan & Analytics)

### 4.6 Social Sharing dan Gamifikasi (UC-08)

**Deskripsi:** Fitur untuk berbagi pencapaian dan memotivasi pengguna melalui gamifikasi

**Priority:** [Sedang]

**Functional Requirements:**

**REQ-F.21** [Sedang] Sistem harus generate infografis untuk sharing
- **Templates**: Daily summary, monthly report, achievement badge, milestone
- **Customization**: Background, style, personal message
- **Data**: User stats, progress, achievements
- **Output**: PNG/JPG image, optimized for social media

**REQ-F.22** [Sedang] Sistem harus menyediakan social media integration
- **Platforms**: Twitter/X, Instagram, Facebook, LinkedIn
- **Content**: Auto-generated post dengan image dan hashtags
- **Tracking**: Share count, engagement metrics
- **Privacy**: User control over what to share

**REQ-F.23** [Rendah] Sistem harus mengimplementasikan gamifikasi
- **Points System**: Eco points untuk setiap aktivitas dan achievement
- **Levels**: User level berdasarkan total points dan consistency
- **Badges**: Achievement badges untuk milestones tertentu
- **Challenges**: Weekly/monthly challenges dengan rewards

**REQ-F.24** [Rendah] Sistem harus menyediakan achievement system
- **Categories**: First steps, consistency, reduction, social sharing
- **Criteria**: Specific measurable goals
- **Rewards**: Points, badges, special features unlock
- **Progress**: Track progress towards achievements

**Referensi Diagram:**
- Use Case: [03_usecase_diagram.puml](03_usecase_diagram.puml) - UC-08
- Wireframe: WF-05 (Sharing Media Sosial)

### 4.7 Manajemen Profil Pengguna (UC-02)

**Deskripsi:** Sistem untuk mengelola profil dan preferensi pengguna

**Priority:** [Sedang]

**Functional Requirements:**

**REQ-F.25** [Sedang] Sistem harus menyediakan profile management
- **Basic Info**: Name, email, profile picture, location
- **Household**: Household size, income range, housing type
- **Preferences**: Notification settings, privacy settings, language
- **Goals**: Carbon reduction targets, focus areas

**REQ-F.26** [Sedang] Sistem harus menampilkan user statistics
- **Carbon Footprint**: Total, average, trends
- **Achievements**: Badges earned, points, level
- **Activity**: Login streak, data entry consistency
- **Social**: Shares, community ranking

**REQ-F.27** [Rendah] Sistem harus menyediakan privacy controls
- **Profile Visibility**: Public, private, friends only
- **Data Sharing**: Opt-in for research, analytics
- **Social Features**: Control over social sharing
- **Account**: Delete account, export data

**Referensi Diagram:**
- Use Case: [03_usecase_diagram.puml](03_usecase_diagram.puml) - UC-02
- Wireframe: WF-06 (Profil Pengguna)

### 4.8 Administrasi Sistem (UC-09)

**Deskripsi:** Panel admin untuk mengelola sistem, data master, dan pengguna

**Priority:** [Tinggi]

**Functional Requirements:**

**REQ-F.28** [Tinggi] Sistem harus menyediakan admin dashboard
- **System Health**: Server status, database status, API status
- **User Metrics**: Total users, active users, new registrations
- **Data Metrics**: Total activities, calculations performed
- **Performance**: Response times, error rates

**REQ-F.29** [Tinggi] Sistem harus menyediakan emission factor management
- **CRUD Operations**: Create, read, update, delete emission factors
- **Categories**: Transportation, energy, food, waste
- **Validation**: Source verification, value ranges
- **Versioning**: Track changes, effective dates

**REQ-F.30** [Sedang] Sistem harus menyediakan user management
- **User List**: Search, filter, pagination
- **User Details**: Profile, activity history, issues
- **Actions**: Activate/deactivate, reset password, delete
- **Roles**: Assign roles (User, Premium, Admin, Researcher)

**REQ-F.31** [Sedang] Sistem harus menyediakan system monitoring
- **Logs**: Application logs, error logs, access logs
- **Analytics**: Usage patterns, popular features
- **Reports**: System performance, user engagement
- **Alerts**: System issues, security concerns

**Referensi Diagram:**
- Use Case: [03_usecase_diagram.puml](03_usecase_diagram.puml) - UC-09

---

## 5. Non-functional Requirements

### 5.1 Performance Requirements

**[PERF-01] Dashboard Loading Time** [Tinggi]
- **Requirement**: Dashboard utama beserta chart dan grafik harus dimuat sepenuhnya dalam waktu kurang dari 2 detik pada koneksi 4G
- **Rationale**: Dashboard adalah halaman yang paling sering diakses, waktu muat cepat krusial untuk retensi pengguna
- **Measurement**: Time to Interactive (TTI) < 2 seconds

**[PERF-02] API Response Time** [Tinggi]  
- **Requirement**: Waktu respons API untuk kalkulasi dan penyimpanan data aktivitas harus < 500ms
- **Rationale**: Feedback instan setelah submit data memberikan kesan aplikasi responsif
- **Measurement**: 95th percentile response time < 500ms

**[PERF-03] Concurrent User Capacity** [Sedang]
- **Requirement**: Sistem harus menangani 100 concurrent users dengan degradasi performa maksimal 20%
- **Rationale**: Stabilitas saat lonjakan penggunaan dan persiapan pertumbuhan pengguna
- **Measurement**: Load testing dengan 100 concurrent users

### 5.2 Safety Requirements

Perangkat lunak CarbCalc tidak mengontrol hardware fisik dan tidak beroperasi dalam konteks yang dapat menyebabkan kerugian fisik, kerusakan properti, atau bahaya lingkungan secara langsung. Oleh karena itu, tidak ada safety requirements spesifik yang berlaku.

### 5.3 Security Requirements

**[SEC-01] Password Storage** [Tinggi]
- **Requirement**: Semua password pengguna wajib disimpan dalam format hash menggunakan algoritma modern (Argon2, bcrypt) dengan salt
- **Rationale**: Mencegah kebocoran kredensial jika terjadi data breach
- **Implementation**: bcrypt dengan salt rounds minimum 12

**[SEC-02] Role-Based Access Control (RBAC)** [Tinggi]
- **Requirement**: Implementasi RBAC yang ketat dengan pemisahan hak akses berdasarkan role
- **Roles**: User, Premium, Government, Admin, Researcher
- **Implementation**: Middleware authorization pada setiap protected endpoint

**[SEC-03] OWASP Top 10 Protection** [Tinggi]
- **Requirement**: Perlindungan dari kerentanan OWASP Top 10 termasuk SQL Injection, XSS, CSRF
- **Implementation**: Input validation, output encoding, CSRF tokens, parameterized queries
- **Testing**: Security scanning dan penetration testing

**[SEC-04] Data Transmission Security** [Tinggi]
- **Requirement**: Seluruh komunikasi client-server wajib menggunakan HTTPS (TLS 1.2+)
- **Implementation**: SSL certificate, HSTS headers, secure cookie flags
- **Monitoring**: Certificate expiry monitoring

### 5.4 Software Quality Attributes

**[QUAL-01] Usability** [Tinggi]
- **Requirement**: Pengguna baru harus dapat menyelesaikan alur kerja utama (registrasi → input aktivitas pertama) dalam < 3 menit tanpa bantuan
- **Measurement**: Usability testing dengan target users
- **Success Criteria**: 80% test users berhasil dalam waktu yang ditentukan

**[QUAL-02] Reliability** [Tinggi]
- **Requirement**: Sistem harus memiliki uptime 99.5% per bulan (excluding scheduled maintenance)
- **Measurement**: Monitoring tools, SLA tracking
- **Maintenance Window**: Announced 24 hours in advance

**[QUAL-03] Maintainability** [Sedang]
- **Requirement**: Code harus mengikuti coding standards dengan unit test coverage minimal 70% untuk business logic
- **Standards**: ESLint configuration, Prettier formatting
- **Testing**: Jest untuk unit testing, coverage reports

**[QUAL-04] Scalability** [Sedang]
- **Requirement**: Arsitektur harus dapat menangani pertumbuhan 50% user per tahun dengan horizontal scaling
- **Implementation**: Microservices architecture, database sharding capability
- **Monitoring**: Performance metrics, capacity planning

### 5.5 Business Rules

**[BR-01] Emission Factor Validity** [Tinggi]
- **Rule**: Setiap perhitungan jejak karbon wajib menggunakan faktor emisi yang valid dan aktif pada saat perhitungan
- **Implementation**: Database constraint, validation logic
- **Exception Handling**: Fallback ke faktor emisi default jika specific factor tidak tersedia

**[BR-02] Unique Email Registration** [Tinggi]
- **Rule**: Satu alamat email hanya dapat digunakan untuk satu akun pengguna
- **Implementation**: Database unique constraint, validation pada registration
- **Error Handling**: Clear error message untuk duplicate email

**[BR-03] Data Privacy** [Tinggi]
- **Rule**: Pengguna hanya dapat melihat dan mengelola data aktivitas miliknya sendiri
- **Implementation**: User ID validation pada setiap data access
- **Exception**: Admin dapat melihat data untuk support purposes dengan audit log

**[BR-04] Admin Privileges** [Tinggi]
- **Rule**: Hanya Administrator yang dapat melakukan operasi write pada emission factors
- **Implementation**: Role-based authorization middleware
- **Audit**: Log semua perubahan data master dengan timestamp dan user ID

**[BR-05] Research Data Access** [Sedang]
- **Rule**: Peneliti hanya dapat mengakses data agregat yang telah dianonimkan
- **Implementation**: Separate API endpoints dengan data aggregation
- **Privacy**: Remove all personally identifiable information

---

## 6. Other Requirements

### 6.1 Database Requirements

**[DB-01] Data Integrity** [Tinggi]
- **Requirement**: Semua relasi antar tabel harus ditegakkan menggunakan foreign key constraints
- **Implementation**: MongoDB references dengan validation
- **Example**: Aktivitas emisi tidak dapat dibuat tanpa user_id yang valid

**[DB-02] Backup and Recovery** [Tinggi]
- **Requirement**: Automated daily backup dengan retention policy 14 hari minimum
- **Storage**: Secure, replicated backup location
- **Recovery**: Documented dan tested recovery procedures
- **RTO/RPO**: Recovery Time Objective < 4 hours, Recovery Point Objective < 1 hour

### 6.2 Internationalization Requirements

**[I18N-01] Text Separation** [Sedang]
- **Requirement**: Semua user-facing text tidak boleh hardcoded, harus disimpan dalam resource files
- **Implementation**: i18n framework (react-i18next), JSON language files
- **Languages**: Bahasa Indonesia untuk rilis awal, English untuk future release

**[I18N-02] Character Encoding** [Sedang]
- **Requirement**: Seluruh sistem harus menggunakan UTF-8 encoding
- **Implementation**: Database charset, API headers, frontend meta tags
- **Support**: International character sets untuk future expansion

### 6.3 Legal and Compliance Requirements

**[LEGAL-01] Privacy Policy and Terms of Service** [Tinggi]
- **Requirement**: Aplikasi wajib menampilkan dokumen "Privacy Policy" dan "Terms of Service"
- **Compliance**: Sesuai UU PDP No. 27 Tahun 2022
- **Accessibility**: Mudah diakses dari footer dan registration flow
- **Updates**: Versioning dan notification untuk perubahan

**[LEGAL-02] Intellectual Property** [Tinggi]
- **Requirement**: Semua kode sumber, desain, dan konten original merupakan IP milik project owner
- **Documentation**: Copyright notices, license files
- **Third-party**: Proper attribution untuk open source dependencies

---

## 7. Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface - protokol komunikasi antar komponen software |
| **CO₂e** | Carbon Dioxide Equivalent - unit standar untuk mengukur jejak karbon |
| **CRUD** | Create, Read, Update, Delete - operasi dasar database |
| **Faktor Emisi** | Koefisien untuk mengkonversi aktivitas menjadi emisi gas rumah kaca |
| **IPCC** | Intergovernmental Panel on Climate Change - badan ilmiah PBB untuk iklim |
| **Jejak Karbon** | Total emisi gas rumah kaca dari suatu aktivitas/individu |
| **KLHK** | Kementerian Lingkungan Hidup dan Kehutanan RI |
| **LTS** | Long-Term Support - versi software dengan dukungan jangka panjang |
| **SRS** | Software Requirements Specification - dokumen spesifikasi kebutuhan |
| **UI/UX** | User Interface/User Experience - antarmuka dan pengalaman pengguna |

### Appendix B: Analysis Models

Dokumen ini didukung oleh serangkaian model analisis visual yang memberikan representasi grafis dari sistem:

#### B.1 Process Models
- **AS-IS Process**: [01_proses_bisnis_asis.puml](01_proses_bisnis_asis.puml)
- **TO-BE Process**: [02_proses_bisnis_tobe.puml](02_proses_bisnis_tobe.puml)

#### B.2 Use Case Models  
- **Use Case Diagram**: [03_usecase_diagram.puml](03_usecase_diagram.puml)
- **Use Case Specifications**: Detailed dalam Section 4 (System Features)

#### B.3 Activity Models
- **Main Activity**: [04_activity_diagram_main.puml](04_activity_diagram_main.puml)
- **Calculate Carbon**: [05_activity_breakdown_menghitung.puml](05_activity_breakdown_menghitung.puml)
- **Manage Todo**: [06_activity_breakdown_mengelola_todo.puml](06_activity_breakdown_mengelola_todo.puml)

#### B.4 Sequence Models
- **Calculate Carbon**: [07_sequence_menghitung_jejak_karbon.puml](07_sequence_menghitung_jejak_karbon.puml)
- **Manage Recommendations**: [08_sequence_mengelola_rekomendasi.puml](08_sequence_mengelola_rekomendasi.puml)

#### B.5 Class Models
- **Domain Model**: [09_class_diagram_domain.puml](09_class_diagram_domain.puml)
- **Complete System**: [10_class_diagram_complete.puml](10_class_diagram_complete.puml)

#### B.6 Architecture Models
- **C4 Context**: [11_c4_architecture.puml](11_c4_architecture.puml)
- **C4 Container**: [12_c4_container.puml](12_c4_container.puml)
- **Deployment**: [13_deployment_diagram.puml](13_deployment_diagram.puml)

#### B.7 Data Flow Models
- **DFD Level 0**: [14_data_flow_diagram.puml](14_data_flow_diagram.puml)
- **DFD Level 1**: [15_data_flow_level1.puml](15_data_flow_level1.puml)

#### B.8 User Interface Models (PlantUML Salt Wireframes)
- **Dashboard**: [16_wireframe_dashboard.puml](16_wireframe_dashboard.puml) - WF-01
- **Calculator**: [17_wireframe_calculator.puml](17_wireframe_calculator.puml) - WF-02
- **Recommendations**: [18_wireframe_recommendations.puml](18_wireframe_recommendations.puml) - WF-03
- **Todo/Action Plans**: [19_wireframe_todo.puml](19_wireframe_todo.puml) - WF-04
- **Social Sharing**: [20_wireframe_sharing.puml](20_wireframe_sharing.puml) - WF-05
- **User Profile**: [21_wireframe_profile.puml](21_wireframe_profile.puml) - WF-06
- **Reports & Analytics**: [22_wireframe_reports.puml](22_wireframe_reports.puml) - WF-07
- **Wireframe-Class Mapping**: [23_wireframe_class_mapping.puml](23_wireframe_class_mapping.puml)

#### B.9 Marketing & Landing Pages (Advanced UI)
- **Creative Landing Page**: [24_wireframe_landing_page.puml](24_wireframe_landing_page.puml) - WF-08
- **Advanced Dashboard**: [25_wireframe_dashboard_advanced.puml](25_wireframe_dashboard_advanced.puml) - WF-09
- **Competitor Comparison**: [26_wireframe_competitor_comparison.puml](26_wireframe_competitor_comparison.puml) - WF-10

#### B.9 Additional Documentation
- **Complete PlantUML Collection**: [PLANTUML_DIAGRAMS.md](PLANTUML_DIAGRAMS.md)
- **Detailed Wireframes**: [WIREFRAMES_DETAIL.md](WIREFRAMES_DETAIL.md)
- **System Documentation**: [DOKUMENTASI_SISTEM_CARBCALC.md](DOKUMENTASI_SISTEM_CARBCALC.md)

### Appendix C: To Be Determined List

Item yang masih memerlukan diskusi dan keputusan lebih lanjut:

**[TBD-01]** Desain final dan skema warna untuk branding aplikasi CarbCalc

**[TBD-02]** Mekanisme detail sistem poin dan desain visual untuk gamifikasi (badges/achievements)

**[TBD-03]** Pemilihan final penyedia layanan email untuk notifikasi sistem (SendGrid vs Mailgun vs alternatives)

**[TBD-04]** Strategi teknis dan jadwal untuk pembaruan data faktor emisi secara berkala

**[TBD-05]** Teks final untuk "Privacy Policy" dan "Terms of Service" yang akan direview oleh konsultan hukum

**[TBD-06]** Integrasi dengan payment gateway untuk fitur Premium (future release)

**[TBD-07]** Mobile app development roadmap dan platform prioritas (iOS vs Android)

---

### Appendix D: Diagram Index

Daftar lengkap semua diagram PlantUML yang mendukung SRS ini:

| No | File | Type | Description | Related UC |
|----|------|------|-------------|------------|
| 01 | 01_proses_bisnis_asis.puml | Process | AS-IS business process | - |
| 02 | 02_proses_bisnis_tobe.puml | Process | TO-BE business process | - |
| 03 | 03_usecase_diagram.puml | Use Case | Complete use case diagram | UC-01 to UC-10 |
| 04 | 04_activity_diagram_main.puml | Activity | Main process activity | UC-03, UC-06, UC-07 |
| 05 | 05_activity_breakdown_menghitung.puml | Activity | Calculate carbon breakdown | UC-03 |
| 06 | 06_activity_breakdown_mengelola_todo.puml | Activity | Manage todo breakdown | UC-07 |
| 07 | 07_sequence_menghitung_jejak_karbon.puml | Sequence | Calculate carbon sequence | UC-03 |
| 08 | 08_sequence_mengelola_rekomendasi.puml | Sequence | Manage recommendations | UC-06 |
| 09 | 09_class_diagram_domain.puml | Class | Domain model classes | All UCs |
| 10 | 10_class_diagram_complete.puml | Class | Complete system classes | All UCs |
| 11 | 11_c4_architecture.puml | Architecture | C4 context diagram | System level |
| 12 | 12_c4_container.puml | Architecture | C4 container diagram | System level |
| 13 | 13_deployment_diagram.puml | Deployment | Production deployment | System level |
| 14 | 14_data_flow_diagram.puml | Data Flow | DFD Level 0 | System level |
| 15 | 15_data_flow_level1.puml | Data Flow | DFD Level 1 | Functional level |
| 16 | 16_wireframe_dashboard.puml | Wireframe | Dashboard UI (Salt) | UC-05 |
| 17 | 17_wireframe_calculator.puml | Wireframe | Calculator UI (Salt) | UC-03 |
| 18 | 18_wireframe_recommendations.puml | Wireframe | Recommendations UI (Salt) | UC-06 |
| 19 | 19_wireframe_todo.puml | Wireframe | Todo management UI (Salt) | UC-07 |
| 20 | 20_wireframe_sharing.puml | Wireframe | Social sharing UI (Salt) | UC-08 |
| 21 | 21_wireframe_profile.puml | Wireframe | User profile UI (Salt) | UC-02 |
| 22 | 22_wireframe_reports.puml | Wireframe | Reports & analytics UI (Salt) | UC-05 |
| 23 | 23_wireframe_class_mapping.puml | Mapping | Wireframe to class mapping | All UCs |
| 24 | 24_wireframe_landing_page.puml | Wireframe | Creative landing page with 3D | Marketing |
| 25 | 25_wireframe_dashboard_advanced.puml | Wireframe | Advanced interactive dashboard | UC-05 |
| 26 | 26_wireframe_competitor_comparison.puml | Wireframe | Detailed competitor analysis | Marketing |

**Total Diagrams: 26 files**

**Diagram Coverage:**
- ✅ Process Models: AS-IS, TO-BE
- ✅ Use Case Models: Complete diagram with breakdown
- ✅ Activity Models: Main flow + detailed breakdowns
- ✅ Sequence Models: Key interactions
- ✅ Class Models: Domain + complete system
- ✅ Architecture Models: C4 context, container, deployment
- ✅ Data Flow Models: Level 0 and Level 1
- ✅ UI Models: Complete wireframes using PlantUML Salt
- ✅ Traceability: Mapping between UI and domain models

---

## Document Control

**Document Status:** Final Draft v1.2  
**Review Status:** Pending Stakeholder Review  
**Approval Status:** Pending  
**Next Review Date:** January 2025  

**Distribution List:**
- Project Manager
- Development Team Lead  
- UI/UX Designer
- QA Team Lead
- Client Representative
- System Architect

---

*This document is confidential and proprietary. Distribution is restricted to authorized personnel only.*