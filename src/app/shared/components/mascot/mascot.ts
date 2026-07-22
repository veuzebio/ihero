import { Component, computed, inject } from '@angular/core';
import { MascotService } from './mascot.service';

@Component({
  selector: 'app-mascot',
  templateUrl: './mascot.html',
  styleUrl: './mascot.css',
  host: {},
})
export class Mascot {
  private readonly mascotService = inject(MascotService);

  readonly spriteClass = computed(() => {
    const anim = this.mascotService.animation();
    const facingLeft = this.mascotService.facingLeft();
    return `anim-${anim}${facingLeft ? ' facing-left' : ''}`;
  });

  onAnimationEnd(): void {
    this.mascotService.onAnimationEnd();
  }
}
