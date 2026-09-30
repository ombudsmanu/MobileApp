/**
 * ABOUT US CONTENT — the text of each section, keyed by section key.
 *
 * Each language holds a list of BLOCKS, shown in order:
 *   heading(text)                          starts a new card with a title
 *   paragraph(text)                        body text
 *   profile({name, role, photo})           photo card
 *   signature({name, role})                sign-off at the end of a message
 *   people([{name, tenure, photo, bio}])   one card per person;
 *                                          bio = list of paragraphs, or null
 *
 * A section without an `ur` list shows its English content in Urdu mode,
 * with a note. To add Urdu later, add `ur: [...]` beside `en`.
 *
 * PHOTOS: put the image in src/assets/people/ and replace `photo: null`
 * with  photo: require('../assets/people/<file>.jpg')
 * Keep `null` until the file exists — requiring a missing file stops
 * the app from building.
 */

import {
  heading,
  paragraph,
  profile,
  signature,
  people,
  bullets,
  contact,
  link,
  sections,
} from './blocks';
import {aboutContentUr} from './aboutContent.ur';
export const aboutContent = {
  // -------------------------------------------------------------------------
  introduction: {
    en: [
      heading('History'),
      paragraph(
        `The term “Ombudsman” is of Swedish origin and in its ordinary dictionary meaning denotes “an official appointed to investigate complaints against the public authorities, government departments or the people who work for them”. The institution of Ombudsman has its roots in ancient times. The complaint handling systems resembling the present Institution were functioning as far back as the early days of Islam, and are still functioning in many Muslim countries. However, as an institution, the Ombudsmanship originated in Sweden about 200 years ago as a parliamentary supervisory body.`,
      ),
      paragraph(
        `The institution of Ombudsman is aimed at protecting individual’s right without jeopardizing the efficacy of public policies faced by most of the societies in the contemporary world but the functional competence and the organizational structure of this institution varies from country to country depending on peculiar circumstances of each case. It is legally established, functionally autonomous, external to the administration, operationally independent of both legislature and executive, non-political, sympathetic to citizens, not averse to administration, freely accessible and practically having access to the documents relevant to the impugned executive decision.`,
      ),
      paragraph(
        `The institution has proved to be an invaluable help to the common man as a ‘grievance redressal mechanism’. The concept gradually became popular in a number of countries from 1960 onward. In Pakistan, first it was set up at the Federal level in 1983. Later it was established in Punjab on 30th September, 1996 through an Ordinance. The Ordinance was followed by two other Ordinances and finally the Punjab Office of the Ombudsman Act, 1997 (Act X of 1997) was promulgated.`,
      ),
      heading('Ombudsmanship in Punjab'),
      paragraph(
        `The Office of Ombudsman Punjab has been established with the prime objective “to provide protection for the rights of the people, to ensure adherence to the rule of law, to suppress corrupt practices; to diagnose, redress and rectify any injustice done to a person through maladministration”. The law empowers the Ombudsman Punjab to entertain complaints against any department, commission or a statutory corporation or other institutions established by the Provincial Government, but does not include the High Court and the courts working under the supervision of High Court and the Provincial Assembly and its secretariat.`,
      ),
      paragraph(
        `Ombudsman has the same powers as are vested in a civil court under the Code of Civil Procedure for summoning and enforcing the attendance of any person; compelling the production of documents; receiving evidence on affidavits; and issuing commission for examination of witnesses. The Ombudsman is vested with the powers to enter and search any premises or inspect any article, books of account and other documents, impound and seal such articles.`,
      ),
    ],
  },

  // -------------------------------------------------------------------------
  ombudsmanProfile: {
    en: [
      profile({
        name: 'Ms. Ayesha Hamid',
        role: 'Ombudsman Punjab',
        photo: require('../assets/people/ayesha-hamid.jpg'),
      }),
      paragraph(
        `Ms. Ayesha Hamid was sworn in as the 9th Ombudsman for the Province of Punjab on 9th October, 2024. By assuming this Office, she made history as the first woman to hold this esteemed position.`,
      ),
      paragraph(
        // CHECK: "Pakistani’s" is as supplied — probably meant "Pakistan’s"
        `Prior to her appointment, Ms. Hamid had a distinguished career as a practicing lawyer and served as the head of one of Pakistani’s oldest and most reputable law firms, Hamid Law Associates. She holds a B.Sc. in Economics from the London School of Economics and Political Science.`,
      ),
      paragraph(
        `Ms. Hamid graduated with a law degree from Punjab University in 1996, joined the legal fraternity, and became an Advocate of the High Court in 2008 and the Supreme Court in 2016. She has prosecuted several constitutional cases of national importance, many of which have been reported in law journals. She is a Member of Supreme Court Bar Association, Lahore High Court Bar Association, Punjab Bar Association and Islamabad High Court Bar Association.`,
      ),
      paragraph(
        `Beyond her legal practice, Ms. Hamid has collaborated with government ministries, public sector organizations, and prominent local and international corporate entities. Her wealth of experience and dedication to justice continues to shape her vision as the Ombudsman Punjab, ensuring fairness and accountability in public sector.`,
      ),
      paragraph(
        `Ms. Hamid, an accomplished legal professional, has represented government and private organizations on key constitutional, taxation, and arbitration issues, as well as major infrastructural projects. She specializes in banking, intellectual property, environmental laws, civil litigation, and NAB-related cases. Dedicated to public welfare, she has undertaken numerous pro bono cases and supported organizations like the Punjab Girl Guides Association. Her diverse experience and commitment to justice equip her to address public concerns effectively, aligning with her mandate as Ombudsman Punjab.`,
      ),
    ],
  },

  // -------------------------------------------------------------------------
  ombudsmanMessage: {
    en: [
      paragraph(
        `This Office has endeavored to provide detailed information about the functioning of the institution and complaint handling processes by the Office of the Ombudsman Punjab. This Office redresses the grievances of complainants in an efficient, effective, cost-free and timely manner. The report highlights relief provided to the complainants in matters related to departments of the Punjab Government within the legal framework laid down in the Punjab Office of the Ombudsman Act, 1997.`,
      ),
      paragraph(
        `Any aggrieved person can approach this Office through our website, Mobile App, email, post, phone or personal visit and submit a complaint against an act of maladministration, negligence or corrupt practice by any provincial department or agency of the Punjab Government.`,
      ),
      paragraph(
        `To keep the public informed about the performance of this institution, the report is distributed to all stakeholders and made available on our official website as well. Publication of the annual report serves to inform all concerned as to the manner in which the services of this Office can be utilized by aggrieved persons for the redressal of their grievances. I have apprised my team of Advisors and Investigating Officers that integrity and impartiality of this Office be maintained and they are under obligation to treat the complainants in a compassionate manner. The legal framework of the Punjab Office of the Ombudsman Act, 1997 is strictly followed and implementation of decisions by this Office is ensured.`,
      ),
      paragraph(
        `I am grateful to all stakeholders and departmental heads of the Punjab Government and their representatives for their cooperation in accomplishing the legal mandate of the Office of the Ombudsman Punjab. I am proud of my team of dedicated Advisors, Consultants and functionaries of this institution who work tirelessly to address the complaints received in this Office. Feedback / comments on our performance from the readers / complainants and general public are welcome for further improvement of service delivery by the Office of the Ombudsman Punjab.`,
      ),
      // CHECK: the next two paragraphs repeat paragraph 1 and the end of
      // paragraph 4, as supplied. Delete them if the repeat is accidental.
      paragraph(
        `Through this annual report, this Office has endeavoured to provide detailed information about the functioning of the institution and complaint handling processes by the Office of the Ombudsman Punjab. This Office redresses the grievances of complainants in an efficient, effective, cost-free and timely manner. The report highlights relief provided to the complainants in matters related to departments of the Punjab Government within the legal framework laid down in the Punjab Office of the Ombudsman Act, 1997.`,
      ),
      paragraph(
        `Feedback / comments on our performance from the readers / complainants and general public are welcome for further improvement of service delivery by the Office of the Ombudsman Punjab.`,
      ),
      signature({
        name: 'Ms. Ayesha Hamid',
        role: 'Ombudsman for the Province of Punjab',
      }),
    ],
  },

  // -------------------------------------------------------------------------
  formerOmbudsman: {
    en: [
      paragraph(
        `Since the establishment of the Office of the Ombudsman Punjab, following eminent personalities have served as Provincial Ombudsman Punjab:`,
      ),
      // bio: null until the biography text is supplied
      people([
        {
          name: 'Major Azam Suleman Khan (R)',
          tenure: 'July 2020 – June 2024',
          photo: require('../assets/people/major-azam.jpg'),
          bio: null,
        },
        {
          name: 'Najam Saeed',
          tenure: 'July 2016 – June 2020',
          photo: require('../assets/people/najam-saeed.jpg'),
          bio: null,
        },
        {
          name: 'Javed Mahmood',
          tenure: 'Mar 2013 – May 2016',
          photo: require('../assets/people/javed-mehmood.jpg'),
          bio: null,
        },
        {
          name: 'Khalid Mahmood',
          tenure: 'Dec 2008 – Dec 2012',
          photo: require('../assets/people/khalid-mehmood.jpg'),
          bio: null,
        },
        {
          name: 'Abdul Rashid Khan',
          tenure: 'May 2004 – May 2008',
          photo: require('../assets/people/abdur-rasheed.jpg'),
          bio: null,
        },
        {
          name: 'Justice (R) Sajjad Ahmed Sipra',
          tenure: 'Feb 2000 – Feb 2004',
          photo: require('../assets/people/justice-sajjad.jpg'),
          bio: null,
        },
        {
          name: 'Justice (R) Manzoor Hussain Sial',
          tenure: 'Jan 1997 – Jan 2000',
          photo: require('../assets/people/justice-mehmood.jpg'),
          bio: null,
        },
        {
          name: 'Justice (R) Munir Ahmad Khan',
          tenure: 'Oct 1996 – Dec 1996',
          photo: require('../assets/people/justice-munir.jpg'),
          bio: null,
        },
      ]),
    ],
  },

  // -------------------------------------------------------------------------
  secretaryProfile: {
    en: [
      profile({
        name: 'Mr. Kaiser Saleem (PAS)',
        role: 'Secretary, Ombudsman Punjab',
        photo: require('../assets/people/kaiser-saleem.jpg'),
      }),
      paragraph(
        `Mr. Kaiser Saleem (PAS) assumed the charge of the post of Secretary, Ombudsman Punjab on 27.09.2024. He obtained different trainings at national and international level. He holds vast experience of serving on administrative positions as well as Head of Autonomous bodies / Departments. During his career he has served as Deputy Commissioner, Okara & Muzaffargarh, Director Anti-Corruption Establishment, Faisalabad, Director General Multan Development Authority, Multan, and Additional Secretary in three departments i.e., Home Department, Planning & Development Department and School Education Department, Government of Punjab. He also remained posted as Secretary Government of the Punjab Housing, Urban Development and Public Health Engineering Department South Punjab and Secretary Government of the Punjab, School Education Department South Punjab. He also headed foreign funded projects in the Government of the Punjab.`,
      ),
    ],
  },

  // -------------------------------------------------------------------------
  formerSecretaries: {
    en: [
      paragraph(
        `Following Officers served as Secretary, Ombudsman Punjab for the period mentioned against each:`,
      ),
      people([
        {
          name: 'Tahir Raza Hamdani',
          tenure: 'April 2022 – September 2024',
          photo: null,
          bio: null,
        },
        {
          name: 'Asif Iqbal Chaudhary',
          tenure: 'March 2021 – March 2022',
          photo: null,
          bio: null,
        },
        {
          name: 'Ijaz Ahmed',
          tenure: 'Jan 2019 – March 2021',
          photo: null,
          bio: null,
        },
        {
          name: 'Tariq Mehmood',
          tenure: 'Feb 2017 – Sep 2018',
          photo: null,
          bio: null,
        },
        {
          name: 'Mumtaz Hussain Zahid',
          tenure: 'Oct 2015 – Feb 2017',
          photo: null,
          bio: null,
        },
        {
          name: 'Omer Rasool',
          tenure: 'Nov 2011 – Sep 2013',
          photo: null,
          bio: null,
        },
        {
          name: 'Farkhanda Wasim Afzal',
          tenure: 'Jan 2011 – Nov 2011',
          photo: null,
          bio: null,
        },
        {
          name: 'Javed Nisar A. Khan',
          tenure: 'Nov 2008 – Dec 2010',
          photo: null,
          bio: null,
        },
        {
          name: 'Abdur Rauf Khan',
          tenure: 'Apr 2008 – Nov 2008',
          photo: null,
          bio: null,
        },
        {
          name: 'Dr. Mansoor Ahmed Bajwa',
          tenure: 'Nov 2007 – Dec 2007',
          photo: null,
          bio: null,
        },
        {
          name: 'Muhammad Arif Khan',
          tenure: 'Oct 2006 – Jul 2007',
          photo: null,
          bio: null,
        },
        {
          name: 'Rai Ijaz Ali Zaigham',
          tenure: 'Feb 2003 – Aug 2006',
          photo: null,
          bio: null,
        },
        {
          name: 'Lt. Col. (R) Sultan Haider',
          tenure: 'May 2000 – Jan 2003',
          photo: null,
          bio: null,
        },
        {
          name: 'M. Iqbal Shaikh',
          tenure: 'May 1997 – May 2000',
          photo: null,
          bio: null,
        },
        {
          name: 'Saeed Ahmad Khan',
          tenure: 'Mar 1997 – May 1997',
          photo: null,
          bio: null,
        },
      ]),
    ],
  },

  // -------------------------------------------------------------------------
  childrenCommissioner: {
    en: [
      paragraph(
        `Office of Chief Provincial Commissioner for Children (OCPCC) was established with the support of UNICEF in 2009 and was upgraded in 2013. The project extended its outreach to all 36 districts of the Province of Punjab. The activity of this office has been performed by learned advisors/consultants of the Office of the Ombudsman Punjab for redressal of Child Rights complaints throughout Punjab. The role and function of the Provincial Commissioner for Children is as under:`,
      ),
      bullets([
        'Address Maladministration by Provincial agencies and handle individual complaints',
        'Study, Diagnose and Advice on systemic issues concerning Children’s Rights',
        'Monitor Implementation of Child Commissioner’s Recommendations',
        'Awareness Raising on Children’s Rights Violations',
        'Proactively bring Children’s voice in policy making arenas',
      ]),
      paragraph(
        `Primary function of this office is to examine and investigate complaints made by or on behalf of children in accordance with Act X of 1997. The Office is independent and impartial; it is neither an advocate for the complainant nor an adversary to the Government department. The Office seeks to promote swift resolution of complaints at local level, where possible; and it aims to achieve systemic change through its investigatory work by tackling the root causes of the complaints. The aspect of accessibility has been identified by the Ombudsman Punjab as an essential component to the work of Chief Provincial Commissioner for Children.`,
      ),
      paragraph(
        `The key challenge to CPCC office is lack of awareness regarding child rights and its violation. Birth registration is the cumbersome issue which needs due consideration of concerned authorities. SOS village was facing problem in registration of the children in board of intermediate and secondary education because NADRA was not issuing B-Form and smart cards. In this regard Chief Provincial Commissioner for Children facilitated and provides the platform of redressal and grievance of children’s and adolescents complaints under the Ombudsman Act, 1997.`,
      ),
      paragraph(
        `Chief Provincial Commissioner for Children, Office of the Ombudsman Punjab organized awareness sessions at D.G Khan, Sargodha, Gujranwala, Pakpatan, Sahiwal, Okara and Multan in coordination with district Regional Offices Advisors/Consultants. Chief Provincial Commissioner for Children drew attention to various issues/problems of children in Punjab specifically targeting children of South Punjab. In these sessions DCOs, Social Welfare Department, Govt. stakeholders, CBOs and NGOs were engaged in districts for the betterment of vulnerable condition of children. CPCC also mobilized prominent NGOs and developed referral mechanism with them for quick redressal of complaints of children.`,
      ),
      paragraph(
        `Capacity building and training sessions were also arranged by OCPCC in line with different NGO's and Government agencies. In these sessions training was imparted regarding rights of the children and role of OCPCC was identified in resolving issues like child labour, sexual abuse, corporal punishment, missing facilities in schools, child neglect at family level & children without parental care, beggary, child marriages, sale of children, disabled children and street children.`,
      ),
      paragraph(
        `Children Complain helpline “1050” a toll-free service where all complaints can be registered and get the status of registered complaints. The escalation in children rights violation and increased levels of awareness; it became clear that the helpline is quite useful.`,
      ),
    ],
  },

  // -------------------------------------------------------------------------
  membership: {
    en: [
      heading('International Ombudsman Institute (IOI)'),

      // CHECK: this text is identical to the AOA section below on the
      // official website, apart from the closing web address. Worth
      // confirming with the office whether the IOI entry is correct.
      paragraph(
        `In 1995, during the meeting of the Board of Directors of International Ombudsman Institute (IOI), it was stressed that Asia should also organize a Regional Body. So in view of China’s support which had already been ensured, the then Wafaqi Mohtasib Ombudsman of Pakistan made a commitment to renew the efforts. Pakistan, in 1996, convened the First Conference of the Asian Ombudsmen and the office holders of Ombudsman like institutions from all over the Continent. The main objectives for hosting the moot in which forty delegates from eighteen countries participated, were the promotion of Ombudsman’s concept and discussion on possibility for setting up of an Asian Ombudsman Association (AOA).`,
      ),
      paragraph(
        `Despite the differences of race, religion, culture, forms of governments, pace of development etc. the Conference was crowned with success and the Asian Ombudsman Association (AOA) was unanimously founded on April 16, 1996, in Islamabad, Pakistan. The Ombudsman of Pakistan was elected as its Convener and the Ombudsmen or similar office holders of China, Iran, Hong Kong (China), Korea and Sri Lanka as Members of the Committee.`,
      ),
      paragraph(
        `It is a unique honour for Pakistan that the Ombudsman Association was founded in this country. The Headquarters of Association was also decided to be established at Islamabad. It was long overdue that Asian Ombudsmen had organized a permanent structure to deal with the growing crisis of confidence and performance as we reached the threshold of a new political and economic era. The world has moved into the new millennium. Knowing, that the 21st century will see the transfer of resources of Asia and will become century of Asia politically, economically, socially and culturally, the Asian Ombudsman Association shall provide a forum for the moral foundations and protections of a just society in the Region.`,
      ),
      paragraph(
        `Mr. Abdur Rashid Khan, Ombudsman Punjab (2004 to 2008) participated in the 9th Asian Ombudsman Association Conference held in Hong Kong from 28.11.2005 to 1.12.2005 and the 10th Conference held in Hanoi Vietnam from 25-28 April, 2007.`,
      ),
      link({ label: 'www.theioi.org', url: 'https://www.theioi.org' }),

      heading('Asian Ombudsman Association (AOA)'),
      paragraph(
        `In 1995, during the meeting of the Board of Directors of International Ombudsman Institute (IOI), it was stressed that Asia should also organize a Regional Body. So in view of China’s support which had already been ensured, the then Wafaqi Mohtasib Ombudsman of Pakistan made a commitment to renew the efforts. Pakistan, in 1996, convened the First Conference of the Asian Ombudsmen and the office holders of Ombudsman like institutions from all over the Continent. The main objectives for hosting the moot in which forty delegates from eighteen countries participated, were the promotion of Ombudsman’s concept and discussion on possibility for setting up of an Asian Ombudsman Association (AOA).`,
      ),
      paragraph(
        `Despite the differences of race, religion, culture, forms of governments, pace of development etc. the Conference was crowned with success and the Asian Ombudsman Association (AOA) was unanimously founded on April 16, 1996, in Islamabad, Pakistan. The Ombudsman of Pakistan was elected as its Convener and the Ombudsmen or similar office holders of China, Iran, Hong Kong (China), Korea and Sri Lanka as Members of the Committee.`,
      ),
      paragraph(
        `It is a unique honour for Pakistan that the Ombudsman Association was founded in this country. The Headquarters of Association was also decided to be established at Islamabad. It was long overdue that Asian Ombudsmen had organized a permanent structure to deal with the growing crisis of confidence and performance as we reached the threshold of a new political and economic era. The world has moved into the new millennium. Knowing, that the 21st century will see the transfer of resources of Asia and will become century of Asia politically, economically, socially and culturally, the Asian Ombudsman Association shall provide a forum for the moral foundations and protections of a just society in the Region.`,
      ),
      paragraph(
        `Mr. Abdur Rashid Khan, Ombudsman Punjab (2004 to 2008) participated in the 9th Asian Ombudsman Association Conference held in Hong Kong from 28.11.2005 to 1.12.2005 and the 10th Conference held in Hanoi Vietnam from 25-28 April, 2007.`,
      ),
      link({ label: 'www.aoa.org.pk', url: 'https://www.aoa.org.pk' }),

      heading('Forum of Pakistan Ombudsmen (FPO)'),
      paragraph(
        `The Forum of Pakistan Ombudsmen (FPO) was established on April 16, 2011 as a non-governmental, apolitical, independent and professional forum for Ombudsmen in Pakistan. The Forum was established keeping in view the need to improve coordination, promote capacity building and provide quality services for the common man.`,
      ),
      paragraph(
        `Mr. Abdur Rauf Chaudhry, Federal Tax Ombudsman is the President of the Forum at present. The Forum currently has 12 members and is governed by a four member Board. Ombudsman Punjab was the founding member of the FPO and remained office bearer as Senior Vice President for one term.`,
      ),
    ],
  },

  // -------------------------------------------------------------------------
  publicInformationOfficer: {
    en: [
      profile({
        name: 'Malik Khizar Hayat',
        role: 'Advisor (Legal)',
        photo: null, // require('../assets/people/khizar-hayat.jpg')
      }),
      contact({
        rows: [
          { icon: 'grid', label: 'District', value: 'Lahore' },
          { icon: 'doc', label: 'Office', value: 'Head Office' },
          {
            icon: 'folder',
            label: 'Address',
            value: 'Prof. Ashfaque Ali Khan Road, Lahore',
          },
          {
            icon: 'mail',
            label: 'Email',
            value: 'malikkhizaradvisor@gmail.com',
            action: 'mail',
          },
          {
            icon: 'bell',
            label: 'Phone',
            value: '042 99211406',
            action: 'phone',
          },
        ],
      }),
    ],
  },

  // -------------------------------------------------------------------------
  ourTeam: {
    en: [
      paragraph(
        `The Office of the Ombudsman Punjab is served by Advisors and Consultants at the Head Office in Lahore and at Regional Offices across the Province.`,
      ),
      sections([
        {
          key: 'teamHeadOffice',
          label: 'Head Office',
          icon: 'doc',
          colors: ['#F0B43A', '#C28410'],
        },
        {
          key: 'teamRegionalOffice',
          label: 'Regional Office',
          icon: 'grid',
          colors: ['#E09A2E', '#A56C08'],
        },
      ]),
    ],
  },

  // -------------------------------------------------------------------------
  teamHeadOffice: {
    en: [
      people([
        {
          name: 'Nasim Nawaz',
          role: 'Advisor HQ',
          photo: require('../assets/people/nasim-nawaz.jpg'),
        },
        {
          name: 'Asif Iqbal Chaudhary',
          role: 'Advisor (Coordination)',
          photo: require('../assets/people/asif-iqbal.jpg'),
        },
        {
          name: 'Tariq Mahmood',
          role: 'Advisor (Implementation-I)',
          photo: require('../assets/people/tariq-mahmood.jpg'),
        },
        {
          name: 'Masood Saleem',
          role: 'Advisor (Implementation II)',
          photo: require('../assets/people/masood-saleem.jpg'),
        },
        {
          name: 'Dr. Muhammad Ajmal Khan',
          role: 'Advisor (Implementation I-III)',
          photo: require('../assets/people/ajmal-khan.jpg'),
        },
        {
          name: 'Muhammad Anwar Rashid',
          role: 'Advisor (Implementation IV)',
          photo: require('../assets/people/anwar-rasheed.jpg'),
        },
        {
          name: 'Arif Anwar Baloch',
          role: 'Advisor (Inspection & Monitoring)',
          photo: require('../assets/people/arif-anwar.jpg'),
        },
        {
          name: 'Malik Khizar Hayat Khan',
          role: 'Advisor (Legal)',
          photo: require('../assets/people/khizar-hayat.jpg'),
        },
        {
          name: 'Dr Muhammad Nasir Jamal Pasha',
          role: 'Advisor (Health Services Monitoring)',
          photo: require('../assets/people/nasir-jamal.jpg'),
        },
        {
          name: 'Mian Mohsin Rashid',
          role: 'Advisor Head Office-2 / Focal Person of Overseas Pakistanis',
          photo: require('../assets/people/mohsin-rashid.jpg'),
        },
        {
          name: 'Sami Ullah',
          role: 'Advisor (F&P)/(ITID)',
          photo: require('../assets/people/sami-ullah.jpg'),
        },
        {
          name: 'Dur-e-Shahwar',
          role: 'Director (A&F)',
          photo: require('../assets/people/dur-e.jpg'),
        },
        {
          name: 'Nadeem Hassan Gohar',
          role: 'Registrar',
          photo: require('../assets/people/nadeem-hassan.jpg'),
        },
        {
          name: 'Afzaal Waris',
          role: 'Deputy Director (Dev & Ops)',
          photo: require('../assets/people/afzaal-waris.jpg'),
        },
        {
          name: 'Naila Tayyab',
          role: 'HR Executive',
          photo: require('../assets/people/naila-tayyab.jpg'),
        },
        {
          name: 'Adil Aziz',
          role: 'Deputy Director (IT Infra, Network & Security)',
          photo: require('../assets/people/adil-aziz.jpg'),
        },
        {
          name: 'Sidra Arshad',
          role: 'Deputy Director (P & D)',
          photo: require('../assets/people/sidra-arshad.jpg'),
        },
        {
          name: 'Noor ul Ain Zafar',
          role: 'Deputy Director (I&C)',
          photo: require('../assets/people/noor-ul.jpg'),
        },
        {
          name: 'Muhammad Yamin Bajwa',
          role: 'PSO to Ombudsman',
          photo: require('../assets/people/yasin-bajwa.jpg'),
        },
        {
          name: 'Muhammad Tariq Rashid',
          role: 'Assistant Director (Legal Wing)',
          photo: require('../assets/people/tariq-rashid.jpg'),
        },
      ]),
    ],
  },

  // -------------------------------------------------------------------------
  teamRegionalOffice: {
    en: [
      // NOTE: the Office covers 36 districts, so this list is probably still
      // partial. Add any remaining Regional Office staff here.
      people([
        { name: 'Muhammad Ashraf', role: 'Consultant (Lahore-I)',photo: require('../assets/people/ashraf.jpg') },
        {
          name: 'Syed Amar Shafiq',
          role: 'Consultant (Lahore-II)',
          photo: require('../assets/people/syed-ammar.jpg'),
        },
        { name: 'Moeen Masood', role: 'Advisor (Lahore-III)', photo: require('../assets/people/moeen-masood.jpg')},
        { name: 'Dr. Aamer Ahmed', role: 'Advisor (Lahore-IV)', photo: require('../assets/people/aamer-ahmed.jpg')},
        { name: 'Ahmed Mustjab Karamat', role: 'Advisor (LH-V)', photo: require('../assets/people/ahmed-mustjab.jpg')},
        {
          name: 'Muhammad Hassan Rizvi',
          role: 'Advisor (RO Kasur)',
          photo:  require('../assets/people/muhammad-hassan.jpg'),
        },
        {
          name: 'Shahzad Ahmad Malik',
          role: 'Advisor RO Nankana Sahib',
          photo: null,
        },
        {
          name: 'Malik Muhammad Aslam',
          role: 'Advisor (RO Sheikhupura)',
          photo: require('../assets/people/malik-aslam.jpg'),
        },
        {
          name: 'Syed Pervaiz Abbas',
          role: 'Advisor (Gujranwala II)',
          photo: require('../assets/people/syed-pervaiz.jpg'),
        },
        {
          name: 'Fazal Abbas',
          role: 'Consultant (RO Gujranwala-1 & RO Hafizabad)',
          photo: require('../assets/people/fazal-abbas.jpg'),
        },
        {
          name: 'Muhammad Rafiq',
          role: 'Consultant (RO Gujrat & RO M.B.Din)',
          photo: require('../assets/people/muhammad-rafiq.jpg'),
        },
        { name: 'Aamir Ijaz Akbar', role: 'Advisor (RO Narowal)', photo: null },
        { name: 'Ashfaq Ahmad Rana', role: 'Advisor (RO Jhelum)', photo:require('../assets/people/ashfaq-ahmad.jpg')},
        {
          name: 'Ehsan Tufail',
          role: 'Advisor (RO Rawalpindi II)',
          photo: require('../assets/people/ehsan-tufail.jpg'),
        },
        {
          name: 'Akbar Hayat',
          role: 'Consultant (RO Chakwal & RO RWP-III)',
          photo: require('../assets/people/akbar-hayat.jpg'),
        },
        {
          name: 'Ch. Mumtaz Ahmad',
          role: 'Consultant (RO Sarghoda & RO Khushab)',
          photo: require('../assets/people/mumtaz-ahmad.jpg'),
        },
        {
          name: 'Dr. Khalid Hussain',
          role: 'Consultant (RO Mianwali & RO Bhakkar)',
          photo: require('../assets/people/dr-khalid.jpg'),
        },
        { name: 'Muhammad Ayub Khan', role: 'Advisor RO Chiniot', photo: null },
        {
          name: 'Aslam Hayat Sial',
          role: 'Consultant RO, Faisalabad-I',
          photo: require('../assets/people/aslam-hayat.jpg'),
        },
        {
          name: 'Muhammad Nawaz Khalid Arbi',
          role: 'Advisor (RO Faisalabad-II)',
          photo: require('../assets/people/m-nawaz.jpg'),
        },
        
      ]),
    ],
  },
  
};

// Attach the Urdu version of each section (aboutContent.ur.js) as its `ur`
// list. A section missing from that file keeps showing its English content,
// with the "English only" note.
Object.keys(aboutContentUr).forEach(key => {
  if (aboutContent[key]) {
    aboutContent[key].ur = aboutContentUr[key];
  }
});
