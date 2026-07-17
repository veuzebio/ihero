---
name: new-section
description: "Creates a new portfolio section in the ihero app. Use when the user asks to add a new section, page block, or content area to the portfolio. Generates the standalone Angular component, registers it in app.ts, and optionally adds a data field to profile.ts."
---

# New Section

Scaffold a new standalone Angular component section for the ihero portfolio.

## Workflow

### 1. Gather Information

Ask the user for:
- **Section name** (e.g., `experience`, `education`, `contact`) — will be used as the component class name, selector `app-<name>`, and folder `src/app/<name>/`
- **Description** — one sentence about what this section shows
- **Data source** — does this section need new fields in `profile.ts`? If yes, what fields and types?

### 2. Generate the component

New sections live under `src/app/features/<name>/`. See `src/app/features/skills/` as reference.

**`src/app/features/<name>/<name>.ts`**
```typescript
import { Component } from '@angular/core';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-<name>',
  templateUrl: './<name>.html',
})
export class <ClassName> {
  // expose only what the template needs
  readonly data = profile.<field>;
}
```

**`src/app/features/<name>/index.ts`**
```typescript
export { <ClassName> } from './<name>';
```

Rules:
- Do NOT set `standalone: true` (default in Angular v22+)
- Do NOT set `changeDetection` (OnPush is default in Angular v22+)
- Use `templateUrl` pointing to the sibling `.html` file
- Expose data via `readonly` properties bound to `profile`
- Always create an `index.ts` barrel in the feature folder

**`src/app/features/<name>/<name>.html`**
```html
<section id="<name>" aria-labelledby="<name>-heading" class="px-6 py-24">
  <div class="max-w-2xl mx-auto">
    <h2 id="<name>-heading" class="text-3xl font-bold text-[--color-neutral-900] mb-8">
      <!-- section title -->
    </h2>
    <!-- section content -->
  </div>
</section>
```

Rules:
- Use `<section>` with `aria-labelledby` pointing to the `<h2>` id — required for WCAG AA
- The `<h2>` id must match the `aria-labelledby` value
- Use Tailwind v4 utility classes; design tokens via CSS vars (`--color-accent`, `--color-neutral-*`)
- Use `@for` / `@if` native control flow — never `*ngFor` / `*ngIf`
- `@for` must always include `track` by a unique field

### 3. Update profile.ts (if needed)

If the section needs new data, add the field to `src/app/data/profile.ts` as `const` with appropriate types.

Use `as const` on the whole object to preserve literal types.

### 4. Update features/index.ts

Open `src/app/features/index.ts` and add the export:

```typescript
export { <ClassName> } from './<name>';
```

### 5. Register in app.ts

Open `src/app/app.ts` and:
1. Add the class to the destructured import from `'./features'`
2. Add it to the `imports` array of `@Component`
3. Add `<app-<name> />` to the template in the desired position

### 6. Update the NavMenu

Open `src/app/layout/nav-menu/nav-menu.ts` and add an entry to the `navItems` array **in the same order the section appears in `app.ts`**:

```typescript
{ label: '<Portuguese label>', id: '<name>' },
```

The `id` must match the `id` attribute on the `<section>` element created in step 2. The NavMenu's IntersectionObserver auto-discovers `section[id]` elements, but the anchor link must be in `navItems` for keyboard and click navigation to work.

### 7. Update CLAUDE.md

Add the new section to the Components table in `.claude/CLAUDE.md`:

```markdown
| `<ClassName>` | [src/app/features/<name>/](src/app/features/<name>/) | <description> |
```

### 7. Verify

After creating all files:

1. The PostToolUse hook runs `tsc --noEmit` automatically after each write — fix any TypeScript errors reported before proceeding.
2. Delegate a convention review to the `section-reviewer` agent, passing the paths of the new `.ts` and `.html` files. Apply every **error** it reports before finishing.
3. Delegate an accessibility audit to the `a11y-check` agent, passing the same paths. Apply every **critical** and **major** violation before finishing.

## Conventions checklist

- [ ] Component class name is PascalCase (e.g., `WorkExperience`)
- [ ] Selector is `app-<kebab-case>`
- [ ] Folder and file names are `<kebab-case>` under `src/app/features/<name>/`
- [ ] `<section>` has `id="<name>"` and `aria-labelledby` matching the `<h2>` id
- [ ] `@for` uses `track`
- [ ] No `standalone: true` in decorator
- [ ] No `changeDetection` in decorator
- [ ] `index.ts` barrel created in the feature folder
- [ ] `features/index.ts` updated with the new export
- [ ] `profile.ts` updated if new data was needed
- [ ] `app.ts` updated with import + `imports` array + template tag
- [ ] `layout/nav-menu/nav-menu.ts` `navItems` updated with the new entry (same order as `app.ts`)
- [ ] `.claude/CLAUDE.md` Components table updated
