import {useCallback} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useLanguage} from '../../../context/LanguageContext';
import {notify} from '../../../utils/notify';

const PICKER_OPTIONS = {
  mediaType: 'photo',
  // Kept modest: plenty for a readable CNIC / document scan, and a quarter
  // of the memory of a full-resolution image
  quality: 0.7,
  maxWidth: 1280,
  maxHeight: 1280,
};

/**
 * SIZE LIMIT — every attached file must be MAX_FILE_MB or smaller. The size
 * checked is the size AFTER the picker has scaled the photo down (the
 * options above), which is the size that would actually be uploaded.
 */
export const MAX_FILE_MB = 5;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

/** The "too large" message, in the app language. `names` lists the files. */
const TOO_LARGE = {
  en: {
    title: 'File too large',
    msg: names =>
      `Each file must be ${MAX_FILE_MB} MB or smaller. Not added: ${names}`,
  },
  ur: {
    title: 'فائل بہت بڑی ہے',
    msg: names =>
      `ہر فائل ${MAX_FILE_MB} MB یا اس سے کم ہونی چاہیے۔ شامل نہیں کی گئی: ${names}`,
  },
};

/** What a slot stores: the picked photos, how many, and a one-line summary. */
const buildSlot = (assets, t) => {
  const names = assets.map(a => a.fileName ?? t('cf.upload.photo'));
  return {
    assets,
    count: assets.length,
    display: assets.length > 1 ? names.join(', ') : names[0],
  };
};

/**
 * ATTACHMENTS — the document picker shared by both complaint forms.
 *
 *   const {choose, removeFile, removeOne} = useAttachments(setField);
 *
 *   choose('cnicFront')
 *       ONE photo. Picking again REPLACES it (a CNIC side, the affidavit and
 *       the passport are single documents).
 *   choose('supporting', {multiple: true, current: form.supporting})
 *       SEVERAL photos at once, and every new pick is ADDED to the ones
 *       already there. `current` is the slot's present value.
 *   removeFile('cnicFront')
 *       clear the whole slot
 *   removeOne('supporting', form.supporting, 2)
 *       drop one photo; the slot becomes null when the last one goes
 *
 * `setField(key, value)` is the form's own setter.
 *
 * 5 MB LIMIT — files over MAX_FILE_MB are left out and the user is told
 * which ones, in the app language. The files that fit are still added, so
 * one oversized photo in a batch of five does not lose the other four.
 *
 * GALLERY ONLY — no camera option: the user photographs the document with
 * their own camera app first, then picks it here. The app never goes into
 * the background for the camera, which is when MIUI (Redmi) closed it.
 */
export const useAttachments = setField => {
  const {lang, t} = useLanguage();

  const choose = useCallback(
    (key, {multiple = false, current = null} = {}) =>
      launchImageLibrary(
        // selectionLimit 0 = no limit; 1 = a single photo
        {...PICKER_OPTIONS, selectionLimit: multiple ? 0 : 1},
        res => {
          if (!res || res.didCancel) {
            return;
          }
          if (res.errorCode) {
            notify.error(
              t('cf.upload.failTitle'),
              res.errorMessage ?? t('cf.upload.failMsg'),
            );
            return;
          }
          const picked = res.assets ?? [];
          if (!picked.length) {
            return;
          }

          // Split off anything over the limit. A file whose size the picker
          // did not report is let through rather than refused.
          const tooLarge = picked.filter(a => (a.fileSize ?? 0) > MAX_FILE_BYTES);
          const fits = picked.filter(a => (a.fileSize ?? 0) <= MAX_FILE_BYTES);

          if (tooLarge.length) {
            const text = TOO_LARGE[lang] ?? TOO_LARGE.en;
            const names = tooLarge
              .map(a => a.fileName ?? t('cf.upload.photo'))
              .join(', ');
            notify.dialog({
              type: 'warning',
              title: text.title,
              message: text.msg(names),
              button: 'OK',
            });
          }
          if (!fits.length) {
            return;
          }

          // Multiple: add to what is there. Single: the new photo replaces it.
          const existing = multiple ? current?.assets ?? [] : [];
          setField(key, buildSlot([...existing, ...fits], t));
        },
      ),
    [setField, t, lang],
  );

  const removeFile = useCallback(key => setField(key, null), [setField]);

  const removeOne = useCallback(
    (key, current, index) => {
      if (!current?.assets?.length) {
        return;
      }
      const next = current.assets.filter((_, i) => i !== index);
      setField(key, next.length ? buildSlot(next, t) : null);
    },
    [setField, t],
  );

  return {choose, removeFile, removeOne};
};

export default useAttachments;