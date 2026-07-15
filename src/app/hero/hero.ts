import { Component } from '@angular/core';
import { profile } from '../data/profile';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
})
export class Hero {
  readonly profile = profile;
}
