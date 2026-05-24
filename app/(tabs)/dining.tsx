import { useMemo, useRef, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  Animated,
  ImageBackground,
  Pressable,
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
  getDiningCostLabel,
  getDiningStatus,
  getDiningStatusHelperText,
  getDiningStatusLabel,
  sortDiningByAvailability,
} from '@/utils/dining';
import { formatTimeRange } from '@/utils/time';

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
  const selectedVenueStatus = selectedVenue
    ? getDiningStatus(selectedVenue, currentTime)
    : null;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }}
      style={styles.screen}
      resizeMode="cover"
    >
      <View style={styles.screenOverlay}>
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
              <AvailableNowCard
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
          <Pressable style={styles.overlay} onPress={() => setSelectedVenue(null)}>
            <Animated.View
              onStartShouldSetResponder={() => true}
              style={[
                styles.modal,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>{selectedVenue.name}</Text>

              {selectedVenueStatus ? (
                <View style={styles.modalBadgeRow}>
                  <Text style={styles.modalBadge}>
                    {getDiningStatusLabel(selectedVenueStatus)}
                  </Text>
                  <Text style={styles.modalBadge}>{getDiningCostLabel(selectedVenue)}</Text>
                </View>
              ) : null}

              <View style={styles.modalMetaRow}>
                <Text style={styles.modalMetaLabel}>Category</Text>
                <Text style={styles.modalMetaValue}>{selectedVenue.categoryLabel}</Text>
              </View>

              <View style={styles.modalMetaRow}>
                <Text style={styles.modalMetaLabel}>Hours</Text>
                <Text style={styles.modalMetaValue}>
                  {formatTimeRange(selectedVenue.openTime, selectedVenue.closeTime)}
                </Text>
              </View>

              {selectedVenueStatus ? (
                <Text style={styles.modalStatusText}>
                  {getDiningStatusHelperText(selectedVenue, selectedVenueStatus)}
                </Text>
              ) : null}

              <Text style={styles.modalText}>{selectedVenue.description}</Text>
              <Text style={styles.modalLocation}>{selectedVenue.locationName}</Text>

              <Text style={styles.menuTitle}>Menu Preview</Text>
              {selectedVenue.menuItems.map((item) => (
                <View key={item} style={styles.menuItemRow}>
                  <Text style={styles.menuBullet}>-</Text>
                  <Text style={styles.menuItemText}>{item}</Text>
                </View>
              ))}

              <TouchableOpacity onPress={() => setSelectedVenue(null)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
        ) : null}
      </View>
    </ImageBackground>
  );
}

type AvailableNowCardProps = {
  venue: DiningVenue;
  status: ReturnType<typeof getDiningStatus>;
  onViewMenu: (venue: DiningVenue) => void;
  onPressLocation: (locationId: string) => void;
};

function AvailableNowCard({
  venue,
  status,
  onViewMenu,
  onPressLocation,
}: AvailableNowCardProps) {
  return (
    <View style={styles.availableCard}>
      <View style={styles.availableHeader}>
        <View style={styles.availableTextGroup}>
          <Text style={styles.availableName}>{venue.name}</Text>
          <Text style={styles.availableHelper}>
            {getDiningStatusHelperText(venue, status)}
          </Text>
        </View>

        <View style={styles.availableBadgeStack}>
          <Text style={styles.availableStatusBadge}>{getDiningStatusLabel(status)}</Text>
          <Text style={styles.availableCostBadge}>{getDiningCostLabel(venue)}</Text>
        </View>
      </View>

      <Text style={styles.availableLocation}>{venue.locationName}</Text>

      <View style={styles.availableActions}>
        <TouchableOpacity
          style={styles.compactButton}
          onPress={() => onViewMenu(venue)}
        >
          <Text style={styles.compactButtonText}>View Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryCompactButton}
          onPress={() => onPressLocation(venue.locationId)}
        >
          <Text style={styles.secondaryCompactButtonText}>Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenOverlay: {
    backgroundColor: 'rgba(12, 27, 42, 0.42)',
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
  availableCard: {
    backgroundColor: 'rgba(19, 41, 61, 0.76)',
    borderColor: 'rgba(127, 209, 255, 0.28)',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  availableHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  availableTextGroup: {
    flex: 1,
    paddingRight: 6,
  },
  availableName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  availableHelper: {
    color: colors.sunshine,
    fontWeight: '700',
    marginTop: 6,
  },
  availableBadgeStack: {
    alignItems: 'flex-end',
    gap: 6,
  },
  availableStatusBadge: {
    backgroundColor: colors.seafoam,
    borderRadius: 999,
    color: colors.oceanDark,
    fontSize: 11,
    fontWeight: 'bold',
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  availableCostBadge: {
    backgroundColor: colors.sunshine,
    borderRadius: 999,
    color: colors.oceanDark,
    fontSize: 11,
    fontWeight: 'bold',
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  availableLocation: {
    color: colors.mutedText,
    marginTop: 10,
  },
  availableActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  compactButton: {
    backgroundColor: colors.lagoon,
    borderRadius: 8,
    flex: 1,
    padding: 10,
  },
  compactButtonText: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryCompactButton: {
    borderColor: colors.seafoam,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    width: 86,
  },
  secondaryCompactButtonText: {
    color: colors.seafoam,
    fontWeight: 'bold',
    textAlign: 'center',
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
    maxHeight: '78%',
    padding: 20,
    position: 'absolute',
    right: 0,
  },
  modalHandle: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
    height: 4,
    marginBottom: 14,
    width: 46,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  modalBadge: {
    backgroundColor: colors.sunshine,
    borderRadius: 999,
    color: colors.oceanDark,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalMetaRow: {
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
  },
  modalMetaLabel: {
    color: colors.mutedText,
  },
  modalMetaValue: {
    color: colors.text,
    flex: 1,
    fontWeight: 'bold',
    paddingLeft: 12,
    textAlign: 'right',
  },
  modalStatusText: {
    color: colors.sunshine,
    fontWeight: '700',
    marginTop: 12,
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
  menuTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
  },
  menuItemRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  menuBullet: {
    color: colors.sunshine,
    fontWeight: 'bold',
  },
  menuItemText: {
    color: colors.text,
    flex: 1,
  },
  closeText: {
    color: colors.coral,
    marginTop: 15,
    textAlign: 'center',
  },
});
