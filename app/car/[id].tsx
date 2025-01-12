import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { MOCK_CARS, type Car } from '@/constants/mock-data';

const trimTitle = (title: string) => {
  // Get just the make and model, remove the year
  const [make, model] = title.split(' ').slice(0, 2);
  return `${make} ${model}`;
};

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
  // Find the car with matching id from MOCK_CARS
  const car = MOCK_CARS.find((car) => car.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!car) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Car not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: trimTitle(car.title),
          headerBackTitle: 'Search',
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: car.images[selectedImageIndex] }}
              style={styles.mainImage}
              resizeMode="cover"
            />
            <View style={styles.thumbnailContainer}>
              {car.images.map((image: string, index: number) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedImageIndex(index)}
                  style={[
                    styles.thumbnailWrapper,
                    selectedImageIndex === index && styles.selectedThumbnail,
                  ]}>
                  <Image
                    source={{ uri: image }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                </Pressable>
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
                {car.features.map((feature: string, index: number) => (
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
    </>
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
    borderRadius: 12,
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
    borderRadius: 12,
  },
  thumbnailWrapper: {
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f8f9fa',
  },
  selectedThumbnail: {
    borderColor: '#2563eb',
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderRadius: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
    lineHeight: 32,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: 16,
    lineHeight: 36,
  },
  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  specItem: {
    flex: 1,
    minWidth: '45%',
  },
  specLabel: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1f2937',
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
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  featureText: {
    fontSize: 14,
    color: '#1f2937',
  },
  sellerContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  sellerRating: {
    fontSize: 16,
    color: '#4b5563',
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