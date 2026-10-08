import React, { useMemo, useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/AppText/AppText';
import Icon from '../../components/Icon/Icon';
import { useTheme } from '../../context/ThemeContext';
import { createTileStyles, REPORT_COLORS } from './AnnualReportsScreen.styles';

/**
 * One year, as a grid tile: badge, year, subtitle, status pill.
 *
 * FIXED ROWS — every piece has its own reserved slot (see TILE in the
 * styles file), so nothing can collide. An earlier version centred badge +
 * text as one group and docked the pill at the bottom; in Urdu the taller
 * Nastaleeq lines grew that group downward INTO the pill and the two
 * overlapped. With a slot each, both languages fit.
 *
 * URDU — the tile grows and the text keeps its size, rather than the text
 * shrinking to fit an English-sized tile. Shrunk Nastaleeq is unreadable
 * and its dots (the three on پ) merge into the strokes.
 *
 * A year with no link yet is faded and shows "Not available".
 */

// Urdu is detected from the subtitle itself (the same test AppText uses)
const ARABIC_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

const ReportTile = ({
  year,
  available,
  soonLabel,
  openLabel,
  subtitle,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createTileStyles(theme), [theme]);
  const urdu = ARABIC_SCRIPT.test(subtitle ?? '');
  const press = useRef(new Animated.Value(1)).current;

  const pressTo = value =>
    Animated.spring(press, {
      toValue: value,
      friction: 6,
      tension: 180,
      useNativeDriver: true,
    }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => pressTo(0.96)}
      onPressOut={() => pressTo(1)}
      accessibilityRole="button"
      accessibilityLabel={`${subtitle} ${year}, ${
        available ? openLabel : soonLabel
      }`}
    >
      <Animated.View
        style={[
          styles.tile,
          urdu && styles.tileUrdu,
          !available && styles.tileDisabled,
          { transform: [{ scale: press }] },
        ]}
      >
        <View
          pointerEvents="none"
          style={[styles.tileAccent, { backgroundColor: REPORT_COLORS[1] }]}
        />

        <View
          style={[styles.badgeShell, { backgroundColor: REPORT_COLORS[1] }]}
        >
          <LinearGradient
            colors={REPORT_COLORS}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.badge}
          >
            <Icon name="doc" size={24} color="#FFFFFF" weight={2.5} />
          </LinearGradient>
        </View>

        <View style={styles.yearSlot}>
          <Text style={styles.year}>{year}</Text>
        </View>

        <View style={[styles.subtitleSlot, urdu && styles.subtitleSlotUrdu]}>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>

        <View style={[styles.pillSlot, urdu && styles.pillSlotUrdu]}>
          <View
            style={[
              styles.statusPill,
              urdu && styles.statusPillUrdu,
              !available && styles.statusPillMuted,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                urdu && styles.statusTextUrdu,
                !available && styles.statusTextMuted,
              ]}
              numberOfLines={1}
            >
              {available ? openLabel : soonLabel}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default ReportTile;
