/**
 * Central Configuration for OUR STORY Romantic Date Gate
 *
 * NOTE: This is a romantic surprise gate for a personal keepsake website,
 * not a secure server-side authentication system.
 * Anyone with direct access to client-side code can inspect this configuration.
 */

export const ENTRY_GATE_CONFIG = {
  // Expected marriage date components (18 February 2026)
  EXPECTED_DAY: 18,
  EXPECTED_MONTH: 2, // February (1-indexed)
  EXPECTED_YEAR: 2026,

  /**
   * Session Persistence:
   * When true: Stored in sessionStorage — gate will re-lock after the browser tab/session ends.
   * When false: Stored in localStorage — gate stays unlocked on the device until storage is cleared.
   */
  SESSION_ONLY: true,

  // Storage key used in Web Storage
  STORAGE_KEY: 'our_story_gate_unlocked',

  // Master switch to easily enable or disable the romantic gate
  ENABLED: true,
};
