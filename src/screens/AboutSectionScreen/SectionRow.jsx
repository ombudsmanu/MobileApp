import React, {useMemo, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import Text from '../../components/AppText/AppText';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import {useTheme} from '../../context/ThemeContext';
import {createRowStyles} from './AboutSectionScreen.styles';

/**
 * A wide row that opens a sub-page (Our Team → Head Office / Regional
 * Office). A full-width row rather than a grid card: there are only two of
 * them, and their names are long enough that a narrow card would wrap them
 * awkwardly, especially in Urdu.
 *
 * The coloured bar sits on the leading edge — left in English, right in
 * Urdu — and the label is centred, matching the Office's design.
 */
const SectionRow = ({label, color, rtl, onPress}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createRowStyles(theme), [theme]);
  const colorStyles = useMemo(
    () => ({bar: {backgroundColor: color}, label: {color}}),
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
        <GlassSurface style={styles.row} contentStyle={styles.rowInner}>
          <View
            style={[
              styles.bar,
              rtl ? styles.barEnd : styles.barStart,
              colorStyles.bar,
            ]}
          />
          <Text style={[styles.label, colorStyles.label]} numberOfLines={2}>
            {label}
          </Text>
        </GlassSurface>
      </Animated.View>
    </Pressable>
  );
};

export default SectionRow;