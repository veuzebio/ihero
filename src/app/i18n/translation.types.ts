import type { SkillLevel } from './profile.types';

export type Language = 'pt-BR' | 'en-US';

export interface Translations {
  readonly nav: {
    readonly ariaLabel: string;
    readonly openMenu: string;
    readonly closeMenu: string;
    readonly home: string;
    readonly skills: string;
    readonly experience: string;
    readonly education: string;
  };
  readonly theme: {
    readonly activateLight: string;
    readonly activateDark: string;
    readonly lightLabel: string;
    readonly darkLabel: string;
  };
  readonly language: {
    readonly groupLabel: string;
    readonly ptBrLabel: string;
    readonly enUsLabel: string;
    readonly ptBrAriaLabel: string;
    readonly enUsAriaLabel: string;
  };
  readonly hero: {
    readonly greeting: string;
  };
  readonly skills: {
    readonly heading: string;
    readonly levelLabels: Record<SkillLevel, string>;
  };
  readonly experience: {
    readonly heading: string;
  };
  readonly education: {
    readonly heading: string;
  };
}
