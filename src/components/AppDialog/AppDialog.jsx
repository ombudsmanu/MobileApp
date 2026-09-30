import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Modal, Pressable, View} from 'react-native';
import Text from '../AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {registerDialogHost} from '../../utils/notify';
import GlassSurface from '../GlassSurface/GlassSurface';
import GlassButton from '../GlassButton/GlassButton';
import Icon from '../Icon/Icon';
import {createStyles, resolveTone} from './AppDialog.styles';

/**
 * The app's dialog. Mounted once inside AlertRoot; screens never render
 * it directly — they call notify.dialog() / notify.confirm() / notify.error().
 *
 * Always has a cross in the corner, supports one or two buttons, and an
 * optional row of suggested colour chips.
 *
 * Button colours follow colour psychology:
 *   cancel      → neutral glass
 *   destructive → red
 *   everything else confirms → green
 */
const AppDialog = () => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [config, setConfig] = useState(null);
  const scale = useRef(new Animated.Value(0.88)).current;

  // Give notify.js a way to open this dialog
  useEffect(() => {
    registerDialogHost(next => setConfig(next));
    return () => registerDialogHost(null);
  }, []);

  // Pop-in each time a dialog opens
  useEffect(() => {
    if (config) {
      scale.setValue(0.88);
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 90,
        useNativeDriver: true,
      }).start();
    }
  }, [config, scale]);

  if (!config) {
    return null;
  }

  const tone = resolveTone(theme, config.type);
  const buttons = config.buttons?.length ? config.buttons : [{text: 'OK', style: 'confirm'}];

  const close = () => setConfig(null);

  const press = button => {
    close();
    button.onPress?.();
  };

  const variantFor = style =>
    style === 'cancel' ? 'glass' : style === 'destructive' ? 'destructive' : 'confirm';

  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={close}>
      <Pressable style={styles.backdrop} onPress={close}>
        <Pressable style={styles.cardWrap} onPress={() => {}}>
          <Animated.View style={{transform: [{scale}]}}>
            <GlassSurface strong style={styles.card}>
              {/* ---- Cross ---- */}
              <Pressable onPress={close} hitSlop={10} style={styles.closeBtn}>
                <Icon name="close" size={14} color={theme.icon.muted} weight={2.5} />
              </Pressable>

              <View style={styles.inner}>
                <View
                  style={[styles.iconRing, {borderColor: tone.ring, backgroundColor: tone.soft}]}>
                  {tone.glyph ? (
                    <Text style={[styles.iconGlyph, {color: tone.color}]}>{tone.glyph}</Text>
                  ) : (
                    <Icon name={tone.icon} size={28} color={tone.color} weight={3} />
                  )}
                </View>

                {!!config.title && <Text style={styles.title}>{config.title}</Text>}
                {!!config.message && <Text style={styles.message}>{config.message}</Text>}

                {!!config.swatches?.length && (
                  <View style={styles.swatchRow}>
                    {config.swatches.map(s => (
                      <View key={`${s.label}-${s.color}`} style={styles.swatchItem}>
                        <View style={[styles.swatchChip, {backgroundColor: s.color}]} />
                        <Text style={styles.swatchLabel}>{s.label}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.buttonRow}>
                  {buttons.map((button, i) => (
                    <GlassButton
                      key={`${button.text}-${i}`}
                      label={button.text.toUpperCase()}
                      variant={variantFor(button.style)}
                      onPress={() => press(button)}
                      style={[styles.button, i > 0 && styles.buttonGap]}
                    />
                  ))}
                </View>
              </View>
            </GlassSurface>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AppDialog;