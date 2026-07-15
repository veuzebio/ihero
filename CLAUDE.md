# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start          # ng serve — dev server at http://localhost:4200
npm run build      # production build → dist/
npm run watch      # incremental dev build with file watching

# Testing
npm test           # ng test — runs Vitest unit tests

# Production SSR server (after build)
npm run serve:ssr:ihero   # node dist/ihero/server/server.mjs (port 4000)
```

Run a single test file:
```bash
npx vitest run src/app/app.spec.ts
```

Format code:
```bash
npx prettier --write "src/**/*.{ts,html,css}"
```

## Architecture

**Angular 22 + SSR** — standalone components, no NgModules. The app runs both in the browser and server-side via `@angular/ssr` + Express.

Entry points:
- [src/main.ts](src/main.ts) — browser bootstrap
- [src/main.server.ts](src/main.server.ts) — server bootstrap
- [src/server.ts](src/server.ts) — Express server; add REST API routes here before the Angular catch-all handler

App shell:
- [src/app/app.ts](src/app/app.ts) — root component (standalone, uses signals)
- [src/app/app.routes.ts](src/app/app.routes.ts) — route definitions (lazy-load feature routes here)
- [src/app/app.config.ts](src/app/app.config.ts) — client `ApplicationConfig` (providers)
- [src/app/app.config.server.ts](src/app/app.config.server.ts) — server-side providers merged on top of client config

**Styling:** Tailwind CSS v4 via PostCSS (`@import 'tailwindcss'` in [src/styles.css](src/styles.css)). No `tailwind.config.js` — configuration is done in CSS using `@theme`.

**Prettier:** single quotes, print width 100, Angular HTML parser for `.html` files (see [.prettierrc](.prettierrc)).

**TypeScript:** strict mode flags enabled (`noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`). Target ES2022, `module: preserve`.

## Key Conventions

- Components are **standalone** — import what they need directly, no shared NgModule barrel.
- Prefer Angular **signals** (`signal()`, `computed()`, `effect()`) over RxJS for local component state.
- RxJS is available for async streams (HTTP, routing events); keep it at service boundaries.
- File naming follows Angular CLI conventions: `feature-name.component.ts`, `feature-name.service.ts`, etc.
- Generate new artifacts with `ng generate` to keep naming consistent.
