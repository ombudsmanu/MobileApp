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

  bg: ['#FFFFFF', '#FBFAF7', '#F4F2EC'],
  solid: '#FBFAF7',
  blobs: ['#B7CDB5', '#F4CBA6', '#C6D8C4', '#F0C299'],

  accent: '#E8913A',
  accentPressed: '#D07A26',
  brandGreen: '#326B38',
  success: '#326B38',
  danger: '#C0392B',

  // ---- Text roles: defaults the user can override ----
  text: {
    title: '#1B3D20', // darkest — one per screen
    heading: '#3D6B42', // card and section titles
    subheading: '#4E7D52', // secondary lines, names, sub-sections
    body: '#5F6E62', // paragraphs
    muted: '#8A9489', // labels, captions (fixed)
    faint: '#B0B7B1', // disabled, placeholders (fixed)
    onAccent: '#FFFFFF', // text on orange buttons (fixed)
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
    fill: 'rgba(255, 255, 255, 0.80)',
    fillStrong: 'rgba(255, 255, 255, 0.94)',
    border: 'rgba(78, 125, 82, 0.16)',
    highlight: 'rgba(255, 255, 255, 1)',
    rim: 'rgba(78, 125, 82, 0.08)',
    sheenFrom: 'rgba(255, 255, 255, 0.85)',
    sheenTo: 'rgba(255, 255, 255, 0.15)',
    shadow: 'rgba(78, 125, 82, 0.22)',
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