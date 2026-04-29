import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { events } from '../data/events';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function ScheduleScreen() {
  const [myPlan, setMyPlan] = useState<string[]>([]);

    useFocusEffect(
        useCallback(() => {
            const loadPlan = async () => {
            const saved = await AsyncStorage.getItem('myPlan');

            if (saved) {
                setMyPlan(JSON.parse(saved));
            } else {
                setMyPlan([]);
            }
            };

            loadPlan();
        }, [])
        );

    const toggleEvent = async (id: string) => {
    let updated: string[];

    if (myPlan.includes(id)) {
        updated = myPlan.filter((e) => e !== id);
    } else {
        updated = [...myPlan, id];
    }

    setMyPlan(updated);
    await AsyncStorage.setItem('myPlan', JSON.stringify(updated));
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Today's Schedule</Text>

      {events.map((event) => {
        const isSelected = myPlan.includes(event.id);

        return (
          <View key={event.id} style={styles.card}>
            <View style={styles.row}>
                <Ionicons name="time" size={16} color="{colors.seafoam}" />
                <Text style={styles.time}>{event.time}</Text>
            </View>

            <Text style={styles.name}>{event.title}</Text>

            <View style={styles.row}>
                <Ionicons name="location" size={16} color="{colors.seafoam}" />
                <Text style={styles.location}>{event.location}</Text>
            </View>

            <TouchableOpacity
              style={[styles.button, isSelected && styles.selectedButton]}
              onPress={() => toggleEvent(event.id)}
            >
              <Text style={styles.buttonText}>
                {isSelected ? 'Added ✓' : 'Add to My Plan'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.oceanDark,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  time: {
    color: colors.seafoam,
    fontWeight: 'bold',
  },
  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  location: {
    color: colors.mutedText,
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.lagoon,
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  selectedButton: {
    backgroundColor: colors.seafoam,
  },
  buttonText: {
    color: colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
    row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});