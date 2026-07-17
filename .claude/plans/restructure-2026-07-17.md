# Plano de Reestruturação — ihero

## Objetivo
Reorganizar `src/app/` em camadas bem definidas, extrair componentes menores do `NavMenu` (o único arquivo verdadeiramente grande), e atualizar toda a configuração Claude para refletir a nova estrutura.

---

## Nova estrutura de pastas

```
src/app/
  layout/
    nav-menu/
      components/
        theme-toggle/
          theme-toggle.ts      ← componente extraído do NavMenu
          theme-toggle.html
        index.ts               ← re-exporta ThemeToggle
      nav-menu.ts
      nav-menu.html
      index.ts                 ← re-exporta NavMenu
  features/
    hero/
      components/
        social-links/
          social-links.ts      ← componente extraído do Hero
          social-links.html
        index.ts               ← re-exporta SocialLinks
      hero.ts
      hero.html
      index.ts                 ← re-exporta Hero
    skills/
      skills.ts
      skills.html
      index.ts
    experience/
      experience.ts
      experience.html
      index.ts
    education/
      education.ts
      education.html
      index.ts
  shared/
    components/
      icon/
        icon.ts                ← SVGs centralizados (github, linkedin, sun, moon, hamburger, close)
        icon.html
        index.ts
      index.ts                 ← re-exporta Icon
    services/
      theme/
        theme.service.ts       ← movido de app/theme/
        index.ts
      index.ts                 ← re-exporta ThemeService
    index.ts                   ← re-exporta shared/components e shared/services
  data/
    profile.ts                 ← sem mudança
  app.ts
  app.routes.ts
  app.config.ts
  app.config.server.ts
  app.spec.ts
  app.css
```

---

## Componentes a extrair

### 1. `shared/components/icon/` — `IconComponent`
**Por quê:** GitHub, LinkedIn, sun, moon, hamburger e close SVGs estão duplicados/espalhados entre `hero.html` e `nav-menu.html`.

Input: `name: 'github' | 'linkedin' | 'sun' | 'moon' | 'hamburger' | 'close'`
Input: `size?: number` (default 16)

### 2. `layout/nav-menu/components/theme-toggle/` — `ThemeToggleComponent`
**Por quê:** o toggle de tema aparece duas vezes no `nav-menu.html` (mobile top bar e desktop sidebar) com markup e lógica idênticos mas visual diferente — botão simples vs. switch estilizado.

Input: `variant: 'icon' | 'switch'`
- `icon` → botão pequeno com ícone de sol/lua (mobile top bar)
- `switch` → toggle switch + label de texto (desktop sidebar)

Usa `ThemeService` internamente via `inject()`. O `NavMenu` deixa de chamar `themeService.toggle()` diretamente.

### 3. `features/hero/components/social-links/` — `SocialLinksComponent`
**Por quê:** os links sociais com SVGs inline fazem o `hero.html` ter ~44 linhas. Extrai para componente próprio.

Input: `links: typeof profile.links`

---

## Arquivos mortos a deletar

- `src/app/app.html` — órfão do `ng new`, não referenciado por ninguém

---

## Passos de implementação

1. **Mover** `theme.service.ts` → `shared/services/theme/theme.service.ts`; adicionar `index.ts` de barril na pasta.
2. **Criar** `shared/components/icon/` com `IconComponent`.
3. **Criar** `layout/nav-menu/components/theme-toggle/` com `ThemeToggleComponent`.
4. **Refatorar** `nav-menu.html` para usar `<app-theme-toggle>` e `<app-icon>`.
5. **Mover** toda a pasta `nav-menu/` → `layout/nav-menu/`; adicionar `index.ts` de barril.
6. **Criar** `features/hero/components/social-links/` com `SocialLinksComponent`.
7. **Refatorar** `hero.html` para usar `<app-social-links>` e `<app-icon>`.
8. **Mover** `hero/`, `skills/`, `experience/`, `education/` → `features/`; adicionar `index.ts` em cada um.
9. **Adicionar** `shared/index.ts` e `features/index.ts` de barril.
10. **Atualizar** todos os imports em `app.ts` para os novos caminhos.
11. **Deletar** `src/app/app.html`.
12. **Atualizar** `.claude/CLAUDE.md` — tabela App Structure, paths, e convenções.
13. **Atualizar** `.claude/skills/new-section/SKILL.md` — novos paths.
14. **Rodar** quality-check workflow no final.

---

## O que NÃO muda

- `profile.ts` permanece em `src/app/data/` — é dado, não feature.
- `app.ts`, `app.routes.ts`, `app.config.ts`, `app.config.server.ts` permanecem em `src/app/` — são o shell do app.
- Nenhuma lógica de negócio é alterada, apenas organização e extração de templates.
- Conteúdo visual do app idêntico antes e depois.
