import { Component } from '@angular/core';
import { NavMenu } from './layout/nav-menu';
import { Hero, Skills, Education, Experience } from './features';
import { Mascot } from './shared';

@Component({
  selector: 'app-root',
  imports: [Hero, Skills, Education, Experience, NavMenu, Mascot],
  template: `
    <app-nav-menu />
    <main class="pt-12 lg:pt-0 lg:ml-52">
      <app-hero />
      <app-skills />
      <app-experience />
      <app-education />
    </main>
    <app-mascot />
  `,
})
export class App {}
