import { Component } from '@angular/core';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
})
export class Skills {
  readonly skills = profile.skills;
}
