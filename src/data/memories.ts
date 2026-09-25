export interface MemoryArtifact {
  title: string;
  description: string;
  type: 'ticket' | 'letter' | 'photo' | 'keepsake' | 'audio';
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
  // Extended fields for rich modal & map rendering
  category: 'college' | 'friendship' | 'milestones' | 'journey' | 'commitments' | 'family' | 'distance' | 'reunion';
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
  {
    id: 'first-morning',
    level: 1,
    title: 'First Morning — September 2024',
    shortTitle: 'A Stolen Glance in Class',
    date: 'September 2024',
    chapter: 'Chapter I: College Days',
    description: 'Morning sunlight poured through the wide classroom windows, illuminating the quiet hum of a new semester. As the lecture hall door swung open, she walked in holding her notebooks—calm, studious, wearing glasses and a blue dupatta. Sitting at a front desk, he turned around. That quiet, unintentional first glance was the unwritten prologue to a lifetime.',
    caption: '“I didn\'t know it that morning… but somehow, I had just met someone who would become a huge part of my life.”',
    image: '/scean 1.png',
    icon: 'BookOpen',
    location: 'Engineering College Lecture Hall',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'college',
    categoryLabel: 'College Days',
    realm: 'The Scholarly Spires',
    mapLocationName: 'THE FIRST MORNING',
    mapIcon: 'college',
    timelineTitle: 'The First Morning',
    coordinates: { x: 7, y: 24 },
    narrativeParagraphs: [
      'Morning sunlight poured through the wide classroom windows, illuminating the quiet hum of a new semester.',
      'As the lecture hall door swung open, she walked in holding her notebooks—calm, studious, wearing glasses and a blue dupatta. Sitting at a front desk, he turned around.',
      'That quiet, unintentional first glance was the unwritten prologue to a lifetime.'
    ],
    handwrittenNote: 'The morning clock read 9:15 AM. You were looking at your notes, and I forgot what lecture I was sitting in.',
    musicTrack: {
      title: 'First Autumn Sunlight',
      artist: 'Acoustic Piano & Celesta',
      mood: 'Tender, inquisitive, gentle'
    },
    details: [
      { label: 'Time of Day', value: '9:15 AM Morning Lecture' },
      { label: 'Room', value: 'Block C, Hall 103' },
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
  {
    id: 'the-introduction',
    level: 2,
    title: 'The Introduction',
    shortTitle: 'Corridor Crossroads',
    date: 'September 2024',
    chapter: 'Chapter I: College Days',
    description: 'Walking through the sunlit college corridor between classes, a mutual friend in a green shirt introduced them. A tentative smile, shy hellos, and identity cards swaying with every step. What seemed like a casual two-minute exchange between lectures soon bloomed into hours of shared laughter along those very arches.',
    caption: '“Two strangers walking the same college corridor, unaware that their paths had just merged forever.”',
    image: '/scean 2.png',
    icon: 'Users',
    location: 'Main Academic Corridor C-103',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'college',
    categoryLabel: 'College Days',
    realm: 'The Scholarly Spires',
    mapLocationName: 'THE INTRODUCTION',
    mapIcon: 'conversation',
    timelineTitle: 'The Introduction',
    coordinates: { x: 14, y: 16 },
    narrativeParagraphs: [
      'Walking through the sunlit college corridor between classes, a mutual friend in a green shirt introduced them.',
      'A tentative smile, shy hellos, and identity cards swaying with every step.',
      'What seemed like a casual two-minute exchange between lectures soon bloomed into hours of shared laughter along those very arches.'
    ],
    handwrittenNote: 'You adjusted your glasses and smiled. That was the exact second my heart chose its direction.',
    musicTrack: {
      title: 'Corridor Echoes',
      artist: 'Soft Rhodes & String Quartet',
      mood: 'Lighthearted, sweet, nostalgic'
    },
    details: [
      { label: 'Introduced By', value: 'Mutual College Friend' },
      { label: 'Location', value: 'Outside Room C-103' },
      { label: 'First Words', value: '“Hi, nice to meet you!”' },
      { label: 'Atmosphere', value: 'Sunlit corridor and rustling trees' }
    ]
  },
  {
    id: 'cleaning-day',
    level: 3,
    title: 'Cleaning Day',
    shortTitle: 'A Bottle of Water',
    date: 'October 2024',
    chapter: 'Chapter I: College Days',
    description: 'Under the warm afternoon sun during the campus cleanliness drive, desks were washed and courtyards swept. Amidst the hard work, she was sweeping with protective gloves when he walked over holding out a cold bottle of water with a warm, caring smile. A simple gesture that spoke louder than any words.',
    caption: '“Love isn’t found in grand speeches; it lives in a quiet bottle of water when you’re tired.”',
    image: '/scean 3.png',
    icon: 'HeartHandshake',
    location: 'Campus Courtyard & Grounds',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'college',
    categoryLabel: 'College Days',
    realm: 'The Scholarly Spires',
    mapLocationName: 'CLEANING DAY',
    mapIcon: 'water',
    timelineTitle: 'Cleaning Day',
    coordinates: { x: 21, y: 22 },
    narrativeParagraphs: [
      'Under the warm afternoon sun during the campus cleanliness drive, desks were washed and courtyards swept.',
      'Amidst the hard work, she was sweeping with protective gloves when he walked over holding out a cold bottle of water with a warm, caring smile.',
      'A simple gesture that spoke louder than any words.'
    ],
    handwrittenNote: 'You looked up, wiped your brow, and laughed. We drank from the same bottle under the neem tree.',
    musicTrack: {
      title: 'Water Under the Afternoon Sun',
      artist: 'Fingerstyle Acoustic Guitar',
      mood: 'Warm, caring, humble'
    },
    details: [
      { label: 'Event', value: 'Campus Cleanliness Drive' },
      { label: 'Weather', value: 'Clear October Sun' },
      { label: 'Gesture', value: 'Cold water bottle shared' },
      { label: 'Result', value: 'A bond beyond ordinary friendship' }
    ]
  },
  {
    id: 'first-picture',
    level: 4,
    title: 'First Picture',
    shortTitle: 'The Group Selfie',
    date: 'November 2024',
    chapter: 'Chapter I: College Days',
    description: 'Surrounded by college friends with bright smiles and peace signs, sunlight filtering through the campus canopy. He held his phone out to take the group selfie, but in every captured frame, their eyes carried a distinct warmth. The very first photograph together—tucked safely into memories that would last forever.',
    caption: '“Our first picture among friends—the start of a million frames together.”',
    image: '/scean 4.png',
    icon: 'Camera',
    location: 'Engineering Quad Lawn',
    isUnlocked: true,
    colorAccent: '#7A1838',
    category: 'college',
    categoryLabel: 'College Days',
    realm: 'The Scholarly Spires',
    mapLocationName: 'OUR FIRST PICTURE',
    mapIcon: 'camera',
    timelineTitle: 'Our First Picture',
    coordinates: { x: 18, y: 38 },
    narrativeParagraphs: [
      'Surrounded by college friends with bright smiles and peace signs, sunlight filtering through the campus canopy.',
      'He held his phone out to take the group selfie, but in every captured frame, their eyes carried a distinct warmth.',
      'The very first photograph together—tucked safely into memories that would last forever.'
    ],
    handwrittenNote: 'There were six people in that photo, but whenever I look at it, I only see you smiling beside me.',
    musicTrack: {
      title: 'First Shutter Click',
      artist: 'Upbeat Acoustic & Ukulele',
      mood: 'Playful, vibrant, cherished'
    },
    details: [
      { label: 'Camera Used', value: 'Front-facing phone camera' },
      { label: 'Friends in Frame', value: 'Six close classmates' },
      { label: 'Preservation', value: 'Framed on the digital wall' }
    ],
    artifacts: [
      {
        title: 'Original Campus Selfie',
        description: 'First digital frame captured on the quad grass.',
        type: 'photo'
      }
    ]
  },
  {
    id: 'besties',
    level: 5,
    title: 'Besties',
    shortTitle: 'Inseparable Days',
    date: 'December 2024',
    chapter: 'Chapter II: Deepening Bond',
    description: 'Late-night phone calls that lasted until 2 AM, whispered inside jokes during lectures, sharing desks in the library, and walking side-by-side with heavy backpacks. Everyone on campus knew that wherever one went, the other was never more than a heartbeat away.',
    caption: '“Before we were anything else, we were each other’s favorite human and safe harbor.”',
    image: '/scean 5.png',
    icon: 'Sparkles',
    location: 'Library, Benches & Tree Canopy',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'friendship',
    categoryLabel: 'Deepening Bond',
    realm: 'The Starlit Ridge',
    mapLocationName: 'BESTIES',
    mapIcon: 'heart',
    timelineTitle: 'Besties',
    coordinates: { x: 11, y: 48 },
    narrativeParagraphs: [
      'Late-night phone calls that lasted until 2 AM, whispered inside jokes during lectures, sharing desks in the library, and walking side-by-side with heavy backpacks.',
      'Everyone on campus knew that wherever one went, the other was never more than a heartbeat away.'
    ],
    handwrittenNote: 'We studied together, shared tiffins, and talked for hours until our phone batteries died.',
    musicTrack: {
      title: 'Inseparable Melodies',
      artist: 'Gentle Flute & Marimba',
      mood: 'Joyful, comforting, deep friendship'
    },
    details: [
      { label: 'Longest Call', value: '3 hours, 42 minutes' },
      { label: 'Shared Spot', value: 'Library Corner Desk #4' },
      { label: 'Status', value: 'Best friends & confidants' }
    ]
  },
  {
    id: 'twenty-days-apart',
    level: 6,
    title: 'Twenty Days Apart',
    shortTitle: 'Under the Same Moon',
    date: 'January 2025',
    chapter: 'Chapter II: Deepening Bond',
    description: 'The semester break created a silence neither of them anticipated. Sitting in separate bedrooms miles apart, staring at glowing phone screens while the full moon hung high in the indigo sky. Twenty days felt like an eternity, teaching both of them just how deeply their hearts had intertwined.',
    caption: '“Miles between our windows, but only one moon watching over both our restless hearts.”',
    image: '/scean 6.png',
    icon: 'Moon',
    location: 'Separate Hometown Bedrooms',
    isUnlocked: true,
    colorAccent: '#4B1D5A',
    category: 'distance',
    categoryLabel: 'Distance & Longing',
    realm: 'The Bridge of Longing',
    mapLocationName: 'TWENTY DAYS',
    mapIcon: 'moon',
    timelineTitle: 'Twenty Days Apart',
    coordinates: { x: 15, y: 64 },
    narrativeParagraphs: [
      'The semester break created a silence neither of them anticipated.',
      'Sitting in separate bedrooms miles apart, staring at glowing phone screens while the full moon hung high in the indigo sky.',
      'Twenty days felt like an eternity, teaching both of them just how deeply their hearts had intertwined.'
    ],
    handwrittenNote: 'Every night during the break, I looked at the moon and wondered if you were looking at it too.',
    musicTrack: {
      title: 'Moonlit Distance',
      artist: 'Solo Cello & Rain Texture',
      mood: 'Pensive, longing, devoted'
    },
    details: [
      { label: 'Duration Apart', value: '20 Days of Vacation' },
      { label: 'Night Routine', value: 'Checking for messages at 11 PM' },
      { label: 'Lesson Learned', value: 'Life is empty without each other' }
    ]
  },
  {
    id: 'finding-our-way-back',
    level: 7,
    title: 'Finding Our Way Back',
    shortTitle: 'The Warmth of Return',
    date: 'January 2025',
    chapter: 'Chapter II: Deepening Bond',
    description: 'The college reopened, and that morning in the corridor had an entirely new atmosphere. The quiet apprehension melted into radiant smiles the instant their eyes met again. Walking side by side under the golden sunbeams, every spoken word confirmed that the distance had only made the bond unbreakable.',
    caption: '“Coming back to you felt like exhaling after holding my breath for twenty days.”',
    image: '/scean 7.png',
    icon: 'Sun',
    location: 'College First Floor Gallery',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'friendship',
    categoryLabel: 'Deepening Bond',
    realm: 'The Starlit Ridge',
    mapLocationName: 'FINDING OUR WAY BACK',
    mapIcon: 'bridge',
    timelineTitle: 'Finding Our Way Back',
    coordinates: { x: 23, y: 72 },
    narrativeParagraphs: [
      'The college reopened, and that morning in the corridor had an entirely new atmosphere.',
      'The quiet apprehension melted into radiant smiles the instant their eyes met again.',
      'Walking side by side under the golden sunbeams, every spoken word confirmed that the distance had only made the bond unbreakable.'
    ],
    handwrittenNote: 'You wore that blue dupatta again. The moment you smiled, all the longing turned to gold.',
    musicTrack: {
      title: 'Corridor Reunion',
      artist: 'Acoustic Guitar & Violins',
      mood: 'Radiant, triumphant, heartfelt'
    },
    details: [
      { label: 'First Words on Return', value: '“I missed you so much.”' },
      { label: 'Setting', value: 'Sunny Morning Corridor' },
      { label: 'Realization', value: 'We belong together' }
    ]
  },
  {
    id: 'the-bangles',
    level: 8,
    title: 'The Bangles — January 31, 2025',
    shortTitle: 'January 31, 2025',
    date: 'January 31, 2025',
    chapter: 'Chapter III: Milestones & Treasures',
    description: 'Beside the courtyard pillar marked with the date, he pulled out a small purple box and opened it. Inside were vibrant glass bangles of crimson and gold. Her hands flew to her mouth in pure joy and disbelief. The gentle clinking of those glass bangles became the sweetest song of their college memories.',
    caption: '“A small velvet box, glowing glass bangles, and a smile that lit up my entire universe.”',
    image: '/scean 8.png',
    icon: 'Gift',
    location: 'Courtyard Monument Pillar',
    isUnlocked: true,
    colorAccent: '#7A1838',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Waters of Reflection',
    mapLocationName: 'THE BANGLES',
    mapIcon: 'gift',
    timelineTitle: 'The Bangles',
    coordinates: { x: 30, y: 65 },
    narrativeParagraphs: [
      'Beside the courtyard pillar marked with the date, he pulled out a small purple box and opened it.',
      'Inside were vibrant glass bangles of crimson and gold. Her hands flew to her mouth in pure joy and disbelief.',
      'The gentle clinking of those glass bangles became the sweetest song of their college memories.'
    ],
    handwrittenNote: 'You wore those bangles every single day after that. Their chime was my favorite music.',
    musicTrack: {
      title: 'The Chime of Glass Bangles',
      artist: 'Santoor & Soft Strings',
      mood: 'Romantic, joyful, unforgettable'
    },
    details: [
      { label: 'Milestone Date', value: 'January 31, 2025' },
      { label: 'Gift', value: 'Crimson & Gold Glass Bangles' },
      { label: 'Her Reaction', value: 'Hands over mouth in pure delight' }
    ],
    artifacts: [
      {
        title: 'Bangle Keepsake Box Fragment',
        description: 'Deep plum velvet box embossed with golden floral motifs.',
        type: 'keepsake'
      }
    ]
  },
  {
    id: 'fest-day',
    level: 9,
    title: 'Fest Day',
    shortTitle: 'Lights, Music & Carnival',
    date: 'February 2025',
    chapter: 'Chapter III: Milestones & Treasures',
    description: 'The campus was transformed into a glowing carnival of fairy lights, colorful pennants, street food stalls, and pounding concert bass. Dressed up for the cultural fest, navigating the bustling crowd together, sharing snacks, and taking selfies under the glowing festival arches.',
    caption: '“Amid thousands of carnival lights and festival music, my focus never left you.”',
    image: '/scean 9.png',
    icon: 'Music',
    location: 'Campus Cultural Fest Grounds',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Waters of Reflection',
    mapLocationName: 'FEST DAY',
    mapIcon: 'celebration',
    timelineTitle: 'Fest Day',
    coordinates: { x: 34, y: 48 },
    narrativeParagraphs: [
      'The campus was transformed into a glowing carnival of fairy lights, colorful pennants, street food stalls, and pounding concert bass.',
      'Dressed up for the cultural fest, navigating the bustling crowd together, sharing snacks, and taking selfies under the glowing festival arches.'
    ],
    handwrittenNote: 'Your silver jhumkas danced in the stage lighting. We stayed until the very last song.',
    musicTrack: {
      title: 'Festival Carnival Lights',
      artist: 'Ensemble Strings & Percussion',
      mood: 'Vibrant, celebratory, romantic'
    },
    details: [
      { label: 'Event', value: 'Annual College Cultural Fest' },
      { label: 'Fest Attire', value: 'Black Kurta & Embroidered Anarkali' },
      { label: 'Shared Food', value: 'Chaat & Hot Jalebis' }
    ]
  },
  {
    id: 'october-31-2025',
    level: 10,
    title: 'October 31, 2025',
    shortTitle: 'Twilight Market Stroll',
    date: 'October 31, 2025',
    chapter: 'Chapter III: Milestones & Treasures',
    description: 'An evening walk through the vibrant market streets as dusk turned the sky into a tapestry of tangerine and plum. Street vendors lighting amber bulbs, the scent of evening treats, and hours of conversation where neither wanted to reach the end of the road.',
    caption: '“Sunset painted the streets in gold, but nothing shone brighter than your laughter.”',
    image: '/scean 10.png',
    icon: 'Sunset',
    location: 'Town Bazaar at Twilight',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'milestones',
    categoryLabel: 'Milestones',
    realm: 'The Waters of Reflection',
    mapLocationName: 'OCTOBER 31',
    mapIcon: 'star',
    timelineTitle: 'A Special Day',
    coordinates: { x: 28, y: 34 },
    narrativeParagraphs: [
      'An evening walk through the vibrant market streets as dusk turned the sky into a tapestry of tangerine and plum.',
      'Street vendors lighting amber bulbs, the scent of evening treats, and hours of conversation where neither wanted to reach the end of the road.'
    ],
    handwrittenNote: 'You wore bright magenta that evening. The sunset had nothing on you.',
    musicTrack: {
      title: 'Dusk on Bazaar Lane',
      artist: 'Fender Rhodes & Ambient City Evening',
      mood: 'Warm, enchanting, peaceful'
    },
    details: [
      { label: 'Date', value: 'October 31, 2025' },
      { label: 'Weather', value: 'Cool Autumn Breeze' },
      { label: 'Walk Distance', value: '4 Kilometers without noticing' }
    ]
  },
  {
    id: 'vijayawada-hackathon',
    level: 11,
    title: 'Vijayawada Hackathon — December 10, 2025',
    shortTitle: 'Platform 4 Arrival',
    date: 'December 10, 2025',
    chapter: 'Chapter IV: Journeys & The Hackathon',
    description: 'Stepping onto Platform 4 at Vijayawada Junction with rolling suitcases, laptop bags, and college ID badges. The yellow station sign glowed against a dramatic pink twilight sky. The excitement of their first major trip together for the hackathon had begun.',
    caption: '“Our first big adventure together—wheels rolling on Platform 4 towards Vijayawada.”',
    image: '/scean 11.png',
    icon: 'Train',
    location: 'Vijayawada Junction Platform 4',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'journey',
    categoryLabel: 'Travel & Hackathon',
    realm: 'The Whispering Cliffs',
    mapLocationName: 'VIJAYAWADA',
    mapIcon: 'train',
    timelineTitle: 'Vijayawada Hackathon',
    coordinates: { x: 36, y: 20 },
    narrativeParagraphs: [
      'Stepping onto Platform 4 at Vijayawada Junction with rolling suitcases, laptop bags, and college ID badges.',
      'The yellow station sign glowed against a dramatic pink twilight sky.',
      'The excitement of their first major trip together for the hackathon had begun.'
    ],
    handwrittenNote: 'The train had just pulled in. We looked at each other with our trolley bags and grinned: “We actually made it!”',
    musicTrack: {
      title: 'Arrival on Platform 4',
      artist: 'Acoustic Guitar & Train Whistle Motif',
      mood: 'Adventurous, buoyant, exciting'
    },
    details: [
      { label: 'Destination', value: 'Vijayawada Junction' },
      { label: 'Platform', value: 'Platform 4 at Dusk' },
      { label: 'Mission', value: '3-Day State Hackathon' }
    ],
    artifacts: [
      {
        title: 'Vijayawada Train Ticket',
        description: 'Express train pass marked with departure stamp.',
        type: 'ticket'
      }
    ]
  },
  {
    id: 'three-days-together',
    level: 12,
    title: 'Three Days Together',
    shortTitle: '3 Days · 1 Team · 1 Dream',
    date: 'December 11–13, 2025',
    chapter: 'Chapter IV: Journeys & The Hackathon',
    description: 'Seventy-two hours of shared coding marathons, debugging side-by-side with stickers on laptops, walks by the Krishna River with temple spires in the backdrop, steaming chai on concrete steps, rooftop night cityscapes, and authentic South Indian meals on banana leaves.',
    caption: '“Three days of code, chai, river breezes, and realizing we are the ultimate team.”',
    image: '/scean 12.png',
    icon: 'Laptop',
    location: 'Hackathon Arena & Krishna River Ghats',
    isUnlocked: true,
    colorAccent: '#7A1838',
    category: 'journey',
    categoryLabel: 'Travel & Hackathon',
    realm: 'The Whispering Cliffs',
    mapLocationName: 'THREE DAYS',
    mapIcon: 'calendar',
    timelineTitle: 'Three Days Together',
    coordinates: { x: 44, y: 28 },
    narrativeParagraphs: [
      'Seventy-two hours of shared coding marathons, debugging side-by-side with stickers on laptops.',
      'Walks by the Krishna River with temple spires in the backdrop, steaming chai on concrete steps, rooftop night cityscapes, and authentic South Indian meals on banana leaves.'
    ],
    handwrittenNote: 'You fell asleep on my shoulder for twenty minutes at 4 AM while the code was building.',
    musicTrack: {
      title: 'Midnight Code & River Breeze',
      artist: 'Lo-Fi Piano & Vinyl Rain',
      mood: 'Cozy, focused, unbreakable teamwork'
    },
    details: [
      { label: 'Hackathon Motto', value: '3 Days · 1 Team · 1 Dream' },
      { label: 'Chai Count', value: '18 Cups of cutting chai' },
      { label: 'River Strolls', value: 'Prakasam Barrage at Sunset' }
    ]
  },
  {
    id: 'train-home',
    level: 13,
    title: 'Train Home',
    shortTitle: 'Moonlit Rails',
    date: 'December 14, 2025',
    chapter: 'Chapter IV: Journeys & The Hackathon',
    description: 'Sitting beside the train window as the express car rocked gently on the tracks. Outside, the night sky was stippled with clouds and a radiant moon mirrored across distant river waters. Inside the warm cabin, tired from three days of hackathon triumph, sitting close and speaking in hushed whispers.',
    caption: '“The rhythmic clack of the rails, cold night glass, and peaceful warmth beside you.”',
    image: '/scean 13.png',
    icon: 'Compass',
    location: 'Southbound Express Sleeper Car',
    isUnlocked: true,
    colorAccent: '#4B1D5A',
    category: 'journey',
    categoryLabel: 'Travel & Hackathon',
    realm: 'The Whispering Cliffs',
    mapLocationName: 'TRAIN HOME',
    mapIcon: 'train',
    timelineTitle: 'Train Home',
    coordinates: { x: 42, y: 46 },
    narrativeParagraphs: [
      'Sitting beside the train window as the express car rocked gently on the tracks.',
      'Outside, the night sky was stippled with clouds and a radiant moon mirrored across distant river waters.',
      'Inside the warm cabin, tired from three days of hackathon triumph, sitting close and speaking in hushed whispers.'
    ],
    handwrittenNote: 'The reflection on the glass showed both of us looking out at the river. I wished that train ride would never end.',
    musicTrack: {
      title: 'Moonlit Sleeper Berth',
      artist: 'Ambient Strings & Soft Acoustic Bass',
      mood: 'Intimate, soothing, peaceful'
    },
    details: [
      { label: 'Train', value: 'Secunderabad Express (Berth 33)' },
      { label: 'View', value: 'River Krishna under Moonlight' },
      { label: 'Feeling', value: 'Complete peace and contentment' }
    ]
  },
  {
    id: 'january-5-2026',
    level: 14,
    title: 'January 5, 2026',
    shortTitle: 'Sunset Conversations',
    date: 'January 5, 2026',
    chapter: 'Chapter V: Deeper Commitments',
    description: 'Sitting at the stone table beneath the campus trees as the winter sun set in blazing orange behind the college buildings. With laptops and notebooks pushed aside, they talked about life after graduation, family hopes, and the dreams they would chase side by side.',
    caption: '“The sky caught fire, and our plans for the future became quiet, sacred promises.”',
    image: '/scean 14.png',
    icon: 'Feather',
    location: 'Campus Garden Stone Table',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'commitments',
    categoryLabel: 'Deeper Commitments',
    realm: 'The Warm Hearth',
    mapLocationName: 'JANUARY 5',
    mapIcon: 'promise',
    timelineTitle: 'A New Chapter',
    coordinates: { x: 48, y: 62 },
    narrativeParagraphs: [
      'Sitting at the stone table beneath the campus trees as the winter sun set in blazing orange behind the college buildings.',
      'With laptops and notebooks pushed aside, they talked about life after graduation, family hopes, and the dreams they would chase side by side.'
    ],
    handwrittenNote: 'Banner on the campus read “Learn Build Grow Together”. We looked at each other and said: “Together.”',
    musicTrack: {
      title: 'Golden Sunset Vows',
      artist: 'Solo Cello & Acoustic Arpeggio',
      mood: 'Reflective, mature, devoted'
    },
    details: [
      { label: 'Date', value: 'January 5, 2026' },
      { label: 'Topic', value: 'Careers, Families & Lifelong Future' },
      { label: 'Sunset Hue', value: 'Deep Amber and Gold' }
    ]
  },
  {
    id: 'antarvedi',
    level: 15,
    title: 'Antarvedi — January 31, 2026',
    shortTitle: 'January 31, 2026',
    date: 'January 31, 2026',
    chapter: 'Chapter V: Deeper Commitments',
    description: 'At the ancient coastal temple of Antarvedi where the river meets the ocean. She was breathtaking in a traditional cream and gold saree with jasmine in her hair; he wore a crisp white dhoti with golden borders. Together beneath the towering temple gopuram and golden dhwajasthambham, seeking blessings for their journey.',
    caption: '“Where the sacred river meets the sea, we prayed for our love to flow forever.”',
    image: '/scean 15.png',
    icon: 'Flame',
    location: 'Antarvedi Sri Lakshmi Narasimha Temple',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'commitments',
    categoryLabel: 'Deeper Commitments',
    realm: 'The Warm Hearth',
    mapLocationName: 'ANTARVEDI',
    mapIcon: 'temple',
    timelineTitle: 'Antarvedi',
    coordinates: { x: 55, y: 76 },
    narrativeParagraphs: [
      'At the ancient coastal temple of Antarvedi where the river meets the ocean.',
      'She was breathtaking in a traditional cream and gold saree with jasmine in her hair; he wore a crisp white dhoti with golden borders.',
      'Together beneath the towering temple gopuram and golden dhwajasthambham, seeking blessings for their journey.'
    ],
    handwrittenNote: 'Exactly one year after the bangles. Standing beside you in that saree took my breath away completely.',
    musicTrack: {
      title: 'Antarvedi Sanctum',
      artist: 'Veena, Flute & Temple Bells',
      mood: 'Sacred, transcendent, divine'
    },
    details: [
      { label: 'Sacred Location', value: 'Antarvedi Coastal Temple' },
      { label: 'Significance', value: '1 Year Bangle Anniversary' },
      { label: 'Traditional Attire', value: 'Cream & Gold Silk Saree and Dhoti' }
    ],
    artifacts: [
      {
        title: 'Temple Prasad Knot',
        description: 'Tied with golden sacred thread from Antarvedi.',
        type: 'keepsake'
      }
    ]
  },
  {
    id: 'seven-steps',
    level: 16,
    title: 'Seven Steps',
    shortTitle: 'Sacred Petals',
    date: 'February 2026',
    chapter: 'Chapter V: Deeper Commitments',
    description: 'Deep inside the sanctum pillars draped with marigold and rose garlands, glowing brass oil lamps illuminating the carved stone. Adorned with sacred floral garlands, taking deliberate steps over scattered flower petals, feeling the profound sanctity of a bond made in the presence of divinity.',
    caption: '“Every step on sacred petals was a silent vow to walk every milestone as one.”',
    image: '/scean 16.png',
    icon: 'Heart',
    location: 'Temple Inner Mandapam',
    isUnlocked: true,
    colorAccent: '#7A1838',
    category: 'commitments',
    categoryLabel: 'Deeper Commitments',
    realm: 'The Warm Hearth',
    mapLocationName: 'SEVEN STEPS',
    mapIcon: 'footprints',
    timelineTitle: 'Seven Steps',
    coordinates: { x: 63, y: 70 },
    narrativeParagraphs: [
      'Deep inside the sanctum pillars draped with marigold and rose garlands, glowing brass oil lamps illuminating the carved stone.',
      'Adorned with sacred floral garlands, taking deliberate steps over scattered flower petals, feeling the profound sanctity of a bond made in the presence of divinity.'
    ],
    handwrittenNote: 'We looked down at our feet among the marigolds, then looked up into each other’s eyes. We knew.',
    musicTrack: {
      title: 'The Seven Sacred Steps',
      artist: 'Classical Carnatic Strings & Mridangam',
      mood: 'Solemn, beautiful, eternal'
    },
    details: [
      { label: 'Sanctum', value: 'Inner Mandapam of Carved Pillars' },
      { label: 'Garlands', value: 'Jasmine, Rose & Marigold' },
      { label: 'Vow', value: 'Seven lifetimes together' }
    ]
  },
  {
    id: 'our-chosen-day',
    level: 17,
    title: 'Our Chosen Day — February 16, 2026',
    shortTitle: 'February 16, 2026',
    date: 'February 16, 2026',
    chapter: 'Chapter V: Deeper Commitments',
    description: 'A quiet sunset room with jasmine in her hair and their handwritten journal open: “Not a date from the past... But a date we chose... Because our story matters ♡”. He showed the calendar lockscreen with February 16 circled in red. An anniversary chosen not by accident, but by conscious, deliberate love.',
    caption: '“Not a date from the past, but a date we chose—because our story matters.”',
    image: '/scean 17.png',
    icon: 'Calendar',
    location: 'Study Room at Golden Hour',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'commitments',
    categoryLabel: 'Deeper Commitments',
    realm: 'The Warm Hearth',
    mapLocationName: 'FEBRUARY 16',
    mapIcon: 'calendar-heart',
    timelineTitle: 'Our Chosen Day',
    coordinates: { x: 67, y: 52 },
    narrativeParagraphs: [
      'A quiet sunset room with jasmine in her hair and their handwritten journal open: “Not a date from the past... But a date we chose... Because our story matters ♡”.',
      'He showed the calendar lockscreen with February 16 circled in red.',
      'An anniversary chosen not by accident, but by conscious, deliberate love.'
    ],
    handwrittenNote: 'February 16 is ours forever. We wrote it into our calendars, our notebooks, and our hearts.',
    musicTrack: {
      title: 'Chosen in the Quiet Hour',
      artist: 'Solo Piano & Soft French Horn',
      mood: 'Deeply romantic, tender, steadfast'
    },
    details: [
      { label: 'Chosen Anniversary', value: 'February 16, 2026' },
      { label: 'Inscription', value: '“Because our story matters ♡”' },
      { label: 'Notebook Title', value: 'Future Us · Same Dreams' }
    ],
    artifacts: [
      {
        title: 'Pencil-Sketched Calendar Leaf',
        description: 'February 2026 page with the 16th circled in red ink.',
        type: 'letter'
      }
    ]
  },
  {
    id: 'a-new-chapter',
    level: 18,
    title: 'A New Chapter — February 18, 2026',
    shortTitle: 'February 18, 2026',
    date: 'February 18, 2026',
    chapter: 'Chapter VI: Milestones & Family',
    description: 'On the train journey as morning sunlight kissed the palm trees outside the window, holding a small golden wrapped blessing together with white jasmine flowers. Two pairs of hands cradling a sacred token that marked the commencement of a new life chapter.',
    caption: '“Holding our future gently in our hands as the morning train raced towards tomorrow.”',
    image: '/scean 18.png',
    icon: 'Sparkle',
    location: 'Morning Train Express',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'family',
    categoryLabel: 'Family & Milestones',
    realm: 'The Gateway of Return',
    mapLocationName: 'A NEW CHAPTER',
    mapIcon: 'ribbon',
    timelineTitle: 'A New Chapter',
    coordinates: { x: 61, y: 36 },
    narrativeParagraphs: [
      'On the train journey as morning sunlight kissed the palm trees outside the window, holding a small golden wrapped blessing together with white jasmine flowers.',
      'Two pairs of hands cradling a sacred token that marked the commencement of a new life chapter.'
    ],
    handwrittenNote: 'The gold parcel was tiny, but it felt as heavy as our entire future. We held it together the whole ride.',
    musicTrack: {
      title: 'Sunrise Across the Fields',
      artist: 'Acoustic Guitar & Warm Pad',
      mood: 'Hopeful, serene, bright'
    },
    details: [
      { label: 'Date', value: 'February 18, 2026' },
      { label: 'Keepsake', value: 'Golden wrapped temple blessing' },
      { label: 'Scenery', value: 'Morning paddy fields and rising sun' }
    ]
  },
  {
    id: 'march-26-2026',
    level: 19,
    title: 'March 26, 2026',
    shortTitle: 'The Ridge at Sunset',
    date: 'March 26, 2026',
    chapter: 'Chapter VI: Milestones & Family',
    description: 'Walking along the stone parapet overlooking the river valley and town below as a fiery golden sun dipped beneath the mountains. He looked back with an affectionate smile as she walked beside him with a shy, radiant grace. The eve of a day they would celebrate together.',
    caption: '“Walking into the sunset together, knowing tomorrow would bring our biggest celebration.”',
    image: '/scean 19.png',
    icon: 'Mountain',
    location: 'Hilltop Overlook Road',
    isUnlocked: true,
    colorAccent: '#7A1838',
    category: 'family',
    categoryLabel: 'Family & Milestones',
    realm: 'The Gateway of Return',
    mapLocationName: 'MARCH 26',
    mapIcon: 'sunset',
    timelineTitle: 'A Difficult Evening',
    coordinates: { x: 68, y: 22 },
    narrativeParagraphs: [
      'Walking along the stone parapet overlooking the river valley and town below as a fiery golden sun dipped beneath the mountains.',
      'He looked back with an affectionate smile as she walked beside him with a shy, radiant grace.',
      'The eve of a day they would celebrate together.'
    ],
    handwrittenNote: 'You had a secret smile the whole walk. Neither of us said it out loud, but tomorrow was going to be magic.',
    musicTrack: {
      title: 'Eve on the Ridge',
      artist: 'Orchestral Cello & Soft Flute',
      mood: 'Anticipatory, loving, expansive'
    },
    details: [
      { label: 'Date', value: 'March 26, 2026' },
      { label: 'Setting', value: 'Hilltop stone walkway at dusk' },
      { label: 'View', value: 'River Krishna gleaming below' }
    ]
  },
  {
    id: 'birthday-march-27-2026',
    level: 20,
    title: 'Birthday — March 27, 2026',
    shortTitle: 'March 27, 2026',
    date: 'March 27, 2026',
    chapter: 'Chapter VI: Milestones & Family',
    description: 'The front door opened and he walked in holding a surprise chocolate birthday cake with burning candles. Her eyes widened, covering her mouth in pure joy and astonishment. Standing behind in the dining room, her parents and sister smiled with glowing pride—welcoming him into the heart of the home.',
    caption: '“Candlelight, a sweet chocolate surprise, and the joy of being celebrated by the ones we love.”',
    image: '/scean 20.png',
    icon: 'Cake',
    location: 'Family Dining Room',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'family',
    categoryLabel: 'Family & Milestones',
    realm: 'The Gateway of Return',
    mapLocationName: 'BIRTHDAY',
    mapIcon: 'cake',
    timelineTitle: 'Birthday',
    coordinates: { x: 76, y: 28 },
    narrativeParagraphs: [
      'The front door opened and he walked in holding a surprise chocolate birthday cake with burning candles.',
      'Her eyes widened, covering her mouth in pure joy and astonishment.',
      'Standing behind in the dining room, her parents and sister smiled with glowing pride—welcoming him into the heart of the home.'
    ],
    handwrittenNote: 'The look on your face when I walked in with the candles was the best gift I could ever receive.',
    musicTrack: {
      title: 'Birthday by Candlelight',
      artist: 'Acoustic Guitar, Piano & Family Laughter',
      mood: 'Pure happiness, heartwarming, festive'
    },
    details: [
      { label: 'Milestone', value: 'Her Birthday — March 27, 2026' },
      { label: 'Surprise Cake', value: 'Double Dutch Chocolate with Cherries' },
      { label: 'Company', value: 'Parents, Sister, and Somu' }
    ]
  },
  {
    id: 'april-1-2026',
    level: 21,
    title: 'April 1, 2026',
    shortTitle: 'The Family Circle',
    date: 'April 1, 2026',
    chapter: 'Chapter VI: Milestones & Family',
    description: 'An evening filled with meaningful family conversations: gathered around the dining table discussing future plans, reviewing documents and schedules together, walking the quiet night streets with a flashlight, and laughing openly as the families bonded into one unified circle.',
    caption: '“When families meet in trust and laughter, two separate worlds become one solid foundation.”',
    image: '/scean 21.png',
    icon: 'Home',
    location: 'Family Living Room & Night Walk',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'family',
    categoryLabel: 'Family & Milestones',
    realm: 'The Gateway of Return',
    mapLocationName: 'APRIL 1',
    mapIcon: 'home',
    timelineTitle: 'Being There',
    coordinates: { x: 73, y: 46 },
    narrativeParagraphs: [
      'An evening filled with meaningful family conversations.',
      'Gathered around the dining table discussing future plans, reviewing documents and schedules together, walking the quiet night streets with a flashlight, and laughing openly as the families bonded into one unified circle.'
    ],
    handwrittenNote: 'Dad patted my shoulder on the night walk. Hearing him tell stories felt like being officially welcomed home.',
    musicTrack: {
      title: 'Hearthside Wisdom',
      artist: 'Mandolin, Guitar & Gentle Whistle',
      mood: 'Warm, reassuring, grounded'
    },
    details: [
      { label: 'Date', value: 'April 1, 2026' },
      { label: 'Significance', value: 'Family discussions and blessing' },
      { label: 'Evening Walk', value: 'Starlit lane with flashlight' }
    ]
  },
  {
    id: 'thirty-three-days',
    level: 22,
    title: 'Thirty Three Days',
    shortTitle: 'The Golden Month',
    date: 'April 2026',
    chapter: 'Chapter VII: Trials & Distance',
    description: 'Thirty-three days of pure bliss: sharing South Indian meals on banana leaves, doing dishes together side by side, traveling on trains, visiting ancient temples with parents and siblings, rooftop sunsets in Vijayawada, and creating memories in every corner of their shared world.',
    caption: '“Thirty-three days where every second felt timeless, sacred, and infinitely precious.”',
    image: '/scean 22.png',
    icon: 'Clock',
    location: 'Home, Temples & Railway Trails',
    isUnlocked: true,
    colorAccent: '#D8B46A',
    category: 'family',
    categoryLabel: 'Family & Milestones',
    realm: 'The Gateway of Return',
    mapLocationName: 'THIRTY THREE DAYS',
    mapIcon: 'house',
    timelineTitle: 'Thirty Three Days',
    coordinates: { x: 78, y: 64 },
    narrativeParagraphs: [
      'Thirty-three days of pure bliss.',
      'Sharing South Indian meals on banana leaves, doing dishes together side by side, traveling on trains, visiting ancient temples with parents and siblings, rooftop sunsets in Vijayawada, and creating memories in every corner of their shared world.'
    ],
    handwrittenNote: 'Thirty-three days went by in what felt like one single heartbeat. We lived a lifetime in that month.',
    musicTrack: {
      title: 'Thirty-Three Golden Sunrises',
      artist: 'Full Chamber Strings & Acoustic Guitar',
      mood: 'Nostalgic, joyful, deeply touching'
    },
    details: [
      { label: 'Total Duration', value: '33 Days of Continuous Togetherness' },
      { label: 'Memories Made', value: 'Cooking, temples, trains, family dinners' },
      { label: 'Bond Level', value: 'Inseparable for life' }
    ]
  },
  {
    id: 'two-months-apart',
    level: 23,
    title: 'Two Months Apart',
    shortTitle: 'Keepsakes Across Miles',
    date: 'May–July 2026',
    chapter: 'Chapter VII: Trials & Distance',
    description: 'Sixty long days separated by physical distance. In his room at twilight, he scrolled through pictures on his phone surrounded by train tickets and memories. In her room, she turned the pages of their photo album with tear-brimmed eyes, reading the note: “Some memories never fade... Even when we are apart.”',
    caption: '“Some memories never fade... Even when we are apart, our hearts beat in the exact same rhythm.”',
    image: '/scean 23.png',
    icon: 'Mail',
    location: 'Two Distant Desks at Twilight',
    isUnlocked: true,
    colorAccent: '#4B1D5A',
    category: 'distance',
    categoryLabel: 'Distance & Longing',
    realm: 'The Bridge of Longing',
    mapLocationName: 'TWO MONTHS APART',
    mapIcon: 'moon-cloud',
    timelineTitle: 'Two Months Apart',
    coordinates: { x: 86, y: 72 },
    narrativeParagraphs: [
      'Sixty long days separated by physical distance.',
      'In his room at twilight, he scrolled through pictures on his phone surrounded by train tickets and memories.',
      'In her room, she turned the pages of their photo album with tear-brimmed eyes, reading the note: “Some memories never fade... Even when we are apart.”'
    ],
    handwrittenNote: 'I laid out every train ticket, every ID badge, and every Polaroid on my bed. Distance couldn’t touch what we built.',
    musicTrack: {
      title: 'Tickets on the Bedspread',
      artist: 'Solo Cello & Distant Piano',
      mood: 'Longing, resilient, deeply moving'
    },
    details: [
      { label: 'Time Apart', value: '60 Days' },
      { label: 'Album Inscription', value: '“Some memories never fade...”' },
      { label: 'Tickets Preserved', value: 'Vijayawada, Visakhapatnam, Eluru' }
    ],
    artifacts: [
      {
        title: 'Preserved Indian Railways Tickets',
        description: 'Vijayawada to Visakhapatnam stubs kept in desk drawer.',
        type: 'ticket'
      }
    ]
  },
  {
    id: 'september-19-2026',
    level: 24,
    title: 'September 19, 2026',
    shortTitle: 'The Twilight Reunion',
    date: 'September 19, 2026',
    chapter: 'Chapter VIII: Reunion & The Forever Horizon',
    description: 'Standing together once again on the hilltop stone pavilion as sunset set the river valley ablaze. Distance had ended. Laughing together along the ancient stone pathway, watching the city lights flicker to life below, holding each other close under the twilight sky.',
    caption: '“The sweetest reunion—standing above the city lights, knowing we will never part again.”',
    image: '/scean 24.png',
    icon: 'ShieldCheck',
    location: 'Hilltop Pavilion Overlook',
    isUnlocked: true,
    colorAccent: '#E89AAF',
    category: 'reunion',
    categoryLabel: 'The Reunion',
    realm: 'The Endless Horizon',
    mapLocationName: 'SEPTEMBER 19',
    mapIcon: 'sunrise',
    timelineTitle: 'Finding Each Other Again',
    coordinates: { x: 89, y: 48 },
    narrativeParagraphs: [
      'Standing together once again on the hilltop stone pavilion as sunset set the river valley ablaze.',
      'Distance had ended.',
      'Laughing together along the ancient stone pathway, watching the city lights flicker to life below, holding each other close under the twilight sky.'
    ],
    handwrittenNote: 'September 19. When you walked up the stone stairs and looked at me, two months of distance vanished into the wind.',
    musicTrack: {
      title: 'Reunion at Sunset Pavilion',
      artist: 'Orchestral Strings & French Horn',
      mood: 'Triumphant, overwhelming joy, reunited'
    },
    details: [
      { label: 'Date', value: 'September 19, 2026' },
      { label: 'Location', value: 'Hilltop Stone Pavilion' },
      { label: 'Days Apart Ended', value: 'Zero days left — together for good' }
    ]
  },
  {
    id: 'our-story',
    level: 25,
    title: 'Our Story',
    shortTitle: 'A Map of Moments',
    date: 'September 2026',
    chapter: 'Chapter VIII: Reunion & The Forever Horizon',
    description: 'The grand masterwork holding two years of life: from that accidental glance in the lecture hall, cleaning days, group selfies, glass bangles, night festivals, Vijayawada hackathons, train journeys under the moon, Antarvedi temple vows, birthday cakes, family dinners, miles of longing, to standing united today. Our story has only just begun.',
    caption: '“A map of the moments that became our story. Two years written in gold, and forever to go.”',
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
    coordinates: { x: 94, y: 28 },
    narrativeParagraphs: [
      'The grand masterwork holding two years of life: from that accidental glance in the lecture hall, cleaning days, group selfies, glass bangles, night festivals, Vijayawada hackathons, train journeys under the moon, Antarvedi temple vows, birthday cakes, family dinners, miles of longing, to standing united today.',
      'Our story has only just begun.'
    ],
    handwrittenNote: 'To my best friend, my soulmate, my forever home: here is our story, written in gold.',
    musicTrack: {
      title: 'Our Story Forever',
      artist: 'Full Cinematic Orchestra & Harp',
      mood: 'Epic, transcendent, eternal devotion'
    },
    details: [
      { label: 'Anniversary Milestone', value: '2 Full Years (September 2024 — 2026)' },
      { label: 'Total Memories', value: '25 Masterpiece Chapters' },
      { label: 'Next Destination', value: 'A Lifetime Together' }
    ],
    artifacts: [
      {
        title: 'The Masterpiece Collage',
        description: 'Framing all 25 moments into one eternal memory.',
        type: 'photo'
      }
    ]
  }
];

export const TIMELINE_STATS = {
  totalDays: 730,
  chaptersCount: 25,
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
      letter: `My Dearest,\n\nTonight rain is lashing against the hostel window pane, the hackathon hall has gone dark, and everyone else is asleep. I find myself looking at the small paper slip where you scribbled that silly doodle earlier today.\n\nI never believed in fate or pre-written destinies until that first morning you stepped into the lecture hall with that quiet, gentle grace. When I am beside you, the noise of the world softens into harmony. If distance ever tries to test us, remember this letter: no amount of miles or time could ever loosen my grip on your hand.`,
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
      letter: `To My Heart,\n\nWhen we stood at Antarvedi where the river quietly surrenders to the ocean, you turned to me with salt spray in your hair and smiled that smile that undoes every doubt in my soul.\n\nUnder that vast sanctified sky, seven steps became twenty-five scenes, and twenty-five scenes will become an unbroken lifetime. I will honor you, protect your dreams, celebrate your triumphs as my own, and hold your hand with the exact same reverence fifty years from now.`,
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

