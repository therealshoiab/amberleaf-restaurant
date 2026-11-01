export interface MenuItem {
  id: string | number;
  name: string;
  category: string;
  price: number | string;
  description: string;
  image?: string;
  rating?: number;
  isPopular?: boolean;
  isSignature?: boolean;
  isVegetarian?: boolean;
  isChefsPick?: boolean;
}

export interface BroadcastBannerData {
  enabled: boolean;
  message: string;
  linkText?: string;
  linkUrl?: string;
  variant?: 'gold' | 'green' | 'dark';
}

export const MENU_CATEGORIES = [
  'All',
  'Kashmiri Wazwan',
  'Tandoor & Grills',
  'Main Course',
  'Chinese & Starters',
  'Beverages',
  'Desserts',
];

export const DEFAULT_BROADCAST_BANNER: BroadcastBannerData = {
  enabled: true,
  message: '✨ Experience Fine Dining at Amberleaf Srinagar: Royal Kashmiri Wazwan, Tandoori Masterpieces & Private Dining. Call +91 60063 79610 or WhatsApp +91 77809 38743.',
  linkText: '',
  linkUrl: '',
  variant: 'gold',
};

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // Kashmiri Wazwan
  {
    id: 'w1',
    name: 'Mutton Rogan Josh',
    category: 'Kashmiri Wazwan',
    price: 520,
    description: 'Slow-cooked tender lamb chunks in a rich aromatic gravy flavored with Kashmiri maval (cockscomb) flowers, fennel, and dry ginger.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
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
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isSignature: true,
    isVegetarian: false,
  },
  {
    id: 'w3',
    name: 'Mutton Gushtaba',
    category: 'Kashmiri Wazwan',
    price: 540,
    description: 'Pounded mutton rounds cooked in a rich, velvety curd and cashew gravy flavored with cardamoms and dry mint.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
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
    image: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
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
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
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
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isVegetarian: true,
  },
  {
    id: 't3',
    name: 'Tandoori Chicken Platter',
    category: 'Tandoor & Grills',
    price: 480,
    description: 'Assorted chicken cuts marinated in yogurt and red chillies, grilled to smoky tenderness.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
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
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isPopular: true,
    isVegetarian: false,
  },
  {
    id: 'm2',
    name: 'Kadhai Paneer Special',
    category: 'Main Course',
    price: 340,
    description: 'Paneer blocks cooked with thick bell peppers, onions, and freshly crushed coriander seeds in a spicy tomato-onion base.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    isVegetarian: true,
  },
  {
    id: 'm3',
    name: 'Dal Makhani Shahi',
    category: 'Main Course',
    price: 280,
    description: 'Creamy black lentils slow-cooked overnight with fresh cream, tomatoes, and home-churned butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isVegetarian: true,
  },
  {
    id: 'm4',
    name: 'Dum Mutton Biryani',
    category: 'Main Course',
    price: 460,
    description: 'Long-grain Basmati rice layered with spiced mutton chunks, saffron milk, and fried onions, cooked on dum.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isSignature: true,
    isVegetarian: false,
    isChefsPick: true,
  },

  // Chinese & Starters
  {
    id: 'c0a',
    name: 'Crispy French Fries',
    category: 'Chinese & Starters',
    price: 110,
    description: 'Golden, crispy potato fries lightly seasoned with sea salt.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isVegetarian: true,
  },
  {
    id: 'c0b',
    name: 'Peri Peri French Fries',
    category: 'Chinese & Starters',
    price: 130,
    description: 'Crispy fries tossed in our signature hot peri peri spice mix.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isPopular: true,
    isVegetarian: true,
  },
  {
    id: 'c0c',
    name: 'Honey Chilli Potato',
    category: 'Chinese & Starters',
    price: 190,
    description: 'Crispy potato fingers glazed in a sweet and spicy honey chilli sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isVegetarian: true,
  },
  {
    id: 'c0d',
    name: 'Chicken Popcorn',
    category: 'Chinese & Starters',
    price: 210,
    description: 'Bite-sized tender chicken nuggets fried to crunchy perfection.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isVegetarian: false,
  },
  {
    id: 'c0e',
    name: 'Kurkure Chicken Momos',
    category: 'Chinese & Starters',
    price: 180,
    description: 'Crispy, crunchy outer coating with a juicy, perfectly seasoned minced chicken filling, served with a fiery schezwan dip.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    isPopular: true,
    isSignature: true,
    isVegetarian: false,
  },
  {
    id: 'c1',
    name: 'Chilli Chicken Dry',
    category: 'Chinese & Starters',
    price: 320,
    description: 'Boneless chicken cubes wok-tossed with capsicum, garlic, spring onions, and a spicy soy chilli glaze.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    isPopular: true,
    isVegetarian: false,
  },
  {
    id: 'c2',
    name: 'Veg Spring Rolls',
    category: 'Chinese & Starters',
    price: 220,
    description: 'Crunchy golden shells stuffed with shredded stir-fry vegetables and glass noodles. Served with sweet chilli dip.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    isVegetarian: true,
  },

  // Beverages
  {
    id: 'b1',
    name: 'Authentic Kashmiri Kahwa',
    category: 'Beverages',
    price: 110,
    description: 'Traditional green tea brewed with saffron strands, crushed green cardamoms, cinnamon, and slivered almonds.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
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
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isPopular: true,
    isVegetarian: true,
  },
  {
    id: 'b3',
    name: 'Amberleaf French Press',
    category: 'Beverages',
    price: 140,
    description: 'Rich freshly ground dark-roast arabica coffee beans, steeped and pressed. Served black or with hot milk.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    isVegetarian: true,
  },

  // Desserts
  {
    id: 'd1',
    name: 'Shahi Tukda Royal',
    category: 'Desserts',
    price: 180,
    description: 'Crispy fried bread slices soaked in saffron sugar syrup and topped with milk rabri, pistachios, and silver leaf.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
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
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isPopular: true,
    isVegetarian: true,
  },
];

export interface SignatureDishItem {
  id: string;
  overtitle: string;
  name: string;
  ratingText: string;
  price: number;
  description: string;
  ingredients: string[];
  image: string;
}

export const DEFAULT_SIGNATURE_ITEMS: SignatureDishItem[] = [
  {
    id: 'sig-1',
    overtitle: 'ULTRA-CRISPY GOLDEN DUMPLINGS',
    name: 'Fried Momos',
    ratingText: '4.9 ★ (320+ ratings)',
    price: 180,
    description:
      'Our signature chicken momos deep-fried to a perfect golden crisp, offering a crunchy exterior while remaining juicy and flavorful on the inside.',
    ingredients: ['Fried Chicken Momos', 'Garlic Mayo', 'Tandoori Dipping Sauce'],
    image: './images/g8.jpg',
  },
  {
    id: 'sig-2',
    overtitle: "SRINAGAR'S FAVORITE CHICKEN WRAP",
    name: 'Chicken Kathi Roll',
    ratingText: '4.8 ★ (190+ ratings)',
    price: 220,
    description:
      'Juicy, fire-roasted tandoori chicken chunks tossed with fresh onions, capsicum, green chutney, and cream, all wrapped inside a soft, flaky flatbread.',
    ingredients: ['Tandoori Chicken', 'Flaky Paratha', 'Sliced Onions', 'Mint Chutney'],
    image: './images/g9.jpg',
  },
  {
    id: 'sig-3',
    overtitle: 'AUTHENTIC KASHMIRI WAZWAN ROYALTY',
    name: 'Signature Mutton Rista',
    ratingText: '5.0 ★ (410+ ratings)',
    price: 490,
    description:
      'A masterpiece of Kashmiri Wazwan. Hand-hammered minced mutton meatballs simmered in a spiced red gravy infused with dried cockscomb flowers (maval) and pure Pampore saffron.',
    ingredients: ['Hand-Pounded Mutton', 'Pampore Saffron', 'Maval Extract', 'Shallot Paste', 'Clarified Ghee'],
    image: './images/g12.jpg',
  },
  {
    id: 'sig-4',
    overtitle: 'THE UNRIVALED KING OF WAZWAN',
    name: 'Mutton Gushtaba Wazwan',
    ratingText: '5.0 ★ (350+ ratings)',
    price: 540,
    description:
      'Served traditionally as the grand finale of Wazwan feasts. Velvety mutton spheres poached slowly in a smooth, mildly tangy yogurt broth enriched with green cardamoms and dry mountain mint.',
    ingredients: ['Velvet Hammered Lamb', 'Thick Spiced Curd', 'Dry Mountain Mint', 'Green Cardamom', 'Desi Ghee'],
    image: './images/g10.jpg',
  },
  {
    id: 'sig-5',
    overtitle: 'SLOW-COOKED MOUNTAIN DUM STYLE',
    name: 'Special Mutton Dum Biryani',
    ratingText: '4.9 ★ (280+ ratings)',
    price: 420,
    description:
      'Fragrant long-grain basmati rice layered with tender mutton chunks, caramelized onions, and our secret 14-spice blend, slow-cooked in traditional sealed dum style.',
    ingredients: ['Tender Lamb Cuts', 'Aged Basmati Rice', 'Pampore Saffron', 'Fried Barista Onions', 'Mint Raita'],
    image: './images/g11.jpg',
  },
  {
    id: 'sig-6',
    overtitle: 'TRADITIONAL SAMOVAR INFUSION',
    name: 'Authentic Kashmiri Kahwa',
    ratingText: '4.9 ★ (460+ ratings)',
    price: 110,
    description:
      'Saffron-infused mountain green tea brewed in a traditional copper samovar. Sweetened with honey or rock sugar, enriched with crushed green cardamoms, cinnamon bark, and blanched almond slivers.',
    ingredients: ['Organic Green Tea', 'Pampore Saffron Strands', 'Crushed Cardamoms', 'Cinnamon Bark', 'Slivered Almonds'],
    image: './images/s3.jpg',
  },
  {
    id: 'sig-7',
    overtitle: 'HERITAGE MUGHAL DESSERT',
    name: 'Shahi Tukda Royal',
    ratingText: '4.9 ★ (210+ ratings)',
    price: 180,
    description:
      'Crispy ghee-fried bread triangles soaked in warm saffron syrup, layered with double-thick reduced milk rabri, and garnished with pistachios and edible silver leaf.',
    ingredients: ['Pure Ghee Bread', 'Six-Hour Slow Milk Rabri', 'Kashmiri Saffron', 'Pistachio Shavings', 'Edible Silver Vark'],
    image: './images/s6.jpg',
  },
];
