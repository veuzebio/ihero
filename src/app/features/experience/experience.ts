import { Component } from '@angular/core';
import { profile } from '../../data/profile';
import { TimelineList, TimelineItem } from '../../shared/components';

@Component({
  selector: 'app-experience',
  imports: [TimelineList, TimelineItem],
  templateUrl: './experience.html',
})
export class Experience {
  readonly items = profile.experience;
}
