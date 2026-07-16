export const meta = {
  name: 'quality-check',
  description: 'Runs TypeScript check, unit tests, and Angular convention review in parallel, then reports a consolidated quality summary.',
  whenToUse: 'After creating or editing Angular components, or before committing.',
  phases: [
    { title: 'Check', detail: 'tsc, vitest, and section-reviewer running in parallel' },
    { title: 'Report', detail: 'Consolidate results and list action items' },
  ],
};

// ── Phase 1: all three checks run simultaneously ──────────────────────────────

phase('Check');

const RESULT_SCHEMA = {
  type: 'object',
  properties: {
    passed: { type: 'boolean' },
    summary: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['error', 'warning', 'info'] },
          message: { type: 'string' },
          location: { type: 'string' },
        },
        required: ['severity', 'message'],
      },
    },
  },
  required: ['passed', 'summary', 'items'],
};

const [tscResult, testResult, conventionResult] = await parallel([
  () =>
    agent(
      `Run TypeScript type checking for the ihero project.
Execute: npx tsc -p tsconfig.app.json --noEmit
Parse the output and return structured results.
If the command succeeds with no output, the project passed.
If it fails, extract each error line into items with severity "error".`,
      { label: 'tsc', phase: 'Check', schema: RESULT_SCHEMA },
    ),

  () =>
    agent(
      `Run the unit test suite for the ihero project.
Execute: npx vitest run --reporter=verbose
Parse the output and return structured results.
Map failing tests to items with severity "error".
Map passing tests to items with severity "info".`,
      { label: 'vitest', phase: 'Check', schema: RESULT_SCHEMA },
    ),

  () =>
    agent(
      `Review all Angular section components in src/app/ against ihero conventions.

First, discover all components dynamically:
- List all subdirectories of src/app/ (exclude app-level files and the data/ folder)
- For each subdirectory, find the .ts and .html component files
- Also read src/app/app.ts for registration correctness

For each component found, verify:
- No standalone: true in @Component decorator (default in Angular v22+)
- No changeDetection set explicitly (OnPush is default in Angular v22+)
- No *ngIf / *ngFor / *ngSwitch — must use @if / @for / @switch
- Every @for has a track expression
- No ngClass / ngStyle — must use [class] / [style] bindings
- <section> has aria-labelledby matching the <h2> id
- Decorative SVGs have aria-hidden="true"
- Component is registered in app.ts imports array and template

Map each violation to an item with severity "error" or "warning".
Include the component name and file path in each item's location field.`,
      { label: 'conventions', phase: 'Check', schema: RESULT_SCHEMA },
    ),
]);

// ── Phase 2: consolidate and report ──────────────────────────────────────────

phase('Report');

const results = [tscResult, testResult, conventionResult].filter(Boolean);
const allPassed = results.every(r => r.passed);
const errors = results.flatMap(r => r.items.filter(i => i.severity === 'error'));
const warnings = results.flatMap(r => r.items.filter(i => i.severity === 'warning'));

const report = await agent(
  `Produce a concise quality report in Portuguese (pt-BR) based on these check results:

TypeScript (tsc): ${JSON.stringify(tscResult)}
Unit Tests (vitest): ${JSON.stringify(testResult)}
Angular Conventions: ${JSON.stringify(conventionResult)}

Format the report as markdown with:
1. A one-line overall status (✅ all checks passed OR ❌ X errors found)
2. A section per check that failed, listing each error with file location
3. A "Next steps" section listing what must be fixed before committing, in priority order

If everything passed, just say so clearly and suggest the next step (commit).`,
  { label: 'report', phase: 'Report' },
);

return {
  passed: allPassed,
  errorCount: errors.length,
  warningCount: warnings.length,
  report,
};
