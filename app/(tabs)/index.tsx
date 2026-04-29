import { events } from '../data/events';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function HomeScreen() {
  const router = useRouter();
  const [myPlan, setMyPlan] = useState<string[]>([]);

  useEffect(() => {
    const loadPlan = async () => {
      const saved = await AsyncStorage.getItem("myPlan");

      if (saved) {
        setMyPlan(JSON.parse(saved));
      }
    };

    loadPlan();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Island Time Companion</Text>
        <Text style={styles.heroTitle}>Welcome aboard, Chauncey</Text>
        <Text style={styles.heroSubtitle}>Margaritaville at Sea Paradise</Text>

        <View style={styles.countdownPill}>
          <Text style={styles.countdownText}>3 days until sailing</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Highlights</Text>
        <View style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>Sail Away Party</Text>
          <Text style={styles.highlightTime}>4:00 PM • Pool Deck</Text>
        </View>
        <View style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>Fins Dining Dinner</Text>
          <Text style={styles.highlightTime}>4:00 PM • Pool Deck</Text>
        </View>
        <View style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>Comedy Show</Text>
          <Text style={styles.highlightTime}>7:30 PM • Main Theater</Text>
        </View>
        <View style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>Pool Party</Text>
          <Text style={styles.highlightTime}>4:00 PM • Pool Deck</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Plan</Text>

          {myPlan.length === 0 ? (
        <Text style={styles.cardText}>No events added yet</Text>
        ) : (
          myPlan.map((id) => {
            const event = events.find((event) => event.id === id);

            return (
              <View key={id} style={styles.planCard}>
                <Text style={styles.planTitle}>{event?.title}</Text>
                <Text style={styles.planTime}>{event?.time}</Text>
              </View>
              );
            })
  )}
</View>

      <View style={styles.card}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0c1b2a",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subheader: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#13293d",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  cardText: {
    color: "#ddd",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#1f6f8b",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  planCard: {
  backgroundColor: '#1b3a4b',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
  },

  planTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  planTime: {
    color: '#7fd1ff',
    marginTop: 4,
  },
  hero: {
    backgroundColor: '#123c4a',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },

  eyebrow: {
    color: '#f4c542',
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  heroSubtitle: {
    color: '#b8c7d9',
    fontSize: 16,
    marginTop: 6,
  },

  countdownPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#f4c542',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 18,
  },

  countdownText: {
    color: '#0c1b2a',
    fontWeight: 'bold',
  },
  highlightCard: {
  backgroundColor: '#1b3a4b',
  padding: 14,
  borderRadius: 12,
  marginBottom: 10,
  },

  highlightTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  highlightTime: {
    color: '#7fd1ff',
    marginTop: 4,
  },
});