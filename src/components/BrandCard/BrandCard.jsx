import React, { useMemo } from 'react';
import { View } from 'react-native';
import Text from '../AppText/AppText';
import GlassSurface from '../GlassSurface/GlassSurface';
import { useTheme } from '../../context/ThemeContext';
import { createStyles, BRAND_CARD_RADIUS } from './BrandCard.styles';

/**
 * The heading's wording in each language. Splash and Login always use
 * English (their design); the in-app screens pass the current language.
 */
const WORDING = {
  en: {
    welcome: 'WELCOME TO',
    office: 'OFFICE OF THE OMBUDSMAN PUNJAB',
    org: 'Ombudsman Punjab',
    mis: 'Management Information System',
  },
  ur: {
    welcome: 'خوش آمدید',
    office: 'دفتر محتسب پنجاب',
    org: 'محتسب پنجاب',
    mis: 'مینجمنٹ انفارمیشن سسٹم',
  },
};

/**
 * BRAND CARD — "Welcome to · Office of the Ombudsman Punjab · Ombudsman
 * Punjab · Management Information System · OPMIS".
 *
 *   <BrandCard style={…spacing around it…} />
 *
 * Shared by the splash screen, the login screen and (through
 * CertificationBadges) every screen that shows the crest, so they always
 * show the identical wording. Change the wording or styling here, once.
 *
 *   showOpmisPill  the green OPMIS pill at the bottom. On by default (the
 *                  splash keeps it); the login screen and the in-app
 *                  headings pass false.
 *   bare           draw the heading straight on the background, with no
 *                  glass card behind it (login and the in-app headings).
 *   lang           'en' (default) or 'ur'. Urdu uses the Urdu wording and
 *                  drops the letter-spacing — spacing pulls Nastaleeq's
 *                  joined letters apart.
 *
 * Carded, the content is centred through contentStyle, not style:
 * GlassSurface puts the children in an inner view, so centring only the
 * outer card left fixed-width pieces (the orange divider) at the left edge.
 */
const BrandCard = ({ style, showOpmisPill = true, bare = false, lang = 'en' }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const words = WORDING[lang] ?? WORDING.en;
  const urdu = lang === 'ur' && styles.urdu;

  const content = (
    <>
      <Text style={[styles.welcome, urdu]}>{words.welcome}</Text>
      {/* One line: numberOfLines + adjustsFontSizeToFit shrinks it to fit
          the width on narrow phones instead of wrapping. */}
      <Text style={[styles.officeLine, urdu]} numberOfLines={1} adjustsFontSizeToFit>
        {words.office}
      </Text>

      <View style={styles.divider} />

      <Text style={[styles.orgName, urdu]} numberOfLines={1} adjustsFontSizeToFit>
        {words.org}
      </Text>
      <Text style={[styles.misLine, urdu]}>{words.mis}</Text>
      {showOpmisPill && (
        <View style={styles.opmisPill}>
          <Text style={styles.opmisPillText}>OPMIS</Text>
        </View>
      )}
    </>
  );

  // No card: the text sits on the background. The theme's text shadow keeps
  // it readable over the background image, as it does for the crest's title.
  if (bare) {
    return <View style={[styles.bare, style]}>{content}</View>;
  }

  return (
    <GlassSurface
      radius={BRAND_CARD_RADIUS}
      style={[styles.card, style]}
      contentStyle={styles.content}
    >
      {content}
    </GlassSurface>
  );
};

export default BrandCard;