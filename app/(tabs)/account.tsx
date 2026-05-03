import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import { Badge } from '@/components/Badge';
import { SectionCard } from '@/components/SectionCard';
import { trip } from '@/data/trip';
import { colors } from '@/theme/colors';
import { getSavedPlanIds } from '@/storage/planStorage';

export default function AccountScreen() {
  const [myPlanCount, setMyPlanCount] = useState(0);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [diningAlerts, setDiningAlerts] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadPlanCount = async () => {
        setMyPlanCount((await getSavedPlanIds()).length);
      };

      loadPlanCount();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Trip</Text>
      <Text style={styles.subtitle}>Simple details for this sailing.</Text>

      <SectionCard>
        <Badge label={trip.sailingDayLabel} variant="warning" />
        <Text style={styles.guestName}>{trip.guestName}</Text>
        <Text style={styles.shipName}>{trip.shipName}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Sailing</Text>
          <Text style={styles.detailValue}>{trip.sailingCountdownText}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Cabin</Text>
          <Text style={styles.detailValue}>{trip.cabinLabel}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>My Plan</Text>
          <Text style={styles.detailValue}>
            {myPlanCount} {myPlanCount === 1 ? 'event' : 'events'}
          </Text>
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Daily reminders</Text>
            <Text style={styles.settingDescription}>A light nudge for planned events.</Text>
          </View>
          <Switch value={dailyReminders} onValueChange={setDailyReminders} />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Dining alerts</Text>
            <Text style={styles.settingDescription}>Show openings and closing-soon cues.</Text>
          </View>
          <Switch value={diningAlerts} onValueChange={setDiningAlerts} />
        </View>
      </SectionCard>
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
  guestName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 14,
  },
  shipName: {
    color: colors.mutedText,
    fontSize: 16,
    marginBottom: 14,
    marginTop: 4,
  },
  detailRow: {
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  detailLabel: {
    color: colors.mutedText,
  },
  detailValue: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingTextGroup: {
    flex: 1,
    paddingRight: 12,
  },
  settingTitle: {
    color: colors.text,
    fontWeight: 'bold',
  },
  settingDescription: {
    color: colors.mutedText,
    marginTop: 4,
  },
});
