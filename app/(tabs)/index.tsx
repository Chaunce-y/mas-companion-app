import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome aboard, Chauncey</Text>
      <Text style={styles.subheader}>Margaritaville at Sea Paradise</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trip Countdown</Text>
        <Text style={styles.cardText}>3 days until sailing</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Highlights</Text>
        <Text style={styles.cardText}>• Sail Away Party</Text>
        <Text style={styles.cardText}>• Fins Dining Dinner</Text>
        <Text style={styles.cardText}>• Comedy Show</Text>
        <Text style={styles.cardText}>• Pool Party</Text>
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
});