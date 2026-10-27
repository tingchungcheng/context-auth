import React, {useCallback, useEffect, useRef} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuth} from '../context/AuthContext';
import {colors} from '../theme/colors';
import {MainTabParamList} from '../navigation/types';

export const FLOATING_TAB_BAR_HEIGHT = 56;

type TabItemProps = {
  label: string;
  isFocused: boolean;
  onPress: () => void;
};

function FloatingTabItem({label, isFocused, onPress}: TabItemProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const springTo = useCallback(
    (toValue: number, bounciness = 6) => {
      Animated.spring(scale, {
        toValue,
        useNativeDriver: true,
        speed: 24,
        bounciness,
      }).start();
    },
    [scale],
  );

  useEffect(() => {
    if (isFocused) {
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.08,
          useNativeDriver: true,
          speed: 36,
          bounciness: 10,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 22,
          bounciness: 6,
        }),
      ]).start();
    }
  }, [isFocused, scale]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={label}
      onPress={onPress}
      onPressIn={() => springTo(0.88, 4)}
      onPressOut={() => springTo(1)}
      style={styles.tabPressable}>
      <Animated.View
        style={[
          styles.tab,
          isFocused ? styles.tabActive : undefined,
          {transform: [{scale}]},
        ]}>
        <Text
          style={[styles.label, isFocused ? styles.labelActive : undefined]}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export function FloatingTabBar({state, navigation}: BottomTabBarProps) {
  const {user} = useAuth();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 12);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.outer, {paddingBottom: bottomInset}]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = route.name;

          const onPress = () => {
            const routeName = route.name as keyof MainTabParamList;

            if (routeName === 'Home' && !user) {
              navigation.navigate('Login');
              return;
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(routeName);
            }
          };

          return (
            <FloatingTabItem
              key={route.key}
              label={label}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 6,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  tabPressable: {
    flex: 1,
  },
  tab: {
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  labelActive: {
    color: '#FFFFFF',
  },
});
