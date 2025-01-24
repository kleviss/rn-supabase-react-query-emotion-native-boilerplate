import { Link } from 'expo-router';
import styled from '@emotion/native';
import { supabase } from '@/config/supabase';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';

const StyledContainer = styled.View(({ bgcolor }: { bgcolor: string }) => ({
  flex: 1,
  padding: 20,
  justifyContent: 'center',
  backgroundColor: bgcolor,
}))

const StyledText = styled.Text(({ color = 'black' }: { color?: string }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
  color: color,
}))

const StyledInput = styled.TextInput(({ color = 'black' }: { color?: string }) => ({
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 15,
  marginBottom: 15,
  borderRadius: 5,
  color: color,
}))

const StyledButton = styled.TouchableOpacity(({ color = 'black' }: { color?: string }) => ({
  backgroundColor: color,
  padding: 15,
  borderRadius: 5,
  marginBottom: 15,
}))

const StyledLink = styled(Link)(({ color = 'black' }: { color?: string }) => ({
  textAlign: 'center',
  color: color,
}))

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const themeMode = useColorScheme();

  console.log('themeMode', themeMode, 'theme', theme);
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
    <StyledContainer bgcolor={themeMode === 'dark' ? theme.colors.primary : theme.colors.background}>
      <StyledText>Sign In</StyledText>

      {error && <StyledText color={theme.colors.text}>{error}</StyledText>}

      <StyledInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <StyledInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <StyledButton
        onPress={signIn}
        disabled={loading}
      >
        <StyledText>
          {loading ? 'Signing in...' : 'Sign In'}
        </StyledText>
      </StyledButton>

      <StyledLink href="/sign-up">
        Don't have an account? Sign Up
      </StyledLink>
    </StyledContainer>
  );
}
