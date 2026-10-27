import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthTextField} from '../components/AuthTextField';
import {PrimaryButton} from '../components/PrimaryButton';
import {useAuth} from '../context/AuthContext';
import {colors} from '../theme/colors';
import {AuthStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({navigation}: Props) {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = () => {
    setSuccessMessage(null);
    const result = login(email, password);
    if (!result.success) {
      setFormError(result.message ?? 'Unable to log in.');
      return;
    }
    setFormError(null);
    setSuccessMessage('Logged in successfully. Home screen arrives in milestone B.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in with your email and password.</Text>
        </View>

        <AuthTextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="you@example.com"
        />
        <AuthTextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          placeholder="Your password"
        />

        {formError ? (
          <View style={styles.bannerError}>
            <Text style={styles.bannerErrorText}>{formError}</Text>
          </View>
        ) : null}
        {successMessage ? (
          <View style={styles.bannerSuccess}>
            <Text style={styles.bannerSuccessText}>{successMessage}</Text>
          </View>
        ) : null}

        <PrimaryButton label="Login" onPress={handleLogin} style={styles.primaryAction} />
        <PrimaryButton
          label="Go to Signup"
          variant="ghost"
          onPress={() => navigation.navigate('Signup')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 22,
  },
  primaryAction: {
    marginBottom: 12,
    marginTop: 8,
  },
  bannerError: {
    backgroundColor: colors.errorBackground,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  bannerErrorText: {
    color: colors.error,
    fontSize: 14,
  },
  bannerSuccess: {
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  bannerSuccessText: {
    color: '#047857',
    fontSize: 14,
  },
});
