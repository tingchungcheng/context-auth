import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {HomeScreen} from '../screens/HomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {SignupScreen} from '../screens/SignupScreen';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabBar(props: BottomTabBarProps) {
  return <FloatingTabBar {...props} />;
}

export function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      tabBar={MainTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Signup" component={SignupScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
