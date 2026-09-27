/** Admin credentials — the admin gate always asks for them (no remembered session). */
export const ADMIN_USERNAME = 'paulo99'
export const ADMIN_PASSWORD = 'paulo99@@'

/** True when the given credentials are the admin account (case-insensitive username). */
export function isAdminCredentials(username: string, password: string): boolean {
  return username.trim().toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD
}
