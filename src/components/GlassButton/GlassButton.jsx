import React, {useMemo} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {radii} from '../../theme/tokens';
import {createStyles, GRADIENT_DIRECTION, BUTTON_GRADIENTS} from './GlassButton.styles';

/**
 * variant: primary (orange) · confirm (green) · info (blue) ·
 *          destructive (red) · neutral (slate) · frosted · danger (soft red)
 * Older names still work: solid/accent → primary, brand → confirm,
 * dangerSolid/dangerGradient → destructive, glass → neutral.
 */
const GRADIENT_OF = {
  primary: 'primary',
  solid: 'primary',
  accent: 'primary',
  confirm: 'confirm',
  brand: 'confirm',
  success: 'confirm',
  info: 'info',
  destructive: 'destructive',
  dangerSolid: 'destructive',
  dangerGradient: 'destructive',
  neutral: 'neutral',
  glass: 'neutral',
};

const BODY_KEYS = [
  'padding',
  'paddingVertical',
  'paddingHorizontal',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'minHeight',
  'height',
];

const splitStyle = style => {
  const flat = StyleSheet.flatten(style) || {};
  const shell = {};
  const body = {};
  Object.keys(flat).forEach(key => {
    (BODY_KEYS.includes(key) ? body : shell)[key] = flat[key];
  });
  return {shell, body};
};

const GlassButton = ({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon = null,
  style,
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isDisabled = disabled || loading;
  const gradientKey = GRADIENT_OF[variant];
  const {shell, body} = splitStyle(style);
  const rounded = {borderRadius: shell.borderRadius ?? radii.md};

  const renderContent = (labelStyle, spinnerColor) =>
    loading ? (
      <ActivityIndicator color={spinnerColor} />
    ) : (
      <>
        {icon ? <View style={styles.iconSlot}>{icon}</View> : null}
        <Text style={labelStyle}>{label}</Text>
      </>
    );

  // ---- Gradient buttons: shape B ---------------------------------------
  if (gradientKey) {
    const colors = BUTTON_GRADIENTS[gradientKey];
    return (
      <View
        style={[
          styles.outer,
          styles.gradientShadow,
          {backgroundColor: colors[1]},
          shell,
          rounded,
          isDisabled && styles.disabled,
        ]}>
        <LinearGradient
          colors={colors}
          start={GRADIENT_DIRECTION.start}
          end={GRADIENT_DIRECTION.end}
          style={rounded}>
          <View pointerEvents="none" style={styles.highlight} />
          <Pressable
            onPress={onPress}
            disabled={isDisabled}
            style={({pressed}) => [
              styles.press,
              rounded,
              body,
              pressed && styles.pressedOnGradient,
            ]}>
            {renderContent(styles.labelOnGradient, '#FFFFFF')}
          </Pressable>
        </LinearGradient>
      </View>
    );
  }

  // ---- Plain buttons (no gradient) -------------------------------------
  const isSoftDanger = variant === 'danger';
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({pressed}) => [
        styles.press,
        isSoftDanger ? styles.softDangerFace : styles.frostedFace,
        shell,
        rounded,
        body,
        pressed && styles.pressedOnGlass,
        isDisabled && styles.disabled,
      ]}>
      {renderContent(
        isSoftDanger ? styles.labelSoftDanger : styles.labelFrosted,
        isSoftDanger ? theme.danger : theme.control.label,
      )}
    </Pressable>
  );
};

export default GlassButton;