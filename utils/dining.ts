import { DiningVenue } from '@/data/dining';
import {
  TimeInput,
  formatTime,
  isTimeRangeActive,
  minutesUntilClose,
  minutesUntilOpen,
  timeStringToMinutes,
} from '@/utils/time';

export type DiningStatus = 'open' | 'closed' | 'openingSoon' | 'closingSoon';

const SOON_THRESHOLD_MINUTES = 60;

export function getDiningStatus(
  venue: DiningVenue,
  currentTime: TimeInput = new Date()
): DiningStatus {
  const isOpen = isTimeRangeActive(venue.openTime, venue.closeTime, currentTime);

  if (isOpen) {
    return minutesUntilClose(venue.closeTime, currentTime) <= SOON_THRESHOLD_MINUTES
      ? 'closingSoon'
      : 'open';
  }

  return minutesUntilOpen(venue.openTime, currentTime) <= SOON_THRESHOLD_MINUTES
    ? 'openingSoon'
    : 'closed';
}

export function getDiningStatusLabel(
  venue: DiningVenue,
  status: DiningStatus
): string {
  switch (status) {
    case 'open':
      return 'OPEN NOW';
    case 'openingSoon':
      return `OPENS AT ${formatTime(venue.openTime)}`;
    case 'closingSoon':
      return 'CLOSING SOON';
    case 'closed':
    default:
      return 'CLOSED';
  }
}

export function getDiningCostLabel(venue: DiningVenue): string {
  if (!venue.included) {
    return 'EXTRA COST';
  }

  return venue.category === 'casual' ? 'QUICK BITE' : 'INCLUDED';
}

export function getAvailableNow(
  diningVenues: DiningVenue[],
  currentTime: TimeInput = new Date()
): DiningVenue[] {
  return diningVenues.filter((venue) => {
    const status = getDiningStatus(venue, currentTime);

    return status === 'open' || status === 'closingSoon';
  });
}

export function sortDiningByAvailability(
  diningVenues: DiningVenue[],
  currentTime: TimeInput = new Date()
): DiningVenue[] {
  const rank: Record<DiningStatus, number> = {
    open: 0,
    closingSoon: 1,
    openingSoon: 2,
    closed: 3,
  };

  return [...diningVenues].sort((a, b) => {
    const statusDiff =
      rank[getDiningStatus(a, currentTime)] - rank[getDiningStatus(b, currentTime)];

    if (statusDiff !== 0) {
      return statusDiff;
    }

    return timeStringToMinutes(a.openTime) - timeStringToMinutes(b.openTime);
  });
}
