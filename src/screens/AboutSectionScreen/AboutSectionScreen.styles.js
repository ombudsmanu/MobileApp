import { StyleSheet } from 'react-native';
import { radii, spacing } from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3) — each card runs largest to smallest
 *   Title Large  — top bar, section title
 *   Title Medium — card headings, profile name
 *   Title Small  — person names, signature name
 *   Body Medium  — paragraphs
 *   Body Small   — roles, English-only note
 *   Label Small  — tenure pills
 */
export const PHOTO_SIZE = 132;
export const PERSON_PHOTO_SIZE = 60;
/** Width of the coloured ring around each photo. */
export const PHOTO_RING = 3;
/** Person icon size shown until a photo is supplied (42% of the circle). */
export const PROFILE_ICON_SIZE = Math.round(PHOTO_SIZE * 0.42);
export const PERSON_ICON_SIZE = Math.round(PERSON_PHOTO_SIZE * 0.42);

export const createStyles = theme =>
  StyleSheet.create({
    // Top bar: [back] [title — takes the free space] [EN / اردو]
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: { width: 52, height: 52 },
    // The title takes the space between the back button and the toggle,
    // wrapping to a second line rather than being cut off. Title Medium,
    // not Title Large: a two-line heading needs the smaller size to fit
    // beside the toggle, and long names are the normal case here.
    topTextWrap: { flex: 1 },
    topTitle: { ...theme.type.titleMedium },

    scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xs },

    langNote: {
      ...theme.type.bodySmall,
      textAlign: 'center',
      marginTop: spacing.md,
    },

    // ---- Text cards ----
    textCard: { padding: spacing.lg, marginTop: spacing.md },
    headingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      marginBottom: spacing.sm,
    },
    headingBar: { width: 4, height: 20, borderRadius: 2 },
    heading: { ...theme.type.titleMedium, flexShrink: 1 },
    paragraph: {
      ...theme.type.bodyMedium,
      lineHeight: 22,
      marginBottom: spacing.sm,
    },
    textRTL: { textAlign: 'right', writingDirection: 'rtl' },
    rowRTL: { flexDirection: 'row-reverse' },

    // ---- Signature ----
    signature: { alignItems: 'flex-end', marginTop: spacing.sm },
    signatureRTL: { alignItems: 'flex-start' },
    signatureRule: {
      width: 48,
      height: 2,
      borderRadius: 1,
      backgroundColor: theme.glass.border,
      marginBottom: spacing.xs,
    },
    signatureName: { ...theme.type.titleSmall },
    signatureRole: { ...theme.type.bodySmall },

    // ---- Photos ----
    // The RING is a circle with a coloured border that also clips whatever
    // is inside it. The PHOTO sits inside at exactly the inner size, with
    // resizeMode "cover": it fills the circle and trims the excess equally
    // from both sides, so every photo is centred whatever its shape.
    // (overflow:'hidden' is safe here — the LinearGradient problem does not
    // apply to Images.) The ring's colour comes from createAccentStyles.
    photoRingProfile: {
      width: PHOTO_SIZE,
      height: PHOTO_SIZE,
      borderRadius: PHOTO_SIZE / 2,
      borderWidth: PHOTO_RING,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
    },
    photoRingPerson: {
      width: PERSON_PHOTO_SIZE,
      height: PERSON_PHOTO_SIZE,
      borderRadius: PERSON_PHOTO_SIZE / 2,
      borderWidth: PHOTO_RING,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
    },
    photoInnerProfile: {
      width: PHOTO_SIZE - PHOTO_RING * 2,
      height: PHOTO_SIZE - PHOTO_RING * 2,
      borderRadius: (PHOTO_SIZE - PHOTO_RING * 2) / 2,
    },
    photoInnerPerson: {
      width: PERSON_PHOTO_SIZE - PHOTO_RING * 2,
      height: PERSON_PHOTO_SIZE - PHOTO_RING * 2,
      borderRadius: (PERSON_PHOTO_SIZE - PHOTO_RING * 2) / 2,
    },

    // ---- Profile card ----
    profileCard: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      marginTop: spacing.md,
    },
    profileInner: { alignItems: 'center' },
    profileName: {
      ...theme.type.titleMedium,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    profileRole: { ...theme.type.bodySmall, textAlign: 'center', marginTop: 2 },

    // ---- Person cards ----
    personCard: { padding: spacing.md, marginTop: spacing.sm },
    personRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
    },
    personText: { flex: 1, alignItems: 'flex-start' },
    personTextRTL: { alignItems: 'flex-end' },
    personName: { ...theme.type.titleSmall },
    tenurePill: {
      marginTop: 4,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(212, 113, 28, 0.12)',
    },
    tenureText: { ...theme.type.labelSmall, color: theme.accent },
    bioToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      columnGap: 6,
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    bioToggleText: {
      ...theme.type.labelMedium,
      color: theme.accent,
      textShadowRadius: 0,
    },

    // ---- No content yet ----
    soonCard: { padding: spacing.lg, marginTop: spacing.md },
    soonText: { ...theme.type.bodyMedium, textAlign: 'center' },
    // ---- Bullet list ----
    bulletRow: {
      flexDirection: 'row',
      marginBottom: spacing.sm,
      columnGap: spacing.sm,
    },
    bulletDot: { width: 7, height: 7, borderRadius: 4, marginTop: 7 },
    bulletText: { ...theme.type.bodyMedium, lineHeight: 22, flex: 1 },

    // ---- Website link ----
    linkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      columnGap: 8,
      marginTop: spacing.xs,
      paddingVertical: 8,
      paddingHorizontal: spacing.md,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    linkText: {
      ...theme.type.labelMedium,
      color: theme.accent,
      textShadowRadius: 0,
    },

    // ---- Contact rows ----
    contactCard: { padding: spacing.md, marginTop: spacing.md },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingVertical: spacing.sm,
    },
    contactDivider: { height: 1, backgroundColor: theme.glass.rim },
    contactIcon: {
      width: 38,
      height: 38,
      borderRadius: radii.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactText: { flex: 1 },
    contactLabel: { ...theme.type.labelSmall },
    contactValue: { ...theme.type.bodyMedium },
    contactValueAction: { color: theme.accent },

    // ---- Sub-section cards (Our Team → Head Office / Regional Office) ----
    sectionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: spacing.md,
    },
    sectionGridRTL: { flexDirection: 'row-reverse' },

    // A person's role, where they have one instead of a tenure
    personRole: { ...theme.type.bodySmall, marginTop: 2 },
  });

export const createDynamicStyles = insets => ({
  topBarPad: { paddingTop: insets.top + spacing.sm },
  scrollPad: { paddingBottom: insets.bottom + spacing.xxl },
});

export const BACK_RADIUS = radii.md;

/**
 * Styles that depend on the section's colour (purple on Former Ombudsman,
 * and so on). Built with useMemo in the screen, like createDynamicStyles.
 */
export const createAccentStyles = accent =>
  StyleSheet.create({
    photoRing: { borderColor: accent },
  });
