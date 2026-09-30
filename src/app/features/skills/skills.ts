import { Component, computed, inject } from '@angular/core';
import { Icon } from '../../shared';
import { LanguageService } from '../../shared/services';

@Component({
  selector: 'app-skills',
  imports: [Icon],
  templateUrl: './skills.html',
})
export class Skills {
  private readonly languageService = inject(LanguageService);

  readonly skills = computed(() => this.languageService.profile().skills);
  readonly t = computed(() => this.languageService.t());
}
