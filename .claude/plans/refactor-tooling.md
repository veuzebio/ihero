# Plano: Tooling de Refatoração

## Problema atual

O projeto tem qualidade garantida no fluxo de **criação** (`/new-section`), mas não no fluxo de **refatoração**:

- `quality-check` só verifica paths hardcoded (`hero/hero.ts`, `skills/skills.ts`) — não serve para checar o que mudou
- Não existe comparação antes/depois — não sabe se algo regrediu
- Não há verificação de código morto, escopo da mudança, ou atualização de testes
- Não há guia de processo — cada refatoração é ad hoc

---

## Solução: 3 novos artefatos + 2 atualizações

### 1. Agent: `refactor-reviewer.md` (novo)

Revisor especializado em refatorações. Recebe os arquivos alterados + descrição do objetivo e verifica:

- **API preservada** — interface pública do componente não mudou acidentalmente
- **Código morto** — imports não usados, variáveis não referenciadas, branches inalcançáveis
- **Testes atualizados** — arquivos `.spec.ts` foram revisados junto com o componente
- **Escopo contido** — mudanças estão dentro do objetivo declarado (sem "scope creep")
- **Documentação** — `CLAUDE.md` atualizado se componente foi renomeado/movido

Output: JSON `{ passed, violations[], summary }`

---

### 2. Workflow: `refactor.js` (novo)

Gate de qualidade pós-refatoração. Recebe `args = { files: string[], description: string }`.

- **Phase Check** (paralelo): tsc + vitest + `refactor-reviewer` + `a11y-check` (se houver `.html` nos arquivos)
- **Phase Report**: relatório consolidado em pt-BR — o que passou, o que regrediu, próximos passos

Retorna: `{ passed, errorCount, warningCount, report }`

---

### 3. Skill: `/refactor` (nova)

Guia o processo completo passo a passo:

1. **Coleta**: quais arquivos/componente, qual o objetivo da refatoração
2. **Baseline**: roda `quality-check` antes de qualquer mudança e salva o resultado
3. **Refatoração**: aplica as mudanças (fase de edição real)
4. **Verificação**: roda workflow `refactor` passando os arquivos alterados + descrição
5. **Commit**: se tudo passou, sugere mensagem no formato Conventional Commits (`refactor(scope): descrição`)

---

### 4. Update: `quality-check.js` (existente)

Corrige os paths hardcoded (`hero/hero.ts`, `skills/skills.ts`) → descoberta dinâmica de todos os componentes em `src/app/` via glob no agente de conventions.

---

### 5. Update: `CLAUDE.md` (existente)

Adiciona entradas nas tabelas de Workflows e Skills para os novos artefatos.

---

## O que NÃO será adicionado

- Hook `PreToolUse` para commit — hooks só têm `continue: true`, não bloqueiam
- Prettier no hook — já existe permissão, o hook de tsc já cobre o principal
- Mudanças em outros arquivos — escopo contido nos 5 itens acima

---

## Arquivos a criar/alterar

| Operação | Arquivo |
|---|---|
| criar | `.claude/agents/refactor-reviewer.md` |
| criar | `.claude/workflows/refactor.js` |
| criar | `.claude/skills/refactor/SKILL.md` |
| atualizar | `.claude/workflows/quality-check.js` |
| atualizar | `.claude/CLAUDE.md` |
