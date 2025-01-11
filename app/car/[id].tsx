import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';

// Mock data - in a real app, this would come from an API
const MOCK_CAR = {
  id: '1',
  title: 'Mercedes-Benz C-Class 2020',
  price: 35000,
  year: 2020,
  mileage: 45000,
  location: 'Tirana',
  transmission: 'Automatic',
  fuelType: 'Diesel',
  engineSize: '2.0L',
  power: '194 hp',
  description: 'Beautiful Mercedes-Benz C-Class in excellent condition. Full service history, one owner from new. Features include leather seats, panoramic roof, and the latest MBUX infotainment system.',
  features: [
    'Leather seats',
    'Panoramic roof',
    'Navigation',
    'Bluetooth',
    'Parking sensors',
    'LED headlights',
  ],
  images: [
    'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    'https://images.unsplash.com/photo-1617654112372-70a6c2599cc0?w=800',
  ],
  seller: {
    name: 'John Doe',
    phone: '+355 69 123 4567',
    rating: 4.8,
  },
};

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
  const car = MOCK_CAR; // In real app, fetch car by id

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: car.images[0] }} style={styles.mainImage} />
          <View style={styles.thumbnailContainer}>
            {car.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.thumbnail}
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.title}>{car.title}</ThemedText>
          <ThemedText style={styles.price}>€{car.price.toLocaleString()}</ThemedText>

          <View style={styles.specsContainer}>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Year</ThemedText>
              <ThemedText style={styles.specValue}>{car.year}</ThemedText>
            </View>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Mileage</ThemedText>
              <ThemedText style={styles.specValue}>{car.mileage.toLocaleString()} km</ThemedText>
            </View>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Transmission</ThemedText>
              <ThemedText style={styles.specValue}>{car.transmission}</ThemedText>
            </View>
            <View style={styles.specItem}>
              <ThemedText style={styles.specLabel}>Fuel Type</ThemedText>
              <ThemedText style={styles.specValue}>{car.fuelType}</ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Description</ThemedText>
            <ThemedText style={styles.description}>{car.description}</ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Features</ThemedText>
            <View style={styles.featuresList}>
              {car.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <ThemedText style={styles.featureText}>✓ {feature}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sellerContainer}>
            <ThemedText style={styles.sectionTitle}>Seller Information</ThemedText>
            <ThemedText style={styles.sellerName}>{car.seller.name}</ThemedText>
            <ThemedText style={styles.sellerRating}>⭐ {car.seller.rating} rating</ThemedText>
            <Pressable style={styles.contactButton}>
              <ThemedText style={styles.contactButtonText}>Contact Seller</ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: 'white',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 24,
  },
  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  specItem: {
    flex: 1,
    minWidth: '45%',
  },
  specLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
  sellerContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sellerRating: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 