export type ShipLocation = {
  id: string;
  name: string;
  deck: string;
  area: string;
  description?: string;
};

export const locations: ShipLocation[] = [
  {
    id: 'atrium',
    name: 'Atrium Welcome Desk',
    deck: 'Deck 5',
    area: 'Midship',
    description: 'Central guest services area for day-one questions, wayfinding, and onboard support.',
  },
  {
    id: 'fins-dining-room',
    name: 'Fins Dining Room',
    deck: 'Deck 5',
    area: 'Aft',
    description: 'Main included dining room with seated dinner service.',
  },
  {
    id: 'muster-stations',
    name: 'Assigned Muster Stations',
    deck: 'Deck 5',
    area: 'Forward and Aft',
    description: 'Safety briefing zones. Check your boarding materials for your assigned station.',
  },
  {
    id: 'jwb-steakhouse',
    name: 'JWB Prime Steakhouse',
    deck: 'Deck 6',
    area: 'Forward',
    description: 'Specialty steakhouse venue for premium dinner reservations.',
  },
  {
    id: 'euphoria-lounge',
    name: 'Euphoria Lounge',
    deck: 'Deck 6',
    area: 'Midship',
    description: 'Evening cocktails, small gatherings, and casual pre-show meetups.',
  },
  {
    id: 'lounge-bar',
    name: 'Lounge Bar',
    deck: 'Deck 7',
    area: 'Midship',
    description: 'Casual lounge for live music, trivia, and evening drinks.',
  },
  {
    id: 'main-theater',
    name: 'Main Theater',
    deck: 'Deck 8',
    area: 'Forward',
    description: 'Large theater venue for headline shows, comedy, and destination talks.',
  },
  {
    id: 'casino',
    name: 'Margaritaville Casino',
    deck: 'Deck 8',
    area: 'Midship',
    description: 'Casino gaming area and evening entertainment hub.',
  },
  {
    id: 'spa',
    name: 'St. Somewhere Spa',
    deck: 'Deck 9',
    area: 'Forward',
    description: 'Spa, salon, and wellness treatment area.',
  },
  {
    id: 'fitness-center',
    name: 'Fitness Center',
    deck: 'Deck 9',
    area: 'Forward',
    description: 'Cardio, strength equipment, and wellness programming.',
  },
  {
    id: 'kids-club',
    name: 'Parakeets Kids Club',
    deck: 'Deck 9',
    area: 'Aft',
    description: 'Youth activities, family check-in, and kid-friendly programming.',
  },
  {
    id: 'pool-deck',
    name: 'Pool Deck',
    deck: 'Deck 10',
    area: 'Midship',
    description: 'Open-air pool area for sail away events, deck parties, and daytime lounging.',
  },
  {
    id: 'frank-lolas',
    name: "Frank & Lola's Pizzeria",
    deck: 'Deck 10',
    area: 'Midship',
    description: 'Casual pizzeria and quick bite stop near the pool deck.',
  },
  {
    id: 'port-of-indecision-buffet',
    name: 'Port of Indecision Buffet',
    deck: 'Deck 10',
    area: 'Aft',
    description: 'Casual buffet venue for flexible breakfast, lunch, and dinner options.',
  },
  {
    id: 'coffee-shop',
    name: 'License to Chill Coffee',
    deck: 'Deck 6',
    area: 'Aft',
    description: 'Coffee, pastries, and grab-and-go snacks.',
  },
];
