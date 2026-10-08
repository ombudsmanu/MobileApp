import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
/**
 * Drop-in replacement for <Text>.
 *
 * When the text contains Urdu (Arabic script) it switches to the Nastaleeq
 * font (URDU_FONT — Noto Nastaliq Urdu) and applies the settings below.
 * English text passes through completely untouched.
 *
 *   Size   ×URDU_SIZE_SCALE, never below URDU_MIN_SIZE — under ~14px the
 *          dots of letters (the three under پ) blur into one smudge
 *   Line   ×URDU_LINE_FACTOR — keeps labels visually centred in their box
 *   Room   URDU_DRAW_ROOM above and below the box (see below)
 *   Weight always normal — asking Android for bold on a custom font makes
 *          it look for a separate bold file and fall back to the system font
 *
 * DRAWING ROOM — Nastaleeq strokes reach BEYOND the font's own declared top
 * and bottom (the rising stroke of ک, the hanging tails of ے and ر), and
 * Android clips text at the edge of its box. No line height fixes that: a
 * taller line only moves where the cut happens (measured: at 2.5 the top
 * of ک was still cut AND labels sat visibly low). Instead each Urdu text
 * gets padding above and below — Android lets text draw into its own
 * padding — cancelled by an equal negative margin, so the layout does not
 * move at all. Measured on every app label at 14–24px: nothing is cut.
 *
 * EDGE SPACE — a no-break space at each end of short labels gives the
 * first and last letters a little sideways room too.
 */
const ARABIC_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const URDU_SIZE_SCALE = 1.1;
const URDU_MIN_SIZE = 14;
const URDU_LINE_FACTOR = 2.2;
const URDU_DRAW_ROOM = 0.8;
const EDGE_SPACE = '\u00A0';
const EDGE_SPACE_MAX_CHARS = 60;

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

/** A style value as a number (unset or non-numeric counts as 0). */
const num = value => (typeof value === 'number' ? value : 0);

const AppText = ({ style, children, ...rest }) => {
  // The Urdu font follows the choice in Appearance (theme.urduFont).
  // The hook must run on every render, so it is read before the English
  // early-return below.
  const { theme } = useTheme();

  if (!ARABIC_SCRIPT.test(textOf(children))) {
    return (
      <Text {...rest} style={style}>
        {children}
      </Text>
    );
  }

  const flat = StyleSheet.flatten(style) || {};
  const fontSize = Math.max(
    URDU_MIN_SIZE,
    Math.round((flat.fontSize ?? 14) * URDU_SIZE_SCALE),
  );
  const lineHeight = Math.max(
    flat.lineHeight ?? 0,
    Math.round(fontSize * URDU_LINE_FACTOR),
  );
  const room = Math.round(fontSize * URDU_DRAW_ROOM);

  // Keep whatever spacing the screen already set, then add the room
  const padTop = num(flat.paddingTop ?? flat.paddingVertical ?? flat.padding);
  const padBottom = num(
    flat.paddingBottom ?? flat.paddingVertical ?? flat.padding,
  );
  const marTop = num(flat.marginTop ?? flat.marginVertical ?? flat.margin);
  const marBottom = num(
    flat.marginBottom ?? flat.marginVertical ?? flat.margin,
  );

  const plain = typeof children === 'string' ? children : '';
  const content =
    plain && plain.length <= EDGE_SPACE_MAX_CHARS
      ? EDGE_SPACE + plain + EDGE_SPACE
      : children;

  return (
    <Text
      {...rest}
      style={[
        style,
        {
          // null means the phone's own Arabic font
          ...(theme.urduFont ? { fontFamily: theme.urduFont } : null),
          fontSize,
          lineHeight,
          fontWeight: 'normal',
          writingDirection: 'rtl',
          includeFontPadding: true,
          textAlignVertical: 'center',
          paddingTop: padTop + room,
          paddingBottom: padBottom + room,
          marginTop: marTop - room,
          marginBottom: marBottom - room,
        },
      ]}
    >
      {content}
    </Text>
  );
};

export default AppText;
