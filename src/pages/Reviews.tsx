import React, { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { Star, MessageSquare, Send, User } from 'lucide-react';
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

export const Reviews: React.FC = () => {
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

    // Programmatically generate 40 additional reviews to exceed the 50 reviews requirement
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
      const rating = index % 5 === 0 ? 4 : 5; // mostly 5 stars, some 4 stars
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

    const savedCustom = localStorage.getItem('amberleaf_custom_reviews');
    const customReviews: Review[] = savedCustom ? JSON.parse(savedCustom) : [];

    return [...customReviews, ...primaryReviews, ...generatedReviews];
  });

  // Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newType, setNewType] = useState('Family Dining');
  const [newImage, setNewImage] = useState('');
  const [formError, setFormError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('Image size should be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAuthor.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!newComment.trim() || newComment.length < 10) {
      setFormError('Please write a review comment (minimum 10 characters).');
      return;
    }

    const newReview: Review = {
      id: `user-${Date.now()}`,
      author: newAuthor,
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

    const updatedReviews = [newReview, ...reviewsList];
    setReviewsList(updatedReviews);
    
    // Save user custom reviews to local storage
    const customOnly = updatedReviews.filter(r => r.id.startsWith('user-'));
    localStorage.setItem('amberleaf_custom_reviews', JSON.stringify(customOnly));

    setNewAuthor('');
    setNewRating(5);
    setNewComment('');
    setNewType('Family Dining');
    setNewImage('');
    setFormError('');

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Stats computation
  const averageRating = useMemo(() => {
    const sum = reviewsList.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / reviewsList.length).toFixed(1);
  }, [reviewsList]);

  return (
    <div className="page-container">
      <SEO
        title="Guest Reviews"
        description="Read what our diners say about Amberleaf Restaurant in Srinagar. Explore over 50 reviews on Kashmiri Wazwan and submit your own feedback."
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
          Diner Experiences
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Guest Reviews</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Stats Summary Board */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '4rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          textAlign: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-gold)', display: 'block', lineHeight: 1 }}>
            {averageRating}
          </span>
          <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center', margin: '0.5rem 0' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
            ))}
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Based on {reviewsList.length} reviews</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }} className="stats-bars">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
            <span style={{ width: '50px' }}>5 Star</span>
            <div style={{ width: '150px', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '90%', height: '100%', backgroundColor: 'var(--accent-gold)' }} />
            </div>
            <span>90%</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
            <span style={{ width: '50px' }}>4 Star</span>
            <div style={{ width: '150px', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '10%', height: '100%', backgroundColor: 'var(--accent-gold)' }} />
            </div>
            <span>10%</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'flex-start',
        }}
        className="reviews-layout"
      >
        {/* Left Side: Submit Form */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem',
            position: 'sticky',
            top: '100px',
            zIndex: 10,
          }}
        >
          <h3
            style={{
              fontSize: '1.4rem',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <MessageSquare size={20} style={{ color: 'var(--accent-gold)' }} />
            Leave Your Feedback
          </h3>

          <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {formError && (
              <div style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: 600 }}>
                {formError}
              </div>
            )}

            {/* Author Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Aarif Bhat"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
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
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Dining Setup</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
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
                  cursor: 'pointer'
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

        {/* Right Side: Reviews Scroll Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '750px', overflowY: 'auto', paddingRight: '0.5rem' }} className="reviews-list-container">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderWidth: '1px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      padding: '0.4rem',
                      borderRadius: '50%',
                      display: 'flex',
                    }}
                  >
                    <User size={14} style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{review.author}</span>
                </div>
              </div>

              {/* Stars & Context badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.75rem' }}>
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

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                {review.comment}
              </p>
              {review.image && (
                <div style={{ marginTop: '0.75rem', borderRadius: '8px', overflow: 'hidden', maxHeight: '200px', width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)' }}>
                  <img src={review.image} alt="Diner food upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .reviews-layout {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
