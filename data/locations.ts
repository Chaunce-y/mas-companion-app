export type ShipLocation = {
  id: string;
  name: string;
  deck: string;
  area: string;
  description?: string;
};

export const locations: ShipLocation[] = [
  {
    id: 'pool-deck',
    name: 'Pool Deck',
    deck: 'Deck 10',
    area: 'Midship',
    description: 'Open-air pool area for sail away events and daytime lounging.',
  },
  {
    id: 'main-theater',
    name: 'Main Theater',
    deck: 'Deck 8',
    area: 'Forward',
    description: 'Large theater venue for headline shows and entertainment.',
  },
  {
    id: 'lounge-bar',
    name: 'Lounge Bar',
    deck: 'Deck 7',
    area: 'Midship',
    description: 'Casual lounge for live music and evening drinks.',
  },
  {
    id: 'fins-dining-room',
    name: 'Fins Dining Room',
    deck: 'Deck 5',
    area: 'Aft',
    description: 'Main included dining room.',
  },
  {
    id: 'frank-lolas',
    name: "Frank & Lola's Pizzeria",
    deck: 'Deck 10',
    area: 'Midship',
    description: 'Casual pizzeria and quick bite stop.',
  },
  {
    id: 'jwb-steakhouse',
    name: 'JWB Prime Steakhouse',
    deck: 'Deck 6',
    area: 'Forward',
    description: 'Specialty steakhouse venue.',
  },
];
