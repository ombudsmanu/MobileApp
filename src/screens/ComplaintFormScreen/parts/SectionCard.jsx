import React, {useMemo} from 'react';
import {View} from 'react-native';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import {useTheme} from '../../../context/ThemeContext';
import {createSectionStyles} from './parts.styles';

/**
 * SECTION CARD — the labelled divider between form sections, matching the
 * reference design: a soft card with a small coloured dot on the leading
 * side, a centred title, and a two-tone (green → orange) progress bar
 * underneath.
 *
 *   <SectionCard title={t('cf.sec.general')} />
 *
 * It only labels a section; the fields themselves sit below it, not inside.
 */
const SectionCard = ({title}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createSectionStyles(theme), [theme]);

  return (
    <GlassSurface style={styles.card} contentStyle={styles.content}>
      <View style={styles.dotOuter}>
        <View style={styles.dotInner} />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.progressTrack}>
        <View style={styles.progressGreen} />
        <View style={styles.progressOrange} />
      </View>
    </GlassSurface>
  );
};

export default SectionCard;