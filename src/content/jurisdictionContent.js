/**
 * JURISDICTION CONTENT (English).
 *
 * A page can be laid out in one of TWO ways, set by its `layout`:
 *
 *   layout: 'text'  — ONE flowing card with headings, paragraphs and bullet
 *                     lists, built from the shared blocks helpers. Used by
 *                     Mandate (a long, document-like page).
 *
 *   layout: 'cards' — EACH point in its OWN card with a coloured icon, the
 *                     cards cycling through a palette. Used by What We Can
 *                     Do, How We Do and What We Can Not Do (short lists).
 *                     Each card is {icon, text}; the page also carries a
 *                     `title` and `titleIcon` for the centred page heading.
 *
 * Content is taken from the Office of the Ombudsman Punjab website
 * (ombudsmanpunjab.gov.pk). Urdu lives in jurisdictionContent.ur.js and is
 * attached below as each page's `ur`.
 */
import {heading, paragraph, bullets} from './blocks';
import {jurisdictionContentUr} from './jurisdictionContent.ur';

export const jurisdictionContent = {
  // -------------------------------------------------------------------------
  // MANDATE — the long, document-style page (flowing text card).
  mandate: {
    en: {
      layout: 'text',
      blocks: [
        heading('Mandate', 'doc'),
        paragraph(
          'The Ombudsman Punjab has the mandate to protect the rights of the people, ensuring adherence to the rule of law, diagnosing, redressing and rectifying any injustice done to a person through maladministration and suppressing corrupt practices.',
        ),

        heading('Jurisdiction, Functions and Power', 'settings'),
        paragraph(
          'Section 9 of the Punjab Office of the Ombudsman Act, 1997, illustrates the jurisdiction, functions and power of the Ombudsman, as under:',
        ),
        paragraph(
          '(1) The Ombudsman may, on a complaint by any aggrieved person, on a reference by the Government or the Provincial Assembly, or on a motion of the Supreme Court or the High Court made during the course of any proceedings before it, or of his own motion, undertake any investigation into any allegation of maladministration on the part of any Agency or any of its officers or employees. Provided that the Ombudsman shall not have any jurisdiction to investigate or inquire into any matters which:',
        ),
        bullets([
          'Are subjudice before a Court of competent jurisdiction on the date of the receipt of a complaint, reference or motion by him; or',
          'Relate to the external affairs of Pakistan or the relations or dealings of Pakistan with any foreign state or Government; or',
          'Relate to, or are connected with, the defence of Pakistan or any part thereof, the Military, Naval and Air Forces of Pakistan, or the matters covered by the laws relating to those forces.',
        ]),
        paragraph(
          '(2) Notwithstanding anything contained in subsection (1), the Ombudsman shall not entertain for investigation any complaint by or on behalf of a public servant or functionary concerning any matters relating to the Agency in which he is, or has been, working, in respect of any personal grievance relating to his service therein.',
        ),
        paragraph(
          '(3) For carrying out the objectives of this Act and, in particular, for ascertaining the root causes of corrupt practices and injustice, the Ombudsman may arrange for studies to be made or research to be conducted and may recommend appropriate steps for their eradication.',
        ),

        heading('Functions', 'chart'),
        paragraph(
          'The law empowers the Ombudsman Punjab to entertain complaints against any department, commission or office of the Provincial Government or a statutory corporation or other institution established or controlled by the Provincial Government, but does not include the High Court and the Courts working under the supervision of the High Court and the Provincial Assembly and its Secretariat.',
        ),
        paragraph(
          'Under section 9(1) of the Act, the Ombudsman, on a complaint of any aggrieved person, on a reference by the Government or the Provincial Assembly, or on a motion of the Supreme Court or the High Court, or on his own motion (suo moto), can undertake any investigation into any allegation of maladministration on the part of any agency or its officers or employees.',
        ),

        heading('Powers', 'lock'),
        paragraph(
          'The Ombudsman has the same powers as are vested in a Civil Court under the Code of Civil Procedure for summoning and enforcing the attendance of any person; compelling the production of documents; receiving evidence on affidavits; and issuing commission for examination of witnesses. The Ombudsman is vested with the powers to enter and search any premises and inspect any article, books of account and other documents; impound and seal such article. The Ombudsman has the same powers, mutatis mutandis, as the High Court has to punish any person for its contempt.',
        ),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // WHAT WE CAN DO — icon cards.
  whatWeCanDo: {
    en: {
      layout: 'cards',
      title: 'What We Can Do',
      titleIcon: 'check',
      cards: [
        {icon: 'user', text: 'On a complaint by any aggrieved person;'},
        {icon: 'inbox', text: 'On a reference by the Government or the Provincial Assembly;'},
        {icon: 'doc', text: 'On a motion of the Supreme Court or the High Court;'},
        {
          icon: 'search',
          text: 'Undertake any investigation into any allegation of maladministration on the part of any Agency or any of its officers or employees.',
        },
        {icon: 'lock', text: '(Section 9(1): The Punjab Office of the Ombudsman Act, 1997)'},
      ],
    },
  },

  // -------------------------------------------------------------------------
  // HOW WE DO — icon cards.
  howWeDo: {
    en: {
      layout: 'cards',
      title: 'How We Do',
      titleIcon: 'settings',
      cards: [
        {icon: 'doc', text: 'The following procedure is followed in handling the complaints:'},
        {
          icon: 'check',
          text: 'The day-to-day working of the Office does not invoke strict/orthodox procedural and legal formalities.',
        },
        {
          icon: 'upload',
          text: 'A complainant can file a complaint by post, e-mail, online on the Ombudsman Punjab website, on the Mobile App or in person — whichever is convenient.',
        },
        {icon: 'inbox', text: 'The format of the complaint is not strictly laid down.'},
        {
          icon: 'calendar',
          text: 'It is normally registered on the day of its receipt and a notice is issued to the agency for submission of a report.',
        },
        {
          icon: 'check',
          text: 'There is no court fee. Likewise, the appearance of counsels is not required, although the complainant has the right of being represented.',
        },
        {icon: 'folder', text: 'A complaint is required to comprise the following:'},
        {icon: 'doc', text: 'The complaint on plain paper.'},
        {icon: 'user', text: 'Copy of the Identity Card.'},
        {
          icon: 'lock',
          text: 'An affidavit on plain paper regarding the veracity of the contents and that the matter is not subjudice.',
        },
        {
          icon: 'bell',
          text: 'Registration is not refused to incomplete complaints; the complainant is advised to provide the required documents, and has free access to the Hon’ble Ombudsman, the Secretary and the Investigating Officers.',
        },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // WHAT WE CAN NOT DO — icon cards.
  whatWeCanNotDo: {
    en: {
      layout: 'cards',
      title: 'What We Can Not Do',
      titleIcon: 'close',
      cards: [
        {
          icon: 'bell',
          text: 'The Ombudsman does not have any jurisdiction to investigate or enquire into matters which:',
        },
        {
          icon: 'close',
          text: 'Are subjudice before a court of competent jurisdiction on the date of the receipt of a complaint, reference or motion by him;',
        },
        {
          icon: 'globe',
          text: 'Relate to the external affairs of Pakistan or the relations or dealings of Pakistan with any foreign state or government;',
        },
        {
          icon: 'check',
          text: 'Relate to, or are connected with, the defence of Pakistan or any part thereof, the Military, Naval and Air Forces of Pakistan, or the matters covered by the laws relating to those Forces.',
        },
        {icon: 'doc', text: '(Section 9(1): The Punjab Office of the Ombudsman Act, 1997)'},
        {
          icon: 'users',
          text: 'Similarly, the Ombudsman does not entertain any complaint by or on behalf of a public servant or functionary concerning any matters relating to the Agency in which he is, or has been, working, in respect of any personal grievance relating to his service therein.',
        },
        {icon: 'folder', text: '(Section 9(2): The Punjab Office of the Ombudsman Act, 1997)'},
      ],
    },
  },
};

// Attach the Urdu version of each page as its `ur`.
Object.keys(jurisdictionContentUr).forEach(key => {
  if (jurisdictionContent[key]) {
    jurisdictionContent[key].ur = jurisdictionContentUr[key];
  }
});