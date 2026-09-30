import {Platform, StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    wrap: {
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fill,
      justifyContent: 'center',
    },
    focused: {
      borderColor: theme.accent,
      backgroundColor: theme.glass.fillStrong,
    },
    errored: {borderColor: theme.danger},
    sheen: {...StyleSheet.absoluteFillObject},
       topHighlight: {
      position: 'absolute',
      top: 0,
      left: 12,
      right: 12,
      height: 1,
      borderRadius: 1,
      backgroundColor: theme.glass.highlight,
    },
    input: {
      ...typography.input,
      color: theme.control.input,
            paddingHorizontal: spacing.md,
      paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    },
    inputWithAction: {paddingRight: 68},
  });

export const SHEEN_GEOMETRY = {start: {x: 0, y: 0}, end: {x: 1, y: 1}};