import { Image, View } from 'react-native';

import type { CustomTheme } from '@/constants/theme';
import { Link } from 'expo-router';
import styled from '@emotion/native';
import { supabase } from '@/config/supabase';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

// const StyledContainer = styled.View`
//   flex: 1;
//   padding: 20px;
//   justify-content: center;
//   background-color: ${({ theme }) => theme.colors.background};
// `;

const StyledContainer = styled.View(({ theme }: { theme: CustomTheme }) => ({
  flex: 1,
  padding: 20,
  justifyContent: 'center',
  backgroundColor: theme.colors.background,
}));

const StyledText = styled.Text(({ variant, theme, isHeading = false }: { variant?: 'error', theme: CustomTheme, isHeading?: boolean }) => ({
  fontSize: isHeading ? 24 : 14,
  fontWeight: 'bold',
  marginBottom: isHeading ? 20 : 0,
  textAlign: 'center',
  color: variant === 'error' ? theme.colors.textError : isHeading ? theme.colors.text : theme.colors.textContrast,
}));

const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.textSecondary};
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textSecondary : theme.colors.primary};
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const StyledLink = styled(Link)`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme() as CustomTheme;

  async function signIn() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <StyledContainer>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{ width: 100, height: 100, alignSelf: 'center' }}
      />

      <StyledText theme={theme} isHeading={true}>Sign In</StyledText>

      {error && (
        <View style={{ marginBottom: 15 }}>
          <StyledText variant="error" theme={theme}>{error}</StyledText>
        </View>
      )}

      <StyledInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor={theme.colors.textSecondary}
      />

      <StyledInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />

      <StyledButton
        onPress={signIn}
        disabled={loading}
      >
        <StyledText theme={theme} isHeading={false}>
          {loading ? 'Signing in...' : 'Sign In'}
        </StyledText>
      </StyledButton>

      <StyledLink href="/sign-up">
        Don't have an account? Sign Up
      </StyledLink>
    </StyledContainer >
  );
}
