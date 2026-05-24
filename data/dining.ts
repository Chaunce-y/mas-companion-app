export type DiningCategory = 'included' | 'casual' | 'specialty' | 'premium';

export type DiningVenue = {
  id: string;
  name: string;
  category: DiningCategory;
  categoryLabel: string;
  openTime: string;
  closeTime: string;
  locationId: string;
  locationName: string;
  description: string;
  image: string;
  included: boolean;
  menuItems: string[];
};

export const diningVenues: DiningVenue[] = [
  {
    id: 'port-of-indecision-buffet',
    name: 'Port of Indecision Buffet',
    category: 'included',
    categoryLabel: 'Included Dining',
    openTime: '07:00',
    closeTime: '21:00',
    locationId: 'port-of-indecision-buffet',
    locationName: 'Deck 10 • Aft',
    description: 'Flexible buffet dining with breakfast staples, island bowls, salads, and desserts.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    included: true,
    menuItems: ['Tropical fruit bar', 'Jerk chicken bowl', 'Key lime tart'],
  },
  {
    id: 'fins-dining-room',
    name: 'Fins Dining Room',
    category: 'included',
    categoryLabel: 'Included Dining',
    openTime: '17:30',
    closeTime: '21:30',
    locationId: 'fins-dining-room',
    locationName: 'Deck 5 • Aft',
    description: 'Main dining room with polished island-inspired dinner service.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    included: true,
    menuItems: ['Island fish tacos', 'Key lime chicken', 'Coconut rice bowl'],
  },
  {
    id: 'frank-lolas',
    name: "Frank & Lola's Pizzeria",
    category: 'casual',
    categoryLabel: 'Casual Dining',
    openTime: '11:00',
    closeTime: '23:00',
    locationId: 'frank-lolas',
    locationName: 'Deck 10 • Midship',
    description: 'Pizza, quick bites, and late-night comfort food steps from the pool deck.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    included: true,
    menuItems: ['Cheese pizza', 'Pepperoni slice', 'Garlic knots'],
  },
  {
    id: 'coffee-shop',
    name: 'License to Chill Coffee',
    category: 'casual',
    categoryLabel: 'Coffee & Snacks',
    openTime: '06:30',
    closeTime: '22:00',
    locationId: 'coffee-shop',
    locationName: 'Deck 6 • Aft',
    description: 'Coffee, pastries, cold drinks, and small grab-and-go treats.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    included: false,
    menuItems: ['Cold brew', 'Guava pastry', 'Breakfast sandwich'],
  },
  {
    id: 'jwb-steakhouse',
    name: 'JWB Prime Steakhouse',
    category: 'specialty',
    categoryLabel: 'Specialty Dining',
    openTime: '18:00',
    closeTime: '22:00',
    locationId: 'jwb-steakhouse',
    locationName: 'Deck 6 • Forward',
    description: 'Upscale specialty steakhouse with prime steaks, seafood, and casual elegance.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    included: false,
    menuItems: ['Prime ribeye', 'Shrimp cocktail', 'Loaded baked potato'],
  },
  {
    id: 'euphoria-lounge',
    name: 'Euphoria Lounge Bites',
    category: 'casual',
    categoryLabel: 'Lounge Bites',
    openTime: '16:00',
    closeTime: '00:30',
    locationId: 'euphoria-lounge',
    locationName: 'Deck 6 • Midship',
    description: 'Shareable plates and relaxed bar snacks for the evening crowd.',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330',
    included: false,
    menuItems: ['Conch fritters', 'Loaded nachos', 'Citrus wings'],
  },
  {
    id: 'pool-grill',
    name: 'Poolside Grill',
    category: 'included',
    categoryLabel: 'Poolside Casual',
    openTime: '11:30',
    closeTime: '18:00',
    locationId: 'pool-deck',
    locationName: 'Deck 10 • Midship',
    description: 'Burgers, fries, and sunny deck snacks between swims and sail-away sets.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    included: true,
    menuItems: ['Cheeseburger', 'Veggie burger', 'Seasoned fries'],
  },
  {
    id: 'premium-desserts',
    name: 'Sweet Island Treats',
    category: 'premium',
    categoryLabel: 'Premium Treats',
    openTime: '12:00',
    closeTime: '22:30',
    locationId: 'atrium',
    locationName: 'Deck 5 • Midship',
    description: 'Premium desserts, milkshakes, and colorful treats for a vacation splurge.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
    included: false,
    menuItems: ['Key lime milkshake', 'Brownie sundae', 'Mango cheesecake'],
  },
];
