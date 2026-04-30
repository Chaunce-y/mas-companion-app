import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { colors } from '../theme/colors';
import { useState } from 'react';

const restaurants = [
  {
    id: 'fins',
    name: 'Fins Dining Room',
    type: 'Included Dining',
    hours: '5:30 PM – 9:30 PM',
    description: 'Main dining room with island-inspired dinner service.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
  },

  {
    id: 'frank-lolas',
    name: "Frank & Lola's Pizzeria",
    type: 'Casual Dining',
    hours: '11:00 AM – 11:00 PM',
    description: 'Pizza, quick bites, and late-night comfort food.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  },

  {
    id: 'jwb',
    name: 'JWB Prime Steakhouse',
    type: 'Specialty Dining',
    hours: '6:00 PM – 10:00 PM',
    description: 'Upscale specialty steakhouse with prime steaks, seafood, and casual elegance.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
  },
];



export default function DiningScreen() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  
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
            <Image 
            source={{ uri: restaurant.image }} 
            style={styles.restaurantImage} 
            />
            <View style={styles.row}>
            <Text style={styles.badge}>{restaurant.type}</Text>
            </View>

            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.hours}>{restaurant.hours}</Text>
            <Text style={styles.description}>{restaurant.description}</Text>

            <TouchableOpacity style={styles.actionButton} onPress={() => setSelectedRestaurant(restaurant)}>
            <Text style={styles.actionText}>View Menu</Text>
            </TouchableOpacity>
        </View>
        ))}
        {selectedRestaurant && (
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
                    <Text style={styles.modalText}>{selectedRestaurant.description}</Text>

                    <TouchableOpacity onPress={() => setSelectedRestaurant(null)}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
        </View>
    </View>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.oceanDark,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.sunshine,
    color: colors.oceanDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hours: {
    color: colors.seafoam,
    marginTop: 6,
    fontWeight: '600',
  },
  description: {
    color: colors.mutedText,
    marginTop: 8,
    lineHeight: 20,
  },
  hero: {
    backgroundColor: colors.ocean,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },

  eyebrow: {
    color: colors.sunshine,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
  restaurantCard: {
  backgroundColor: colors.card,
  borderRadius: 16,
  padding: 18,
  marginBottom: 16,
},

row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

restaurantName: {
  color: colors.text,
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 10,
},

actionButton: {
  marginTop: 12,
  backgroundColor: colors.lagoon,
  padding: 10,
  borderRadius: 8,
},

actionText: {
  color: colors.text,
  textAlign: 'center',
  fontWeight: 'bold',
},

restaurantImage: {
  width: '100%',
  height: 140,
  borderRadius: 14,
  marginBottom: 12,
},

modal: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.card,
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},

modalTitle: {
  color: colors.text,
  fontSize: 20,
  fontWeight: 'bold',
},

modalText: {
  color: colors.mutedText,
  marginTop: 10,
},

closeText: {
  color: colors.coral,
  marginTop: 15,
  textAlign: 'center',
},
overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'flex-end',
},
});