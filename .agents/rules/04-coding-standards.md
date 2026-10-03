---
trigger: always_on
---

# Standar Koding

- **TypeScript Strict:** Hindari `any`. Gunakan tipe yang eksplisit.
- **Immutability:** Hindari mutasi langsung; gunakan spread atau `structuredClone`.
- **Pure Functions:** Semua logika di `lib/` (metrics, engine) harus murni & punya unit test.
- **React:** Functional components + hooks. Event handler prefix `handle*`.
- **Styling:** Tailwind utility-first. Gunakan CSS variable untuk warna (lihat §4 di AGENTS.md).
- **Testing:** Unit test untuk `lib/metrics.ts`, `lib/typing-engine.ts`, `lib/chart-data.ts` — coverage ≥ 90%.
- **Commit:** Conventional Commits (`feat:`, `fix:`, `chore:`).
- **Sebelum Selesai:** Jalankan `pnpm lint && pnpm test && pnpm build`.
