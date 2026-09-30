/**
 * CONTENT BLOCKS — the building blocks of the About Us pages.
 *
 * Shared by aboutContent.js (English) and aboutContent.ur.js (Urdu), so both
 * languages build exactly the same shapes and AboutSectionScreen renders
 * them the same way.
 *
 *   heading(text)                          starts a new card with a title
 *   paragraph(text)                        body text
 *   bullets([...])                         bulleted list
 *   profile({name, role, photo})           photo card
 *   signature({name, role})                sign-off at the end of a message
 *   people([{name, tenure | role, photo, bio}])   one card per person
 *   contact({rows})                        tappable email / phone rows
 *   link({label, url})                     opens the browser
 *   sections([...])                        cards that open sub-pages
 */
export const heading = text => ({type: 'heading', text});
export const paragraph = text => ({type: 'paragraph', text});
export const profile = ({name, role, photo = null}) => ({type: 'profile', name, role, photo});
export const signature = ({name, role}) => ({type: 'signature', name, role});
export const people = items => ({type: 'people', items});
export const bullets = items => ({type: 'bullets', items});
export const contact = ({rows}) => ({type: 'contact', rows});
export const link = ({label, url}) => ({type: 'link', label, url});
export const sections = items => ({type: 'sections', items});