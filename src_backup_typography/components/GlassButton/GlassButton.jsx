import React, {useMemo} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {createStyles, SHEEN_GEOMETRY, BUTTON_GRADIENTS} from './GlassButton.styles';

/**
 * variant:
 *   'solid'          orange — primary action
 *   'glass'          frosted — secondary action
 *   'danger'         light red — soft destructive action
 *   'dangerSolid'    solid red — destructive action that must stand out
 *   'brand'          green gradient — primary navigation
 *   'accent'         orange gradient — primary call to action
 *   'dangerGradient' red gradient — prominent destructive action
 */
const GlassButton = ({
  label,
  onPress,
  variant = 'solid',
  loading = false,
  disabled = false,
  icon = null,
  style,
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const gradientVariant = colors => ({
    fill: [styles.gradientFill, {backgroundColor: colors[1,0]}],
    pressed: styles.gradientPressed,
    label: styles.labelOnGradient,
    spinner: '#FFFFFF',
    gradient: colors,
  });

  const variants = {
    solid: {
      fill: styles.solid,
      pressed: styles.solidPressed,
      label: styles.labelSolid,
      spinner: theme.text.onAccent,
    },
    glass: {
      fill: styles.glass,
      pressed: styles.glassPressed,
      label: styles.labelGlass,
      spinner: theme.control.label,
    },
    danger: {
      fill: styles.danger,
      pressed: styles.dangerPressed,
      label: styles.labelDanger,
      spinner: theme.danger,
    },
    dangerSolid: {
      fill: styles.dangerSolid,
      pressed: styles.dangerSolidPressed,
      label: styles.labelDangerSolid,
      spinner: '#FFFFFF',
    },
    brand: gradientVariant(BUTTON_GRADIENTS.brand),
    accent: gradientVariant(BUTTON_GRADIENTS.accent),
    dangerGradient: gradientVariant(BUTTON_GRADIENTS.danger),
  };
  const v = variants[variant] ?? variants.solid;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({pressed}) => [
        styles.base,
        v.fill,
        pressed && v.pressed,
        pressed && styles.pressedTransform,
        (disabled || loading) && styles.disabled,
        style,
      ]}>
      {/* Colour layer — gradient variants only */}
      {v.gradient && (
        <LinearGradient
          pointerEvents="none"
          colors={v.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.sheen}
        />
      )}
      {/* Glass sheen — on every variant */}
      <LinearGradient
        pointerEvents="none"
        colors={[theme.glass.sheenFrom, 'transparent']}
        start={SHEEN_GEOMETRY.start}
        end={SHEEN_GEOMETRY.end}
        style={styles.sheen}
      />
      <View pointerEvents="none" style={styles.topHighlight} />
      {loading ? (
        <ActivityIndicator color={v.spinner} />
      ) : (
        <>
          {icon ? <View style={styles.iconSlot}>{icon}</View> : null}
          <Text style={v.label}>{label}</Text>
        </>
      )}
    </Pressable>
  );
};

export default GlassButton;