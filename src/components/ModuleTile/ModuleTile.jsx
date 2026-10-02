import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../AppText/AppText';
import Icon from '../Icon/Icon';
import { useTheme } from '../../context/ThemeContext';
import { createStyles, TILE_STAGGER_MS } from './ModuleTile.styles';
import { usePulse } from './usePulse';
/**
 * The app's standard card: gradient badge, name, optional "coming soon".
 * Used by the Dashboard modules AND the About Us sections, so both always
 * look identical.
 *
 *   icon, colors  badge icon and its two gradient colours
 *   label         the card name (already translated)
 *   enabled       false → faded, not tappable, shows soonLabel
 *   index         position in the grid, for the staggered entrance
 *
 * Badge + name are centred in the card as one group; the "coming soon"
 * pill sits in the space below and never moves them, so every card in a
 * row lines up. Layout numbers are explained in ModuleTile.styles.js.
 */

// Urdu is detected from the label itself (same test AppText uses), so the
// layout is right even for a label that has no translation yet
const ARABIC_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

const ModuleTile = ({
  icon,
  colors,
  label,
  soonLabel,
  enabled = true,
  index = 0,
  play = true,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const urdu = ARABIC_SCRIPT.test(label ?? '');

  const appear = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(1)).current;
  // Slow breathing zoom on the badge, staggered so tiles are out of step
  const pulse = usePulse(index, play);
    // Entrance waits for `play`, so a screen can hold it until it has
  // finished sliding in (useScreenReady); otherwise the first row would
  // animate unseen during the slide
  useEffect(() => {
    // Back to the start, so returning to the screen replays the entrance
    // instead of leaving the cards already in place
    if (!play) {
      appear.setValue(0);
      return;
    }
    Animated.spring(appear, {
      toValue: 1,
      delay: TILE_STAGGER_MS * index,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [appear, index, play]);

  const pressTo = value =>
    Animated.spring(press, {
      toValue: value,
      friction: 6,
      tension: 180,
      useNativeDriver: true,
    }).start();

  const entranceScale = appear.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1],
  });

  return (
    <Pressable
      disabled={!enabled}
      onPress={onPress}
      onPressIn={() => pressTo(0.96)}
      onPressOut={() => pressTo(1)}
      accessibilityRole="button"
      accessibilityLabel={enabled ? label : `${label}, ${soonLabel}`}
      accessibilityState={{ disabled: !enabled }}
      style={styles.tileOuter}
    >
      <Animated.View
        style={[
          styles.tile,
          {
            opacity: enabled ? appear : Animated.multiply(appear, 0.78),
            transform: [
              {
                translateY: appear.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
              },
              { scale: Animated.multiply(press, entranceScale) },
            ],
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={[styles.tileAccent, { backgroundColor: colors[1] }]}
        />

        <Animated.View
          style={[
            styles.badgeShell,
            { backgroundColor: colors[1] },
            { transform: [{ scale: pulse }] },
          ]}
        >
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.badge}
          >
            <Icon name={icon} size={26} color="#FFFFFF" weight={2.5} />
          </LinearGradient>
        </Animated.View>

        <View style={styles.nameSlot}>
          <Text
            style={[styles.tileLabel, urdu && styles.tileLabelUrdu]}
            numberOfLines={urdu ? 1 : 2}
            adjustsFontSizeToFit
            minimumFontScale={urdu ? 0.7 : 0.85}
          >
            {label}
          </Text>
        </View>

        {!enabled && (
          <View pointerEvents="none" style={styles.pillDock}>
            <View style={styles.soonPill}>
              <Text style={styles.tileSoon} numberOfLines={1}>
                {soonLabel}
              </Text>
            </View>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default ModuleTile;
