import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  Disc3,
  Sliders,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react';

interface AudioTrack {
  id: string;
  name: string;
  filename: string;
  subtitle: string;
}

const AVAILABLE_TRACKS: AudioTrack[] = [
  {
    id: 'our-story',
    name: 'Our Story',
    filename: 'our-story.mp3',
    subtitle: 'Main Ambient Theme',
  },
  {
    id: 'map-ambient',
    name: 'Map Atmosphere',
    filename: 'map-ambient.mp3',
    subtitle: 'Cartographic Drift',
  },
  {
    id: 'distance',
    name: 'Distance',
    filename: 'distance.mp3',
    subtitle: 'Quiet Roads Interlude',
  },
  {
    id: 'reunion',
    name: 'Reunion',
    filename: 'reunion.mp3',
    subtitle: 'Golden Hour Hilltop',
  },
];

const PREFERENCE_KEY = 'our_story_music_preference';
const MUTED_KEY = 'our_story_audio_muted';
const VOLUME_KEY = 'our_story_audio_volume';
const TRACK_KEY = 'our_story_audio_track_idx';

export const AmbientMusicPlayer: React.FC = () => {
  // Persistence in localStorage: default volume is gentle (0.3)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MUTED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [volume, setVolume] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(VOLUME_KEY);
      return saved !== null ? Math.min(Math.max(parseFloat(saved), 0), 1) : 0.3;
    } catch {
      return 0.3;
    }
  });

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(TRACK_KEY);
      const idx = saved !== null ? parseInt(saved, 10) : 0;
      return idx >= 0 && idx < AVAILABLE_TRACKS.length ? idx : 0;
    } catch {
      return 0;
    }
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userDisabledRef = useRef<boolean>(false);
  const currentTrack = AVAILABLE_TRACKS[currentTrackIndex];

  // Initialize audio instance & attempt autoplay safely on page load
  useEffect(() => {
    // 1. Check if user previously explicitly disabled music
    let userPref: string | null = null;
    try {
      userPref = localStorage.getItem(PREFERENCE_KEY);
    } catch {
      // Ignore
    }

    if (userPref === 'off') {
      userDisabledRef.current = true;
    }

    const audio = new Audio(`/audio/${currentTrack.filename}`);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    audio.onerror = () => {
      // Gracefully remain silent if audio file cannot be loaded
    };

    // If user previously turned off music, do not attempt automatic play
    if (userDisabledRef.current) {
      return () => {
        audio.pause();
        audio.src = '';
        audioRef.current = null;
      };
    }

    // 2. Attempt immediate autoplay
    let interactionListenerCleanups: (() => void) | null = null;

    const startAudioOnFirstInteraction = () => {
      if (userDisabledRef.current || !audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Gracefully ignore
        });
    };

    // Attempt direct play
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // 3. Browser blocked audible autoplay — wait for first user interaction
        const events = ['click', 'pointerdown', 'keydown', 'touchstart', 'scroll'];
        const onUserInteraction = () => {
          startAudioOnFirstInteraction();
          events.forEach((evt) => {
            window.removeEventListener(evt, onUserInteraction);
          });
        };

        events.forEach((evt) => {
          window.addEventListener(evt, onUserInteraction, { once: true, passive: true });
        });

        interactionListenerCleanups = () => {
          events.forEach((evt) => {
            window.removeEventListener(evt, onUserInteraction);
          });
        };
      });

    return () => {
      if (interactionListenerCleanups) {
        interactionListenerCleanups();
      }
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Update track source when track changes
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const wasPlaying = isPlaying;

    audio.src = `/audio/${currentTrack.filename}`;
    audio.load();

    if (wasPlaying && !userDisabledRef.current) {
      audio.play().catch(() => {
        // Gracefully remain silent if file is missing or blocked
      });
    }

    try {
      localStorage.setItem(TRACK_KEY, currentTrackIndex.toString());
    } catch {
      // Ignore localStorage quotas
    }
  }, [currentTrackIndex]);

  // Volume & Mute adjustments
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
    try {
      localStorage.setItem(VOLUME_KEY, volume.toString());
      localStorage.setItem(MUTED_KEY, isMuted.toString());
    } catch {
      // Ignore
    }
  }, [volume, isMuted]);

  // Play / Pause handling
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      userDisabledRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
      try {
        localStorage.setItem(PREFERENCE_KEY, 'off');
      } catch {
        // Ignore
      }
    } else {
      userDisabledRef.current = false;
      setIsPlaying(true);
      try {
        localStorage.setItem(PREFERENCE_KEY, 'on');
      } catch {
        // Ignore
      }
      audioRef.current.play().catch(() => {
        // Gracefully handle if file error occurs
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
  };

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end"
      role="region"
      aria-label="Ambient Music Player"
    >
      {/* EXPANDED CONTROL FLYOUT PANEL */}
      {isExpanded && (
        <div
          className="mb-3 w-72 sm:w-80 bg-[#1c081e]/95 backdrop-blur-2xl border border-[#D8B46A]/40 rounded-2xl p-4 shadow-[0_15px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(122,24,56,0.3)] text-[#FFF4F1] animate-fade-in"
          id="music-panel"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-[#7A1838]/40 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Disc3
                className={`w-4 h-4 text-[#D8B46A] ${isPlaying ? 'animate-spin' : ''}`}
                style={{ animationDuration: '4s' }}
              />
              <span className="font-cinzel text-xs font-bold text-[#FFF4F1] tracking-wider uppercase">
                Ambient Music System
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#E89AAF] hover:text-[#FFF4F1] p-1 rounded transition-colors"
              aria-label="Close music controls"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Current Track Status */}
          <div className="bg-[#120412]/80 border border-[#7A1838]/30 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#E89AAF] mb-1">
              <span>ACTIVE AUDIO TRACK</span>
              <span className={isPlaying ? 'text-[#D8B46A]' : 'text-zinc-500'}>
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>
            <div className="font-cinzel text-sm font-bold text-[#FFF4F1] truncate">
              {currentTrack.name}
            </div>
            <div className="text-[11px] font-cormorant italic text-[#D8B46A]/80">
              public/audio/{currentTrack.filename}
            </div>
          </div>

          {/* Track Selection Switcher */}
          <div className="space-y-1 mb-3">
            <div className="text-[10px] font-cinzel text-[#E89AAF] tracking-wider uppercase mb-1">
              Available Soundscapes:
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {AVAILABLE_TRACKS.map((t, idx) => {
                const isSelected = currentTrackIndex === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => setCurrentTrackIndex(idx)}
                    className={`text-left px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? 'bg-[#7A1838]/70 border-[#D8B46A] text-[#FFF4F1]'
                        : 'bg-[#140614]/60 border-[#7A1838]/30 text-[#FFF4F1]/70 hover:text-[#FFF4F1] hover:border-[#D8B46A]/40'
                    }`}
                    aria-label={`Select audio track ${t.name}`}
                  >
                    <div className="font-cinzel text-[11px] font-bold truncate">{t.name}</div>
                    <div className="text-[9px] text-[#E89AAF]/70 truncate">{t.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Player Transport Controls */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#7A1838]/30">
            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#7A1838] to-[#5B1028] hover:from-[#8d1d42] hover:to-[#6a1330] border border-[#D8B46A]/60 text-xs font-cinzel font-bold text-[#FFF4F1] tracking-wider shadow-md transition-all"
              aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current text-[#D8B46A]" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-[#D8B46A]" />
                  <span>PLAY</span>
                </>
              )}
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border transition-colors ${
                isMuted
                  ? 'bg-[#3b0d18] border-[#E89AAF] text-[#E89AAF]'
                  : 'bg-[#18061a] border-[#7A1838]/40 hover:border-[#D8B46A] text-[#FFF4F1]'
              }`}
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-[#E89AAF]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#D8B46A]" />
              )}
            </button>
          </div>

          {/* Volume Slider Control */}
          <div className="mt-3 flex items-center gap-2.5">
            <Volume2 className="w-3.5 h-3.5 text-[#E89AAF] shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 accent-[#D8B46A] h-1.5 bg-[#140614] rounded-lg cursor-pointer"
              aria-label="Music volume slider"
              aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <span className="text-[10px] font-mono text-[#E89AAF] w-8 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM-RIGHT FLOATING CIRCULAR MUSIC BUTTON                    */}
      {/* States: "MUSIC ON" & "MUSIC OFF" with animated equalizer       */}
      {/* ============================================================== */}
      <div className="flex items-center gap-2">
        {/* Expand / Controls Toggle Pill */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#1c081e]/85 backdrop-blur-md border border-[#7A1838]/50 hover:border-[#D8B46A]/60 text-[10px] font-cinzel text-[#E89AAF] hover:text-[#FFF4F1] shadow-lg transition-all"
          aria-expanded={isExpanded}
          aria-controls="music-panel"
          aria-label="Toggle music settings panel"
        >
          <Sliders className="w-3 h-3 text-[#D8B46A]" />
          <span>{isExpanded ? 'Hide' : 'Tracks'}</span>
          {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>

        {/* Circular Floating Action Button */}
        <button
          onClick={togglePlay}
          className={`relative group flex items-center gap-2.5 pl-3 pr-3.5 sm:pr-4 py-2 rounded-full border transition-all duration-300 shadow-xl cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-[#2a0c24]/95 to-[#1c081e]/95 border-[#D8B46A] shadow-[0_0_25px_rgba(216,180,106,0.4),0_0_15px_rgba(122,24,56,0.6)] scale-105'
              : 'bg-[#1c081e]/90 hover:bg-[#250a22] border-[#7A1838]/60 hover:border-[#D8B46A]/50 text-[#E89AAF] hover:text-[#FFF4F1]'
          }`}
          aria-label={isPlaying ? 'Pause ambient music (MUSIC ON)' : 'Play ambient music (MUSIC OFF)'}
          title={isPlaying ? 'Click to pause music' : 'Click to play ambient music'}
        >
          {/* Icon Circle */}
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-[#7A1838] border border-[#D8B46A] text-[#FFF4F1]'
                : 'bg-[#140614] border border-[#7A1838]/40 text-[#E89AAF]'
            }`}
          >
            {isPlaying ? (
              <Music className="w-3.5 h-3.5 text-[#D8B46A]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#E89AAF]" />
            )}
          </div>

          {/* STATE TEXT: "MUSIC ON" or "MUSIC OFF" */}
          <div className="flex flex-col items-start leading-tight">
            <span
              className={`font-cinzel text-[10px] sm:text-[11px] font-bold tracking-wider ${
                isPlaying ? 'text-[#D8B46A]' : 'text-[#E89AAF]'
              }`}
            >
              {isPlaying ? 'MUSIC ON' : 'MUSIC OFF'}
            </span>

            {/* SUBTLE ANIMATED EQUALIZER WHEN MUSIC IS ON */}
            {isPlaying && (
              <div
                className="flex items-end gap-0.5 h-2.5 mt-0.5"
                aria-hidden="true"
                title="Audio Equalizer"
              >
                <span className="w-0.5 bg-[#D8B46A] rounded-full animate-[musicBar_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#E89AAF] rounded-full animate-[musicBar_1.1s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-[#FFF4F1] rounded-full animate-[musicBar_0.6s_ease-in-out_infinite_0.4s]" />
                <span className="w-0.5 bg-[#D8B46A] rounded-full animate-[musicBar_0.9s_ease-in-out_infinite_0.1s]" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Keyframe animation for subtle equalizer bars */}
      <style>{`
        @keyframes musicBar {
          0%, 100% {
            height: 2px;
          }
          50% {
            height: 10px;
          }
        }
      `}</style>
    </div>
  );
};
