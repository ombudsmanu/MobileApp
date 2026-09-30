/**
 * THE BASE PALETTE — Ombudsman Punjab.
 *
 * Three kinds of colour live here:
 *   text     — the four CUSTOMISABLE roles (+ fixed muted/faint)
 *   icon     — FIXED. Icons never follow text customisation.
 *   control  — FIXED. Button labels and input text never follow it either.
 */
export const basePalette = {
  name: 'Ombudsman Punjab',
  isLight: true,

    // Soft mint at the top warming to sand at the bottom: green and orange
  // are already present in the background, so the page has identity
  // instead of reading as plain white
  bg: ['#EEF6EF', '#F8F6EF', '#F3E8D6'],
  solid: '#F6F4EC',

  // Richer blobs so the depth is actually visible
  blobs: ['#9CC7A2', '#F4B77E', '#B4D6B8', '#EFA96A'],

  // Deeper orange: about 3.8:1 on white (was 2.5:1), readable as text
  accent: '#ee6e0d',
  accentPressed: '#A9551A',
  brandGreen: '#2E6B3A',
  success: '#2E7D3E',
  danger: '#C0392B',

   // ---- Text roles: defaults the user can override ----
   // Every role passes WCAG AA contrast on white
  text: {
    headline: '#07742d', // ≈ 13:1
    title: '#07742d', // ≈ 10:1
    body: '#4c5e52', // ≈ 9:1
    label: '#190e02d4', // ≈ 5.6:1
    muted: '#7C877F',
    faint: '#A9B1AB',
    onAccent: '#FFFFFF',
  },

  // Defaults on a DARK solid background — used until the user overrides
  textOnDark: {
    headline: '#FFFFFF',
    title: '#E6F0E7',
    body: '#C9D6CB',
    label: '#A9B8AB',
    muted: '#93A395',
    faint: '#6F7D71',
    onAccent: '#FFFFFF',
  },

  // On a wallpaper, small text often sits on bare photo — darker defaults
  textOnWallpaper: {
    label: '#3C4740',
    muted: '#334236',
    faint: '#4C594F',
  },

  // ---- Icons: FIXED. Same keys as `text`, but never overridden ----
  icon: {
    title: '#1B3D20',
    heading: '#2F4A33',
    subheading: '#4E7D52',
    body: '#5F6E62',
    muted: '#8A9489',
    faint: '#B0B7B1',
    onAccent: '#FFFFFF',
  },

  // ---- Controls: FIXED ----
  control: {
    label: '#2F4A33', // glass button labels, chip text
    input: '#1B3D20', // typed text in fields
    placeholder: '#A2AAA4',
  },

    glass: {
    fill: 'rgba(255, 255, 255, 0.82)',
    fillStrong: 'rgba(255, 255, 255, 0.95)',
    border: 'rgba(46, 107, 58, 0.18)',
    highlight: 'rgba(255, 255, 255, 1)',
    rim: 'rgba(46, 107, 58, 0.10)',
    sheenFrom: 'rgba(255, 255, 255, 0.70)',
    sheenTo: 'rgba(255, 255, 255, 0.10)',
    shadow: 'rgba(30, 70, 38, 0.24)',
  },

  // On a wallpaper, cards must be SURFACES, not washes. The photo shows
  // in the gaps between cards and around the edges — that's where a
  // wallpaper belongs, not underneath your text.
  glassOnWallpaper: {
    fill: 'rgba(252, 253, 251, 0.92)',
    fillStrong: 'rgba(253, 254, 252, 0.97)',
    border: 'rgba(255, 255, 255, 0.85)',
    highlight: 'rgba(255, 255, 255, 0.98)',
    rim: 'rgba(27, 61, 32, 0.10)',
    sheenFrom: 'rgba(255, 255, 255, 0.50)',
    sheenTo: 'rgba(255, 255, 255, 0.06)',
    shadow: 'rgba(14, 24, 16, 0.50)',
  },

  /**
   * With solid cards, the veil can be LIGHT — the photo stays rich in
   * the gaps. Only the top needs real strength, for the status bar.
   */
  wallpaper: {
    scrim: 'rgba(250, 250, 246, 0.10)',
    veil: [
      'rgba(250, 250, 246, 0.55)',
      'rgba(250, 250, 246, 0.08)',
      'rgba(250, 250, 246, 0.00)',
      'rgba(250, 250, 246, 0.28)',
    ],
    locations: [0, 0.26, 0.60, 1],
  },
    // When a DARK solid background is chosen, cards, icons and controls
  // flip to dark-friendly versions. This is automatic — not something
  // the user customises.
  glassOnDark: {
    fill: 'rgba(16, 26, 18, 0.55)',
    fillStrong: 'rgba(16, 26, 18, 0.74)',
    border: 'rgba(255, 255, 255, 0.22)',
    highlight: 'rgba(255, 255, 255, 0.38)',
    rim: 'rgba(255, 255, 255, 0.10)',
    sheenFrom: 'rgba(255, 255, 255, 0.16)',
    sheenTo: 'rgba(255, 255, 255, 0.02)',
    shadow: '#000000',
  },

  iconOnDark: {
    title: '#FFFFFF',
    heading: '#E6F0E7',
    subheading: '#C9DCCB',
    body: '#B4C4B6',
    muted: '#93A395',
    faint: '#6F7D71',
    onAccent: '#FFFFFF',
  },

  controlOnDark: {
    label: '#E6F0E7',
    input: '#FFFFFF',
    placeholder: '#8E9C90',
  },
};

export default basePalette;