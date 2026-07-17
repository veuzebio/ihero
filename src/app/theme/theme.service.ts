import { DOCUMENT } from '@angular/common';
import { Injectable, afterNextRender, inject, signal } from '@angular/core';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly isDark = signal(false);

  constructor() {
    afterNextRender(() => {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      const prefersDark = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
      const dark = stored === 'dark' || (stored === null && prefersDark);
      this.isDark.set(dark);
      this.apply(dark);
    });
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    this.apply(next);
    this.document.defaultView?.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  }

  private apply(dark: boolean): void {
    const html = this.document.documentElement;
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
