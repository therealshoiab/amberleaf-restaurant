import React, { useState, useEffect, useRef } from 'react';
import { SEO } from '../components/SEO';
import { Heart, MessageCircle, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption: string;
  likes: number;
  comments: number;
  instagramUrl?: string;
  aspect?: string;
}

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vibe' | 'social'>('vibe');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Vibe Gallery Items
  const vibeItems: GalleryItem[] = [
    {
      id: 'v1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      caption: 'Warm amber-glowing interiors designed for cozy dining experiences.',
      likes: 124,
      comments: 18,
    },
    {
      id: 'v2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      caption: 'Our modern glassmorphic table setups matching Balgarden vibe.',
      likes: 198,
      comments: 24,
    },
    {
      id: 'v3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      caption: 'A fresh cup of organic Kashmiri Kahwa brewed in our copper samovar.',
      likes: 310,
      comments: 42,
    },
    {
      id: 'v4',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
      caption: 'Succulent Tandoori Kebabs roasted over hot charcoal pits.',
      likes: 245,
      comments: 31,
    },
    {
      id: 'v5',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80',
      caption: 'A traditional Rogan Josh curry prepared by our master wazas.',
      likes: 289,
      comments: 38,
    },
    {
      id: 'v6',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
      caption: 'Zafrani Phirni chilled to perfection in clay kasoras.',
      likes: 156,
      comments: 12,
    },
  ];

  // Social Hub Items (Instagram Posts & Reels)
  const socialItems: GalleryItem[] = [
    {
      id: 's1',
      type: 'video',
      url: 'https://player.vimeo.com/external/384775870.sd.mp4?s=d072b22ec6f70912181bc747e9ad4fa3b073570c&profile_id=165&oauth2_token_id=57447761', // stock video chef plating
      caption: 'Crafting our signature plates. Watch the artistry that goes into every single Wazwan course.',
      likes: 432,
      comments: 65,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DYKPVgyJbwN/',
    },
    {
      id: 's2',
      type: 'video',
      url: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27dbceeddc8085449efcf40074c35e8d89e4726&profile_id=165&oauth2_token_id=57447761', // stock coffee pouring
      caption: 'Espresso drops and warm milk. Pouring fresh morning energy at our Nursing Garh cafe counter.',
      likes: 312,
      comments: 29,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DX_9qy9pXc8/',
    },
    {
      id: 's3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      caption: 'The fine art of hospitality. Book your private table and family spaces at Amberleaf today.',
      likes: 540,
      comments: 78,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/p/DX9ddTkiSz6/',
    },
    {
      id: 's4',
      type: 'video',
      url: 'https://player.vimeo.com/external/517602126.sd.mp4?s=c83ccf24e2300b9573f0896014e7a68a2bf68297&profile_id=165&oauth2_token_id=57447761', // stock cocktail
      caption: 'Pouring the gold. Saffron Mint Cooler Mocktail bringing refreshing saffron syrup overlays.',
      likes: 671,
      comments: 92,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DX1rANyJFqs/',
    },
    {
      id: 's5',
      type: 'video',
      url: 'https://player.vimeo.com/external/454530008.sd.mp4?s=be8e65842881a5a0ebca7780072b05b63bc5a93d&profile_id=165&oauth2_token_id=57447761', // stock grilling
      caption: 'Sizzling hot charcoal grills. The smoky aroma of our Mutton Seekh Kebabs rising in the tandoor.',
      likes: 812,
      comments: 110,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/reel/DXt9PYaiQEe/',
    },
    {
      id: 's6',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
      caption: 'A spoonful of Zafrani Phirni is all it takes to complete a royal Kashmiri meal.',
      likes: 398,
      comments: 41,
      instagramUrl: 'https://www.instagram.com/amberleafsgr/p/DXrdiYfCRot/',
    },
  ];

  // Active items based on tab
  const activeItems = activeTab === 'vibe' ? vibeItems : socialItems;

  // Video refs for scroll play / pause
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    if (activeTab !== 'social') return;

    // Create Intersection Observer to autoplay videos when scrolled into view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Trigger play when 60% of video card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          // Play video muted automatically when in viewport
          video.play().catch((err) => console.log('Autoplay blocked:', err));
        } else {
          video.pause();
        }
      });
    }, observerOptions);

    // Register video elements
    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  // Video hover controls: play unmuted on hover, pause/mute on hover out
  const handleVideoMouseEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.muted = false;
      video.play().catch((err) => console.log(err));
    }
  };

  const handleVideoMouseLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.muted = true;
      video.pause(); // Pause and mute on hover out
    }
  };

  // Lightbox slideshow navigation
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? activeItems.length - 1 : lightboxIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === activeItems.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <div className="page-container">
      <SEO
        title="Visual Gallery"
        description="Explore the cozy glassmorphic atmosphere of Amberleaf Restaurant in Srinagar. View our food gallery, Instagram reels, and customer moments in our social hub."
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
          Amberleaf Life
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Atmosphere & Hub</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Tabs Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
        }}
      >
        <button
          onClick={() => setActiveTab('vibe')}
          style={{
            background: activeTab === 'vibe' ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.02)',
            color: activeTab === 'vibe' ? '#000' : 'var(--text-primary)',
            border: '1px solid',
            borderColor: activeTab === 'vibe' ? 'var(--accent-gold)' : 'var(--border-light)',
            padding: '0.6rem 1.8rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Cafe Vibe
        </button>

        <button
          onClick={() => setActiveTab('social')}
          style={{
            background: activeTab === 'social' ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.02)',
            color: activeTab === 'social' ? '#000' : 'var(--text-primary)',
            border: '1px solid',
            borderColor: activeTab === 'social' ? 'var(--accent-gold)' : 'var(--border-light)',
            padding: '0.6rem 1.8rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Social Hub
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid-container grid-3" style={{ animation: 'fadeIn 0.8s ease forwards' }}>
        {activeItems.map((item, index) => (
          <div
            key={item.id}
            className="glass-panel"
            style={{
              padding: '0.75rem',
              borderRadius: '16px',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setLightboxIndex(index)}
          >
            {/* Visual Frame */}
            <div
              style={{
                width: '100%',
                height: activeTab === 'social' && item.type === 'video' ? '380px' : '240px',
                borderRadius: '12px',
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
                    ref={(el) => { videoRefs.current[item.id] = el; }}
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

              {/* Instagram tag overlay */}
              {activeTab === 'social' && item.instagramUrl && (
                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(10, 9, 7, 0.85)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--accent-gold)',
                    borderRadius: '9999px',
                    padding: '0.3rem 0.8rem',
                    fontSize: '0.7rem',
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    zIndex: 4,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  Open Link
                </a>
              )}
            </div>

            {/* Interaction details */}
            <div style={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
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
                  gap: '1rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '0.5rem',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Heart size={14} style={{ color: 'var(--accent-gold)' }} />
                  {item.likes} likes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MessageCircle size={14} />
                  {item.comments} comments
                </span>
              </div>
            </div>
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
            backgroundColor: 'rgba(10, 9, 7, 0.95)',
            backdropFilter: 'blur(15px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Trigger */}
          <button
            onClick={() => setLightboxIndex(null)}
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
            {activeItems[lightboxIndex].type === 'image' ? (
              <img
                src={activeItems[lightboxIndex].url}
                alt={activeItems[lightboxIndex].caption}
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
                src={activeItems[lightboxIndex].url}
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
            
            {/* Caption */}
            <p
              style={{
                color: '#f5f3ef',
                fontSize: '0.95rem',
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: '1.6',
                textShadow: '0 1px 5px rgba(0,0,0,0.5)',
              }}
            >
              {activeItems[lightboxIndex].caption}
            </p>
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
