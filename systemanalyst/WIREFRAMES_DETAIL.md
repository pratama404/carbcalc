# WIREFRAMES DETAIL - CARBON CALCULATOR APP

## Konsistensi Penamaan dan Kode

Setiap wireframe menggunakan kode yang konsisten dengan Activity Diagram dan Sequence Diagram:
- **WF-01**: Dashboard Utama
- **WF-02**: Kalkulator Karbon  
- **WF-03**: Halaman Rekomendasi
- **WF-04**: Rencana Aksi (Todo)
- **WF-05**: Sharing Media Sosial
- **WF-06**: Profil Pengguna
- **WF-07**: Laporan & Analytics

---

## WF-01: DASHBOARD UTAMA

```
+================================================================+
|  🌱 CarbCalc                    👤 John Doe    🔔 (3)        |
+================================================================+
| 📊 Dashboard | 🧮 Calculator | 📈 Reports | 🌐 Social | ⚙️   |
+================================================================+
|                                                                |
| Selamat datang kembali, John! 👋                             |
| Hari ini: Selasa, 12 Desember 2024                           |
|                                                                |
| +==================+ +==================+ +==================+ |
| | 📊 HARI INI       | | 📅 BULAN INI     | | 🏆 PENCAPAIAN    | |
| |                  | |                  | |                  | |
| | 8.2 kg CO2e      | | 245 kg CO2e      | | Level 3          | |
| | +1.5 dari kemarin| | -12% dari lalu   | | Eco Warrior      | |
| |                  | | Target: 300 kg   | | 1,250 poin       | |
| | 🔴 Tinggi        | | 🟡 Sedang        | | 🥇 Badge Baru!   | |
| +==================+ +==================+ +==================+ |
|                                                                |
| +================================+ +===========================+ |
| | 📊 BREAKDOWN EMISI HARI INI    | | 📋 AKTIVITAS TERBARU        | |
| |                                | |                             | |
| | [DONUT CHART - UC-05.2]       | | 🚗 08:30 - Perjalanan kerja | |
| | • Transportasi: 45% (3.7kg)   | |    15 km → 3.2 kg CO2e      | |
| | • Energi: 30% (2.5kg)         | |                             | |
| | • Makanan: 20% (1.6kg)        | | 🍽️ 12:15 - Makan siang      | |
| | • Limbah: 5% (0.4kg)          | |    Daging sapi → 2.8 kg     | |
| |                                | |                             | |
| | [Lihat Detail - UC-05.1]      | | 💡 18:00 - Listrik rumah    | |
| +================================+ |    12 kWh → 1.4 kg CO2e     | |
|                                    |                             | |
| +==================================+ | [Lihat Semua - UC-04.2]    | |
| | 🤖 REKOMENDASI AI HARI INI      | +===========================+ |
| |                                 |                               |
| | 💡 Ganti 3 lampu LED            | +===========================+ |
| |    Hemat: 8 kg CO2e/bulan      | | 📈 TREN BULANAN             | |
| |    [Buat Rencana - UC-07.1]    | |                             | |
| |                                 | | [LINE CHART - UC-05.2]     | |
| | 🚗 Coba carpool 2x seminggu    | | Okt: 380 kg                 | |
| |    Hemat: 15 kg CO2e/bulan     | | Nov: 320 kg ↓               | |
| |    [Buat Rencana - UC-07.1]    | | Des: 245 kg ↓ (proyeksi)   | |
| |                                 | |                             | |
| | [Lihat Semua - UC-06.2]        | | Target 2024: 3,500 kg       | |
| +==================================+ | Progress: 78% ✅            | |
|                                    +===========================+ |
| +==================================================================+ |
| | 📝 RENCANA AKSI AKTIF (4/8 selesai)          [Kelola - UC-07] | |
| |                                                                | |
| | ⏳ PRIORITAS TINGGI                                            | |
| | • Pasang LED di ruang tamu (Target: 15 Des) - UC-07.2         | |
| | • Riset opsi carpool (Target: 20 Des) - UC-07.2               | |
| |                                                                | |
| | ✅ SELESAI MINGGU INI                                          | |
| | • Beli botol minum reusable ✓ (Hemat: 3 kg/bulan)            | |
| | • Mulai kompos sampah organik ✓ (Hemat: 5 kg/bulan)          | |
| +==================================================================+ |
|                                                                    |
| +========================+ +====================================+ |
| | 🌍 KUALITAS UDARA      | | 🎯 TANTANGAN MINGGUAN             | |
| |                        | |                                    | |
| | Jakarta Selatan        | | "Hari Tanpa Kendaraan"            | |
| | AQI: 85 (Sedang) 🟡    | | Progress: 3/5 hari ⭐⭐⭐☆☆      | |
| |                        | |                                    | |
| | PM2.5: 35 μg/m³       | | Reward: 100 poin + Badge          | |
| | Rekomendasi:           | | [Ikut Tantangan - UC-02.3]        | |
| | Kurangi perjalanan     | +====================================+ |
| +========================+                                      |
+====================================================================+
```

---

## WF-02: KALKULATOR KARBON

```
+================================================================+
|  🌱 CarbCalc                    👤 John Doe    🔔 (3)        |
+================================================================+
| 📊 Dashboard | 🧮 Calculator | 📈 Reports | 🌐 Social | ⚙️   |
+================================================================+
|                                                                |
| 🧮 Kalkulator Jejak Karbon                                    |
|                                                                |
| +============================================================+ |
| | [🚗 Transportasi] [💡 Energi] [🍽️ Makanan] [🗑️ Limbah]    | |
| +============================================================+ |
|                                                                |
| 🚗 AKTIVITAS TRANSPORTASI - UC-03.1                          |
|                                                                |
| +============================+ +=============================+ |
| | JENIS KENDARAAN            | | DETAIL PERJALANAN           | |
| |                            | |                             | |
| | [Dropdown: Mobil Pribadi ▼]| | Jarak: [_____15_____] km    | |
| |                            | |                             | |
| | JENIS BAHAN BAKAR          | | Jenis BBM:                  | |
| | [Dropdown: Bensin ▼]       | | [Dropdown: Premium ▼]       | |
| |                            | |                             | |
| | JUMLAH PENUMPANG           | | Penumpang: [___2___] orang  | |
| | [Slider: ●●○○○] 2 orang    | |                             | |
| |                            | | Estimasi Emisi:             | |
| | [+ Tambah Aktivitas]       | | 🔴 3.2 kg CO2e              | |
| +============================+ +=============================+ |
|                                                                |
| 📋 AKTIVITAS HARI INI - UC-04.2                              |
| +============================================================+ |
| | Waktu | Aktivitas        | Detail      | Emisi    | Aksi   | |
| |-------|------------------|-------------|----------|--------| |
| | 08:30 | Mobil ke kantor  | 15km,Bensin | 3.2 kg   | [✏️][🗑️] | |
| | 12:15 | Makan siang      | Daging 200g | 2.8 kg   | [✏️][🗑️] | |
| | 14:00 | Listrik kantor   | 8 kWh       | 0.9 kg   | [✏️][🗑️] | |
| | 18:30 | Mobil pulang     | 15km,Bensin | 3.2 kg   | [✏️][🗑️] | |
| +============================================================+ |
|                                                                |
| +============================+ +=============================+ |
| | 📊 RINGKASAN HARI INI      | | 🎯 TARGET & PROGRESS        | |
| |                            | |                             | |
| | Total: 10.1 kg CO2e        | | Target Harian: 12 kg CO2e   | |
| |                            | | Progress: [████████░░] 84%  | |
| | Dibanding kemarin: +1.5 kg | |                             | |
| | Status: 🟡 Dalam Batas    | | Target Bulanan: 300 kg      | |
| |                            | | Sisa: 55 kg (18 hari)      | |
| | [Simpan & Lanjut]          | | Rata-rata: 3.1 kg/hari     | |
| +============================+ +=============================+ |
|                                                                |
| +============================================================+ |
| | 💡 TIPS CEPAT                                              | |
| |                                                            | |
| | • Gabungkan perjalanan untuk menghemat 20% emisi          | |
| | • Gunakan transportasi umum untuk perjalanan >10km        | |
| | • Carpool dengan teman kerja bisa hemat 50% emisi         | |
| |                                                            | |
| | [Lihat Rekomendasi Lengkap - UC-06.2]                     | |
| +============================================================+ |
|                                                                |
| [💾 Simpan Data] [🤖 Dapatkan Rekomendasi] [📊 Lihat Trend]   |
+================================================================+
```

---

## WF-03: HALAMAN REKOMENDASI AI

```
+================================================================+
|  🌱 CarbCalc                    👤 John Doe    🔔 (3)        |
+================================================================+
| 📊 Dashboard | 🧮 Calculator | 📈 Reports | 🌐 Social | ⚙️   |
+================================================================+
|                                                                |
| 🤖 Rekomendasi AI Personal - UC-06                           |
|                                                                |
| Berdasarkan analisis jejak karbon Anda selama 30 hari        |
| terakhir, berikut rekomendasi untuk mengurangi emisi:        |
|                                                                |
| +============================================================+ |
| | 🔍 Filter: [Semua ▼] [Transportasi] [Energi] [Makanan]    | |
| |           [Mudah] [Sedang] [Sulit] [Hemat >10kg/bulan]    | |
| +============================================================+ |
|                                                                |
| +============================================================+ |
| | 🚗 TRANSPORTASI (45% dari total emisi Anda)               | |
| |                                                            | |
| | 🟢 MUDAH (2-5 kg CO2e/bulan) - UC-06.2                   | |
| | ┌────────────────────────────────────────────────────────┐ | |
| | │ 🚶 Jalan kaki untuk perjalanan <2km                   │ | |
| | │ Hemat: 4 kg CO2e/bulan | Biaya: Gratis               │ | |
| | │ Waktu: 5 menit/hari | Kesulitan: ⭐☆☆               │ | |
| | │ [✅ Sudah Dilakukan] [📝 Buat Rencana - UC-07.1]      │ | |
| | └────────────────────────────────────────────────────────┘ | |
| |                                                            | |
| | ┌────────────────────────────────────────────────────────┐ | |
| | │ 🚗 Gabungkan perjalanan dalam satu trip               │ | |
| | │ Hemat: 6 kg CO2e/bulan | Biaya: Gratis               │ | |
| | │ Waktu: 10 menit planning | Kesulitan: ⭐☆☆           │ | |
| | │ [📝 Buat Rencana - UC-07.1] [ℹ️ Detail]               │ | |
| | └────────────────────────────────────────────────────────┘ | |
| |                                                            | |
| | 🟡 SEDANG (8-15 kg CO2e/bulan) - UC-06.2                 | |
| | ┌────────────────────────────────────────────────────────┐ | |
| | │ 🚌 Gunakan TransJakarta 3x seminggu                   │ | |
| | │ Hemat: 12 kg CO2e/bulan | Biaya: Rp 150k/bulan       │ | |
| | │ Waktu: +15 menit/trip | Kesulitan: ⭐⭐☆             │ | |
| | │ [📝 Buat Rencana - UC-07.1] [🗺️ Lihat Rute]          │ | |
| | └────────────────────────────────────────────────────────┘ | |
| |                                                            | |
| | 🔴 SULIT (20+ kg CO2e/bulan) - UC-06.2                   | |
| | ┌────────────────────────────────────────────────────────┐ | |
| | │ ⚡ Ganti ke mobil hybrid/listrik                       │ | |
| | │ Hemat: 45 kg CO2e/bulan | Biaya: Rp 300jt+            │ | |
| | │ Waktu: 2-3 bulan riset | Kesulitan: ⭐⭐⭐            │ | |
| | │ [📝 Buat Rencana - UC-07.1] [💰 Cek Kredit]           │ | |
| | └────────────────────────────────────────────────────────┘ | |
| +============================================================+ |
|                                                                |
| +============================================================+ |
| | 💡 ENERGI (30% dari total emisi Anda)                     | |
| |                                                            | |
| | 🟢 MUDAH (3-6 kg CO2e/bulan)                             | |
| | ┌────────────────────────────────────────────────────────┐ | |
| | │ 💡 Ganti 5 lampu dengan LED                           │ | |
| | │ Hemat: 8 kg CO2e/bulan | Biaya: Rp 200k               │ | |
| | │ ROI: 6 bulan | Kesulitan: ⭐☆☆                        │ | |
| | │ [📝 Buat Rencana - UC-07.1] [🛒 Beli Online]          │ | |
| | └────────────────────────────────────────────────────────┘ | |
| |                                                            | |
| | ┌────────────────────────────────────────────────────────┐ | |
| | │ 🔌 Cabut perangkat elektronik saat tidak dipakai      │ | |
| | │ Hemat: 5 kg CO2e/bulan | Biaya: Gratis               │ | |
| | │ Waktu: 2 menit/hari | Kesulitan: ⭐☆☆                │ | |
| | │ [📝 Buat Rencana - UC-07.1] [📱 Set Reminder]         │ | |
| | └────────────────────────────────────────────────────────┘ | |
| +============================================================+ |
|                                                                |
| +============================+ +=============================+ |
| | 📊 DAMPAK POTENSIAL        | | 🎯 REKOMENDASI PRIORITAS    | |
| |                            | |                             | |
| | Jika semua diterapkan:     | | Berdasarkan effort/impact:  | |
| |                            | |                             | |
| | 💚 Pengurangan: 89 kg/bln  | | 1. 💡 Ganti lampu LED       | |
| | 💰 Penghematan: Rp 450k    | | 2. 🚶 Jalan kaki <2km       | |
| | 🏆 Naik ke Level 4         | | 3. 🚌 Coba TransJakarta     | |
| | 📈 Target tercapai 120%    | | 4. 🔌 Cabut perangkat       | |
| |                            | |                             | |
| | [📝 Buat Master Plan]      | | [📋 Lihat Semua Rencana]   | |
| +============================+ +=============================+ |
|                                                                |
| [🔄 Generate Rekomendasi Baru] [📊 Lihat Rencana Aksi]        |
+================================================================+
```

---

## WF-04: RENCANA AKSI (TODO MANAGEMENT)

```
+================================================================+
|  🌱 CarbCalc                    👤 John Doe    🔔 (3)        |
+================================================================+
| 📊 Dashboard | 🧮 Calculator | 📈 Reports | 🌐 Social | ⚙️   |
+================================================================+
|                                                                |
| 📋 Rencana Aksi Saya - UC-07                                 |
|                                                                |
| +============================+ +=============================+ |
| | 📊 PROGRESS OVERVIEW       | | 🎯 TARGET BULANAN           | |
| |                            | |                             | |
| | Selesai: 5/12 rencana      | | Pengurangan: 45/60 kg CO2e  | |
| | Progress: [██████░░░░] 42% | | Progress: [███████░░░] 75%  | |
| |                            | |                             | |
| | Minggu ini: 3 selesai ✅   | | Sisa waktu: 18 hari         | |
| | Target minggu: 2 lagi      | | Perlu: 15 kg lagi           | |
| +============================+ +=============================+ |
|                                                                |
| +============================================================+ |
| | 🔍 Filter & Sort:                                          | |
| | [Semua ▼] [Pending] [Selesai] [Overdue]                   | |
| | [Prioritas ▼] [Tanggal ▼] [Kategori ▼]                    | |
| +============================================================+ |
|                                                                |
| 🔴 PRIORITAS TINGGI - UC-07.4                                |
| +============================================================+ |
| | ⏳ T-07.1.001 | Pasang 3 lampu LED di ruang tamu          | |
| |              | Target: 15 Des 2024 (3 hari lagi)         | |
| |              | Hemat: 8 kg CO2e/bulan                    | |
| |              | Status: 🟡 Dalam Progress                 | |
| |              | [✅ Selesai] [✏️ Edit] [🗑️ Hapus]         | |
| |              | [📝 Tambah Catatan] [⏰ Set Reminder]     | |
| +============================================================+ |
| |                                                            | |
| | ⏳ T-07.1.002 | Riset opsi carpool ke kantor              | |
| |              | Target: 20 Des 2024 (8 hari lagi)         | |
| |              | Hemat: 15 kg CO2e/bulan                   | |
| |              | Status: 🔴 Belum Mulai                    | |
| |              | [✅ Selesai] [✏️ Edit] [🗑️ Hapus]         | |
| |              | [📱 Cari Grup WhatsApp] [🗺️ Cek Rute]    | |
| +============================================================+ |
|                                                                |
| 🟡 PRIORITAS SEDANG - UC-07.4                                |
| +============================================================+ |
| | ⏳ T-07.2.001 | Buat jadwal "Meatless Monday"              | |
| |              | Target: 31 Des 2024 (19 hari lagi)        | |
| |              | Hemat: 12 kg CO2e/bulan                   | |
| |              | Status: 🟡 Dalam Progress (60%)           | |
| |              | [✅ Selesai] [✏️ Edit] [🗑️ Hapus]         | |
| |              | [🍽️ Lihat Resep] [📅 Set Kalender]       | |
| +============================================================+ |
| |                                                            | |
| | ⏳ T-07.2.002 | Mulai kompos sampah organik               | |
| |              | Target: 25 Des 2024 (13 hari lagi)        | |
| |              | Hemat: 5 kg CO2e/bulan                    | |
| |              | Status: 🔴 Belum Mulai                    | |
| |              | [✅ Selesai] [✏️ Edit] [🗑️ Hapus]         | |
| |              | [🛒 Beli Komposter] [📖 Panduan]          | |
| +============================================================+ |
|                                                                |
| ✅ SELESAI MINGGU INI - UC-07.2                              |
| +============================================================+ |
| | ✅ T-07.3.001 | Beli botol minum stainless steel          | |
| |              | Selesai: 10 Des 2024                      | |
| |              | Hemat: 3 kg CO2e/bulan                    | |
| |              | Waktu: 2 hari (lebih cepat 3 hari)       | |
| |              | [👁️ Lihat Detail] [📊 Lihat Impact]       | |
| +============================================================+ |
| |                                                            | |
| | ✅ T-07.3.002 | Daftar program bike-to-work kantor        | |
| |              | Selesai: 8 Des 2024                       | |
| |              | Hemat: 10 kg CO2e/bulan                   | |
| |              | Bonus: Dapat voucher Rp 100k              | |
| |              | [👁️ Lihat Detail] [📊 Lihat Impact]       | |
| +============================================================+ |
|                                                                |
| +============================+ +=============================+ |
| | 📈 STATISTIK PENCAPAIAN    | | 🏆 REWARD & ACHIEVEMENT     | |
| |                            | |                             | |
| | Total Hemat: 28 kg CO2e    | | Poin Earned: +150 poin      | |
| | Rata-rata: 5.6 kg/rencana  | | Badge Baru: "Action Hero"   | |
| | Waktu rata-rata: 3.2 hari  | | Level Progress: 85% → Lv4   | |
| | Success rate: 83%          | |                             | |
| |                            | | Next Milestone:             | |
| | [📊 Lihat Trend]           | | 10 rencana selesai = 🏅     | |
| +============================+ +=============================+ |
|                                                                |
| [➕ Tambah Rencana Baru] [🤖 Dari Rekomendasi] [📤 Export]    |
+================================================================+
```

---

## WF-05: SHARING MEDIA SOSIAL

```
+================================================================+
|  🌱 CarbCalc                    👤 John Doe    🔔 (3)        |
+================================================================+
| 📊 Dashboard | 🧮 Calculator | 📈 Reports | 🌐 Social | ⚙️   |
+================================================================+
|                                                                |
| 🌐 Berbagi Pencapaian - UC-08                                |
|                                                                |
| +============================+ +=============================+ |
| | 📱 TEMPLATE SHARING        | | 👁️ PREVIEW                  | |
| |                            | |                             | |
| | [🌟 Daily Summary]         | | ┌─────────────────────────┐ | |
| | [📊 Monthly Report]        | | │ 🌱 My Carbon Impact     │ | |
| | [🏆 Achievement Badge]     | | │                         │ | |
| | [👤 Profile Card]          | | │ Hari ini: 8.2 kg CO2e  │ | |
| | [🎯 Milestone]             | | │ Bulan ini: 245 kg       │ | |
| |                            | | │ Hemat: 67 kg CO2e       │ | |
| | 🎨 KUSTOMISASI:            | | │                         │ | |
| | Background: [Hijau ▼]      | | │ 🏆 Eco Warrior Level 3  │ | |
| | Style: [Modern ▼]          | | │                         │ | |
| | Font: [Poppins ▼]          | | │ #CarbonFootprint        │ | |
| |                            | | │ #SustainableLiving      │ | |
| | ✅ Tampilkan statistik     | | │                         │ | |
| | ✅ Tampilkan badge         | | │ Join me at CarbCalc.app │ | |
| | ✅ Tampilkan pesan         | | └─────────────────────────┘ | |
| | ❌ Tampilkan lokasi        | |                             | |
| +============================+ +=============================+ |
|                                                                |
| 💬 PESAN PERSONAL (Opsional) - UC-08.1                       |
| +============================================================+ |
| | Berhasil mengurangi jejak karbon 15% bulan ini! 🌱        | |
| | Perubahan kecil bisa berdampak besar untuk bumi kita 🌍   | |
| |                                                            | |
| | #ClimateAction #SustainableLifestyle #CarbonNeutral       | |
| +============================================================+ |
|                                                                |
| 📤 BAGIKAN KE: - UC-08.2, UC-08.3                            |
| +============================================================+ |
| | [🐦 Twitter/X] [📷 Instagram] [📘 Facebook] [💼 LinkedIn] | |
| | [💾 Download PNG] [📋 Copy Link] [📧 Email] [💬 WhatsApp] | |
| +============================================================+ |
|                                                                |
| 📊 RIWAYAT SHARING - UC-08.4                                 |
| +============================================================+ |
| | Tanggal    | Platform  | Template      | Engagement       | |
| |------------|-----------|---------------|------------------| |
| | 12 Des     | Twitter   | Daily Summary | 👍 15  🔄 8  💬 3 | |
| | 10 Des     | Instagram | Achievement   | 👍 23  💬 7       | |
| | 8 Des      | LinkedIn  | Monthly       | 👍 31  🔄 12 💬 5 | |
| | 5 Des      | Twitter   | Milestone     | 👍 8   🔄 4  💬 2 | |
| +============================================================+ |
|                                                                |
| +============================+ +=============================+ |
| | 🏆 SHARING ACHIEVEMENTS    | | 📈 SOCIAL IMPACT            | |
| |                            | |                             | |
| | Total Shares: 47           | | Followers Inspired: 156     | |
| | Platforms: 4 aktif         | | Estimated CO2 Saved: 89kg   | |
| | Avg Engagement: 12.3       | | Community Rank: #23         | |
| |                            | |                             | |
| | Badge Earned:              | | Monthly Growth:             | |
| | 🌟 "Social Influencer"     | | Followers: +12 (+8%)        | |
| | 📢 "Climate Advocate"      | | Engagement: +15%            | |
| |                            | |                             | |
| | [🏅 Lihat Semua Badge]     | | [👥 Lihat Community]        | |
| +============================+ +=============================+ |
|                                                                |
| +============================================================+ |
| | 💡 TIPS SHARING EFEKTIF                                    | |
| |                                                            | |
| | • Posting terbaik: Selasa-Kamis, 10:00-14:00             | |
| | • Gunakan hashtag trending: #ClimateAction #Sustainability | |
| | • Tag teman untuk meningkatkan engagement                  | |
| | • Konsisten sharing 2-3x seminggu untuk growth optimal    | |
| |                                                            | |
| | [📚 Panduan Lengkap] [🎯 Set Reminder Posting]            | |
| +============================================================+ |
|                                                                |
| [🔄 Refresh Preview] [💾 Simpan Template] [📊 Analytics]       |
+================================================================+
```

---

## WF-06: PROFIL PENGGUNA

```
+================================================================+
|  🌱 CarbCalc                    👤 John Doe    🔔 (3)        |
+================================================================+
| 📊 Dashboard | 🧮 Calculator | 📈 Reports | 🌐 Social | ⚙️   |
+================================================================+
|                                                                |
| 👤 Profil Saya - UC-02                                       |
|                                                                |
| +============================+ +=============================+ |
| | 📸 FOTO PROFIL             | | ℹ️ INFORMASI DASAR          | |
| |                            | |                             | |
| |     [👤 Avatar 150x150]    | | Nama: John Doe              | |
| |                            | | Email: john@email.com       | |
| | [📷 Ubah Foto]             | | Role: Premium User          | |
| | [🗑️ Hapus Foto]            | | Member Since: Jan 2024      | |
| |                            | | Last Login: 12 Des, 10:30   | |
| | 🏆 LEVEL & BADGE           | |                             | |
| | Level 3: Eco Warrior       | | [✏️ Edit Profil - UC-02.2]  | |
| | 1,250 / 2,000 poin         | |                             | |
| | Progress: [████████░░] 63% | |                             | |
| +============================+ +=============================+ |
|                                                                |
| 🏠 INFORMASI RUMAH TANGGA - UC-02.1                          |
| +============================================================+ |
| | Lokasi: Jakarta Selatan, Indonesia                         | |
| | Jumlah Anggota Keluarga: 4 orang                          | |
| | Rentang Pendapatan: Rp 10-20 juta/bulan                   | |
| | Tipe Hunian: Rumah 2 lantai                               | |
| |                                                            | |
| | [✏️ Update Informasi]                                      | |
| +============================================================+ |
|                                                                |
| 🎯 TARGET & PREFERENSI - UC-02.2                             |
| +============================================================+ |
| | Target Pengurangan Karbon: 25% dalam 6 bulan              | |
| | Fokus Utama: [✓] Transportasi [✓] Energi [ ] Makanan     | |
| | Budget untuk Eco-Investment: Rp 2-5 juta/bulan           | |
| |                                                            | |
| | Notifikasi:                                                | |
| | [✓] Daily reminder [✓] Weekly report [ ] Achievement      | |
| | [✓] Recommendation [ ] Social updates                      | |
| |                                                            | |
| | [💾 Simpan Preferensi]                                     | |
| +============================================================+ |
|                                                                |
| 🏆 PENCAPAIAN & BADGE - UC-02.3                              |
| +============================================================+ |
| | BADGE TERBARU:                                             | |
| | 🌟 Action Hero (12 Des) - Selesaikan 5 rencana aksi      | |
| | 🚗 Commute Champion (10 Des) - 1 minggu tanpa mobil       | |
| | 💡 Energy Saver (8 Des) - Hemat 20% listrik bulanan      | |
| |                                                            | |
| | SEMUA BADGE (8/15):                                        | |
| | ✅ First Step    ✅ Week Warrior   ✅ Month Master        | |
| | ✅ Social Share  ✅ Eco Newbie     ✅ Green Starter       | |
| | ✅ Action Hero   ✅ Energy Saver   ❌ Carbon Neutral      | |
| | ❌ Eco Expert    ❌ Planet Saver   ❌ Climate Champion    | |
| |                                                            | |
| | [🏅 Lihat Semua] [🎯 Badge Berikutnya]                    | |
| +============================================================+ |
|                                                                |
| 📊 STATISTIK PERSONAL                                         |
| +============================+ +=============================+ |
| | 📈 JEJAK KARBON            | | 🎯 PENCAPAIAN               | |
| |                            | |                             | |
| | Total 2024: 2,890 kg CO2e  | | Rencana Selesai: 12         | |
| | Rata-rata: 8.2 kg/hari     | | Total Hemat: 156 kg CO2e    | |
| | Pengurangan: -18% YoY      | | Eco Points: 1,250           | |
| |                            | |                             | |
| | Bulan Terbaik: Oktober     | | Streak Terpanjang: 15 hari  | |
| | Hemat: 45 kg CO2e          | | Badge Earned: 8/15          | |
| |                            | |                             | |
| | [📊 Detail Analytics]      | | [🏆 Lihat Leaderboard]      | |
| +============================+ +=============================+ |
|                                                                |
| 🔒 PRIVASI & KEAMANAN                                         |
| +============================================================+ |
| | Visibilitas Profil: [Dropdown: Publik ▼]                  | |
| | Berbagi Data untuk Riset: [✓] Ya, untuk penelitian iklim  | |
| | Two-Factor Authentication: [❌ Tidak Aktif] [🔐 Aktifkan]  | |
| |                                                            | |
| | [🔑 Ubah Password] [📧 Update Email] [🗑️ Hapus Akun]      | |
| +============================================================+ |
|                                                                |
| [💾 Simpan Semua Perubahan] [🔄 Reset ke Default]             |
+================================================================+
```

---

## WF-07: LAPORAN & ANALYTICS

```
+================================================================+
|  🌱 CarbCalc                    👤 John Doe    🔔 (3)        |
+================================================================+
| 📊 Dashboard | 🧮 Calculator | 📈 Reports | 🌐 Social | ⚙️   |
+================================================================+
|                                                                |
| 📈 Laporan & Analytics - UC-05                               |
|                                                                |
| +============================================================+ |
| | 📅 Periode: [Dropdown: Bulan Ini ▼] [Custom Range]       | |
| | 📊 Tampilan: [Chart] [Tabel] [Infografis]                 | |
| | 📤 Export: [PDF] [CSV] [PNG] [Email Report]               | |
| +============================================================+ |
|                                                                |
| 📊 OVERVIEW BULANAN - UC-05.1                                |
| +============================+ +=============================+ |
| | 🎯 TARGET VS AKTUAL        | | 📈 TREN 6 BULAN TERAKHIR   | |
| |                            | |                             | |
| | Target: 300 kg CO2e        | | [LINE CHART - UC-05.2]     | |
| | Aktual: 245 kg CO2e        | | Jul: 420 kg                 | |
| | Selisih: -55 kg (18% ✅)   | | Agu: 380 kg ↓               | |
| |                            | | Sep: 350 kg ↓               | |
| | Status: 🟢 Target Tercapai | | Okt: 320 kg ↓               | |
| | Ranking: Top 15% pengguna  | | Nov: 280 kg ↓               | |
| |                            | | Des: 245 kg ↓ (proyeksi)   | |
| | [🎯 Set Target Baru]       | | Trend: -42% improvement     | |
| +============================+ +=============================+ |
|                                                                |
| 📊 BREAKDOWN KATEGORI - UC-05.2                              |
| +============================================================+ |
| |                    [PIE CHART]                             | |
| |                                                            | |
| | 🚗 Transportasi: 110 kg (45%) ↓ 20% dari bulan lalu      | |
| | 💡 Energi: 74 kg (30%) ↓ 15% dari bulan lalu             | |
| | 🍽️ Makanan: 49 kg (20%) ↑ 5% dari bulan lalu             | |
| | 🗑️ Limbah: 12 kg (5%) ↓ 10% dari bulan lalu              | |
| |                                                            | |
| | Kategori dengan perbaikan terbesar: Transportasi          | |
| | Kategori yang perlu perhatian: Makanan                    | |
| +============================================================+ |
|                                                                |
| 📅 ANALISIS HARIAN - UC-05.2                                 |
| +============================================================+ |
| |                    [BAR CHART - 30 HARI]                  | |
| |                                                            | |
| | Rata-rata harian: 8.2 kg CO2e                            | |
| | Hari terbaik: 3 Des (4.1 kg) - Hari libur, di rumah     | |
| | Hari terburuk: 15 Des (15.2 kg) - Perjalanan luar kota   | |
| |                                                            | |
| | Pola mingguan:                                             | |
| | • Senin-Jumat: 9.1 kg/hari (hari kerja)                  | |
| | • Sabtu-Minggu: 6.8 kg/hari (weekend)                    | |
| |                                                            | |
| | [📊 Lihat Detail Harian]                                  | |
| +============================================================+ |
|                                                                |
| 🏆 PENCAPAIAN & MILESTONE - UC-05.3                          |
| +============================+ +=============================+ |
| | 🎯 MILESTONE TERCAPAI      | | 📊 PERBANDINGAN             | |
| |                            | |                             | |
| | ✅ Hemat 50+ kg CO2e       | | vs Rata-rata Pengguna:      | |
| | ✅ 30 hari konsisten       | | Anda: 245 kg                | |
| | ✅ 5 rekomendasi selesai   | | Rata-rata: 320 kg           | |
| | ⏳ Target 200 kg (82%)     | | Selisih: -75 kg (23% ✅)    | |
| |                            | |                             | |
| | Milestone Berikutnya:      | | vs Target Global 2030:      | |
| | 🎯 Carbon Neutral Month    | | Target: 2.3 ton/tahun       | |
| | Progress: [██████░░░░] 60% | | Anda: 2.9 ton (proyeksi)    | |
| |                            | | Gap: -0.6 ton               | |
| | [🏅 Lihat Semua]           | | [🌍 Lihat Global Stats]     | |
| +============================+ +=============================+ |
|                                                                |
| 💡 INSIGHTS & REKOMENDASI - UC-05.3                          |
| +============================================================+ |
| | 🔍 KEY INSIGHTS:                                           | |
| |                                                            | |
| | • Transportasi turun 20% berkat program bike-to-work      | |
| | • Konsumsi energi stabil, potensi hemat dengan solar      | |
| | • Emisi makanan naik 5%, pertimbangkan plant-based diet   | |
| | • Weekend emissions 25% lebih rendah - pola bagus!        | |
| |                                                            | |
| | 🎯 REKOMENDASI BULAN DEPAN:                               | |
| | 1. Focus pada pengurangan emisi makanan (target: -15%)    | |
| | 2. Pertahankan pola transportasi yang sudah baik          | |
| | 3. Eksplorasi renewable energy untuk rumah                | |
| |                                                            | |
| | [🤖 Dapatkan Rekomendasi Detail]                          | |
| +============================================================+ |
|                                                                |
| 📤 EXPORT & SHARING                                           |
| +============================================================+ |
| | 📄 LAPORAN TERSEDIA:                                      | |
| |                                                            | |
| | [📊 Executive Summary] [📈 Detailed Analytics]            | |
| | [🏆 Achievement Report] [📅 Monthly Comparison]           | |
| |                                                            | |
| | FORMAT: [PDF] [Excel] [PowerPoint] [Infografis PNG]      | |
| |                                                            | |
| | [📧 Email ke Diri Sendiri] [📤 Share ke Tim]              | |
| | [💾 Download All] [🔗 Generate Public Link]               | |
| +============================================================+ |
+================================================================+
```

---

## KONSISTENSI KODE ANTAR DIAGRAM

### Mapping Kode Use Case ke Wireframe:
- **UC-01** → WF-01 (Login di Dashboard)
- **UC-02** → WF-06 (Profil Pengguna)  
- **UC-03** → WF-02 (Kalkulator Karbon)
- **UC-04** → WF-02 (Data Aktivitas)
- **UC-05** → WF-01, WF-07 (Visualisasi & Reports)
- **UC-06** → WF-03 (Rekomendasi AI)
- **UC-07** → WF-04 (Rencana Aksi)
- **UC-08** → WF-05 (Social Sharing)

### Konsistensi Penamaan:
- Setiap elemen UI menggunakan kode yang sama dengan Activity Diagram
- Button actions mengacu ke Use Case yang tepat
- Data flow konsisten dengan Sequence Diagram
- Navigation pattern mengikuti struktur sistem

Wireframe ini siap untuk development dan telah diselaraskan dengan semua diagram UML yang telah dibuat sebelumnya.