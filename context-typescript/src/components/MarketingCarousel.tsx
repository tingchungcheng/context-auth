import React, {useCallback, useEffect, useRef} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const HORIZONTAL_PADDING = 24;
const SLIDE_GAP = 12;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
const SNAP_INTERVAL = SLIDE_WIDTH + SLIDE_GAP;
const AUTO_ADVANCE_MS = 4000;

const SLIDE_PALETTES = [
  ['#DBEAFE', '#EFF6FF'],
  ['#E0E7FF', '#EEF2FF'],
  ['#D1FAE5', '#ECFDF5'],
  ['#FCE7F3', '#FDF2F8'],
];

export function MarketingCarousel() {
  const scrollRef = useRef<ScrollView>(null);
  const activeIndex = useRef(0);
  const isDragging = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToIndex = useCallback((index: number, animated: boolean) => {
    scrollRef.current?.scrollTo({
      x: index * SNAP_INTERVAL,
      animated,
    });
    activeIndex.current = index;
  }, []);

  const startAutoAdvance = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
    }
    autoTimer.current = setInterval(() => {
      if (isDragging.current) {
        return;
      }
      const next = (activeIndex.current + 1) % SLIDE_PALETTES.length;
      scrollToIndex(next, true);
    }, AUTO_ADVANCE_MS);
  }, [scrollToIndex]);

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (autoTimer.current) {
        clearInterval(autoTimer.current);
      }
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    };
  }, [startAutoAdvance]);

  const pauseAutoAdvance = () => {
    isDragging.current = true;
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }
  };

  const scheduleAutoAdvance = () => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }
    resumeTimer.current = setTimeout(() => {
      isDragging.current = false;
      startAutoAdvance();
    }, 2500);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);
    const clamped = Math.max(0, Math.min(index, SLIDE_PALETTES.length - 1));
    activeIndex.current = clamped;
  };

  return (
    <View style={styles.viewport}>
      <ScrollView
        ref={scrollRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.track}
        onScrollBeginDrag={pauseAutoAdvance}
        onScrollEndDrag={scheduleAutoAdvance}
        onMomentumScrollEnd={event => {
          handleScrollEnd(event);
          scheduleAutoAdvance();
        }}>
        {SLIDE_PALETTES.map((palette, index) => (
          <View
            key={`slide-${index}`}
            style={[
              styles.slide,
              styles.slideSized,
              index < SLIDE_PALETTES.length - 1 ? styles.slideGap : undefined,
              {backgroundColor: palette[0], borderColor: palette[1]},
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    overflow: 'hidden',
    marginHorizontal: -HORIZONTAL_PADDING,
  },
  track: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  slide: {
    height: 168,
    borderRadius: 20,
    borderWidth: 1,
  },
  slideSized: {
    width: SLIDE_WIDTH,
  },
  slideGap: {
    marginRight: SLIDE_GAP,
  },
});
