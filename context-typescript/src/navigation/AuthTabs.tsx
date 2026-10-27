import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {LoginScreen} from '../screens/LoginScreen';
import {SignupScreen} from '../screens/SignupScreen';
import {AuthTabParamList} from './types';

const Tab = createBottomTabNavigator<AuthTabParamList>();

function AuthTabBar(props: BottomTabBarProps) {
  return <FloatingTabBar {...props} />;
}

export function AuthTabs() {
  return (
    <Tab.Navigator
      tabBar={AuthTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Signup" component={SignupScreen} />
    </Tab.Navigator>
  );
}
