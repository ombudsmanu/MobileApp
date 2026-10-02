import React, {useMemo, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/AppText/AppText';
import Icon from '../../components/Icon/Icon';
import {useTheme} from '../../context/ThemeContext';
import {createTileStyles, REPORT_COLORS} from './AnnualReportsScreen.styles';

/**
 * One year, as a full-width card: badge on one side, year + subtitle and
 * the status pill beside it.
 *
 * A row rather than a square tile, because the year, "Annual Report" and
 * the status need three lines of text. Stacked in a square they crowd each
 * other, and in Urdu — where Nastaleeq lines are much taller — they
 * overlap. Laid out in a row, each language gets the height it needs.
 *
 * `rtl` mirrors the card for Urdu: badge on the right, text to its left.
 * A year with no link yet is faded and shows "Not available".
 */
const ReportTile = ({year, available, soonLabel, openLabel, subtitle, rtl, onPress}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createTileStyles(theme), [theme]);
  const press = useRef(new Animated.Value(1)).current;

  const pressTo = value =>
    Animated.spring(press, {toValue: value, friction: 6, tension: 180, useNativeDriver: true}).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => pressTo(0.98)}
      onPressOut={() => pressTo(1)}
      accessibilityRole="button"
      accessibilityLabel={`${subtitle} ${year}, ${available ? openLabel : soonLabel}`}>
      <Animated.View
        style={[
          styles.tile,
          !available && styles.tileDisabled,
          {transform: [{scale: press}]},
        ]}>
        <View pointerEvents="none" style={[styles.tileAccent, {backgroundColor: REPORT_COLORS[1]}]} />

        <View style={[styles.row, rtl && styles.rowRTL]}>
          <View style={[styles.badgeShell, {backgroundColor: REPORT_COLORS[1]}]}>
            <LinearGradient
              colors={REPORT_COLORS}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.badge}>
              <Icon name="doc" size={26} color="#FFFFFF" weight={2.5} />
            </LinearGradient>
          </View>

          <View style={[styles.text, rtl && styles.textRTLBlock]}>
            <Text style={styles.year}>{year}</Text>
            <Text style={[styles.subtitle, rtl && styles.subtitleRTL]} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>

          <View style={[styles.statusPill, !available && styles.statusPillMuted]}>
            <Text
              style={[styles.statusText, !available && styles.statusTextMuted]}
              numberOfLines={1}>
              {available ? openLabel : soonLabel}
            </Text>
          </View>

          <Icon
            name={rtl ? 'chevronLeft' : 'chevronRight'}
            size={18}
            color={theme.icon.muted}
            weight={2.5}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default ReportTile;