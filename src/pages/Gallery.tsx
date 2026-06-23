import React, { useState, useEffect, useRef } from 'react';
import { SEO } from '../components/SEO';
import { Heart, MessageCircle, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  likes: number;
  comments: number;
  instagramUrl?: string;
}

export const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'image' | 'video'>('all');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (window.location.hash.includes('?video=')) {
      window.location.hash = '#/gallery';
    }
  };

  // Select video from homepage redirect URL parameter
  useEffect(() => {
    const handleHashParam = () => {
      const hash = window.location.hash;
      const match = hash.match(/\?video=([\w-]+)/);
      if (match) {
        const videoId = match[1];
        setActiveCategory('video');
        
        // Find index in video filter list
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

  // Unified Gallery Items (13 Google Maps images + 14 Instagram posts/reels)
  const galleryItems: GalleryItem[] = [
    // Google Maps Photos (g1 to g13)
    {
      id: 'g1',
      type: 'image',
      url: './images/g1.jpg',
      caption: 'Sophisticated dining setup featuring custom green wall accents and amber lighting.',
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
      caption: 'Elegant green lattices and comfy seating arrangement for large families.',
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
      caption: 'Warm wooden panelling and modern architectural arches matching the sanctuary theme.',
      likes: 198,
      comments: 22,
    },
    {
      id: 'g7',
      type: 'image',
      url: './images/g7.jpg',
      caption: 'Table service prepared for group dining and special corporate events.',
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
      caption: 'Perfect charcoal tandoor roast. Freshly grilled kebabs.',
      likes: 567,
      comments: 48,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DXRsKKXj5fB/',
    },
    {
      id: 's12',
      type: 'image',
      url: './images/s12.jpg',
      caption: 'Authentic presentation. Saffron rice and lamb chops wazwan style.',
      likes: 412,
      comments: 36,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/p/DXPIA5OCZpk/',
    },
    {
      id: 's13',
      type: 'video',
      url: './images/s13.mp4',
      caption: 'The wazas preparing the famous gushtaba curd gravy.',
      likes: 721,
      comments: 84,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DXE0hZ7CQFJ/',
    },
    {
      id: 's14',
      type: 'video',
      url: './images/s14.mp4',
      caption: 'Vibe check: Sarmista Acharya visiting the Balgarden space.',
      likes: 853,
      comments: 98,
      instagramUrl: 'https://www.instagram.com/sarmista_acharya_official/reel/DVD4XrUEh7H/',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.type === activeCategory;
  });

  // Video refs for scroll focus & hover autoplay
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const isHoveringVideoRef = useRef<boolean>(false);

  // Recalculates which video is closest to the vertical center of the viewport and sets it active
  const recalculateCenterVideo = () => {
    if (isHoveringVideoRef.current) return;

    const viewportCenter = window.innerHeight / 2;
    let closestVideoId: string | null = null;
    let minDistance = Infinity;

    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (video) {
        const rect = video.getBoundingClientRect();
        const videoCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - videoCenter);
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && distance < minDistance) {
          minDistance = distance;
          closestVideoId = id;
        }
      }
    });

    setActiveVideoId(closestVideoId);
  };

  // Synchronize play/pause across all videos based on activeVideoId
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (video) {
        if (id === activeVideoId) {
          // Play active video (muted by default unless unmuted by hover)
          video.play().catch((err) => console.log('Autoplay blocked for:', id, err));
        } else {
          // Pause all other videos
          video.pause();
        }
      }
    });
  }, [activeVideoId]);

  // Monitor scroll stopping to update the center-focused video
  useEffect(() => {
    let scrollTimeout: number;

    const handleScroll = () => {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        recalculateCenterVideo();
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check once items are rendered
    const initTimeout = setTimeout(recalculateCenterVideo, 250);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(scrollTimeout);
      clearTimeout(initTimeout);
    };
  }, [activeCategory]); // Re-run when active category changes to recalculate visible videos

  // Auto-play the video in the lightbox when it opens
  useEffect(() => {
    if (lightboxIndex !== null) {
      const item = filteredItems[lightboxIndex];
      if (item && item.type === 'video') {
        setTimeout(() => {
          if (lightboxVideoRef.current) {
            lightboxVideoRef.current.muted = false;
            lightboxVideoRef.current.play().catch((err) => {
              console.log("Lightbox autoplay unmuted blocked, falling back to muted:", err);
              if (lightboxVideoRef.current) {
                lightboxVideoRef.current.muted = true;
                lightboxVideoRef.current.play().catch((e) => console.log("Muted fallback failed:", e));
              }
            });
          }
        }, 150);
      }
    }
  }, [lightboxIndex]);

  // Video hover controls: set as activeVideoId, try to play unmuted
  const handleVideoMouseEnter = (id: string) => {
    isHoveringVideoRef.current = true;
    const video = videoRefs.current[id];
    if (video) {
      video.muted = false;
      setActiveVideoId(id);
      video.play().catch(() => {
        if (video) {
          video.muted = true;
          video.play().catch((e) => console.log("Muted play failed:", e));
        }
      });
    }
  };

  const handleVideoMouseLeave = (id: string) => {
    isHoveringVideoRef.current = false;
    const video = videoRefs.current[id];
    if (video) {
      video.muted = true;
    }
    recalculateCenterVideo();
  };

  // Lightbox slideshow navigation
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

      {/* Gallery Grid - Displays Filtered Items */}
      <div className="grid-container grid-3" style={{ animation: 'fadeIn 0.8s ease forwards' }}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="glass-panel"
            style={{
              padding: item.type === 'video' ? '0' : '0.75rem',
              borderRadius: '16px',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: item.type === 'video' ? '0' : '0.75rem',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setLightboxIndex(index)}
          >
            {/* Visual Frame */}
            <div
              style={{
                width: '100%',
                height: '380px',
                borderRadius: item.type === 'video' ? '16px' : '12px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#000',
              }}
              onMouseEnter={() => item.type === 'video' && handleVideoMouseEnter(item.id)}
              onMouseLeave={() => item.type === 'video' && handleVideoMouseLeave(item.id)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              ) : (
                <div style={{ width: '100%', height: '100%' }}>
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRefs.current[item.id] = el;
                      } else {
                        delete videoRefs.current[item.id];
                      }
                    }}
                    src={item.url}
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
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

              {/* Instagram brand colored tag overlay */}
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
                    color: '#E1306C', /* Instagram Pink Brand Color */
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
                  {/* Real Instagram SVG Brand Icon */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  Instagram Link
                </a>
              )}
            </div>

            {/* Interaction details (only visible for images) */}
            {item.type !== 'video' && (
              <div style={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    marginBottom: '0.75rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.caption}
                </p>
                
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '0.6rem',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Heart size={14} style={{ color: '#E1306C' }} />
                    {item.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MessageCircle size={14} />
                    {item.comments}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Slideshow Modal */}
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
                  maxHeight: '65vh',
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
                  maxHeight: '65vh',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                }}
              />
            )}
            
            {/* Caption (Images only) */}
            {filteredItems[lightboxIndex].type === 'image' && (
              <p
                style={{
                  color: '#f2f7f4',
                  fontSize: '0.95rem',
                  textAlign: 'center',
                  maxWidth: '600px',
                  lineHeight: '1.6',
                  textShadow: '0 1px 5px rgba(0,0,0,0.5)',
                }}
              >
                {filteredItems[lightboxIndex].caption}
              </p>
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
};
