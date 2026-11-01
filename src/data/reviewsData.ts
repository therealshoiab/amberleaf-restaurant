export interface GuestReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  diningType: string;
  verified: boolean;
  category?: 'Wazwan' | 'Starters' | 'Biryani' | 'Beverages' | 'Ambiance';
}

export const KASHMIRI_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    name: 'Sameer Wani',
    rating: 5,
    date: '1 week ago',
    comment: 'One of the best dining places in Srinagar! The Kurkure Momos are exceptionally crunchy and flavorful. The ambiance is warm and has a beautiful frosted-glass premium aesthetic. Highly recommended!',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-2',
    name: 'Mehak Bhat',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The Kashmiri Wazwan dishes, especially Rista and Gushtaba, are absolutely authentic and melt-in-the-mouth. Hospitality is 10/10. It is a premium experience that doesn’t burn a hole in your pocket.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-3',
    name: 'Irfan Dar',
    rating: 4,
    date: '1 month ago',
    comment: 'A great place in Hyderpora & Balgarden to chill with family. Their Special Mutton Biryani is incredibly aromatic and flavorful. Very friendly staff. Ordering via WhatsApp was quick and simple.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Biryani'
  },
  {
    id: 'rev-4',
    name: 'Sabrina Syed',
    rating: 5,
    date: '2 months ago',
    comment: 'Such an elegant cafe. The dark mode theme of the bistro matches Srinagar’s evening vibes. Their Kashmiri Kahwa is very authentic, packed with saffron and almonds. Will visit again!',
    diningType: 'Dine-In',
    verified: true,
    category: 'Beverages'
  },
  {
    id: 'rev-5',
    name: 'Farooq Ahmad Mir',
    rating: 5,
    date: '4 days ago',
    comment: 'Amberleaf has elevated fine dining in Srinagar. The Tabak Maaz had the perfect crispy crackle on top while remaining juicy inside. Exceptional presentation and warm Kashmiri hospitality.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-6',
    name: 'Gowhar Lone',
    rating: 5,
    date: '6 days ago',
    comment: 'Visited for a family dinner at the Balgarden restaurant. The glass partition cabin gave us total privacy. The Mutton Rogan Josh paired with garlic butter naan was heavenly.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-7',
    name: 'Tabasum Jan',
    rating: 5,
    date: '1 week ago',
    comment: 'Best Chicken Popcorn and Peri Peri Fries in town! My kids devoured every bite. Clean dining area, fast service, and courteous waitstaff.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-8',
    name: 'Aatif Qureshi',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Their Mutton Seekh Kebabs are unmatched in Srinagar. Perfectly spiced, smoky charcoal aroma, served piping hot with fresh mint chutney.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-9',
    name: 'Burhan Sofi',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Gushtaba here is cooked to perfection in rich cardamom yogurt gravy. True traditional Kashmiri Wazwan taste without unnecessary modern shortcuts.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-10',
    name: 'Zuhaib Shah',
    rating: 4,
    date: '3 weeks ago',
    comment: 'Loved the ambiance and cozy lighting. The Paneer Tikka was soft and well-marinated. Very clean and hygienic kitchen. Balgarden needed a fine dine place like Amberleaf.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-11',
    name: 'Nida Parvez',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Ordered takeaway for a family gathering at home. The packing was tamper-proof and warm. Gushtaba and Rista tasted just like a waza cooked them right at our doorstep.',
    diningType: 'Takeaway',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-12',
    name: 'Bilal Rather',
    rating: 5,
    date: '1 month ago',
    comment: 'Exceptional dining experience! The Shahi Tukda with saffron rabri is a must-try dessert after having their Dum Biryani.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Biryani'
  },
  {
    id: 'rev-13',
    name: 'Iqra Banday',
    rating: 5,
    date: '1 month ago',
    comment: 'Had my birthday celebration here with my college friends. The staff decorated the table beautifully and the Kurkure Momos and Honey Chilli Potatoes were stars of the evening!',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-14',
    name: 'Mohsin Kak',
    rating: 5,
    date: '1 month ago',
    comment: 'Authentic Kashmiri saffron kahwa served in copper samovar style glasses. Sweetness and almond ratio was balanced. Perfect winter evening retreat.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Beverages'
  },
  {
    id: 'rev-15',
    name: 'Shazia Tramboo',
    rating: 5,
    date: '1 month ago',
    comment: 'Very polite management and comfortable seating. The Butter Chicken is rich and creamy, just the way authentic North Indian cuisine should taste.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-16',
    name: 'Adnan Bandey',
    rating: 4,
    date: '1 month ago',
    comment: 'Great curb-side pickup service. I ordered on WhatsApp 20 minutes before arriving and my hot food parcel was handed over without any wait.',
    diningType: 'Takeaway',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-17',
    name: 'Saima Gilani',
    rating: 5,
    date: '2 months ago',
    comment: 'The interior design is breathtaking. Glassmorphic accents combined with warm wooden textures make it one of the most instagrammable cafes in Srinagar.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-18',
    name: 'Danish Reshi',
    rating: 5,
    date: '2 months ago',
    comment: 'Best Mutton Rista in Srinagar! The meatball is so soft you can cut it with a spoon without applying any pressure. Saffron gravy is deeply flavorful.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-19',
    name: 'Insha Peer',
    rating: 5,
    date: '2 months ago',
    comment: 'Amberleaf Special Dum Biryani is packed with flavor and generous pieces of succulent mutton. Loved the mint raita and salan served alongside.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Biryani'
  },
  {
    id: 'rev-20',
    name: 'Tariq Ganai',
    rating: 5,
    date: '2 months ago',
    comment: 'We booked a private table for 8 people. Everything from the welcome drink to the dessert was seamless. Ample parking space near Balgarden too.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-21',
    name: 'Uzma Mattu',
    rating: 5,
    date: '2 months ago',
    comment: 'The Chilli Chicken Dry and Veg Spring Rolls were crisp, non-greasy, and bursting with fresh wok flavors. Superb presentation!',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-22',
    name: 'Yasir Makhdoomi',
    rating: 4,
    date: '2 months ago',
    comment: 'Top quality 100% Halal meat and fresh ingredients. The staff explained every dish with passion. Will definitely recommend to friends visiting Kashmir.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-23',
    name: 'Ruqaiya Khan',
    rating: 5,
    date: '2 months ago',
    comment: 'The Saffron Mint Cooler was so refreshing! A wonderful modern touch to local Kashmiri ingredients. Clean washrooms and immaculate tables.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Beverages'
  },
  {
    id: 'rev-24',
    name: 'Faisal Beigh',
    rating: 5,
    date: '3 months ago',
    comment: 'If you want genuine Kashmiri Wazwan without waiting for a wedding invitation, Amberleaf Balgarden is your destination. 5 stars all the way.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-25',
    name: 'Nusrat Jeelani',
    rating: 5,
    date: '3 months ago',
    comment: 'Dal Makhani cooked overnight with dollops of fresh white butter. It was creamy, rich, and comforting. Reminded me of Old Delhi recipes.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-26',
    name: 'Sajad Ahanger',
    rating: 5,
    date: '3 months ago',
    comment: 'Crispy French Fries with Peri Peri dust were super crunchy and hot. Their burgers and snacks are top-tier for casual evening hangouts.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-27',
    name: 'Mehreen Koul',
    rating: 5,
    date: '3 months ago',
    comment: 'Amberleaf offers a calm, sophisticated dining environment away from city commotion. The music volume is pleasant and allows peaceful conversation.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-28',
    name: 'Junaid Magray',
    rating: 4,
    date: '3 months ago',
    comment: 'Had the Mutton Dum Biryani and Tandoori Chicken. Both were well seasoned with authentic spices. Fast service even on a busy Sunday night.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Biryani'
  },
  {
    id: 'rev-29',
    name: 'Hadiya Ashai',
    rating: 5,
    date: '3 months ago',
    comment: 'Loved their Zafrani Kulfi Firdaus! Genuine saffron aroma with generous pistachio bits. A royal sweet finale to our anniversary dinner.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Beverages'
  },
  {
    id: 'rev-30',
    name: 'Waseem Zargar',
    rating: 5,
    date: '3 months ago',
    comment: 'Ordered curb-side takeaway. The food containers were sturdy and spill-proof. The Rista broth did not leak at all. Excellent packaging standard.',
    diningType: 'Takeaway',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-31',
    name: 'Shahnawaz Qadri',
    rating: 5,
    date: '4 months ago',
    comment: 'The French Press coffee brewed from dark roast Arabica beans was rich and aromatic. A great spot for work meetings or quiet reading.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Beverages'
  },
  {
    id: 'rev-32',
    name: 'Arifa Jan',
    rating: 5,
    date: '4 months ago',
    comment: 'Our family loved the privacy of the Balgarden sanctuary dining space. The staff catered to our elderly parents with great warmth and respect.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-33',
    name: 'Owais Baba',
    rating: 5,
    date: '4 months ago',
    comment: 'Kurkure Momos with fiery Schezwan dip are addictive! Once you try them, standard momos won’t satisfy you anymore. Simply the best.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-34',
    name: 'Sehar Nazir',
    rating: 5,
    date: '4 months ago',
    comment: 'The aesthetic lighting in the evening makes Amberleaf look magical. Food is served promptly and always fresh.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-35',
    name: 'Tanveer Pandith',
    rating: 5,
    date: '4 months ago',
    comment: 'Tabak Maaz is fried in pure clarified desi ghee, exactly as Wazwan tradition dictates. The crispness on the exterior is pure perfection.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-36',
    name: 'Bushra Naqash',
    rating: 4,
    date: '4 months ago',
    comment: 'Loved the Honey Chilli Potato! Crunchy outside, soft inside, coated in sweet spicy sesame glaze. Will bring my cousins next weekend.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-37',
    name: 'Mudasir Yatoo',
    rating: 5,
    date: '5 months ago',
    comment: 'I usually prefer home-cooked Wazwan, but Amberleaf surprised me with their culinary discipline. Gushtaba had that signature airy chewiness.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-38',
    name: 'Mushtaq Chisti',
    rating: 5,
    date: '5 months ago',
    comment: 'Amberleaf is our go-to restaurant whenever guests visit us in Srinagar. Never once have they disappointed on flavor or courteous hospitality.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-39',
    name: 'Sumaira Fazili',
    rating: 5,
    date: '5 months ago',
    comment: 'Vegetarian choices are surprisingly abundant for a restaurant serving royal Wazwan. Kadhai Paneer and Dal Makhani were spectacular.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-40',
    name: 'Rayees Wagay',
    rating: 5,
    date: '5 months ago',
    comment: 'Their online reservation system made booking effortless. We walked in and our table was ready with customized place cards. Top notch!',
    diningType: 'Dine-In',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-41',
    name: 'Nadia Bazaz',
    rating: 5,
    date: '5 months ago',
    comment: 'Best Kahwa in the Balgarden area. Brewed with original Kashmiri saffron strands and sliced badam. Warm, fragrant, and soothing.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Beverages'
  },
  {
    id: 'rev-42',
    name: 'Shahid Dar',
    rating: 5,
    date: '6 months ago',
    comment: 'Tandoori Chicken Platter had a smoky, charred skin with ultra-tender meat inside. Spiced just right without overpowering.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-43',
    name: 'Mahira Kirmani',
    rating: 5,
    date: '6 months ago',
    comment: 'The interior vibes and comfortable seating make it ideal for family gatherings. High praise for the cleanliness and attentive staff.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-44',
    name: 'Khurshid Parray',
    rating: 4,
    date: '6 months ago',
    comment: 'Hearty portions at reasonable prices. The Rogan Josh gravy with steamed rice was deeply comforting on a rainy Srinagar evening.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-45',
    name: 'Saba Drabu',
    rating: 5,
    date: '6 months ago',
    comment: 'Their Shahi Tukda is decadent and royal! Soaked in cardamon saffron syrup and smothered in homemade thick rabri.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Beverages'
  },
  {
    id: 'rev-46',
    name: 'Zubair Naqash',
    rating: 5,
    date: '7 months ago',
    comment: 'Crispy French Fries and Chicken Popcorn make the perfect evening snack. Great takeaway experience with warm courteous service.',
    diningType: 'Takeaway',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-47',
    name: 'Sana Malik',
    rating: 5,
    date: '7 months ago',
    comment: 'From the aesthetic cutlery to the warm greetings, Amberleaf embodies the soulful essence of Kashmiri hospitality (Mehmaan Nawazi).',
    diningType: 'Family Feast',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-48',
    name: 'Imran Bhat',
    rating: 5,
    date: '7 months ago',
    comment: 'The Dum Mutton Biryani has long rice grains that never turn mushy, layered with slow-simmered tender meat. Exceptional craftsmanship.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Biryani'
  },
  {
    id: 'rev-49',
    name: 'Sadia Lone',
    rating: 5,
    date: '8 months ago',
    comment: 'Ordered a quick lunch during office hours. Service was surprisingly prompt without sacrificing any flavor. Mutton Seekh Kebab was tender and juicy.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Starters'
  },
  {
    id: 'rev-50',
    name: 'Haris Andrabi',
    rating: 5,
    date: '8 months ago',
    comment: 'Rista and Gushtaba both hit the bullseye. As a Kashmiri food critic, I rarely give 5 stars, but Amberleaf truly honors our culinary heritage.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Wazwan'
  },
  {
    id: 'rev-51',
    name: 'Afreen Khan',
    rating: 5,
    date: '9 months ago',
    comment: 'The staff went above and beyond to prepare a special mild gravy for my toddler. Such kindness and attention to detail is rare nowadays.',
    diningType: 'Family Feast',
    verified: true,
    category: 'Ambiance'
  },
  {
    id: 'rev-52',
    name: 'Zahid Lone',
    rating: 5,
    date: '10 months ago',
    comment: 'Amberleaf is a gem in Balgarden Srinagar. Authentic Wazwan, chic glass ambiance, and impeccable cleanliness. Will be returning regularly.',
    diningType: 'Dine-In',
    verified: true,
    category: 'Wazwan'
  }
];
