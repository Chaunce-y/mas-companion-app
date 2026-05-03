export type DiningCategory = 'included' | 'casual' | 'specialty';

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
};

export const diningVenues: DiningVenue[] = [
  {
    id: 'fins-dining-room',
    name: 'Fins Dining Room',
    category: 'included',
    categoryLabel: 'Included Dining',
    openTime: '17:30',
    closeTime: '21:30',
    locationId: 'fins-dining-room',
    locationName: 'Deck 5 • Aft',
    description: 'Main dining room with island-inspired dinner service.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    included: true,
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
    description: 'Pizza, quick bites, and late-night comfort food.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    included: true,
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
    description:
      'Upscale specialty steakhouse with prime steaks, seafood, and casual elegance.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    included: false,
  },
];
