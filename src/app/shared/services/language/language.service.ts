import { DOCUMENT } from '@angular/common';
import { Service, afterNextRender, computed, inject, signal } from '@angular/core';
import type { Language, Translations } from '../../../i18n/translation.types';
import ptBrTranslations from '../../../i18n/translations/pt-BR.json';
import enUsTranslations from '../../../i18n/translations/en-US.json';
import { profilePtBr } from '../../../i18n/profile.pt-BR';
import { profileEnUs } from '../../../i18n/profile.en-US';
import type { Profile } from '../../../i18n/profile.types';

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: Language = 'pt-BR';

const TRANSLATIONS: Record<Language, Translations> = {
  'pt-BR': ptBrTranslations,
  'en-US': enUsTranslations,
};

const PROFILES: Record<Language, Profile> = {
  'pt-BR': profilePtBr,
  'en-US': profileEnUs,
};

@Service()
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  private readonly _language = signal<Language>(DEFAULT_LANGUAGE);

  readonly language = this._language.asReadonly();
  readonly t = computed(() => TRANSLATIONS[this._language()]);
  readonly profile = computed(() => PROFILES[this._language()]);

  constructor() {
    afterNextRender(() => {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      const lang: Language = stored === 'en-US' ? 'en-US' : DEFAULT_LANGUAGE;
      this._language.set(lang);
      this.apply(lang);
    });
  }

  setLanguage(lang: Language): void {
    this._language.set(lang);
    this.apply(lang);
    this.document.defaultView?.localStorage.setItem(STORAGE_KEY, lang);
  }

  private apply(lang: Language): void {
    this.document.documentElement.lang = lang;
  }
}
