import type { CustomTheme } from '@/constants/theme';
import { Link } from 'expo-router';
import { View } from 'react-native';
import styled from '@emotion/native';
import { supabase } from '@/config/supabase';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

const StyledContainer = styled.View(({ theme }: { theme: CustomTheme }) => ({
  flex: 1,
  padding: 20,
  justifyContent: 'center',
  backgroundColor: theme.colors.background,
}));

const StyledText = styled.Text<{ isHeading?: boolean; variant?: 'error' }>(props => ({
  fontSize: props.isHeading ? 24 : 14,
  fontWeight: 'bold',
  marginBottom: props.isHeading ? 20 : 0,
  textAlign: 'center',
  color: props.variant === 'error' ? props.theme.colors.textError : props.isHeading ? props.theme.colors.text : props.theme.colors.textContrast,
}));

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  align-self: center;
`;

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
  const logoImage = require('../../assets/images/logo.png');

  async function signIn() {

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    console.log('error', error);
    if (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <StyledContainer>
      <StyledImage source={logoImage} />
      <StyledText isHeading={true}>Sign In</StyledText>

      {error && (
        <View style={{ marginBottom: 15 }}>
          <StyledText variant="error">{error}</StyledText>
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
      {/* go back to home screen */}
      <StyledLink href="/(public)" style={{ marginTop: 10 }}>
        {"⏮️ Go Back"}
      </StyledLink>
    </StyledContainer >
  );
}
