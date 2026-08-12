import React from 'react';

export const SplineHero: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '2rem',
        boxShadow: '0 8px 32px 0 var(--shadow-color)',
      }}
    >
      {/* Instant Eager Loaded Image */}
      <img
        src="./images/amberleaf-vibe.jpg"
        alt="Amberleaf Fine Dine Ambiance"
        loading="eager"
        // @ts-expect-error fetchpriority is a modern HTML attribute
        fetchpriority="high"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'transform 0.6s ease',
        }}
      />

      {/* Muted luxury overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(10, 9, 7, 0.45)',
          zIndex: 1,
        }}
      />

      {/* Text overlay */}
      <div style={{ position: 'relative', zIndex: 2, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
        <span
          style={{
            color: 'var(--accent-gold)',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            fontWeight: 700,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Welcome to
        </span>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            color: '#fff',
            marginBottom: '0.25rem',
          }}
        >
          Amberleaf Fine Dine
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
          310, Balgarden, Srinagar
        </p>
      </div>
    </div>
  );
};
