import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/context/AuthContext';
import {ModalProvider} from './src/context/ModalContext';
import {ToastProvider} from './src/context/ToastContext';
import {AuthLoadingGate} from './src/components/AuthLoadingGate';
import {AppNavigation} from './src/navigation/AppNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthLoadingGate>
          <ModalProvider>
            <ToastProvider>
              <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
              <AppNavigation />
            </ToastProvider>
          </ModalProvider>
        </AuthLoadingGate>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
