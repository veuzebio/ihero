import { Component } from '@angular/core';
import { profile } from '../../data/profile';
import { TimelineList, TimelineItem } from '../../shared/components';

@Component({
  selector: 'app-education',
  imports: [TimelineList, TimelineItem],
  templateUrl: './education.html',
})
export class Education {
  readonly education = profile.education;
}
