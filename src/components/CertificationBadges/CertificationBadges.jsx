import React, {useMemo} from 'react';
import {Animated, View} from 'react-native';
import {usePulse} from '../ModuleTile/usePulse';
import {styles} from './CertificationBadges.styles';

/**
 * CERTIFICATION BADGES — the Office's four certification marks in a row:
 * ISO/IEC 27001, ISO 9001, UKAS and IAF.
 *
 *   <CertificationBadges play={ready} startIndex={0} style={…} />
 *
 *   play        start the pop-in; pass useScreenReady() so it waits until
 *               the screen has finished sliding in
 *   startIndex  where these badges sit in the screen's cascade, so they pop
 *               after whatever animates before them
 *   style       spacing around the row
 *
 * The ONE place the badges are defined — the About Us screen and every
 * About section page use this, so adding or replacing a certification
 * happens here only.
 */
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

const CertificationBadges = ({play = true, startIndex = 0, style}) => (
  <View style={[styles.row, style]}>
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
);

export default CertificationBadges;