import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Badge } from '@/components/Badge';
import { SectionCard } from '@/components/SectionCard';
import { events } from '@/data/events';
import { trip } from '@/data/trip';
import { colors } from '@/theme/colors';
import { getSavedPlanIds, togglePlanItem } from '@/storage/planStorage';
import {
  getEventStatus,
  getEventStatusLabel,
  getLiveEvents,
  getNextEvents,
} from '@/utils/schedule';
import { formatTimeRange } from '@/utils/time';

export default function HomeScreen() {
  const router = useRouter();
  const [myPlan, setMyPlan] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      const loadPlan = async () => {
        setCurrentTime(new Date());
        setMyPlan(await getSavedPlanIds());
      };

      loadPlan();
    }, [])
  );

  const liveEvents = useMemo(
    () => getLiveEvents(events, currentTime),
    [currentTime]
  );
  const nextEvents = useMemo(
    () => getNextEvents(events, currentTime),
    [currentTime]
  );
  const nextEventIds = useMemo(
    () => nextEvents.slice(0, 1).map((event) => event.id),
    [nextEvents]
  );
  const planEvents = useMemo(
    () =>
      myPlan
        .map((id) => events.find((event) => event.id === id))
        .filter((event) => event !== undefined),
    [myPlan]
  );

  const handleTogglePlan = async (id: string) => {
    setMyPlan(await togglePlanItem(id));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Island Time Companion</Text>
            <Text style={styles.heroTitle}>Welcome aboard, {trip.guestName}</Text>
            <Text style={styles.heroSubtitle}>{trip.shipName}</Text>

            <View style={styles.countdownPill}>
              <Text style={styles.countdownText}>{trip.sailingCountdownText}</Text>
            </View>
          </View>

          <SectionCard tone="glass">
            <Text style={styles.cardTitle}>Happening Now</Text>
            {liveEvents.length === 0 ? (
              <Text style={styles.cardText}>Nothing is live right now.</Text>
            ) : (
              liveEvents.map((event) => (
                <EventPreview
                  key={event.id}
                  title={event.title}
                  time={formatTimeRange(event.startTime, event.endTime)}
                  location={event.locationName}
                  statusLabel={getEventStatusLabel(
                    getEventStatus(event, currentTime, nextEventIds)
                  )}
                />
              ))
            )}
          </SectionCard>

          <SectionCard tone="glass">
            <Text style={styles.cardTitle}>Coming Up</Text>
            {nextEvents.map((event) => (
              <EventPreview
                key={event.id}
                title={event.title}
                time={formatTimeRange(event.startTime, event.endTime)}
                location={event.locationName}
                statusLabel={getEventStatusLabel(
                  getEventStatus(event, currentTime, nextEventIds)
                )}
              />
            ))}
          </SectionCard>

          <SectionCard tone="glass">
            <Text style={styles.cardTitle}>My Plan</Text>

            {planEvents.length === 0 ? (
              <Text style={styles.cardText}>No events added yet</Text>
            ) : (
              planEvents.slice(0, 3).map((event) => (
                <View key={event.id} style={styles.planCard}>
                  <View style={styles.planRow}>
                    <View style={styles.planTextGroup}>
                      <Text style={styles.planTitle}>{event.title}</Text>
                      <View style={styles.row}>
                        <Ionicons name="time" size={14} color={colors.seafoam} />
                        <Text style={styles.planTime}>
                          {formatTimeRange(event.startTime, event.endTime)}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity onPress={() => handleTogglePlan(event.id)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </SectionCard>

          <SectionCard tone="glass">
            <Text style={styles.cardTitle}>Quick Actions</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/dining')}>
              <Text style={styles.buttonText}>Dining</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/schedule')}>
              <Text style={styles.buttonText}>My Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/ship-map')}>
              <Text style={styles.buttonText}>Deck Map</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/account')}>
              <Text style={styles.buttonText}>Account</Text>
            </TouchableOpacity>
          </SectionCard>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

type EventPreviewProps = {
  title: string;
  time: string;
  location: string;
  statusLabel: string;
};

function EventPreview({ title, time, location, statusLabel }: EventPreviewProps) {
  return (
    <View style={styles.highlightCard}>
      <View style={styles.highlightHeader}>
        <Text style={styles.highlightTitle}>{title}</Text>
        <Badge label={statusLabel} variant={statusLabel === 'LIVE NOW' ? 'danger' : 'warning'} />
      </View>
      <Text style={styles.highlightTime}>{time}</Text>
      <Text style={styles.highlightLocation}>{location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(12, 27, 42, 0.08)',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  hero: {
    backgroundColor: 'rgba(18, 60, 74, 0.58)',
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
  countdownPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.sunshine,
    borderRadius: 999,
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  countdownText: {
    color: colors.oceanDark,
    fontWeight: 'bold',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    color: colors.mutedText,
  },
  highlightCard: {
    backgroundColor: 'rgba(27, 58, 75, 0.82)',
    borderRadius: 12,
    marginBottom: 10,
    padding: 14,
  },
  highlightHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  highlightTitle: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  highlightTime: {
    color: colors.seafoam,
    marginTop: 6,
  },
  highlightLocation: {
    color: colors.mutedText,
    marginTop: 4,
  },
  planCard: {
    backgroundColor: 'rgba(27, 58, 75, 0.72)',
    borderRadius: 10,
    marginBottom: 10,
    padding: 12,
  },
  planRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planTextGroup: {
    flex: 1,
    paddingRight: 10,
  },
  planTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
  },
  planTime: {
    color: colors.seafoam,
    marginLeft: 4,
  },
  removeText: {
    color: colors.coral,
    fontSize: 13,
    marginTop: 6,
  },
  button: {
    backgroundColor: colors.lagoon,
    borderRadius: 8,
    marginTop: 10,
    padding: 12,
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
