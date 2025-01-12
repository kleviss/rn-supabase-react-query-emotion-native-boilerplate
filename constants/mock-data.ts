export interface Car {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  transmission: string;
  fuelType: string;
  engineSize: string;
  power: string;
  description: string;
  features: string[];
  imageUrl: string;
  images: string[];
  seller: {
    name: string;
    phone: string;
    rating: number;
  };
}

export const MOCK_CARS: Car[] = [
  {
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
    description:
      'Beautiful Mercedes-Benz C-Class in excellent condition. Full service history, one owner from new. Features include leather seats, panoramic roof, and the latest MBUX infotainment system.',
    features: [
      'Leather seats',
      'Panoramic roof',
      'Navigation',
      'Bluetooth',
      'Parking sensors',
      'LED headlights',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'],
    seller: {
      name: 'John Doe',
      phone: '+355 69 123 4567',
      rating: 4.8,
    },
  },
  {
    id: '2',
    title: 'BMW 3 Series 2019',
    price: 32000,
    year: 2019,
    mileage: 55000,
    location: 'Durres',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.0L',
    power: '184 hp',
    description:
      'Stunning BMW 3 Series with full BMW service history. Features include premium sound system, sport package, and advanced driver assistance systems.',
    features: [
      'Sport Package',
      'Premium Sound',
      'LED Lights',
      'Heated Seats',
      'Parking Assist',
      'Apple CarPlay',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800',
    ],
    seller: {
      name: 'Jane Smith',
      phone: '+355 69 987 6543',
      rating: 4.9,
    },
  },
  {
    id: '3',
    title: 'Audi A4 2021',
    price: 38000,
    year: 2021,
    mileage: 25000,
    location: 'Vlore',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.0L',
    power: '204 hp',
    description:
      'Nearly new Audi A4 with remaining manufacturer warranty. Loaded with technology including virtual cockpit, Bang & Olufsen sound system, and matrix LED headlights.',
    features: [
      'Virtual Cockpit',
      'B&O Sound System',
      'Matrix LED',
      'Quattro AWD',
      'Sport Seats',
      'Wireless Charging',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'],
    seller: {
      name: 'Alex Brown',
      phone: '+355 69 456 7890',
      rating: 4.7,
    },
  },
];
