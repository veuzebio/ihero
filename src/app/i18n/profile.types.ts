export type SkillLevel = 'advanced' | 'intermediate' | 'exploring';

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly bio: string;
  readonly links: readonly { readonly label: string; readonly url: string; readonly icon: string }[];
  readonly skills: readonly { readonly name: string; readonly level: SkillLevel }[];
  readonly education: readonly {
    readonly degree: string;
    readonly institution: string;
    readonly year: number;
  }[];
  readonly experience: readonly {
    readonly company: string;
    readonly role: string;
    readonly period: string;
    readonly description: string;
  }[];
}
