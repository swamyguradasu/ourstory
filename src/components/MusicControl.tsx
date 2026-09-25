import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

interface MusicControlProps {
  onHeartClick?: () => void;
  likesCount?: number;
}

export const MusicControl: React.FC<MusicControlProps> = ({ onHeartClick, likesCount = 0 }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.25);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [heartPulsing, setHeartPulsing] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize and run romantic ambient synthesizer
  const toggleMusic = () => {
    if (isPlaying) {
      // Stop synth
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      // Start audio context upon user gesture
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
        gainNode.connect(audioCtxRef.current.destination);
        gainNodeRef.current = gainNode;
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);

      // Play soft romantic melody notes in loop (D major / B minor romantic pentatonic arpeggio)
      const chordNotes = [
        [293.66, 369.99, 440.0, 587.33], // D maj9
        [246.94, 293.66, 369.99, 440.0], // Bm7
        [220.0, 277.18, 329.63, 440.0],  // A sus
        [196.0, 246.94, 293.66, 392.0],  // G maj7
      ];
      let chordIndex = 0;
      let noteIndex = 0;

      const playTone = () => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;
        const ctx = audioCtxRef.current;
        if (ctx.state !== 'running') return;

        const currentChord = chordNotes[chordIndex];
        const freq = currentChord[noteIndex % currentChord.length];

        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Warm chime / Rhodes-like tone with soft harmonic
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.08, now + 0.12);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        osc.connect(noteGain);
        noteGain.connect(gainNodeRef.current);

        osc.start(now);
        osc.stop(now + 2.5);

        // Advance arpeggio
        noteIndex++;
        if (noteIndex % 4 === 0) {
          chordIndex = (chordIndex + 1) % chordNotes.length;
        }
      };

      // Play immediate first note
      playTone();
      timerRef.current = window.setInterval(playTone, 750);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const triggerHeart = () => {
    setHeartPulsing(true);
    setTimeout(() => setHeartPulsing(false), 600);
    if (onHeartClick) onHeartClick();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      {/* Sound / Music Player Control */}
      <div 
        className="relative flex items-center"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Mute ambient melody' : 'Play ambient romance melody'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
            isPlaying
              ? 'bg-[#5B1028]/80 text-[#D8B46A] border-[#D8B46A]/50 shadow-[0_0_15px_rgba(216,180,106,0.3)]'
              : 'bg-[#241025]/60 text-[#E89AAF]/90 hover:text-[#FFF4F1] border-[#7A1838]/40 hover:border-[#D8B46A]/40'
          }`}
          title={isPlaying ? 'Music Playing (Ambient Celesta)' : 'Play Romantic Melody'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#D8B46A] animate-pulse" />
              {/* Equalizer bars */}
              <span className="flex items-end gap-0.5 h-3 w-3">
                <span className="w-0.5 bg-[#D8B46A] h-2.5 animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#D8B46A] h-1.5 animate-[pulse_1.1s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-[#D8B46A] h-3 animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
              </span>
              <span className="text-[11px] font-cormorant italic tracking-wide hidden sm:inline text-[#FFF4F1]">
                Melody On
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#E89AAF]" />
              <span className="text-[11px] font-cormorant italic tracking-wide hidden sm:inline text-[#E89AAF]">
                Play Melody
              </span>
            </>
          )}
        </button>

        {/* Volume slider popover */}
        {showVolumeSlider && isPlaying && (
          <div className="absolute right-0 top-full mt-2 p-2 bg-[#241025]/95 border border-[#D8B46A]/30 rounded-lg shadow-xl backdrop-blur-md z-50 flex items-center gap-2">
            <span className="text-[10px] text-[#E89AAF]">Vol</span>
            <input
              type="range"
              min="0"
              max="0.6"
              step="0.02"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 accent-[#D8B46A] cursor-pointer h-1.5"
            />
          </div>
        )}
      </div>

      {/* Heart interaction button */}
      <button
        onClick={triggerHeart}
        className={`p-2 rounded-full border transition-all duration-300 ${
          heartPulsing
            ? 'scale-125 bg-[#7A1838] border-[#E89AAF] shadow-[0_0_20px_rgba(232,154,175,0.6)]'
            : 'bg-[#241025]/60 border-[#7A1838]/40 hover:border-[#E89AAF]/60 text-[#E89AAF] hover:text-[#FFF4F1] hover:scale-105'
        }`}
        title="Send a heartfelt pulse"
        aria-label="Send love"
      >
        <Heart className={`w-3.5 h-3.5 fill-current ${heartPulsing ? 'text-[#FFF4F1]' : 'text-[#E89AAF]'}`} />
        {likesCount > 0 && (
          <span className="sr-only">Love count: {likesCount}</span>
        )}
      </button>
    </div>
  );
};
