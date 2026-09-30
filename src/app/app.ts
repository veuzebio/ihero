import { Component } from '@angular/core';
import { NavMenu } from './layout/nav-menu';
import { Hero, Skills, Education, Experience } from './features';

@Component({
  selector: 'app-root',
  imports: [Hero, Skills, Education, Experience, NavMenu],
  template: `
    <app-nav-menu />
    <main class="pt-12 lg:pt-0 lg:ml-52">
      <app-hero />
      <app-skills />
      <app-experience />
      <app-education />
    </main>
  `,
})
export class App {}
