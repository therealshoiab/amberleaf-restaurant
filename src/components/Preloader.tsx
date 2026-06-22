import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds loading
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, 600); // Wait for fade out animation
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0907',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.05) translateY(-20px)' : 'scale(1) translateY(0)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
        {/* SVG Recreated Gold Logo inside Preloader */}
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'scale(1.2)' }}>
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="1" />
          
          {/* Outer Laurel Wreath elements */}
          <path d="M25,50 C25,35 35,25 50,25" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M75,50 C75,35 65,25 50,25" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M25,50 C25,65 35,75 50,75" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M75,50 C75,65 65,75 50,75" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3,3" />
          
          {/* Crossed Cutlery */}
          {/* Fork */}
          <path d="M43,62 L43,50 M40,50 L46,50 M40,50 L40,43 M46,43 L46,50 M43,41 L43,50" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M43,62 L38,67" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
          {/* Spoon */}
          <path d="M57,62 L57,48" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="57" cy="43" rx="4" ry="6" fill="none" stroke="#d4af37" strokeWidth="1.5" />
          <path d="M57,62 L62,67" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
          {/* Center line decoration */}
          <circle cx="50" cy="54" r="2.5" fill="#d4af37" />
        </svg>

        {/* Outer glowing spinner */}
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            left: '-15px',
            right: '-15px',
            bottom: '-15px',
            border: '2px solid transparent',
            borderTop: '2px solid #d4af37',
            borderRight: '2px solid #d4af37',
            borderRadius: '50%',
            animation: 'spin 1.2s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite',
          }}
        />
      </div>

      <h1
        style={{
          color: '#f5f3ef',
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem',
          letterSpacing: '0.15em',
          fontWeight: 500,
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        Amberleaf
      </h1>
      <p
        style={{
          color: '#d4af37',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          opacity: 0.8,
        }}
      >
        Fine Dine & Cafe
      </p>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '240px',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '2px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #d4af37, #d97706)',
            boxShadow: '0 0 8px #d4af37',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <span
        style={{
          marginTop: '0.8rem',
          color: 'rgba(245, 243, 239, 0.4)',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
        }}
      >
        {Math.round(progress)}%
      </span>

      {/* Inject custom spin animation directly in style */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
