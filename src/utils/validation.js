/**
 * FORM VALIDATION — every pattern the complaint forms check against, in one
 * place, so Pakistani and Overseas forms validate identically and a rule is
 * changed once.
 *
 * Each rule is a real regular expression tested against the WHOLE value, so
 * "12345-6789012-3x" fails (a length count would have passed it).
 *
 * The formatters are for typing: they insert the dashes as the user types,
 * so the value always reaches the pattern in its official shape.
 */

// ---- Patterns -------------------------------------------------------------

/**
 * CNIC / NICOP — NADRA's printed format: 5 digits, 7 digits, 1 digit,
 * separated by dashes (e.g. 35202-1234567-1).
 */
export const CNIC_PATTERN = /^\d{5}-\d{7}-\d$/;

/** Pakistani mobile: 03 followed by 9 more digits (e.g. 03001234567). */
export const MOBILE_PK_PATTERN = /^03\d{9}$/;

/**
 * Pakistani landline with its area code: 0 then 9–12 more digits, which
 * covers both a city number (042-37289900) and the Office's own printed
 * example, 0424637289900.
 */
export const LANDLINE_PK_PATTERN = /^0\d{9,12}$/;

/**
 * An international number WITHOUT the leading 00 (the forms show "00" as a
 * fixed prefix beside the field): country code + number, 7 to 15 digits.
 */
export const INTL_PHONE_PATTERN = /^\d{7,15}$/;

/**
 * WhatsApp as the website shows it (00928100037): the full international
 * number including the leading 00.
 */
export const WHATSAPP_PATTERN = /^00\d{8,15}$/;

/**
 * Email. Deliberately not the full RFC monster: one @, a dot in the domain,
 * no spaces — which is what catches real typing mistakes.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

/** Passport: 6–15 letters or digits (formats differ by country). */
export const PASSPORT_PATTERN = /^[A-Za-z0-9]{6,15}$/;

// ---- Formatters (used while typing) ---------------------------------------

/**
 * Types a CNIC into shape: 3520212345671 → 35202-1234567-1.
 * Digits only, dashes added at 5 and 12, and never longer than 13 digits —
 * so the finished value always matches CNIC_PATTERN.
 */
export const formatCnic = value => {
  const digits = (value ?? '').replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) {
    return digits;
  }
  if (digits.length <= 12) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
};

/** Digits only, capped — for phone fields. */
export const digitsOnly = (value, max) => (value ?? '').replace(/\D/g, '').slice(0, max);

// ---- Checks ---------------------------------------------------------------

/** True when the value is missing or only spaces. */
export const isBlank = value =>
  value == null || (typeof value === 'string' && value.trim() === '');

/**
 * Runs one field's rules and returns an error key, or undefined when valid.
 *
 *   check(value, {required: true, pattern: CNIC_PATTERN, patternKey: 'cf.err.cnic'})
 *
 *   required    blank → 'cf.err.required'
 *   pattern     set and the value does not match → patternKey
 * An empty optional field is valid: the pattern is only applied to a value
 * the user actually typed.
 */
export const check = (value, {required = false, pattern, patternKey} = {}) => {
  if (isBlank(value)) {
    return required ? 'cf.err.required' : undefined;
  }
  if (pattern && !pattern.test(String(value).trim())) {
    return patternKey;
  }
  return undefined;
};