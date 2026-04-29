import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Event = {
  id: string;
  title: string;
  time: string;
  location: string;
};

import { events } from '../data/events';

export default function ScheduleScreen() {
  const [myPlan, setMyPlan] = useState<string[]>([]);

    useEffect(() => {
    const loadPlan = async () => {
        const saved = await AsyncStorage.getItem('myPlan');

        if (saved) {
        setMyPlan(JSON.parse(saved));
        }
    };

    loadPlan();
    }, []);

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
            <Text style={styles.time}>{event.time}</Text>
            <Text style={styles.name}>{event.title}</Text>
            <Text style={styles.location}>{event.location}</Text>

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
    backgroundColor: '#0c1b2a',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#13293d',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  time: {
    color: '#7fd1ff',
    fontWeight: 'bold',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  location: {
    color: '#aaa',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#1f6f8b',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  selectedButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});