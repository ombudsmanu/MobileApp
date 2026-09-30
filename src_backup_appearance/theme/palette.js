/**
 * THE BASE PALETTE — Ombudsman Punjab.
 *
 * HIERARCHY PRINCIPLE:
 *   title   → the DARKEST green: carries the most visual weight
 *   heading → mid green: clearly lighter than title, clearly darker than body
 *   body    → grey-green: recedes behind the headings
 *   accent  → orange: stands apart from the green family entirely
 *

 */
export const basePalette = {
  name: 'Ombudsman Punjab',
  isLight: true,

  bg: ['#FFFFFF', '#FBFAF7', '#F4F2EC'],
  solid: '#FBFAF7',

  blobs: ['#B7CDB5', '#F4CBA6', '#C6D8C4', '#F0C299'],

  // Orange — used for accent highlights, active states, buttons
  accent: '#E8913A',
  accentPressed: '#D07A26',
  brandGreen: '#326B38',
  success: '#326B38',
  danger: '#C0392B',

  text: {
    //
    // ┌─────────┬──────────┬─────────────────────────────────────────┐
    // │ Role    │ Colour   │ Where you see it                       │
    // ├─────────┼──────────┼─────────────────────────────────────────┤
    // │ TITLE   │ #1B3D20  │ "Ombudsman", "Sign in", "OPMIS",      │
    // │         │          │  screen names — the BIGGEST text       │
    // ├─────────┼──────────┼─────────────────────────────────────────┤
    // │ HEADING │ #3D6B42  │ "WELCOME TO", "QUALITY MANAGEMENT",    │
    // │         │          │  section labels, field labels, sidebar │
    // │         │          │  items — MID-size text                  │
    // ├─────────┼──────────┼─────────────────────────────────────────┤
    // │ BODY    │ #5F6E62  │ descriptions, instructions, copyright, │
    // │         │          │  sidebar email — SMALL reading text     │
    // ├─────────┼──────────┼─────────────────────────────────────────┤
    // │ MUTED   │ #8A9489  │ hints, placeholders, "COMING SOON",    │
    // │         │          │  captions — text you don't need to read │
    // ├─────────┼──────────┼─────────────────────────────────────────┤
    // │ FAINT   │ #B0B7B1  │ very faint labels, version number,     │
    // │         │          │  disabled text — barely visible         │
    // └─────────┴──────────┴─────────────────────────────────────────┘
    //
    title: '#1B3D20',
    heading: '#3D6B42',
    body: '#5F6E62',
    muted: '#8A9489',
    faint: '#B0B7B1',
    onAccent: '#FFFFFF',
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
};

export default basePalette;