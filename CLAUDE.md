# CLAUDE.md

Panduan kerja untuk Claude Code di proyek **WPMeong**.

> ⚠️ **WAJIB BACA** file `@AGENTS.md` sebelum menulis kode, karena file itu
> berisi business requirements, technical details, color scheme, strategi,
> dan coding standards lengkap proyek ini.

---

## Quick Context

- **Nama proyek:** WPMeong (WPM + meong) — typing test berbahasa Indonesia & Inggris.
- **Repo:** https://github.com/rajuputra/wpmeong
- **Deploy target:** https://wpmeong.web.app (Firebase Hosting, Spark plan)
- **Stack:** Next.js 14 (static export) + TypeScript + Tailwind + Zustand + Recharts
- **Backend:** Firebase Auth (Google OAuth2) + Cloud Firestore
- **Mode tes:** time only, 30s / 60s
- **Bahasa:** `id` & `en`, difficulty: `normal` & `advanced`

## Aturan Kerja untuk Claude

1. **Selalu baca `@AGENTS.md`** sebelum mengubah kode. Jika ada konflik antara file ini dan `AGENTS.md`, **`AGENTS.md` yang menang**.
2. **Jangan tambah dependency** tanpa persetujuan. Lihat §6.8 di AGENTS.md.
3. **Jangan tambah mode tes baru** (words, quote, custom) — scope v1 hanya time 30s/60s.
4. **Unit test wajib** untuk semua fungsi di `lib/` (metrics, typing-engine, chart-data).
5. **Commit message:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
6. **Sebelum selesai:** jalankan `pnpm lint && pnpm test && pnpm build`.
7. **Kalau ambiguous:** tanya dulu, jangan asumsi.

## Perintah Penting

```bash
pnpm install          # install deps
pnpm dev              # dev server (localhost:3000)
pnpm build            # static export ke ./out
pnpm test             # vitest
pnpm lint             # eslint

# Firebase
firebase login
firebase use wpmeong
firebase emulators:start
firebase deploy --only hosting
firebase hosting:channel:deploy staging --expires 7d
```

## Struktur Repo (lihat detail di AGENTS.md §3.3)

```
wpmeong/
├─ app/          # Next.js App Router
├─ components/   # UI components
├─ lib/          # pure logic + firebase + wordlists
├─ store/        # zustand stores
├─ types/        # shared types
├─ tests/        # unit + e2e
├─ public/       # static assets, maskot SVG
├─ firebase.json
├─ firestore.rules
└─ next.config.mjs
```

## Roadmap Aktif (lihat AGENTS.md §5.1)

Fokus saat ini: **v0.1 → v0.2** (setup repo → typing engine + UI dasar).
Jangan lompat ke fase berikutnya tanpa instruksi eksplisit.
