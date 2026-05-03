export type Trip = {
  guestName: string;
  shipName: string;
  sailingCountdownText: string;
  sailingDayLabel: string;
  cabinLabel: string;
};

export const trip: Trip = {
  guestName: 'Chauncey',
  shipName: 'Margaritaville at Sea Paradise',
  sailingCountdownText: '3 days until sailing',
  sailingDayLabel: 'Day 1 • Embarkation',
  cabinLabel: 'Cabin pending',
};
