import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MarketingCarousel } from '../components/MarketingCarousel';
import { FLOATING_TAB_BAR_HEIGHT } from '../components/FloatingTabBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
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
      <View style={[styles.promoBanner, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.promoTitle}>
          A Typescript + RN + Context API demo 🫡
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom:
              24 + FLOATING_TAB_BAR_HEIGHT + Math.max(insets.bottom, 12),
          },
        ]}
      >
        <Text style={styles.heroTitle}>
          Hello, <Text style={styles.heroAccent}>{firstName}</Text>
        </Text>

        <Text style={styles.sectionTitle}>Featured</Text>
        <MarketingCarousel />

        <View style={styles.accountCard}>
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
    paddingBottom: 16,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  heroAccent: {
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  accountCard: {
    marginTop: 24,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  accountName: {
    fontSize: 18,
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
