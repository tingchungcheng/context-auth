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

type Props = BottomTabScreenProps<MainTabParamList, 'Signup'>;
type FieldKey = 'name' | 'email' | 'password';

export function SignupScreen({navigation}: Props) {
  const {signup, user} = useAuth();
  const {showToast} = useToast();
  const {showModal} = useModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, boolean>>
  >({});

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

  const handleSignup = () => {
    setFieldErrors({});
    const result = signup(name, email, password);
    if (!result.success) {
      if (result.field) {
        setFieldErrors({[result.field]: true});
      }
      showModal({
        title: 'Unable to sign up',
        message: result.message ?? 'Please check your details and try again.',
      });
      return;
    }
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
          onChangeText={text => {
            clearFieldError('name');
            setName(text);
          }}
          error={fieldErrors.name}
          autoCapitalize="words"
          textContentType="name"
          placeholder="Your name"
        />
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
          textContentType="newPassword"
          placeholder="At least 6 characters"
        />

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
});
