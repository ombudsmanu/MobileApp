import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { URDU_FONT } from '../../theme/tokens';

/**
 * Drop-in replacement for <Text>.
 *
 * When the text contains Urdu (Arabic script) it switches to the Nastaleeq
 * font (URDU_FONT, currently Noto Nastaliq Urdu) and adjusts the metrics
 * Nastaleeq needs. English text passes through untouched.
 *
 *   Size  ×URDU_SIZE_SCALE   Nastaleeq letters sit a little small in their
 *                            box, so Urdu is nudged up to read at the same
 *                            visual size as the English beside it
 *   Line  ×URDU_LINE_FACTOR  the diagonal stacking is much taller than
 *                            Latin text and needs about twice the line
 *   Normal weight            the font is used at one weight; asking Android
 *                            for bold on a custom font makes it look for a
 *                            separate bold file, and when it finds none it
 *                            silently falls back to the system font
 *   No font padding          Android otherwise adds the font's very tall
 *                            built-in spacing above and below, which pushes
 *                            Urdu off-centre in pills, buttons and cards
 *
 * TUNING — these two numbers were set for Noto Nastaliq Urdu. If Urdu looks
 * too big or too small next to English, change URDU_SIZE_SCALE (try 1.0 to
 * 1.2). If a different Urdu font is ever used, re-check both.
 */
const ARABIC_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const URDU_SIZE_SCALE = 1.1;
const URDU_LINE_FACTOR = 2.2;

/**
 * Nastaleeq letters can reach a little past their own width (the swash of
 * a first or last letter, like the پ of "پی ڈی ایف"). Android sizes the
 * text box to the letters' width and clips anything drawn outside it, so
 * tight single-line labels lose part of a letter. A no-break space at each
 * end gives the letters that room. Only single-line text: paragraphs have
 * plenty of space already.
 */
const EDGE_SPACE = '\u00A0';
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

const AppText = ({ style, children, ...rest }) => {
  if (!ARABIC_SCRIPT.test(textOf(children))) {
    return (
      <Text {...rest} style={style}>
        {children}
      </Text>
    );
  }
  const content =
    rest.numberOfLines === 1 && typeof children === 'string'
      ? EDGE_SPACE + children + EDGE_SPACE
      : children;
  const flat = StyleSheet.flatten(style) || {};
  const fontSize = Math.round((flat.fontSize ?? 14) * URDU_SIZE_SCALE);
  const lineHeight = Math.max(
    flat.lineHeight ?? 0,
    Math.round(fontSize * URDU_LINE_FACTOR),
  );

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
          // Font padding stays ON: it is the room Nastaleeq's descending
          // tails need below the line. Turning it off (to tighten spacing)
          // makes Android cut the tails off.
          includeFontPadding: true,
          textAlignVertical: 'center',
        },
      ]}
    >
      {content}
    </Text>
  );
};

export default AppText;
