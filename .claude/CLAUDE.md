You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

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

## Process Hygiene

**Always stop background processes before ending a task.** If a dev server (`ng serve`), SSR server, or any background process was started during the task, stop it before reporting the task as complete — use `devserver_stop` (MCP) or kill the process by port if started via Bash.

Do not leave processes running between tasks unless the user explicitly asks to keep them alive.

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

**Styling:** Tailwind CSS v4 via PostCSS (`@import 'tailwindcss'` in [src/styles.css](src/styles.css)). No `tailwind.config.js` — configuration is done in CSS using `@theme`. Dark mode uses `@variant dark (&:where(.dark, .dark *))` so the `dark:` Tailwind prefix activates when `<html>` has the `.dark` class.

**Theme:** `ThemeService` ([src/app/shared/services/theme/theme.service.ts](src/app/shared/services/theme/theme.service.ts)) manages dark/light mode via a `isDark` signal, persists the choice to `localStorage`, and applies/removes the `.dark` class on `<html>`. The toggle button lives in `ThemeToggle` ([src/app/layout/nav-menu/components/theme-toggle/](src/app/layout/nav-menu/components/theme-toggle/)), rendered twice inside `NavMenu` — as an icon button on mobile and a switch on desktop.

**Prettier:** single quotes, print width 100, Angular HTML parser for `.html` files (see [.prettierrc](.prettierrc)).

**TypeScript:** strict mode flags enabled (`noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`). Target ES2022, `module: preserve`.

## App Structure

This is a single-page portfolio/CV. All content data lives in [src/app/data/profile.ts](src/app/data/profile.ts) — edit that file to change personal info, skills, or links without touching components.

### Folder layout

```
src/app/
  layout/                          ← shell structure (not content sections)
    nav-menu/
      components/
        theme-toggle/              ← ThemeToggle (variant: 'icon' | 'switch')
      nav-menu.ts / .html
      index.ts
    index.ts
  features/                        ← content sections
    hero/
      components/
        social-links/              ← SocialLinks (links input)
      hero.ts / .html / .spec.ts
      index.ts
    skills/
      skills.ts / .html
      index.ts
    experience/
      experience.ts / .html
      index.ts
    education/
      education.ts / .html
      index.ts
    index.ts                       ← re-exports all features
  shared/                          ← cross-cutting concerns
    components/
      icon/                        ← Icon (name, size inputs); centralizes all SVGs
      timeline/                    ← TimelineList + TimelineItem (content projection); used by education and experience
      mascot/                      ← Mascot component + MascotService; pixel art mascot with drag & animations
        mascot.types.ts            ← AnimationName, AnimationConfig, MascotPosition
        mascot.service.ts          ← MascotService (@Service); controls animation state and position
        mascot.ts                  ← Mascot component; position:fixed, drag & drop, animationend chain
        mascot.html / mascot.css
        index.ts
      index.ts
    services/
      theme/                       ← ThemeService
      index.ts
    index.ts
  data/
    profile.ts                     ← all static content
  app.ts / app.routes.ts / app.config.ts
```

### Components

| Component | Path | Description |
| --- | --- | --- |
| `NavMenu` | [src/app/layout/nav-menu/](src/app/layout/nav-menu/) | Sticky sidebar navigation with anchor links; hamburger on mobile; active state via IntersectionObserver |
| `ThemeToggle` | [src/app/layout/nav-menu/components/theme-toggle/](src/app/layout/nav-menu/components/theme-toggle/) | Theme toggle button; `variant="icon"` (mobile) or `variant="switch"` (desktop) |
| `Hero` | [src/app/features/hero/](src/app/features/hero/) | Name, title, bio, contact links |
| `SocialLinks` | [src/app/features/hero/components/social-links/](src/app/features/hero/components/social-links/) | Social link buttons with icons; `links` input |
| `Skills` | [src/app/features/skills/](src/app/features/skills/) | Skill cards with name and level |
| `Education` | [src/app/features/education/](src/app/features/education/) | Academic background with degree, institution, and year |
| `Experience` | [src/app/features/experience/](src/app/features/experience/) | Professional experience with company, role, period, and description |
| `Icon` | [src/app/shared/components/icon/](src/app/shared/components/icon/) | SVG icon component; `name: IconName`, `size?: number` |
| `TimelineList` | [src/app/shared/components/timeline/](src/app/shared/components/timeline/) | Timeline container with vertical line; wraps `TimelineItem` via `ng-content` |
| `TimelineItem` | [src/app/shared/components/timeline/](src/app/shared/components/timeline/) | Single timeline entry with dot marker; projects content via `ng-content` |
| `Mascot` | [src/app/shared/components/mascot/](src/app/shared/components/mascot/) | Pixel art mascot; `position:fixed`, drag & drop (mouse + touch); reacts to section changes via `MascotService` |
| `MascotService` | [src/app/shared/components/mascot/mascot.service.ts](src/app/shared/components/mascot/mascot.service.ts) | Singleton (`@Service`); holds `animation`, `position`, `facingLeft` signals; `play(anim)` chains one-shot animations; injected in `NavMenu` to trigger `jump` on section change |

The root `App` component ([src/app/app.ts](src/app/app.ts)) composes sections directly via inline template — no routing needed for a single-page layout.

**Adding a new section:** every new section **must** also be added to the `navItems` array in [src/app/layout/nav-menu/nav-menu.ts](src/app/layout/nav-menu/nav-menu.ts), in the same order it appears in `app.ts`. The `id` field must match the `id` attribute on the `<section>` element. The `/new-section` skill enforces this automatically.

### Barrel files (index.ts convention)

Every folder that is imported from another location exposes a public API via `index.ts`. Import from the folder, not the file:

```typescript
// correct
import { NavMenu } from './layout/nav-menu';
import { Hero, Skills } from './features';
import { Icon, ThemeService } from './shared';

// avoid
import { NavMenu } from './layout/nav-menu/nav-menu';
```

## Key Conventions

- Components are **standalone** — import what they need directly, no shared NgModule barrel.
- Prefer Angular **signals** (`signal()`, `computed()`, `effect()`) over RxJS for local component state.
- RxJS is available for async streams (HTTP, routing events); keep it at service boundaries.
- File naming follows Angular CLI conventions: `feature-name.component.ts`, `feature-name.service.ts`, etc.
- Generate new artifacts with `ng generate` to keep naming consistent.

### Scroll & layout

- **`scroll-snap-type` must be set on `<main>`, never on `html` or `body`.** Setting it on `html` makes the browser treat CSS `transform` transitions (e.g. sidebar slide-in) as scroll-position changes and snaps them instantly, breaking animations. The `<main>` element is the scroll container (`overflow-y: auto; height: 100svh`); sections use `snap-start`.
- The `IntersectionObserver` in `NavMenu` uses `main` as its `root`. When changing the scroll container, update the `root` option accordingly.
- `scroll-behavior: smooth` belongs on the scroll container (`main`), not just on `html`.
- **Tailwind v4 uses the native CSS `translate` property** (not `transform`) for `translate-x-*` / `translate-y-*` utilities. Always use `transition-[translate,...]` — not `transition-[transform,...]` — when animating these utilities. Using `transform` in the transition list has no effect and the element will jump instantaneously.

## Documentation

**Always keep this file up to date.** After any structural change — new component, new convention, new command, new data file — update the relevant section in this `.claude/CLAUDE.md` before committing. This applies to every task, no exceptions.

## Claude Code Configuration

All Claude Code project configuration lives under `.claude/` and is versioned:

| File | Purpose |
| --- | --- |
| `.claude/CLAUDE.md` | Instructions and conventions for the model (this file) |
| `.claude/settings.json` | Permissions (auto-allowed commands) and hooks |
| `.claude/hooks/tsc-check.js` | PostToolUse hook: runs `tsc --noEmit` after every Write/Edit on `.ts` or `.html` files |
| `.claude/hooks/build-check.js` | PostToolUse hook: runs `tsc --noEmit` after Bash commands containing `rm` on `.ts`/`.html` files — catches broken imports from barrel or file deletions |
| `.claude/skills/new-section/` | Skill `/new-section`: scaffolds a new portfolio section component |
| `.claude/agents/a11y-check.md` | Agent: audits WCAG AA accessibility on a component |
| `.claude/agents/section-reviewer.md` | Agent: reviews a component against ihero conventions |
| `.claude/mcp.json` | MCP servers for this project (GitHub) |
| `.claude/workflows/quality-check.js` | Workflow: tsc + vitest + conventions in parallel, consolidated report |

`settings.local.json` is gitignored — use it for personal overrides (tokens, local paths).

## MCP Servers

| Server | Config | Tools available |
| --- | --- | --- |
| `angular-cli` | `~/.claude.json` (global) | `devserver_*`, `run_target`, `search_documentation`, `get_best_practices` |
| `github` | `.claude/mcp.json` (project) | list/create issues, read PRs, query releases — requires `GITHUB_PERSONAL_ACCESS_TOKEN` in `settings.local.json` |

## Workflows

Invoke workflows by asking Claude to run them by name, or they are triggered automatically by skills.

| Workflow | Trigger | Description |
| --- | --- | --- |
| `quality-check` | `use workflow quality-check` | Runs tsc, vitest, and convention review in parallel — reports consolidated results in pt-BR |
| `refactor` | `use workflow refactor with args {"files":[...],"description":"..."}` | Quality gate after a refactoring: tsc + vitest + refactor-reviewer + a11y-check (HTML only) in parallel, report in pt-BR |

## Skills

Invoke skills by typing the skill name prefixed with `/` in the chat.

| Skill | Trigger | Description |
| --- | --- | --- |
| New Section | `/new-section` | Scaffolds a new standalone Angular section component, registers it in `app.ts`, and updates `profile.ts` and this `CLAUDE.md` |
| Refactor | `/refactor` | Guides a safe refactoring: captures baseline, applies changes, runs the `refactor` workflow as a quality gate, and suggests a Conventional Commits message |

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection
