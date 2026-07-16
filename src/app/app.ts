import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Skills } from './skills/skills';
import { Education } from './education/education';
import { Experience } from './experience/experience';
import { NavMenu } from './nav-menu/nav-menu';

@Component({
  selector: 'app-root',
  imports: [Hero, Skills, Education, Experience, NavMenu],
  template: `
    <app-nav-menu />
    <main class="lg:ml-52">
      <app-hero />
      <app-skills />
      <app-experience />
      <app-education />
    </main>
  `,
})
export class App {}
