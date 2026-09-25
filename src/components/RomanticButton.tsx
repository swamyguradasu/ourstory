import React from 'react';
import { triggerRomanticHearts } from './RomanticParticleSystem';

interface RomanticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const RomanticButton: React.FC<RomanticButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  onClick,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Spawn tiny heart particles at click coordinate
    triggerRomanticHearts(e.clientX, e.clientY);
    if (onClick) {
      onClick(e);
    }
  };

  const sizeClasses = {
    sm: 'min-h-[44px] min-w-[44px] px-4 py-2.5 text-xs tracking-wider',
    md: 'min-h-[48px] min-w-[48px] px-6 py-3 text-xs sm:text-sm tracking-widest',
    lg: 'min-h-[52px] min-w-[52px] px-8 py-3.5 text-sm sm:text-base tracking-[0.2em]',
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#7A1838] via-[#5B1028] to-[#7A1838] hover:from-[#921E44] hover:via-[#7A1838] hover:to-[#921E44] text-[#FFF4F1] border border-[#D8B46A]/60 hover:border-[#D8B46A] shadow-[0_0_20px_rgba(122,24,56,0.5),0_0_10px_rgba(216,180,106,0.2)] hover:shadow-[0_0_30px_rgba(232,154,175,0.4),0_0_20px_rgba(216,180,106,0.4)]',
    secondary:
      'bg-[#241025]/90 hover:bg-[#3A0718] text-[#E89AAF] hover:text-[#FFF4F1] border border-[#D8B46A]/40 hover:border-[#D8B46A]/80 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(216,180,106,0.3)]',
    glass:
      'bg-[#1e0a20]/70 hover:bg-[#2c0e2f]/90 text-[#FFF4F1] border border-[#E89AAF]/40 hover:border-[#D8B46A] backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.7)]',
  }[variant];

  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center gap-2.5 rounded-full font-cinzel font-bold uppercase transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer overflow-hidden group ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Subtle Shimmer Sweep */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FFF4F1]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {/* Button content & optional icon */}
      {icon && <span className="text-[#D8B46A] transition-transform group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
