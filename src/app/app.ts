import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Skills } from './skills/skills';

@Component({
  selector: 'app-root',
  imports: [Hero, Skills],
  template: `
    <main>
      <app-hero />
      <app-skills />
    </main>
  `,
})
export class App {}
