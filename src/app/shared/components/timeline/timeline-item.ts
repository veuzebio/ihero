import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  host: { class: 'relative flex gap-6 pb-10 last:pb-0' },
  template: `
    <span
      class="absolute -left-6 top-1.5 size-3 -translate-x-1/2 rounded-full border-2 border-neutral-400 bg-white dark:border-dark-muted dark:bg-dark-surface"
      aria-hidden="true"
    ></span>
    <div class="flex flex-col gap-1">
      <ng-content />
    </div>
  `,
})
export class TimelineItem {}
