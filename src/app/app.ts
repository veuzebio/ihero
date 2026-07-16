import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Skills } from './skills/skills';
import { Education } from './education/education';

@Component({
  selector: 'app-root',
  imports: [Hero, Skills, Education],
  template: `
    <main>
      <app-hero />
      <app-skills />
      <app-education />
    </main>
  `,
})
export class App {}
