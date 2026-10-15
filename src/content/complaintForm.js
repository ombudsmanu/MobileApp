/**
 * COMPLAINT FORM — the fixed option lists for the Register Complaint form.
 *
 * All of these are HARD-CODED for now (UI only). When the backend is ready,
 * each list is replaced by data fetched from the API; nothing else in the
 * form needs to change, because the form only ever reads these arrays.
 *
 * Each option is {value, en, ur}:
 *   value  the id sent to the server later (stable, never translated)
 *   en/ur  the label shown, by language
 *
 * The regional offices and districts here are a representative sample of
 * Punjab's divisions/districts, enough to build and test the UI. Swap in
 * the Office's full official list before release.
 */

export const TITLES = [
  {value: 'mr', en: 'Mr.', ur: 'مسٹر'},
  {value: 'mrs', en: 'Mrs.', ur: 'مسز'},
  {value: 'ms', en: 'Ms.', ur: 'محترمہ'},
  {value: 'miss', en: 'Miss', ur: 'مس'},
];

export const REGIONAL_OFFICES = [
  {value: 'lahore', en: 'Lahore', ur: 'لاہور'},
  {value: 'rawalpindi', en: 'Rawalpindi', ur: 'راولپنڈی'},
  {value: 'faisalabad', en: 'Faisalabad', ur: 'فیصل آباد'},
  {value: 'multan', en: 'Multan', ur: 'ملتان'},
  {value: 'gujranwala', en: 'Gujranwala', ur: 'گوجرانوالہ'},
  {value: 'bahawalpur', en: 'Bahawalpur', ur: 'بہاولپور'},
  {value: 'sargodha', en: 'Sargodha', ur: 'سرگودھا'},
  {value: 'dgkhan', en: 'Dera Ghazi Khan', ur: 'ڈیرہ غازی خان'},
  {value: 'sahiwal', en: 'Sahiwal', ur: 'ساہیوال'},
];

export const DISTRICTS = [
  {value: 'lahore', en: 'Lahore', ur: 'لاہور'},
  {value: 'kasur', en: 'Kasur', ur: 'قصور'},
  {value: 'sheikhupura', en: 'Sheikhupura', ur: 'شیخوپورہ'},
  {value: 'nankana', en: 'Nankana Sahib', ur: 'ننکانہ صاحب'},
  {value: 'rawalpindi', en: 'Rawalpindi', ur: 'راولپنڈی'},
  {value: 'attock', en: 'Attock', ur: 'اٹک'},
  {value: 'jhelum', en: 'Jhelum', ur: 'جہلم'},
  {value: 'chakwal', en: 'Chakwal', ur: 'چکوال'},
  {value: 'faisalabad', en: 'Faisalabad', ur: 'فیصل آباد'},
  {value: 'jhang', en: 'Jhang', ur: 'جھنگ'},
  {value: 'tobatek', en: 'Toba Tek Singh', ur: 'ٹوبہ ٹیک سنگھ'},
  {value: 'chiniot', en: 'Chiniot', ur: 'چنیوٹ'},
  {value: 'multan', en: 'Multan', ur: 'ملتان'},
  {value: 'khanewal', en: 'Khanewal', ur: 'خانیوال'},
  {value: 'lodhran', en: 'Lodhran', ur: 'لودھراں'},
  {value: 'vehari', en: 'Vehari', ur: 'وہاڑی'},
  {value: 'gujranwala', en: 'Gujranwala', ur: 'گوجرانوالہ'},
  {value: 'gujrat', en: 'Gujrat', ur: 'گجرات'},
  {value: 'sialkot', en: 'Sialkot', ur: 'سیالکوٹ'},
  {value: 'narowal', en: 'Narowal', ur: 'نارووال'},
  {value: 'bahawalpur', en: 'Bahawalpur', ur: 'بہاولپور'},
  {value: 'rahimyarkhan', en: 'Rahim Yar Khan', ur: 'رحیم یار خان'},
  {value: 'bahawalnagar', en: 'Bahawalnagar', ur: 'بہاولنگر'},
  {value: 'sargodha', en: 'Sargodha', ur: 'سرگودھا'},
  {value: 'khushab', en: 'Khushab', ur: 'خوشاب'},
  {value: 'mianwali', en: 'Mianwali', ur: 'میانوالی'},
  {value: 'bhakkar', en: 'Bhakkar', ur: 'بھکر'},
  {value: 'dgkhan', en: 'Dera Ghazi Khan', ur: 'ڈیرہ غازی خان'},
  {value: 'rajanpur', en: 'Rajanpur', ur: 'راجن پور'},
  {value: 'layyah', en: 'Layyah', ur: 'لیہ'},
  {value: 'muzaffargarh', en: 'Muzaffargarh', ur: 'مظفر گڑھ'},
  {value: 'sahiwal', en: 'Sahiwal', ur: 'ساہیوال'},
  {value: 'okara', en: 'Okara', ur: 'اوکاڑہ'},
  {value: 'pakpattan', en: 'Pakpattan', ur: 'پاکپتن'},
];

/**
 * The agencies list is deliberately long (this is the searchable field).
 * A representative set of Punjab government departments and bodies.
 */
export const AGENCIES = [
  {value: 'police', en: 'Punjab Police', ur: 'پنجاب پولیس'},
  {value: 'health', en: 'Health Department', ur: 'محکمہ صحت'},
  {value: 'education-school', en: 'School Education Department', ur: 'محکمہ تعلیم (اسکول)'},
  {value: 'education-higher', en: 'Higher Education Department', ur: 'محکمہ اعلیٰ تعلیم'},
  {value: 'revenue', en: 'Board of Revenue', ur: 'بورڈ آف ریونیو'},
  {value: 'lda', en: 'Lahore Development Authority (LDA)', ur: 'لاہور ڈیولپمنٹ اتھارٹی'},
  {value: 'wasa', en: 'Water and Sanitation Agency (WASA)', ur: 'واٹر اینڈ سینی ٹیشن ایجنسی'},
  {value: 'lesco', en: 'LESCO (Electric Supply)', ur: 'لیسکو (بجلی کی فراہمی)'},
  {value: 'sngpl', en: 'Sui Northern Gas (SNGPL)', ur: 'سوئی نادرن گیس'},
  {value: 'excise', en: 'Excise, Taxation & Narcotics', ur: 'ایکسائز، ٹیکسیشن و انسداد منشیات'},
  {value: 'local-govt', en: 'Local Government & Community Development', ur: 'لوکل گورنمنٹ و کمیونٹی ڈیولپمنٹ'},
  {value: 'agriculture', en: 'Agriculture Department', ur: 'محکمہ زراعت'},
  {value: 'food', en: 'Food Department', ur: 'محکمہ خوراک'},
  {value: 'c-and-w', en: 'Communication & Works', ur: 'مواصلات و تعمیرات'},
  {value: 'social-welfare', en: 'Social Welfare Department', ur: 'محکمہ سماجی بہبود'},
  {value: 'labour', en: 'Labour & Human Resource', ur: 'محکمہ محنت و افرادی قوت'},
  {value: 'transport', en: 'Transport Department', ur: 'محکمہ ٹرانسپورٹ'},
  {value: 'housing', en: 'Housing, Urban Development & Public Health Engineering', ur: 'ہاؤسنگ و اربن ڈیولپمنٹ'},
  {value: 'forestry', en: 'Forestry, Wildlife & Fisheries', ur: 'جنگلات، جنگلی حیات و ماہی گیری'},
  {value: 'population', en: 'Population Welfare Department', ur: 'محکمہ بہبود آبادی'},
  {value: 'cooperatives', en: 'Cooperatives Department', ur: 'محکمہ کوآپریٹوز'},
  {value: 'information', en: 'Information & Culture', ur: 'محکمہ اطلاعات و ثقافت'},
  {value: 'irrigation', en: 'Irrigation Department', ur: 'محکمہ آبپاشی'},
  {value: 'livestock', en: 'Livestock & Dairy Development', ur: 'محکمہ لائیو اسٹاک و ڈیری'},
  {value: 'other', en: 'Other', ur: 'دیگر'},
];

/**
 * COUNTRIES — the full world list for the Overseas form's Country field,
 * with English and Urdu names and dialling codes. Built in countries.js
 * from two libraries instead of being typed in here; re-exported so the
 * screens keep importing it from this file, unchanged.
 */
export {COUNTRIES} from './countries';

export const DESIGNATIONS = [
  {value: 'secretary', en: 'Secretary', ur: 'سیکرٹری'},
  {value: 'addl-secretary', en: 'Additional Secretary', ur: 'ایڈیشنل سیکرٹری'},
  {value: 'deputy-secretary', en: 'Deputy Secretary', ur: 'ڈپٹی سیکرٹری'},
  {value: 'dc', en: 'Deputy Commissioner', ur: 'ڈپٹی کمشنر'},
  {value: 'ac', en: 'Assistant Commissioner', ur: 'اسسٹنٹ کمشنر'},
  {value: 'dg', en: 'Director General', ur: 'ڈائریکٹر جنرل'},
  {value: 'director', en: 'Director', ur: 'ڈائریکٹر'},
  {value: 'dpo', en: 'District Police Officer', ur: 'ڈسٹرکٹ پولیس آفیسر'},
  {value: 'sho', en: 'Station House Officer (SHO)', ur: 'ایس ایچ او'},
  {value: 'xen', en: 'Executive Engineer (XEN)', ur: 'ایگزیکٹو انجینئر'},
  {value: 'tehsildar', en: 'Tehsildar', ur: 'تحصیلدار'},
  {value: 'other', en: 'Other', ur: 'دیگر'},
];

/** The lettered points under "I solemnly declare". */
export const DECLARATIONS = [
  {
    key: 'a',
    en: 'The allegations contained in the complaint are correct and true to the best of my knowledge and belief.',
    ur: 'شکایت میں مندرجہ تمام واقعات سائل کے علم و یقین کے مطابق بالکل درست ہیں اور کوئی امر جان بوجھ کر اخفا نہیں کیا گیا۔',
  },
  {
    key: 'b',
    en: 'Previously no complaint on the subject has been filed at the Head Office or any Regional Office.',
    ur: 'شکایت ہذا کے متعلق سائل نے کوئی درخواست پیشتر ازیں محتسب پنجاب کے کسی بھی دفتر میں نہ گزاری ہے۔',
  },
  {
    key: 'c',
    en: 'No suit, appeal, petition or any other judicial proceedings in connection with the subject matter of the complaint is pending before any Court.',
    ur: 'شکایت ہذا کے متعلق کوئی دعویٰ یا عدالتی کارروائی پاکستان کی کسی بھی عدالت/ٹریبونل میں زیر سماعت نہیں ہے اور نہ ہی قبل ازیں کسی عدالت سے فیصلہ ہوا ہے۔',
  },
  {
    key: 'd',
    en: 'The complaint by or on behalf of a public servant or functionary does not concern matters relating to the Agency in which he is or has been working, in respect of personal grievance relating to his service therein.',
    ur: 'شکایت ہذا سائل کے اپنے محکمہ ملازمت کے خلاف امورِ ملازمت سے متعلق نہیں ہے۔',
  },
  {
    key: 'e',
    en: 'The complaint does not relate to departments under the jurisdiction of the federal government.',
    ur: 'شکایت ہذا وفاقی حکومت کے دائرہ اختیار میں آنے والے محکمہ جات سے متعلق نہیں ہے۔',
  },
];