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
    image: './images/g1.jpg',
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
    image: './images/g2.jpg',
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
    image: './images/g3.jpg',
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
    image: './images/g4.jpg',
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
    image: './images/g5.jpg',
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
    image: './images/g6.jpg',
    rating: 4.7,
    isVegetarian: true,
  },
  {
    id: 't3',
    name: 'Tandoori Chicken Platter',
    category: 'Tandoor & Grills',
    price: 480,
    description: 'Assorted chicken cuts marinated in yogurt and red chillies, grilled to smoky tenderness.',
    image: './images/g7.jpg',
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
    image: './images/g8.jpg',
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
    image: './images/g9.jpg',
    rating: 4.6,
    isVegetarian: true,
  },
  {
    id: 'm3',
    name: 'Dal Makhani Shahi',
    category: 'Main Course',
    price: 280,
    description: 'Creamy black lentils slow-cooked overnight with fresh cream, tomatoes, and home-churned butter.',
    image: './images/g10.jpg',
    rating: 4.7,
    isVegetarian: true,
  },
  {
    id: 'm4',
    name: 'Dum Mutton Biryani',
    category: 'Main Course',
    price: 460,
    description: 'Long-grain Basmati rice layered with spiced mutton chunks, saffron milk, and fried onions, cooked on dum.',
    image: './images/g11.jpg',
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
    image: './images/g12.jpg',
    rating: 4.8,
    isVegetarian: true,
  },
  {
    id: 'c0b',
    name: 'Peri Peri French Fries',
    category: 'Chinese & Starters',
    price: 130,
    description: 'Crispy fries tossed in our signature hot peri peri spice mix.',
    image: './images/g13.jpg',
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
    image: './images/g6.jpg',
    rating: 4.7,
    isVegetarian: true,
  },
  {
    id: 'c0d',
    name: 'Chicken Popcorn',
    category: 'Chinese & Starters',
    price: 210,
    description: 'Bite-sized tender chicken nuggets fried to crunchy perfection.',
    image: './images/g7.jpg',
    rating: 4.9,
    isVegetarian: false,
  },
  {
    id: 'c0e',
    name: 'Kurkure Chicken Momos',
    category: 'Chinese & Starters',
    price: 180,
    description: 'Crispy, crunchy outer coating with a juicy, perfectly seasoned minced chicken filling, served with a fiery schezwan dip.',
    image: './images/g8.jpg',
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
    image: './images/g12.jpg',
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
    image: './images/g13.jpg',
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
    image: './images/amberleaf-vibe.jpg',
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
    image: './images/amberleaf-storefront.png',
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
    image: './images/amberleaf-vibe.jpg',
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
    image: './images/g1.jpg',
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
    image: './images/g2.jpg',
    rating: 4.8,
    isPopular: true,
    isVegetarian: true,
  },
];
