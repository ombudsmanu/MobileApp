/**
 * ═══════════════════════════════════════════════════════════════════
 *  MODULE REGISTRY — the single place new modules are declared.
 * ═══════════════════════════════════════════════════════════════════
 *
 * The sidebar renders itself from this array. Nothing else needs to
 * change when a module is added.
 *
 * TO ADD A NEW MODULE:
 *   1. Create  src/screens/<Name>Screen/<Name>Screen.jsx  (+ .styles.js)
 *   2. Add an entry below:  {key, label, icon, route, enabled: true}
 *   3. Register the route in RootNavigator.jsx (one <Stack.Screen> line)
 *
 * `enabled: false` shows the item greyed with a "Soon" tag — useful for
 * showing stakeholders the planned roadmap inside the app itself.
 *
 * `icon` must be a name supported by src/components/Icon/Icon.jsx.
 * `roles` controls visibility: 'user' | 'guest'. Guests see fewer items.
 */

export const modules = [
  {key: 'dashboard', label: 'Dashboard', icon: 'grid', route: 'Dashboard', enabled: true, roles: ['user', 'guest']},
  {key: 'dms', label: 'Document Management', icon: 'doc', route: 'DmsList', enabled: false, roles: ['user']},
  {key: 'complaints', label: 'Complaints', icon: 'inbox', route: 'Complaints', enabled: false, roles: ['user']},
  {key: 'cases', label: 'Case Files', icon: 'folder', route: 'Cases', enabled: false, roles: ['user']},
  {key: 'reports', label: 'Reports & MIS', icon: 'chart', route: 'Reports', enabled: false, roles: ['user']},
  {key: 'hearings', label: 'Hearing Calendar', icon: 'calendar', route: 'Hearings', enabled: false, roles: ['user']},
  {key: 'directory', label: 'Staff Directory', icon: 'users', route: 'Directory', enabled: false, roles: ['user', 'guest']},
  {key: 'search', label: 'Search', icon: 'search', route: 'Search', enabled: false, roles: ['user', 'guest']},
  {key: 'notices', label: 'Notices', icon: 'bell', route: 'Notices', enabled: false, roles: ['user', 'guest']},
  {key: 'settings', label: 'Settings', icon: 'settings', route: 'Settings', enabled: false, roles: ['user']},
];

/** Only the modules this session's role may see. */
export const modulesForRole = role =>
  modules.filter(m => m.roles.includes(role));