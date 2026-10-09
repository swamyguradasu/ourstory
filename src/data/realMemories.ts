// Real Memories Data for OUR STORY
// Every single file in the 'memories/' folder is cataloged here.

export interface GalleryMediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  filename: string;
  title: string;
  groupKey: string;
  caption?: string;
  poster?: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface MemoryCategorySection {
  id: string;
  categoryNumber: number;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  isClosingChapter?: boolean;
  accentIcon?: string;
  items: GalleryMediaItem[];
}

const buildItem = (
  filename: string,
  title: string,
  groupKey: string,
  caption?: string,
  poster?: string
): GalleryMediaItem => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const isVideo = ['mp4', 'webm', 'mov'].includes(ext);
  return {
    id: filename.replace(/[^a-zA-Z0-9_-]/g, '_'),
    url: `/memories/${encodeURIComponent(filename)}`,
    type: isVideo ? 'video' : 'image',
    filename,
    title,
    groupKey,
    caption,
    poster: poster ? `/memories/${encodeURIComponent(poster)}` : undefined,
  };
};

export const GALLERY_CATEGORIES: MemoryCategorySection[] = [
  // 1. Our Beginning
  {
    id: 'our-beginning',
    categoryNumber: 1,
    title: 'Our Beginning',
    subtitle: 'Where Two Lives First Intertwined',
    description:
      'The morning sunlight in the classroom, the nervous first smiles across the hallway, and the unforgettable afternoon of our first official date.',
    themeColor: '#D8B46A',
    accentIcon: 'Sparkles',
    items: [
      buildItem('firstpic(1).jpg', 'Our First Picture', 'firstpic', 'The very first captured photograph of us in college.'),
      buildItem('firstselfie(1).jpg', 'Our First Selfie', 'firstselfie', 'Standing side-by-side with shy, happy smiles.'),
      buildItem('firstselfie(2).jpg', 'Our First Selfie (Close-up)', 'firstselfie', 'Leaning in closer, hearts beating as one.'),
      buildItem('firstdate.jpg', 'Our First Date', 'firstdate', 'The afternoon time stood still for just the two of us.'),
    ],
  },

  // 2. Little Gifts & Devotion
  {
    id: 'little-gifts',
    categoryNumber: 2,
    title: 'Little Gifts & Devotion',
    subtitle: 'Tokens of Sincere Affection & Sacred Words',
    description:
      'The vibrant red and gold bangles chosen with trembling hands, and handwritten letters carrying promises that will outlast time.',
    themeColor: '#E89AAF',
    accentIcon: 'Heart',
    items: [
      buildItem('firstbangles(1).jpg', 'The First Bangles (Gift)', 'firstbangles', 'Traditional bangles held gently in hand.'),
      buildItem('firstbangles(2).jpg', 'The First Bangles (Colors of Love)', 'firstbangles', 'Shining with colors of warmth and celebration.'),
      buildItem('loveletter 2.png', 'Handwritten Letter & Drawings', 'loveletter', 'Drawn hearts and promises written from the soul.'),
      buildItem('loveletter(1).jpg', 'A Tender Handwritten Note', 'loveletter', 'Kept safe like a sacred treasure forever.'),
    ],
  },

  // 3. College Days & Celebrations
  {
    id: 'college-days',
    categoryNumber: 3,
    title: 'College Days & Celebrations',
    subtitle: 'Festive Lights, Laughter & Freshers Grandeur',
    description:
      'Festival stages lit under night skies, stolen lunches across canteen tables, and the vibrant grandeur of Freshers Day celebrations.',
    themeColor: '#D8B46A',
    accentIcon: 'Camera',
    items: [
      buildItem('festevent.jpg', 'College Fest (Stage View)', 'festevent', 'The electric atmosphere of college fest.'),
      buildItem('festevent (1).jpg', 'Festive Lights & Stages', 'festevent', 'Stage lights illuminating the grounds.'),
      buildItem('festevent (2).jpg', 'Music & Laughter', 'festevent', 'Standing by the stage as music echoed.'),
      buildItem('festevent (3).jpg', 'Stolen Conversations', 'festevent', 'Quiet words shared amidst the lively crowd.'),
      buildItem('festevent (4).jpg', 'Night Walks on Campus', 'festevent', 'Walking across the campus under fairy lights.'),
      buildItem('festevent (5).jpg', 'Festival Smiles', 'festevent', 'Bright smiles against the evening stage glow.'),
      buildItem('festevent (6).jpg', 'Fest Memories Frame', 'festevent', 'A timeless picture of college fest magic.'),
      buildItem('foodcourt(1).jpg', 'Food Court Lunch Date', 'foodcourt', 'Sharing simple snacks between busy lectures.'),
      buildItem('freshers.jpg', 'Freshers Day (Traditional Attire)', 'freshers', 'Dressed in our best for Freshers celebrations.'),
      buildItem('freshers.mp4', 'Freshers Day Celebration Clip', 'freshers', 'Video snippet of laughter and music.', 'freshers.jpg'),
      buildItem('freshers.png', 'Freshers Auditorium Memory', 'freshers', 'Auditorium celebrations and joyful moments.'),
      buildItem('freshers (1).jpg', 'Campus Corridor Radiance', 'freshers', 'Smiling brightly in traditional outfits.'),
      buildItem('freshers (2).jpg', 'Festive Elegance', 'freshers', 'Traditional finery under the afternoon sun.'),
      buildItem('freshers (4).jpg', 'Celebratory Couple Frame', 'freshers', 'Posing happily together on Freshers Day.'),
      buildItem('freshers (5).jpg', 'Courtyard Laughter', 'freshers', 'Sunny smiles across the courtyard.'),
      buildItem('freshers (6).jpg', 'Standing Together in Joy', 'freshers', 'Joyful celebration with our classmates.'),
      buildItem('freshers (7).jpg', 'Candid Moments Between Events', 'freshers', 'Stolen glances between stage performances.'),
      buildItem('freshers (8).jpg', 'Golden Light on Festive Wear', 'freshers', 'Sunlight reflecting off vibrant colors.'),
      buildItem('freshers (9).jpg', 'Friendship & Happiness', 'freshers', 'Unforgettable memories with dear friends.'),
      buildItem('freshers (10).jpg', 'Backstage Excitement', 'freshers', 'Auditorium backstage moments.'),
      buildItem('freshers (11).jpg', 'Traditional Grace', 'freshers', 'Pure elegance and gentle smiles.'),
      buildItem('freshers (12).jpg', 'Courtyard Pathways', 'freshers', 'Walking together through the college garden.'),
      buildItem('freshers (13).jpg', 'Freshers Stroll', 'freshers', 'Enjoying every second of the festive day.'),
      buildItem('freshers (15).jpg', 'Cherished Group Photos', 'freshers', 'Surrounded by laughter and celebration.'),
      buildItem('freshers (17).jpg', 'Poised & Radiant', 'freshers', 'Graceful elegance under the campus trees.'),
      buildItem('freshers (19).jpg', 'High Spirits', 'freshers', 'Celebratory energy echoing across college.'),
      buildItem('freshers (24).jpg', 'Bright Smiles', 'freshers', 'Laughter that made the afternoon glow.'),
      buildItem('freshers (25).jpg', 'College Garden Backdrop', 'freshers', 'Posing beside blooming flowers.'),
      buildItem('freshers (26).jpg', 'Youth & Romance', 'freshers', 'A timeless frame of our youthful love.'),
      buildItem('freshers (29).jpg', 'Vibrant Traditional Colors', 'freshers', 'Rich silks and radiant festive smiles.'),
      buildItem('freshers (30).jpg', 'Unfiltered Happiness', 'freshers', 'Pure joy captured in an instant.'),
      buildItem('freshers (31).jpg', 'A Memory Never Forgotten', 'freshers', 'Treasured moments from Freshers Day.'),
      buildItem('freshers (35).jpg', 'Auditorium Lights', 'freshers', 'Celebration under the auditorium spotlights.'),
      buildItem('freshers (36).jpg', 'Close-up Beauty', 'freshers', 'Sweet, gentle smiles caught on camera.'),
      buildItem('freshers (37).jpg', 'Quiet Warmth', 'freshers', 'A peaceful pause amidst the festive crowd.'),
      buildItem('freshers (38).jpg', 'Pathway Memories', 'freshers', 'Walking hand in hand through the campus path.'),
      buildItem('freshers (39).jpg', 'A Day Full of Color', 'freshers', 'The vibrant spirit of our college journey.'),
      buildItem('freshers (40).jpg', 'Precious Keepsake', 'freshers', 'A photograph to cherish for a lifetime.'),
      buildItem('freshers (41).jpg', 'Love & Companionship', 'freshers', 'In the middle of the crowd, eyes only for you.'),
      buildItem('freshers (42).jpg', 'Timeless Snapshots', 'freshers', 'Looking back on our happiest days.'),
      buildItem('freshers (43).jpg', 'The Grand Freshers Finale', 'freshers', 'The closing celebrations of Freshers Day.'),
    ],
  },

  // 4. Birthday Celebrations
  {
    id: 'birthday-celebrations',
    categoryNumber: 4,
    title: 'Her Birthday Surprise',
    subtitle: 'Celebrating the Light of My Entire Life',
    description:
      'Birthday surprises, sweet cakes, shared laughter, and live video recordings capturing the pure joy of celebrating the most special day of the year.',
    themeColor: '#E89AAF',
    accentIcon: 'Sparkles',
    items: [
      buildItem('mybirthday (1).jpg', 'Birthday Smiles & Cake', 'birthday', 'Cutting the birthday cake with radiant smiles.'),
      buildItem('mybirthday (2).jpg', 'Birthday Decorations & Joy', 'birthday', 'Sweet surprise decorations and celebration.'),
      buildItem('mybirthday (3).jpg', 'A Tender Birthday Frame', 'birthday', 'A gentle birthday memory kept forever.'),
      buildItem('birthday(1).mp4', 'Birthday Surprise Video Reel 1', 'birthday', 'Surprise reaction and laughter video.', 'mybirthday (1).jpg'),
      buildItem('birthday(2).mp4', 'Birthday Surprise Video Reel 2', 'birthday', 'Cutting cake and celebrating together.', 'mybirthday (2).jpg'),
      buildItem('birthdaypic.mp4', 'Birthday Video Wishes Clip', 'birthday', 'Birthday moments preserved in live motion.', 'mybirthday (3).jpg'),
      buildItem('mybirthday (1).mp4', 'Birthday Video Celebration Film', 'birthday', 'Personal birthday celebration reel.', 'mybirthday (1).jpg'),
    ],
  },

  // 5. Little Videos Made With Love
  {
    id: 'creative-videos',
    categoryNumber: 5,
    title: 'Little Videos Made With Love',
    subtitle: 'Our Story Preserved in Living Motion',
    description:
      'Handcrafted cinematic video compilations stitched with music, replaying the rhythm of our most tender smiles and walks.',
    themeColor: '#E89AAF',
    accentIcon: 'Film',
    items: [
      buildItem('editvideo(1).mp4', 'Little Video Edit — Volume I', 'editvideo', 'Our sweetest smiles and laughter set to melody.'),
      buildItem('editvideo(2).mp4', 'Little Video Edit — Volume II', 'editvideo', 'Walking together through sunlit pathways.'),
      buildItem('editvideo(3).mp4', 'Little Video Edit — Volume III', 'editvideo', 'The living poetry of our journey in motion.'),
    ],
  },

  // 6. Everyday Magic & Spontaneous Journeys
  {
    id: 'everyday-magic',
    categoryNumber: 6,
    title: 'Everyday Magic & Spontaneous Journeys',
    subtitle: 'A Hundred Unplanned Drives, Teas & Temple Roads',
    description:
      'Sacred blessings at Kanaka Durga Temple in Vijayawada, unplanned car drives, casual strolls, and 88 candid photographs and video clips.',
    themeColor: '#D8B46A',
    accentIcon: 'Compass',
    items: [
      // Vijayawada
      buildItem('vijayawada(3).jpg', 'Krishna River & City Skyline', 'vijayawada', 'Scenic view of the river during our journey.'),
      buildItem('vijayawada(4).jpg', 'Crossing the Vijayawada Bridge', 'vijayawada', 'Road trip views entering Vijayawada.'),
      buildItem('vijayawada(5).jpg', 'Temple Hilltop Pathways', 'vijayawada', 'Sacred paths climbing up to the shrine.'),
      buildItem('vijayawada(6).jpg', 'Temple Steps of Devotion', 'vijayawada', 'Walking along the temple steps with reverence.'),
      buildItem('vijayawada(7).jpg', 'Sunset Over the River', 'vijayawada', 'Golden sunset skies reflecting in the water.'),
      buildItem('vijayawada(8).jpg', 'Road Trip Memories', 'vijayawada', 'Peaceful highway views on our journey.'),
      buildItem('vijayawadah (1).jpg', 'Temple Architectural Grace', 'vijayawada', 'Ornate temple architecture under blue skies.'),
      buildItem('vijayawadah (2).jpg', 'Indrakeeladri Hill Breeze', 'vijayawada', 'The serene sacred breeze atop the hill.'),
      buildItem('vijayawadah (3).jpg', 'Spiritual Tranquility', 'vijayawada', 'Offering quiet prayers for our bond.'),
      buildItem('vijayawadah (4).jpg', 'Golden Light Over the City', 'vijayawada', 'Watching the city bathed in golden hour.'),
      buildItem('vijayawadah (5).jpg', 'A Journey of Faith & Love', 'vijayawada', 'Divine blessings on our shared road.'),
      // Random dates & videos
      buildItem('randomdate.jpg', 'Spontaneous Afternoon Tea', 'randomdate', 'A cozy table for two at our favorite cafe.'),
      buildItem('randomdate (1).mp4', 'Spontaneous Video Clip 1', 'randomdate', 'Mini video clip of a candid laugh.', 'randomdate.jpg'),
      buildItem('randomdate (2).mp4', 'Spontaneous Video Clip 2', 'randomdate', 'Walking down the sunny lane together.', 'randomdate (1).jpg'),
      buildItem('randomdate (3).mp4', 'Spontaneous Video Clip 3', 'randomdate', 'Sweet moments captured in live motion.', 'randomdate (2).jpg'),
      buildItem('randomdate (4).mp4', 'Spontaneous Video Clip 4', 'randomdate', 'Teasing, giggles, and genuine warmth.', 'randomdate (3).jpg'),
      buildItem('randomdate (5).mp4', 'Spontaneous Video Clip 5', 'randomdate', 'A peaceful video memory of our evening.', 'randomdate (4).jpg'),
      buildItem('randomdate (1).jpg', 'Casual Afternoon Outing', 'randomdate', 'A sunny stroll through town.'),
      buildItem('randomdate (2).jpg', 'Warm Tea & Conversations', 'randomdate', 'Sharing stories over hot tea.'),
      buildItem('randomdate (3).jpg', 'Walking Hand in Hand', 'randomdate', 'Park pathway strolls.'),
      buildItem('randomdate (4).jpg', 'Ordinary Tuesday Magic', 'randomdate', 'Making everyday moments feel special.'),
      buildItem('randomdate (5).jpg', 'Smiles in the Car', 'randomdate', 'Candid snapshot during an afternoon drive.'),
      buildItem('randomdate (6).jpg', 'Sunset Conversations', 'randomdate', 'Golden skies framing our walk.'),
      buildItem('randomdate (7).jpg', 'Our Favorite Corner', 'randomdate', 'Pausing by the quiet sidewalk.'),
      buildItem('randomdate (8).jpg', 'Unplanned Road Stop', 'randomdate', 'Looking out at the open road.'),
      buildItem('randomdate (9).jpg', 'Pure Happiness', 'randomdate', 'A smile that brightened the whole day.'),
      buildItem('randomdate (10).jpg', 'Evening Streetlights', 'randomdate', 'Walking home under soft streetlights.'),
      buildItem('randomdate (11).jpg', 'Cozy Table Moments', 'randomdate', 'Laughter across the cafe table.'),
      buildItem('randomdate (12).jpg', 'Time Standing Still', 'randomdate', 'Lost in conversation for hours.'),
      buildItem('randomdate (13).jpg', 'A Stolen Glance', 'randomdate', 'Looking back with genuine warmth.'),
      buildItem('randomdate (14).jpg', 'Sunny Day Adventure', 'randomdate', 'Exploring new corners of the city.'),
      buildItem('randomdate (15).jpg', 'The Little Things', 'randomdate', 'Simple moments that meant the world.'),
      buildItem('randomdate (16).jpg', 'Sidewalk Walks', 'randomdate', 'Walking side by side without a hurry.'),
      buildItem('randomdate (17).jpg', 'Peaceful Pause', 'randomdate', 'A quiet breath between busy hours.'),
      buildItem('randomdate (18).jpg', 'Holding Hands Across the Table', 'randomdate', 'Gentle touch and deep connection.'),
      buildItem('randomdate (19).jpg', 'A Smile Just for Me', 'randomdate', 'The sweetness of being together.'),
      buildItem('randomdate (20).jpg', 'Midday Sunshine', 'randomdate', 'Golden sunlight on the sidewalk.'),
      buildItem('randomdate (21).jpg', 'Driveway Selfie', 'randomdate', 'A candid selfie before the drive.'),
      buildItem('randomdate (22).jpg', 'Afternoon Breeze', 'randomdate', 'Cool wind and warm laughter.'),
      buildItem('randomdate (23).jpg', 'Exploring New Streets', 'randomdate', 'Every road was an adventure with you.'),
      buildItem('randomdate (24).jpg', 'Poetry in Silence', 'randomdate', 'When no words were even needed.'),
      buildItem('randomdate (25).jpg', 'Everyday Love', 'randomdate', 'A cherished frame of true companionship.'),
      buildItem('randomdate (26).jpg', 'Soft Ambient Light', 'randomdate', 'Warm indoor evening glow.'),
      buildItem('randomdate (27).jpg', 'Joy at Our Favorite Spot', 'randomdate', 'Returning to the places we love.'),
      buildItem('randomdate (28).jpg', 'Complete Comfort', 'randomdate', 'Two souls completely at ease.'),
      buildItem('randomdate (29).jpg', 'Harmonious Presence', 'randomdate', 'Peaceful afternoon togetherness.'),
      buildItem('randomdate (30).jpg', 'Impromptu Photoshoot', 'randomdate', 'Snapping quick pictures just to remember.'),
      buildItem('randomdate (31).jpg', 'Tree Canopies', 'randomdate', 'Walking under shaded leaves.'),
      buildItem('randomdate (32).jpg', 'Quick Roadside Pause', 'randomdate', 'Stopping to admire the view.'),
      buildItem('randomdate (33).jpg', 'Sunny Highway Drive', 'randomdate', 'Music playing through the car speakers.'),
      buildItem('randomdate (34).jpg', 'Instant Joy', 'randomdate', 'Laughing at private inside jokes.'),
      buildItem('randomdate (35).jpg', 'Quiet Evening Harmony', 'randomdate', 'Soft twilight conversations.'),
      buildItem('randomdate (36).jpg', 'Gentle Presence', 'randomdate', 'Warm eyes and sweet presence.'),
      buildItem('randomdate (37).jpg', 'Keepsake Frame', 'randomdate', 'Another treasured memory saved.'),
      buildItem('randomdate (38).jpg', 'Everyday Beauty', 'randomdate', 'The simple magic of our bond.'),
      buildItem('randomdate (39).jpg', 'Private Jokes', 'randomdate', 'Giggles that only we understand.'),
      buildItem('randomdate (40).jpg', 'Candid Glance', 'randomdate', 'Caught in a tender moment.'),
      buildItem('randomdate (41).jpg', 'Sunlit Smiles', 'randomdate', 'Bright sunshine reflecting our joy.'),
      buildItem('randomdate (42).jpg', 'Extraordinary Walks', 'randomdate', 'Every step filled with happiness.'),
      buildItem('randomdate (43).jpg', 'Etched into Memory', 'randomdate', 'A frame that will never fade.'),
      buildItem('randomdate (44).jpg', 'Before Heading Home', 'randomdate', 'One last picture of the day.'),
      buildItem('randomdate (45).jpg', 'Afternoon Contentment', 'randomdate', 'Peaceful, calm, and full of love.'),
      buildItem('randomdate (46).jpg', 'Unconditional Support', 'randomdate', 'Always by each other’s side.'),
      buildItem('randomdate (47).jpg', 'Warmth in Hand', 'randomdate', 'The comfort of holding your hand.'),
      buildItem('randomdate (48).jpg', 'Endless Stories', 'randomdate', 'Talking about our hopes and dreams.'),
      buildItem('randomdate (49).jpg', 'Life Together', 'randomdate', 'Building our world day by day.'),
      buildItem('randomdate (50).jpg', 'Sweet Little Things', 'randomdate', 'Small moments that meant everything.'),
      buildItem('randomdate (51).jpg', 'Looking Ahead', 'randomdate', 'Full of hope for our shared future.'),
      buildItem('randomdate (52).jpg', 'Mid-walk Pause', 'randomdate', 'Stopping to take in the breeze.'),
      buildItem('randomdate (53).jpg', 'Evening Glow', 'randomdate', 'Soft sunset light on our smiles.'),
      buildItem('randomdate (54).jpg', 'Simple Magic', 'randomdate', 'An ordinary day made extraordinary.'),
      // Random day
      buildItem('randomday.jpg', 'Quiet Day Frame', 'randomday', 'A peaceful afternoon snapshot.'),
      buildItem('randomday (1).jpg', 'Morning Light', 'randomday', 'Bright morning sun and happy thoughts.'),
      buildItem('randomday (2).jpg', 'Spontaneous Stop', 'randomday', 'Pausing on the way.'),
      buildItem('randomday (3).jpg', 'Gentle Breeze', 'randomday', 'Cool air and shared smiles.'),
      buildItem('randomday (4).jpg', 'Joy for No Reason', 'randomday', 'Smiling just because we were together.'),
      buildItem('randomday (5).jpg', 'Watching the Sky', 'randomday', 'Sitting quietly watching the clouds.'),
      buildItem('randomday (6).jpg', 'Sweet Candid Frame', 'randomday', 'Unrehearsed and real.'),
      buildItem('randomday (7).jpg', 'Precious Hours', 'randomday', 'Making every hour count.'),
      buildItem('randomday (8).jpg', 'Always Remembered', 'randomday', 'An afternoon etched in our minds.'),
      buildItem('randomday (9).jpg', 'Everyday Smiles', 'randomday', 'Laughter during simple tasks.'),
      buildItem('randomday (10).jpg', 'A Gentle Pause', 'randomday', 'Breathing in the quiet air.'),
      buildItem('randomday (11).jpg', 'Familiar Streets', 'randomday', 'Walking down the lanes we love.'),
      buildItem('randomday (12).jpg', 'Comfort of Company', 'randomday', 'Never feeling alone with you.'),
      buildItem('randomday (13).jpg', 'Sunny Peace', 'randomday', 'Pure serenity under the sun.'),
      buildItem('randomday (14).jpg', 'Endless Gratitude', 'randomday', 'Thankful for every single second.'),
      buildItem('randomday (15).jpg', 'Sweetest Ordinary Day', 'randomday', 'The beauty of our everyday bond.'),
      buildItem('randompics(1).jpg', 'Treasured Snapshot', 'randompics', 'A candid picture from our days together.'),
    ],
  },

  // 7. Our Sacred Promises & Time Together
  {
    id: 'sacred-promises',
    categoryNumber: 7,
    title: 'Our Sacred Promises & Time Together',
    subtitle: 'Handmade Prayers, 33 Golden Days, Pre-Wedding Royalty & Sacred Vows',
    description:
      'The sacred handmade Shivalingam, thirty-three unbroken days of divine peace, magnificent pre-wedding frames in the golden light, and the holy marriage vows uniting our souls.',
    themeColor: '#D8B46A',
    accentIcon: 'Sparkles',
    items: [
      // Shivalingam
      buildItem('shivalingam(1).jpg', 'Handmade Shivalingam (Sculpted)', 'shivalingam', 'Molded by hand with devotion and reverence.'),
      buildItem('shivalingam(2).jpg', 'Sacred Prayers & Flowers', 'shivalingam', 'Offered with flowers and quiet prayers for our bond.'),
      // 33 Days
      buildItem('33days(3).jpeg', 'Thirty-Three Days Together', '33days', 'Commemorating 33 days of unbroken grace and harmony.'),
      // Marriage Day
      buildItem('marrageday.jpeg', 'Our Sacred Marriage Vows', 'marrageday', 'The auspicious moment of our sacred marriage ceremony.'),
      buildItem('marrageday (1).jpg', 'Ceremonial Garlands', 'marrageday', 'Adorned in garlands and sacred blessings.'),
      buildItem('marrageday (2).jpg', 'Holy Rituals of Union', 'marrageday', 'Two souls united before the sacred fire.'),
      buildItem('marrageday (3).jpg', 'Eternal Commitments', 'marrageday', 'Vows sworn for this lifetime and all lifetimes.'),
      // Pre-Wedding
      buildItem('prewedding.JPG', 'Grand Pre-Wedding Portrait', 'prewedding', 'Breathtaking portrait in the golden sunset glow.'),
      buildItem('preweddingshoot.mp4', 'Pre-Wedding Cinematic Film', 'prewedding', 'The cinematic pre-wedding film and live shoot memories.', 'prewedding.JPG'),
      buildItem('prewedding.png', 'Royal Traditional Finery', 'prewedding', 'Majestic attire and timeless grace.'),
      buildItem('prewedding (1).png', 'Standing Together in Elegance', 'prewedding', 'An exquisite portrait of romantic royalty.'),
      buildItem('prewedding (1).JPG', 'Holding Hands in Nature', 'prewedding', 'Scenic beauty framing our devotion.'),
      buildItem('prewedding (2).JPG', 'Tender Sunset Embrace', 'prewedding', 'Embracing beneath warm golden skies.'),
      buildItem('prewedding (3).JPG', 'Walking Toward Forever', 'prewedding', 'Stepping forward into our shared destiny.'),
      buildItem('prewedding (4).JPG', 'Radiant Smiles', 'prewedding', 'Joy and excitement for our sacred vows.'),
      buildItem('prewedding (5).JPG', 'Soft Evening Light', 'prewedding', 'Sunset illuminating our love.'),
      buildItem('prewedding (6).JPG', 'Classic Cinematic Pose', 'prewedding', 'A frame straight out of a romantic movie.'),
      buildItem('prewedding (7).JPG', 'Gazing Deeply', 'prewedding', 'Looking into the eyes that hold my entire world.'),
      buildItem('prewedding (8).JPG', 'Timeless Landscape', 'prewedding', 'Nature framing our shared promise.'),
      buildItem('prewedding (9).JPG', 'Laughter in High Resolution', 'prewedding', 'Pure, unscripted joy during the shoot.'),
      buildItem('prewedding (10).JPG', 'Royal Album Portrait', 'prewedding', 'Regal elegance celebrating our commitment.'),
      buildItem('prewedding (11).JPG', 'Graceful Stance', 'prewedding', 'A classic pose worthy of a royal keepsake.'),
      buildItem('prewedding (12).JPG', 'Gentle Touch & Promises', 'prewedding', 'Holding hands with deep tenderness.'),
      buildItem('prewedding (13).JPG', 'Nature & Devotion', 'prewedding', 'Two hearts beating in natural harmony.'),
      buildItem('prewedding (14).JPG', 'Anticipation of Vows', 'prewedding', 'Vibrant colors of wedding anticipation.'),
      buildItem('prewedding (15).JPG', 'Soft Gazes', 'prewedding', 'Tender looks that speak volumes.'),
      buildItem('prewedding (16).JPG', 'Walking Open Fields', 'prewedding', 'Hand in hand through open golden fields.'),
      buildItem('prewedding (17).JPG', 'Golden Hour Glow', 'prewedding', 'Warm rays lighting up our faces.'),
      buildItem('prewedding (18).JPG', 'Unforgettable Portrait', 'prewedding', 'A portrait to be remembered for generations.'),
      buildItem('prewedding (19).JPG', 'Embracing the Beauty', 'prewedding', 'Soaking in the magic of the afternoon.'),
      buildItem('prewedding (20).JPG', 'Proud in Commitment', 'prewedding', 'Standing strong and true together.'),
      buildItem('prewedding (21).JPG', 'Stunning Framing', 'prewedding', 'Artistic framing and elegant lighting.'),
      buildItem('prewedding (22).JPG', 'Romantic Grace', 'prewedding', 'Pure poise and deep affection.'),
      buildItem('prewedding (23).jpg', 'Candid Shoot Beauty', 'prewedding', 'Behind-the-scenes candid warmth.'),
      buildItem('prewedding (24).jpg', 'Shoot Laughter', 'prewedding', 'Giggling between camera takes.'),
      buildItem('prewedding (25).jpg', 'Peaceful Pause', 'prewedding', 'Catching our breath between shots.'),
      buildItem('prewedding (26).jpg', 'Sweet Gazes', 'prewedding', 'Loving glances caught on lens.'),
      buildItem('prewedding (27).jpg', 'Delicate Affection', 'prewedding', 'Soft, gentle touches.'),
      buildItem('prewedding (28).jpg', 'Natural Light Smiles', 'prewedding', 'Warm smiles under natural daylight.'),
      buildItem('prewedding (29).jpg', 'Poetry of Us', 'prewedding', 'Every picture a line of poetry.'),
      buildItem('prewedding (30).jpg', 'Shared Dreams', 'prewedding', 'Dreaming of our future together.'),
      buildItem('prewedding (31).jpg', 'Tradition & Love', 'prewedding', 'Honoring sacred traditions in love.'),
      buildItem('prewedding (32).jpg', 'The Eternal Album Tribute', 'prewedding', 'The ultimate tribute to our sacred promises.'),
    ],
  },

  // 8. The Day We Had to Leave (Closing Chapter)
  {
    id: 'the-hard-goodbye',
    categoryNumber: 8,
    title: 'The Day We Had to Leave',
    subtitle: 'A Sacred Chapter of Melancholy & Eternal Respect',
    description:
      'A quiet, reflective memory honoring the painful crossroads where our paths had to part. Kept with reverence, not to dwell in sorrow, but to honor the pure depth of a love that withstood even the hardest goodbye.',
    themeColor: '#64B5F6',
    isClosingChapter: true,
    accentIcon: 'Moon',
    items: [
      buildItem(
        '34thday.jpeg',
        'The 34th Day — Our Hardest Goodbye',
        '34thday',
        'Even in the deepest sorrow and the hardest goodbye, what we shared will always remain pure, sacred, and unforgettable.'
      ),
    ],
  },
];
