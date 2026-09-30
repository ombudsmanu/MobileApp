import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {URDU_FONT} from '../../theme/tokens';

/**
 * Drop-in replacement for <Text>.
 *
 * When the text contains Urdu (Arabic script), it switches to the Nastaleeq
 * font and adjusts the metrics Nastaleeq needs:
 *   - Size ×1.12   Nastaleeq letters sit small in their box, so the same
 *                  point size looks smaller than English text beside it
 *   - Line ×2.2    the diagonal stacking is much taller than Latin text
 *   - Normal weight  the font has one weight; asking for bold makes
 *                  Android fake it, which smears the fine strokes
 * English text passes through untouched.
 */
const ARABIC_SCRIPT = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const URDU_SIZE_SCALE = 1.35;
const URDU_LINE_FACTOR = 2.0;

/** Collects the plain text inside children (strings, numbers, arrays). */
const textOf = children => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textOf).join('');
  }
  return '';
};

const AppText = ({style, children, ...rest}) => {
  if (!ARABIC_SCRIPT.test(textOf(children))) {
    return (
      <Text {...rest} style={style}>
        {children}
      </Text>
    );
  }

  const flat = StyleSheet.flatten(style) || {};
  const fontSize = Math.round((flat.fontSize ?? 14) * URDU_SIZE_SCALE);
  const lineHeight = Math.max(flat.lineHeight ?? 0, Math.round(fontSize * URDU_LINE_FACTOR));

  return (
    <Text
      {...rest}
      style={[
        style,
        {
          fontFamily: URDU_FONT,
          fontSize,
          lineHeight,
          fontWeight: 'normal',
          writingDirection: 'rtl',
        },
      ]}>
      {children}
    </Text>
  );
};

export default AppText;