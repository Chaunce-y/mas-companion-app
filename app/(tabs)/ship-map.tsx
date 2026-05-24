import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Badge } from '@/components/Badge';
import { SectionCard } from '@/components/SectionCard';
import { locations, ShipLocation } from '@/data/locations';
import { colors } from '@/theme/colors';

const ALL_DECKS = 'All Decks';

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
  const [selectedDeck, setSelectedDeck] = useState(selectedLocation?.deck ?? ALL_DECKS);

  const decks = useMemo(
    () => [ALL_DECKS, ...Array.from(new Set(locations.map((location) => location.deck)))],
    []
  );
  const visibleLocations = useMemo(
    () =>
      selectedDeck === ALL_DECKS
        ? locations
        : locations.filter((location) => location.deck === selectedDeck),
    [selectedDeck]
  );
  const sameDeckLocations = useMemo(
    () =>
      selectedLocation
        ? locations.filter(
            (location) =>
              location.deck === selectedLocation.deck && location.id !== selectedLocation.id
          )
        : [],
    [selectedLocation]
  );

  const handleSelectLocation = (location: ShipLocation) => {
    setSelectedLocationId(location.id);
    setSelectedDeck(location.deck);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Deck Guide</Text>
      <Text style={styles.subtitle}>Find dining, events, lounges, and day-one essentials by deck.</Text>

      {selectedLocation ? (
        <SectionCard style={styles.focusCard}>
          <View style={styles.focusHeader}>
            <Badge label={selectedLocation.deck} variant="success" />
            <Badge label={selectedLocation.area} variant="info" />
          </View>
          <Text style={styles.focusLabel}>Currently focused</Text>
          <Text style={styles.focusName}>{selectedLocation.name}</Text>
          {selectedLocation.description ? (
            <Text style={styles.description}>{selectedLocation.description}</Text>
          ) : null}

          {sameDeckLocations.length > 0 ? (
            <View style={styles.nearbyPanel}>
              <Text style={styles.nearbyTitle}>Also on {selectedLocation.deck}</Text>
              <Text style={styles.nearbyText}>
                {sameDeckLocations.slice(0, 3).map((location) => location.name).join(' • ')}
              </Text>
            </View>
          ) : null}
        </SectionCard>
      ) : null}

      <Text style={styles.sectionTitle}>Filter by Deck</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deckScroller}>
        {decks.map((deck) => {
          const isSelected = deck === selectedDeck;

          return (
            <TouchableOpacity
              key={deck}
              style={[styles.deckChip, isSelected && styles.selectedDeckChip]}
              onPress={() => setSelectedDeck(deck)}
            >
              <Text style={[styles.deckChipText, isSelected && styles.selectedDeckChipText]}>
                {deck}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.sectionTitle}>Locations</Text>
      {visibleLocations.map((location) => {
        const isSelected = location.id === selectedLocation?.id;

        return (
          <TouchableOpacity
            key={location.id}
            style={[styles.locationCard, isSelected && styles.selectedLocationCard]}
            onPress={() => handleSelectLocation(location)}
          >
            <View style={styles.locationTopRow}>
              <View style={styles.locationTextGroup}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationMeta}>
                  {location.deck} • {location.area}
                </Text>
              </View>
              {isSelected ? <Text style={styles.selectedText}>Focused</Text> : null}
            </View>
            {location.description ? (
              <Text style={styles.locationDescription}>{location.description}</Text>
            ) : null}
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
    lineHeight: 20,
    marginBottom: 20,
    marginTop: 8,
  },
  focusCard: {
    borderColor: 'rgba(127, 209, 255, 0.28)',
    borderWidth: 1,
  },
  focusHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  focusLabel: {
    color: colors.sunshine,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 16,
    textTransform: 'uppercase',
  },
  focusName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 6,
  },
  description: {
    color: colors.mutedText,
    lineHeight: 20,
    marginTop: 8,
  },
  nearbyPanel: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    marginTop: 14,
    padding: 12,
  },
  nearbyTitle: {
    color: colors.text,
    fontWeight: 'bold',
  },
  nearbyText: {
    color: colors.mutedText,
    lineHeight: 20,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  deckScroller: {
    marginBottom: 18,
  },
  deckChip: {
    backgroundColor: colors.card,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  selectedDeckChip: {
    backgroundColor: colors.seafoam,
  },
  deckChipText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  selectedDeckChipText: {
    color: colors.oceanDark,
  },
  locationCard: {
    backgroundColor: colors.card,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  selectedLocationCard: {
    borderColor: colors.seafoam,
    borderWidth: 2,
  },
  locationTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
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
    color: colors.seafoam,
    fontWeight: '600',
    marginTop: 4,
  },
  locationDescription: {
    color: colors.mutedText,
    lineHeight: 20,
    marginTop: 8,
  },
  selectedText: {
    color: colors.seafoam,
    fontWeight: 'bold',
  },
});
