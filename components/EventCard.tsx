import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Badge, BadgeVariant } from '@/components/Badge';
import { SectionCard } from '@/components/SectionCard';
import { CruiseEvent } from '@/data/events';
import { colors } from '@/theme/colors';
import { EventStatus, getEventStatusLabel } from '@/utils/schedule';
import { formatTimeRange } from '@/utils/time';

type EventCardProps = {
  event: CruiseEvent;
  status: EventStatus;
  isInPlan: boolean;
  onTogglePlan: (id: string) => void;
  compact?: boolean;
  onPressLocation?: (locationId: string) => void;
};

export function EventCard({
  event,
  status,
  isInPlan,
  onTogglePlan,
  compact = false,
  onPressLocation,
}: EventCardProps) {
  return (
    <SectionCard>
      <View style={styles.headerRow}>
        <Badge label={getEventStatusLabel(status)} variant={getStatusVariant(status)} />
        <View style={styles.timeRow}>
          <Ionicons name="time" size={16} color={colors.seafoam} />
          <Text style={styles.time}>{formatTimeRange(event.startTime, event.endTime)}</Text>
        </View>
      </View>

      <Text style={styles.title}>{event.title}</Text>

      {!compact && event.description ? (
        <Text style={styles.description}>{event.description}</Text>
      ) : null}

      <TouchableOpacity
        disabled={!onPressLocation}
        onPress={() => onPressLocation?.(event.locationId)}
        style={styles.locationRow}
      >
        <Ionicons name="location" size={16} color={colors.seafoam} />
        <Text style={styles.location}>{event.locationName}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isInPlan && styles.selectedButton]}
        onPress={() => onTogglePlan(event.id)}
      >
        <Text style={[styles.buttonText, isInPlan && styles.selectedButtonText]}>
          {isInPlan ? '✓ In My Plan' : 'Add to My Plan'}
        </Text>
      </TouchableOpacity>
    </SectionCard>
  );
}

function getStatusVariant(status: EventStatus): BadgeVariant {
  switch (status) {
    case 'live':
      return 'danger';
    case 'next':
      return 'warning';
    case 'past':
      return 'muted';
    case 'upcoming':
    default:
      return 'success';
  }
}

const styles = StyleSheet.create({
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  timeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 5,
    justifyContent: 'flex-end',
  },
  time: {
    color: colors.seafoam,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  description: {
    color: colors.mutedText,
    lineHeight: 20,
    marginTop: 8,
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
  },
  location: {
    color: colors.mutedText,
  },
  button: {
    backgroundColor: colors.lagoon,
    borderRadius: 8,
    marginTop: 14,
    padding: 10,
  },
  selectedButton: {
    backgroundColor: colors.seafoam,
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: colors.oceanDark,
  },
});
