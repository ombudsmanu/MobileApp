import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { modulesForRole } from '../../navigation/modules';
import GlassSurface from '../GlassSurface/GlassSurface';
import GlassButton from '../GlassButton/GlassButton';
import Icon from '../Icon/Icon';
import { radii } from '../../theme/tokens';
import { notify } from '../../utils/notify';
import {
  createStyles,
  createDynamicStyles,
  SIDEBAR_WIDTH,
} from './Sidebar.styles';

const Sidebar = ({ visible, onClose, activeRoute, onNavigate }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const {user, isGuest, isAdmin, role, signOut} = useAuth();
  const navigation = useNavigation();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const slide = useRef(new Animated.Value(0)).current;

  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(slide, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slide, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setMounted(false);
        }
      });
    }
  }, [visible, slide]);

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

  const handleAuthAction = () => {
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

  return (
    <Modal
      visible={mounted}
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={onClose}>
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
                  {isGuest
                    ? 'Guest access'
                    : isAdmin
                    ? `@${user.username} · Administrator`
                    : user?.username
                    ? `@${user.username}`
                    : '—'}{' '}
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
              variant="brand"
              style={styles.footerBtn}
              icon={<Icon name="palette" size={18} color="#FFFFFF" />}
              onPress={() => {
                onClose();
                navigation.navigate('Appearance');
              }}
            />
             <GlassButton
              label="LOGOUT"
              variant="dangerGradient"
              style={styles.footerBtn}
              icon={<Icon name="logout" size={18} color="#FFFFFF" />}
              onPress={handleAuthAction}
            />
            <Text style={styles.version}>Version 1.4</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Sidebar;
