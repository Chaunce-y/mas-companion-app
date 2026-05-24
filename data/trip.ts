export type Trip = {
  guestName: string;
  shipName: string;
  sailingCountdownText: string;
  sailingDayLabel: string;
  cabinLabel: string;
  itineraryLabel: string;
  reservationLabel: string;
  partySize: number;
  homePort: string;
  destination: string;
  conceptDisclaimer: string;
};

export const trip: Trip = {
  guestName: 'Chauncey',
  shipName: 'Margaritaville at Sea Paradise',
  sailingCountdownText: '3 days until sailing',
  sailingDayLabel: 'Day 1 • Embarkation',
  cabinLabel: 'Cabin pending',
  itineraryLabel: 'Palm Beach to Grand Bahama',
  reservationLabel: 'Portfolio demo reservation',
  partySize: 2,
  homePort: 'Port of Palm Beach',
  destination: 'Grand Bahama Island',
  conceptDisclaimer: 'Unofficial fan-built companion app concept for portfolio/demo use.',
};
