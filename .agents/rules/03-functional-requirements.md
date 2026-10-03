---
trigger: always_on
---

# Kebutuhan Fungsional (MVP)

1.  **Mode Tes:** Hanya `time`. Pilihan durasi: `30s` dan `60s` (default `60s`).
2.  **Difficulty:** `normal` (kata umum) & `advanced` (kata kompleks, tanda baca, kapital).
3.  **Bahasa:** `id` (Indonesia) & `en` (Inggris).
4.  **Timer:** Mulai otomatis saat karakter pertama diketik.
5.  **Input:** Highlight huruf benar/salah real-time, kata aktif ditandai, auto-scroll.
6.  **Hasil:** Tampilkan WPM, Akurasi, Raw WPM, Konsistensi, Errors, Modifications.
7.  **Grafik Hasil:** Wajib menampilkan grafik WPM, Error, dan Modifications per detik setelah tes.
8.  **Auth:** Login Google (OAuth2) untuk menyimpan riwayat.
9.  **Guest Mode:** Bisa main tanpa login, history disimpan di `localStorage`.

**DILARANG:** Menambahkan mode `words`, `quote`, atau `custom text`.
