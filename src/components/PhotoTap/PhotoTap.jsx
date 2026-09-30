import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../AppText/AppText';
import Icon from '../Icon/Icon';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {createStyles, VIEWER} from './Phototap.styles';

/**
 * PHOTO TAP — a drop-in replacement for <Image> that opens the photo large
 * in a full-screen viewer when tapped.
 *
 *   <PhotoTap source={photo} style={styles.avatar} name="…" caption="…" />
 *
 * `style` styles the small thumbnail exactly as <Image> would, so swapping
 * it in changes nothing about how the card looks.
 *
 * SIZING — the viewer keeps each photo's real shape. The office photos come
 * in many sizes (125×150 portraits, 220×180 landscapes…), so forcing them
 * into one square would crop faces. Each photo is fitted inside the screen
 * with its own aspect ratio, and never enlarged more than MAX_UPSCALE times
 * its real size — beyond that a small photo only turns into blur.
 *
 * Closes on: tap anywhere, the close button, or the Android back button.
 * The Modal is only mounted while open, so a page of 20 people carries no
 * hidden viewers.
 */
const PhotoTap = ({source, style, name, caption, resizeMode = 'cover'}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t, isRTL} = useLanguage();
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();

  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  // Stops a double tap from starting two close animations
  const closingRef = useRef(false);

  // Real pixel size of a bundled require() image. Remote images (uri) don't
  // report one, so they fall back to a square.
  const natural = useMemo(() => {
    const asset = source ? Image.resolveAssetSource(source) : null;
    return asset?.width && asset?.height
      ? {w: asset.width, h: asset.height}
      : {w: 1, h: 1, unknown: true};
  }, [source]);

  const viewSize = useMemo(() => {
    const boxW = Math.min(width - VIEWER.sideGap * 2, VIEWER.maxSize);
    const boxH = Math.min(height * VIEWER.maxHeightShare, VIEWER.maxSize);
    // Largest size that fits the box without changing the photo's shape
    let fit = Math.min(boxW / natural.w, boxH / natural.h);
    if (!natural.unknown) {
      fit = Math.min(fit, VIEWER.maxUpscale);
    }
    return {width: Math.round(natural.w * fit), height: Math.round(natural.h * fit)};
  }, [width, height, natural]);

  const show = useCallback(() => {
    closingRef.current = false;
    anim.setValue(0);
    setOpen(true);
  }, [anim]);

  // Runs once the Modal is on screen, so the native-driver animation has a
  // real view to attach to
  const animateIn = useCallback(() => {
    Animated.timing(anim, {toValue: 1, duration: 220, useNativeDriver: true}).start();
  }, [anim]);

  const hide = useCallback(() => {
    if (closingRef.current) {
      return;
    }
    closingRef.current = true;
    Animated.timing(anim, {toValue: 0, duration: 180, useNativeDriver: true}).start(() =>
      setOpen(false),
    );
  }, [anim]);

  const scale = anim.interpolate({inputRange: [0, 1], outputRange: [0.92, 1]});
  const closeLabel = t('photo.close', 'Close');

  return (
    <>
      <Pressable
        onPress={show}
        disabled={!source}
        accessibilityRole="imagebutton"
        accessibilityLabel={name || t('photo.view', 'View photo')}
        style={({pressed}) => pressed && styles.thumbPressed}>
        <Image source={source} style={style} resizeMode={resizeMode} />
      </Pressable>

      {open && (
        <Modal
          visible
          transparent
          animationType="none"
          statusBarTranslucent
          onShow={animateIn}
          onRequestClose={hide}>
          <Animated.View style={[styles.backdrop, {opacity: anim}]}>
            {/* Full-screen tap target underneath everything */}
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={hide}
              accessibilityLabel={closeLabel}
            />

            {/* pointerEvents none: a tap on the photo falls through and closes too */}
            <Animated.View pointerEvents="none" style={[styles.stage, {transform: [{scale}]}]}>
              <Image source={source} style={[styles.photo, viewSize]} resizeMode="cover" />
              {name ? <Text style={styles.name}>{name}</Text> : null}
              {caption ? <Text style={styles.caption}>{caption}</Text> : null}
            </Animated.View>

            <Pressable
              onPress={hide}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={closeLabel}
              style={[
                styles.closeBtn,
                {top: insets.top + 12},
                isRTL ? styles.closeLeft : styles.closeRight,
              ]}>
              <Icon name="close" size={18} color="#FFFFFF" weight={2.5} />
            </Pressable>

            <Text style={[styles.hint, {bottom: insets.bottom + 24}]}>
              {t('photo.hint', 'Tap anywhere to close')}
            </Text>
          </Animated.View>
        </Modal>
      )}
    </>
  );
};

export default PhotoTap;