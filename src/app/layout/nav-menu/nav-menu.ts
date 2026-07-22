import { Component, ElementRef, NgZone, OnDestroy, ViewChild, afterNextRender, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '../../shared/services';
import { ThemeToggle } from './components';
import { Icon } from '../../shared/components';
import { MascotService } from '../../shared';

interface NavItem {
  label: string;
  id: string;
}

@Component({
  selector: 'app-nav-menu',
  imports: [ThemeToggle, Icon],
  templateUrl: './nav-menu.html',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class NavMenu implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly zone = inject(NgZone);
  readonly themeService = inject(ThemeService);
  private readonly mascotService = inject(MascotService);
  private observer: IntersectionObserver | null = null;
  private mediaQuery: MediaQueryList | null = null;
  private readonly onMediaChange = (e: MediaQueryListEvent) => this.isDesktop.set(e.matches);
  private previousSection = 'hero';

  @ViewChild('navSidebar') private navSidebarRef!: ElementRef<HTMLElement>;

  readonly isOpen = signal(false);
  readonly isDesktop = signal(false);
  readonly activeSection = signal('hero');

  navLinkClass(id: string): string {
    const base = 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ease-out ';
    return this.activeSection() === id
      ? base + 'bg-neutral-100 dark:bg-dark-surface-2 text-neutral-900 dark:text-dark-text'
      : base + 'text-neutral-600 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-dark-text hover:bg-neutral-200 dark:hover:bg-dark-surface-2';
  }

  readonly navItems: NavItem[] = [
    { label: 'Início', id: 'hero' },
    { label: 'Habilidades', id: 'skills' },
    { label: 'Experiência', id: 'experience' },
    { label: 'Formação', id: 'education' },
  ];

  constructor() {
    afterNextRender(() => {
      const scrollRoot = this.document.querySelector('main') as HTMLElement;
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.zone.run(() => {
                const newSection = entry.target.id;
                if (newSection !== this.previousSection) {
                  this.previousSection = newSection;
                  this.mascotService.jump();
                }
                this.activeSection.set(newSection);
              });
            }
          }
        },
        { root: scrollRoot, rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      );
      const sections = this.document.querySelectorAll('section[id]');
      sections.forEach((section) => this.observer!.observe(section));

      this.mediaQuery = (this.document.defaultView as Window).matchMedia('(min-width: 1024px)');
      this.isDesktop.set(this.mediaQuery.matches);
      this.mediaQuery.addEventListener('change', this.onMediaChange);
    });
  }

  toggleMenu(): void {
    if (this.isOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu(): void {
    this.isOpen.set(true);
    this.document.defaultView?.requestAnimationFrame(() => {
      const firstLink = this.navSidebarRef?.nativeElement.querySelector<HTMLElement>('a');
      firstLink?.focus();
    });
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  onNavKeydown(event: KeyboardEvent): void {
    if (!this.isOpen() || this.isDesktop() || event.key !== 'Tab') return;

    const nav = this.navSidebarRef.nativeElement;
    const focusable = Array.from(nav.querySelectorAll<HTMLElement>('a, button'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (this.document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (this.document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.mediaQuery?.removeEventListener('change', this.onMediaChange);
  }
}
