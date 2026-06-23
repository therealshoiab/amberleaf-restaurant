import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [lineCompleted, setLineCompleted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Restaurant Name split into letters
  const nameLetters = "AMBERLEAF".split("");

  useEffect(() => {
    // 1. Horizontal line draws for 1.2s
    const lineTimer = setTimeout(() => {
      setLineCompleted(true);
    }, 1200);

    // 2. Initiate split-panel curtain exit after 3.2s total
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit curtains slide transition (0.8s) before calling onComplete
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 3400);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  // Framer Motion Variants
  const panelTopVariants = {
    initial: { translateY: 0 },
    exit: { translateY: "-100%" }
  };

  const panelBottomVariants = {
    initial: { translateY: 0 },
    exit: { translateY: "100%" }
  };

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 0.9,
      y: 0,
      transition: {
        delay: 0.72, // Fade in right after letters start appearing
        duration: 0.7,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 99999,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Top Panel Curtain */}
        <motion.div
          variants={panelTopVariants}
          initial="initial"
          animate={isExiting ? "exit" : "initial"}
          transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50vh',
            backgroundColor: '#040906',
            borderBottom: '1px solid rgba(197, 160, 89, 0.08)',
            zIndex: 99999,
            pointerEvents: 'auto',
          }}
        />

        {/* Bottom Panel Curtain */}
        <motion.div
          variants={panelBottomVariants}
          initial="initial"
          animate={isExiting ? "exit" : "initial"}
          transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50vh',
            backgroundColor: '#040906',
            borderTop: '1px solid rgba(197, 160, 89, 0.08)',
            zIndex: 99999,
            pointerEvents: 'auto',
          }}
        />

        {/* Central Content Area (Fades out just before curtain splits) */}
        {!isExiting && (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="initial"
            exit="exit"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100000,
              pointerEvents: 'auto',
            }}
          >
            {/* SVG Logo Mark - Glowing & Premium */}
            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
              <img
                src="./images/logo.png"
                alt="Amberleaf Logo"
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  border: '1px solid var(--accent-gold)',
                  boxShadow: '0 0 25px rgba(197, 160, 89, 0.2)',
                  objectFit: 'cover',
                  opacity: 0.95,
                }}
              />
            </div>

            {/* Horizontal Gold Line - Draws Left to Right */}
            <div style={{ width: '260px', height: '2px', position: 'relative', marginBottom: '2.5rem' }}>
              <svg width="260" height="2" viewBox="0 0 260 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line
                  x1="0"
                  y1="1"
                  x2="260"
                  y2="1"
                  stroke="url(#preloaderGoldGradient)"
                  strokeWidth="2"
                  initial={{ strokeDasharray: 260, strokeDashoffset: 260 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="preloaderGoldGradient" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#c5a059" />
                    <stop offset="0.5" stopColor="#f0d080" />
                    <stop offset="1" stopColor="#c5a059" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Staggered Letter-by-Letter Text Reveal */}
            {lineCompleted && (
              <div style={{ display: 'flex', gap: '0.15em', justifyContent: 'center' }}>
                {nameLetters.map((letter, idx) => (
                  <motion.span
                    key={idx}
                    custom={idx}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      color: '#f5f3ef',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '2.5rem',
                      letterSpacing: '0.1em',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Tagline Reveal */}
            {lineCompleted && (
              <motion.p
                variants={taglineVariants}
                initial="hidden"
                animate="visible"
                style={{
                  marginTop: '0.85rem',
                  color: 'var(--accent-gold)',
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: '0.85rem',
                  letterSpacing: '0.25em',
                  textAlign: 'center',
                }}
              >
                Fine Dining &middot; Srinagar
              </motion.p>
            )}
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes spinLoader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AnimatePresence>
  );
};
