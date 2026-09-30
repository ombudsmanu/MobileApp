import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {notify} from '../../utils/notify';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import GlassField from '../../components/GlassField/GlassField';
import Icon from '../../components/Icon/Icon';
import {
  createStyles,
  createDynamicStyles,
  animationConfig,
  validationRules,
} from './LoginScreen.styles';

const LoginScreen = () => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const {signIn, signInAsGuest, rememberedUsername} = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const fadeIn = useRef(new Animated.Value(0)).current;

  /**
   * Every time this screen comes into view (first open, or back after
   * logout): clear the password and errors, and prefill the remembered
   * username if "Remember me" was ticked last time.
   */
  useEffect(() => {
    if (isFocused) {
      setUsername(rememberedUsername || '');
      setRemember(!!rememberedUsername);
      setPassword('');
      setShowPassword(false);
      setErrors({});
      setFocusedField(null);
      setSubmitting(false);
      setGuestLoading(false);
    }
  }, [isFocused, rememberedUsername]);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: animationConfig.fadeInDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  // ---- Validation -------------------------------------------------------

  const validate = () => {
    const next = {};
    const value = username.trim();
    const {usernamePattern, minUsernameLength, maxUsernameLength, minPasswordLength} =
      validationRules;

    if (!value) {
      next.username = 'Username is required';
    } else if (value.length < minUsernameLength) {
      next.username = `Username must be at least ${minUsernameLength} characters`;
    } else if (value.length > maxUsernameLength) {
      next.username = `Username must be at most ${maxUsernameLength} characters`;
    } else if (!usernamePattern.test(value)) {
      next.username =
        'Start with a letter; use only letters, numbers, dots, underscores or hyphens';
    }

    if (!password) {
      next.password = 'Password is required';
    } else if (password.length < minPasswordLength) {
      next.password = `Password must be at least ${minPasswordLength} characters`;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ---- Actions ----------------------------------------------------------

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    setSubmitting(true);
    const result = await signIn({username, password, remember});
    setSubmitting(false);

    if (result.ok) {
      navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
    } else {
      notify.error('Sign in failed', result.message ?? 'Please try again.');
    }
  };

  const handleGuest = async () => {
    setGuestLoading(true);
    await signInAsGuest();
    setGuestLoading(false);
    navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
  };

  const handleForgot = () => {
    notify.dialog({
      type: 'warning',
      title: 'Password reset',
      message: 'Please contact your system administrator to reset your password.',
      button: 'OK',
    });
  };

  // ---- Render -----------------------------------------------------------

  return (
    <AppBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.scroll, dyn.scrollPadding]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Animated.View
            style={{
              opacity: fadeIn,
              transform: [
                {
                  translateY: fadeIn.interpolate({
                    inputRange: [0, 1],
                    outputRange: [animationConfig.fadeInOffset, 0],
                  }),
                },
              ],
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
              style={styles.backButton}>
              <Icon name="chevronLeft" size={16} color={theme.text.muted} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>

            <View style={styles.header}>
              <Text style={styles.heading}>Sign in</Text>
              <Text style={styles.subheading}>
                Access the Ombudsman Punjab Management Information System
              </Text>
            </View>

            <GlassSurface style={styles.card}>
              {/* ---------- USERNAME ---------- */}
              <Text style={styles.label}>USERNAME</Text>
              <GlassField
                focused={focusedField === 'username'}
                errored={!!errors.username}
                value={username}
                onChangeText={text => {
                  setUsername(text);
                  if (errors.username) {
                    setErrors(prev => ({...prev, username: undefined}));
                  }
                }}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                placeholder="firstname.lastname"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
                textContentType="username"
                maxLength={validationRules.maxUsernameLength}
                returnKeyType="next"
              />
              {!!errors.username && <Text style={styles.error}>{errors.username}</Text>}

              {/* ---------- PASSWORD ---------- */}
              <Text style={[styles.label, styles.labelSpaced]}>PASSWORD</Text>
              <GlassField
                focused={focusedField === 'password'}
                errored={!!errors.password}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors(prev => ({...prev, password: undefined}));
                  }
                }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                action={
                  <Pressable
                    onPress={() => setShowPassword(prev => !prev)}
                    hitSlop={10}
                    style={styles.toggle}>
                    <Text style={styles.toggleText}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
                  </Pressable>
                }
              />
              {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}

              {/* ---------- OPTIONS ---------- */}
              <View style={styles.optionsRow}>
                <Pressable
                  onPress={() => setRemember(prev => !prev)}
                  hitSlop={8}
                  style={styles.rememberRow}>
                  <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                    {remember && (
                      <Icon name="check" size={14} color={theme.text.onAccent} weight={2} />
                    )}
                  </View>
                  <Text style={styles.rememberText}>Remember me</Text>
                </Pressable>

                <Pressable hitSlop={8} onPress={handleForgot}>
                  <Text style={styles.forgot}>Forgot password?</Text>
                </Pressable>
              </View>

              <GlassButton
                label="SIGN IN"
                onPress={handleSubmit}
                loading={submitting}
                style={styles.submit}
              />

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <GlassButton
                label="CONTINUE AS GUEST"
                variant="glass"
                loading={guestLoading}
                onPress={handleGuest}
                icon={<Icon name="user" size={17} color={theme.text.heading} />}
              />
            </GlassSurface>

            <Text style={styles.footer}>
              Office of the Ombudsman, Punjab {'\u00B7'} OPMIS {'\u00B7'} v1.10
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

export default LoginScreen;