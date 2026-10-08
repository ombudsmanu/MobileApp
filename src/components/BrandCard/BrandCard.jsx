import React, { useMemo } from 'react';
import { View } from 'react-native';
import Text from '../AppText/AppText';
import GlassSurface from '../GlassSurface/GlassSurface';
import { useTheme } from '../../context/ThemeContext';
import { createStyles, BRAND_CARD_RADIUS } from './BrandCard.styles';

/**
 * BRAND CARD — "Office of the Ombudsman Punjab · Welcome to · Ombudsman
 * Punjab · Management Information System · OPMIS".
 *
 *   <BrandCard style={…spacing around it…} />
 *
 * Shared by the splash screen and the login screen, so the two always show
 * the identical card. Change the wording or styling here, once.
 *
 * Its content is centred through contentStyle, not style: GlassSurface puts
 * the children in an inner view, so centring only the outer card left
 * fixed-width pieces (the orange divider) sitting at the left edge.
 */
const BrandCard = ({ style }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <GlassSurface
      radius={BRAND_CARD_RADIUS}
      style={[styles.card, style]}
      contentStyle={styles.content}
    >
      <Text style={styles.welcome}>WELCOME TO</Text>
      <Text style={styles.officeLine}>OFFICE OF THE{'\n'}OMBUDSMAN PUNJAB</Text>

      <View style={styles.divider} />

      <Text style={styles.orgName} numberOfLines={1} adjustsFontSizeToFit>
        Ombudsman Punjab
      </Text>
      <Text style={styles.misLine}>Management Information System</Text>
      <View style={styles.opmisPill}>
        <Text style={styles.opmisPillText}>OPMIS</Text>
      </View>
    </GlassSurface>
  );
};

export default BrandCard;
