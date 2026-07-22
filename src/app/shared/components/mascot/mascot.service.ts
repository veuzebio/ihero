import { Service, signal, computed } from '@angular/core';
import { ANIMATION_CONFIGS, AnimationName } from './mascot.types';

@Service()
export class MascotService {
  private readonly _animation = signal<AnimationName>('idle');
  private readonly _facingLeft = signal(true);

  readonly animation = this._animation.asReadonly();
  readonly facingLeft = this._facingLeft.asReadonly();
  readonly animationConfig = computed(() => ANIMATION_CONFIGS[this._animation()]);

  onAnimationEnd(): void {
    const config = ANIMATION_CONFIGS[this._animation()];
    if (!config.loop && config.then) {
      this._animation.set(config.then);
    }
  }

  faceLeft(): void {
    this._facingLeft.set(true);
  }

  faceRight(): void {
    this._facingLeft.set(false);
  }

  idle(): void {
    this._animation.set('idle');
  }

  walk(): void {
    this._animation.set('walk');
  }

  run(): void {
    this._animation.set('run');
  }

  jump(): void {
    this._animation.set('jump');
  }

  fall(): void {
    this._animation.set('fall');
  }
}
