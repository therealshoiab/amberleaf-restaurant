import React, { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { Search, Flame, Award, ShoppingBag, ExternalLink } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isPopular?: boolean;
  isSignature?: boolean;
  isVegetarian?: boolean;
  isChefsPick?: boolean;
}

export const Menu: React.FC = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Kashmiri Wazwan',
    'Tandoor & Grills',
    'Main Course',
    'Chinese & Starters',
    'Beverages',
    'Desserts',
  ];

  const menuItems: MenuItem[] = [
    // Kashmiri Wazwan
    {
      id: 'w1',
      name: 'Mutton Rogan Josh',
      category: 'Kashmiri Wazwan',
      price: 520,
      description: 'Slow-cooked tender lamb chunks in a rich aromatic gravy flavored with Kashmiri maval (cockscomb) flowers, fennel, and dry ginger.',
      isPopular: true,
      isVegetarian: false,
      isChefsPick: true,
    },
    {
      id: 'w2',
      name: 'Kashmiri Rista',
      category: 'Kashmiri Wazwan',
      price: 490,
      description: 'Velvety mutton balls hand-hammered on stone blocks, simmered in a spiced red gravy infused with aromatic saffron.',
      isSignature: true,
      isVegetarian: false,
    },
    {
      id: 'w3',
      name: 'Mutton Gushtaba',
      category: 'Kashmiri Wazwan',
      price: 540,
      description: 'Pounded mutton rounds cooked in a rich, velvety curd and cashew gravy flavored with cardamoms and dry mint.',
      isSignature: true,
      isVegetarian: false,
      isChefsPick: true,
    },
    {
      id: 'w4',
      name: 'Tabak Maaz',
      category: 'Kashmiri Wazwan',
      price: 450,
      description: 'Succulent lamb ribs parboiled in spices and pan-fried in clarified butter (ghee) until golden and crispy.',
      isPopular: true,
      isVegetarian: false,
    },
    // Tandoor & Grills
    {
      id: 't1',
      name: 'Mutton Seekh Kebab',
      category: 'Tandoor & Grills',
      price: 380,
      description: 'Spiced minced mutton skewered and roasted in a traditional clay tandoor. Served with mint chutney.',
      isPopular: true,
      isVegetarian: false,
      isChefsPick: true,
    },
    {
      id: 't2',
      name: 'Paneer Tikka Lal Qila',
      category: 'Tandoor & Grills',
      price: 290,
      description: 'Fresh cottage cheese cubes marinated in pickling tandoori spices and cooked over hot charcoal grills.',
      isVegetarian: true,
    },
    {
      id: 't3',
      name: 'Tandoori Chicken Platter',
      category: 'Tandoor & Grills',
      price: 480,
      description: 'Assorted chicken cuts marinated in yogurt and red chillies, grilled to smoky tenderness.',
      isPopular: true,
      isVegetarian: false,
    },
    // Main Course
    {
      id: 'm1',
      name: 'Butter Chicken Amberleaf',
      category: 'Main Course',
      price: 420,
      description: 'Tandoori chicken shreds cooked in our signature sweet-and-savory cashew-tomato gravy, loaded with fresh butter and cream.',
      isPopular: true,
      isVegetarian: false,
    },
    {
      id: 'm2',
      name: 'Kadhai Paneer Special',
      category: 'Main Course',
      price: 340,
      description: 'Paneer blocks cooked with thick bell peppers, onions, and freshly crushed coriander seeds in a spicy tomato-onion base.',
      isVegetarian: true,
    },
    {
      id: 'm3',
      name: 'Dal Makhani Shahi',
      category: 'Main Course',
      price: 280,
      description: 'Creamy black lentils slow-cooked overnight with fresh cream, tomatoes, and home-churned butter.',
      isVegetarian: true,
    },
    {
      id: 'm4',
      name: 'Dum Mutton Biryani',
      category: 'Main Course',
      price: 460,
      description: 'Long-grain Basmati rice layered with spiced mutton chunks, saffron milk, and fried onions, cooked on dum.',
      isSignature: true,
      isVegetarian: false,
      isChefsPick: true,
    },
    // Chinese & Starters
    {
      id: 'c1',
      name: 'Chilli Chicken Dry',
      category: 'Chinese & Starters',
      price: 320,
      description: 'Boneless chicken cubes wok-tossed with capsicum, garlic, spring onions, and a spicy soy chilli glaze.',
      isPopular: true,
      isVegetarian: false,
    },
    {
      id: 'c2',
      name: 'Veg Spring Rolls',
      category: 'Chinese & Starters',
      price: 220,
      description: 'Crunchy golden shells stuffed with shredded stir-fry vegetables and glass noodles. Served with sweet chilli dip.',
      isVegetarian: true,
    },
    // Beverages
    {
      id: 'b1',
      name: 'Authentic Kashmiri Kahwa',
      category: 'Beverages',
      price: 110,
      description: 'Traditional green tea brewed with saffron strands, crushed green cardamoms, cinnamon, and slivered almonds.',
      isSignature: true,
      isVegetarian: true,
      isChefsPick: true,
    },
    {
      id: 'b2',
      name: 'Saffron Mint Cooler',
      category: 'Beverages',
      price: 160,
      description: 'A refreshing fizzy drink made with fresh mint sprigs, lemon juice, and a sweet saffron syrup overlay.',
      isPopular: true,
      isVegetarian: true,
    },
    {
      id: 'b3',
      name: 'Amberleaf French Press',
      category: 'Beverages',
      price: 140,
      description: 'Rich freshly ground dark-roast arabica coffee beans, steeped and pressed. Served black or with hot milk.',
      isVegetarian: true,
    },
    // Desserts
    {
      id: 'd1',
      name: 'Shahi Tukda Royal',
      category: 'Desserts',
      price: 180,
      description: 'Crispy fried bread slices soaked in saffron sugar syrup and topped with milk rabri, pistachios, and silver leaf.',
      isSignature: true,
      isVegetarian: true,
      isChefsPick: true,
    },
    {
      id: 'd2',
      name: 'Zafrani Kulfi Firdaus',
      category: 'Desserts',
      price: 150,
      description: 'Rich kulfi ice cream flavored with crushed saffron and cardamoms, topped with dynamic almond shavings.',
      isPopular: true,
      isVegetarian: true,
    },
  ];

  // Filter logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="page-container">
      <SEO
        title="Menu"
        description="Browse the complete menu of Amberleaf Restaurant in Srinagar. Explore our Kashmiri Wazwan, Tandoori starters, main courses, and mocktails."
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
          Amberleaf Kitchen
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Our Culinary Menu</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Search and Category Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
        className="animate-fade-in"
      >
        {/* Search Input Box */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
            }}
          />
          <input
            type="text"
            placeholder="Search our fine wazwan and beverages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.8rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(0,0,0,0.15)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-gold)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
          />
        </div>

        {/* Categories Carousel */}
        <div className="menu-categories-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="gallery-tab-btn"
              style={{
                background: selectedCategory === cat ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.02)',
                color: selectedCategory === cat ? '#000' : 'var(--text-primary)',
                borderColor: selectedCategory === cat ? 'var(--accent-gold)' : 'var(--border-light)',
                borderRadius: '8px',
                padding: '0.5rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.background = 'rgba(var(--accent-gold-rgb), 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Online Order Quick CTA Links */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 'var(--section-margin)',
        }}
      >
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Prefer delivery? Order via:</span>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <a
            href="#/order"
            className="btn-swiggy"
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '0.85rem',
              gap: '0.4rem',
            }}
          >
            <ShoppingBag size={14} />
            Swiggy Order
            <ExternalLink size={12} />
          </a>
          <a
            href="#/order"
            className="btn-zomato"
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '0.85rem',
              gap: '0.4rem',
            }}
          >
            <ShoppingBag size={14} />
            Zomato Order
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.1rem' }}>No dishes match your active search filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-gold)',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '0.5rem',
              fontWeight: 600,
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className="grid-container grid-2"
          style={{
            animation: 'fadeIn 0.8s ease forwards',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel shimmer-card"
              style={{
                padding: 'var(--item-padding, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                {/* Badge Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.category}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {item.isChefsPick && (
                      <span
                        style={{
                          backgroundColor: 'rgba(197, 160, 89, 0.15)',
                          border: '1px solid var(--accent-gold)',
                          color: 'var(--accent-gold)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        ✦ Chef's Pick
                      </span>
                    )}

                    {item.isSignature && (
                      <span
                        style={{
                          backgroundColor: 'rgba(212, 175, 55, 0.1)',
                          border: '1px solid var(--accent-gold)',
                          color: 'var(--accent-gold)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                        }}
                      >
                        <Award size={10} />
                        Signature
                      </span>
                    )}

                    {item.isPopular && (
                      <span
                        style={{
                          backgroundColor: 'rgba(217, 119, 6, 0.1)',
                          border: '1px solid var(--accent-amber)',
                          color: 'var(--accent-amber)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                        }}
                      >
                        <Flame size={10} />
                        Popular
                      </span>
                    )}

                    <span
                      style={{
                        border: item.isVegetarian ? '1px solid #16a34a' : '1px solid #dc2626',
                        color: item.isVegetarian ? '#16a34a' : '#dc2626',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.4rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                </div>

                {/* Name and Price */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '1rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{item.name}</h3>
                  <span className="menu-price" style={{ fontSize: '1.15rem', whiteSpace: 'nowrap' }}>
                    ₹{item.price}
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
