import { Component, ElementRef, OnDestroy, ViewChild, afterNextRender, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface NavItem {
  label: string;
  id: string;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.html',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class NavMenu implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private observer: IntersectionObserver | null = null;
  private mediaQuery: MediaQueryList | null = null;
  private readonly onMediaChange = (e: MediaQueryListEvent) => this.isDesktop.set(e.matches);

  @ViewChild('navSidebar') private navSidebarRef!: ElementRef<HTMLElement>;

  readonly isOpen = signal(false);
  readonly isDesktop = signal(false);
  readonly activeSection = signal('hero');

  readonly navItems: NavItem[] = [
    { label: 'Início', id: 'hero' },
    { label: 'Habilidades', id: 'skills' },
    { label: 'Experiência', id: 'experience' },
    { label: 'Formação', id: 'education' },
  ];

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeSection.set(entry.target.id);
            }
          }
        },
        { rootMargin: '-20% 0px -80% 0px' },
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
