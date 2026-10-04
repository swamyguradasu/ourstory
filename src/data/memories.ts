export interface MemoryArtifact {
  title: string;
  description: string;
  type: 'ticket' | 'letter' | 'photo' | 'keepsake' | 'audio';
}

export type MemoryCategory = 'college' | 'friendship' | 'milestones' | 'journey' | 'commitments' | 'family' | 'distance' | 'reunion';

export interface SadMemory {
  enabled: boolean;
  title: string;
  shortTitle?: string;
  description: string;
  caption: string;
  image: string;
  date?: string;
  location?: string;
  mood?: string;
  handwrittenNote?: string;
}

export interface Memory {
  id: string;
  level: number;
  title: string;
  shortTitle: string;
  date: string;
  chapter: string;
  description: string;
  caption: string;
  image: string;
  icon: string;
  location: string;
  isUnlocked: boolean;
  colorAccent: string;
  timelineTitle?: string;
  mapLocationName?: string;
  mapIcon?: string;
  isSpecialMemory?: boolean;
  secondaryPhotoMemory?: {
    title: string;
    description: string;
    caption?: string;
  };
  sadMemory?: SadMemory;
  // Extended fields for rich modal & map rendering
  category: MemoryCategory;
  categoryLabel: string;
  realm: string;
  coordinates: {
    x: number; // percentage (0 - 100)
    y: number; // percentage (0 - 100)
  };
  narrativeParagraphs: string[];
  handwrittenNote: string;
  musicTrack: {
    title: string;
    artist: string;
    mood: string;
  };
  details: {
    label: string;
    value: string;
  }[];
  artifacts?: MemoryArtifact[];
}

export const MEMORIES: Memory[] = [
  // 01 — September 9, 2024: The First Morning
  {
    id: 'first-morning',
    level: 1,
    title: 'The First Morning',
    shortTitle: 'A Stolen Glance in Class',
    date: 'September 9, 2024',
    chapter: 'Chapter I: The Beginning',
    description: 'Morning sunlight poured through the wide classroom windows on September 9, 2024, illuminating the quiet hum of a new semester. As the classroom door swung open, Bhairavi walked in holding her notebooks—calm, studious, wearing glasses and a blue dupatta. Sitting at a front desk, he turned around. That quiet, unintentional first glance was the prologue to our story.',
    caption: '“I didn\'t know it that morning… but somehow, I had just met someone who would become my entire world.”',
    image: '/scean 1.png',
    icon: 'BookOpen',
    location: 'First Year Class Room',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'college',
    categoryLabel: 'Beginning',
    realm: 'The Scholarly Spires',
    mapLocationName: 'FIRST YEAR CLASS ROOM',
    mapIcon: 'college',
    timelineTitle: 'The First Morning',
    coordinates: { x: 5, y: 24 },
    narrativeParagraphs: [
      'Morning sunlight poured through the wide classroom windows on September 9, 2024, illuminating the quiet hum of a new semester.',
      'As the classroom door swung open, Bhairavi walked in holding her notebooks—calm, studious, wearing glasses and a blue dupatta. Sitting at a front desk, he turned around.',
      'That quiet, unintentional first glance was the unwritten prologue to a lifetime.'
    ],
    handwrittenNote: 'The morning clock read 9:15 AM. You were looking at your notes, and I forgot what lecture I was sitting in.',
    musicTrack: {
      title: 'First Autumn Sunlight',
      artist: 'Acoustic Piano & Celesta',
      mood: 'Tender, inquisitive, gentle'
    },
    details: [
      { label: 'Date', value: 'September 9, 2024' },
      { label: 'Time of Day', value: '9:15 AM Morning Lecture' },
      { label: 'Location', value: 'First Year Class Room' },
      { label: 'First Impression', value: 'Calm grace and gentle eyes' },
      { label: 'Unspoken Feeling', value: 'A sudden spark of quiet wonder' }
    ],
    artifacts: [
      {
        title: 'Class Timetable Sheet',
        description: 'Tucked into the back of our first semester spiral notebook.',
        type: 'ticket'
      }
    ]
  },

  // 02 — Date not specified: The Introduction
  {
    id: 'the-introduction',
    level: 2,
    title: 'The Introduction',
    shortTitle: 'Corridor Crossroads',
    date: 'Date not specified',
    chapter: 'Chapter I: The Beginning',
    description: 'Walking through the sunlit 1 BTech Block corridor between classes, a mutual friend introduced them. A tentative smile, shy hellos, and identity cards swaying with every step. What seemed like a casual two-minute exchange between lectures soon bloomed into hours of shared laughter along those very arches.',
    caption: '“Two strangers meeting in the middle of a crowded hallway, unaware that destiny had just clicked into place.”',
    image: '/scean 2.png',
    icon: 'MessageSquare',
    location: '1 BTech Block Corridor',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'college',
    categoryLabel: 'Beginning',
    realm: 'The Scholarly Spires',
    mapLocationName: '1 BTECH BLOCK CORRIDOR',
    mapIcon: 'conversation',
    timelineTitle: 'The Introduction',
    coordinates: { x: 10, y: 15 },
    narrativeParagraphs: [
      'Walking through the sunlit 1 BTech Block corridor between classes, a mutual friend introduced them.',
      'A tentative smile, shy hellos, and identity cards swaying with every step.',
      'What seemed like a casual two-minute exchange between lectures soon bloomed into hours of shared laughter along those very arches.'
    ],
    handwrittenNote: 'You adjusted your glasses while saying hello. I tried so hard not to look as flustered as I was.',
    musicTrack: {
      title: 'Corridor Echoes',
      artist: 'Acoustic Guitar & Warm Strings',
      mood: 'Warm, hesitant, blossoming'
    },
    details: [
      { label: 'Location', value: '1 BTech Block Corridor' },
      { label: 'Atmosphere', value: 'Sunlight filtering through college arches' },
      { label: 'The Greeting', value: 'A polite smile that changed everything' }
    ]
  },

  // 03 — Date not specified: Cleaning Day
  {
    id: 'cleaning-day',
    level: 3,
    title: 'Cleaning Day',
    shortTitle: 'Dust & Laughter',
    date: 'Date not specified',
    chapter: 'Chapter I: The Beginning',
    description: 'Armed with brooms, duster cloths, and boundless enthusiasm during the college cleaning drive across the College Ground and halls. Sweeping dusty spaces quickly turned into playful banter, hiding behind whiteboards, and sharing water bottles amid breathless giggles.',
    caption: '“Who knew that dusty classroom desks and shared water bottles on the college ground could make an ordinary chore feel like magic?”',
    image: '/scean 3.png',
    icon: 'Sparkles',
    location: 'College Ground',
    isUnlocked: true,
    colorAccent: '#F5C77E',
    category: 'college',
    categoryLabel: 'College Days',
    realm: 'The Scholarly Spires',
    mapLocationName: 'COLLEGE GROUND',
    mapIcon: 'water',
    timelineTitle: 'Cleaning Day',
    coordinates: { x: 16, y: 22 },
    narrativeParagraphs: [
      'Armed with brooms, duster cloths, and boundless enthusiasm during the college cleaning drive across the College Ground.',
      'Sweeping dusty classroom floors quickly turned into playful banter, hiding behind whiteboards, and sharing water bottles amid breathless giggles.'
    ],
    handwrittenNote: 'You threw chalk dust at me when I wasn\'t looking. I still owe you for that.',
    musicTrack: {
      title: 'Playful Sunlight',
      artist: 'Ukelele & Glitch Piano',
      mood: 'Playful, cheerful, youthful'
    },
    details: [
      { label: 'Location', value: 'College Ground' },
      { label: 'Event', value: 'Department Cleaning Drive' },
      { label: 'Secret Memory', value: 'Passing the cold steel water flask back and forth' }
    ]
  },

  // 04 — Date not specified: The First Group Picture
  {
    id: 'first-picture',
    level: 4,
    title: 'The First Group Picture',
    shortTitle: 'Captured In Amber',
    date: 'Date not specified',
    chapter: 'Chapter I: The Beginning',
    description: 'The very first group photograph ever taken together on the College Ground. Standing side by side in the sunshine, slightly awkward yet grinning with genuine delight. That first small photo frame became the anchor of a thousand cherished memories.',
    caption: '“A shy smile on the college ground, leaning in just a fraction closer, and a shutter click that preserved our youth forever.”',
    image: '/scean 4.png',
    icon: 'Camera',
    location: 'College Ground — Group Picture',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'college',
    categoryLabel: 'College Days',
    realm: 'The Garden of Firsts',
    mapLocationName: 'COLLEGE GROUND — GROUP PICTURE',
    mapIcon: 'camera',
    timelineTitle: 'The First Group Picture',
    coordinates: { x: 14, y: 38 },
    narrativeParagraphs: [
      'The very first photograph ever taken together during a group picture on the College Ground.',
      'Standing side by side under the gentle afternoon sun, slightly awkward yet grinning with genuine delight.',
      'That first small photo frame became the anchor of a thousand cherished memories.'
    ],
    handwrittenNote: 'Look how far apart we were standing! Neither of us had the courage to put an arm around the other yet.',
    musicTrack: {
      title: 'Polaroid Memory',
      artist: 'Solo Cello & Felt Piano',
      mood: 'Nostalgic, sweet, unforgettable'
    },
    details: [
      { label: 'Location', value: 'College Ground — Group Picture' },
      { label: 'Camera Used', value: 'Phone Camera (Unfiltered)' },
      { label: 'The Photo', value: 'Saved in favorites folder forever' }
    ],
    artifacts: [
      {
        title: 'Original Group Picture Metadata',
        description: 'Stored in the private favorites album.',
        type: 'photo'
      }
    ]
  },

  // 05 — Date not specified: Besties
  {
    id: 'besties',
    level: 5,
    title: 'Besties',
    shortTitle: 'Inseparable Duos',
    date: 'Date not specified',
    chapter: 'Chapter II: Deepening Bond',
    description: 'Somewhere between endless lecture notes, shared canteen snacks, and walking to the bus bay together every evening, acquaintances became best friends. An unspoken understanding where a single glance across a crowded room was enough to spark unstoppable laughter.',
    caption: '“From sharing canteen dosas to walking side by side down every lane, we became an inseparable sanctuary.”',
    image: '/scean 5.png',
    icon: 'Users',
    location: 'Library Steps & Canteen Corner',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'friendship',
    categoryLabel: 'Friendship',
    realm: 'The Garden of Firsts',
    mapLocationName: 'BESTIES',
    mapIcon: 'heart',
    timelineTitle: 'Besties',
    coordinates: { x: 8, y: 48 },
    narrativeParagraphs: [
      'Somewhere between endless lecture notes, shared canteen snacks, and walking to the bus bay together every evening, acquaintances became best friends.',
      'An unspoken understanding where a single glance across a crowded room was enough to spark unstoppable laughter.'
    ],
    handwrittenNote: 'Everyone in our class knew: wherever you were, I wouldn\'t be more than five feet away.',
    musicTrack: {
      title: 'Golden Companionship',
      artist: 'Acoustic Guitar & Flute Duet',
      mood: 'Carefree, comforting, loyal'
    },
    details: [
      { label: 'Spot', value: 'Corner Table by the Banyan Tree' },
      { label: 'Shared Ritual', value: 'Evening tea and samosas before buses left' },
      { label: 'Inside Jokes', value: 'Too numerous to write down' }
    ]
  },

  // 06 — Date not specified: Twenty Days Apart (The First Gap)
  {
    id: 'twenty-days-apart',
    level: 6,
    title: 'Twenty Days Apart',
    shortTitle: 'Twenty Days of Silence',
    date: 'Date not specified',
    chapter: 'Chapter II: Deepening Bond',
    description: 'Twenty long days of college break and physical separation. The familiar corridors felt unusually quiet and grey without Bhairavi\'s laughter echoing down the hallway. It was during those silent twenty days that both realized how irreplaceable their presence had become.',
    caption: '“Distance is not measured in miles, but in the quiet spaces between conversations where you miss someone dearly.”',
    image: '/scean 6.png',
    icon: 'Moon',
    location: 'Vacation Silence',
    isUnlocked: true,
    colorAccent: '#A37081',
    category: 'distance',
    categoryLabel: 'Distance',
    realm: 'The Silent Shores',
    mapLocationName: 'TWENTY DAYS APART',
    mapIcon: 'moon',
    timelineTitle: 'Twenty Days Apart',
    coordinates: { x: 11, y: 64 },
    narrativeParagraphs: [
      'Twenty long days of college break and physical separation.',
      'The familiar corridors felt unusually quiet and grey without Bhairavi\'s laughter echoing down the hallway.',
      'It was during those silent twenty days that both realized how irreplaceable their presence had become.'
    ],
    handwrittenNote: 'I checked my phone every ten minutes. Twenty days had never felt so much like twenty years.',
    musicTrack: {
      title: 'Quiet Rooms',
      artist: 'Ambient Piano & Distant Rain',
      mood: 'Yearning, introspective, quiet'
    },
    details: [
      { label: 'Duration', value: '20 Complete Days' },
      { label: 'Communication', value: 'Nightly texts and unspoken thoughts' },
      { label: 'Realization', value: 'Some people become essential to your day' }
    ],
    sadMemory: {
      enabled: true,
      title: 'The First Gap: The Silent Corridors',
      shortTitle: 'Twenty Days of Emptiness',
      date: 'Winter Break',
      location: 'Quiet Hallways & Silent Screens',
      description: 'Twenty endless days of empty lecture rooms and silent evenings. Every chime of the phone carried hope, and every quiet night brought the realization that distance is not measured in miles, but in the ache of missing someone whose presence has become your entire day.',
      caption: '“I counted the hours not by clocks, but by the quiet spaces where your laugh used to be.”',
      image: '/chaptre 6 sad image.png',
      mood: 'melancholic',
      handwrittenNote: 'The hallways felt so hollow without you. I kept checking my phone every few minutes, typing words I was too shy to send.'
    }
  },

  // 07 — Date not specified: Finding Our Way Back
  {
    id: 'finding-our-way-back',
    level: 7,
    title: 'Finding Our Way Back',
    shortTitle: 'The Return',
    date: 'Date not specified',
    chapter: 'Chapter II: Deepening Bond',
    description: 'The break ended, and the campus awoke with vibrant life. Catching sight of each other again near the college gate—that first bright, relieving smile that melted away twenty days of quiet longing in a single heartbeat.',
    caption: '“The moment our eyes met across the campus lawn, every ounce of quiet distance evaporated into pure joy.”',
    image: '/scean 7.png',
    icon: 'Compass',
    location: 'College Main Gate',
    isUnlocked: true,
    colorAccent: '#F5C77E',
    category: 'reunion',
    categoryLabel: 'Reunion',
    realm: 'The Silent Shores',
    mapLocationName: 'FINDING OUR WAY BACK',
    mapIcon: 'bridge',
    timelineTitle: 'Finding Our Way Back',
    coordinates: { x: 18, y: 74 },
    narrativeParagraphs: [
      'The break ended, and the campus awoke with vibrant life.',
      'Catching sight of each other again near the college gate—that first bright, relieving smile that melted away twenty days of quiet longing in a single heartbeat.'
    ],
    handwrittenNote: 'You ran up the steps shouting my name. I knew then that we would never let distance win.',
    musicTrack: {
      title: 'The Bridge of Return',
      artist: 'Orchestral Strings & Upbeat Harp',
      mood: 'Joyous, triumphant, reconnected'
    },
    details: [
      { label: 'Location', value: 'College North Arch Gate' },
      { label: 'Reunion Hour', value: '8:45 AM First Day Back' },
      { label: 'Shared Feeling', value: 'Warm relief and endless conversation' }
    ]
  },

  // 08 — January 29, 2025: The Bangles
  {
    id: 'the-bangles',
    level: 8,
    title: 'The Bangles',
    shortTitle: 'Glass & Gold',
    date: 'January 29, 2025',
    chapter: 'Chapter III: Gifts & Milestones',
    description: 'On January 29, 2025, a small velvet box was handed over beside the quiet campus greenery. Delicate glass bangles catching the sunlight, shimmering in hues of rose and gold. As Bhairavi slipped them over her wrists with a shy, radiant smile, their gentle chime sounded like a melody written just for two.',
    caption: '“Glass bangles that softly chimed with every step, carrying a warmth that words could not yet speak.”',
    image: '/scean 8.png',
    icon: 'Gift',
    location: 'College Garden Bench',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'milestones',
    categoryLabel: 'Gifts',
    realm: 'The Waters of Reflection',
    mapLocationName: 'THE BANGLES',
    mapIcon: 'gift',
    timelineTitle: 'The Bangles',
    coordinates: { x: 25, y: 68 },
    narrativeParagraphs: [
      'On January 29, 2025, a small velvet box was handed over beside the quiet campus greenery.',
      'Delicate glass bangles catching the sunlight, shimmering in hues of rose and gold.',
      'As Bhairavi slipped them over her wrists with a shy, radiant smile, their gentle chime sounded like a melody written just for two.'
    ],
    handwrittenNote: 'You turned your wrist to hear them chime. That sound will stay with me forever.',
    musicTrack: {
      title: 'Chimes of Glass & Rose',
      artist: 'Glockenspiel & Solo Violin',
      mood: 'Delicate, romantic, precious'
    },
    details: [
      { label: 'Milestone Date', value: 'January 29, 2025' },
      { label: 'Gift', value: 'Handcrafted Glass Bangles' },
      { label: 'Color Palette', value: 'Rose Pink & Warm Gold' },
      { label: 'Memory Note', value: 'Worn with gentle pride all through the semester' }
    ],
    artifacts: [
      {
        title: 'Velvet Keepsake Box',
        description: 'The small box that held the bangles on January 29, 2025.',
        type: 'keepsake'
      }
    ]
  },

  // 09 — January 31, 2025: Fest Day
  {
    id: 'fest-day',
    level: 9,
    title: 'Fest Day',
    shortTitle: 'Festival Carnival Lights',
    date: 'January 31, 2025',
    chapter: 'Chapter III: Gifts & Milestones',
    description: 'The annual college cultural fest day on January 31, 2025—stage lights flashing against the evening sky, music vibrating through the campus, stalls glowing in festive fairy lights, and walking shoulder to shoulder through the celebration together.',
    caption: '“Surrounded by music, festival stalls, and fairy lights, the only spotlight that mattered was right beside me.”',
    image: '/scean 9.png',
    icon: 'Music',
    location: 'College Grounds & Open Air Stage',
    isUnlocked: true,
    colorAccent: '#F5C77E',
    category: 'college',
    categoryLabel: 'College Fest',
    realm: 'The Waters of Reflection',
    mapLocationName: 'FEST DAY',
    mapIcon: 'celebration',
    timelineTitle: 'Fest Day',
    coordinates: { x: 28, y: 52 },
    narrativeParagraphs: [
      'The annual college cultural fest day on January 31, 2025.',
      'Stage lights flashing against the evening sky, music vibrating through the campus, stalls glowing in festive fairy lights, and walking shoulder to shoulder through the celebration together.'
    ],
    handwrittenNote: 'We stood at the back of the auditorium so we could talk while the bands played.',
    musicTrack: {
      title: 'Festival Carnival Lights',
      artist: 'Ensemble Strings & Percussion',
      mood: 'Vibrant, celebratory, romantic'
    },
    details: [
      { label: 'Date', value: 'January 31, 2025' },
      { label: 'Event', value: 'Annual College Cultural Fest' },
      { label: 'Fest Attire', value: 'Black Kurta & Embroidered Anarkali' },
      { label: 'Shared Food', value: 'Chaat & Hot Jalebis' }
    ]
  },

  // 10 — June 9, 2025: The Handmade Shivling
  {
    id: 'handmade-shivling',
    level: 10,
    title: 'The Handmade Shivling',
    shortTitle: 'Folded In Devotion',
    date: 'June 9, 2025',
    chapter: 'Chapter III: Gifts & Milestones',
    description: 'On June 9, 2025, he crafted a delicate Lord Shiva lingam entirely from paper with quiet patience and devotion, presenting it to Bhairavi/Ammu. Seeing the intricate handmade gift, her face lit up with radiant joy and profound happiness, holding it close as a treasure beyond measure.',
    caption: '“Crafted gently by hand from paper—a small sacred symbol given with pure reverence and boundless care.”',
    image: '/handmade shivling.png',
    icon: 'Sparkles',
    location: 'Quiet Study Corner',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'milestones',
    categoryLabel: 'Gifts',
    realm: 'The Waters of Reflection',
    mapLocationName: 'THE HANDMADE SHIVLING',
    mapIcon: 'temple',
    timelineTitle: 'The Handmade Shivling',
    coordinates: { x: 23, y: 38 },
    narrativeParagraphs: [
      'On June 9, 2025, he crafted a delicate Lord Shiva lingam entirely from paper with quiet patience and devotion, presenting it to Bhairavi/Ammu.',
      'Seeing the intricate handmade gift, her face lit up with radiant joy and profound happiness, holding it close as a treasure beyond measure.',
      'A sacred handmade keepsake expressing pure dedication and spiritual tenderness.'
    ],
    handwrittenNote: 'Every fold was a quiet prayer for your happiness. Seeing your smile that afternoon was my greatest blessing.',
    musicTrack: {
      title: 'Sanctified Paper & Devotion',
      artist: 'Bansuri Flute & Ambient Sitar',
      mood: 'Sacred, peaceful, heartfelt'
    },
    details: [
      { label: 'Date', value: 'June 9, 2025' },
      { label: 'Gift Type', value: 'Handmade Origami Paper Shivling' },
      { label: 'Her Reaction', value: 'Pure joy, wide radiant smile, held as a treasure' },
      { label: 'Significance', value: 'A spiritual keepsake made with boundless love' }
    ],
    artifacts: [
      {
        title: 'The Sacred Paper Shivling',
        description: 'Delicately folded paper emblem of Lord Shiva presented on June 9, 2025.',
        type: 'keepsake'
      }
    ]
  },

  // 11 — September 6, 2025: The Day She Accepted My Love
  {
    id: 'first-i-love-you',
    level: 11,
    title: 'The Day She Accepted My Love',
    shortTitle: 'She Said I Love You',
    date: 'September 6, 2025',
    chapter: 'Chapter IV: Sacred Milestones',
    description: 'September 6, 2025 was the day she accepted my love for the first time. I was incredibly happy that day. I teased her a lot about becoming distant, and she reassured me by saying \'I love you\' many times. Those words echoed again and again in happy whispers, sealing our hearts together in pure joy.',
    caption: '“The day she accepted my love for the first time—pure happiness, playful teasing, and three words that changed our whole universe.”',
    image: '/the fisrt i love you.png',
    icon: 'Heart',
    location: 'Sunlit Campus Walkway',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Garden of Firsts',
    mapLocationName: 'THE DAY SHE ACCEPTED MY LOVE',
    mapIcon: 'heart',
    timelineTitle: 'The Day She Accepted My Love',
    coordinates: { x: 26, y: 22 },
    narrativeParagraphs: [
      'September 6, 2025 was the day she accepted my love for the first time. I was incredibly happy that day.',
      'I teased her a lot about becoming distant, and she reassured me by saying \'I love you\' many times.',
      'Those sacred words echoed again and again in happy whispers moments later, sealing our hearts together in a bond that would never fade.'
    ],
    handwrittenNote: 'You paused, teased me gently, and then said it. My heart skipped five beats. And then you said it again to reassure me.',
    musicTrack: {
      title: 'Three Whispered Words',
      artist: 'Acoustic Piano & Tender Strings',
      mood: 'Blissful, emotional, tenderly playful'
    },
    details: [
      { label: 'Date', value: 'September 6, 2025' },
      { label: 'The Milestone', value: 'She accepted my love for the first time' },
      { label: 'The Emotion', value: 'Surprise, pure happiness, playful teasing' },
      { label: 'Echoes', value: 'Reassured by saying \'I love you\' many times' }
    ]
  },

  // 12 — October 31, 2025: Our First Date — Mavullamma Temple
  {
    id: 'the-temple-day',
    level: 12,
    title: 'Our First Date — Mavullamma Temple',
    shortTitle: 'Sacred Prayers & Prasadam',
    date: 'October 31, 2025',
    chapter: 'Chapter IV: Sacred Milestones',
    description: 'On October 31, 2025, they went on their first date and visited Bhimavaram Mavullamma Temple together for the very first time. Surrounded by the gentle glow of brass oil lamps and sacred bells, he quietly prayed with all his heart that they would return here together again in the future. Bhairavi placed sacred prasadam into his hands for the first time—a spiritual moment forever etched in eternity.',
    caption: '“Our first date at Bhimavaram Mavullamma Temple—sacred bells, prasadam given for the first time, and a quiet prayer that we would return together for a lifetime.”',
    image: '/temple day.png',
    icon: 'Sparkles',
    location: 'Bhimavaram Mavullamma Temple',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Waters of Reflection',
    mapLocationName: 'OUR FIRST DATE — MAVULLAMMA TEMPLE',
    mapIcon: 'temple',
    timelineTitle: 'Our First Date — Mavullamma Temple',
    coordinates: { x: 33, y: 16 },
    narrativeParagraphs: [
      'On October 31, 2025, they went on their first date and visited Bhimavaram Mavullamma Temple together for the very first time.',
      'Surrounded by the gentle glow of brass oil lamps and chanting, he quietly prayed with all his heart that they would walk into this temple together again in the future.',
      'With gentle reverence, Bhairavi placed sacred prasadam into his hands for the first time—a spiritual moment forever etched in eternity.'
    ],
    handwrittenNote: 'The temple bells were ringing when you handed me the prasadam on our first date. I closed my eyes and prayed we would always walk these steps together.',
    musicTrack: {
      title: 'Sanctum Bells & Prayers',
      artist: 'Veena & Temple Bells',
      mood: 'Devotional, reverent, serene'
    },
    details: [
      { label: 'Date', value: 'October 31, 2025' },
      { label: 'Milestone', value: 'First date & first temple visit together' },
      { label: 'Location', value: 'Bhimavaram Mavullamma Temple' },
      { label: 'The Prasadam', value: 'Given by Bhairavi for the first time' },
      { label: 'Silent Prayer', value: 'To return to this temple together for a lifetime' }
    ],
    artifacts: [
      {
        title: 'Temple Sacred Thread',
        description: 'Tied on October 31, 2025 at Mavullamma Temple, carrying a silent prayer for our future.',
        type: 'keepsake'
      }
    ]
  },

  // 13 — December 10, 2025: Vijayawada Hackathon
  {
    id: 'vijayawada-hackathon',
    level: 13,
    title: 'Vijayawada Hackathon',
    shortTitle: 'Hackathon Journey',
    date: 'December 10, 2025',
    chapter: 'Chapter V: Journeys & Hackathons',
    description: 'Stepping out beyond familiar grounds for the inter-college hackathon in Vijayawada on December 10, 2025. Rows of glowing laptops, brainstorming algorithms, typing code late into the night, and realizing what an unbeatable team they made side by side.',
    caption: '“Lines of code on the screen, coffee cups piling up, and the realization that we make the best team in the world.”',
    image: '/scean 11.png',
    icon: 'Laptop',
    location: 'Vijayawada Tech Campus Arena',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'journey',
    categoryLabel: 'Journeys',
    realm: 'The Grand Odyssey',
    mapLocationName: 'VIJAYAWADA HACKATHON',
    mapIcon: 'train',
    timelineTitle: 'Vijayawada Hackathon',
    coordinates: { x: 39, y: 26 },
    narrativeParagraphs: [
      'Stepping out beyond familiar grounds for the inter-college hackathon in Vijayawada on December 10, 2025.',
      'Rows of glowing laptops, brainstorming algorithms, typing code late into the night, and realizing what an unbeatable team they made side by side.'
    ],
    handwrittenNote: 'You debugged my code while I was panicking at 2 AM. We won before the judges even announced the results.',
    musicTrack: {
      title: 'Midnight Hackathon Sprint',
      artist: 'Synthwave & Electronic Ambient',
      mood: 'Focused, collaborative, electric'
    },
    details: [
      { label: 'Date', value: 'December 10, 2025' },
      { label: 'Destination', value: 'Vijayawada Tech Campus' },
      { label: 'Hackathon Duration', value: '36 Hours of Code & Coffee' },
      { label: 'Project', value: 'Built together with shared pride' }
    ],
    artifacts: [
      {
        title: 'Hackathon Participant Badge',
        description: 'Laminated badge from the Vijayawada competition hall.',
        type: 'ticket'
      }
    ]
  },

  // 14 — December 10, 2025: Three Days Together
  {
    id: 'three-days-together',
    level: 14,
    title: 'Three Days Together',
    shortTitle: 'Shared Horizons',
    date: 'December 10, 2025',
    chapter: 'Chapter V: Journeys & Hackathons',
    description: 'Three continuous, golden days spent entirely in each other\'s presence in Vijayawada. Exploring new streets, walking along the Krishna riverfront at dusk, sharing every meal, and feeling the natural, effortless harmony of living life as a pair.',
    caption: '“Three uninterrupted days away from routine, where every hour felt like an effortless chapter in paradise.”',
    image: '/scean 12.png',
    icon: 'Calendar',
    location: 'Vijayawada Riverside & City Promenade',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'journey',
    categoryLabel: 'Journeys',
    realm: 'The Grand Odyssey',
    mapLocationName: 'THREE DAYS TOGETHER',
    mapIcon: 'calendar',
    timelineTitle: 'Three Days Together',
    coordinates: { x: 36, y: 44 },
    narrativeParagraphs: [
      'Three continuous, golden days spent entirely in each other\'s presence.',
      'Exploring new streets, walking along the Krishna riverfront at dusk, sharing every meal, and feeling the natural, effortless harmony of living life as a pair.'
    ],
    handwrittenNote: 'We walked by the river until the streetlights switched on. Three days felt both like three seconds and a whole lifetime.',
    musicTrack: {
      title: 'Riverside Twilight',
      artist: 'Acoustic Guitar & Ambient Waves',
      mood: 'Warm, peaceful, deeply romantic'
    },
    details: [
      { label: 'Date', value: 'December 10, 2025' },
      { label: 'Days Together', value: '3 Continuous Days' },
      { label: 'River Walk', value: 'Prakasam Barrage & Krishna Riverfront' },
      { label: 'Shared Moments', value: 'Breakfast, evening tea, and long strolls' }
    ]
  },

  // 15 — Date not specified: The Train Home
  {
    id: 'train-home',
    level: 15,
    title: 'The Train Home',
    shortTitle: 'Rhythmic Rails',
    date: 'Date not specified',
    chapter: 'Chapter V: Journeys & Hackathons',
    description: 'The rhythmic clatter of iron rails heading back home. Misty dawn windows, cold breeze sweeping through the coach doors, passing lush green paddy fields, and sharing earphones with a head gently resting against the compartment window.',
    caption: '“The steady hum of train tracks beneath us, green fields flashing past, and the quiet comfort of being near.”',
    image: '/scean 13.png',
    icon: 'Train',
    location: 'Express Train Carriage',
    isUnlocked: true,
    colorAccent: '#F5C77E',
    category: 'journey',
    categoryLabel: 'Journeys',
    realm: 'The Grand Odyssey',
    mapLocationName: 'THE TRAIN HOME',
    mapIcon: 'train',
    timelineTitle: 'The Train Home',
    coordinates: { x: 41, y: 58 },
    narrativeParagraphs: [
      'The rhythmic clatter of iron rails heading back home.',
      'Misty dawn windows, cold breeze sweeping through the coach doors, passing lush green paddy fields, and sharing earphones with a head gently resting against the compartment window.'
    ],
    handwrittenNote: 'One earphone for you, one for me. The train was cold, but sitting beside you made everything warm.',
    musicTrack: {
      title: 'Tracks in the Morning Mist',
      artist: 'Felt Piano & Train Rhythm',
      mood: 'Gentle, meditative, sweet journey'
    },
    details: [
      { label: 'Journey', value: 'Vijayawada Express Train' },
      { label: 'View', value: 'Coastal green paddy fields & delta bridges' },
      { label: 'Soundtrack', value: 'Shared playlist on looped acoustic tracks' }
    ],
    artifacts: [
      {
        title: 'Train Journey Ticket',
        description: 'Reserved window seat ticket from the return journey.',
        type: 'ticket'
      }
    ]
  },

  // 16 — January 5, 2026: When Our Love Life Truly Began
  {
    id: 'a-new-chapter',
    level: 16,
    title: 'When Our Love Life Truly Began',
    shortTitle: 'Our Relationship Established',
    date: 'January 5, 2026',
    chapter: 'Chapter VI: The New Horizon',
    description: 'Stepping into 2026 side by side on January 5, this was the moment when our love life truly began. Our relationship became clear, mutual, and officially established—no longer a question of if, but a shared journey of two devoted hearts stepping forward together with unwavering certainty.',
    caption: '“The moment our relationship became clear, mutual, and officially established—stepping into a new year as one.”',
    image: '/scean 14.png',
    icon: 'Sparkles',
    location: 'Campus Central Plaza',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Temple of Vows',
    mapLocationName: 'WHEN OUR LOVE LIFE TRULY BEGAN',
    mapIcon: 'ribbon',
    timelineTitle: 'When Our Love Life Truly Began',
    coordinates: { x: 47, y: 72 },
    narrativeParagraphs: [
      'Stepping into the new year of 2026 side by side on January 5, this was the moment when our love life truly began.',
      'Our relationship became clear, mutual, and officially established—a bond sealed in trust and open devotion.',
      'A fresh page turned with boundless clarity and unwavering certainty for everything awaiting us.'
    ],
    handwrittenNote: 'Everything became clear. We looked at each other and knew: our love life has truly begun.',
    musicTrack: {
      title: 'Dawn of a New Year',
      artist: 'Orchestral Overture & Celesta',
      mood: 'Uplifting, hopeful, luminous'
    },
    details: [
      { label: 'Date', value: 'January 5, 2026' },
      { label: 'Milestone', value: 'Relationship officially established' },
      { label: 'The Truth', value: 'Clear, mutual, and devoted certainty' }
    ]
  },

  // 17 — January 11, 2026: Sankranthi Fest Days
  {
    id: 'clh-day',
    level: 17,
    title: 'Sankranthi Fest Days',
    shortTitle: 'Tradition & Photographs',
    date: 'January 11, 2026',
    chapter: 'Chapter VI: The New Horizon',
    description: 'On January 11, 2026, during the Sankranthi festival celebrations, they spent a magnificent day walking around the campus grounds together. He wore traditional pancha/dhoti attire, while Bhairavi looked ethereal in her saree. Looking like a proud traditional couple, they walked together and took dozens of beautiful photographs with their camera, capturing memories that will shine forever.',
    caption: '“Sankranthi celebrations on campus—dressed in traditional dhoti and saree, walking together and capturing countless timeless photographs.”',
    image: '/clh day.png',
    icon: 'Camera',
    location: 'Sankranthi Fest Time — Campus Grounds',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'college',
    categoryLabel: 'College Days',
    realm: 'The Temple of Vows',
    mapLocationName: 'SANKRANTHI FEST DAYS',
    mapIcon: 'camera',
    timelineTitle: 'Sankranthi Fest Days',
    coordinates: { x: 54, y: 76 },
    narrativeParagraphs: [
      'On January 11, 2026, during the Sankranthi festival celebrations, they spent a magnificent day walking around the campus grounds together.',
      'He wore traditional pancha/dhoti attire, while Bhairavi looked ethereal in her saree. Looking like a proud traditional couple enjoying their special day, they took dozens of beautiful photographs with their camera.',
      'Every corner of the campus became a stage for laughter, posing, and timeless portraits.'
    ],
    handwrittenNote: 'You in your saree and me in my traditional pancha during Sankranthi—everyone said we looked like a married couple. We couldn\'t stop smiling.',
    musicTrack: {
      title: 'Traditional Grace & Camera Clicks',
      artist: 'Sitar, Acoustic Guitar & Warm Strings',
      mood: 'Elegant, joyful, picturesque'
    },
    details: [
      { label: 'Date', value: 'January 11, 2026' },
      { label: 'Festival', value: 'Sankranthi Celebrations' },
      { label: 'Location', value: 'Sankranthi Fest Time — Campus Grounds' },
      { label: 'Attire', value: 'Traditional Pancha/Dhoti & Elegant Saree' },
      { label: 'Activities', value: 'Campus walk, photo shoot with camera, countless poses' }
    ],
    artifacts: [
      {
        title: 'Sankranthi Traditional Photo Album',
        description: 'Camera roll of traditional couple portraits taken across campus on January 11, 2026.',
        type: 'photo'
      }
    ]
  },

  // 18 — January 31, 2026: Antarvedi
  {
    id: 'antarvedi',
    level: 18,
    title: 'Antarvedi',
    shortTitle: 'Where River Meets Sea',
    date: 'January 31, 2026',
    chapter: 'Chapter VI: The New Horizon',
    description: 'Standing at the sacred confluence where the mighty Godavari river merges peacefully into the Bay of Bengal on January 31, 2026. Temple bells chiming in the coastal wind, damp ocean sands beneath their feet, and silent prayers offered to the boundless ocean.',
    caption: '“Where the sacred river silently surrenders to the ocean, our vows were spoken directly to the tides of eternity.”',
    image: '/scean 15.png',
    icon: 'Compass',
    location: 'Antarvedi Sagara Sangamam',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'journey',
    categoryLabel: 'Journeys',
    realm: 'The Temple of Vows',
    mapLocationName: 'ANTARVEDI',
    mapIcon: 'temple',
    timelineTitle: 'Antarvedi',
    coordinates: { x: 60, y: 66 },
    narrativeParagraphs: [
      'Standing at the sacred confluence where the mighty Godavari river merges peacefully into the Bay of Bengal on January 31, 2026.',
      'Temple bells chiming in the coastal wind, damp ocean sands beneath their feet, and silent prayers offered to the boundless ocean.'
    ],
    handwrittenNote: 'The ocean wind was so loud, but when you whispered beside me, it was the only sound in the world.',
    musicTrack: {
      title: 'Confluence of Holy Tides',
      artist: 'Santoor & Oceanic Ambient',
      mood: 'Spiritual, profound, sacred'
    },
    details: [
      { label: 'Date', value: 'January 31, 2026' },
      { label: 'Sacred Site', value: 'Antarvedi Sagara Sangamam' },
      { label: 'Confluence', value: 'Godavari River & Bay of Bengal' },
      { label: 'Atmosphere', value: 'Temple bells in the sea breeze' }
    ],
    artifacts: [
      {
        title: 'Antarvedi Sea Shell Keepsake',
        description: 'Found at the shore where river meets sea.',
        type: 'keepsake'
      }
    ]
  },

  // 19 — January 31, 2026: Seven Steps
  {
    id: 'seven-steps',
    level: 19,
    title: 'Seven Steps',
    shortTitle: 'Sacred Vows by the Waves',
    date: 'January 31, 2026',
    chapter: 'Chapter VI: The New Horizon',
    description: 'Walking seven deliberate, sacred steps together along the shoreline of Antarvedi on January 31, 2026 as twilight descended. Seven quiet promises whispered to the sea: of trust, patience, loyalty, laughter, devotion, family, and lifelong companionship.',
    caption: '“Seven steps walked hand in hand on the damp shoreline sand, each one a lifetime covenant under the evening sky.”',
    image: '/scean 16.png',
    icon: 'Heart',
    location: 'Antarvedi Shoreline',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'commitments',
    categoryLabel: 'Sacred Vows',
    realm: 'The Temple of Vows',
    mapLocationName: 'SEVEN STEPS',
    mapIcon: 'footprints',
    timelineTitle: 'Seven Steps',
    coordinates: { x: 56, y: 48 },
    narrativeParagraphs: [
      'Walking seven deliberate, sacred steps together along the shoreline of Antarvedi on January 31, 2026 as twilight descended.',
      'Seven quiet promises whispered to the sea: of trust, patience, loyalty, laughter, devotion, family, and lifelong companionship.'
    ],
    handwrittenNote: 'Step 1 for friendship. Step 2 for courage. Step 7 for forever. I meant every single word.',
    musicTrack: {
      title: 'Seven Steps by the Tide',
      artist: 'Solo Cello & Ocean Chorus',
      mood: 'Reverent, eternal, monumental'
    },
    details: [
      { label: 'Date', value: 'January 31, 2026' },
      { label: 'The Seven Vows', value: 'Truth, Patience, Laughter, Devotion, Strength, Honor, Eternity' },
      { label: 'Witness', value: 'The Eternal Tide & Sky' }
    ]
  },

  // 20 — February 15, 2026: The Day We Chose
  {
    id: 'our-chosen-day',
    level: 20,
    title: 'The Day We Chose',
    shortTitle: 'Our Love Anniversary',
    date: 'February 15, 2026',
    chapter: 'Chapter VII: Chosen Promises',
    description: 'We wanted our love anniversary to carry a meaning beyond a calendar number. We chose to connect it with Shivaratri — a day that felt spiritually meaningful to us. Under a sky washed in twilight and devotion, our mutual pledge was consecrated forever.',
    caption: '“February 15, 2026 — We chose to connect our love anniversary with Shivaratri, making our bond sacred beyond simple calendar dates.”',
    image: '/scean 17.png',
    icon: 'Star',
    location: 'Twilight Terrace Horizon',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'commitments',
    categoryLabel: 'Sacred Vows',
    realm: 'The Sanctuary of Solace',
    mapLocationName: 'THE DAY WE CHOSE',
    mapIcon: 'calendar-heart',
    timelineTitle: 'The Day We Chose',
    coordinates: { x: 52, y: 32 },
    narrativeParagraphs: [
      'We wanted our love anniversary to carry a meaning beyond a calendar number.',
      'We chose to connect it with Shivaratri — a day that felt spiritually meaningful to us.',
      'Not a fleeting feeling, but a mature, deeply rooted commitment to stand as one through all seasons of life.'
    ],
    handwrittenNote: 'Connecting our anniversary to Shivaratri gave our love a spiritual anchor. The day our two paths permanently became one.',
    musicTrack: {
      title: 'Covenant of the Sacred Night',
      artist: 'Acoustic Piano & Golden Strings',
      mood: 'Devotional, golden, unwavering'
    },
    details: [
      { label: 'Anniversary Date', value: 'February 15, 2026' },
      { label: 'Significance', value: 'Connected with Shivaratri Tradition' },
      { label: 'Vow Sealed', value: 'Spiritual pledge of unconditional devotion' }
    ]
  },

  // 21 — February 18, 2026: New Chapter
  {
    id: 'new-chapter',
    level: 21,
    title: 'New Chapter',
    shortTitle: 'A Deeply Meaningful Beginning',
    date: 'February 18, 2026',
    chapter: 'Chapter VII: Chosen Promises',
    description: 'February 18, 2026 felt like the beginning of something deeply meaningful in our story. It was a day when everything we had gone through, everything we had understood about each other, and everything we hoped for the future felt closer than ever. This was not just another day in the timeline. It felt like the beginning of a new chapter in our lives together.',
    caption: '“Some days don\'t just become memories. They become beginnings.”',
    image: '/scean 18.png',
    icon: 'BookOpen',
    location: 'A Turning Point in Our Journey',
    isUnlocked: true,
    colorAccent: '#F5C77E',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Sanctuary of Solace',
    mapLocationName: 'NEW CHAPTER',
    mapIcon: 'ribbon',
    timelineTitle: 'New Chapter',
    coordinates: { x: 57, y: 22 },
    narrativeParagraphs: [
      'February 18, 2026 felt like the beginning of something deeply meaningful in our story.',
      'It was a day when everything we had gone through, everything we had understood about each other, and everything we hoped for the future felt closer than ever.',
      'This was not just another day in the timeline. It felt like the beginning of a new chapter in our lives together.'
    ],
    handwrittenNote: 'Some days don’t just become memories. They become beginnings. February 18 was the moment our tomorrow became clear.',
    musicTrack: {
      title: 'Pages of a New Beginning',
      artist: 'Light Percussion, Piano & Harp Melody',
      mood: 'Hopeful, serene, deeply meaningful'
    },
    details: [
      { label: 'Date', value: 'February 18, 2026' },
      { label: 'Significance', value: 'The beginning of a deeply meaningful new chapter' },
      { label: 'Atmosphere', value: 'Closeness, mutual understanding & shared hopes' }
    ]
  },

  // 22 — February 18, 2026: Our Most Precious Promise (SPECIAL CHAPTER!)
  {
    id: 'our-most-precious-promise',
    level: 22,
    title: 'Our Most Precious Promise',
    shortTitle: 'The Sacred Thread on the Train',
    date: 'February 18, 2026',
    chapter: 'Chapter VII: Chosen Promises',
    description: 'February 18, 2026: A sacred train journey to Bhimavaram that sealed our most precious promises. Bound by a symbolic sacred thread and quiet, lifelong vows spoken across the rhythmic hum of the rails. A profoundly meaningful sacred moment and private promise held close in our hearts.',
    caption: '“A train journey to Bhimavaram carrying our most precious promise, a sacred thread, and quiet vows that bound our futures together.”',
    image: '/february 18 image.png',
    icon: 'Heart',
    location: 'Train Journey — Bhimavaram',
    isUnlocked: true,
    isSpecialMemory: true,
    colorAccent: '#D8B46A',
    category: 'commitments',
    categoryLabel: 'Sacred Vows',
    realm: 'The Sanctuary of Solace',
    mapLocationName: 'OUR MOST PRECIOUS PROMISE',
    mapIcon: 'heart-star',
    timelineTitle: 'Our Most Precious Promise',
    coordinates: { x: 60, y: 16 },
    narrativeParagraphs: [
      'February 18, 2026: A train journey to Bhimavaram that became one of the most sacred turning points of our story.',
      'Sealed by a symbolic sacred thread and unspoken vows that bound our futures together in reverent devotion.',
      'A private promise and sacred moment held in quiet reverence, marking a lifelong spiritual covenant.'
    ],
    handwrittenNote: 'The sacred thread tied on that train to Bhimavaram holds my whole life. I will honor and protect this promise forever.',
    musicTrack: {
      title: 'Sacred Thread on the Rails',
      artist: 'Violin, Veena & Deep Ambient Cello',
      mood: 'Devotional, monumental, sacred'
    },
    details: [
      { label: 'Date', value: 'February 18, 2026' },
      { label: 'Location', value: 'Train Journey — Bhimavaram' },
      { label: 'Sacred Symbol', value: 'Sacred Thread & Lifelong Vow' },
      { label: 'Significance', value: 'A private promise and sacred moment' }
    ],
    artifacts: [
      {
        title: 'The Sacred Promise Thread',
        description: 'Bound on the train journey to Bhimavaram on February 18, 2026.',
        type: 'keepsake'
      }
    ]
  },

  // 23 — February 18, 2026: A Day We Were Simply Happy
  {
    id: 'a-day-we-were-simply-happy',
    level: 23,
    title: 'A Day We Were Simply Happy',
    shortTitle: 'Mirror Reflections & Joy',
    date: 'February 18, 2026',
    chapter: 'Chapter VII: Chosen Promises',
    description: 'On February 18, 2026 in Bhimavaram, they spent a joyful, carefree day full of warmth and laughter. Taking mirror photographs together, capturing funny and sweet poses, and sharing the kind of effortless happiness and emotional closeness that only true companionship brings.',
    caption: '“Capturing our reflection side by side—simple, pure happiness, joyful laughter, and complete trust.”',
    image: '/mirror memory.png',
    icon: 'Camera',
    location: 'Bhimavaram / Private Memory',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'milestones',
    categoryLabel: 'Joyful Moments',
    realm: 'The Sanctuary of Solace',
    mapLocationName: 'A DAY WE WERE SIMPLY HAPPY',
    mapIcon: 'camera',
    timelineTitle: 'A Day We Were Simply Happy',
    coordinates: { x: 63, y: 22 },
    narrativeParagraphs: [
      'A quiet, treasured moment of pure closeness and trust during their time in Bhimavaram.',
      'Taking mirror photographs together, laughing without a care in the world, posing for the camera, and enjoying the sweetness of simply being present with each other.',
      'An effortless peace and joyful companionship that made every second feel light and bright.'
    ],
    handwrittenNote: 'Looking at our reflection in the mirror, smiling and laughing together—I just felt so simply, completely happy.',
    musicTrack: {
      title: 'Reflections of Joy',
      artist: 'Acoustic Guitar, Piano & Warm Strings',
      mood: 'Joyful, warm, lighthearted'
    },
    details: [
      { label: 'Date', value: 'February 18, 2026' },
      { label: 'Location', value: 'Bhimavaram / Private Memory' },
      { label: 'Moments', value: 'Mirror photography, camera poses & laughter' },
      { label: 'The Feeling', value: 'Pure happiness and emotional closeness' }
    ],
    artifacts: [
      {
        title: 'The Mirror Photograph',
        description: 'Captured on our happiest day of closeness, laughter, and trust.',
        type: 'photo'
      }
    ]
  },

  // 24 — March 2, 2026: The First Long Drive
  {
    id: 'first-long-drive',
    level: 24,
    title: 'The First Long Drive',
    shortTitle: 'Two Wheels & Open Roads',
    date: 'March 2, 2026',
    chapter: 'Chapter VII: Chosen Promises',
    description: 'On March 2, 2026, they took their very first long motorcycle ride together, travelling to college through the refreshing morning air as Bhairavi/Ammu sat safely behind him. They spent that entire joyful day together walking around campus, giving college announcements, and sharing nonstop laughter on one of their happiest days.',
    caption: '“Our first long motorcycle ride together—cool morning breeze, Bhairavi sitting safely behind, and a day full of campus announcements and smiles.”',
    image: '/first long drive.png',
    icon: 'Compass',
    location: 'Highway to College & Campus Grounds',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'journey',
    categoryLabel: 'Journeys',
    realm: 'The Sanctuary of Solace',
    mapLocationName: 'THE FIRST LONG DRIVE',
    mapIcon: 'bridge',
    timelineTitle: 'The First Long Drive',
    coordinates: { x: 66, y: 22 },
    narrativeParagraphs: [
      'On March 2, 2026, they took their very first long motorcycle ride together, travelling to college through the refreshing morning air as Bhairavi/Ammu sat safely behind him.',
      'They spent that entire joyful day together walking around campus, giving college announcements, and sharing nonstop laughter.',
      'A remarkably happy milestone filled with freedom, trust, and shared excitement.'
    ],
    handwrittenNote: 'You held onto my jacket as we took the turns on the highway. Travelling together to college that morning felt like flying.',
    musicTrack: {
      title: 'Morning Breeze & Open Highways',
      artist: 'Acoustic Guitar & Gentle Percussion',
      mood: 'Exhilarating, joyful, breezy romance'
    },
    details: [
      { label: 'Date', value: 'March 2, 2026' },
      { label: 'Milestone', value: 'First long motorcycle ride together' },
      { label: 'Destination', value: 'College Campus via Highway' },
      { label: 'Campus Activity', value: 'Giving college announcements & campus walk' }
    ]
  },

  // 25 — March 2026: Freshers Days
  {
    id: 'freshers-days',
    level: 25,
    title: 'Freshers Days',
    shortTitle: 'College Festivities & Poses',
    date: 'March 2026',
    chapter: 'Chapter VII: Chosen Promises',
    description: 'During March 2026, the college came alive for the Freshers festivities. Walking hand in hand through the decorated campus, striking memorable poses for the camera, sharing sweet snacks, and soaking in the joyful energy of the college crowd together.',
    caption: '“Vibrant college celebrations, striking fun poses, walking the grounds together, and making every second of Freshers unforgettable.”',
    image: '/freshersd days.png',
    icon: 'Camera',
    location: 'College Auditorium & Quadrangle',
    isUnlocked: true,
    colorAccent: '#F5C77E',
    category: 'college',
    categoryLabel: 'College Days',
    realm: 'The Scholarly Spires',
    mapLocationName: 'FRESHERS DAYS',
    mapIcon: 'celebration',
    timelineTitle: 'Freshers Days',
    coordinates: { x: 70, y: 36 },
    narrativeParagraphs: [
      'During March 2026, the college came alive for the Freshers festivities.',
      'Walking hand in hand through the decorated campus, striking memorable poses for the camera, sharing sweet snacks, and soaking in the joyful energy of the college crowd together.',
      'Laughter echoed everywhere as they celebrated youth and shared moments that would never fade.'
    ],
    handwrittenNote: 'All those funny poses we made for the camera during Freshers! We were laughing so hard we almost dropped the camera.',
    musicTrack: {
      title: 'Freshers Day Melodies',
      artist: 'Brass, Piano & Upbeat Strings',
      mood: 'Celebratory, lively, bright'
    },
    details: [
      { label: 'Timeframe', value: 'March 2026' },
      { label: 'Event', value: 'College Freshers Festivities' },
      { label: 'Memories', value: 'Campus walk, photo poses, music, and celebration' }
    ],
    artifacts: [
      {
        title: 'Freshers Day Photo Reel',
        description: 'Collection of joyful camera poses from Freshers 2026.',
        type: 'photo'
      }
    ]
  },

  // 26 — March 26, 2026: The Last Date Before the Gap
  {
    id: 'last-date-before-gap',
    level: 26,
    title: 'The Last Date Before the Gap',
    shortTitle: 'The Quiet Afternoon',
    date: 'March 26, 2026',
    chapter: 'Chapter VIII: Trials & Distance',
    description: 'March 26, 2026: The final afternoon spent together before the upcoming period of distance. Sitting across the table, hands intertwined, drinking slow sips of tea while speaking brave words of encouragement to brace for the days ahead.',
    caption: '“Holding onto each second as the afternoon slipped by, promising that no distance could ever weaken what we built.”',
    image: '/scean 19.png',
    icon: 'Clock',
    location: 'Corner Cafe by the Lake',
    isUnlocked: true,
    colorAccent: '#A37081',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Desert of Patience',
    mapLocationName: 'LAST DATE BEFORE GAP',
    mapIcon: 'sunset',
    timelineTitle: 'The Last Date Before the Gap',
    coordinates: { x: 65, y: 52 },
    narrativeParagraphs: [
      'March 26, 2026: The final afternoon spent together before the upcoming period of distance.',
      'Sitting across the table, hands intertwined, drinking slow sips of tea while speaking brave words of encouragement to brace for the days ahead.'
    ],
    handwrittenNote: 'Neither of us wanted to look at the clock. We just held hands tighter with every minute.',
    musicTrack: {
      title: 'Amber Afternoon Tea',
      artist: 'Acoustic Cello & Rhodes Piano',
      mood: 'Bittersweet, poignant, deep'
    },
    details: [
      { label: 'Date', value: 'March 26, 2026' },
      { label: 'Atmosphere', value: 'Quiet cafe table overlooking the water' },
      { label: 'The Promise', value: 'To stay resilient through every mile of separation' }
    ]
  },

  // 27 — March 27, 2026: Her Birthday
  {
    id: 'birthday',
    level: 27,
    title: 'Her Birthday',
    shortTitle: 'Candles & Wishes',
    date: 'March 27, 2026',
    chapter: 'Chapter VIII: Trials & Distance',
    description: 'March 27, 2026: A warm birthday celebration filled with heartfelt wishes, a small glowing cake, and gratitude for another year of life spent in each other\'s warmth.',
    caption: '“Blowing out birthday candles with the sweetest wish of all: to celebrate every single birthday together for life.”',
    image: '/scean 20.png',
    icon: 'Gift',
    location: 'Celebration Hearth',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Desert of Patience',
    mapLocationName: 'HER BIRTHDAY',
    mapIcon: 'cake',
    timelineTitle: 'Her Birthday',
    coordinates: { x: 69, y: 68 },
    narrativeParagraphs: [
      'March 27, 2026: A warm birthday celebration filled with heartfelt wishes, a small glowing cake, and gratitude for another year of life spent in each other\'s warmth.'
    ],
    handwrittenNote: 'When you blew out the candles, I made a wish too. I think our wishes were the exact same thing.',
    musicTrack: {
      title: 'Birthday Candlelight Waltz',
      artist: 'Solo Music Box & Strings',
      mood: 'Warm, celebratory, intimate'
    },
    details: [
      { label: 'Date', value: 'March 27, 2026' },
      { label: 'Event', value: 'Heartfelt Birthday Celebration' },
      { label: 'The Wish', value: 'To share every tomorrow together' }
    ]
  },

  // 28 — April 1, 2026: When I Was There for Her
  {
    id: 'there-for-her',
    level: 28,
    title: 'When I Was There for Her',
    shortTitle: 'Standing Strong Beside Her',
    date: 'April 1, 2026',
    chapter: 'Chapter VIII: Trials & Distance',
    description: 'April 1, 2026: Being there for her through every emotion and moment of vulnerability. Offering quiet strength, listening with deep empathy, and reassuring her that no matter what storms arise, she will never have to face anything alone.',
    caption: '“Standing by her side through every tear and every trial—a promise of quiet strength and unwavering presence.”',
    image: '/scean 21.png',
    icon: 'Shield',
    location: 'Family Living Room & Sanctuary',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'family',
    categoryLabel: 'Unwavering Support',
    realm: 'The Desert of Patience',
    mapLocationName: 'WHEN I WAS THERE FOR HER',
    mapIcon: 'home',
    timelineTitle: 'When I Was There for Her',
    coordinates: { x: 76, y: 76 },
    narrativeParagraphs: [
      'April 1, 2026: Receiving the quiet blessings, love, and understanding of family.',
      'Discovering that love is made stronger when held up by the pillars of home, tradition, and mutual respect.'
    ],
    handwrittenNote: 'The warmth in the room that day washed away every doubt. Having family beside us is the greatest strength.',
    musicTrack: {
      title: 'Pillars of the Hearth',
      artist: 'Acoustic Guitar & Soft Woodwinds',
      mood: 'Comforting, reassuring, grounded'
    },
    details: [
      { label: 'Date', value: 'April 1, 2026' },
      { label: 'Event', value: 'Family blessings & shared dinner' },
      { label: 'Foundation', value: 'Respect, family harmony, lifelong support' }
    ]
  },

  // 29 — Date not specified: Thirty Three Days
  {
    id: 'thirty-three-days',
    level: 29,
    title: 'Thirty Three Days',
    shortTitle: 'Thirty-Three Golden Days',
    date: 'Date not specified',
    chapter: 'Chapter VIII: Trials & Distance',
    description: 'Thirty-three uninterrupted, domestic days spent living in close companionship. Cooking meals, doing chores side by side, solving daily problems together, and understanding that true love lives in the ordinary, quiet moments.',
    caption: '“Thirty-three continuous days of quiet routines, shared meals, and knowing that everyday life with you is pure paradise.”',
    image: '/scean 22.png',
    icon: 'Home',
    location: 'Shared Sanctuary & Kitchen',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Desert of Patience',
    mapLocationName: 'THIRTY THREE DAYS',
    mapIcon: 'house',
    timelineTitle: 'Thirty Three Days',
    coordinates: { x: 82, y: 64 },
    narrativeParagraphs: [
      'Thirty-three uninterrupted, domestic days spent living in close companionship.',
      'Cooking meals, doing chores side by side, solving daily problems together, and understanding that true love lives in the ordinary, quiet moments.'
    ],
    handwrittenNote: 'Thirty-three days went by in a blink. We learned how to live as one without ever getting tired of each other.',
    musicTrack: {
      title: 'Thirty Three Golden Mornings',
      artist: 'Acoustic Piano & Morning Chimes',
      mood: 'Domestic bliss, peaceful, everlasting'
    },
    details: [
      { label: 'Duration', value: '33 Full Days Together' },
      { label: 'Shared Routines', value: 'Cooking, tea times, grocery runs, evening walks' },
      { label: 'Revelation', value: 'Ordinary days are the most sacred of all' }
    ]
  },

  // 30 — Date not specified: Two Months Apart (Two Months of Distance)
  {
    id: 'two-months-apart',
    level: 30,
    title: 'Two Months Apart',
    shortTitle: 'Silence Across The Screen',
    date: 'Date not specified',
    chapter: 'Chapter VIII: Trials & Distance',
    description: 'Two whole months of silence and physical separation across distance. No words could cross the divide, but the memories built over two years held strong like an anchor in deep waters.',
    caption: '“Two months of silence, sixty days of waiting, and a heart that never stopped believing in our reunion.”',
    image: '/scean 23.png',
    icon: 'Moon',
    location: 'Miles of Longing',
    isUnlocked: true,
    colorAccent: '#7A1838',
    category: 'distance',
    categoryLabel: 'Distance',
    realm: 'The Silent Shores',
    mapLocationName: 'TWO MONTHS APART',
    mapIcon: 'moon-cloud',
    timelineTitle: 'Two Months Apart',
    coordinates: { x: 78, y: 46 },
    narrativeParagraphs: [
      'Two whole months of silence and physical separation across distance.',
      'No words could cross the divide, but the memories built over two years held strong like an anchor in deep waters.'
    ],
    handwrittenNote: 'Sixty days. Every time the phone lit up, my heart jumped. But I kept holding onto our promises.',
    musicTrack: {
      title: 'Sixty Nights of Moonlight',
      artist: 'Solo Cello & Cold Wind Ambient',
      mood: 'Resilient, patient, deep longing'
    },
    details: [
      { label: 'Duration', value: '60 Long Days of Separation' },
      { label: 'The Test', value: 'Patience, loyalty, unwavering commitment' },
      { label: 'Anchor', value: 'Antarvedi vows & the promise of tomorrow' }
    ],
    sadMemory: {
      enabled: true,
      title: 'Two Months of Distance: Sixty Cold Nights',
      shortTitle: 'The Long Winter of Silence',
      date: 'Summer 2026',
      location: 'Miles of Unspoken Longing',
      description: 'Sixty long days where time seemed frozen. Staring at the same cold moon night after night, wondering if the heavy silence would fade our memories or make them unbreakable. Holding onto promises across an ocean of longing.',
      caption: '“Two months of silence, sixty days of waiting, and a heart that never stopped whispering your name into the quiet dark.”',
      image: '/chapter 28 sad image.png',
      mood: 'quiet',
      handwrittenNote: 'Day 43. I listened to our song again under the moonlight. I promised myself I would wait for you no matter how long the winter lasted.'
    }
  },

  // 31 — August 12, 2026: The Day That Hurt
  {
    id: 'the-day-that-hurt',
    level: 31,
    title: 'The Day That Hurt',
    shortTitle: 'A Difficult Afternoon',
    date: 'August 12, 2026',
    chapter: 'Chapter VIII: Trials & Distance',
    description: 'On August 12, 2026, he met Bhairavi\'s mother at college, spoke respectfully and apologized with sincere honesty. Because of the delicate family situation, Bhairavi had to introduce him as a friend. Though it was a difficult and painful moment for both, Bhairavi was never at fault, and their quiet understanding and loyalty carried them through.',
    caption: '“A difficult afternoon where circumstances asked for patience. She had to introduce him as a friend, but our hearts knew the unspoken truth.”',
    image: '/scean 23.png',
    icon: 'Shield',
    location: 'College Campus',
    isUnlocked: true,
    colorAccent: '#A37081',
    category: 'milestones',
    categoryLabel: 'Trials',
    realm: 'The Desert of Patience',
    mapLocationName: 'THE DAY THAT HURT',
    mapIcon: 'moon',
    timelineTitle: 'The Day That Hurt',
    coordinates: { x: 80, y: 38 },
    narrativeParagraphs: [
      'On August 12, 2026, he met Bhairavi\'s mother at college, spoke respectfully and apologized with sincere honesty.',
      'Because of the delicate family situation, Bhairavi had to introduce him as a friend.',
      'Though it was a painful moment for both, Bhairavi was never at fault, and their quiet understanding and loyalty carried them through the storm.'
    ],
    handwrittenNote: 'I saw the pain in your eyes when you had to introduce me as a friend. I never blamed you, not for a single second. I only wanted to protect you.',
    musicTrack: {
      title: 'A Difficult Truth & Quiet Loyalty',
      artist: 'Acoustic Cello & Solitary Piano',
      mood: 'Poignant, resilient, loyal, quiet'
    },
    details: [
      { label: 'Date', value: 'August 12, 2026' },
      { label: 'Location', value: 'College Campus' },
      { label: 'The Meeting', value: 'Spoke respectfully to Bhairavi\'s mother' },
      { label: 'The Circumstance', value: 'Introduced as a friend due to family situation' },
      { label: 'Unspoken Truth', value: 'Bhairavi was never at fault; mutual loyalty prevailed' }
    ],
    sadMemory: {
      enabled: true,
      title: 'The Day That Hurt / A Difficult Truth',
      shortTitle: 'Unspoken Pain at College',
      date: 'August 12, 2026',
      location: 'College Campus Corridor',
      description: 'Facing Bhairavi’s mother with respectful apologies, while having to stand as just a friend. The ache of holding silence when your heart wants to profess everything, knowing that neither of us was at fault, only weathering the storm together.',
      caption: '“The heaviest silence is having to be strangers in front of the world while being each other’s entire universe.”',
      image: '/chapter 29 sad image.png',
      mood: 'melancholic',
      handwrittenNote: 'I saw the pain in your eyes when you introduced me as a friend. I never blamed you, not for a single second. I only wanted to protect you.'
    }
  },

  // 32 — September 15, 2026: Flowers, Bangles & That Day
  {
    id: 'flowers-bangles-and-that-day',
    level: 32,
    title: 'Flowers, Bangles & That Day',
    shortTitle: 'Surprise & Fragrance',
    date: 'September 15, 2026',
    chapter: 'Chapter IX: The Reunion & Beyond',
    description: 'On September 15, 2026, he surprised Bhairavi/Ammu with fresh fragrant flowers and three sets of gorgeous bangles. She was genuinely overjoyed and deeply touched by the heartfelt gifts. They spent the entire day together, working closely side by side during a hackathon, sharing both productivity and unspoken romance.',
    caption: '“A surprise of fresh flowers and three sets of sparkling bangles—her smile outshone everything as we worked side by side.”',
    image: '/flowers bangles and that day.png',
    icon: 'Gift',
    location: 'Hackathon Hall & Campus Bench',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'milestones',
    categoryLabel: 'Gifts',
    realm: 'The Endless Horizon',
    mapLocationName: 'FLOWERS & BANGLES',
    mapIcon: 'gift',
    timelineTitle: 'Flowers, Bangles & That Day',
    coordinates: { x: 83, y: 30 },
    narrativeParagraphs: [
      'On September 15, 2026, he surprised Bhairavi/Ammu with fresh fragrant flowers and three sets of gorgeous bangles.',
      'She was genuinely overjoyed and deeply touched by the heartfelt gifts. They spent the entire day together, working closely side by side during a hackathon.',
      'The fragrance of flowers mingled with code and shared smiles in one of the most unforgettable days of September.'
    ],
    handwrittenNote: 'You opened the box and your eyes went wide. Three sets of bangles and fresh blooms—you deserved all the flowers in the world.',
    musicTrack: {
      title: 'Fragrance & Glass Chimes',
      artist: 'Acoustic Guitar & Gentle Strings',
      mood: 'Joyful, romantic, glowing warmth'
    },
    details: [
      { label: 'Date', value: 'September 15, 2026' },
      { label: 'The Surprise', value: 'Fresh floral bouquet & three sets of bangles' },
      { label: 'Her Reaction', value: 'Genuinely surprised, overjoyed, and touched' },
      { label: 'The Day', value: 'Full day spent together working during a hackathon' }
    ],
    artifacts: [
      {
        title: 'Three Sets of Bangles',
        description: 'Gifted alongside fresh flowers on September 15, 2026.',
        type: 'keepsake'
      }
    ]
  },

  // 33 — September 19, 2026: The Reunion
  {
    id: 'september-19-2026',
    level: 33,
    title: 'The Reunion',
    shortTitle: 'Finding Each Other Again',
    date: 'September 19, 2026',
    chapter: 'Chapter IX: The Reunion & Beyond',
    description: 'September 19, 2026: The bridge across distance is crossed at last. Meeting again after months of longing—the rush of relief, the familiar laugh, and holding hands knowing that the bond survived every test of time and space.',
    caption: '“After months of distance and silent waiting, stepping back into each other\'s presence felt like coming home.”',
    image: '/scean 24.png',
    icon: 'Sparkles',
    location: 'The Arrival Platform',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'reunion',
    categoryLabel: 'Reunion',
    realm: 'The Endless Horizon',
    mapLocationName: 'THE REUNION',
    mapIcon: 'sunrise',
    timelineTitle: 'The Reunion',
    coordinates: { x: 88, y: 20 },
    narrativeParagraphs: [
      'September 19, 2026: The bridge across distance is crossed at last.',
      'Meeting again after months of longing—the rush of relief, the familiar laugh, and holding hands knowing that the bond survived every test of time and space.'
    ],
    handwrittenNote: 'When you ran toward me, the entire universe snapped back into focus. We made it.',
    musicTrack: {
      title: 'The Great Golden Dawn',
      artist: 'Full String Symphony & Piano Crescendo',
      mood: 'Ecstatic, cathartic, deeply triumphant'
    },
    details: [
      { label: 'Date', value: 'September 19, 2026' },
      { label: 'The Moment', value: 'The Great Reunion after two months' },
      { label: 'The Feeling', value: 'Coming home to where you belong' }
    ]
  },

  // 34 — September 28, 2026: The Gifts That Came From the Heart
  {
    id: 'the-gifts-for-our-story',
    level: 34,
    title: 'The Gifts That Came From the Heart',
    shortTitle: 'Treasures Made with Love',
    date: 'September 28, 2026',
    chapter: 'Chapter IX: The Reunion & Beyond',
    description: 'Prepared with tender care for September 28, 2026: gifts from the depths of the heart—a pair of elegant earrings, a lovingly handmade flower bouquet, handwritten memory letters, custom drawings based on their moments, and this very interactive digital journal, OUR STORY. Bhairavi is extremely happy, knowing how much love, effort, and care went into every single detail.',
    caption: '“Earrings, a handmade flower bouquet, memory letters, drawings, and our website—gifts that carry every beat of my heart.”',
    image: '/the gifts of our story.png',
    icon: 'Gift',
    location: 'The Sanctuary of Tomorrow',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'milestones',
    categoryLabel: 'Gifts',
    realm: 'The Endless Horizon',
    mapLocationName: 'THE GIFTS THAT CAME FROM THE HEART',
    mapIcon: 'gift',
    timelineTitle: 'The Gifts That Came From the Heart',
    coordinates: { x: 91, y: 42 },
    narrativeParagraphs: [
      'Prepared with tender care for September 28, 2026: gifts created from the depths of love.',
      'A pair of elegant earrings, a lovingly handmade flower bouquet, handwritten memory letters, drawings inspired by our moments, and this very interactive digital journal—OUR STORY.',
      'Bhairavi was overwhelmed with radiant happiness because the effort and cherished memories meant everything to her.'
    ],
    handwrittenNote: 'Every petal in the bouquet, every drawing, every letter, and every line of code in this website was made for you. Your happiness is my greatest reward.',
    musicTrack: {
      title: 'Treasures from the Heart',
      artist: 'Acoustic Harp & Celesta',
      mood: 'Anticipatory, tender, deeply devoted'
    },
    details: [
      { label: 'Date', value: 'September 28, 2026' },
      { label: 'Gift 01', value: 'Pair of elegant earrings' },
      { label: 'Gift 02', value: 'Handmade flower bouquet' },
      { label: 'Gift 03', value: 'Handwritten memory letters & drawings' },
      { label: 'Gift 04', value: 'The OUR STORY interactive website' }
    ],
    artifacts: [
      {
        title: 'The Heartfelt Gifts',
        description: 'Earrings, handmade bouquet, letters, drawings, and the digital story journal.',
        type: 'keepsake'
      }
    ]
  },

  // 35 — Final Chapter: Our Story
  {
    id: 'our-story',
    level: 35,
    title: 'Our Story',
    shortTitle: 'A Map of Moments',
    date: 'September 2026',
    chapter: 'Chapter X: Our Story',
    description: '35 moments. Countless little memories. One story. From that accidental glance in the lecture hall on September 9, 2024, to paper shivlings, glass bangles, temple vows, hackathons, motorcycle rides, long separations, and joyful reunions. THIS IS OUR STORY. THE MAP CONTINUES…',
    caption: '“35 moments. Countless little memories. One story.”',
    image: '/scean 25.png',
    icon: 'Crown',
    location: 'The Entire Tapestry of Us',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'reunion',
    categoryLabel: 'The Masterpiece',
    realm: 'The Endless Horizon',
    mapLocationName: 'OUR STORY',
    mapIcon: 'heart-star',
    timelineTitle: 'Our Story',
    coordinates: { x: 95, y: 62 },
    narrativeParagraphs: [
      '35 moments. Countless little memories. One story.',
      'From that accidental glance in the lecture hall on September 9, 2024, to paper shivlings, glass bangles, temple vows, hackathons, motorcycle rides, long separations, and joyful reunions.',
      'THIS IS OUR STORY. THE MAP CONTINUES…'
    ],
    handwrittenNote: 'To Bhairavi—my best friend, my soulmate, my forever home: here is our story, written in gold. The map continues…',
    musicTrack: {
      title: 'Our Story Forever',
      artist: 'Full Cinematic Orchestra & Harp',
      mood: 'Epic, transcendent, eternal devotion'
    },
    details: [
      { label: 'Anniversary Milestone', value: '2 Full Years (September 2024 — 2026)' },
      { label: 'Total Memories', value: '35 Masterpiece Chapters' },
      { label: 'Next Destination', value: 'A Lifetime Together' }
    ],
    artifacts: [
      {
        title: 'The Masterpiece Collage',
        description: 'Framing all 35 moments into one eternal memory.',
        type: 'photo'
      }
    ]
  }
];

export const TIMELINE_STATS = {
  totalDays: 730,
  chaptersCount: 35,
  citiesVisited: 9,
  startDate: 'September 2024',
  currentDate: 'September 2026',
  distanceOvercome: '1,840 Miles',
};

export interface VaultSecret {
  id: string;
  category: string;
  title: string;
  date: string;
  unlockedContent: {
    letter: string;
    signature: string;
    hiddenVow: string;
  };
}

export const VAULT_SECRETS: VaultSecret[] = [
  {
    id: 'vault-1',
    category: 'Unsent Letters',
    title: 'The Letter Written at 3:00 AM During the Storm',
    date: 'December 11, 2025',
    unlockedContent: {
      letter: `My Dearest Bhairavi,\n\nTonight rain is lashing against the hostel window pane, the hackathon hall has gone dark, and everyone else is asleep. I find myself looking at the small paper slip where you scribbled that silly doodle earlier today.\n\nI never believed in fate or pre-written destinies until that first morning you stepped into the classroom with that quiet, gentle grace. When I am beside you, the noise of the world softens into harmony. If distance ever tries to test us, remember this letter: no amount of miles or time could ever loosen my grip on your hand.`,
      signature: 'Yours across every horizon, Somu',
      hiddenVow: '“I promise that whatever storm comes our way, I will always build a shelter where you feel safe and cherished.”'
    }
  },
  {
    id: 'vault-2',
    category: 'Sacred Promises',
    title: 'Vows Whispered Beside the Antarvedi Waves',
    date: 'January 31, 2026',
    unlockedContent: {
      letter: `To My Heart, Bhairavi,\n\nWhen we stood at Antarvedi where the river quietly surrenders to the ocean, you turned to me with salt spray in your hair and smiled that smile that undoes every doubt in my soul.\n\nUnder that vast sanctified sky, seven steps became thirty-five scenes, and thirty-five scenes will become an unbroken lifetime. I will honor you, protect your dreams, celebrate your triumphs as my own, and hold your hand with the exact same reverence fifty years from now.`,
      signature: 'Forever your sanctuary',
      hiddenVow: '“Seven steps taken beside the temple bells: one for truth, one for courage, one for laughter, one for devotion, one for family, one for peace, and one for forever.”'
    }
  },
  {
    id: 'vault-3',
    category: 'Future Blueprints',
    title: 'Decade Vision: 2026 — 2036',
    date: 'September 19, 2026',
    unlockedContent: {
      letter: `Our Blueprint for the Next Ten Years:\n\n1. A sunlit home with floor-to-ceiling bookshelves and warm teak wood tables.\n2. A balcony filled with jasmine flowers and morning filter coffee poured in two matching brass cups.\n3. Backpacking through the misty hills of Ooty, the lantern festivals of Kyoto, and the autumn leaves of Himachal.\n4. Cooking together on rainy Friday nights, teasing each other over burnt dosas and triumphant desserts.\n5. Building careers with courage, knowing we return each evening to the person who makes the whole world feel like home.`,
      signature: 'Written in gold, sealed for tomorrow',
      hiddenVow: '“No matter where the compass leads our feet, as long as our steps match, every path is our paradise.”'
    }
  }
];
