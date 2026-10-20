/**
 * JURISDICTION SECTIONS — one entry per card on the Jurisdiction screen.
 *
 * Same shape as aboutSections.js, so the Jurisdiction grid is built the
 * exact same way (ModuleTile in a ResponsiveGrid) and looks identical to
 * the rest of the app.
 *
 *   key     unique id; also the translation key: jur.<key>
 *   label   English card name (fallback if a translation is missing)
 *   icon    Icon name (must exist in components/Icon/Icon.jsx)
 *   colors  badge gradient (the detail page reuses the deeper, second colour)
 *
 * The text of each section lives in jurisdictionContent.js (English) and
 * jurisdictionContent.ur.js (Urdu), keyed by `key`.
 *
 * The four sections mirror the official website's Jurisdiction menu:
 *   Mandate, What We Can Do, How We Do, What We Can Not Do.
 */
export const jurisdictionSections = [
  {key: 'mandate', label: 'Mandate', icon: 'doc', colors: ['#E0574E', '#B42318']},
  {key: 'whatWeCanDo', label: 'What We Can Do', icon: 'check', colors: ['#9B6FD6', '#5B3AA0']},
  {key: 'howWeDo', label: 'How We Do', icon: 'settings', colors: ['#4A90D9', '#1F5C9E']},
  {key: 'whatWeCanNotDo', label: 'What We Can Not Do', icon: 'close', colors: ['#5B9E6E', '#2E6B3A']},
];

/** Look a Jurisdiction section up by its key. */
export const findJurisdictionSection = key =>
  jurisdictionSections.find(s => s.key === key) ?? null;