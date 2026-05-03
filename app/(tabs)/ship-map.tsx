import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Badge } from '@/components/Badge';
import { SectionCard } from '@/components/SectionCard';
import { locations } from '@/data/locations';
import { colors } from '@/theme/colors';

export default function ShipMapScreen() {
  const { locationId } = useLocalSearchParams<{ locationId?: string }>();
  const initialLocationId = Array.isArray(locationId) ? locationId[0] : locationId;
  const [selectedLocationId, setSelectedLocationId] = useState(
    initialLocationId ?? locations[0]?.id
  );

  const selectedLocation = useMemo(
    () =>
      locations.find((location) => location.id === selectedLocationId) ?? locations[0],
    [selectedLocationId]
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Location Viewer</Text>
      <Text style={styles.subtitle}>Quick deck and area references for your plan.</Text>

      {selectedLocation ? (
        <SectionCard>
          <View style={styles.focusHeader}>
            <Badge label={selectedLocation.deck} variant="success" />
            <Badge label={selectedLocation.area} variant="info" />
          </View>
          <Text style={styles.focusName}>{selectedLocation.name}</Text>
          {selectedLocation.description ? (
            <Text style={styles.description}>{selectedLocation.description}</Text>
          ) : null}
        </SectionCard>
      ) : null}

      <Text style={styles.sectionTitle}>All Locations</Text>
      {locations.map((location) => {
        const isSelected = location.id === selectedLocation?.id;

        return (
          <TouchableOpacity
            key={location.id}
            style={[styles.locationRow, isSelected && styles.selectedLocationRow]}
            onPress={() => setSelectedLocationId(location.id)}
          >
            <View style={styles.locationTextGroup}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationMeta}>
                {location.deck} • {location.area}
              </Text>
            </View>
            {isSelected ? <Text style={styles.selectedText}>Focused</Text> : null}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.oceanDark,
    flex: 1,
    padding: 20,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.mutedText,
    marginBottom: 20,
    marginTop: 8,
  },
  focusHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  focusName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 14,
  },
  description: {
    color: colors.mutedText,
    lineHeight: 20,
    marginTop: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  locationRow: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 16,
  },
  selectedLocationRow: {
    borderColor: colors.seafoam,
    borderWidth: 1,
  },
  locationTextGroup: {
    flex: 1,
    paddingRight: 10,
  },
  locationName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationMeta: {
    color: colors.mutedText,
    marginTop: 4,
  },
  selectedText: {
    color: colors.seafoam,
    fontWeight: 'bold',
  },
});
