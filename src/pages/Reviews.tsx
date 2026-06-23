import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SEO } from '../components/SEO';
import { Star, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  type: string; // "Family", "Solo", "Group", etc.
  image?: string; // base64 string
}

export const Reviews: React.FC = React.memo(() => {
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    // 12 Detailed Primary Reviews
    const primaryReviews: Review[] = [
      {
        id: 'r1',
        author: 'Arshid Ahmad',
        rating: 5,
        date: 'June 18, 2026',
        comment: 'Best Rista in Srinagar! The meat is so tender and cooked to perfection. The glassmorphic design and the warm lighting make it look like a high-end Delhi cafe. Highly recommend!',
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
        rating: 4,
        date: 'May 28, 2026',
        comment: 'We booked a private room for a small family gathering. The Wazwan platter was delicious. Dal Makhani was also quite rich. 4.9 stars is well-deserved!',
        type: 'Family Dining',
      },
      {
        id: 'r5',
        author: 'Ishfaq Bhat',
        rating: 5,
        date: 'May 24, 2026',
        comment: 'Hands down the most premium cafe in Balgarden. The tandoori platter had a nice smoky flavor. Fast service and clean restrooms.',
        type: 'Group Outing',
      },
      {
        id: 'r6',
        author: 'Aditi Sharma',
        rating: 5,
        date: 'May 15, 2026',
        comment: 'A true gem in Srinagar. The glassmorphic panel design gives a luxury vibe. Left-aligned menus and clear pricing. Loved the Shahi Tukda!',
        type: 'Solo Dining',
      },
      {
        id: 'r7',
        author: 'Showkat Ahmed',
        rating: 5,
        date: 'May 10, 2026',
        comment: 'The Mutton Gushtaba is outstanding. Very authentic yogurt base. The kids loved the veg spring rolls. Ample street parking available.',
        type: 'Family Dining',
      },
      {
        id: 'r8',
        author: 'Vikram Singh',
        rating: 4,
        date: 'May 02, 2026',
        comment: 'Tasty food, beautiful ambiance. Tandoori Paneer Tikka was spiced well. Direct booking on the website was seamless.',
        type: 'Group Outing',
      },
      {
        id: 'r9',
        author: 'Sarah Khan',
        rating: 5,
        date: 'April 25, 2026',
        comment: 'Love the Saffron Iced Tea and Kahwa! It is my favorite spot to sit and read. Perfect for solo dining and quick bites.',
        type: 'Solo Dining',
      },
      {
        id: 'r10',
        author: 'Bilal Dar',
        rating: 5,
        date: 'April 20, 2026',
        comment: 'Outstanding hospitality. The Wazwan dishes are prepared exactly as they should be. Excellent taste and neat presentation.',
        type: 'Family Dining',
      },
      {
        id: 'r11',
        author: 'Tariq Lone',
        rating: 5,
        date: 'April 14, 2026',
        comment: 'The Chilli Chicken dry starter was excellent. High-quality chicken and perfectly balanced soy glaze. Five stars from my side.',
        type: 'Group Outing',
      },
      {
        id: 'r12',
        author: 'Nayeem Rather',
        rating: 5,
        date: 'April 09, 2026',
        comment: 'Superb ambiance and premium table service. The Tabak Maaz is extremely crispy. Best place in Nursing Garh.',
        type: 'Family Dining',
      },
    ];

    const localNames = [
      'Showkat', 'Mehak', 'Bilal', 'Ishfaq', 'Sajad', 'Farooq', 'Zahid', 'Nadeem', 'Yasmin', 'Rubeena',
      'Muzaffar', 'Shabir', 'Tanveer', 'Firdous', 'Mushtaq', 'Rayees', 'Jahangir', 'Sameer', 'Aijaz', 'Hilal',
      'Imtiyaz', 'Waseem', 'Khursheed', 'Altaf', 'Bashir', 'Gowhar', 'Irshad', 'Latief', 'Manzoor', 'Nisar',
      'Nazir', 'Rafiq', 'Reyaz', 'Tariq', 'Zahoor', 'Parvaiz', 'Shakeel', 'Fayaz', 'Mohammad', 'Gulzar'
    ];

    const commentsPool = [
      'Excellent dining spot! The wazwan is amazing and the environment is very neat and clean.',
      'Superb taste, polite staff, and beautiful ambiance. Definitely coming back.',
      'Loved the vibe here. The glass panels look amazing. Rogan Josh is highly recommended.',
      'Great customer service. The booking process was very smooth with the direct ticket pass.',
      'One of the best premium multi-cuisine restaurants in Srinagar. Highly recommend Gushtaba.',
      'Really nice cafe ambiance. Ideal for family dining and weekend groups.',
      'The Kashmiri Kahwa is outstanding. The cardamom and saffron aroma is so soothing.',
      'Clean place, delicious food, and friendly staff. Saffron Mint cooler was very refreshing.',
      'A perfect place for solo dining. Loved the Dum Biryani and local hospitality.',
      'Excellent taste and premium presentation. Five stars!'
    ];

    const typesPool = ['Family Dining', 'Solo Dining', 'Group Outing'];
    
    const generatedReviews: Review[] = Array.from({ length: 42 }).map((_, index) => {
      const name = localNames[index % localNames.length] + ' ' + (index % 2 === 0 ? 'Bhat' : 'Dar');
      const rating = index % 5 === 0 ? 4 : 5;
      const dateOffsetDays = index + 10;
      const date = new Date(2026, 3, 20 - dateOffsetDays).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      const comment = commentsPool[index % commentsPool.length];
      const type = typesPool[index % typesPool.length];

      return {
        id: `gen-${index}`,
        author: name,
        rating,
        date,
        comment,
        type,
      };
    });

    const combined = [...primaryReviews, ...generatedReviews];

    // Load any custom reviews saved in localStorage
    const savedCustom = localStorage.getItem('amberleaf_custom_reviews');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom) as Review[];
        return [...parsed, ...combined];
      } catch (e) {
        console.error('Failed parsing custom reviews:', e);
      }
    }
    return combined;
  });

  const [activeFilter, setActiveFilter] = useState<'All' | 'Family Dining' | 'Solo Dining' | 'Group Outing'>('All');
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Family Dining');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newImage, setNewImage] = useState(''); // base64 string
  const [formError, setFormError] = useState('');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroller carousel effect with pause-on-hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let intervalId: number;

    const scroll = () => {
      if (isPaused) return;
      container.scrollTop += 0.75; // slow smooth vertical crawl
      
      // Wrap around when reaching the bottom
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1) {
        container.scrollTop = 0;
      }
    };

    intervalId = window.setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  // Convert review image attachment to base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('Image size exceeds 2MB limit.');
        return;
      }
      setFormError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!newComment.trim()) {
      setFormError('Please enter a review comment.');
      return;
    }

    const newReviewItem: Review = {
      id: `custom-${Date.now()}`,
      author: newName,
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      comment: newComment,
      type: newType,
      image: newImage || undefined,
    };

    const updated = [newReviewItem, ...reviewsList];
    setReviewsList(updated);

    // Save custom reviews in localStorage (filter out generated/pre-loaded ones)
    const customOnly = updated.filter((r) => r.id.startsWith('custom-'));
    localStorage.setItem('amberleaf_custom_reviews', JSON.stringify(customOnly));

    // Clear fields
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setNewImage('');
    setFormError('');

    // Confetti blast
    confetti({
      particleCount: 120,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  // Filter logic
  const filteredReviews = useMemo(() => {
    if (activeFilter === 'All') return reviewsList;
    return reviewsList.filter((r) => r.type === activeFilter);
  }, [reviewsList, activeFilter]);

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      <SEO
        title="Guest Reviews"
        description="Read what our diners say about Amberleaf Restaurant. Read testimonials about our Kashmiri Wazwan, hospitality, and glassmorphic cafe ambiance."
      />

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="animate-fade-in">
        <span
          style={{
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Diner Testimonials
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Guest Experience Reviews</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Category filters */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}
        className="animate-fade-in"
      >
        {['All', 'Family Dining', 'Solo Dining', 'Group Outing'].map((filter) => (
          <button
            key={filter}
            className="gallery-tab-btn"
            style={{
              background: activeFilter === filter ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.02)',
              color: activeFilter === filter ? '#000' : 'var(--text-primary)',
              borderColor: activeFilter === filter ? 'var(--accent-gold)' : 'var(--border-light)',
              borderRadius: '8px',
              padding: '0.4rem 1.2rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setActiveFilter(filter as any)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Two Columns Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start',
        }}
        className="reviews-layout animate-fade-in"
      >
        {/* Left Side: Submit Feedback Form */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Share Your Experience</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
            We highly value your feedback. Let us know how we can elevate your next dining experience.
          </p>

          <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {formError && (
              <div style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: 600 }}>
                {formError}
              </div>
            )}

            {/* Diner Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Bilal Bhat"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Visit Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Dine-In Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="Family Dining">Family Dining</option>
                <option value="Solo Dining">Solo Dining</option>
                <option value="Group Outing">Group Outing</option>
              </select>
            </div>

            {/* Star Rating Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Star Rating</label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <Star
                      size={24}
                      fill={star <= newRating ? 'var(--accent-gold)' : 'none'}
                      stroke={star <= newRating ? 'var(--accent-gold)' : 'var(--text-secondary)'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Comment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Review</label>
              <textarea
                rows={4}
                placeholder="Write about the wazwan platter, ambiance, custom mocktails, etc..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            {/* Photo Attachment (Optional) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Attach a Photo (Optional)</label>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  border: '1px dashed var(--border-color)',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  position: 'relative',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                />
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {newImage ? (
                    <img src={newImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '1.2rem', color: 'var(--accent-gold)' }}>+</span>
                  )}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {newImage ? 'Image attached successfully' : 'Upload food or table photo'}
                </span>
                {newImage && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewImage('');
                    }}
                    style={{
                      marginLeft: 'auto',
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      position: 'relative',
                      zIndex: 3,
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ gap: '0.5rem', width: '100%' }}>
              <Send size={16} />
              Submit Review
            </button>
          </form>
        </div>

        {/* Right Side: Luxury Editorial Pull-Quote Auto-scroller carousel */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxHeight: '750px',
            overflowY: 'hidden',
            paddingRight: '0.5rem',
            cursor: 'grab',
          }}
          className="reviews-list-container"
        >
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="glass-panel"
              style={{
                padding: '2.5rem 2rem',
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Luxury Large Quote Mark */}
              <span
                style={{
                  position: 'absolute',
                  top: '0.2rem',
                  left: '1.2rem',
                  fontSize: '5rem',
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: '1',
                  color: 'var(--accent-gold)',
                  opacity: 0.22,
                  pointerEvents: 'none',
                }}
              >
                &ldquo;
              </span>

              {/* Stars & Context badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < review.rating ? 'var(--accent-gold)' : 'none'}
                      stroke={i < review.rating ? 'var(--accent-gold)' : 'var(--text-secondary)'}
                    />
                  ))}
                </div>
                
                <span
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.65rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  {review.type}
                </span>
              </div>

              {/* Review Comment Quote - playfair Display Italic */}
              <p
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  lineHeight: '1.7',
                  margin: '0.4rem 0',
                  zIndex: 1,
                }}
              >
                {review.comment}
              </p>

              {review.image && (
                <div style={{ zIndex: 1, borderRadius: '8px', overflow: 'hidden', maxHeight: '180px', width: '100%', border: '1px solid var(--border-light)' }}>
                  <img src={review.image} alt="Diner food upload" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              {/* Thin gold line & Author name */}
              <div style={{ zIndex: 1, marginTop: '0.5rem' }}>
                <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent-gold)', marginBottom: '0.6rem', opacity: 0.6 }} />
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {review.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .reviews-layout {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }
      `}</style>
    </div>
  );
});
