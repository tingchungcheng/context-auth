import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/context/AuthContext';
import {ModalProvider} from './src/context/ModalContext';
import {ToastProvider} from './src/context/ToastContext';
import {AuthLoadingGate} from './src/components/AuthLoadingGate';
import {AuthBootstrap} from './src/navigation/AuthBootstrap';
import {RootNavigator} from './src/navigation/RootNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthLoadingGate>
          <ModalProvider>
            <ToastProvider>
              <NavigationContainer>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <AuthBootstrap />
                <RootNavigator />
              </NavigationContainer>
            </ToastProvider>
          </ModalProvider>
        </AuthLoadingGate>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
