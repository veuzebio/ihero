import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../shared/services';
import { SocialLinks } from './components';

@Component({
  selector: 'app-hero',
  imports: [SocialLinks],
  templateUrl: './hero.html',
})
export class Hero {
  private readonly languageService = inject(LanguageService);

  readonly profile = computed(() => this.languageService.profile());
  readonly t = computed(() => this.languageService.t());
}
