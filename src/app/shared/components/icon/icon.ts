import { Component, input } from '@angular/core';

export type IconName =
  | 'github'
  | 'linkedin'
  | 'sun'
  | 'moon'
  | 'hamburger'
  | 'close'
  | 'crown'
  | 'flag-br'
  | 'flag-us';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<number>(16);
}
