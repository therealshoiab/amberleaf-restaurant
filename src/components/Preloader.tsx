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
        <img
          src="./images/logo.png"
          alt="Amberleaf Logo"
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: '2px solid var(--accent-gold)',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.25)',
            objectFit: 'cover',
          }}
        />

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
