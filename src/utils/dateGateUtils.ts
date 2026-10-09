import { ENTRY_GATE_CONFIG } from '../config/entryGateConfig';

/**
 * Normalizes and checks if the visitor's entered date matches the expected marriage date.
 * Accepts:
 * - DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY
 * - YYYY-MM-DD (standard HTML5 date input)
 * - 18 Feb 2026, 18 February 2026, February 18, 2026
 */
export function validateMarriageDate(input: string): boolean {
  if (!input) return false;
  const str = input.trim().toLowerCase();

  const { EXPECTED_DAY, EXPECTED_MONTH, EXPECTED_YEAR } = ENTRY_GATE_CONFIG;

  // 1. DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10);
    const year = parseInt(dmyMatch[3], 10);
    if (day === EXPECTED_DAY && month === EXPECTED_MONTH && year === EXPECTED_YEAR) {
      return true;
    }
  }

  // 2. YYYY-MM-DD (standard input[type="date"] format)
  const ymdMatch = str.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10);
    const day = parseInt(ymdMatch[3], 10);
    if (day === EXPECTED_DAY && month === EXPECTED_MONTH && year === EXPECTED_YEAR) {
      return true;
    }
  }

  // 3. Spoken text formats: '18 February 2026', '18 Feb 2026', 'February 18 2026'
  const textMatch1 = str.match(/^(?:18th|18)\s*(?:of\s*)?(?:feb|february)[,\s]+(2026)$/);
  if (textMatch1) return true;
  const textMatch2 = str.match(/^(?:feb|february)\s*(?:18th|18)[,\s]+(2026)$/);
  if (textMatch2) return true;

  return false;
}

/**
 * Checks whether the gate is already unlocked in the current session/storage.
 */
export function isGateUnlocked(): boolean {
  if (!ENTRY_GATE_CONFIG.ENABLED) return true;
  try {
    const storage = ENTRY_GATE_CONFIG.SESSION_ONLY ? sessionStorage : localStorage;
    return storage.getItem(ENTRY_GATE_CONFIG.STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Marks the gate as unlocked for the session/storage.
 */
export function setGateUnlocked(): void {
  try {
    const storage = ENTRY_GATE_CONFIG.SESSION_ONLY ? sessionStorage : localStorage;
    storage.setItem(ENTRY_GATE_CONFIG.STORAGE_KEY, 'true');
  } catch {
    // ignore
  }
}
