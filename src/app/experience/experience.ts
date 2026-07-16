import { Component } from '@angular/core';
import { profile } from '../data/profile';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
})
export class Experience {
  readonly items = profile.experience;
}
