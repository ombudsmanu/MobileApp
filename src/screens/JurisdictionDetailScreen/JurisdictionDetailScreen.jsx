import React, {useMemo} from 'react';
import {ScrollView, View, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {useLayout} from '../../theme/responsive';
import {findJurisdictionSection} from '../../content/jurisdictionSections';
import {jurisdictionContent} from '../../content/jurisdictionContent';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import {useScreenReady} from '../../navigation/useScreenReady';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import {
  createStyles,
  createDynamicStyles,
  createCardStyles,
  createTextStyles,
  createTextAccentStyles,
  CARD_COLORS,
  BACK_RADIUS,
} from './JurisdictionDetailScreen.styles';

/**
 * Splits the text blocks into cards — EACH HEADING STARTS A NEW CARD. So a
 * document-style page (Mandate) becomes one card per section (Mandate,
 * Jurisdiction…, Functions, Powers), exactly like the original About
 * Section pages. The paragraphs and bullets after a heading belong to that
 * heading's card.
 */
const groupByHeading = blocks => {
  const groups = [];
  let card = null;
  blocks.forEach(block => {
    if (block.type === 'heading' || !card) {
      card = {blocks: []};
      groups.push(card);
    }
    card.blocks.push(block);
  });
  return groups;
};

/**
 * TEXT CARD — one section of a document-style page (Mandate): a heading with
 * its icon badge, then the paragraphs and bullet lists under it. Drawn like
 * the About Section text cards; the section's colour tints the badge and the
 * bullet dots.
 */
const TextCard = ({blocks, colors, accentStyles, rtl, styles}) => (
  <GlassSurface style={styles.textCard}>
    {blocks.map((b, i) => {
      if (b.type === 'heading') {
        return (
          <View key={i} style={[styles.headingRow, rtl && styles.rowRTL]}>
            {b.icon ? (
              <View style={[styles.headingBadgeShell, accentStyles.badgeShell]}>
                <LinearGradient
                  colors={colors}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.headingBadge}>
                  <Icon name={b.icon} size={20} color="#FFFFFF" weight={2.5} />
                </LinearGradient>
              </View>
            ) : (
              <View style={[styles.headingBar, accentStyles.fill]} />
            )}
            <Text style={[styles.heading, rtl && styles.textRTL]}>{b.text}</Text>
          </View>
        );
      }
      if (b.type === 'bullets') {
        return (
          <View key={i}>
            {b.items.map((item, j) => (
              <View key={j} style={[styles.bulletRow, rtl && styles.rowRTL]}>
                <View style={[styles.bulletDot, accentStyles.fill]} />
                <Text style={[styles.bulletText, rtl && styles.textRTL]}>{item}</Text>
              </View>
            ))}
          </View>
        );
      }
      // paragraph
      return (
        <Text key={i} style={[styles.paragraph, rtl && styles.textRTL]}>
          {b.text}
        </Text>
      );
    })}
  </GlassSurface>
);

/**
 * POINT CARD — the icon-card layout (What We Can Do, How We Do, What We Can
 * Not Do). A clean glass card with a coloured icon badge on the leading side
 * and the text beside it. No heavy colour wash over the whole card — just the
 * badge carries the colour, so the cards read clearly over the background.
 */
const PointCard = ({item, colors, rtl, play, index, styles}) => (
  <StaggerIn index={index} play={play} style={styles.pointWrap}>
    <GlassSurface style={styles.pointCard} contentStyle={styles.pointContent}>
      <View style={[styles.pointRow, rtl && styles.rowRTL]}>
        <View style={styles.pointBadgeShell}>
          <LinearGradient
            colors={colors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.pointBadge}>
            <Icon name={item.icon} size={20} color="#FFFFFF" weight={2.5} />
          </LinearGradient>
        </View>
        <Text style={[styles.pointText, rtl && styles.textRTL]}>{item.text}</Text>
      </View>
    </GlassSurface>
  </StaggerIn>
);
// ---------------------------------------------------------------------------

/**
 * JURISDICTION DETAIL — one Jurisdiction page. A page chooses its own layout:
 *
 *   'text'   Mandate — a card PER HEADING (Mandate, Jurisdiction…, Functions,
 *            Powers), like the original About Section pages.
 *   'cards'  the other three — each point in its own clean card with a
 *            coloured icon, under a centred page title.
 *
 * Direction follows the CONTENT's language, as with About Us.
 */
const JurisdictionDetailScreen = ({navigation, route}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const textStyles = useMemo(() => createTextStyles(theme), [theme]);
  const cardStyles = useMemo(() => createCardStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const {width} = useLayout();
  const dyn = useMemo(() => createDynamicStyles(insets, width), [insets, width]);
  const {lang, t, isRTL} = useLanguage();

  const section = findJurisdictionSection(route.params?.key);
  const content = section ? jurisdictionContent[section.key] : null;

  const contentLang = content?.[lang] ? lang : 'en';
  const page = content?.[contentLang] ?? null;
  const rtl = contentLang === 'ur';
  const showEnglishNote = !!page && lang !== contentLang;

  const ready = useScreenReady();
  const cardName = section ? t(`jur.${section.key}`, section.label) : t('jur.title', 'Jurisdiction');
  const sectionColors = section?.colors ?? [theme.accent, theme.accent];
  const accent = sectionColors[1];
  const textAccent = useMemo(() => createTextAccentStyles(accent), [accent]);

  const isText = page?.layout === 'text';
  // Mandate: group blocks into one card per heading
  const groups = useMemo(
    () => (isText && page ? groupByHeading(page.blocks) : []),
    [isText, page],
  );

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={30} color={theme.icon.heading} weight={3} />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          <Text
            style={[styles.topTitle, isRTL && styles.textRTL]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}>
            {cardName}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>
        {/* Certification badges at the top, like every content page */}
        <CertificationBadges
          play={ready}
          startIndex={0}
          style={styles.topBadges}
          showCrest={false}
        />

        {!page ? (
          <GlassSurface style={styles.soonCard}>
            <Text style={styles.soonText}>{t('about.contentSoon')}</Text>
          </GlassSurface>
        ) : isText ? (
          // ---- MANDATE: one card per heading ----
          <>
            {showEnglishNote && (
              <Text style={styles.langNote}>{t('about.englishOnly')}</Text>
            )}
            {groups.map((g, i) => (
              <StaggerIn key={i} index={i} play={ready} style={styles.cardWrap}>
                <TextCard
                  blocks={g.blocks}
                  colors={sectionColors}
                  accentStyles={textAccent}
                  rtl={rtl}
                  styles={textStyles}
                />
              </StaggerIn>
            ))}
          </>
        ) : (
          // ---- THE OTHER THREE: centred title + clean icon cards ----
          <>
            <View style={styles.titleWrap}>
              <View style={styles.titleBadgeShell}>
                <LinearGradient
                  colors={sectionColors}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.titleBadge}>
                  <Icon name={page.titleIcon} size={24} color="#FFFFFF" weight={2.5} />
                </LinearGradient>
              </View>
              <Text style={styles.pageTitle}>{page.title}</Text>
              <View style={[styles.titleRule, {backgroundColor: accent}]} />
            </View>

            {showEnglishNote && (
              <Text style={styles.langNote}>{t('about.englishOnly')}</Text>
            )}

            {page.cards.map((item, i) => (
              <PointCard
                key={i}
                item={item}
                colors={CARD_COLORS[i % CARD_COLORS.length]}
                rtl={rtl}
                play={ready}
                index={i}
                styles={cardStyles}
              />
            ))}
          </>
        )}
      </ScrollView>
    </AppBackground>
  );
};

export default JurisdictionDetailScreen;