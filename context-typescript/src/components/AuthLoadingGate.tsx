import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useAuth} from '../context/AuthContext';
import {colors} from '../theme/colors';

export function AuthLoadingGate({children}: {children: React.ReactNode}) {
  const {isAuthReady} = useAuth();

  if (!isAuthReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
