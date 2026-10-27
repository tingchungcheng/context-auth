import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
const SLIDE_COUNT = 4;
const HORIZONTAL_PADDING = 24;
const SLIDE_GAP = 12;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
const LOOP_WIDTH = SLIDE_COUNT * (SLIDE_WIDTH + SLIDE_GAP);

const SLIDE_PALETTES = [
  ['#DBEAFE', '#EFF6FF'],
  ['#E0E7FF', '#EEF2FF'],
  ['#D1FAE5', '#ECFDF5'],
  ['#FCE7F3', '#FDF2F8'],
];

export function MarketingCarousel() {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -LOOP_WIDTH,
        duration: 16000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [translateX]);

  const slides = [...SLIDE_PALETTES, ...SLIDE_PALETTES];

  return (
    <View style={styles.viewport}>
      <Animated.View
        style={[
          styles.track,
          {
            width: slides.length * (SLIDE_WIDTH + SLIDE_GAP),
            transform: [{translateX}],
          },
        ]}>
        {slides.map((palette, index) => (
          <View
            key={`slide-${index}`}
            style={[
              styles.slide,
              {
                width: SLIDE_WIDTH,
                marginRight: SLIDE_GAP,
                backgroundColor: palette[0],
                borderColor: palette[1],
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    overflow: 'hidden',
    marginHorizontal: -HORIZONTAL_PADDING,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  track: {
    flexDirection: 'row',
  },
  slide: {
    height: 168,
    borderRadius: 20,
    borderWidth: 1,
    opacity: 0.95,
  },
});
