# Glitch Text Effect

A pure HTML/CSS glitch text animation. No JavaScript required.

Open `index.html` in a browser to preview the effect.

## How It Works

The glitch is built from three stacked copies of the same text. Each layer is shifted slightly and animated at a different speed, which creates the broken, RGB-split look.

### 1. HTML structure

Use one heading (or any block element) with **three `<span>` children**:

```html
<h1 class="glitch">
    <span aria-disabled="true">Icarus</span>
    <span aria-disabled="true">icarus</span>
    <span>icarus</span>
</h1>
```

| Layer | Role |
| --- | --- |
| First `<span>` | Top slice — clipped to the upper 40% of the text |
| Second `<span>` | Bottom slice — clipped to the lower 40% of the text |
| Third `<span>` | Base layer — full text, visible and readable |

The first two spans use `aria-disabled="true"` so screen readers treat them as decorative duplicates and only announce the base layer.

### 2. RGB split with `text-shadow`

The main `.glitch` element gets three colored shadows offset in different directions. That mimics a CRT or digital channel misalignment (red / blue / green):

```css
text-shadow:
  0.05em 0 0 rgb(85, 44, 232),      /* purple */
  -0.025em -0.05em 0 rgb(241, 92, 51), /* orange */
  0.025em 0.05em 0 rgb(47, 254, 112);  /* green */
```

Use `em` units so the offset scales with font size.

### 3. Stack the layers with absolute positioning

The parent needs `position: relative`. Each span is `position: absolute` with `top: 0` and `left: 0`, so all three sit on top of each other.

The base span (last child) stays in normal flow and defines the element’s size. The two decorative spans overlay it.

### 4. Slice the text with `clip-path`

Splitting the text into horizontal bands makes the glitch feel like torn scan lines:

```css
/* Top slice */
.glitch span:first-child {
  clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
  transform: translate(-0.05em, -0.025em);
  opacity: 0.7;
}

/* Bottom slice */
.glitch span:last-child {
  clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  transform: translate(0.05em, 0.025em);
  opacity: 0.5;
}
```

Adjust the polygon percentages to change how much of each slice is visible.

### 5. Animate at different speeds

Apply the same `@keyframes glitch` animation to all three layers, but with different durations:

| Element | Duration | Purpose |
| --- | --- | --- |
| `.glitch` | 750ms | Base RGB shadow flicker |
| First span | 550ms | Top slice drifts out of sync |
| Last span | 350ms | Bottom slice drifts faster |

When layers animate at different rates, the slices and colors never line up cleanly — that’s what sells the glitch.

### 6. The `@keyframes glitch` animation

The keyframes only change `text-shadow` offsets (and occasionally the values themselves). Hold steady for most of the cycle, then jump at short breakpoints (14%, 15%, 49%, 50%, etc.) so the effect feels sharp and digital rather than smooth.

Example pattern:

```css
@keyframes glitch {
  0%, 14% {
    /* stable state */
  }
  15% {
    /* sudden shift — inverted offsets */
  }
  49% {
    /* hold shifted state */
  }
  50% {
    /* another jump — different offsets */
  }
  /* ... */
}
```

The jumps between keyframe steps create the stutter. Long flat sections (0%–14%, 49%–50%) keep the text readable between glitches.

## Step-by-Step: Build Your Own

1. **Create the HTML** — one container with class `glitch` and three `<span>` elements containing the same text.
2. **Style the container** — set font size, weight, color, and `position: relative`.
3. **Add RGB shadows** — three `text-shadow` values with small horizontal/vertical offsets.
4. **Position spans** — `position: absolute` on each span; clip the first and last with `clip-path`.
5. **Offset slices** — use `transform: translate()` and lower `opacity` on the clipped layers.
6. **Write keyframes** — animate `text-shadow` with abrupt changes at uneven percentages.
7. **Apply animation** — attach `animation: glitch <duration> infinite` to the container and each span with different durations.

## Customization

| What to change | Where |
| --- | --- |
| Display text | `index.html` — all three spans must match |
| Glitch colors | `text-shadow` RGB values in `.glitch` and `@keyframes glitch` |
| Intensity | Shadow offset amounts and slice `opacity` |
| Speed | Animation durations (750ms / 550ms / 350ms) |
| Slice size | `clip-path` polygon percentages (40% / 60%) |
| Typography | `font-size`, `font-weight`, `text-transform` on `.glitch` |

## File Overview

| File | Purpose |
| --- | --- |
| `index.html` | Markup — three stacked text layers |
| `styles.css` | Layout, clipping, RGB shadows, and glitch keyframes |

## Tips

- Keep shadow offsets small (around `0.02em`–`0.1em`) so text stays legible.
- Use three spans minimum: two clipped overlays plus one solid base layer.
- Match keyframe shadow colors to the static `.glitch` shadows so the RGB split stays consistent when it jumps.
- Test with uppercase text and a bold weight — glitch effects read best on heavy letterforms.
