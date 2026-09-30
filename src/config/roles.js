/**
 * USER ROLES
 *   admin — full access, including the admin Dashboard
 *   user  — a signed-in staff member
 *   guest — limited, public access
 */
export const ROLES = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
};

/**
 * TEMPORARY — until the OPMIS API returns a role with the login response.
 * Usernames in this list sign in as administrators.
 * When the API is connected, delete this list and use the role the
 * server sends back.
 */
export const ADMIN_USERNAMES = ['admin', 'administrator'];

export const resolveRole = username =>
  ADMIN_USERNAMES.includes(String(username).trim().toLowerCase())
    ? ROLES.admin
    : ROLES.user;