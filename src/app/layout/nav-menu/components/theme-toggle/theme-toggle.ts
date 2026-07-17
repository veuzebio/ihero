import { Component, input, inject } from '@angular/core';
import { ThemeService } from '../../../../shared/services';
import { Icon } from '../../../../shared/components';

export type ThemeToggleVariant = 'icon' | 'switch';

@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle {
  readonly variant = input.required<ThemeToggleVariant>();
  readonly themeService = inject(ThemeService);
}
