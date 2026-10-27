import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AuthTextField} from '../components/AuthTextField';
import {FLOATING_TAB_BAR_HEIGHT} from '../components/FloatingTabBar';
import {PrimaryButton} from '../components/PrimaryButton';
import {useAuth} from '../context/AuthContext';
import {useToast} from '../context/ToastContext';
import {colors} from '../theme/colors';
import {MainTabParamList} from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Signup'>;

export function SignupScreen({navigation}: Props) {
  const {signup} = useAuth();
  const {showToast} = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignup = () => {
    const result = signup(name, email, password);
    if (!result.success) {
      setFormError(result.message ?? 'Unable to sign up.');
      return;
    }
    setFormError(null);
    setPassword('');
    showToast('Account created. Please sign in.');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Register, then sign in on the Login tab.</Text>
        </View>

        <AuthTextField
          label="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          textContentType="name"
          placeholder="Your name"
        />
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
          textContentType="newPassword"
          placeholder="Choose a password"
        />

        {formError ? (
          <View style={styles.bannerError}>
            <Text style={styles.bannerErrorText}>{formError}</Text>
          </View>
        ) : null}

        <PrimaryButton label="Signup" onPress={handleSignup} style={styles.primaryAction} />
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
    paddingTop: 32,
    paddingBottom: 32 + FLOATING_TAB_BAR_HEIGHT + 24,
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
});
