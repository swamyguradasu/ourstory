import { MEMORIES } from '../data/memories';

const STORAGE_KEY = 'our_story_explored_ids';
export const TOTAL_MEMORIES = MEMORIES.length; // 25

export function getDiscoveredMemoryIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isMemoryDiscovered(id: string): boolean {
  const discovered = getDiscoveredMemoryIds();
  return discovered.includes(id);
}

export function recordMemoryDiscovery(memoryId: string): {
  discoveredIds: string[];
  isNew: boolean;
  totalCount: number;
  isComplete: boolean;
} {
  const current = getDiscoveredMemoryIds();
  const isNew = !current.includes(memoryId);

  let updated = current;
  if (isNew) {
    updated = [...current, memoryId];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage quota or privacy mode fallback
    }
  }

  const isComplete = updated.length >= TOTAL_MEMORIES;

  // Dispatch custom window event for instant reactive UI updates
  const event = new CustomEvent('journey-progress-updated', {
    detail: {
      discoveredIds: updated,
      totalCount: updated.length,
      isNew,
      isComplete,
      memoryId,
    },
  });
  window.dispatchEvent(event);

  return {
    discoveredIds: updated,
    isNew,
    totalCount: updated.length,
    isComplete,
  };
}

export function resetJourneyProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  const event = new CustomEvent('journey-progress-updated', {
    detail: {
      discoveredIds: [],
      totalCount: 0,
      isNew: false,
      isComplete: false,
    },
  });
  window.dispatchEvent(event);
}

export function unlockAllJourneyProgress(): void {
  const allIds = MEMORIES.map((m) => m.id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds));
  } catch {
    // Ignore
  }
  const event = new CustomEvent('journey-progress-updated', {
    detail: {
      discoveredIds: allIds,
      totalCount: allIds.length,
      isNew: true,
      isComplete: true,
    },
  });
  window.dispatchEvent(event);
}
