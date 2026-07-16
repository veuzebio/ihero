---
name: refactor
description: "Guides a safe refactoring of an Angular component or file in the ihero project. Captures baseline quality, applies changes, runs the refactor workflow as a quality gate, and suggests a Conventional Commits message. Use when the user wants to refactor, rename, extract, or simplify existing code."
---

# Refactor

Guide a safe, verifiable refactoring in the ihero portfolio project.

## Workflow

### 1. Collect information

Ask the user for:
- **Target** — which file(s) or component(s) to refactor (e.g., `src/app/hero/hero.ts`)
- **Goal** — one sentence describing what should change and why (e.g., "extract the contact links into a separate component")
- **Scope** — confirm the list of files that will be touched

Do not proceed until the goal is clear and unambiguous.

### 2. Baseline quality check

Before touching any file, run `quality-check` to capture the current state:

> "Running quality-check to capture baseline before making changes…"

Save the baseline result (passed/failed, error count). If the baseline already has errors, **inform the user and ask whether to proceed**. Continuing with a broken baseline makes it impossible to know which errors were pre-existing.

### 3. Apply the refactoring

Make the changes needed to achieve the stated goal:

- Follow all Angular v22 conventions from `CLAUDE.md`
- Keep changes scoped to the declared files — do not clean up unrelated code opportunistically
- Update `.spec.ts` files alongside every `.ts` change
- Update `.claude/CLAUDE.md` if a component is renamed or moved
- The PostToolUse hook runs `tsc --noEmit` after each write — fix TypeScript errors immediately before continuing

### 4. Run the quality gate

After all changes are applied, invoke the `refactor` workflow:

```
use workflow refactor with args { "files": ["<changed file 1>", "<changed file 2>"], "description": "<goal>" }
```

The workflow runs in parallel:
- `tsc` — type correctness
- `vitest` — no test regressions
- `refactor-reviewer` — API preservation, dead code, scope containment
- `a11y-check` — accessibility (only when HTML files are involved)

**Fix every error reported before proceeding.** Warnings may be deferred if the user explicitly accepts them.

### 5. Suggest commit

If the quality gate passes, suggest a commit message following Conventional Commits:

```
refactor(<scope>): <imperative description in English>
```

Examples:
- `refactor(hero): extract contact links into ContactLinks component`
- `refactor(skills): simplify skill card template using @for track`
- `refactor(profile): replace inline data with typed constants`

Ask the user to confirm before committing.

---

## Refactoring checklist

- [ ] Goal is stated before any edit is made
- [ ] Baseline quality captured before first edit
- [ ] All `.spec.ts` files updated alongside changed `.ts` files
- [ ] `CLAUDE.md` updated if a component was renamed or moved
- [ ] No unrelated changes (scope creep)
- [ ] `refactor` workflow passed with zero errors
- [ ] Commit message follows Conventional Commits format
