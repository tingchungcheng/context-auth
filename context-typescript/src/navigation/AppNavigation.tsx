import React, {useCallback, useEffect} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import {RootNavigator} from './RootNavigator';
import {MainTabParamList} from './types';

export const navigationRef = createNavigationContainerRef<MainTabParamList>();

function navigateToHomeIfNeeded() {
  if (!navigationRef.isReady()) {
    return;
  }
  const current = navigationRef.getCurrentRoute()?.name;
  if (current !== 'Home') {
    navigationRef.navigate('Home');
  }
}

export function AppNavigation() {
  const {user, isAuthReady} = useAuth();

  const restoreHomeAfterSession = useCallback(() => {
    if (isAuthReady && user) {
      navigateToHomeIfNeeded();
    }
  }, [isAuthReady, user]);

  useEffect(() => {
    restoreHomeAfterSession();
  }, [restoreHomeAfterSession]);

  return (
    <NavigationContainer ref={navigationRef} onReady={restoreHomeAfterSession}>
      <RootNavigator />
    </NavigationContainer>
  );
}
