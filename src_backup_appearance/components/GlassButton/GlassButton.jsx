import React, {useMemo} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {createStyles, SHEEN_GEOMETRY} from './GlassButton.styles';

/** variant: 'solid' | 'glass' | 'danger' */
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

  const fillStyle =
    variant === 'solid' ? styles.solid : variant === 'danger' ? styles.danger : styles.glass;
  const pressStyle =
    variant === 'solid'
      ? styles.solidPressed
      : variant === 'danger'
      ? styles.dangerPressed
      : styles.glassPressed;
  const labelStyle =
    variant === 'solid'
      ? styles.labelSolid
      : variant === 'danger'
      ? styles.labelDanger
      : styles.labelGlass;
  const spinnerColor =
    variant === 'solid' ? theme.text.onAccent : variant === 'danger' ? theme.danger : theme.text.heading;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({pressed}) => [
        styles.base,
        fillStyle,
        pressed && pressStyle,
        pressed && styles.pressedTransform,
        (disabled || loading) && styles.disabled,
        style,
      ]}>
      <LinearGradient
        pointerEvents="none"
        colors={[theme.glass.sheenFrom, 'transparent']}
        start={SHEEN_GEOMETRY.start}
        end={SHEEN_GEOMETRY.end}
        style={styles.sheen}
      />
      <View pointerEvents="none" style={styles.topHighlight} />
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <>
          {icon ? <View style={styles.iconSlot}>{icon}</View> : null}
          <Text style={labelStyle}>{label}</Text>
        </>
      )}
    </Pressable>
  );
};

export default GlassButton;