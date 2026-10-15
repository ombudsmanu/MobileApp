/**
 * FORM VALIDATION — every pattern the complaint forms check against, in one
 * place, so Pakistani and Overseas forms validate identically and a rule is
 * changed once.
 */

// ---- Patterns -------------------------------------------------------------
export const CNIC_PATTERN = /^\d{5}-\d{7}-\d$/;
// A Pakistani mobile, written either way people write it:
//   03001234567     — the local form (03 + 9 digits)
//   +923001234567   — the international form (+92 3 + 9 digits)
export const MOBILE_PK_PATTERN = /^(?:03\d{9}|\+923\d{9})$/;
export const LANDLINE_PK_PATTERN = /^0\d{9,12}$/;
export const INTL_PHONE_PATTERN = /^\d{7,15}$/;
export const WHATSAPP_PATTERN = /^00\d{8,15}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
export const PASSPORT_PATTERN = /^[A-Za-z0-9]{6,15}$/;

// ---- Formatters -----------------------------------------------------------
export const formatCnic = value => {
  const digits = (value ?? '').replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
};

export const digitsOnly = (value, max) =>
  (value ?? '').replace(/\D/g, '').slice(0, max);

/**
 * A mobile number as it is typed: digits, plus ONE + allowed only at the
 * very start (for +92). Anything else — spaces, dashes, a + in the middle —
 * is dropped. 13 characters is the longest valid entry: +923001234567.
 */
export const mobileChars = (value, max = 13) => {
  const raw = (value ?? '').replace(/[^\d+]/g, '');
  const plus = raw.startsWith('+') ? '+' : '';
  return (plus + raw.replace(/\+/g, '')).slice(0, max);
};

// ---- Checks ---------------------------------------------------------------

/**
 * True when the value counts as "nothing picked":
 *   null / undefined, an empty string, OR an empty array (multi-select).
 */
export const isBlank = value =>
  value == null ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0);

export const check = (value, {required = false, pattern, patternKey} = {}) => {
  if (isBlank(value)) {
    return required ? 'cf.err.required' : undefined;
  }
  // Patterns only apply to strings; multi-select values skip them.
  if (pattern && typeof value === 'string' && !pattern.test(value.trim())) {
    return patternKey;
  }
  return undefined;
};