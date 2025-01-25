import { Image, View } from 'react-native';

import type { CustomTheme } from '@/constants/theme';
import { Link } from 'expo-router';
import styled from '@emotion/native';
import { supabase } from '@/config/supabase';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

const StyledContainer = styled.View(({ theme }) => ({
  flex: 1,
  padding: 20,
  justifyContent: 'center',
  backgroundColor: theme.colors.background,
}));

const StyledText = styled.Text(({ variant, theme, isHeading = false }: { variant?: 'error' | 'success', theme: CustomTheme, isHeading?: boolean }) => ({
  fontSize: isHeading ? 24 : 14,
  fontWeight: 'bold',
  marginBottom: isHeading ? 20 : 0,
  textAlign: 'center',
  color: variant === 'error'
    ? theme.colors.textError
    : variant === 'success'
      ? theme.colors.textSuccess
      : isHeading ? theme.colors.text : theme.colors.textContrast,
}));

const StyledInput = styled.TextInput(({ theme }) => ({
  borderWidth: 1,
  borderColor: theme.colors.textSecondary,
  padding: 15,
  marginBottom: 15,
  borderRadius: 5,
  color: theme.colors.text,
}));

const StyledButton = styled.TouchableOpacity<{ disabled?: boolean }>(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.colors.textSecondary : theme.colors.primary,
  padding: 15,
  borderRadius: 5,
  marginBottom: 15,
  opacity: disabled ? 0.7 : 1,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary,
}));

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme() as CustomTheme;

  async function signUp() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError('Please check your email for verification link');
    }

    setLoading(false);
  }

  return (
    <StyledContainer>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{ width: 100, height: 100, alignSelf: 'center' }}
      />
      <StyledText theme={theme} isHeading={true}>Create Account</StyledText>

      {error && (
        <View style={{ marginBottom: 15 }}>
          <StyledText
            theme={theme}
            variant={error.includes('verification') ? 'success' : 'error'}
          >
            {error}
          </StyledText>
        </View>
      )}

      <StyledInput
        theme={theme}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor={theme.colors.textSecondary}
      />

      <StyledInput
        theme={theme}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />

      <StyledButton
        onPress={signUp}
        disabled={loading}
      >
        <StyledText theme={theme}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </StyledText>
      </StyledButton>

      <StyledLink href="/sign-in">
        Already have an account? Sign In
      </StyledLink>
    </StyledContainer>
  );
} 