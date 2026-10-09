import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../../theme/tokens';

/**
 * Styles for the complaint-form parts (SectionCard, FormField, Dropdown,
 * RadioRow, UploadCard, Declaration). One file so the form's look lives in
 * a single place and every part stays consistent.
 *
 * TYPOGRAPHY (MD3)
 *   Title Medium — section-card titles, upload titles
 *   Body Medium  — input text, radio and option labels
 *   Label Medium — field labels
 *   Body Small   — helper lines, errors, upload hints
 */

const STAR_RED = '#D4541C';

// Two-tone progress bar on the section cards
export const SECTION_GREEN = '#3E8E5A';
export const SECTION_ORANGE = '#E8913A';

// Green gradient for the upload badge (matches the Dashboard "green" module)
export const UPLOAD_GRADIENT = ['#43A35A', '#1F6B33'];

export const PICKER_RADIUS = radii.lg;

// ---- Shared label + helper + error (used by field, dropdown, radio, upload) ----
const labelBlock = theme => ({
  label: {...theme.type.labelMedium, marginBottom: 6},
  star: {color: STAR_RED},
  helper: {...theme.type.bodySmall, color: theme.text.muted, marginBottom: spacing.xs},
  error: {...theme.type.bodySmall, color: theme.danger, marginTop: 6},
  rtl: {textAlign: 'right', writingDirection: 'rtl'},
  rowRTL: {flexDirection: 'row-reverse'},
});

// ---- Section card ----
export const createSectionStyles = theme =>
  StyleSheet.create({
    card: {paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginTop: spacing.lg},
    content: {alignItems: 'center'},
    dotOuter: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    dotInner: {width: 12, height: 12, borderRadius: 6, backgroundColor: SECTION_ORANGE},
    title: {...theme.type.titleMedium, color: theme.text.title, textAlign: 'center'},
    progressTrack: {
      flexDirection: 'row',
      width: 96,
      height: 4,
      borderRadius: 2,
      overflow: 'hidden',
      marginTop: spacing.sm,
    },
    progressGreen: {flex: 1, backgroundColor: SECTION_GREEN},
    progressOrange: {flex: 1, backgroundColor: SECTION_ORANGE},
  });

// ---- Text field ----
export const createFieldStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    ...labelBlock(theme),
  });

// ---- Dropdown ----
export const createDropdownStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    ...labelBlock(theme),

    field: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: spacing.sm,
      minHeight: 50,
      paddingHorizontal: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fill,
    },
    fieldError: {borderColor: theme.danger},
    fieldPressed: {opacity: 0.85, backgroundColor: theme.glass.fillStrong},
    value: {...typography.input, color: theme.control.input, flex: 1},
    placeholder: {color: theme.control.placeholder},

    // ---- Picker modal ----
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(8, 16, 12, 0.55)',
      paddingHorizontal: spacing.lg,
      justifyContent: 'center',
    },
    sheet: {flex: 1},
    sheetCard: {flex: 1, padding: spacing.md},
    sheetContent: {flex: 1},
    sheetHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    sheetTitle: {...theme.type.titleMedium, color: theme.text.title, flex: 1},
    closeBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fill,
      marginBottom: spacing.sm,
    },
    searchInput: {...typography.input, color: theme.control.input, flex: 1, paddingVertical: 8},
    list: {flex: 1},
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: spacing.sm,
      paddingVertical: 14,
      paddingHorizontal: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.glass.rim,
    },
    optionActive: {backgroundColor: 'rgba(232, 145, 58, 0.10)', borderRadius: radii.sm},
    optionPressed: {backgroundColor: theme.glass.fillStrong, borderRadius: radii.sm},
    optionText: {...theme.type.bodyMedium, color: theme.text.body, flex: 1},
    optionTextActive: {color: theme.accent},
    empty: {...theme.type.bodyMedium, color: theme.text.muted, textAlign: 'center', paddingVertical: spacing.xl},
  });

// ---- Radio group ----
export const createRadioStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    ...labelBlock(theme),
    card: {paddingVertical: 4, paddingHorizontal: spacing.md},
    cardContent: {},
    option: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.sm, paddingVertical: 12},
    optionDivider: {borderTopWidth: 1, borderTopColor: theme.glass.rim},
    ring: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: theme.control.label,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ringActive: {borderColor: theme.accent},
    dot: {width: 10, height: 10, borderRadius: 5, backgroundColor: theme.accent},
    optionText: {...theme.type.bodyMedium, color: theme.text.body, flex: 1},
  });

// ---- Upload card ----
export const createUploadStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    ...labelBlock(theme),
    pressed: {opacity: 0.9, transform: [{scale: 0.995}]},
    card: {padding: spacing.md},
    // A green border once a file is attached, so a filled card is obvious
    cardPicked: {borderColor: SECTION_GREEN},
    row: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.md},
    badge: {
      width: 56,
      height: 56,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textBlock: {flex: 1, alignItems: 'flex-start'},
    textBlockRTL: {alignItems: 'flex-end'},
    title: {...theme.type.titleMedium, color: theme.text.title},
    hint: {...theme.type.bodySmall, color: theme.text.muted, marginTop: 2},
    hintPicked: {color: theme.accent},
    plus: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(232, 145, 58, 0.12)',
    },
    // Shown in place of the plus once a file is attached
    remove: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(192, 57, 43, 0.12)',
    },
  });

// ---- Affidavit card (view / download) ----
export const createAffidavitStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    card: {padding: spacing.md},
    rtl: {textAlign: 'right', writingDirection: 'rtl'},
    rowRTL: {flexDirection: 'row-reverse'},
    head: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.sm},
    title: {...theme.type.titleMedium, color: theme.text.title, flex: 1},
    desc: {...theme.type.bodySmall, color: theme.text.muted, marginTop: 4},
    actions: {flexDirection: 'row', columnGap: spacing.sm, marginTop: spacing.md},
    btn: {flex: 1},
  });

// ---- Declaration ----
export const createDeclarationStyles = theme =>
  StyleSheet.create({
    card: {padding: spacing.md, marginTop: spacing.lg},
    rtl: {textAlign: 'right', writingDirection: 'rtl'},
    rowRTL: {flexDirection: 'row-reverse'},

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      paddingBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.glass.rim,
    },
    check: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    checkOn: {backgroundColor: 'rgba(62, 142, 90, 0.18)', borderColor: SECTION_GREEN},
    title: {...theme.type.titleMedium, color: theme.text.title, flex: 1},

    // The on/off switch (a plain pressable pill, no native Switch needed)
    switchTrack: {
      width: 52,
      height: 30,
      borderRadius: 15,
      padding: 3,
      backgroundColor: theme.glass.border,
      justifyContent: 'center',
    },
    switchTrackOn: {backgroundColor: SECTION_GREEN},
    switchThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      alignSelf: 'flex-start',
    },
    switchThumbOn: {alignSelf: 'flex-end'},

    point: {flexDirection: 'row', columnGap: spacing.sm, marginTop: spacing.md},
    bullet: {
      width: 26,
      height: 26,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    bulletText: {...theme.type.labelMedium, color: theme.text.title, textTransform: 'uppercase'},
    pointText: {...theme.type.bodyMedium, color: theme.text.body, flex: 1, lineHeight: 22},
  });