import type { CustomTheme } from '@/constants/theme';
import { Image } from 'react-native';
import { Link } from 'expo-router';
import styled from '@emotion/native';

const Card = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.background,
  borderRadius: 12,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: theme.colors.textSecondary,
}));

const CardImage = styled.Image({
  width: '100%',
  height: 200,
});

const Content = styled.View({
  padding: 16,
});

const Title = styled.Text(({ theme }) => ({
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 8,
  color: theme.colors.text,
  lineHeight: 26,
}));

const Price = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.colors.primary,
  marginBottom: 12,
  lineHeight: 46,
}));

const Details = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 8,
});

const DetailText = styled.Text(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.textSecondary,
}));

interface CarCardProps {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  imageUrl: string;
}

export function CarCard({ id, title, price, year, mileage, location, imageUrl }: CarCardProps) {
  return (
    <Link href={`/car/${id}`} asChild>
      <Card>
        <CardImage
          source={{ uri: imageUrl }}
          resizeMode="cover"
        />
        <Content>
          <Title>{title}</Title>
          <Price>€{price.toLocaleString()}</Price>

          <Details>
            <DetailText>📅 {year}</DetailText>
            <DetailText>🛣️ {mileage.toLocaleString()} km</DetailText>
            <DetailText>📍 {location}</DetailText>
          </Details>
        </Content>
      </Card>
    </Link>
  );
} 