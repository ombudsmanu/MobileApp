/**
 * ABOUT US SECTIONS — one entry per card on the About Us screen.
 *
 *   key     unique id; also the translation key: about.<key>
 *   label   English card name (fallback if a translation is missing)
 *   icon    Icon name
 *   colors  badge gradient (the section page reuses the deeper colour)
 *
 * The text of each section lives in aboutContent.js, keyed by `key`.
 */
export const aboutSections = [
  {key: 'introduction', label: 'Introduction', icon: 'doc', colors: ['#43A35A', '#1F6B33']},
  {key: 'ombudsmanProfile', label: 'Ombudsman Profile', icon: 'user', colors: ['#4A90D9', '#1F5C9E']},
  {key: 'ombudsmanMessage', label: 'Ombudsman Message', icon: 'mail', colors: ['#F2A04C', '#D4711C']},
  {key: 'formerOmbudsman', label: 'Former Ombudsman', icon: 'users', colors: ['#9B6FD6', '#5B3AA0']},
  {key: 'secretaryProfile', label: 'Secretary Profile', icon: 'user', colors: ['#2FB5A8', '#157A71']},
  {key: 'formerSecretaries', label: 'Former Secretaries', icon: 'users', colors: ['#5A8DEE', '#2F55B8']},
  {key: 'ourTeam', label: 'Our Team', icon: 'users', colors: ['#F0B43A', '#C28410']},
   {key: 'childrenCommissioner', label: 'Commissioner for Children', icon: 'grid', colors: ['#5B9E6E', '#36704A']},
  {key: 'membership', label: 'Membership', icon: 'check', colors: ['#5FA98C', '#2E6B56']},
  {key: 'publicInformationOfficer', label: 'Public Information Officer', icon: 'bell', colors: ['#6C7BE0', '#3B47A8']},
];


/**
 * SUB-SECTIONS — pages reached from inside a section rather than from the
 * About Us grid. They have the same shape, so the section screen renders
 * them without any special handling.
 */
export const aboutSubSections = [
  {key: 'teamHeadOffice', label: 'Head Office Team', icon: 'doc', colors: ['#5FA98C', '#2E6B56']},
  {key: 'teamRegionalOffice', label: 'Regional Office Team', icon: 'grid', colors: ['#F0923A', '#C2610F']},
];

/** Looks in the main sections first, then the sub-sections. */
export const findAboutSection = key =>
  aboutSections.find(s => s.key === key) ?? aboutSubSections.find(s => s.key === key) ?? null;