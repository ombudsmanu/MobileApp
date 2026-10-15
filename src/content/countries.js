import countries from 'i18n-iso-countries';
import enNames from 'i18n-iso-countries/langs/en.json';
import urNames from 'i18n-iso-countries/langs/ur.json';
import {getCountries, getCountryCallingCode} from 'libphonenumber-js';

/**
 * COUNTRIES — every country, with its name in English and Urdu and its
 * international dialling code, for the Overseas form's Country field.
 *
 * Nothing here is typed in by hand. Two libraries supply the data, bundled
 * inside the app, so the list is complete, works with no internet, and is
 * brought up to date with `npm update`:
 *
 *   libphonenumber-js   the dialling codes — a JavaScript rewrite of
 *                       Google's libphonenumber, the phone-number data
 *                       Android itself uses
 *   i18n-iso-countries  the country names, here in English and Urdu
 *
 * Each entry:  {value: 'SA', en: 'Saudi Arabia', ur: 'سعودی عرب', dial: '966'}
 *   value  the ISO two-letter country code — the standard code a server
 *          will expect when the form is submitted
 *   dial   the dialling code WITHOUT the leading 00 or + ; the form shows
 *          "00" + dial in front of International Mobile / Landline
 *
 * ORDER — the countries with the largest Pakistani communities first (the
 * ones most overseas complainants will pick), then everything else A to Z.
 */

// Names are loaded per language, so only English and Urdu are bundled
countries.registerLocale(enNames);
countries.registerLocale(urNames);

/** Shown at the top of the list, in this order. */
const FIRST = ['SA', 'AE', 'GB', 'US', 'CA', 'AU', 'OM', 'QA', 'KW', 'BH', 'MY'];

/** Not offered: this is the form for Pakistanis living ABROAD. */
const LEAVE_OUT = ['PK'];

const buildCountries = () => {
  // Both keyed by the two-letter code: {SA: 'Saudi Arabia', …}
  const en = countries.getNames('en', {select: 'official'});
  const ur = countries.getNames('ur', {select: 'official'});

  const list = getCountries()
    // The phone library also lists a few dialling regions that are not
    // countries (e.g. Ascension Island) and have no name — leave those out
    .filter(code => en[code] && !LEAVE_OUT.includes(code))
    .map(code => ({
      value: code,
      en: en[code],
      // Falls back to English for any country without an Urdu name
      ur: ur[code] ?? en[code],
      dial: getCountryCallingCode(code),
    }));

  const rank = c => {
    const i = FIRST.indexOf(c.value);
    return i === -1 ? FIRST.length : i;
  };
  return list.sort((a, b) => rank(a) - rank(b) || a.en.localeCompare(b.en));
};

/** Built once, when the app first loads this file. */
export const COUNTRIES = buildCountries();