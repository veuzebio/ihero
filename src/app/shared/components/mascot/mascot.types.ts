export type AnimationName = 'idle' | 'walk' | 'run' | 'jump' | 'fall' | 'fall_loop';

export interface AnimationConfig {
  frames: number;
  durationMs: number;
  loop: boolean;
  /** Animation to transition to when this one ends (for one-shot animations). */
  then?: AnimationName;
}

export const ANIMATION_CONFIGS: Record<AnimationName, AnimationConfig> = {
  idle: { frames: 10, durationMs: 1000, loop: true },
  walk: { frames: 10, durationMs: 800, loop: true },
  run: { frames: 10, durationMs: 500, loop: true },
  jump: { frames: 6, durationMs: 600, loop: false, then: 'idle' },
  fall: { frames: 4, durationMs: 400, loop: false, then: 'fall_loop' },
  fall_loop: { frames: 3, durationMs: 400, loop: true },
};
