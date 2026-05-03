import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
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
  const nextEventIds = useMemo(
    () => getNextEvents(events, currentTime).map((event) => event.id),
    [currentTime]
  );

  const handleTogglePlan = async (id: string) => {
    setMyPlan(await togglePlanItem(id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{"Today's Schedule"}</Text>

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
    marginBottom: 20,
  },
});
