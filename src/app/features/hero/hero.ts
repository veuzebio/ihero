import { Component } from '@angular/core';
import { profile } from '../../data/profile';
import { SocialLinks } from './components';

@Component({
  selector: 'app-hero',
  imports: [SocialLinks],
  templateUrl: './hero.html',
})
export class Hero {
  readonly profile = profile;
}
