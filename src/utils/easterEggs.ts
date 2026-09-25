export interface SecretDiscovery {
  id: 'compass' | 'train' | 'rose' | 'camera' | 'star' | 'house' | 'heart';
  title: string;
  message: string;
  hint: string;
  iconName: string;
}

export const SECRET_DISCOVERIES: Record<string, SecretDiscovery> = {
  compass: {
    id: 'compass',
    title: 'The Map Compass',
    message: 'Somewhere along the way, we stopped counting the days.',
    hint: 'Resting in the corner of the ancient parchment map.',
    iconName: 'Compass',
  },
  train: {
    id: 'train',
    title: 'The Coastal Railway',
    message: 'Some journeys are remembered because of who was sitting beside you.',
    hint: 'Along the winter transit lines and coastal train carriages.',
    iconName: 'Train',
  },
  rose: {
    id: 'rose',
    title: 'The Pressed Rose',
    message: 'A small memory can carry a very big feeling.',
    hint: 'Blooming silently within the ornate chapter flourishes.',
    iconName: 'Flower2',
  },
  camera: {
    id: 'camera',
    title: 'The Silver Lens',
    message: 'Some photographs remember more than faces.',
    hint: 'Tucked beside the gallery viewfinders and film rolls.',
    iconName: 'Camera',
  },
  star: {
    id: 'star',
    title: 'The Undated Star',
    message: 'Not every important moment had a date.',
    hint: 'Drifting softly through the midnight constellation skies.',
    iconName: 'Sparkles',
  },
  house: {
    id: 'house',
    title: 'The Quiet Sanctuary',
    message: 'Sometimes a place becomes special because of the people inside it.',
    hint: 'Guarding the shared hearth of thirty-three days.',
    iconName: 'Home',
  },
  heart: {
    id: 'heart',
    title: 'The Unfinished Compass',
    message: 'You found one more little piece of the map.',
    hint: 'Hidden within the covenant seal where memory becomes forever.',
    iconName: 'Heart',
  },
};

const STORAGE_KEY = 'our_story_secret_discoveries_v1';

export function getDiscoveredEggs(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function triggerEasterEggDiscovery(
  id: 'compass' | 'train' | 'rose' | 'camera' | 'star' | 'house' | 'heart'
): { discovery: SecretDiscovery; isNew: boolean; totalDiscovered: number } {
  const current = getDiscoveredEggs();
  const isNew = !current.includes(id);

  let updated = current;
  if (isNew) {
    updated = [...current, id];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }

  // Dispatch custom window event so any mounted toast or vault counter can immediately react
  const event = new CustomEvent('secret-egg-discovered', {
    detail: {
      discovery: SECRET_DISCOVERIES[id],
      isNew,
      totalDiscovered: updated.length,
      allIds: updated,
    },
  });
  window.dispatchEvent(event);

  return {
    discovery: SECRET_DISCOVERIES[id],
    isNew,
    totalDiscovered: updated.length,
  };
}
