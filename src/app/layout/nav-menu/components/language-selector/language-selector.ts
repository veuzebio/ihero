import { Component, inject, input } from '@angular/core';
import { LanguageService } from '../../../../shared/services';
import { Icon } from '../../../../shared/components';
import type { Language } from '../../../../i18n';

export type LanguageSelectorVariant = 'icon' | 'switch';

@Component({
  selector: 'app-language-selector',
  imports: [Icon],
  templateUrl: './language-selector.html',
})
export class LanguageSelector {
  readonly variant = input.required<LanguageSelectorVariant>();
  readonly languageService = inject(LanguageService);

  readonly languages: readonly Language[] = ['pt-BR', 'en-US'];

  onKeydown(event: KeyboardEvent, current: Language): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();

    const idx = this.languages.indexOf(current);
    const nextIdx =
      event.key === 'ArrowRight'
        ? (idx + 1) % this.languages.length
        : (idx - 1 + this.languages.length) % this.languages.length;
    const next = this.languages[nextIdx];

    this.languageService.setLanguage(next);

    const group = (event.currentTarget as HTMLElement).parentElement;
    const buttons = group?.querySelectorAll<HTMLElement>('[role="radio"]');
    buttons?.[nextIdx]?.focus();
  }
}
