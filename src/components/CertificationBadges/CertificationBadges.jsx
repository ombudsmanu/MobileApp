import React, {useMemo} from 'react';
import {Animated, Image, View} from 'react-native';
import Text from '../AppText/AppText';
import {usePulse} from '../ModuleTile/usePulse';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {
  styles,
  createCrestStyles,
  createHeadingStyles,
  CREST_SIZE,
} from './CertificationBadges.styles';

/**
 * CERTIFICATION BADGES — the Office's crest, the Office name under it
 * ("Office of the Ombudsman Punjab"), and the four certification marks in
 * a row underneath: ISO/IEC 27001, ISO 9001, UKAS and IAF.
 *
 *   <CertificationBadges play={ready} startIndex={0} style={…} />
 *
 *   play        start the pop-in; pass useScreenReady() so it waits until
 *               the screen has finished sliding in
 *   startIndex  where these badges sit in the screen's cascade, so they pop
 *               after whatever animates before them
 *   style       spacing around the whole block (crest + name + badges)
 *   showCrest   the crest AND the Office name above the badges — on by
 *               default, so EVERY screen that shows the certifications shows
 *               them too. Pass false only where the screen already shows the
 *               crest and the Office name right above (an About page with
 *               its own header), so they never appear twice.
 *   crestSize   how big the crest is, in dp. Defaults to CREST_SIZE (88),
 *               which is what every normal, top-aligned screen uses. A
 *               screen whose content is vertically CENTRED has empty space
 *               above the block, so it passes CREST_SIZE_LARGE to fill it.
 *               Only the crest changes — the Office name and the four
 *               badges stay the same size on every screen, so the block
 *               still reads as the same header everywhere.
 *
 * OFFICE NAME — one line, the `officeName` string, so it follows the app
 * language: "Office of the Ombudsman Punjab" / "دفتر محتسب پنجاب". The full
 * Welcome-to heading (BrandCard) stays on the Splash and Login screens only.
 *
 * The ONE place the crest-name-badges block is defined — Downloads, Annual
 * Reports, Register Complaint, both complaint forms, About Us and the About
 * section pages use it. Changing it here changes them all.
 *
 * The crest and name sit still; the badges pop in one after another.
 */
const CREST = require('../../assets/images/crest.png');

export const BADGES = [
  {key: 'iso27001', source: require('../../assets/images/iso27001.png'), label: 'ISO/IEC 27001'},
  {key: 'iso9001', source: require('../../assets/images/iso-sgs.png'), label: 'ISO 9001'},
  {key: 'ukas', source: require('../../assets/images/ukas.jpg'), label: 'UKAS'},
  {key: 'iaf', source: require('../../assets/images/iaf.png'), label: 'IAF'},
];

/** One badge with a single zoom-in pop — its own component because each
 *  badge needs its own animation, and a hook can't run inside a .map(). */
const CertBadge = ({source, label, index, play}) => {
  const pop = usePulse(index, play);
  const motion = useMemo(() => ({transform: [{scale: pop}]}), [pop]);
  return (
    <Animated.Image
      source={source}
      style={[styles.badge, motion]}
      resizeMode="contain"
      accessibilityLabel={label}
    />
  );
};

const CertificationBadges = ({
  play = true,
  startIndex = 0,
  style,
  showCrest = true,
  crestSize = CREST_SIZE,
}) => {
  const {theme} = useTheme();
  const heading = useMemo(() => createHeadingStyles(theme), [theme]);
  const crest = useMemo(() => createCrestStyles(crestSize), [crestSize]);
  const {t} = useLanguage();

  return (
    <View style={style}>
      {showCrest && (
        <>
          <Image
            source={CREST}
            style={crest.crest}
            resizeMode="contain"
            accessibilityLabel="Office of the Ombudsman Punjab crest"
          />
          {/* The Office name, on one line under the crest */}
          <Text style={heading.officeName} numberOfLines={1} adjustsFontSizeToFit>
            {t('officeName')}
          </Text>
        </>
      )}
      <View style={styles.row}>
        {BADGES.map((badge, i) => (
          <CertBadge
            key={badge.key}
            source={badge.source}
            label={badge.label}
            index={startIndex + i}
            play={play}
          />
        ))}
      </View>
    </View>
  );
};

export default CertificationBadges;