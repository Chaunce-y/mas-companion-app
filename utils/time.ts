export type TimeInput = Date | string;

const MINUTES_PER_DAY = 24 * 60;

export function timeStringToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(`Invalid time string: ${time}`);
  }

  return hours * 60 + minutes;
}

export function getCurrentMinutes(currentTime: TimeInput = new Date()): number {
  if (typeof currentTime === 'string') {
    return timeStringToMinutes(currentTime);
  }

  return currentTime.getHours() * 60 + currentTime.getMinutes();
}

export function formatTime(time: string): string {
  const totalMinutes = timeStringToMinutes(time);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

export function isTimeRangeActive(
  startTime: string,
  endTime: string,
  currentTime: TimeInput = new Date()
): boolean {
  const now = getCurrentMinutes(currentTime);
  const start = timeStringToMinutes(startTime);
  const end = timeStringToMinutes(endTime);

  if (start <= end) {
    return now >= start && now < end;
  }

  return now >= start || now < end;
}

export function isUpcoming(
  startTime: string,
  currentTime: TimeInput = new Date()
): boolean {
  return timeStringToMinutes(startTime) > getCurrentMinutes(currentTime);
}

export function minutesUntil(
  targetTime: string,
  currentTime: TimeInput = new Date()
): number {
  const now = getCurrentMinutes(currentTime);
  const target = timeStringToMinutes(targetTime);
  const diff = target - now;

  return diff >= 0 ? diff : diff + MINUTES_PER_DAY;
}

export function minutesUntilClose(
  closeTime: string,
  currentTime: TimeInput = new Date()
): number {
  return minutesUntil(closeTime, currentTime);
}

export function minutesUntilOpen(
  openTime: string,
  currentTime: TimeInput = new Date()
): number {
  return minutesUntil(openTime, currentTime);
}
