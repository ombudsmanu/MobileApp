import React, {useMemo, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import Text from '../AppText/AppText';
import GlassSurface from '../GlassSurface/GlassSurface';
import Icon from '../Icon/Icon';
import {useTheme} from '../../context/ThemeContext';
import {createStyles} from './SectionRow.styles';

/**
 * SECTION ROW — a wide, full-width row that opens a sub-page. Used by
 * Our Team (Head Office / Regional Office) and Register Complaint
 * (Pakistan Nationals / Overseas Nationals), so both look identical.
 *
 *   label    the row's text (already translated)
 *   color    its accent: the bar on the leading edge, the icon and the text
 *   rtl      true in Urdu — the bar moves to the right edge
 *   icon     optional leading icon (a glyph name, e.g. 'user'). When given,
 *            a round coloured badge appears before the label; Our Team's
 *            rows pass none and look exactly as before.
 *   onPress  what tapping the row does
 *
 * A full-width row rather than a grid card: there are only two of them,
 * and their names are long enough that a narrow card would wrap them
 * awkwardly, especially in Urdu.
 *
 * The coloured bar sits on the leading edge — left in English, right in
 * Urdu — and the label is centred, matching the Office's design.
 */
const SectionRow = ({label, color, rtl, icon, onPress}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const colorStyles = useMemo(
    () => ({
      bar: {backgroundColor: color},
      label: {color},
      // A soft tint of the row's colour behind the icon
      badge: {backgroundColor: color + '22', borderColor: color + '55'},
    }),
    [color],
  );
  const press = useRef(new Animated.Value(1)).current;

  const pressTo = value =>
    Animated.spring(press, {toValue: value, friction: 6, tension: 180, useNativeDriver: true}).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => pressTo(0.98)}
      onPressOut={() => pressTo(1)}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <Animated.View style={{transform: [{scale: press}]}}>
        <GlassSurface
          style={styles.row}
          contentStyle={[styles.rowInner, rtl && styles.rowInnerRTL]}>
          <View
            style={[
              styles.bar,
              rtl ? styles.barEnd : styles.barStart,
              colorStyles.bar,
            ]}
          />
          {!!icon && (
            <View style={[styles.badge, colorStyles.badge]}>
              <Icon name={icon} size={22} color={color} weight={2} />
            </View>
          )}
          <Text
            style={[styles.label, colorStyles.label, !!icon && styles.labelWithIcon]}
            numberOfLines={2}>
            {label}
          </Text>
        </GlassSurface>
      </Animated.View>
    </Pressable>
  );
};

export default SectionRow;