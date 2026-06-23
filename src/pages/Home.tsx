import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SplineHero } from '../components/SplineHero';
import { SEO } from '../components/SEO';
import { ArrowRight, Star, Clock, Utensils, Calendar } from 'lucide-react';

export const Home: React.FC = () => {
  const [activeImage, setActiveImage] = useState('./images/g1.jpg');
  const showcaseImages = [
    './images/g1.jpg',
    './images/g2.jpg',
    './images/g3.jpg',
    './images/g4.jpg',
    './images/g5.jpg',
    './images/g6.jpg',
    './images/g7.jpg',
  ];

  // Video autoplay states & refs
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const rowRef = useRef<HTMLDivElement | null>(null);
  const isHovering = useRef(false);

  // Recalculates which video is closest to the horizontal center of the scroll container
  const recalculateCenterVideo = () => {
    if (isHovering.current || !rowRef.current) return;

    const row = rowRef.current;
    const containerRect = row.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestVideoId: string | null = null;
    let minDistance = Infinity;

    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (video) {
        const rect = video.getBoundingClientRect();
        const videoCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - videoCenter);
        const isVisible = rect.left < containerRect.right && rect.right > containerRect.left;

        if (isVisible && distance < minDistance) {
          minDistance = distance;
          closestVideoId = id;
        }
      }
    });

    setActiveVideoId(closestVideoId);
  };

  // Sync play/pause based on activeVideoId
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (video) {
        if (id === activeVideoId) {
          video.play().catch((err) => console.log('Home autoplay blocked:', err));
        } else {
          video.pause();
        }
      }
    });
  }, [activeVideoId]);

  // Listen to horizontal scroll stopping
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    let scrollTimeout: number;

    const handleScroll = () => {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        recalculateCenterVideo();
      }, 150);
    };

    row.addEventListener('scroll', handleScroll);
    
    // Initial check on load
    const initTimeout = setTimeout(recalculateCenterVideo, 500);

    return () => {
      row.removeEventListener('scroll', handleScroll);
      window.clearTimeout(scrollTimeout);
      clearTimeout(initTimeout);
    };
  }, []);

  // Framer Motion entrance animations for sections
  const scrollSectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      <SEO
        title="Home"
        description="Welcome to Amberleaf Restaurant in Srinagar. Enjoy modern fine dining, authentic Kashmiri specialties, and artisanal mocktails in an elegant glassmorphic ambiance."
      />
      
      {/* 1. Film Grain Noise Overlay */}
      <div className="noise-overlay" />

      {/* Hero Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start',
          flex: 1,
          paddingTop: '2rem',
        }}
        className="hero-grid"
      >
        {/* Left Panel: Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          {/* Badges Container */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center' }}>
            <div
              className="glass-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Star size={14} fill="var(--accent-gold)" />
              <span>4.9 / 5 Guest Rating</span>
            </div>

            <div
              className="glass-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
              }}
            >
              <Clock size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Open Daily: 09:00am - 10:30pm</span>
            </div>
          </div>

          {/* Heading and Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Cinematic Clippath Reveal Animation */}
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
              }}
            >
              Where Taste Meets <br />
              <span className="text-gold" style={{ display: 'inline-block', position: 'relative' }}>
                Refined Elegance
              </span>
            </motion.h1>
            
            <p
              style={{
                fontSize: '1.1rem',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: 'var(--accent-gold)',
                letterSpacing: '0.05em',
                fontWeight: 500,
              }}
            >
              Elevating Kashmiri Hospitality & Culinary Artistry
            </p>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '550px' }}>
            Located in the heart of Srinagar, Amberleaf merges cozy glassmorphic aesthetics with a premium, multi-cuisine dining experience. Indulge in our masterfully crafted Kashmiri Wazwan, fiery tandoor starters, and signature artisanal beverages.
          </p>

          {/* Call to Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
            <a href="#/menu" className="btn-primary" style={{ gap: '0.5rem' }}>
              <Utensils size={18} />
              Explore Menu
              <ArrowRight size={16} />
            </a>
            <a href="#/contact" className="btn-secondary" style={{ gap: '0.5rem' }}>
              <Calendar size={18} />
              Book a Table
            </a>
          </div>

          {/* Micro-Features grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '1.5rem',
              width: '100%',
            }}
          >
            <div>
              <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>100%</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Halal Ingredients</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Private</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dining Room Available</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Free</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>On-site Parking</span>
            </div>
          </div>
        </div>

        {/* Right Panel: 3D Spline Canvas */}
        <div
          style={{
            height: '450px',
            width: '100%',
            position: 'relative',
          }}
          className="hero-canvas-container"
        >
          <SplineHero />
        </div>
      </div>

      {/* 2. Infinite Horizontal Marquee Ticker */}
      <div className="marquee-container" style={{ margin: '3.5rem 0' }}>
        <div className="marquee-content">
          <span className="marquee-item">
            &bull; EST. 2023 &bull; SRINAGAR, KASHMIR &bull; FINE DINING &bull; ARTISANAL MOCKTAILS &bull; KASHMIRI CUISINE &bull;&nbsp;
          </span>
          <span className="marquee-item">
            &bull; EST. 2023 &bull; SRINAGAR, KASHMIR &bull; FINE DINING &bull; ARTISANAL MOCKTAILS &bull; KASHMIRI CUISINE &bull;&nbsp;
          </span>
          <span className="marquee-item">
            &bull; EST. 2023 &bull; SRINAGAR, KASHMIR &bull; FINE DINING &bull; ARTISANAL MOCKTAILS &bull; KASHMIRI CUISINE &bull;&nbsp;
          </span>
          <span className="marquee-item">
            &bull; EST. 2023 &bull; SRINAGAR, KASHMIR &bull; FINE DINING &bull; ARTISANAL MOCKTAILS &bull; KASHMIRI CUISINE &bull;&nbsp;
          </span>
        </div>
      </div>

      {/* Ambience Showcase Section (Scroll triggered) */}
      <motion.div
        variants={scrollSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="glass-panel ambience-grid"
        style={{
          padding: 'clamp(1.2rem, 5vw, 2.5rem)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '2.5rem',
          alignItems: 'center',
        }}
      >
        {/* Large Preview & Thumbnails Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '330px', border: '1px solid var(--border-color)' }}>
            <img
              src={activeImage}
              alt="Amberleaf Restaurant Interior"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
                transition: 'all 0.5s ease',
              }}
            />
          </div>
          {/* Thumbnails Row */}
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              overflowX: 'auto',
              paddingBottom: '0.4rem',
            }}
          >
            {showcaseImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                style={{
                  width: '100px',
                  height: '75px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: activeImage === img ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  padding: 0,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'border-color 0.2s ease',
                  backgroundColor: '#000',
                }}
              >
                <img src={img} alt={`Thumbnail ${i+1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', minWidth: 0 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Dine-In Ambiance
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>
            Our Balgarden Sanctuary
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            Step into a space where modern glass architecture meets warm, cozy wooden accents. Designed specifically for group gatherings, family dinners, and peaceful solo dining. Scroll through our real photo showcase to preview our warm lighting and dining spaces.
          </p>
          <a
            href="#/gallery"
            style={{
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: '0.5rem',
            }}
          >
            Explore Full Gallery &rarr;
          </a>
        </div>
      </motion.div>

      {/* Visual Stories - 5 Video Reels Preview (Scroll triggered) */}
      <motion.div
        variants={scrollSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          marginTop: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Culinary Motion
            </span>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0.25rem 0 0 0' }}>
              Stories from the Kitchen & Lounge
            </h3>
          </div>
          <a
            href="#/gallery"
            style={{
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            All Videos &rarr;
          </a>
        </div>

        {/* Videos Horizontal Row */}
        <div
          ref={rowRef}
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            scrollbarWidth: 'thin',
            width: '100%',
          }}
          className="home-videos-row"
        >
          {[
            { id: 's1', url: './images/s1.mp4' },
            { id: 's2', url: './images/s2.mp4' },
            { id: 's4', url: './images/s4.mp4' },
            { id: 's5', url: './images/s5.mp4' },
            { id: 's7', url: './images/s7.mp4' },
          ].map((vid) => {
            const isActive = activeVideoId === vid.id;
            return (
              <div
                key={vid.id}
                className="glass-panel interactive-card"
                style={{
                  padding: '0.35rem',
                  borderRadius: '14px',
                  minWidth: '200px',
                  width: '200px',
                  flexShrink: 0,
                  position: 'relative',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                  boxShadow: isActive ? '0 8px 24px rgba(197, 160, 89, 0.2)' : 'none',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => { window.location.hash = `#/gallery?video=${vid.id}`; }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '280px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#000',
                  }}
                >
                  <video
                    ref={(el) => { videoRefs.current[vid.id] = el; }}
                    src={vid.url}
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    onMouseEnter={() => {
                      isHovering.current = true;
                      setActiveVideoId(vid.id);
                    }}
                    onMouseLeave={() => {
                      isHovering.current = false;
                      setActiveVideoId(null);
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '0.7rem',
                      boxShadow: isActive ? '0 0 10px var(--accent-gold)' : 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    {isActive ? '⏸' : '▶'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Inline media query style overrides */}
      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
          .hero-canvas-container {
            height: 550px !important;
          }
        }
        @media (min-width: 768px) {
          .ambience-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </div>
  );
};
