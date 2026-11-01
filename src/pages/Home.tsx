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
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  type: string;
}

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

  // --- 4. REVIEWS & TESTIMONIALS STATE ---
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'r1',
      author: 'Arshid Ahmad',
      rating: 5,
      date: 'June 18, 2026',
      comment: 'Best Rista in Srinagar! The meat is so tender and cooked to perfection. The glassmorphic design and the warm lighting make it look like a high-end luxury resort cafe. Highly recommend!',
      type: 'Family Dining',
    },
    {
      id: 'r2',
      author: 'Sarmista Acharya',
      rating: 5,
      date: 'June 12, 2026',
      comment: 'Amazing place! We came here for lunch and the hospitality was unmatched. The Saffron Cooler mocktail is out of this world. Will definitely return with friends.',
      type: 'Group Outing',
    },
    {
      id: 'r3',
      author: 'Basit Ali',
      rating: 5,
      date: 'May 30, 2026',
      comment: 'Very cozy environment. I often visit for solo dining, especially for their French Press coffee and Butter Chicken. Staff is exceptionally polite.',
      type: 'Solo Dining',
    },
    {
      id: 'r4',
      author: 'Mehak Jan',
      rating: 5,
      date: 'May 28, 2026',
      comment: 'We booked a private room for a small family gathering. The Wazwan platter was delicious. Dal Makhani was also quite rich. 4.9 stars is well-deserved!',
      type: 'Family Dining',
    },
    {
      id: 'r5',
      author: 'Ishfaq Bhat',
      rating: 5,
      date: 'May 24, 2026',
      comment: 'Hands down the most premium restaurant in Balgarden. The tandoori platter had a nice smoky flavor. Fast service and clean restrooms.',
      type: 'Group Outing',
    },
    {
      id: 'r6',
      author: 'Aditi Sharma',
      rating: 5,
      date: 'May 15, 2026',
      comment: 'A true gem in Srinagar. The glassmorphic panel design gives a luxury vibe. Loved the Shahi Tukda and hot Kashmiri Kahwa!',
      type: 'Solo Dining',
    },
  ]);

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Family Dining');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev_${Date.now()}`,
      author: newName.trim(),
      type: newType,
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSuccess(true);
    setNewName('');
    setNewComment('');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => setReviewSuccess(false), 4500);
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
          {/* Top Rating Badges (Google, Zomato, Srinagar) - Meydani Style */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '0.5rem',
            }}
          >
            <div className="hero-rating-pill">
              <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>GOOGLE</span>
              <Star size={13} fill="#c5a059" color="#c5a059" />
              <span style={{ color: '#fff', fontWeight: 700 }}>4.9</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>(1,250 reviews)</span>
            </div>
            <div className="hero-rating-pill">
              <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>ZOMATO</span>
              <Star size={13} fill="#c5a059" color="#c5a059" />
              <span style={{ color: '#fff', fontWeight: 700 }}>4.8</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>(850 reviews)</span>
            </div>
            <div className="hero-rating-pill">
              <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>SRINAGAR</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>310, Balgarden</span>
            </div>
          </div>

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

          {/* Headline & Luxury Subtitles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.25rem' }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.75rem, 3.8vw, 2.6rem)',
                lineHeight: 1.2,
                color: '#ffffff',
                margin: 0,
                fontWeight: 600,
                textShadow: '0 3px 20px rgba(0,0,0,0.9)',
              }}
            >
              Where Taste Meets{' '}
              <span className="text-gold" style={{ display: 'inline-block' }}>
                Refined Elegance
              </span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: 'var(--accent-gold)',
                letterSpacing: '0.04em',
                fontWeight: 600,
                margin: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}
            >
              Elevating Kashmiri Hospitality &amp; Culinary Artistry
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
              marginTop: '1.25rem',
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

          {/* Micro-Features Row */}
          <div
            className="hero-features-grid"
            style={{
              width: '100%',
              maxWidth: '680px',
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div>
              <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)' }}>100%</span>
              <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)' }}>Halal Ingredients</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Private</span>
              <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)' }}>Dining Room Available</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Free</span>
              <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)' }}>On-site Parking</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator - Meydani Style */}
        <a
          href="#marquee-anchor"
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.2rem',
            textDecoration: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            zIndex: 10,
            transition: 'color 0.3s ease',
          }}
        >
          <span>EXPLORE MORE</span>
          <ChevronDown size={18} className="bounce-chevron" style={{ color: 'var(--accent-gold)' }} />
        </a>
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
          COMBINED SECTION 2: GUEST REVIEWS & EPICUREAN TESTIMONIALS
      ========================================================================= */}
      <motion.div
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
            Guest Voices
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>
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

        {/* Rating Summary Pill */}
        <div
          className="glass-panel"
          style={{
            padding: '1rem 2rem',
            borderRadius: '9999px',
            marginBottom: '3rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: '0.2rem' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={18} fill="var(--accent-gold)" color="var(--accent-gold)" />
            ))}
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
            4.9 out of 5 Stars
          </span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            (250+ Verified Guest Ratings)
          </span>
        </div>

        {/* Reviews Layout: 2 Columns (Left: Form, Right: Scrollable Reviews List) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: '2.5rem',
            width: '100%',
            alignItems: 'start',
          }}
          className="home-reviews-layout"
        >
          {/* Left Column: Submit a Review Form */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Share Your Experience
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Dined with us recently? We would love to hear your feedback about our Kashmiri Wazwan, grills, and ambiance.
            </p>

            {reviewSuccess && (
              <div
                style={{
                  padding: '0.85rem 1.25rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid #22c55e',
                  color: '#22c55e',
                  borderRadius: '10px',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                🎉 Thank you! Your review has been added to our guestbook.
              </div>
            )}

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
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
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Dining Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="Family Dining">Family Dining</option>
                  <option value="Group Outing">Group Outing</option>
                  <option value="Solo Dining">Solo Dining</option>
                  <option value="Special Celebration">Special Celebration</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Rating
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
                        size={24}
                        fill={star <= newRating ? 'var(--accent-gold)' : 'none'}
                        color="var(--accent-gold)"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Your Review *
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the flavors, service, or atmosphere..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
                <Send size={16} />
                Submit Review
              </button>
            </form>
          </div>

          {/* Right Column: Scrollable List of Guest Reviews */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              maxHeight: '620px',
              overflowY: 'auto',
              paddingRight: '0.5rem',
            }}
          >
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative',
                }}
              >
                {/* Decorative quote mark */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.5rem',
                    fontSize: '3.5rem',
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--accent-gold)',
                    opacity: 0.18,
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  &ldquo;
                </span>

                {/* Stars and Type */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '0.15rem' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--accent-gold)" color="var(--accent-gold)" />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {rev.type}
                  </span>
                </div>

                {/* Review Text */}
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    fontSize: '1.02rem',
                    lineHeight: '1.65',
                    margin: '0.25rem 0',
                    zIndex: 2,
                  }}
                >
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Author and Date */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '0.65rem',
                    marginTop: '0.25rem',
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{rev.author}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
