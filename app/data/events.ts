export type Event = {
  id: string;
  title: string;
  time: string;
  location: string;
};

export const events: Event[] = [
  { id: '1', title: 'Sail Away Party', time: '4:00 PM', location: 'Pool Deck' },
  { id: '2', title: 'Comedy Show', time: '7:30 PM', location: 'Main Theater' },
  { id: '3', title: 'Live Music', time: '9:00 PM', location: 'Lounge Bar' },
];