import { Component } from '@angular/core';
import { profile } from '../data/profile';

@Component({
  selector: 'app-education',
  templateUrl: './education.html',
})
export class Education {
  readonly education = profile.education;
}
