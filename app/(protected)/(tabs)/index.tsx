import type { CustomTheme } from '@/constants/theme';
import { Link } from 'expo-router';
import { ScrollView } from 'react-native';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';

const StyledContainer = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  // padding: 20,
  // hide scrollbar
  overflow: 'hidden',
  backgroundColor: theme.colors.background,
}));

const StyledTitle = styled.Text(({ theme }) => ({
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 30,
  color: theme.colors.text,
  lineHeight: 46,
  marginTop: 20,
}));

const LinksContainer = styled.View({
  width: '100%',
  gap: 15,
});

const StyledLink = styled(Link)(({ theme }) => ({
  padding: 20,
  borderRadius: 12,
  backgroundColor: theme.colors.primary,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
}));

const LinkText = styled.Text(({ theme }) => ({
  color: theme.colors.textContrast,
  fontSize: 18,
  textAlign: 'center',
  fontWeight: '600',
}));

export default function HomeScreen() {
  const theme = useTheme() as CustomTheme;

  return (
    <StyledContainer>
      <ScrollView style={{ overflow: 'hidden' }}>
        <StyledTitle>Welcome to AutoScout AL</StyledTitle>

        <LinksContainer>
          <StyledLink href="/search">
            <LinkText>🔍 Find Cars</LinkText>
          </StyledLink>

          <StyledLink href="/new-listing">
            <LinkText>📝 Create New Listing</LinkText>
          </StyledLink>

          <StyledLink href="/saved">
            <LinkText>❤️ Saved Cars</LinkText>
          </StyledLink>

          <StyledLink href="/help">
            <LinkText>❓ Help Center</LinkText>
          </StyledLink>


        </LinksContainer>
      </ScrollView>
    </StyledContainer>
  );
}
