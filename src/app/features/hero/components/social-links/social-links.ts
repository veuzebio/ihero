import { Component, input } from '@angular/core';
import { Icon, IconName } from '../../../../shared/components';

interface SocialLink {
  readonly label: string;
  readonly url: string;
  readonly icon: string;
}

@Component({
  selector: 'app-social-links',
  imports: [Icon],
  templateUrl: './social-links.html',
})
export class SocialLinks {
  readonly links = input.required<readonly SocialLink[]>();

  asIconName(icon: string): IconName {
    return icon as IconName;
  }
}
