import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { modulesForRole } from '../../navigation/modules';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Sidebar from '../../components/Sidebar/Sidebar';
import Icon from '../../components/Icon/Icon';
import {
  createStyles,
  createDynamicStyles,
  MENU_RADIUS,
} from './DashboardScreen.styles';

/**
 * The post-login home. Owns the drawer state and renders module tiles
 * from the same registry the sidebar uses — add a module once, it
 * appears in both places.
 */
const DashboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const { user, isGuest } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tiles = useMemo(
    () =>
      modulesForRole(isGuest ? 'guest' : 'user').filter(
        m => m.key !== 'dashboard',
      ),
    [isGuest],
  );

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => setDrawerOpen(true)} hitSlop={8}>
          <GlassSurface
            strong
            center
            radius={MENU_RADIUS}
            style={styles.menuBtn}
          >
            <Icon name="menu" size={22} color={theme.accent} weight={2.5} />
          </GlassSurface>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.topTitle}>OPMIS</Text>
          <Text style={styles.topSub}>Ombudsman Punjab</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}
      >
        <GlassSurface style={styles.welcomeCard}>
          <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
          <Text style={styles.welcomeName}>{user?.displayName ?? 'User'}</Text>
          <Text style={styles.welcomeBody}>
            {isGuest
              ? 'You are browsing with guest access. Sign in for full module access.'
              : 'Select a module below or open the menu to navigate.'}
          </Text>
        </GlassSurface>

        <Text style={styles.sectionTitle}>Modules</Text>

        <View style={styles.tileGrid}>
          {tiles.map(m => (
            <Pressable
              key={m.key}
              disabled={!m.enabled}
              onPress={() => navigation.navigate(m.route)}
              style={styles.tileOuter}
            >
              <GlassSurface
                style={[styles.tile, !m.enabled && styles.tileDisabled]}
              >
                <GlassSurface
                  strong
                  center
                  radius={MENU_RADIUS}
                  style={styles.tileIcon}
                >
                  <Icon
                    name="menu"
                    size={24}
                    color={theme.text.heading}
                    weight={3}
                  />{' '}
                </GlassSurface>
                <Text style={styles.tileLabel} numberOfLines={2}>
                  {m.label}
                </Text>
                {!m.enabled && <Text style={styles.tileSoon}>COMING SOON</Text>}
              </GlassSurface>
            </Pressable>
          ))}
        </View>

        <Text style={styles.hint}>
          New modules appear here automatically once registered in{'\n'}
          src/navigation/modules.js
        </Text>
      </ScrollView>

      <Sidebar
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeRoute="Dashboard"
        onNavigate={route => navigation.navigate(route)}
        userNamed={user?.displayName}
      />
    </AppBackground>
  );
};

export default DashboardScreen;
