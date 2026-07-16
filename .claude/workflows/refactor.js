export const meta = {
  name: 'refactor',
  description: 'Quality gate after a refactoring: runs tsc, vitest, refactor-reviewer, and a11y-check in parallel, then produces a consolidated pt-BR report.',
  whenToUse: 'After completing a refactoring. Pass { files: string[], description: string } via args.',
  phases: [
    { title: 'Check', detail: 'tsc, vitest, refactor-reviewer, and a11y-check (if HTML files present) running in parallel' },
    { title: 'Report', detail: 'Consolidate results and list action items in pt-BR' },
  ],
};

// ── Validate args ──────────────────────────────────────────────────────────────

const files = (args && args.files) ? args.files : [];
const description = (args && args.description) ? args.description : 'No description provided.';
const htmlFiles = files.filter(f => f.endsWith('.html'));
const hasHtml = htmlFiles.length > 0;

log(`Checking ${files.length} file(s): ${files.join(', ')}`);

// ── Shared result schema ───────────────────────────────────────────────────────

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

// ── Phase 1: all checks run simultaneously ─────────────────────────────────────

phase('Check');

const checkThunks = [
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
      `Review the following Angular component files after a refactoring.

Files changed: ${JSON.stringify(files)}
Refactoring goal: ${description}

Use the refactor-reviewer agent checklist:
- API preservation: selectors, input()/output() signals, public properties still intact
- Dead code: unused imports, unreachable branches, commented-out code
- Test coverage: .spec.ts exists and was updated for each changed .ts file
- Scope containment: changes limited to files required by the goal
- Documentation: CLAUDE.md updated if component was renamed/moved
- Angular v22 regressions: no standalone:true, no changeDetection, native control flow, track in @for

Map each violation to an item with severity "error" (must fix) or "warning" (suboptimal).`,
      { label: 'refactor-reviewer', phase: 'Check', schema: RESULT_SCHEMA },
    ),
];

if (hasHtml) {
  checkThunks.push(
    () =>
      agent(
        `Run an accessibility audit on the following HTML template files.

Files: ${JSON.stringify(htmlFiles)}

Check for WCAG AA violations:
- <section> has aria-labelledby pointing to its <h2> id
- <h2> id matches the aria-labelledby value
- Decorative inline SVGs have aria-hidden="true"
- Links with target="_blank" have rel="noopener noreferrer"
- Interactive elements (buttons, links) have accessible labels
- Color contrast: no hardcoded hex colors bypassing design tokens

Map each violation to severity "error" (critical/major) or "warning" (minor).`,
        { label: 'a11y-check', phase: 'Check', schema: RESULT_SCHEMA },
      ),
  );
}

const checkResults = await parallel(checkThunks);

// ── Phase 2: consolidate and report ───────────────────────────────────────────

phase('Report');

const results = checkResults.filter(Boolean);
const allPassed = results.every(r => r.passed);
const errors = results.flatMap(r => r.items.filter(i => i.severity === 'error'));
const warnings = results.flatMap(r => r.items.filter(i => i.severity === 'warning'));

const checkLabels = ['tsc', 'vitest', 'refactor-reviewer'];
if (hasHtml) checkLabels.push('a11y-check');

const report = await agent(
  `Produza um relatório de qualidade pós-refatoração em português (pt-BR) com base nestes resultados:

Objetivo da refatoração: ${description}
Arquivos verificados: ${JSON.stringify(files)}

Resultados (${checkLabels.join(', ')}):
${results.map((r, i) => `${checkLabels[i]}: ${JSON.stringify(r)}`).join('\n')}

Formate o relatório em markdown com:
1. Status geral em uma linha (✅ todos os checks passaram OU ❌ X erros encontrados)
2. Uma seção por check que falhou, listando cada erro com localização no arquivo
3. Uma seção "Próximos passos" com o que deve ser corrigido antes do commit, em ordem de prioridade
4. Se tudo passou, confirme e sugira a mensagem de commit no formato Conventional Commits: refactor(<scope>): <descrição>

Seja direto e conciso.`,
  { label: 'report', phase: 'Report' },
);

return {
  passed: allPassed,
  errorCount: errors.length,
  warningCount: warnings.length,
  report,
};
