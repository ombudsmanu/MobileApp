import ReactNativeBlobUtil from 'react-native-blob-util';

/**
 * Copies a file that is already on the phone into the public Downloads
 * collection with MediaCollection.copyToMediaStore — no storage permission
 * needed on Android 10+, and it works on older versions too.
 */
const copyIntoDownloads = (path, fileName, mime) =>
  ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
    {name: fileName, parentFolder: '', mimeType: mime},
    'Download',
    path,
  );

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
 *   2. The fetched file is copied into the public Downloads collection.
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
    await copyIntoDownloads(res.path(), fileName, mime);
  } finally {
    res.flush(); // delete the temporary copy in the app's cache
  }
};

/**
 * SAVE LOCAL FILE TO DEVICE — copies a file the app already has (for
 * example the PDF viewer's cached copy of the document on screen) into the
 * phone's Downloads folder. Nothing is downloaded again, so it is instant
 * and works offline.
 *
 *   await saveLocalFileToDevice({path, fileName, mime});
 *
 * Throws if the file is not there, so the caller can fall back to
 * downloadToDevice.
 */
export const saveLocalFileToDevice = async ({path, fileName, mime = 'application/pdf'}) => {
  const localPath = (path ?? '').replace(/^file:\/\//, '');
  if (!localPath || !(await ReactNativeBlobUtil.fs.exists(localPath))) {
    throw new Error('Local copy not found');
  }
  await copyIntoDownloads(localPath, fileName, mime);
};