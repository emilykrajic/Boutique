// Static product catalog.
// Replace this array with your real products — the search bar in App.vue
// matches against: name, description, category, tags, and color.
// Keep these field names (or update the search code in App.vue to match yours).
// Tags are the main lever for search recall — include material, style,
// occasion, fit, season, and any synonyms a customer might type.

export const products = [
  {
    id: 'top-001',
    name: 'Wildflower Crop Top',
    description: 'Hand-dyed cotton crop top with an airy floral print, perfect for warm days.',
    category: 'tops',
    price: 38,
    color: 'Cream',
    image: '/products/wildflower-crop-top.jpg',
    tags: [
      'floral', 'flower', 'cotton', 'crop', 'crop top', 'summer',
      'casual', 'boho', 'bohemian', 'lightweight', 'short sleeve',
      'handmade', 'hand-dyed', 'daytime', 'festival', 'cute top',
    ],
  },
  {
    id: 'top-002',
    name: 'Moonlit Lace Blouse',
    description: 'Sheer lace blouse with billowy sleeves, styled for evening wear.',
    category: 'tops',
    price: 54,
    color: 'Midnight Blue',
    image: '/products/moonlit-lace-blouse.jpg',
    tags: [
      'lace', 'evening', 'sheer', 'blouse', 'romantic', 'dressy',
      'formal', 'date night', 'billowy sleeves', 'long sleeve',
      'elegant', 'night out', 'party top', 'feminine',
    ],
  },
  {
    id: 'pants-001',
    name: 'Prairie Wide-Leg Trousers',
    description: 'High-waisted linen trousers with a relaxed wide-leg fit.',
    category: 'pants',
    price: 62,
    color: 'Sand',
    image: '/products/prairie-trousers.jpg',
    tags: [
      'linen', 'wide-leg', 'wide leg', 'high-waisted', 'high waisted',
      'trousers', 'pants', 'relaxed fit', 'breathable', 'summer',
      'flowy', 'comfortable', 'casual', 'neutral', 'beach pants',
    ],
  },
  {
    id: 'skirt-001',
    name: 'Wild Thing Midi Skirt',
    description: 'Flowing midi skirt in a hand-painted botanical print.',
    category: 'skirts',
    price: 48,
    color: 'Sage Green',
    image: '/products/wild-thing-midi.jpg',
    tags: [
      'midi', 'midi skirt', 'botanical', 'floral', 'flowy', 'hand-painted',
      'handmade', 'boho', 'bohemian', 'green', 'earthy', 'flowing',
      'lightweight', 'summer', 'casual',
    ],
  },
  {
    id: 'dress-001',
    name: 'Golden Hour Sundress',
    description: 'Lightweight sundress in a warm ochre tone with adjustable straps.',
    category: 'dresses',
    price: 72,
    color: 'Ochre',
    image: '/products/golden-hour-sundress.jpg',
    tags: [
      'sundress', 'dress', 'ochre', 'orange', 'warm tone', 'adjustable straps',
      'lightweight', 'summer', 'beach dress', 'vacation', 'casual',
      'flowy', 'sleeveless', 'boho', 'golden hour',
    ],
  },
  {
    id: 'acc-001',
    name: 'Sun-Dried Straw Hat',
    description: 'Wide-brimmed straw hat, handwoven for sun protection with style.',
    category: 'accessories',
    price: 29,
    color: 'Natural',
    image: '/products/straw-hat.jpg',
    tags: [
      'hat', 'straw', 'straw hat', 'sun protection', 'sun hat', 'wide brim',
      'wide-brimmed', 'handwoven', 'handmade', 'summer', 'beach',
      'vacation', 'accessory', 'natural', 'boho',
    ],
  },
];