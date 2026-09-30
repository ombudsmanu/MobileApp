import React, {useMemo} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {useLanguage} from '../../context/LanguageContext';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import {createStyles, createDynamicStyles, BACK_RADIUS} from './ComingSoonScreen.styles';

/**
 * PLACEHOLDER for screens that aren't built yet.
 * Configured per route through initialParams in RootNavigator:
 *   titleKey      translation key for the title
 *   fallbackTitle English title if the key is missing
 *   icon          Icon name
 *   requireAdmin  if true, non-admins see "Access denied" instead
 *
 * The admin check here is a second line of defence: the Dashboard
 * already hides the button, but the route itself refuses non-admins too.
 */
const ComingSoonScreen = ({navigation, route}) => {
  const {theme} = useTheme();
  const {isAdmin} = useAuth();
  const {t} = useLanguage();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const {titleKey, fallbackTitle, icon = 'doc', requireAdmin = false} = route.params ?? {};
  const denied = requireAdmin && !isAdmin;

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={18} color={theme.icon.heading} weight={2.5} />
          </GlassSurface>
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {t(titleKey, fallbackTitle)}
        </Text>
      </View>

      <View style={[styles.content, dyn.bottomPad]}>
        <GlassSurface strong style={styles.card}>
          <View style={styles.inner}>
            <View style={[styles.iconRing, denied && styles.iconRingDenied]}>
              <Icon
                name={denied ? 'lock' : icon}
                size={34}
                color={denied ? theme.danger : theme.accent}
                weight={2.5}
              />
            </View>
            <Text style={styles.heading}>
              {denied ? t('accessDenied') : t('comingSoonTitle')}
            </Text>
            <Text style={styles.message}>
              {denied ? t('adminOnly') : t('comingSoonBody')}
            </Text>
            <GlassButton
              label={t('goBack')}
              variant="glass"
              onPress={() => navigation.goBack()}
              style={styles.backCta}
            />
          </View>
        </GlassSurface>
      </View>
    </AppBackground>
  );
};

export default ComingSoonScreen;