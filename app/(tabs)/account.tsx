import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import { Badge } from '@/components/Badge';
import { SectionCard } from '@/components/SectionCard';
import { trip } from '@/data/trip';
import {
  AccountPreferences,
  defaultAccountPreferences,
  getAccountPreferences,
  saveAccountPreferences,
} from '@/storage/accountPreferences';
import { getSavedPlanIds } from '@/storage/planStorage';
import { colors } from '@/theme/colors';

export default function AccountScreen() {
  const [myPlanCount, setMyPlanCount] = useState(0);
  const [preferences, setPreferences] = useState<AccountPreferences>(
    defaultAccountPreferences
  );

  useFocusEffect(
    useCallback(() => {
      const loadAccountState = async () => {
        const [savedPlanIds, savedPreferences] = await Promise.all([
          getSavedPlanIds(),
          getAccountPreferences(),
        ]);

        setMyPlanCount(savedPlanIds.length);
        setPreferences(savedPreferences);
      };

      loadAccountState();
    }, [])
  );

  const handlePreferenceChange = async (
    key: keyof AccountPreferences,
    value: boolean
  ) => {
    const nextPreferences = { ...preferences, [key]: value };
    setPreferences(nextPreferences);
    await saveAccountPreferences(nextPreferences);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Trip</Text>
      <Text style={styles.subtitle}>{trip.conceptDisclaimer}</Text>

      <SectionCard style={styles.profileCard}>
        <Badge label={trip.sailingDayLabel} variant="warning" />
        <Text style={styles.guestName}>{trip.guestName}</Text>
        <Text style={styles.shipName}>{trip.shipName}</Text>

        <DetailRow label="Itinerary" value={trip.itineraryLabel} />
        <DetailRow label="Sailing" value={trip.sailingCountdownText} />
        <DetailRow label="Home Port" value={trip.homePort} />
        <DetailRow label="Destination" value={trip.destination} />
        <DetailRow label="Cabin" value={trip.cabinLabel} />
        <DetailRow label="Reservation" value={trip.reservationLabel} />
        <DetailRow label="Party Size" value={`${trip.partySize} guests`} />
        <DetailRow
          label="My Plan"
          value={`${myPlanCount} ${myPlanCount === 1 ? 'event' : 'events'}`}
        />
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <PreferenceRow
          title="Daily reminders"
          description="Show gentle planning nudges for saved events."
          value={preferences.dailyReminders}
          onValueChange={(value) => handlePreferenceChange('dailyReminders', value)}
        />
        <PreferenceRow
          title="Dining alerts"
          description="Highlight openings and closing-soon cues in dining."
          value={preferences.diningAlerts}
          onValueChange={(value) => handlePreferenceChange('diningAlerts', value)}
        />
        <PreferenceRow
          title="Offline onboard data"
          description="Keep static schedule, dining, and deck guide content available."
          value={preferences.offlineMode}
          onValueChange={(value) => handlePreferenceChange('offlineMode', value)}
        />
      </SectionCard>
    </ScrollView>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

type PreferenceRowProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function PreferenceRow({
  title,
  description,
  value,
  onValueChange,
}: PreferenceRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingTextGroup}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
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
  profileCard: {
    borderColor: 'rgba(127, 209, 255, 0.26)',
    borderWidth: 1,
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
    gap: 16,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  detailLabel: {
    color: colors.mutedText,
    flex: 1,
  },
  detailValue: {
    color: colors.text,
    flex: 1.2,
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
    borderTopColor: 'rgba(255,255,255,0.08)',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
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
    lineHeight: 19,
    marginTop: 4,
  },
});
