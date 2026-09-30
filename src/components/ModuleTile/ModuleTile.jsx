import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../AppText/AppText';
import Icon from '../Icon/Icon';
import {useTheme} from '../../context/ThemeContext';
import {createStyles, TILE_STAGGER_MS} from './ModuleTile.styles';

/**
 * The app's standard card: gradient badge, name, optional "coming soon".
 * Used by the Dashboard modules AND the About Us sections, so both always
 * look identical.
 *
 *   icon, colors  badge icon and its two gradient colours
 *   label         the card name (already translated)
 *   enabled       false → faded, not tappable, shows soonLabel
 *   index         position in the grid, for the staggered entrance
 */
const ModuleTile = ({
  icon,
  colors,
  label,
  soonLabel,
  enabled = true,
  index = 0,
  isRTL = false,
  onPress,
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const appear = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(appear, {
      toValue: 1,
      delay: TILE_STAGGER_MS * index,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [appear, index]);

  const pressTo = value =>
    Animated.spring(press, {toValue: value, friction: 6, tension: 180, useNativeDriver: true}).start();

  const entranceScale = appear.interpolate({inputRange: [0, 1], outputRange: [0.92, 1]});

  return (
    <Pressable
      disabled={!enabled}
      onPress={onPress}
      onPressIn={() => pressTo(0.96)}
      onPressOut={() => pressTo(1)}
      style={styles.tileOuter}>
      <Animated.View
        style={[
          styles.tile,
          {
            opacity: enabled ? appear : Animated.multiply(appear, 0.78),
            transform: [
              {translateY: appear.interpolate({inputRange: [0, 1], outputRange: [18, 0]})},
              {scale: Animated.multiply(press, entranceScale)},
            ],
          },
        ]}>
        <View pointerEvents="none" style={[styles.tileAccent, {backgroundColor: colors[1]}]} />

        <View style={[styles.badgeShell, {backgroundColor: colors[1]}]}>
          <LinearGradient
            colors={colors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.badge}>
            <Icon name={icon} size={26} color="#FFFFFF" weight={2.5} />
          </LinearGradient>
        </View>

        <View style={styles.nameRow}>
          <Text
            style={[styles.tileLabel, isRTL && styles.tileLabelUrdu]}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.8}>
            {label}
          </Text>
        </View>

        {!enabled && (
          <View style={styles.soonPill}>
            <Text style={styles.tileSoon}>{soonLabel}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default ModuleTile;