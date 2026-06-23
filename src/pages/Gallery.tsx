import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  likes: number;
  comments: number;
  instagramUrl?: string;
}

export const Gallery: React.FC = React.memo(() => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'image' | 'video'>('all');
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (window.location.hash.includes('?video=')) {
      window.location.hash = '#/gallery';
    }
  };

  // Unified Gallery Items (13 Google Maps images + 14 Instagram posts/reels)
  const galleryItems: GalleryItem[] = [
    // Google Maps Photos (g1 to g13)
    {
      id: 'g1',
      type: 'image',
      url: './images/g1.jpg',
      caption: 'Sophisticated dining setup featuring custom green wall accents.',
      likes: 184,
      comments: 15,
    },
    {
      id: 'g2',
      type: 'image',
      url: './images/g2.jpg',
      caption: 'Perfect table detailing ready for our evening fine dining guests.',
      likes: 142,
      comments: 11,
    },
    {
      id: 'g3',
      type: 'image',
      url: './images/g3.jpg',
      caption: 'Overview of our spacious main dining hall in Balgarden, Srinagar.',
      likes: 219,
      comments: 29,
    },
    {
      id: 'g4',
      type: 'image',
      url: './images/g4.jpg',
      caption: 'Elegant green lattices and comfy seating arrangement.',
      likes: 253,
      comments: 31,
    },
    {
      id: 'g5',
      type: 'image',
      url: './images/g5.jpg',
      caption: 'Cosy seating booth framed by beautiful ambient drop lights.',
      likes: 167,
      comments: 14,
    },
    {
      id: 'g6',
      type: 'image',
      url: './images/g6.jpg',
      caption: 'Warm wooden panelling and modern architectural arches.',
      likes: 198,
      comments: 22,
    },
    {
      id: 'g7',
      type: 'image',
      url: './images/g7.jpg',
      caption: 'Table service prepared for group dining.',
      likes: 175,
      comments: 19,
    },
    {
      id: 'g8',
      type: 'image',
      url: './images/g8.jpg',
      caption: 'Our signature traditional Wazwan platter served fresh.',
      likes: 342,
      comments: 48,
    },
    {
      id: 'g9',
      type: 'image',
      url: './images/g9.jpg',
      caption: 'Succulent mutton seekh starter with mint sauce and fresh onions.',
      likes: 289,
      comments: 35,
    },
    {
      id: 'g10',
      type: 'image',
      url: './images/g10.jpg',
      caption: 'Traditional copper samovar brewing authentic hot saffron Kahwa.',
      likes: 412,
      comments: 61,
    },
    {
      id: 'g11',
      type: 'image',
      url: './images/g11.jpg',
      caption: 'Silky butter chicken served in copper bowls with fresh naans.',
      likes: 320,
      comments: 41,
    },
    {
      id: 'g12',
      type: 'image',
      url: './images/g12.jpg',
      caption: 'Sweet Zafrani Phirni dessert chilled to perfection.',
      likes: 198,
      comments: 18,
    },
    {
      id: 'g13',
      type: 'image',
      url: './images/g13.jpg',
      caption: 'Smoky grilled chicken tandoori cuts straight from the clay oven.',
      likes: 275,
      comments: 24,
    },

    // Instagram Posts & Reels (s1 to s14)
    {
      id: 's1',
      type: 'video',
      url: './images/s1.mp4',
      caption: 'Behind the scenes: Chef plating our signature Wazwan delicacies.',
      likes: 432,
      comments: 65,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DYKPVgyJbwN/',
    },
    {
      id: 's2',
      type: 'video',
      url: './images/s2.mp4',
      caption: 'Sip the morning brew. Perfect espresso pours at the Balgarden counter.',
      likes: 312,
      comments: 29,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DX_9qy9pXc8/',
    },
    {
      id: 's3',
      type: 'image',
      url: './images/s3.jpg',
      caption: 'Dine under the warmth of modern emerald lattices. Book your table.',
      likes: 540,
      comments: 78,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/p/DX9ddTkiSz6/',
    },
    {
      id: 's4',
      type: 'video',
      url: './images/s4.mp4',
      caption: 'Pouring our Saffron Cooler mocktail. Sparkling mint refreshment.',
      likes: 671,
      comments: 92,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DX1rANyJFqs/',
    },
    {
      id: 's5',
      type: 'video',
      url: './images/s5.mp4',
      caption: 'Sizzling charcoal flames roasting our juicy mutton seekhs.',
      likes: 812,
      comments: 110,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DXt9PYaiQEe/',
    },
    {
      id: 's6',
      type: 'image',
      url: './images/s6.jpg',
      caption: 'Our royal Zafrani Phirni chilled dessert served in clay kasoras.',
      likes: 398,
      comments: 41,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/p/DXrdiYfCRot/',
    },
    {
      id: 's7',
      type: 'video',
      url: './images/s7.mp4',
      caption: 'Artisan coffee beans ground fresh for every cup.',
      likes: 245,
      comments: 15,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DXj4Ed7iV2a/',
    },
    {
      id: 's8',
      type: 'video',
      url: './images/s8.mp4',
      caption: 'Review by Sarmista Acharya. Tasting the Wazwan courses.',
      likes: 912,
      comments: 142,
      instagramUrl: 'https://www.instagram.com/sarmista_acharya_official/reel/DXjyb8oib49/',
    },
    {
      id: 's9',
      type: 'image',
      url: './images/s9.jpg',
      caption: 'Our ambient green wood structures. Designed for memorable dates.',
      likes: 512,
      comments: 63,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/p/DXecUTcibab/',
    },
    {
      id: 's10',
      type: 'video',
      url: './images/s10.mp4',
      caption: 'Pouring traditional saffron mojito over compressed mint.',
      likes: 432,
      comments: 31,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DXb3kQzias_/',
    },
    {
      id: 's11',
      type: 'video',
      url: './images/s11.mp4',
      caption: 'Our aesthetic cafe counter waiting for your afternoon visits.',
      likes: 412,
      comments: 29,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/p/DXW5R5nif3v/',
    },
    {
      id: 's12',
      type: 'image',
      url: './images/s12.jpg',
      caption: 'Premium dining ambiance preview with guest smiles.',
      likes: 954,
      comments: 184,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DXV9fW0ih1o/',
    },
    {
      id: 's13',
      type: 'video',
      url: './images/s13.mp4',
      caption: 'Aesthetic corners. Kashmiri fine dining redefined in Srinagar.',
      likes: 480,
      comments: 39,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/p/DXTVbA0iWlB/',
    },
    {
      id: 's14',
      type: 'video',
      url: './images/s14.mp4',
      caption: 'Steaming Dum Mutton Biryani opened fresh at the guest table.',
      likes: 1102,
      comments: 164,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DXOC-DNi0fI/',
    },
  ];

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.type === activeCategory);
  }, [activeCategory]);

  // Select video from homepage redirect URL parameter
  useEffect(() => {
    const handleHashParam = () => {
      const hash = window.location.hash;
      const match = hash.match(/\?video=([\w-]+)/);
      if (match) {
        const videoId = match[1];
        setActiveCategory('video');
        
        // Find index in video list
        const videoItems = galleryItems.filter((item) => item.type === 'video');
        const idx = videoItems.findIndex((item) => item.id === videoId);
        if (idx !== -1) {
          setLightboxIndex(idx);
        }
      }
    };

    handleHashParam();
    window.addEventListener('hashchange', handleHashParam);
    return () => window.removeEventListener('hashchange', handleHashParam);
  }, []);

  // Keyboard navigation & escape listener for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Video hover triggers
  const handleVideoMouseEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.muted = true;
      video.play().catch((e) => console.log("Muted autoplay blocked:", e));
    }
  };

  const handleVideoMouseLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
  };

  // Parallax 3D tilt effects
  const handleMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>, itemId: string) => {
    const card = cardRefs.current[itemId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const maxTilt = 8;
    const rotateX = -normalizedY * maxTilt;
    const rotateY = normalizedX * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = '0 15px 35px rgba(197, 160, 89, 0.15)';
  };

  const handleMouseLeaveTilt = (itemId: string) => {
    const card = cardRefs.current[itemId];
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = 'none';
  };

  return (
    <div className="page-container">
      <SEO
        title="Gallery Showcase"
        description="Browse the complete gallery of Amberleaf Restaurant. Check out our real dine-in ambiance, Kashmiri wazwan courses, and guest reviews."
      />

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in">
        <span
          style={{
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Visual Showcase
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Ambiance & Culinary Gallery</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Category Tabs */}
      <div className="gallery-tab-container">
        {[
          { id: 'all', label: 'All Media' },
          { id: 'image', label: 'Photos' },
          { id: 'video', label: 'Videos' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`gallery-tab-btn ${activeCategory === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(tab.id as any);
              closeLightbox();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 6. Masonry Grid - Displays Filtered Items */}
      <div className="masonry-grid" style={{ animation: 'fadeIn 0.8s ease forwards' }}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { cardRefs.current[item.id] = el; }}
            className="glass-panel masonry-item shimmer-card"
            onMouseMove={(e) => handleMouseMoveTilt(e, item.id)}
            onMouseLeave={() => handleMouseLeaveTilt(item.id)}
            style={{
              padding: '0',
              borderRadius: '16px',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              transition: 'transform 0.1s ease, box-shadow 0.2s ease',
              position: 'relative',
            }}
            onClick={() => setLightboxIndex(index)}
          >
            {/* Visual Frame */}
            <div
              style={{
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={() => item.type === 'video' && handleVideoMouseEnter(item.id)}
              onMouseLeave={() => item.type === 'video' && handleVideoMouseLeave(item.id)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.caption}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                />
              ) : (
                <div style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <video
                    ref={(el) => { videoRefs.current[item.id] = el; }}
                    src={item.url}
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                  {/* Playing indicators */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: '50%',
                      padding: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      zIndex: 3,
                    }}
                  >
                    <Play size={12} fill="#fff" />
                  </div>
                </div>
              )}

              {/* Instagram link overlay if present */}
              {item.instagramUrl && (
                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(10, 9, 7, 0.95)',
                    border: '1px solid rgba(225, 48, 108, 0.25)',
                    color: '#E1306C',
                    borderRadius: '9999px',
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    zIndex: 4,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = '#E1306C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#E1306C';
                    e.currentTarget.style.backgroundColor = 'rgba(10, 9, 7, 0.95)';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  Instagram Link
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Slideshow Modal */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 8, 6, 0.96)',
            backdropFilter: 'blur(15px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeLightbox}
        >
          {/* Close Trigger */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              borderRadius: '50%',
              padding: '0.6rem',
              display: 'flex',
            }}
          >
            <X size={20} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '2rem',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              borderRadius: '50%',
              padding: '0.6rem',
              display: 'flex',
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Media Container */}
          <div
            style={{
              maxWidth: '85vw',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems[lightboxIndex].type === 'image' ? (
              <img
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].caption}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                }}
              />
            ) : (
              <video
                ref={lightboxVideoRef}
                src={filteredItems[lightboxIndex].url}
                controls
                autoPlay
                playsInline
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                }}
              />
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '2rem',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              borderRadius: '50%',
              padding: '0.6rem',
              display: 'flex',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
});
