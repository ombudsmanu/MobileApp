import ReactNativeBlobUtil from 'react-native-blob-util';

/**
 * DOWNLOAD TO DEVICE — saves a file from the web into the phone's public
 * Downloads folder, where the user finds it in their Files app.
 *
 *   await downloadToDevice({url, fileName, mime});
 *
 * Two steps, on purpose:
 *   1. The file is fetched INSIDE the app. That uses the app's own network
 *      security settings — including the extra certificate trusted for the
 *      Ombudsman website, whose server sends an incomplete certificate
 *      chain. Android's system Download Manager runs outside the app,
 *      ignores those settings, and would reject the Ombudsman site.
 *   2. The fetched file is copied into the public Downloads collection with
 *      MediaCollection.copyToMediaStore, which needs no storage permission
 *      on Android 10+ and works on older versions too.
 *
 * Throws if the server does not answer with success, so the caller can
 * show an error. The temporary copy is always removed.
 */
export const downloadToDevice = async ({url, fileName, mime = 'application/pdf'}) => {
  // Anything after '#' is for web browsers only
  const cleanUrl = url.split('#')[0];
  const res = await ReactNativeBlobUtil.config({fileCache: true}).fetch('GET', cleanUrl);

  try {
    const status = res.info().status;
    if (status < 200 || status >= 300) {
      throw new Error(`Server responded with ${status}`);
    }
    await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
      {name: fileName, parentFolder: '', mimeType: mime},
      'Download',
      res.path(),
    );
  } finally {
    res.flush(); // delete the temporary copy in the app's cache
  }
};