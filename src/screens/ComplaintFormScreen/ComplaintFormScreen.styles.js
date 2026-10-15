import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';
import {sideGutters, READING_WIDTH} from '../../theme/responsive';

/**
 * Shared by BOTH complaint forms (Pakistani Nationals and Overseas
 * Pakistanis), so the two screens are laid out identically.
 *
 * TYPOGRAPHY (MD3)
 *   Title Medium — screen title, "Complaint Management…" line, note title
 *   Body Medium  — the Important Note text
 * The form fields use the parts' own styles (parts/parts.styles.js).
 *
 * LAYOUT — one scrolling column, centred and capped at READING_WIDTH on a
 * tablet or in landscape (the Stage-3 responsive rule), clear of the notch.
 */
export const createStyles = theme =>
  StyleSheet.create({
    // ---- Header: [back] [title] [globe + language] ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    // alignItems:'center' shrinks the title's box to the width of its own
    // words and centres it between the back button and the language button
    // — in BOTH languages, because a box that is exactly as wide as its
    // text has nothing for textAlign to push against.
    topTextWrap: {flex: 1, alignItems: 'center'},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},
    rowRTL: {flexDirection: 'row-reverse'},

    // ---- Intro: system name (the crest comes with CertificationBadges) ----
    cmisLine: {
      ...theme.type.titleMedium,
      color: theme.text.title,
      textAlign: 'center',
      marginTop: spacing.sm,
    },

    // ---- Important Note ----
    noteCard: {padding: spacing.md, marginTop: spacing.md},
    noteHeadRow: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.sm},
    noteBar: {width: 4, height: 22, borderRadius: 2, backgroundColor: theme.accent},
    noteTitle: {...theme.type.titleMedium, color: theme.text.title},
    noteText: {
      ...theme.type.bodyMedium,
      color: theme.text.body,
      lineHeight: 22,
      marginTop: spacing.sm,
    },

    // ---- Footer actions: Create Complaint, then Reset ----
    actions: {marginTop: spacing.xl, rowGap: spacing.sm},
  });

/**
 * Space around the content: a centred reading column on wide screens, clear
 * of the status bar, the notch and the side navigation bar.
 */
export const createDynamicStyles = (insets, width) => {
  const gutters = sideGutters(width, insets, READING_WIDTH);
  return {
    topBarPad: {paddingTop: insets.top + spacing.sm, ...gutters},
    scrollPad: {paddingBottom: insets.bottom + spacing.xxl, ...gutters},
  };
};

export const BACK_RADIUS = radii.md;