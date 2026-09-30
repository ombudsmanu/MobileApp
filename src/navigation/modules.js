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
   {key: 'annualReports', label: 'Annual Reports', icon: 'chart', route: 'AnnualReports', enabled: true, roles: ['admin', 'user', 'guest']},
  {key: 'about', label: 'About Us', icon: 'doc', route: 'AboutUs', enabled: true, roles: ['admin', 'user', 'guest']},
  {key: 'dashboard', label: 'Dashboard', icon: 'grid', route: 'AdminDashboard', enabled: true, roles: ['admin']},
  {key: 'complaints', label: 'Register Complaint', icon: 'inbox', route: 'RegisterComplaint', enabled: true, roles: ['admin', 'user', 'guest']},
  {key: 'dms', label: 'Document Management', icon: 'doc', route: 'DmsList', enabled: false, roles: ['admin', 'user']},
  {key: 'cases', label: 'Case Files', icon: 'folder', route: 'Cases', enabled: false, roles: ['admin', 'user']},
  {key: 'reports', label: 'Reports & MIS', icon: 'chart', route: 'Reports', enabled: false, roles: ['admin', 'user']},
  {key: 'hearings', label: 'Hearing Calendar', icon: 'calendar', route: 'Hearings', enabled: false, roles: ['admin', 'user']},
  {key: 'directory', label: 'Staff Directory', icon: 'users', route: 'Directory', enabled: false, roles: ['admin', 'user', 'guest']},
  {key: 'search', label: 'Search', icon: 'search', route: 'Search', enabled: false, roles: ['admin', 'user', 'guest']},
  {key: 'notices', label: 'Notices', icon: 'bell', route: 'Notices', enabled: false, roles: ['admin', 'user', 'guest']},
  {key: 'settings', label: 'Settings', icon: 'settings', route: 'Settings', enabled: false, roles: ['admin'] },

];

/** Only the modules this role may see. */
export const modulesForRole = role => modules.filter(m => m.roles.includes(role));