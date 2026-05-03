export type EventCategory = 'party' | 'show' | 'music' | 'dining';

export type CruiseEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  locationId: string;
  locationName: string;
  category: EventCategory;
  description?: string;
};

export const events: CruiseEvent[] = [
  {
    id: 'sail-away-party',
    title: 'Sail Away Party',
    startTime: '16:00',
    endTime: '17:00',
    locationId: 'pool-deck',
    locationName: 'Pool Deck',
    category: 'party',
    description: 'Kick off the cruise with music, dancing, and ocean views.',
  },
  {
    id: 'comedy-show',
    title: 'Comedy Show',
    startTime: '19:30',
    endTime: '20:30',
    locationId: 'main-theater',
    locationName: 'Main Theater',
    category: 'show',
    description: 'A featured comedy set in the ship theater.',
  },
  {
    id: 'live-music',
    title: 'Live Music',
    startTime: '21:00',
    endTime: '23:00',
    locationId: 'lounge-bar',
    locationName: 'Lounge Bar',
    category: 'music',
    description: 'Easygoing live music for the late evening.',
  },
];
