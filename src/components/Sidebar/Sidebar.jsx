import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Text from '../AppText/AppText';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { modulesForRole } from '../../navigation/modules';
import { notify } from '../../utils/notify';
import GlassSurface from '../GlassSurface/GlassSurface';
import GlassButton from '../GlassButton/GlassButton';
import Icon from '../Icon/Icon';
import { radii } from '../../theme/tokens';
import {
  createStyles,
  createDynamicStyles,
  SIDEBAR_WIDTH,
} from './Sidebar.styles';

const APP_VERSION = '1.10';
const FILL = { flex: 1 };

/**
 * Custom drawer built with Animated + Modal.
 * Deliberately NOT @react-navigation/drawer — that needs
 * react-native-gesture-handler AND react-native-reanimated.
 *
 * Footer buttons follow colour psychology:
 *   APPEARANCE → blue (settings)   LOGOUT → red (exit)
 */
const Sidebar = ({ visible, onClose, activeRoute, onNavigate }) => {
  const { theme } = useTheme();
  const { user, isGuest, isAdmin, role, signOut } = useAuth();
  const { t } = useLanguage();
  const navigation = useNavigation();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const slide = useRef(new Animated.Value(0)).current;

  // Keeps the Modal mounted until the slide-OUT animation finishes
  const [mounted, setMounted] = useState(visible);
  // True once the Modal is actually on screen (set by onShow)
  const shownRef = useRef(false);
  // Latest `visible`, for animation callbacks that finish later
  const visibleRef = useRef(visible);

  const animateTo = useCallback(
    (toValue, done) => {
      Animated.timing(slide, {
        toValue,
        duration: toValue ? 260 : 200,
        easing: toValue ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(done);
    },
    [slide],
  );

  /**
   * OPEN — mount the Modal first; the slide-in starts in handleShow, once the
   * Modal is really on screen. Starting a native-driver animation before the
   * panel exists can leave it stuck off-screen: an invisible Modal that
   * swallows the next tap, so the menu seems not to open.
   *
   * CLOSE — slide out, then unmount, unless it was re-opened meanwhile.
   */
  useEffect(() => {
    visibleRef.current = visible;
    if (visible) {
      if (shownRef.current) {
        animateTo(1); // re-opened while still on screen: slide back in
      } else {
        slide.setValue(0);
        setMounted(true); // handleShow animates in once it's up
      }
    } else if (shownRef.current) {
      animateTo(0, () => {
        if (!visibleRef.current) {
          shownRef.current = false;
          setMounted(false);
        }
      });
    } else {
      setMounted(false);
    }
  }, [visible, animateTo, slide]);

  const handleShow = () => {
    shownRef.current = true;
    if (visibleRef.current) {
      animateTo(1);
    }
  };

  // Modules this role may see — same registry as the Dashboard tiles
  const items = useMemo(() => modulesForRole(role ?? 'guest'), [role]);

  const panelTranslate = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [-SIDEBAR_WIDTH, 0],
  });
  const overlayOpacity = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.55],
  });

  const handleItem = item => {
    if (!item.enabled) {
      return;
    }
    onClose();
    onNavigate(item.route);
  };

  const openAppearance = () => {
    onClose();
    navigation.navigate('Appearance');
  };

  const handleLogout = () => {
    notify.confirm({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      confirmText: 'Logout',
      onConfirm: async () => {
        onClose();
        await signOut();
        navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
      },
    });
  };
  /** Guests aren't logged in, so this is a straight move to the login
   *  screen — no confirmation dialog, nothing to discard. */
  const handleSignIn = () => {
    onClose();
    navigation.reset({
      index: 1,
      routes: [{ name: 'Splash' }, { name: 'Login' }],
    });
  };

  const roleLine = isGuest
    ? 'Guest access'
    : isAdmin
    ? `@${user.username} · Administrator`
    : user?.username
    ? `@${user.username}`
    : '—';

  return (
    <Modal
      visible={mounted}
      transparent
      statusBarTranslucent
      onShow={handleShow}
      onRequestClose={onClose}
    >
      <View style={FILL}>
        <Pressable style={FILL} onPress={onClose}>
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.panel,
            { transform: [{ translateX: panelTranslate }] },
          ]}
        >
          <LinearGradient
            pointerEvents="none"
            colors={[theme.glass.sheenFrom, 'transparent', theme.glass.sheenTo]}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sheen}
          />

          {/* ---------- HEADER ---------- */}
          <View style={[styles.header, dyn.headerPad]}>
            <View style={styles.brandRow}>
              <GlassSurface
                strong
                center
                radius={radii.pill}
                style={styles.crest}
              >
                <Text style={styles.crestText}>OMB</Text>
              </GlassSurface>
              <View style={styles.brandText}>
                <Text style={styles.brandTitle}>OMBUDSMAN PUNJAB</Text>
                <Text style={styles.brandSub}>OPMIS</Text>
              </View>
            </View>

            <View style={styles.userCard}>
              <GlassSurface
                strong
                center
                radius={radii.pill}
                style={styles.avatar}
              >
                <Icon name="user" size={19} color={theme.icon.title} />
              </GlassSurface>
              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>
                  {user?.displayName ?? 'Not signed in'}
                </Text>
                <Text style={styles.userRole} numberOfLines={1}>
                  {roleLine}
                </Text>
              </View>
            </View>
          </View>

          {/* ---------- MODULE LIST ---------- */}
          <View style={styles.listWrap}>
            <ScrollView
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            >
              {items.map(item => {
                const active = activeRoute === item.route;
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => handleItem(item)}
                    style={({ pressed }) => [
                      styles.item,
                      active && styles.itemActive,
                      pressed && item.enabled && styles.itemPressed,
                      !item.enabled && styles.itemDisabled,
                    ]}
                  >
                    <View style={styles.itemIcon}>
                      <Icon
                        name={item.icon}
                        size={20}
                        color={active ? theme.accent : theme.icon.body}
                      />
                    </View>
                    <Text
                      style={[
                        styles.itemLabel,
                        active && styles.itemLabelActive,
                      ]}
                      numberOfLines={1}
                    >
                      {t(`module.${item.key}`, item.label)}
                    </Text>
                    {!item.enabled && (
                      <Text style={styles.soonTag}>{t('soon')}</Text>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* ---------- FOOTER ---------- */}
          <View style={[styles.footer, dyn.footerPad]}>
            <GlassButton
              label="APPEARANCE"
              variant="info"
              style={styles.footerBtn}
              icon={<Icon name="palette" size={18} color="#FFFFFF" />}
              onPress={openAppearance}
            />
            {/* A guest has no session to end — offer sign-in instead */}
            {isGuest ? (
              <GlassButton
                label="LOG IN"
                variant="primary"
                style={styles.footerBtn}
                icon={<Icon name="login" size={18} color="#FFFFFF" />}
                onPress={handleSignIn}
              />
            ) : (
              <GlassButton
                label="LOGOUT"
                variant="destructive"
                style={styles.footerBtn}
                icon={<Icon name="logout" size={18} color="#FFFFFF" />}
                onPress={handleLogout}
              />
            )}
            <Text style={styles.version}>Version {APP_VERSION}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Sidebar;
