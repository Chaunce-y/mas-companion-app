import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

import { EventCard } from '@/components/EventCard';
import { events } from '@/data/events';
import { colors } from '@/theme/colors';
import { getSavedPlanIds, isInPlan, togglePlanItem } from '@/storage/planStorage';
import {
  getEventStatus,
  getNextEvents,
  sortEventsByStartTime,
} from '@/utils/schedule';

export default function ScheduleScreen() {
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

  const sortedEvents = useMemo(() => sortEventsByStartTime(events), []);
  const nextEvents = useMemo(() => getNextEvents(events, currentTime), [currentTime]);
  const nextEventIds = useMemo(
    () => nextEvents.slice(0, 1).map((event) => event.id),
    [nextEvents]
  );
  const plannedEvents = useMemo(
    () =>
      sortEventsByStartTime(
        myPlan
          .map((id) => events.find((event) => event.id === id))
          .filter((event) => event !== undefined)
      ),
    [myPlan]
  );
  const nextPlannedEvent = useMemo(
    () =>
      plannedEvents.find((event) =>
        ['live', 'next', 'upcoming'].includes(
          getEventStatus(event, currentTime, nextEventIds)
        )
      ),
    [plannedEvents, currentTime, nextEventIds]
  );

  const handleTogglePlan = async (id: string) => {
    setMyPlan(await togglePlanItem(id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{"Today's Schedule"}</Text>
      <Text style={styles.subtitle}>Build a simple plan for embarkation day.</Text>

      <View style={styles.planPanel}>
        <View style={styles.planHeader}>
          <View>
            <Text style={styles.planEyebrow}>My Plan</Text>
            <Text style={styles.planTitle}>
              {plannedEvents.length} {plannedEvents.length === 1 ? 'event' : 'events'} saved
            </Text>
          </View>
          {nextPlannedEvent ? (
            <Text style={styles.nextBadge}>Next: {nextPlannedEvent.startTime}</Text>
          ) : null}
        </View>

        {plannedEvents.length === 0 ? (
          <Text style={styles.emptyPlanText}>
            No events planned yet. Add a few favorites below to shape your day.
          </Text>
        ) : (
          plannedEvents.map((event) => (
            <View key={`plan-${event.id}`} style={styles.plannedRow}>
              <View style={styles.plannedTextGroup}>
                <Text style={styles.plannedTitle}>{event.title}</Text>
                <Text style={styles.plannedMeta}>
                  {event.startTime} • {event.locationName}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleTogglePlan(event.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <Text style={styles.sectionTitle}>All Events</Text>
      {sortedEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          status={getEventStatus(event, currentTime, nextEventIds)}
          isInPlan={isInPlan(event.id, myPlan)}
          onTogglePlan={handleTogglePlan}
          onPressLocation={(locationId) =>
            router.push({ pathname: '/ship-map', params: { locationId } })
          }
        />
      ))}
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
    marginBottom: 18,
    marginTop: 6,
  },
  planPanel: {
    backgroundColor: 'rgba(19, 41, 61, 0.92)',
    borderColor: 'rgba(127, 209, 255, 0.28)',
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 20,
    padding: 18,
  },
  planHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planEyebrow: {
    color: colors.sunshine,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  planTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  nextBadge: {
    backgroundColor: colors.seafoam,
    borderRadius: 999,
    color: colors.oceanDark,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  emptyPlanText: {
    color: colors.mutedText,
    lineHeight: 20,
  },
  plannedRow: {
    alignItems: 'center',
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  plannedTextGroup: {
    flex: 1,
  },
  plannedTitle: {
    color: colors.text,
    fontWeight: 'bold',
  },
  plannedMeta: {
    color: colors.mutedText,
    marginTop: 4,
  },
  removeText: {
    color: colors.coral,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
