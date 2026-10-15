import React, {useMemo, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import Icon from '../../../components/Icon/Icon';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {notify} from '../../../utils/notify';
// The preview reuses the photo viewer's look (dark backdrop, close button,
// "Tap anywhere to close"), so every full-screen picture in the app matches
import {
  createStyles as createViewerLook,
  createViewerStyles,
} from '../../../components/PhotoTap/Phototap.styles';
import {
  createUploadStyles,
  UPLOAD_GRADIENT,
  FILE_LIST_VISIBLE_ROWS,
  FILE_PREVIEW,
} from './parts.styles';

/** "245 KB" / "1.2 MB" from a byte count; empty when the size is unknown. */
const formatSize = bytes => {
  if (!bytes) {
    return '';
  }
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/** "1 file attached" / "3 files attached", in the app language. */
const COUNT_TEXT = {
  en: n => (n === 1 ? '1 file attached' : `${n} files attached`),
  ur: n => (n === 1 ? '1 فائل منسلک ہے' : `${n} فائلیں منسلک ہیں`),
};

/** Confirm text for clearing a slot that holds SEVERAL files. */
const REMOVE_ALL = {
  en: {title: 'Remove all files?', msg: 'Every file attached here will be removed.'},
  ur: {title: 'تمام فائلیں ہٹائیں؟', msg: 'یہاں منسلک تمام فائلیں ہٹا دی جائیں گی۔'},
};

/**
 * UPLOAD CARD — the "Upload Document" tile, with the picked files listed
 * underneath it.
 *
 *   label         the field label above the card
 *   required      red asterisk on the label
 *   title / hint  big line / small line in the card
 *   multiple      true for a slot that holds several files (Supporting
 *                 Documents); false for a single document (CNIC sides,
 *                 affidavit, passport), where a new pick replaces the old
 *   assets        the picked photos (image-picker objects)
 *   onPress       pick a file (opens the gallery)
 *   onRemove      clear the whole slot
 *   onRemoveOne(index)  drop ONE file
 *
 * FILE LIST — each file is a row under the card: thumbnail, name and size.
 * Rows stack VERTICALLY. Up to three show at once; with more, the list
 * scrolls inside its own fixed height (nestedScrollEnabled, because it sits
 * inside the form's ScrollView).
 *
 * PREVIEW — tapping a file row opens the picture large in a dark viewer,
 * fitted to the screen in its real shape (never cropped), with its name and
 * size under it. Tap anywhere, the close button or Back to close.
 *
 * DELETE — a red trash-can button at the end of each row (centred level
 * with the thumbnail) removes that file, and the trash can on the card
 * clears the slot. Both ask first.
 *
 * URDU — the card and every row mirror: badge and thumbnail on the right,
 * text right-aligned, and the trash button on the left.
 */
const UploadCard = ({
  label,
  required = false,
  title,
  hint,
  multiple = false,
  assets,
  onPress,
  onRemove,
  onRemoveOne,
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createUploadStyles(theme), [theme]);
  const viewer = useMemo(() => createViewerLook(theme), [theme]);
  const insets = useSafeAreaInsets();
  const viewerPos = useMemo(() => createViewerStyles(insets), [insets]);
  const {width, height} = useWindowDimensions();
  const {lang, t, isRTL} = useLanguage();

  // The file being previewed, or null when the viewer is closed
  const [preview, setPreview] = useState(null);

  const files = Array.isArray(assets) ? assets : [];
  const count = files.length;
  const hasFiles = count > 0;

  // The line under the title: a count once files are attached, else the hint
  const subLine = hasFiles ? (COUNT_TEXT[lang] ?? COUNT_TEXT.en)(count) : hint;

  // The previewed picture's size: its real shape, fitted inside the screen.
  // Picked photos report width and height; if one doesn't, a square is used
  // and resizeMode "contain" still shows the whole picture.
  const previewSize = useMemo(() => {
    if (!preview) {
      return null;
    }
    const boxW = width - FILE_PREVIEW.sideGap * 2;
    const boxH = height * FILE_PREVIEW.maxHeightShare;
    const w = preview.width || 1;
    const h = preview.height || 1;
    const fit = Math.min(boxW / w, boxH / h);
    return {width: Math.round(w * fit), height: Math.round(h * fit)};
  }, [preview, width, height]);

  const askRemove = index =>
    notify.confirm({
      title: t('cf.upload.removeTitle'),
      message: t('cf.upload.removeMsg'),
      confirmText: t('cf.upload.remove'),
      cancelText: t('cf.cancel'),
      onConfirm: () =>
        typeof onRemoveOne === 'function' ? onRemoveOne(index) : onRemove?.(),
    });

  // The trash can on the card: one file → the usual "Remove this file?",
  // several → "Remove all files?"
  const askRemoveAll = () => {
    const several = count > 1;
    const text = REMOVE_ALL[lang] ?? REMOVE_ALL.en;
    notify.confirm({
      title: several ? text.title : t('cf.upload.removeTitle'),
      message: several ? text.msg : t('cf.upload.removeMsg'),
      confirmText: t('cf.upload.remove'),
      cancelText: t('cf.cancel'),
      onConfirm: () => onRemove?.(),
    });
  };

  const textAlign = isRTL ? styles.fileTextRTL : styles.fileTextLTR;
  const closeLabel = t('photo.close', 'Close');

  const fileRows = files.map((file, i) => (
    <Pressable
      key={`${file.uri ?? 'file'}-${i}`}
      onPress={() => setPreview(file)}
      accessibilityRole="imagebutton"
      accessibilityLabel={t('photo.view', 'View photo')}
      style={({pressed}) => [
        styles.fileRow,
        isRTL && styles.fileRowRTL,
        pressed && styles.filePressed,
      ]}>
      <Image source={{uri: file.uri}} style={styles.fileThumb} />
      <View style={styles.fileInfo}>
        <Text style={[styles.fileName, textAlign]} numberOfLines={1}>
          {file.fileName ?? t('cf.upload.photo')}
        </Text>
        {file.fileSize ? (
          <Text style={[styles.fileMeta, textAlign]}>{formatSize(file.fileSize)}</Text>
        ) : null}
      </View>
      {/* Its own Pressable, so tapping the trash deletes instead of
          previewing. The last item in the row, so it is centred level with
          the thumbnail and name (and on the left in Urdu, via row-reverse) */}
      <Pressable
        onPress={() => askRemove(i)}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={t('cf.upload.remove')}
        style={styles.fileClose}>
        <Icon name="trash" size={15} color="#FFFFFF" weight={1.8} />
      </Pressable>
    </Pressable>
  ));

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, isRTL && styles.rtl]}>
        {label}
        {required ? <Text style={styles.star}> *</Text> : null}
      </Text>

      {/* ---- The card: tap anywhere on it to pick ---- */}
      <Pressable onPress={onPress} style={({pressed}) => [pressed && styles.pressed]}>
        <GlassSurface style={[styles.card, hasFiles && styles.cardPicked]}>
          <View style={[styles.row, isRTL && styles.rowRTL]}>
            <LinearGradient
              colors={UPLOAD_GRADIENT}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.badge}>
              <Icon
                name={hasFiles ? 'check' : 'upload'}
                size={24}
                color="#FFFFFF"
                weight={2.5}
              />
            </LinearGradient>

            <View style={[styles.textBlock, isRTL && styles.textBlockRTL]}>
              <Text style={[styles.title, isRTL && styles.rtl]} numberOfLines={1}>
                {title}
              </Text>
              <Text
                style={[styles.hint, hasFiles && styles.hintPicked, isRTL && styles.rtl]}
                numberOfLines={1}>
                {subLine}
              </Text>
            </View>

            {/* + picks (adds more on a multiple slot, replaces on a single
                one); the trash can clears the slot once something is in */}
            <View style={[styles.row, isRTL && styles.rowRTL]}>
              {(multiple || !hasFiles) && (
                <Pressable onPress={onPress} hitSlop={8} style={styles.plus}>
                  <Icon name="plus" size={18} color={theme.accent} weight={2.5} />
                </Pressable>
              )}
              {hasFiles && (
                <Pressable
                  onPress={askRemoveAll}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={t('cf.upload.remove')}
                  style={styles.remove}>
                  <Icon name="trash" size={18} color={theme.danger} weight={2} />
                </Pressable>
              )}
            </View>
          </View>
        </GlassSurface>
      </Pressable>

      {/* ---- The picked files, stacked vertically ---- */}
      {hasFiles && (
        <View style={styles.fileList}>
          {count > FILE_LIST_VISIBLE_ROWS ? (
            <ScrollView
              style={styles.fileListScroll}
              contentContainerStyle={styles.fileListContent}
              nestedScrollEnabled
              showsVerticalScrollIndicator>
              {fileRows}
            </ScrollView>
          ) : (
            <View style={styles.fileListContent}>{fileRows}</View>
          )}
        </View>
      )}

      {/* ---- Preview: the tapped file, large. Mounted only while open ---- */}
      {!!preview && (
        <Modal
          visible
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setPreview(null)}>
          <View style={viewer.backdrop}>
            {/* Full-screen tap target underneath everything */}
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setPreview(null)}
              accessibilityLabel={closeLabel}
            />

            {/* pointerEvents none: a tap on the picture falls through and closes */}
            <View pointerEvents="none" style={viewer.stage}>
              <Image
                source={{uri: preview.uri}}
                style={[viewer.photo, previewSize]}
                resizeMode="contain"
              />
              <Text style={viewer.name} numberOfLines={1}>
                {preview.fileName ?? t('cf.upload.photo')}
              </Text>
              {preview.fileSize ? (
                <Text style={viewer.caption}>{formatSize(preview.fileSize)}</Text>
              ) : null}
            </View>

            <Pressable
              onPress={() => setPreview(null)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={closeLabel}
              style={[
                viewer.closeBtn,
                viewerPos.closeTop,
                isRTL ? viewerPos.closeLeft : viewerPos.closeRight,
              ]}>
              <Icon name="close" size={18} color="#FFFFFF" weight={2.5} />
            </Pressable>

            <Text style={[viewer.hint, viewerPos.hintBottom]}>
              {t('photo.hint', 'Tap anywhere to close')}
            </Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default UploadCard;