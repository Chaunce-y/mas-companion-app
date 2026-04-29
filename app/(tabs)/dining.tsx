import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const restaurants = [
  {
    name: 'Fins Dining',
    type: 'Included Dining',
    hours: '5:30 PM – 9:30 PM',
    description: 'Main dining room with island-inspired dinner service.',
  },
  {
    name: "Frank & Lola's Pizzeria",
    type: 'Casual Dining',
    hours: '11:00 AM – 11:00 PM',
    description: 'Pizza, quick bites, and late-night comfort food.',
  },
  {
    name: 'JWB Prime Steakhouse',
    type: 'Specialty Dining',
    hours: '6:00 PM – 10:00 PM',
    description: 'Premium steakhouse experience for date night or celebrations.',
  },
];

export default function DiningScreen() {
  return (
    <ScrollView style={styles.container}>
     <View style={styles.hero}>
        <Text style={styles.eyebrow}>Onboard Dining</Text>
        <Text style={styles.heroTitle}>Eat, drink, and cruise easy</Text>
        <Text style={styles.heroSubtitle}>
            Discover included dining, specialty restaurants, and late-night bites.
        </Text>
    </View>
    {restaurants.map((restaurant) => (
        <View key={restaurant.name} style={styles.restaurantCard}>
            <View style={styles.row}>
            <Text style={styles.badge}>{restaurant.type}</Text>
            </View>

            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.hours}>{restaurant.hours}</Text>
            <Text style={styles.description}>{restaurant.description}</Text>

            <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>View Menu</Text>
            </TouchableOpacity>
        </View>
        ))}
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
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#b8c7d9',
    marginTop: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#13293d',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f4c542',
    color: '#0c1b2a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  hours: {
    color: '#7fd1ff',
    marginTop: 6,
    fontWeight: '600',
  },
  description: {
    color: '#ddd',
    marginTop: 8,
    lineHeight: 20,
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
  restaurantCard: {
  backgroundColor: '#13293d',
  borderRadius: 16,
  padding: 18,
  marginBottom: 16,
},

row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

badge: {
  backgroundColor: '#f4c542',
  color: '#0c1b2a',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 999,
  fontWeight: 'bold',
},

restaurantName: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 10,
},

hours: {
  color: '#7fd1ff',
  marginTop: 6,
  fontWeight: '600',
},

description: {
  color: '#ddd',
  marginTop: 8,
  lineHeight: 20,
},

actionButton: {
  marginTop: 12,
  backgroundColor: '#1f6f8b',
  padding: 10,
  borderRadius: 8,
},

actionText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
},
});