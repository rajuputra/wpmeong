---
trigger: always_on
---

# Algoritma & Metrik Inti

- **WPM:** `(jumlah karakter benar / 5) / (durasi_menit)`
- **Raw WPM:** `(total karakter diketik / 5) / menit`
- **Akurasi:** `(karakter benar / total karakter diketik) × 100` (1 desimal)
- **Konsistensi:** `100 - (stdev WPM per detik / mean WPM per detik) × 100` (clamp [0,100])
- **Snapshot per Detik:** Setiap 1000ms, push objek `{ second, wpm, rawWpm, errors, modifications }` ke array `snapshots`.
- **Jumlah Snapshot:** 30 untuk tes 30s, 60 untuk tes 60s.

**Wajib:** Semua rumus diimplementasikan di `lib/metrics.ts` dan diuji dengan unit test.
