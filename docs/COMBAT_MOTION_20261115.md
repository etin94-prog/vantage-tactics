# Motion polish (A) and sharp scaling (B1) — 2026-11-15

Follows docs/COMBAT_MOTION_20261111.md. No new frames were drawn. The original sheets, battle rules and numbers are unchanged, and so are the cue timings (attack 960 ms with contact at 360 ms, cast 1000 ms, total move time).

## Motion (A)
- **Walk-cycle bug.** The walk frame counter wrapped at 6 while the original sheet cycles 4 poses (0-1-2-1). The visible cycle was 0-1-2-1-0-1, which dropped a step every 0.6 s. Walking frames now follow distance walked (`walkFrame`): a contact pose at each tile centre and the passing pose half way, so one step per tile. Custom 6-frame sheets keep time-based frames.
- **Easing.** Moves speed up from rest and slow into the last tile on a trapezoid speed profile (`moveTravel`). Total time is unchanged. The per-tile hop follows the same distance and is now 3 px (was 4).
- **Hit.** 60 ms hit-stop shudder (±1.5 px), then a shove of up to 7 px, a lean back away from the blow and a squash, settling by 320 ms (`sampleHitPose`, `HIT_TIMING`; total = `COMBAT_TIMING.hit`). A 0-damage hit stays still.
- **Knock-out.** White flash, a fall of about 29° backwards with a 6–9 px sink, then a fade into motes of the element colour (`sampleDownPose`, `Renderer.knockOut`). This replaces the plain double fade.
- **Idle.** Ground units breathe: a foot-anchored squash of about ±1.8% height on a 2.7 s cycle. Only fliers (`movementType` 4) still bob in the air.
- **Reduced motion.** Removes every added transform. Walking goes tile by tile and a knock-out only fades.

## Sharp scaling (B1)
- Each 96 px cell is enlarged by a whole number k with nearest-neighbour, where k = ceil(device scale), from 1 to 6. The renderer then smooths it the small remaining step. This removes the uneven 2 px/3 px pixel columns at fractional zoom and the shimmer of sub-pixel motion.
- Cells are cached and the least recently used are dropped past 16 M pixels (about 64 MB).
- Files: `src/renderer.js` (`sharpFactor`, `sharpCell`, `drawCell`).

## Validation
- `npm test` 150/150, `npm run check`, `npm run lab:test` 35/35 and `npm run build` all pass.
- Browser preview: no console errors, frame cost about 3.3 ms.
- Before/after pose strip rendered in the preview (walk, hit, knock-out).
- Not yet checked on a physical phone.

These changes are in the main `src`, which also holds the unmeasured AI items 5–7. A public deploy of the motion work alone would have to be built from the release copy.
