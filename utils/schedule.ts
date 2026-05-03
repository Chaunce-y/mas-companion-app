import { CruiseEvent } from '@/data/events';
import {
  TimeInput,
  getCurrentMinutes,
  isTimeRangeActive,
  timeStringToMinutes,
} from '@/utils/time';

export type EventStatus = 'live' | 'next' | 'upcoming' | 'past';

export function sortEventsByStartTime(events: CruiseEvent[]): CruiseEvent[] {
  return [...events].sort(
    (a, b) => timeStringToMinutes(a.startTime) - timeStringToMinutes(b.startTime)
  );
}

export function getLiveEvents(
  events: CruiseEvent[],
  currentTime: TimeInput = new Date()
): CruiseEvent[] {
  return sortEventsByStartTime(events).filter((event) =>
    isTimeRangeActive(event.startTime, event.endTime, currentTime)
  );
}

export function getNextEvents(
  events: CruiseEvent[],
  currentTime: TimeInput = new Date()
): CruiseEvent[] {
  const now = getCurrentMinutes(currentTime);
  const futureEvents = sortEventsByStartTime(events).filter(
    (event) => timeStringToMinutes(event.startTime) > now
  );

  return futureEvents.slice(0, 2);
}

export function getEventStatus(
  event: CruiseEvent,
  currentTime: TimeInput = new Date(),
  nextEventIds: string[] = []
): EventStatus {
  const now = getCurrentMinutes(currentTime);
  const start = timeStringToMinutes(event.startTime);
  const end = timeStringToMinutes(event.endTime);

  if (isTimeRangeActive(event.startTime, event.endTime, currentTime)) {
    return 'live';
  }

  if (nextEventIds.includes(event.id)) {
    return 'next';
  }

  if (start > now) {
    return 'upcoming';
  }

  if (start > end) {
    return now < end ? 'live' : 'upcoming';
  }

  return 'past';
}

export function getEventStatusLabel(status: EventStatus): string {
  switch (status) {
    case 'live':
      return 'LIVE NOW';
    case 'next':
      return 'NEXT UP';
    case 'past':
      return 'PAST';
    case 'upcoming':
    default:
      return 'UPCOMING';
  }
}
