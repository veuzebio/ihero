import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../shared/services';
import { TimelineList, TimelineItem } from '../../shared/components';

@Component({
  selector: 'app-education',
  imports: [TimelineList, TimelineItem],
  templateUrl: './education.html',
})
export class Education {
  private readonly languageService = inject(LanguageService);

  readonly education = computed(() => this.languageService.profile().education);
  readonly t = computed(() => this.languageService.t());
}
