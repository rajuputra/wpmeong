# AGENTS.md

Dokumen ini adalah panduan utama untuk semua AI agent / developer yang bekerja pada proyek **WPMeong** (nama kerja: `wpmeong`). Baca dokumen ini sebelum menulis kode, membuat branch, atau mengubah konfigurasi.

> **Versi dokumen:** 2.2.0 — perubahan: mode **time only** dengan pilihan **30s** dan **60s**; mode `words` dihapus.

---

## 1. Ringkasan Proyek

**WPMeong** adalah aplikasi web untuk mengukur kecepatan dan akurasi mengetik pengguna, terinspirasi dari [10fastfingers.com](https://10fastfingers.com). Fokus awal: **Bahasa Indonesia** dan **Bahasa Inggris**.

**Target Deploy:** Firebase Hosting (`https://wpmeong.web.app`)

**Target MVP (v1.0):**

- Tes mengetik dengan **mode Time saja**
- Pilihan durasi: **30 detik** dan **60 detik** (default `60s`)
- **Difficulty:** `normal` dan `lanjutan` (advanced)
- Metrik: **WPM (KPM)**, **Akurasi (%)**, **Raw WPM**, **Consistency**, **Kesalahan**, **Modifications**
- **Grafik hasil** di akhir tes: WPM, Error, dan Modifications per detik (lihat §3.6)
- Dua bahasa: `id` (Indonesia) & `en` (Inggris) — wordlist terpisah
- **Login Google (OAuth2)** via Firebase Auth untuk menyimpan riwayat WPM
- Halaman riwayat hasil tes (per user yang login)
- UI minimalis, keyboard-first, responsif (mobile & desktop)
- Guest mode tetap bisa main (tanpa login) — history hanya di `localStorage`

---

## 2. Business Requirements

### 2.1 Functional Requirements

| ID    | Requirement                                                                                    | Prioritas    |
| ----- | ---------------------------------------------------------------------------------------------- | ------------ |
| FR-1  | Pengguna dapat memilih bahasa (ID/EN) sebelum memulai tes                                      | Must         |
| FR-2  | Pengguna dapat memilih **durasi: 30s atau 60s** (default 60s)                                  | Must         |
| FR-3  | Pengguna dapat memilih **difficulty** (Normal / Lanjutan)                                      | Must         |
| FR-4  | Timer mulai otomatis saat karakter pertama diketik                                             | Must         |
| FR-5  | Highlight huruf benar/salah secara real-time                                                   | Must         |
| FR-6  | Kata aktif ditandai jelas; auto-scroll                                                         | Must         |
| FR-7  | Hitung WPM = (karakter benar / 5) / menit                                                      | Must         |
| FR-8  | Hitung Akurasi = (karakter benar / total karakter diketik) × 100%                              | Must         |
| FR-9  | Tampilkan hasil (WPM, akurasi, benar/salah, konsistensi) di akhir tes                          | Must         |
| FR-10 | **Tampilkan grafik WPM, Error, dan Modifications** setelah tes selesai (§3.6)                  | Must         |
| FR-11 | **Login dengan Google (OAuth2)** untuk menyimpan riwayat                                       | Must         |
| FR-12 | **Halaman riwayat** menampilkan daftar tes (tanggal, bahasa, difficulty, durasi, WPM, akurasi) | Must         |
| FR-13 | Guest mode: simpan history di `localStorage` tanpa login                                       | Should       |
| FR-14 | Tombol restart dengan shortcut `Tab + Enter` atau `Esc`                                        | Should       |
| FR-15 | Statistik personal (rata-rata WPM, best WPM, total tes per difficulty)                         | Should       |
| FR-16 | Mode "quote" dan "custom text"                                                                 | Could        |
| FR-17 | Multiplayer / race mode                                                                        | Won't (v1)   |
| FR-18 | Leaderboard global                                                                             | Could (v1.1) |

> **Catatan:** mode `words` (25/50/100 kata) **dihapus dari scope** dan tidak akan diimplementasikan. Semua tes berbasis durasi waktu.

### 2.2 Non-Functional Requirements

- **Performa:** FCP < 1.5s pada 3G cepat; bundle JS awal < 180 KB gzip (naik karena chart + auth SDK).
- **Aksesibilitas:** Navigasi keyboard penuh, kontras WCAG AA, `aria-label` pada kontrol utama.
- **SEO:** Metadata per halaman, sitemap dasar.
- **Privasi:** Data tes hanya dikirim ke Firestore jika user login. Tidak ada tracking pihak ketiga.
- **Keamanan:** Firebase Security Rules ketat — user hanya bisa baca/tulis dokumen miliknya sendiri.

---

## 3. Technical Details

### 3.1 Tech Stack

- **Framework:** Next.js 14+ (App Router) dengan **static export** (`output: 'export'`) untuk Firebase Hosting.
- **Bahasa:** TypeScript (strict mode).
- **Styling:** Tailwind CSS + `shadcn/ui`.
- **State:** Zustand untuk state tes mengetik + auth state ringan.
- **Chart:** **Recharts** (bundle kecil, deklaratif, cocok untuk area + scatter).
- **Auth:** **Firebase Authentication** dengan provider **Google (OAuth2)**.
- **Database:** **Cloud Firestore** untuk menyimpan riwayat tes.
- **Testing:** Vitest (unit) + Playwright (E2E).
- **Linting:** ESLint + Prettier + `eslint-plugin-tailwindcss`.
- **Package Manager:** `pnpm`.
- **Node:** ≥ 20 LTS.

### 3.2 Deployment — Firebase Hosting

- Project Firebase: `wpmeong` (single project, Spark plan)
- URL produksi: `https://wpmeong.web.app`
- Staging: pakai Hosting Preview Channel
  (`firebase hosting:channel:deploy staging --expires 7d`)
- Deploy produksi: `firebase deploy --only hosting`
- File konfigurasi: `firebase.json`, `.firebaserc`, `next.config.mjs`
  (`output: 'export'`, `images.unoptimized: true`)
- **Authorized domains** untuk Google OAuth2: `localhost`, `wpmeong.web.app`

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }],
    "headers": [
      {
        "source": "**/*.@(js|css|woff2|png|jpg|svg)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

### 3.3 Struktur Folder (usulan)

```
wpmeong/
├─ app/
│  ├─ (marketing)/page.tsx        # landing
│  ├─ test/[lang]/page.tsx        # halaman tes
│  ├─ history/page.tsx            # riwayat (protected route)
│  ├─ login/page.tsx              # halaman login
│  └─ layout.tsx
├─ components/
│  ├─ TypingArea.tsx
│  ├─ Word.tsx
│  ├─ Timer.tsx
│  ├─ DurationPicker.tsx          # pilihan 30s / 60s
│  ├─ DifficultyPicker.tsx
│  ├─ ResultCard.tsx
│  ├─ ResultChart.tsx             # grafik WPM/Error/Modifications
│  ├─ HistoryTable.tsx
│  ├─ AuthButton.tsx
│  └─ ui/                         # shadcn
├─ lib/
│  ├─ typing-engine.ts            # pure logic
│  ├─ metrics.ts                  # wpm, akurasi, consistency
│  ├─ chart-data.ts               # transformasi snapshot → data chart
│  ├─ storage.ts                  # localStorage wrapper (guest)
│  ├─ firebase.ts                 # init Firebase app
│  ├─ auth.ts                     # signInWithGoogle, signOut
│  ├─ firestore.ts                # CRUD riwayat tes
│  └─ words/
│     ├─ id-normal.ts
│     ├─ id-advanced.ts
│     ├─ en-normal.ts
│     └─ en-advanced.ts
├─ store/
│  ├─ useTypingStore.ts
│  └─ useAuthStore.ts
├─ types/
│  ├─ typing.ts
│  └─ user.ts
├─ public/
├─ tests/
│  ├─ unit/
│  └─ e2e/
├─ firestore.rules
├─ firebase.json
├─ .firebaserc
└─ next.config.mjs
```

### 3.4 Konfigurasi Tes

**Mode tes: hanya `time`.**

| Parameter    | Nilai yang Diizinkan       | Default    |
| ------------ | -------------------------- | ---------- |
| `mode`       | `'time'` (fixed)           | `'time'`   |
| `duration`   | `30` \| `60` (detik)       | `60`       |
| `language`   | `'id'` \| `'en'`           | `'id'`     |
| `difficulty` | `'normal'` \| `'advanced'` | `'normal'` |

- Tidak ada opsi durasi lain (15s / 120s / custom / words) di v1.
- Simpan preferensi terakhir user di `localStorage` (`lastDuration`, `lastLanguage`, `lastDifficulty`).

### 3.5 Algoritma Inti (Wajib Konsisten)

- **WPM standar:** `WPM = (jumlah karakter benar / 5) / (durasi_menit)`
- **Raw WPM:** `(total karakter diketik / 5) / menit` (termasuk salah)
- **Akurasi:** `(karakter benar / total karakter diketik) × 100` — dibulatkan 1 desimal
- **Konsistensi:** `100 - (stdev WPM per detik / mean WPM per detik) × 100`, clamp ke [0,100]
- **Commit kata:** kata di-commit saat pengguna menekan `Space` atau saat timer habis
- **Error policy:** kesalahan tidak memblokir input; opsi strict mode di fase berikutnya.

Semua rumus di atas WAJIB diimplementasikan di `lib/metrics.ts` dan diuji unit test dengan sample data.

**Snapshot per detik** (wajib untuk grafik): setiap 1000ms, push objek ke array `snapshots`:

```ts
type SecondSnapshot = {
  second: number; // 1, 2, 3, ...
  wpm: number; // WPM kumulatif detik itu
  rawWpm: number; // Raw WPM kumulatif
  errors: number; // jumlah salah DI DETIK INI (bukan kumulatif)
  modifications: number; // jumlah backspace/koreksi DI DETIK INI
};
```

Jumlah snapshot mengikuti durasi: **30 entri** untuk 30s, **60 entri** untuk 60s.

### 3.6 Difficulty (Normal vs Lanjutan)

| Aspek             | Normal                          | Lanjutan (Advanced)                                            |
| ----------------- | ------------------------------- | -------------------------------------------------------------- |
| **Wordlist**      | 200+ kata umum sehari-hari      | 300+ kata kompleks: teknis, panjang, serapan, istilah          |
| **Panjang kata**  | 3–8 karakter dominan            | campuran, banyak 8–15 karakter                                 |
| **Tanda baca**    | Tanpa tanda baca                | Termasuk `,` `.` `;` `:` `-` `'` `"` dan angka                 |
| **Huruf kapital** | Semua lowercase                 | Ada kata dengan Kapital di awal / akronim (mis. `API`, `HTTP`) |
| **Konten EN**     | Top 1000 kata frekuensi Inggris | Kata akademik / sains / bisnis                                 |
| **Konten ID**     | Kata sehari-hari (KBBI umum)    | Kata baku serapan, istilah teknis, kata berimbuhan panjang     |

- Difficulty disimpan sebagai `'normal' | 'advanced'` (bukan `'lanjutan'` di kode — UI bisa menampilkan "Lanjutan").
- Wordlist **wajib dipisah per difficulty per bahasa** (lihat §3.3).
- Pemilihan kata: **shuffle** tanpa duplikat berurutan.
- Karena jumlah kata per tes tidak ditentukan (berbasis waktu), engine harus bisa **generate kata secara streaming** (append batch baru saat mendekati akhir buffer).

### 3.7 Grafik Hasil Tes (Wajib)

Setelah tes selesai, tampilkan **grafik garis/area** dengan spesifikasi:

- **Library:** Recharts (`<ComposedChart>`).
- **Sumbu X:** waktu (detik) — 0..30 atau 0..60 sesuai durasi.
- **Sumbu Y kiri:** WPM (0 hingga max).
- **Seri data:**
  - 🔵 **WPM** — area/line ungu, primary series.
  - 🔴 **Error** — scatter/titik merah, hanya muncul di detik saat ada error.
  - 🟠 **Modifications** — scatter/titik oranye, hanya muncul di detik saat ada backspace/koreksi.
- **Legend** di atas grafik: `WPM`, `Error`, `Modifications` (opsional: `ms/c`).
- **Tooltip** saat hover: second, wpm, errors, modifications.
- **Grid** halus (`stroke-dasharray`), warna netral.
- **Responsive** (Recharts `<ResponsiveContainer width="100%" height={300}>`).
- **Data source:** `snapshots` dari store hasil tes, via `lib/chart-data.ts`.
- **Export (opsional, v1.1):** tombol "Unduh PNG" untuk share hasil.

**Warna chart** (sesuai §4):

- WPM: `#818CF8` (fill `rgba(129,140,248,0.25)`)
- Error: `#EF4444`
- Modifications: `#FB923C`

### 3.8 Autentikasi — Google OAuth2

- **Provider:** Firebase Auth `GoogleAuthProvider`.
- **Scope minimal:** `profile`, `email` (tidak minta scope tambahan).
- **Flow:** `signInWithPopup` di desktop, fallback `signInWithRedirect` untuk mobile / jika popup diblokir.
- **Sesi:** `browserLocalPersistence` (default) — user tetap login antar tab.
- **Auth state:** di-subscribe sekali di root layout, feed ke `useAuthStore`.
- **Route protection:** halaman `/history` wajib login; redirect ke `/login` jika `!user`.
- **Logout:** tombol di header, clear store + sign out.

### 3.9 Skema Firestore

Koleksi: **`users/{uid}/tests/{testId}`**

```ts
type TestDoc = {
  uid: string;
  createdAt: Timestamp; // serverTimestamp()
  language: "id" | "en";
  difficulty: "normal" | "advanced";
  mode: "time"; // fixed
  durationSec: 30 | 60; // hanya 30 atau 60
  wpm: number;
  rawWpm: number;
  accuracy: number; // 0..100
  consistency: number; // 0..100
  correctChars: number;
  incorrectChars: number;
  modifications: number;
  snapshots: SecondSnapshot[]; // untuk render ulang grafik di history
};
```

- **Index komposit:** `createdAt DESC` (untuk query history); opsional `(difficulty, createdAt DESC)`.
- **Firestore Rules:**
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{uid}/tests/{testId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }
  }
  ```
- **Batasan:** dokumen dibatasi 1 MB — `snapshots` aman (maks 60 entri per tes).

### 3.10 Data Wordlist

- Minimal **200 kata** per bahasa per difficulty (total ≥ 800 kata di MVP).
- Bahasa Indonesia: hindari kata serapan yang duplikat dengan EN pada level `normal`.
- Format: `string[]`, di-import statis (no fetch runtime).
- Sumber bebas lisensi (buat sendiri atau daftar frekuensi publik).

---

## 4. Color Scheme

Tema gelap sebagai default (khas typing test), dengan opsi terang.

### 4.1 Palet

| Token          | Light     | Dark      | Penggunaan                   |
| -------------- | --------- | --------- | ---------------------------- |
| `--bg`         | `#F8FAFC` | `#0B0F19` | Background utama             |
| `--surface`    | `#FFFFFF` | `#111827` | Card, panel                  |
| `--muted`      | `#94A3B8` | `#475569` | Teks belum diketik           |
| `--text`       | `#0F172A` | `#E5E7EB` | Teks aktif / benar           |
| `--text-wrong` | `#DC2626` | `#F87171` | Karakter salah               |
| `--text-extra` | `#B91C1C` | `#EF4444` | Karakter ekstra              |
| `--accent`     | `#F59E0B` | `#FBBF24` | Kursor, highlight kata aktif |
| `--primary`    | `#6366F1` | `#818CF8` | Tombol utama, link           |
| `--success`    | `#16A34A` | `#4ADE80` | Indikator selesai            |
| `--border`     | `#E2E8F0` | `#1F2937` | Garis pemisah                |

### 4.2 Warna Chart (lihat §3.7)

| Seri          | Warna     |
| ------------- | --------- |
| WPM           | `#818CF8` |
| Error         | `#EF4444` |
| Modifications | `#FB923C` |

### 4.3 Tipografi

- Font utama: **Inter** (UI) + **JetBrains Mono** (area mengetik + angka WPM).
- Ukuran teks tes: `1.75rem` desktop, `1.25rem` mobile.
- Line height area tes: `2.2`.
- Angka metrik besar (contoh "104 kpm"): `JetBrains Mono`, weight `700`, ukuran `3rem`.

### 4.4 Aturan Visual

- Tidak ada animasi berlebih; transisi maksimal `150ms ease-out`.
- Kursor kustom: garis vertikal berkedip, warna `--accent`.
- Kontras minimum 4.5:1 untuk teks utama.
- Badge difficulty: `normal` = hijau muda, `advanced` = oranye.
- Badge durasi (30s/60s): netral (`--muted`).

---

## 5. Strategi

### 5.1 Roadmap

| Fase | Deliverable                                                                       |
| ---- | --------------------------------------------------------------------------------- |
| v0.1 | Setup repo, Firebase project, Next.js + Tailwind, deploy "hello"                  |
| v0.2 | Typing engine + UI dasar (time 60s, EN normal)                                    |
| v0.3 | Wordlist ID & EN, difficulty picker, **duration picker (30s/60s)**, halaman hasil |
| v0.4 | **Grafik Recharts (WPM/Error/Modifications)** + `snapshots` capture               |
| v0.5 | **Firebase Auth Google OAuth2** + halaman login + proteksi `/history`             |
| v0.6 | **Firestore riwayat tes** + HistoryTable + statistik personal                     |
| v1.0 | QA, aksesibilitas, SEO, launch di `*.web.app`                                     |
| v1.1 | Leaderboard global, share hasil (PNG), mode quote/custom                          |
| v2.0 | Multiplayer                                                                       |

### 5.2 Prinsip Produk

1. **Cepat & ringan** — load < 2s, tanpa bloat library.
2. **Keyboard-first** — semua aksi bisa dilakukan tanpa mouse.
3. **Fokus** — UI minimalis, tanpa iklan, tanpa distraksi.
4. **Adil** — metrik transparan, rumus didokumentasikan di halaman "Tentang".
5. **Privacy-first** — guest mode tanpa login tetap berfungsi penuh (history lokal).
6. **Sederhana** — pilihan durasi dijaga minimal (30s/60s) agar user tidak bingung.

### 5.3 Metrik Sukses

- Rata-rata WPM user baru akurat.
- Retensi 7 hari ≥ 25% (login Google mendorong retensi).
- Lighthouse ≥ 90 (turun sedikit karena SDK auth & chart, tetap wajib tinggi).

### 5.4 Anti-Pattern yang Dihindari

- Tidak ada auto-correct / auto-complete saat mengetik.
- Tidak menghukum user karena salah ketik (no forced backtrack) di v1.
- Tidak memaksa login — guest mode harus berfungsi.
- Tidak mengirim `snapshots` mentah ke analytics eksternal.
- **Tidak menambahkan mode lain** (words, quote, custom) di luar roadmap tanpa persetujuan.

---

## 6. Coding Standards

### 6.1 Umum

- **TypeScript strict**; hindari `any`.
- **Immutability** — hindari mutasi langsung.
- **Pure functions** untuk logika kalkulasi di `lib/`, wajib ada unit test.
- **Naming:**
  - Komponen: `PascalCase.tsx`
  - Hook: `useSomething.ts`
  - Util: `camelCase.ts`
  - Konstanta: `SCREAMING_SNAKE_CASE`
  - Tipe/Interface: `PascalCase` (tanpa prefix `I`)

### 6.2 React

- Functional components + hooks saja.
- Event handler diberi prefix `handle*`.
- `useEffect` dependency lengkap.
- Hindari re-render tak perlu — `useMemo`/`useCallback` hanya bila terukur mahal.

### 6.3 Styling

- Tailwind utility-first.
- CSS variable untuk warna (lihat §4) via `tailwind.config.ts`.
- Chart styling via konstanta di `lib/chart-data.ts`, bukan inline di komponen.

### 6.4 Testing

- Unit test wajib untuk: `lib/metrics.ts`, `lib/typing-engine.ts`, `lib/chart-data.ts` — coverage ≥ 90%.
- E2E minimal:
  1. Menyelesaikan satu tes (60s) sebagai guest → lihat hasil + grafik.
  2. Menyelesaikan satu tes (30s) → cek `snapshots.length === 30`.
  3. Login Google (mock) → menyelesaikan tes → cek riwayat muncul di `/history`.
- Setiap PR wajib lolos `pnpm lint && pnpm test && pnpm build`.

### 6.5 Git & Commit

- Branch: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`.
- Conventional Commits: `feat(chart): tambah scatter error`.
- PR template wajib: deskripsi, screenshot (jika UI), checklist test.

### 6.6 Aksesibilitas

- Semua tombol ikon-only punya `aria-label`.
- Fokus visible.
- Area tes bisa fokus via `Tab`.
- Grafik Recharts wajib punya fallback tabel atau `aria-label` ringkasan untuk screen reader.

### 6.7 Keamanan

- Jangan commit Firebase config untuk prod — pakai env `NEXT_PUBLIC_FIREBASE_*`.
- Firestore Rules wajib diuji dengan Firebase Emulator sebelum deploy.
- Jangan simpan token di `localStorage` manual — biarkan Firebase SDK menangani.

### 6.8 Aturan untuk AI Agent

1. **Selalu baca dokumen ini sebelum mengubah kode.**
2. Jika membuat komponen atau util baru, **tambahkan ke struktur folder** di §3.3.
3. Jika mengubah rumus metrik — **wajib update §3.5 dan unit test**.
4. Jika mengubah warna/font/chart — **wajib update §4**.
5. Jika mengubah skema Firestore — **wajib update §3.9 + `firestore.rules`**.
6. **Jangan menambah mode tes baru** (words, quote, custom, dsb.) — scope v1 hanya `time` dengan durasi 30s/60s.
7. Jangan menambah dependency baru > 30 KB gzip tanpa mencatat alasan di PR.
8. Jangan commit secret / API key.
9. Semua perubahan harus dapat di-deploy ke `*.web.app` dengan `firebase deploy`.
10. Kalau requirement ambigu, **tanyakan dulu** — jangan asumsi fitur baru.

---

## 7. Kontak & Referensi

- Referensi UX: [10fastfingers.com](https://10fastfingers.com), [monkeytype.com](https://monkeytype.com)
- Firebase Hosting: https://firebase.google.com/docs/hosting
- Firebase Auth (Google): https://firebase.google.com/docs/auth/web/google-signin
- Firestore: https://firebase.google.com/docs/firestore
- Recharts: https://recharts.org
- Repo: https://github.com/rajuputra/wpmeong

---

**Branding & Maskot:**

- Nama: **WPMeong** — gabungan "WPM" (Words Per Minute) + "meong" (suara kucing).
- Maskot: **kucing** (bisa SVG/ilustrasi lucu di landing page & state kosong).
- Tone: playful, absurd, tapi tetap fokus & cepat. Hindari terlalu formal.
- Logo: wordmark "WPMeong" + ikon kucing sederhana. Font display: Inter Black + JetBrains Mono.
- Brand color: pakai `--primary` (§4) sebagai aksen utama, maskot boleh pakai oranye `--accent`.

**Versi dokumen:** 2.2.0 — terakhir diperbarui: 1 Oktober 2026. Perubahan besar wajib melalui PR dan review.
