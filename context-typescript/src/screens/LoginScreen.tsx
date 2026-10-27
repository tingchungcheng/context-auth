import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
import {useModal} from '../context/ModalContext';
import {useToast} from '../context/ToastContext';
import {colors} from '../theme/colors';
import {MainTabParamList} from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Login'>;
type FieldKey = 'email' | 'password';

export function LoginScreen({navigation}: Props) {
  const {login, user} = useAuth();
  const {showToast} = useToast();
  const {showModal} = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, boolean>>>(
    {},
  );

  useFocusEffect(
    useCallback(() => {
      if (user) {
        navigation.navigate('Home');
      }
    }, [navigation, user]),
  );

  const clearFieldError = (field: FieldKey) => {
    setFieldErrors(prev => ({...prev, [field]: false}));
  };

  const handleLogin = () => {
    setFieldErrors({});
    const result = login(email, password);
    if (!result.success) {
      if (result.field) {
        setFieldErrors({[result.field]: true});
      }
      showModal({
        title: 'Unable to log in',
        message: result.message ?? 'Please check your details and try again.',
      });
      return;
    }
    showToast('Welcome back!');
    navigation.navigate('Home');
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
          onChangeText={text => {
            clearFieldError('email');
            setEmail(text);
          }}
          error={fieldErrors.email}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="you@example.com"
        />
        <AuthTextField
          label="Password"
          value={password}
          onChangeText={text => {
            clearFieldError('password');
            setPassword(text);
          }}
          error={fieldErrors.password}
          showPasswordToggle
          textContentType="password"
          placeholder="Your password"
        />

        <PrimaryButton label="Login" onPress={handleLogin} style={styles.primaryAction} />
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
});
