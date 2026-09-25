import React from 'react';

interface MapStoryIconProps {
  type: string;
  className?: string;
  size?: number;
}

export const MapStoryIcon: React.FC<MapStoryIconProps> = ({ type, className = "w-5 h-5", size = 20 }) => {
  switch (type) {
    case 'college':
      // College / Academics hall
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );

    case 'conversation':
      // Two delicate speech bubbles with heart
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
          <path d="M12 9c.7-1.3 2.5-1.3 3.2 0 .8 1.4-.4 2.8-1.6 3.8l-1.6 1.4-1.6-1.4C9.2 11.8 8 10.4 8.8 9c.7-1.3 2.5-1.3 3.2 0z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );

    case 'water':
      // Water droplet / sharing drink
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M10 13a2.5 2.5 0 0 0 3.5 0" strokeDasharray="1 2" />
        </svg>
      );

    case 'camera':
      // Handheld camera / first picture
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );

    case 'heart':
      // Inseparable best friends heart
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );

    case 'moon':
      // Crescent moon / 20 days distance
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );

    case 'bridge':
      // Arched bridge across the waters
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17c3-5 15-5 18 0" />
          <path d="M3 13h18" />
          <path d="M6 13v4" />
          <path d="M10 12v5" />
          <path d="M14 12v5" />
          <path d="M18 13v4" />
          <path d="M2 19h20" strokeDasharray="2 2" />
        </svg>
      );

    case 'gift':
      // The glass bangles gift
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </svg>
      );

    case 'celebration':
      // Fest day sparkling fireworks & confetti
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m4 11 7 7-6 4 2-7-3-4Z" />
          <path d="M15 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" fill="currentColor" fillOpacity="0.4" />
          <path d="M20 12l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z" />
          <path d="M11 2l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1Z" />
        </svg>
      );

    case 'star':
      // October 31 shining twilight star
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );

    case 'train':
      // Train journey to Vijayawada / train home
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="15" rx="3" />
          <path d="M4 11h16" />
          <path d="M12 3v8" />
          <path d="m8 18-3 3" />
          <path d="m16 18 3 3" />
          <circle cx="8" cy="15" r="1" fill="currentColor" />
          <circle cx="16" cy="15" r="1" fill="currentColor" />
        </svg>
      );

    case 'calendar':
      // Three days milestone calendar
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
      );

    case 'promise':
      // Sacred covenant / interlocking rings & key
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" strokeDasharray="2 2" />
          <path d="M12 4v2M12 18v2" />
        </svg>
      );

    case 'temple':
      // Antarvedi coastal temple pagoda / shrine
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="M4 10c4-3 12-3 16 0" />
          <path d="M2 15c5-2 15-2 20 0" />
          <path d="M6 10v9" />
          <path d="M18 10v9" />
          <path d="M10 15v4h4v-4" />
          <path d="M4 19h16" />
        </svg>
      );

    case 'footprints':
      // Seven steps / footprints of love
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8c1.5-2 3.5-1 3.5 1s-1.5 4-3.5 4S2 10 5 8z" fill="currentColor" fillOpacity="0.3" />
          <path d="M15 15c1.5-2 3.5-1 3.5 1s-1.5 4-3.5 4-3-3 0-5z" fill="currentColor" fillOpacity="0.5" />
          <circle cx="9" cy="4" r="1" fill="currentColor" />
          <circle cx="19" cy="11" r="1" fill="currentColor" />
        </svg>
      );

    case 'calendar-heart':
      // February 16 — Our Chosen Day
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M12 17.5l-2.4-2.2c-1.3-1.2-1.3-3.1 0-4.3 1.2-1.2 3.1-1.2 4.3 0 .2.2.4.4.5.6.1-.2.3-.4.5-.6 1.2-1.2 3.1-1.2 4.3 0 1.3 1.2 1.3 3.1 0 4.3L12 17.5z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );

    case 'ribbon':
      // A new chapter bookmark / ribbon
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          <path d="M12 7v4M10 9h4" strokeDasharray="1 1" />
        </svg>
      );

    case 'sunset':
      // March 26 sunset across the hills
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v1" />
          <path d="M5.22 10.22l.71.71" />
          <path d="M18.07 10.93l.71-.71" />
          <path d="M17 17a5 5 0 0 0-10 0" fill="currentColor" fillOpacity="0.3" />
          <path d="M2 17h20" />
          <path d="M4 21h16" />
        </svg>
      );

    case 'cake':
      // Birthday cake with candle
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7" />
          <path d="M4 21h16" />
          <path d="M12 7V4" />
          <path d="M12 4c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z" fill="currentColor" />
          <path d="M6 16c2 1 4 1 6 0s4-1 6 0" />
        </svg>
      );

    case 'home':
      // April 1 family hearth / home
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
          <path d="M10 21v-6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6" />
        </svg>
      );

    case 'house':
      // Thirty three days cozy cottage / house
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12 12 3l10 9" />
          <path d="M4 11v10h16V11" />
          <rect x="9" y="14" width="6" height="7" />
          <path d="M17 6h2v3h-2z" />
        </svg>
      );

    case 'moon-cloud':
      // Two months apart — moon behind misty cloud
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 3a5 5 0 0 0 5 5 5 5 0 0 0 3-1 6 6 0 0 1-8-4Z" fill="currentColor" fillOpacity="0.4" />
          <path d="M4 19a4 4 0 0 1 .8-7.9 6 6 0 0 1 11.4 1.9A4 4 0 0 1 19 19H4Z" />
        </svg>
      );

    case 'sunrise':
      // September 19 reunion dawn / sunrise
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v6" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m17.66 12.34 1.41-1.41" />
          <path d="M17 18a5 5 0 0 0-10 0" fill="currentColor" fillOpacity="0.4" />
          <path d="M2 22h20" />
        </svg>
      );

    case 'heart-star':
      // Our Story — radiant star entwined with eternal heart
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.5l2.4 5.3 5.8.8-4.2 4.1 1 5.8-5-2.8-5 2.8 1-5.8-4.2-4.1 5.8-.8z" fill="currentColor" fillOpacity="0.3" />
          <path d="M12 16.5l-1.8-1.7c-2.4-2.2-4-3.7-4-5.5 0-1.5 1.1-2.6 2.6-2.6 1 0 1.9.5 2.4 1.3.5-.8 1.4-1.3 2.4-1.3 1.5 0 2.6 1.1 2.6 2.6 0 1.8-1.6 3.3-4 5.5l-1.8 1.7z" fill="currentColor" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
};
