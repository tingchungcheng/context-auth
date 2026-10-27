import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';

/**
 * After AsyncStorage hydration, open Home when a session was restored.
 */
export function AuthBootstrap() {
  const {user, isAuthReady} = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthReady || !user) {
      return;
    }
    navigation.navigate('Home' as never);
  }, [isAuthReady, navigation, user]);

  return null;
}
