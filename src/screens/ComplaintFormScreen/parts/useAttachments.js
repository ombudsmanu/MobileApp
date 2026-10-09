import {useCallback} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useLanguage} from '../../../context/LanguageContext';
import {notify} from '../../../utils/notify';

/**
 * ATTACHMENTS — the Camera/Gallery picker shared by both complaint forms.
 *
 *   const {choose, removeFile} = useAttachments(setField);
 *   choose('cnicFront')          one photo
 *   choose('supporting', true)   several photos at once
 *   removeFile('cnicFront')      clear it
 *
 * `setField(key, value)` is the form's own setter. A picked attachment is
 * stored as {assets, display, count}: `display` is what the card shows.
 *
 * CAMERA PERMISSION — react-native-image-picker does NOT need the CAMERA
 * permission itself (it hands off to the camera app). But once CAMERA is
 * declared in AndroidManifest.xml, Android requires the app to ask for it
 * at runtime, and the library refuses to open the camera until we do —
 * that is the "This library does not require Manifest.permission.CAMERA…"
 * message. So we request it here before launching the camera.
 */
const PICKER_OPTIONS = {
  mediaType: 'photo',
  quality: 0.9,
  maxWidth: 2000,
  maxHeight: 2000,
  saveToPhotos: false,
};

export const useAttachments = setField => {
  const {t} = useLanguage();

  // Store the picked asset(s). Several photos are joined into one line.
  const store = useCallback(
    (key, response, multiple) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        notify.error(
          t('cf.upload.failTitle'),
          response.errorMessage ?? t('cf.upload.failMsg'),
        );
        return;
      }
      const assets = response.assets ?? [];
      if (!assets.length) {
        return;
      }
      const names = assets.map(a => a.fileName ?? t('cf.upload.photo'));
      setField(key, {
        assets,
        count: assets.length,
        display: multiple ? names.join(', ') : names[0],
      });
    },
    [setField, t],
  );

  const openGallery = useCallback(
    (key, multiple) =>
      launchImageLibrary(
        multiple ? {...PICKER_OPTIONS, selectionLimit: 0} : PICKER_OPTIONS,
        res => store(key, res, multiple),
      ),
    [store],
  );

  const openCamera = useCallback(
    async (key, multiple) => {
      if (Platform.OS === 'android') {
        try {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (result !== PermissionsAndroid.RESULTS.GRANTED) {
            notify.error(t('cf.upload.cameraDeniedTitle'), t('cf.upload.cameraDeniedMsg'));
            return;
          }
        } catch (e) {
          if (__DEV__) {
            console.warn('[Attachments] camera permission failed', e?.message ?? e);
          }
          notify.error(t('cf.upload.failTitle'), t('cf.upload.failMsg'));
          return;
        }
      }
      launchCamera(PICKER_OPTIONS, res => store(key, res, multiple));
    },
    [store, t],
  );

  /** Ask Camera or Gallery, then open the chosen one. */
  const choose = useCallback(
    (key, multiple = false) =>
      notify.choose({
        title: t('cf.upload.chooseTitle'),
        message: t('cf.upload.chooseMsg'),
        primaryText: t('cf.upload.gallery'),
        onPrimary: () => openGallery(key, multiple),
        secondaryText: t('cf.upload.camera'),
        onSecondary: () => openCamera(key, multiple),
      }),
    [t, openGallery, openCamera],
  );

  const removeFile = useCallback(key => setField(key, null), [setField]);

  return {choose, removeFile};
};

export default useAttachments;