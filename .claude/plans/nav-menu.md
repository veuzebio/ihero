# Plano: Menu lateral de navegação

## Objetivo
Criar um componente `NavMenu` — sidebar fixa no desktop, hamburguer + overlay no mobile — com active state via `IntersectionObserver` e scroll suave via links âncora.

---

## Arquivos a criar

| Arquivo | Ação |
|---|---|
| `src/app/nav-menu/nav-menu.ts` | Novo componente |
| `src/app/nav-menu/nav-menu.html` | Template do componente |

## Arquivos a modificar

| Arquivo | Mudança |
|---|---|
| `src/app/hero/hero.html` | Adicionar `id="hero"` na `<section>` |
| `src/app/skills/skills.html` | Adicionar `id="skills"` + `aria-labelledby="skills-heading"` na `<section>`; `id="skills-heading"` no `<h2>` |
| `src/app/education/education.html` | Adicionar `id="education"` na `<section>` |
| `src/app/app.ts` | Importar `NavMenu`, adicionar ao `imports`, atualizar template com layout de sidebar |
| `.claude/CLAUDE.md` | Adicionar `NavMenu` na tabela de App Structure |

---

## Componente `NavMenu`

### Estado e lógica (`nav-menu.ts`)

- `isOpen = signal(false)` — controla visibilidade no mobile
- `activeSection = signal('hero')` — id da seção atualmente visível
- `navItems` array fixo: `[{ label: 'Início', id: 'hero' }, { label: 'Habilidades', id: 'skills' }, { label: 'Formação', id: 'education' }]`
- `IntersectionObserver` criado em `afterNextRender()` (SSR-safe — só roda no browser)
  - `rootMargin: '-20% 0px -80% 0px'` → destaca a seção próxima ao topo do viewport
  - Observa todos os `section[id]` no documento
- `ngOnDestroy` desconecta o observer
- `DOCUMENT` injetado via `inject(DOCUMENT)` — nunca acesso direto ao `document` global (SSR)

### Layout (`app.ts`)

```html
<app-nav-menu />
<main class="lg:ml-52">
  <app-hero />
  <app-skills />
  <app-education />
</main>
```

### Template (`nav-menu.html`)

**Desktop (lg+):** sidebar fixa `w-52`, `left-0`, `top-0`, `h-full`, sempre visível.

**Mobile:** sidebar oculta (`-translate-x-full` → `translate-x-0` quando `isOpen()`); botão hamburguer fixo no canto superior esquerdo; backdrop semi-transparente ao abrir (clique fecha o menu).

**Links:** `<a href="#{{ item.id }}">` — o `scroll-behavior: smooth` já está em `styles.css`, então a navegação suave é automática. Ao clicar, `closeMenu()` é chamado (fecha no mobile).

**Active state:** `[class.text-[--color-accent]]="activeSection() === item.id"`.

### Acessibilidade

- `<nav aria-label="Navegação da página">` 
- Botão hamburguer: `aria-expanded` vinculado a `isOpen()`, `aria-controls="nav-sidebar"`, `aria-label`
- `id="nav-sidebar"` no elemento `<nav>` interno
- Tecla `Escape` fecha o menu mobile (host listener no `keydown`)

---

## Âncoras nas seções existentes

As seções precisam de `id` para os links âncora funcionarem. O `skills.html` também precisa de `aria-labelledby` (atualmente está faltando — correção de acessibilidade junto):

- `hero.html` → `<section id="hero" ...>`
- `skills.html` → `<section id="skills" aria-labelledby="skills-heading" ...>` + `<h2 id="skills-heading" ...>`
- `education.html` → `<section id="education" ...>` (já tem `aria-labelledby`)
