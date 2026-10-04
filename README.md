# EMS — Employee Management System

Frontend for the EMS web app, built from the Figma file *ITPE 2 – John Lester Tan*
(Employee screens: **FINALIZED EMPLOYEE SIDE UI**; Manager screens: **REVISED DESIGN**).
Admin is out of scope for now.

```bash
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Mock login

Data is mocked in `src/lib/mock-data.ts` and held in memory by `src/lib/store.tsx`
(changes persist while you navigate, and reset on reload).

**Temporary mock auth** (`src/lib/auth.ts`): any non-empty username/email and password
signs in and redirects to `/employee/dashboard`. Empty fields still show required errors.
The Manager area is reachable directly at `/manager/dashboard`. Replace `signIn()` when real
authentication is added.

## Structure

```
src/app/(auth)/        login, activate, setup
src/app/(app)/         employee/* and manager/* (shared mock store + AppShell)
src/components/ui/     primitives: Button, Field, Modal, ConfirmDialog, StatusBadge, MenuSelect, Tabs, Pagination…
src/components/layout/ AppShell, Sidebar, PageHeader, UserMenu, NotificationMenu, AuthShell
src/components/data/   StatCard, DataTable, Toolbar, SectionCard, CountTile, table cells
src/features/          screens + domain components (tasks, leave, attendance, announcements, profile, employees)
src/lib/               tokens-adjacent config: status → badge map, nav, types, list hook, formatting
```

Design tokens live in `src/app/globals.css` (`@theme`).

## Replacing image placeholders

Every image is referenced through `src/lib/assets.ts`. Until a Figma asset is exported,
`<ImageSlot>` renders a neutral block at the Figma size (inspect it: `data-placeholder="<key>"`).

1. Export the asset from Figma (node ids are listed in `assets.ts`) into `public/figma/`.
2. Set `src: "/figma/<file>"` on that entry. No component changes needed.

Avatars use `<Avatar src>`; add an `avatar` path to a person in `mock-data.ts` to show a photo.
