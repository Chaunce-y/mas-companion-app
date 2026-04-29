import { View, Text, StyleSheet } from 'react-native';

export default function ShipMapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ship Map</Text>
      <Text style={styles.text}>View the ship's layout and navigate between decks.</Text>
    </View>
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
  },
  text: {
    color: '#ddd',
    marginTop: 10,
  },
});