/**
 * DOWNLOADS — the documents listed on the Downloads screen.
 *
 *   key           unique id (also names the cached copy)
 *   titleKey      translation key for the title (strings.js)
 *   fallbackTitle English title if the key is missing
 *   descKey       translation key for the one-line description
 *   url           the document's web link. null shows "Not available yet"
 *                 instead of failing, until the Office supplies the link.
 *   fileName      the name it is saved under in the phone's Downloads folder
 *
 * To add a document: add an entry here and its two strings in strings.js.
 */
export const downloads = [
  {
    key: 'affidavit',
    titleKey: 'downloads.affidavit',
    fallbackTitle: 'Affidavit',
    descKey: 'downloads.affidavitDesc',
    url: 'https://ombudsmanpunjab.gov.pk/system/files/Affidavit.pdf',
    fileName: 'Ombudsman-Punjab-Affidavit.pdf',
  },
];