import { useMemo, useRef, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DiningCard } from '@/components/DiningCard';
import { DiningVenue, diningVenues } from '@/data/dining';
import { colors } from '@/theme/colors';
import {
  getAvailableNow,
  getDiningStatus,
  sortDiningByAvailability,
} from '@/utils/dining';

export default function DiningScreen() {
  const router = useRouter();
  const [selectedVenue, setSelectedVenue] = useState<DiningVenue | null>(null);
  const [currentTime] = useState(new Date());
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (selectedVenue) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300);
    }
  }, [selectedVenue, slideAnim]);

  const availableNow = useMemo(
    () => getAvailableNow(diningVenues, currentTime),
    [currentTime]
  );
  const sortedVenues = useMemo(
    () => sortDiningByAvailability(diningVenues, currentTime),
    [currentTime]
  );

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Onboard Dining</Text>
          <Text style={styles.heroTitle}>Eat, drink, and cruise easy</Text>
          <Text style={styles.heroSubtitle}>
            Discover included dining, specialty restaurants, and late-night bites.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Available Now</Text>
        {availableNow.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No dining venues are open right now.</Text>
          </View>
        ) : (
          availableNow.map((venue) => (
            <DiningCard
              key={`available-${venue.id}`}
              venue={venue}
              status={getDiningStatus(venue, currentTime)}
              onViewMenu={setSelectedVenue}
              onPressLocation={(locationId) =>
                router.push({ pathname: '/ship-map', params: { locationId } })
              }
            />
          ))
        )}

        <Text style={styles.sectionTitle}>All Dining</Text>
        {sortedVenues.map((venue) => (
          <DiningCard
            key={venue.id}
            venue={venue}
            status={getDiningStatus(venue, currentTime)}
            onViewMenu={setSelectedVenue}
            onPressLocation={(locationId) =>
              router.push({ pathname: '/ship-map', params: { locationId } })
            }
          />
        ))}
      </ScrollView>

      {selectedVenue ? (
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.modalTitle}>{selectedVenue.name}</Text>
            <Text style={styles.modalText}>{selectedVenue.description}</Text>
            <Text style={styles.modalLocation}>{selectedVenue.locationName}</Text>

            <TouchableOpacity onPress={() => setSelectedVenue(null)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.oceanDark,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  hero: {
    backgroundColor: colors.ocean,
    borderRadius: 24,
    marginBottom: 20,
    padding: 22,
  },
  eyebrow: {
    color: colors.sunshine,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    color: colors.mutedText,
    fontSize: 16,
    marginTop: 6,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    padding: 18,
  },
  emptyText: {
    color: colors.mutedText,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modal: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
    padding: 20,
    position: 'absolute',
    right: 0,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText: {
    color: colors.mutedText,
    marginTop: 10,
  },
  modalLocation: {
    color: colors.seafoam,
    fontWeight: '600',
    marginTop: 10,
  },
  closeText: {
    color: colors.coral,
    marginTop: 15,
    textAlign: 'center',
  },
});
