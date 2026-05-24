export type EventCategory =
  | 'party'
  | 'show'
  | 'music'
  | 'dining'
  | 'wellness'
  | 'family'
  | 'port'
  | 'activity';

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
    id: 'embarkation-welcome',
    title: 'Welcome Aboard Check-In',
    startTime: '11:30',
    endTime: '13:00',
    locationId: 'atrium',
    locationName: 'Atrium Welcome Desk',
    category: 'activity',
    description: 'Grab your bearings, review the day plan, and get a friendly island-time welcome.',
  },
  {
    id: 'buffet-lunch',
    title: 'Embarkation Lunch',
    startTime: '12:00',
    endTime: '14:30',
    locationId: 'port-of-indecision-buffet',
    locationName: 'Port of Indecision Buffet',
    category: 'dining',
    description: 'Casual first-day lunch with ocean views and quick-service favorites.',
  },
  {
    id: 'spa-open-house',
    title: 'St. Somewhere Spa Open House',
    startTime: '13:30',
    endTime: '14:15',
    locationId: 'spa',
    locationName: 'St. Somewhere Spa',
    category: 'wellness',
    description: 'Tour the spa, preview treatments, and learn about embarkation-day specials.',
  },
  {
    id: 'kids-club-orientation',
    title: 'Parakeets Kids Club Orientation',
    startTime: '14:30',
    endTime: '15:00',
    locationId: 'kids-club',
    locationName: 'Parakeets Kids Club',
    category: 'family',
    description: 'A quick intro for families to check activities, safety rules, and pickup details.',
  },
  {
    id: 'safety-briefing',
    title: 'Guest Safety Briefing',
    startTime: '15:15',
    endTime: '15:45',
    locationId: 'muster-stations',
    locationName: 'Assigned Muster Stations',
    category: 'activity',
    description: 'Required safety briefing before sail away. Check your assigned station.',
  },
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
    id: 'sunset-trivia',
    title: 'Sunset Island Trivia',
    startTime: '17:15',
    endTime: '18:00',
    locationId: 'lounge-bar',
    locationName: 'Lounge Bar',
    category: 'activity',
    description: 'A relaxed trivia round with tropical prizes and easygoing lounge energy.',
  },
  {
    id: 'fins-dinner-service',
    title: 'Fins Dinner Service',
    startTime: '18:00',
    endTime: '19:15',
    locationId: 'fins-dining-room',
    locationName: 'Fins Dining Room',
    category: 'dining',
    description: 'Main dining room dinner window with island-inspired plates.',
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
    id: 'caribbean-deck-party',
    title: 'Caribbean Deck Party',
    startTime: '20:45',
    endTime: '21:30',
    locationId: 'pool-deck',
    locationName: 'Pool Deck',
    category: 'party',
    description: 'High-energy deck party with dancing, island playlists, and night-at-sea views.',
  },
  {
    id: 'live-music',
    title: 'Live Music at the Lounge',
    startTime: '21:00',
    endTime: '23:00',
    locationId: 'lounge-bar',
    locationName: 'Lounge Bar',
    category: 'music',
    description: 'Easygoing live music for the late evening.',
  },
  {
    id: 'port-preview',
    title: 'Grand Bahama Port Preview',
    startTime: '22:15',
    endTime: '22:45',
    locationId: 'main-theater',
    locationName: 'Main Theater',
    category: 'port',
    description: 'Quick overview of tomorrow’s destination highlights and practical tips.',
  },
];
