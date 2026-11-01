import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import {
  Star,
  Utensils,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Send,
  Volume2,
  VolumeX,
  CheckCircle2,
  PenTool,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KASHMIRI_REVIEWS, type GuestReview } from '../data/reviewsData';

interface FAQItem {
  question: string;
  answer: string;
}

export const Home: React.FC = () => {
  // --- 1. HERO SLIDESHOW STATE ---
  const sanctuaryImages = [
    './images/amberleaf-vibe.jpg',
    './images/g1.jpg',
    './images/g2.jpg',
    './images/g3.jpg',
    './images/g4.jpg',
    './images/g5.jpg',
    './images/g6.jpg',
    './images/g7.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sanctuaryImages.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [sanctuaryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sanctuaryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sanctuaryImages.length) % sanctuaryImages.length);
  };

  // --- 2. 6 CULINARY VIDEOS (2 ROWS OF 3 VIDEOS IN 9:16) ---
  const homeVideos = [
    { id: 's1', url: './images/s1.mp4', title: 'The Royal Samovar Brew', tag: 'Artisanal Kahwa' },
    { id: 's2', url: './images/s2.mp4', title: 'Pounding the Velvet Rista', tag: 'Master Wazwan' },
    { id: 's4', url: './images/s4.mp4', title: 'Fiery Charcoal Tandoor', tag: 'Tandoori Grills' },
    { id: 's5', url: './images/s5.mp4', title: 'Gushtaba Curd & Mint Simmer', tag: 'Royal Feast' },
    { id: 's7', url: './images/s7.mp4', title: 'Signature Mocktail Pour', tag: 'Beverage Bar' },
    { id: 's8', url: './images/s8.mp4', title: 'Evening Ambiance at Balgarden', tag: 'Fine Dining' },
  ];

  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({
    s1: true,
    s2: true,
    s4: true,
    s5: true,
    s7: true,
    s8: true,
  });

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- 3. FAQ ACCORDION STATE ---
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqItems: FAQItem[] = [
    {
      question: 'What are your operational timings?',
      answer: 'Amberleaf is open daily from 09:00 AM to 10:30 PM. We serve breakfast, brunch, lunch, dinner, and late-night artisan dessert bites.',
    },
    {
      question: 'Is your food 100% Halal certified?',
      answer: 'Yes. All our meats are sourced exclusively from trusted certified suppliers, and all ingredients used across our entire culinary menu are 100% Halal.',
    },
    {
      question: 'Do you offer private dining rooms for groups and families?',
      answer: 'Absolutely. We have private dining sanctuaries designed specifically for family banquets and business groups. You can book in advance by filling out our Table Reservation form.',
    },
    {
      question: 'Is there parking space available?',
      answer: 'Yes, we offer both a dedicated on-site parking lot and complimentary street parking close to our entrance at 310, Balgarden, Srinagar.',
    },
    {
      question: 'How does your Table Reservation work?',
      answer: 'When you confirm your reservation on our website, your booking details transmit directly to our host desk and WhatsApp concierge, ensuring instant table allocation.',
    },
    {
      question: 'Can I order online for delivery or curbside pickup?',
      answer: 'Yes, we are listed on Swiggy and Zomato for prompt home delivery. For takeaway, simply call +91 60063 79610 twenty minutes in advance and our crew will deliver your sealed order straight to your car at our Balgarden curbside.',
    },
    {
      question: 'Do you cater to dietary restrictions or vegetarian preferences?',
      answer: 'Yes, our menu features clearly labeled vegetarian and non-vegetarian selections. If you have specific dietary needs, please notify our team when ordering.',
    },
  ];

  // --- 4. REVIEWS & TESTIMONIALS STATE (50+ Kashmiri Reviews & Modal) ---
  const [reviewsList, setReviewsList] = useState<GuestReview[]>(() => {
    try {
      const saved = localStorage.getItem('amberleaf_kashmiri_reviews_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 50) return parsed;
      }
    } catch {}
    return KASHMIRI_REVIEWS;
  });

  const [selectedReviewCategory, setSelectedReviewCategory] = useState<string>('All');
  const [visibleReviewCount, setVisibleReviewCount] = useState<number>(8);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Dine-In');
  const [newCategory, setNewCategory] = useState<'Wazwan' | 'Starters' | 'Biryani' | 'Beverages' | 'Ambiance'>('Wazwan');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: GuestReview = {
      id: `rev_${Date.now()}`,
      name: newName.trim(),
      diningType: newType,
      category: newCategory,
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
      verified: true,
    };

    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);
    try {
      localStorage.setItem('amberleaf_kashmiri_reviews_v1', JSON.stringify(updated));
    } catch {}

    setReviewSuccess(true);
    setNewName('');
    setNewComment('');

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });

    setTimeout(() => {
      setReviewSuccess(false);
      setIsReviewModalOpen(false);
    }, 2200);
  };

  const scrollSectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="home-page-root" style={{ width: '100%', position: 'relative', overflowX: 'hidden' }}>
      <SEO
        title="Home"
        description="Welcome to Amberleaf Restaurant in Srinagar. Experience modern fine dining, authentic Kashmiri specialties, and artisanal mocktails in an elegant glassmorphic ambiance."
      />

      {/* 1. Film Grain Noise Overlay */}
      <div className="noise-overlay" />

      {/* =========================================================================
          HERO SLIDESHOW SECTION (EDGE-TO-EDGE FULLSCREEN LIKE MEYDANI CAFE)
      ========================================================================= */}
      <section
        className="hero-fullscreen-section"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
          padding: '115px 1.5rem 4rem 1.5rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Slideshow Background Images - High Clarity & Quality */}
        {sanctuaryImages.map((img, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === idx ? 1 : 0,
              transform: currentSlide === idx ? 'scale(1.03)' : 'scale(1.0)',
              transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 7s ease-out',
              zIndex: 1,
            }}
          />
        ))}

        {/* Clear Luxury Vignette Overlay (NO blur for maximum image sharpness & quality) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.22) 35%, rgba(0, 0, 0, 0.38) 65%, rgba(4, 9, 6, 0.88) 100%)',
            zIndex: 2,
          }}
        />

        {/* Slideshow Left & Right Arrow Navigation (Edge Aligned) */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--accent-gold)',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
            e.currentTarget.style.color = 'var(--accent-gold)';
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          style={{
            position: 'absolute',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--accent-gold)',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
            e.currentTarget.style.color = 'var(--accent-gold)';
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Slideshow Dot Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '3.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.6rem',
            zIndex: 10,
          }}
        >
          {sanctuaryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: currentSlide === i ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentSlide === i ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* =========================================================================
            CENTERED HERO TYPOGRAPHY & CALL TO ACTIONS (MEYDANI CAFE STYLE)
        ========================================================================= */}
        <div
          className="hero-center-content"
          style={{
            position: 'relative',
            zIndex: 5,
            maxWidth: '920px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
          }}
        >
          {/* Grand Restaurant Title */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
            <span
              style={{
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                letterSpacing: '0.25em',
                fontWeight: 800,
                display: 'block',
              }}
            >
              Welcome to
            </span>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.7rem, 6.5vw, 4.8rem)',
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textShadow: '0 4px 25px rgba(0,0,0,0.9)',
              }}
            >
              Amberleaf Fine Dine
            </h1>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                letterSpacing: '0.12em',
                margin: '0.2rem 0 0 0',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                fontWeight: 500,
              }}
            >
              310, Balgarden, Srinagar
            </p>
          </div>


          {/* Description */}
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.88)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
              lineHeight: '1.75',
              maxWidth: '760px',
              margin: '0.25rem auto',
              textShadow: '0 2px 12px rgba(0,0,0,0.9)',
            }}
          >
            Located in the heart of Srinagar, Amberleaf merges cozy glassmorphic aesthetics with a premium, multi-cuisine dining experience. Indulge in our masterfully crafted Kashmiri Wazwan, fiery tandoor starters, and signature artisanal beverages.
          </p>

          {/* Call to Actions (Meydani Cafe Style) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              justifyContent: 'center',
              marginTop: '1.5rem',
            }}
          >
            <a href="#/contact" className="meydani-cta-primary">
              <Calendar size={18} />
              Book a Table
            </a>
            <a href="#/menu" className="meydani-cta-secondary">
              <Utensils size={18} />
              Explore Menu
            </a>
          </div>
        </div>


      </section>

      {/* =========================================================================
          INFINITE HORIZONTAL MARQUEE TICKER (FULL WIDTH)
      ========================================================================= */}
      <div id="marquee-anchor" className="marquee-container" style={{ margin: 0 }}>
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

      {/* =========================================================================
          PAGE CONTENT WRAPPER: VIDEOS (9:16), FAQ & REVIEWS
      ========================================================================= */}
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '4rem 1.5rem 6rem 1.5rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* =========================================================================
            CULINARY MOTION - 6 VIDEOS ON 2 LINES (3 VIDEOS PER LINE, 9:16 RATIO)
        ========================================================================= */}
        <motion.div
          variants={scrollSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Culinary Motion
              </span>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: 'var(--text-primary)', margin: '0.25rem 0 0 0' }}>
                Stories from the Kitchen &amp; Lounge
              </h3>
            </div>
            <a
              href="#/gallery"
              style={{
                color: 'var(--accent-gold)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              All Videos &amp; Gallery &rarr;
            </a>
          </div>

          {/* 6 Videos Grid: 2 Lines of 3 Videos in 9:16 Aspect Ratio */}
          <div className="home-videos-grid-3x2">
            {homeVideos.map((vid) => {
              const isMuted = mutedVideos[vid.id] ?? true;
              return (
                <div key={vid.id} className="video-card-9-16">
                  <video
                    src={vid.url}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* Category Pill Tag */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(197, 160, 89, 0.35)',
                      textTransform: 'uppercase',
                      zIndex: 3,
                    }}
                  >
                    {vid.tag}
                  </span>

                  {/* Sound Toggle Button */}
                  <button
                    onClick={(e) => toggleMute(vid.id, e)}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: isMuted ? '#ffffff' : 'var(--accent-gold)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 3,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
                      e.currentTarget.style.color = isMuted ? '#ffffff' : 'var(--accent-gold)';
                    }}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  {/* Bottom Gradient Scrim with Title */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '3rem 1.25rem 1.25rem 1.25rem',
                      background:
                        'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '1.08rem',
                        color: '#ffffff',
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                      }}
                    >
                      {vid.title}
                    </h4>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        color: 'var(--accent-gold)',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      9:16 Cinematic Motion
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      {/* =========================================================================
          COMBINED SECTION 1: FREQUENTLY ASKED QUESTIONS (FAQ)
      ========================================================================= */}
      <motion.div
        id="faq"
        variants={scrollSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        style={{
          marginTop: '6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              color: 'var(--accent-gold)',
              fontSize: '0.8rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Got Questions?
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            Frequently Asked Questions
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              backgroundColor: 'var(--accent-gold)',
              margin: '1rem auto 0 auto',
            }}
          />
        </div>

        {/* FAQ Accordion List */}
        <div
          style={{
            width: '100%',
            maxWidth: '900px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-panel"
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: isOpen ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: isOpen ? 'var(--accent-gold)' : 'var(--text-secondary)',
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.75rem 1.5rem 3.25rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: '1.7',
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '1rem',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>


        {/* =========================================================================
            COMBINED SECTION 2: GUEST EXPERIENCES & REVIEWS (MATCHING REFERENCE IMAGE 3)
        ========================================================================= */}
        <motion.div
          id="reviews"
          variants={scrollSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            marginTop: '6rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                color: 'var(--accent-gold)',
                fontSize: '0.8rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Guest Voices
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                marginTop: '0.5rem',
                color: 'var(--text-primary)',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
              }}
            >
              Epicurean Testimonials
            </h2>
            <div
              style={{
                width: '60px',
                height: '2px',
                backgroundColor: 'var(--accent-gold)',
                margin: '1rem auto 0 auto',
              }}
            />
          </div>

          {/* Rating Summary & Unique "Write a Review" Action Bar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '2rem',
              padding: '1.25rem 2rem',
              borderRadius: '20px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
            className="home-reviews-header-bar"
          >
            {/* Left: Overall Rating Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill="#16a34a" color="#16a34a" />
                ))}
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  4.9 / 5 Guest Rating
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                  ({reviewsList.length}+ Verified Kashmiri Foodies)
                </span>
              </div>
            </div>

            {/* Right: Unique Luxury Write a Review Button */}
            <button
              onClick={() => setIsReviewModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: 'var(--accent-gold)',
                color: '#121008',
                border: 'none',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(197, 160, 89, 0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(197, 160, 89, 0.3)';
              }}
            >
              <PenTool size={16} />
              <span>&lowast; Write a Review</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              overflowX: 'auto',
              width: '100%',
              paddingBottom: '0.75rem',
              marginBottom: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {['All', 'Wazwan', 'Starters', 'Biryani', 'Beverages', 'Ambiance'].map((cat) => {
              const isSelected = selectedReviewCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedReviewCategory(cat);
                    setVisibleReviewCount(8);
                  }}
                  style={{
                    background: isSelected ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                    color: isSelected ? '#121008' : 'var(--text-primary)',
                    borderColor: isSelected ? 'var(--accent-gold)' : 'var(--border-color)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderRadius: '9999px',
                    padding: '0.38rem 1.1rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat === 'All' ? `All Reviews (${reviewsList.length})` : cat}
                </button>
              );
            })}
          </div>

          {/* 2-Column Reviews Grid Matching Reference Image 3 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
              gap: '1.75rem',
              width: '100%',
            }}
            className="reviews-2col-grid"
          >
            {reviewsList
              .filter((rev) => {
                if (selectedReviewCategory === 'All') return true;
                return rev.category === selectedReviewCategory;
              })
              .slice(0, visibleReviewCount)
              .map((rev) => (
                <div
                  key={rev.id}
                  className="glass-panel"
                  style={{
                    borderRadius: '18px',
                    border: '1px solid var(--border-color)',
                    padding: '2rem 2.25rem',
                    backgroundColor: 'var(--card-bg)',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(197, 160, 89, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  {/* Top Row: Solid Green Stars on Left + Big Faint Quotation Mark on Right */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                    }}
                  >
                    {/* 5 Green Stars (matches image 3) */}
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      {[1, 2, 3, 4, 5].map((starIdx) => (
                        <Star
                          key={starIdx}
                          size={18}
                          fill={starIdx <= rev.rating ? '#16a34a' : 'none'}
                          color={starIdx <= rev.rating ? '#16a34a' : 'rgba(120, 120, 120, 0.4)'}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    {/* Decorative Faint Quote Mark */}
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '3.2rem',
                        lineHeight: 0.8,
                        color: 'rgba(197, 160, 89, 0.28)',
                        userSelect: 'none',
                        marginTop: '-0.3rem',
                      }}
                    >
                      &#8221;
                    </span>
                  </div>

                  {/* Middle: Italicized Quote Text */}
                  <p
                    style={{
                      fontStyle: 'italic',
                      color: 'var(--text-secondary)',
                      fontSize: '0.94rem',
                      lineHeight: '1.68',
                      margin: '0 0 1.25rem 0',
                    }}
                  >
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {/* Thin Horizontal Divider Line */}
                  <div
                    style={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'var(--border-light)',
                      margin: '0.5rem 0 1rem 0',
                    }}
                  />

                  {/* Bottom Row: Author + Date on Left & ✓ VERIFIED on Right */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          color: 'var(--text-primary)',
                          margin: 0,
                        }}
                      >
                        {rev.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.15rem',
                          display: 'block',
                        }}
                      >
                        {rev.date}
                      </span>
                    </div>

                    {/* Verified Badge */}
                    {rev.verified && (
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          backgroundColor: 'rgba(22, 163, 74, 0.1)',
                          border: '1px solid #16a34a',
                          color: '#16a34a',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.28rem 0.75rem',
                          borderRadius: '9999px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        <CheckCircle2 size={13} color="#16a34a" />
                        <span>VERIFIED</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Load More Button */}
          {visibleReviewCount <
            reviewsList.filter((rev) => {
              if (selectedReviewCategory === 'All') return true;
              return rev.category === selectedReviewCategory;
            }).length && (
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button
                onClick={() => setVisibleReviewCount((prev) => prev + 8)}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  padding: '0.75rem 2rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                  e.currentTarget.style.color = '#121008';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--accent-gold)';
                }}
              >
                Show More Guest Reviews (
                {reviewsList.filter((rev) => {
                  if (selectedReviewCategory === 'All') return true;
                  return rev.category === selectedReviewCategory;
                }).length - visibleReviewCount}{' '}
                remaining) &darr;
              </button>
            </div>
          )}

          {/* Interactive "Write a Review" Modal */}
          {isReviewModalOpen && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99999,
                padding: '1.5rem',
                boxSizing: 'border-box',
              }}
              onClick={() => setIsReviewModalOpen(false)}
            >
              <div
                className="glass-panel"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  maxWidth: '540px',
                  width: '100%',
                  padding: '2.25rem',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                  position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0.4rem',
                  }}
                >
                  <X size={20} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      color: 'var(--accent-gold)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    Amberleaf Guestbook
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.6rem',
                      color: 'var(--text-primary)',
                      margin: '0.35rem 0 0 0',
                    }}
                  >
                    Share Your Dining Experience
                  </h3>
                </div>

                {reviewSuccess ? (
                  <div
                    style={{
                      padding: '2rem 1.5rem',
                      textAlign: 'center',
                      backgroundColor: 'rgba(22, 163, 74, 0.12)',
                      border: '1px solid #16a34a',
                      borderRadius: '16px',
                      color: '#16a34a',
                    }}
                  >
                    <CheckCircle2 size={42} style={{ margin: '0 auto 0.75rem auto', display: 'block' }} />
                    <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Thank You for Your Feedback!</h4>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      Your review has been verified and added to the Amberleaf guest testimonials.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                    {/* Star Rating Selector */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                        Overall Rating *
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0.2rem',
                            }}
                          >
                            <Star
                              size={28}
                              fill={star <= newRating ? '#16a34a' : 'none'}
                              color={star <= newRating ? '#16a34a' : 'rgba(120, 120, 120, 0.4)'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Input */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Farooq Mir"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--card-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '0.92rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    {/* Dining Category and Type */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                          Category
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as any)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--card-bg)',
                            color: 'var(--text-primary)',
                            fontSize: '0.92rem',
                            boxSizing: 'border-box',
                          }}
                        >
                          <option value="Wazwan">Kashmiri Wazwan</option>
                          <option value="Starters">Starters & Momos</option>
                          <option value="Biryani">Dum Biryani</option>
                          <option value="Beverages">Kahwa & Drinks</option>
                          <option value="Ambiance">Ambiance & Service</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                          Dining Experience
                        </label>
                        <select
                          value={newType}
                          onChange={(e) => setNewType(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--card-bg)',
                            color: 'var(--text-primary)',
                            fontSize: '0.92rem',
                            boxSizing: 'border-box',
                          }}
                        >
                          <option value="Dine-In">Dine-In</option>
                          <option value="Family Feast">Family Feast</option>
                          <option value="Takeaway">Takeaway</option>
                          <option value="Delivery">Delivery</option>
                        </select>
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                        Your Review *
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us what you enjoyed most about the flavors, presentation, and ambiance..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--card-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '0.92rem',
                          boxSizing: 'border-box',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.85rem',
                        backgroundColor: 'var(--accent-gold)',
                        color: '#121008',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Send size={16} />
                      Publish Verified Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .home-videos-grid-3x2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .home-reviews-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .home-videos-grid-3x2 {
            grid-template-columns: 1fr !important;
          }
          .hero-slideshow-container {
            min-height: 750px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
