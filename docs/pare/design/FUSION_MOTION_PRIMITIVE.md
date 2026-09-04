# PARÉ Fusion Motion Primitive

Status: locked design-system direction; hero is the proving ground.

## Purpose

Fusion is not a decorative hero trick. It is PARÉ's reusable motion language for turning complexity into focus.

The mechanic has five states:

1. **Field** — many elements exist at different apparent depths, scales, opacities, and blur levels.
2. **Recognition** — the meaningful elements become perceptually easier to notice before they fully resolve.
3. **Diffusion** — non-essential elements separate in depth: some move toward the viewer, some recede, some drift laterally, and some blur out.
4. **Convergence** — the selected elements align, sharpen, and become dominant.
5. **Resolution** — one clear object remains stable while the field disappears.

This directly expresses the PARÉ principle: remove what does not serve the work.

## Reuse rule

Use Fusion only when the interface is communicating **many → one**, **noise → signal**, **draft → decision**, or **system → outcome**.

Good uses:

- landing hero: letter field → PARÉ
- project generation: inputs/agents/files → one artifact
- brand exploration: many candidates → selected direction
- review: annotations/noise → approved output
- loading/agent orchestration: many workers → one finished result
- Studio entrance or section transitions where complexity collapses into a single next action

Do not apply it to every hover, button, card, or ordinary page transition. Repetition should create a recognizable brand grammar, not motion noise.

## Highest-level visual behavior

The field must feel spatial rather than like a flat grid with opacity animation.

- Elements start at deliberately varied scale and depth.
- Near elements may briefly enlarge past the camera plane.
- Far elements may compress, soften, and recede.
- Blur is depth-dependent, not uniform.
- Motion vectors vary; avoid identical radial displacement.
- Selected elements converge on their own timing curve.
- Selected elements sharpen before the field fully disappears.
- The final object must hold still long enough to feel resolved.

## Mobile behavior

Mobile gets the same idea, not a reduced desktop imitation.

- use a longer scroll runway
- preserve large scale contrast
- keep the selected object inside safe margins
- reduce displacement distance before reducing hierarchy
- preserve the near/far illusion
- avoid continuous GPU-heavy animation after resolution

## Accessibility

For `prefers-reduced-motion: reduce`, skip spatial travel and resolve directly to the selected state while preserving hierarchy and meaning.

## Performance bar

- transform/opacity first
- blur used selectively
- one `requestAnimationFrame` loop per active Fusion instance
- stop work when the state is resolved or offscreen
- no dependency required for the landing proof
- any later reusable component must preserve the same behavior without adding a large animation framework solely for this effect

## Release rule

The current landing hero remains the proving ground. Do not propagate Fusion across the product until the hero passes rendered desktop/mobile review. Once visually approved, extract the proven parameters into a reusable component/utility rather than cloning the hero code.
