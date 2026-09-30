/**
 * TEXT targets only. Background now lives in its own card on the
 * Appearance screen, alongside background images.
 */
/**
 * The four customisable text roles. `text` is kept as the key for
 * Paragraph so colours saved by earlier versions still load.
 */
export const colorTargets = [
  {key: 'title', label: 'Title'},
  {key: 'heading', label: 'Heading'},
  {key: 'subheading', label: 'Subheading'},
  {key: 'text', label: 'Paragraph'},
];
/**
 * Text colours — both light and dark, because backgrounds can now be
 * either. The first four are for dark backgrounds.
 */
export const textSwatches = [
  '#FFFFFF',
  '#E6F0E7',
  '#C9DCCB',
  '#B4C4B6',
  '#12301A',
  '#1B3D20',
  '#2F4A33',
  '#326B38',
  '#4E7D52',
  '#5F6E62',
  '#E8913A',
  '#C4652A',
  '#1F4E79',
  '#5B3F8C',
  '#8C2F39',
  '#111111',
];

/**
 * Solid backgrounds — rich, saturated deep tones. All are dark enough
 * that the app automatically switches to dark cards, light icons and
 * light control text, and recommends a light text set.
 */
export const backgroundSwatches = [
  '#0B6E4F', // emerald
  '#166534', // forest green
  '#0F766E', // deep teal
  '#075985', // ocean blue
  '#1E3A8A', // royal blue
  '#3730A3', // indigo
  '#5B21B6', // deep violet
  '#701A75', // plum
  '#9F1239', // crimson
  '#9A3412', // burnt orange
];