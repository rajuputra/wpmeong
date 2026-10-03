---
trigger: always_on
---

# Stack Teknologi & Konfigurasi

- **Framework:** Next.js 14+ (App Router) dengan **static export** (`output: 'export'`).
- **Bahasa:** TypeScript (strict mode).
- **Styling:** Tailwind CSS + shadcn/ui.
- **State:** Zustand.
- **Chart:** Recharts.
- **Auth:** Firebase Authentication (Google OAuth2).
- **Database:** Cloud Firestore.
- **Testing:** Vitest + Playwright.
- **Package Manager:** pnpm.
- **Node:** ≥ 20 LTS.

## Struktur Folder Target

wpmeong/
├─ app/ # Halaman (landing, test, history, login)
├─ components/ # Komponen UI
├─ lib/ # Logika murni, Firebase, wordlist
├─ store/ # Zustand stores
├─ types/ # Tipe data
└─ tests/ # Unit & E2E tests
