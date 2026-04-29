export type Restaurant = {
  id: string;
  name: string;
  type: string;
  hours: string;
  description: string;
  image: string;
};

export const restaurants: Restaurant[] = [
  {
    id: 'fins',
    name: 'Fins Dining Room',
    type: 'Included Dining',
    hours: '5:30 PM – 9:30 PM',
    description: 'Main dining room with island-inspired dinner service.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
  },
  {
    id: 'frank-lolas',
    name: "Frank & Lola's Pizzeria",
    type: 'Casual Dining',
    hours: '11:00 AM – 11:00 PM',
    description: 'Pizza, quick bites, and late-night comfort food.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  },
  {
    id: 'jwb',
    name: 'JWB Prime Steakhouse',
    type: 'Specialty Dining',
    hours: '6:00 PM – 10:00 PM',
    description: 'Upscale specialty steakhouse with prime steaks, seafood, and casual elegance.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
  },
];