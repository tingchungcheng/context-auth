import React, {useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MarketingCarousel} from '../components/MarketingCarousel';
import {FLOATING_TAB_BAR_HEIGHT} from '../components/FloatingTabBar';
import {PrimaryButton} from '../components/PrimaryButton';
import {useAuth} from '../context/AuthContext';
import {colors} from '../theme/colors';
import {MainTabParamList} from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

export function HomeScreen({navigation}: Props) {
  const {user, logout} = useAuth();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        navigation.navigate('Login');
      }
    }, [navigation, user]),
  );

  if (!user) {
    return <View style={styles.flex} />;
  }

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const firstName = user.name.trim().split(/\s+/)[0] || user.name;

  return (
    <View style={styles.flex}>
      <View style={[styles.promoBanner, {paddingTop: insets.top + 12}]}>
        <Text style={styles.promoEyebrow}>LIMITED DROP</Text>
        <Text style={styles.promoTitle}>Secure access, styled for demo week</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: 24 + FLOATING_TAB_BAR_HEIGHT + Math.max(insets.bottom, 12)},
        ]}>
        <Text style={styles.heroKicker}>Context Auth</Text>
        <Text style={styles.heroTitle}>
          Hello,{'\n'}
          <Text style={styles.heroAccent}>{firstName}.</Text>
        </Text>
        <Text style={styles.heroBody}>
          Your session is active. Explore the placeholder marketing surface below —
          carousel loops automatically with no external content.
        </Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <Text style={styles.sectionHint}>Auto-scroll preview</Text>
        </View>

        <MarketingCarousel />

        <View style={styles.accountCard}>
          <Text style={styles.accountLabel}>Signed in as</Text>
          <Text style={styles.accountName}>{user.name}</Text>
          <Text style={styles.accountEmail}>{user.email}</Text>
          <PrimaryButton
            label="Logout"
            onPress={handleLogout}
            variant="ghost"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  promoBanner: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  promoEyebrow: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  heroKicker: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 42,
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  heroAccent: {
    color: colors.primary,
  },
  heroBody: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  sectionHint: {
    fontSize: 13,
    color: colors.textMuted,
  },
  accountCard: {
    marginTop: 28,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  accountLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  accountName: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  accountEmail: {
    marginTop: 4,
    fontSize: 15,
    color: colors.textMuted,
  },
  logoutButton: {
    marginTop: 16,
  },
});
