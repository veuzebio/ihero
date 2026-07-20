import { Component } from '@angular/core';
import { Icon } from '../../shared';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-skills',
  imports: [Icon],
  templateUrl: './skills.html',
})
export class Skills {
  readonly skills = profile.skills;
}
