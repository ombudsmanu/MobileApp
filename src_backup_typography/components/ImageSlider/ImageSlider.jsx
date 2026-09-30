import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {createStyles} from './ImageSlider.styles';

/**
 * Auto-playing, swipeable photo slider.
 *
 *   slides   [{key, source, caption}]
 *   height   slider height (default 200)
 *   interval ms between auto-advances (default 4500)
 *   overlay  optional element drawn over every slide (e.g. a welcome line)
 *   rtl      mirrors caption and dots for Urdu
 *
 * Auto-play pauses while the user is dragging, so it never fights a swipe.
 */
const ImageSlider = ({slides, height = 200, interval = 4500, overlay, rtl = false}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const listRef = useRef(null);
  const indexRef = useRef(0);
  const dragging = useRef(false);

  // ---- Auto-play --------------------------------------------------------
  useEffect(() => {
    if (!width || slides.length < 2) {
      return undefined;
    }
    const id = setInterval(() => {
      if (dragging.current) {
        return;
      }
      const next = (indexRef.current + 1) % slides.length;
      listRef.current?.scrollToOffset({offset: next * width, animated: true});
      indexRef.current = next;
      setIndex(next);
    }, interval);
    return () => clearInterval(id);
  }, [width, slides.length, interval]);

  const onSwipeEnd = e => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    indexRef.current = i;
    setIndex(i);
    dragging.current = false;
  };

  const renderSlide = ({item}) => (
    <View style={{width, height}}>
      <Image source={item.source} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.10)', 'rgba(0,0,0,0.70)']}
        locations={[0, 0.45, 1]}
        style={styles.shade}
      />
      {!!item.caption && (
        <View style={[styles.captionChip, rtl && styles.captionChipRTL]}>
          <Text style={styles.captionText}>{item.caption}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View
      style={[styles.wrap, {height}]}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}>
      {width > 0 && (
        <FlatList
          ref={listRef}
          data={slides}
          keyExtractor={s => s.key}
          renderItem={renderSlide}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={() => (dragging.current = true)}
          onMomentumScrollEnd={onSwipeEnd}
          getItemLayout={(_, i) => ({length: width, offset: width * i, index: i})}
        />
      )}

      {overlay}

      <View style={[styles.dots, rtl && styles.dotsRTL]} pointerEvents="none">
        {slides.map((s, i) => (
          <View key={s.key} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;