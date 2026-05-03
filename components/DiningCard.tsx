import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Badge, BadgeVariant } from '@/components/Badge';
import { SectionCard } from '@/components/SectionCard';
import { DiningVenue } from '@/data/dining';
import { colors } from '@/theme/colors';
import {
  DiningStatus,
  getDiningCostLabel,
  getDiningStatusLabel,
} from '@/utils/dining';
import { formatTimeRange } from '@/utils/time';

type DiningCardProps = {
  venue: DiningVenue;
  status: DiningStatus;
  onViewMenu: (venue: DiningVenue) => void;
  onPressLocation?: (locationId: string) => void;
};

export function DiningCard({
  venue,
  status,
  onViewMenu,
  onPressLocation,
}: DiningCardProps) {
  return (
    <SectionCard>
      <Image source={{ uri: venue.image }} style={styles.image} />

      <View style={styles.badgeRow}>
        <Badge label={getDiningStatusLabel(venue, status)} variant={getStatusVariant(status)} />
        <Badge label={getDiningCostLabel(venue)} variant={venue.included ? 'success' : 'warning'} />
      </View>

      <Text style={styles.name}>{venue.name}</Text>
      <Text style={styles.category}>{venue.categoryLabel}</Text>
      <Text style={styles.hours}>{formatTimeRange(venue.openTime, venue.closeTime)}</Text>
      <Text style={styles.description}>{venue.description}</Text>

      <TouchableOpacity
        disabled={!onPressLocation}
        onPress={() => onPressLocation?.(venue.locationId)}
        style={styles.locationRow}
      >
        <Ionicons name="location" size={16} color={colors.seafoam} />
        <Text style={styles.location}>{venue.locationName}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => onViewMenu(venue)}>
        <Text style={styles.actionText}>View Menu</Text>
      </TouchableOpacity>
    </SectionCard>
  );
}

function getStatusVariant(status: DiningStatus): BadgeVariant {
  switch (status) {
    case 'open':
      return 'success';
    case 'openingSoon':
    case 'closingSoon':
      return 'warning';
    case 'closed':
    default:
      return 'muted';
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 14,
    height: 140,
    marginBottom: 12,
    width: '100%',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  category: {
    color: colors.mutedText,
    marginTop: 4,
  },
  hours: {
    color: colors.seafoam,
    fontWeight: '600',
    marginTop: 6,
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
  actionButton: {
    backgroundColor: colors.lagoon,
    borderRadius: 8,
    marginTop: 12,
    padding: 10,
  },
  actionText: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
