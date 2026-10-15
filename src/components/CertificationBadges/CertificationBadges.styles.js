import {StyleSheet} from 'react-native';
import {spacing} from '../../theme/tokens';

/** Normal crest — the default on every screen. */
export const CREST_SIZE = 88;

/**
 * Bigger crest, for screens whose content is vertically CENTRED (Register
 * Complaint). There the block floats in the middle with empty space above
 * it, so a larger crest fills the top of the screen instead of leaving it
 * bare. Pass it as <CertificationBadges crestSize={CREST_SIZE_LARGE} />.
 * Tune this one number to make it bigger or smaller.
 */
export const CREST_SIZE_LARGE = 140;

/**
 * The crest's own style, built from whatever size the screen asked for.
 * It is a factory rather than a fixed entry in `styles` so the size can
 * differ per screen without any screen writing an inline style.
 */
export const createCrestStyles = (size = CREST_SIZE) =>
  StyleSheet.create({
    crest: {
      width: size,
      height: size,
      alignSelf: 'center',
      marginBottom: spacing.sm,
    },
  });

/**
 * The Office name sits under the crest; then the four badges spread evenly
 * across the row beneath, each fitted inside 58 × 58. These never change
 * with the theme or the screen, so they stay a plain StyleSheet.
 */
export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  badge: {width: 58, height: 58},
});

/**
 * TYPOGRAPHY (MD3) — Title Large in the theme's title colour (the green),
 * centred: "Office of the Ombudsman Punjab". Built from the theme, so it
 * follows the colours and font chosen in Appearance.
 */
export const createHeadingStyles = theme =>
  StyleSheet.create({
    officeName: {
      ...theme.type.titleLarge,
      color: theme.text.title,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
  });