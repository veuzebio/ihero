import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline-list',
  template: `
    <div class="relative pl-6">
      <div aria-hidden="true" class="absolute top-2 bottom-2 left-0 w-px bg-neutral-200 dark:bg-dark-border"></div>
      <ul role="list">
        <ng-content />
      </ul>
    </div>
  `,
})
export class TimelineList {}
