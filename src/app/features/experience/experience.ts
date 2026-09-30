import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../shared/services';
import { TimelineList, TimelineItem } from '../../shared/components';

@Component({
  selector: 'app-experience',
  imports: [TimelineList, TimelineItem],
  templateUrl: './experience.html',
})
export class Experience {
  private readonly languageService = inject(LanguageService);

  readonly items = computed(() => this.languageService.profile().experience);
  readonly t = computed(() => this.languageService.t());
}
