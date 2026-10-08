import React, { useMemo, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { findAboutSection } from '../../content/aboutSections';
import { aboutContent } from '../../content/aboutContent';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import PhotoTap from '../../components/PhotoTap/PhotoTap';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import LinearGradient from 'react-native-linear-gradient';
import {
  createStyles,
  createDynamicStyles,
  createAccentStyles,
  BACK_RADIUS,
  PROFILE_ICON_SIZE,
  PERSON_ICON_SIZE,
} from './AboutSectionScreen.styles';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import { useScreenReady } from '../../navigation/useScreenReady';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import SectionRow from '../../components/SectionRow/SectionRow';

/**
 * Splits the blocks into cards: every heading starts a new text card;
 * profile and people blocks stand on their own.
 */
const groupBlocks = blocks => {
  const groups = [];
  let card = null;
  blocks.forEach(block => {
    if (
      block.type === 'profile' ||
      block.type === 'people' ||
      block.type === 'contact' ||
      block.type === 'sections'
    ) {
      card = null;
      groups.push({ kind: block.type, block });
      return;
    }
    if (block.type === 'heading' || !card) {
      card = { kind: 'card', blocks: [] };
      groups.push(card);
    }

    card.blocks.push(block);
  });
  return groups;
};

/**
 * A round photo inside a coloured ring, or a person icon until the photo is
 * supplied. Every photo in About Us is drawn here, so making it tappable
 * here makes every profile and person card open the full-screen viewer.
 *
 *   variant      'profile' (132px, Ombudsman / Secretary) | 'person' (60px)
 *   accentStyles the section-coloured ring (createAccentStyles)
 *
 * The photo sits INSIDE the ring at exactly the inner size, with
 * resizeMode "cover": it fills the circle and trims equally from both
 * sides, so it is centred whatever the image's shape.
 */
const Photo = ({
  source,
  variant,
  accentStyles,
  styles,
  theme,
  name,
  caption,
}) => {
  const isProfile = variant === 'profile';
  const ring = isProfile ? styles.photoRingProfile : styles.photoRingPerson;
  const inner = isProfile ? styles.photoInnerProfile : styles.photoInnerPerson;

  return (
    <View style={[ring, accentStyles.photoRing]}>
      {source ? (
        <PhotoTap
          source={source}
          style={inner}
          resizeMode="cover"
          name={name}
          caption={caption}
        />
      ) : (
        <Icon
          name="user"
          size={isProfile ? PROFILE_ICON_SIZE : PERSON_ICON_SIZE}
          color={theme.icon.muted}
        />
      )}
    </View>
  );
};

/** Headings, paragraphs and a signature, together in one card. */
const TextCard = ({ blocks, accent, colors, accentStyles, rtl, styles }) => (
  <GlassSurface style={styles.textCard}>
    {blocks.map((b, i) => {
      if (b.type === 'heading') {
        return (
          <View key={i}>
            {b.image ? (
              <View style={styles.logoCard}>
                <Image
                  source={b.image}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ) : null}
            <View style={[styles.headingRow, rtl && styles.rowRTL]}>
              {b.icon ? (
                // Small badge in the section's colours; the shell casts the
                // shadow and the gradient rounds itself
                <View
                  style={[styles.headingBadgeShell, accentStyles.badgeShell]}
                >
                  <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headingBadge}
                  >
                    <Icon
                      name={b.icon}
                      size={20}
                      color="#FFFFFF"
                      weight={2.5}
                    />
                  </LinearGradient>
                </View>
              ) : (
                <View
                  style={[styles.headingBar, { backgroundColor: accent }]}
                />
              )}
              <Text style={[styles.heading, rtl && styles.textRTL]}>
                {b.text}
              </Text>
            </View>
          </View>
        );
      }
      if (b.type === 'signature') {
        return (
          <View key={i} style={[styles.signature, rtl && styles.signatureRTL]}>
            <View style={styles.signatureRule} />
            <Text style={styles.signatureName}>{b.name}</Text>
            <Text style={styles.signatureRole}>{b.role}</Text>
          </View>
        );
      }
      if (b.type === 'bullets') {
        return (
          <View key={i}>
            {b.items.map((item, j) => (
              <View key={j} style={[styles.bulletRow, rtl && styles.rowRTL]}>
                <View style={[styles.bulletDot, { backgroundColor: accent }]} />
                <Text style={[styles.bulletText, rtl && styles.textRTL]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        );
      }
      if (b.type === 'link') {
        return (
          <Pressable
            key={i}
            onPress={() => Linking.openURL(b.url)}
            style={[styles.linkRow, rtl && styles.rowRTL]}
          >
            <Icon name="doc" size={15} color={accent} />
            <Text style={styles.linkText}>{b.label}</Text>
          </Pressable>
        );
      }
      return (
        <Text key={i} style={[styles.paragraph, rtl && styles.textRTL]}>
          {b.text}
        </Text>
      );
    })}
  </GlassSurface>
);

/**
 * Name and role — for the Ombudsman, Secretary and PIO profiles.
 * The photo circle is shown only when a photo is set; with photo: null
 * the card is just the name and role, with no empty placeholder.
 */
const ProfileCard = ({ block, accentStyles, styles, theme }) => (
  <GlassSurface style={styles.profileCard}>
    <View style={styles.profileInner}>
      {block.photo ? (
        <Photo
          source={block.photo}
          variant="profile"
          accentStyles={accentStyles}
          styles={styles}
          theme={theme}
          name={block.name}
          caption={block.role}
        />
      ) : null}
      <Text
        style={[styles.profileName, !block.photo && styles.profileNameNoPhoto]}
      >
        {block.name}
      </Text>
      <Text style={styles.profileRole}>{block.role}</Text>
    </View>
  </GlassSurface>
);

/** One person: photo, name, tenure, and an expandable biography. */
const PersonCard = ({ person, accentStyles, rtl, t, styles, theme }) => {
  const [open, setOpen] = useState(false);
  const hasBio = !!person.bio?.length;

  return (
    <GlassSurface style={styles.personCard}>
      <View style={[styles.personRow, rtl && styles.rowRTL]}>
        <Photo
          source={person.photo}
          variant="person"
          accentStyles={accentStyles}
          styles={styles}
          theme={theme}
          name={person.name}
          caption={person.role || person.tenure}
        />
        <View style={[styles.personText, rtl && styles.personTextRTL]}>
          <Text style={[styles.personName, rtl && styles.textRTL]}>
            {person.name}
          </Text>
          {person.role ? (
            <Text style={[styles.personRole, rtl && styles.textRTL]}>
              {person.role}
            </Text>
          ) : (
            <View style={styles.tenurePill}>
              <Text style={styles.tenureText}>{person.tenure}</Text>
            </View>
          )}
        </View>
      </View>

      {hasBio && (
        <>
          <Pressable
            onPress={() => setOpen(o => !o)}
            hitSlop={8}
            style={styles.bioToggle}
          >
            <Text style={styles.bioToggleText}>
              {open ? t('about.hideBio') : t('about.readBio')}
            </Text>
            <View style={{ transform: [{ rotate: open ? '0deg' : '180deg' }] }}>
              <Icon
                name="chevronUp"
                size={18}
                color={theme.accent}
                weight={3}
              />
            </View>
          </Pressable>
          {open &&
            person.bio.map((para, i) => (
              <Text key={i} style={[styles.paragraph, rtl && styles.textRTL]}>
                {para}
              </Text>
            ))}
        </>
      )}
    </GlassSurface>
  );
};

/**
 * Contact details. Email and phone rows are tappable — they open the
 * mail app or start a call, so nobody has to copy them by hand.
 */
const ContactCard = ({ block, accent, rtl, styles, theme }) => {
  const open = row => {
    if (row.action === 'mail') {
      Linking.openURL(`mailto:${row.value}`);
    } else if (row.action === 'phone') {
      Linking.openURL(`tel:${row.value.replace(/\s/g, '')}`);
    }
  };

  return (
    <GlassSurface style={styles.contactCard}>
      {block.rows.map((row, i) => (
        <View key={row.label}>
          {i > 0 && <View style={styles.contactDivider} />}
          <Pressable
            disabled={!row.action}
            onPress={() => open(row)}
            style={[styles.contactRow, rtl && styles.rowRTL]}
          >
            <View
              style={[styles.contactIcon, { backgroundColor: `${accent}1A` }]}
            >
              <Icon name={row.icon} size={18} color={accent} />
            </View>
            <View style={styles.contactText}>
              <Text style={[styles.contactLabel, rtl && styles.textRTL]}>
                {row.label.toUpperCase()}
              </Text>
              <Text
                style={[
                  styles.contactValue,
                  row.action && styles.contactValueAction,
                  rtl && styles.textRTL,
                ]}
              >
                {row.value}
              </Text>
            </View>
            {!!row.action && (
              <Icon
                name={rtl ? 'chevronLeft' : 'chevronRight'}
                size={16}
                color={theme.icon.muted}
              />
            )}
          </Pressable>
        </View>
      ))}
    </GlassSurface>
  );
};
// ---------------------------------------------------------------------------

const AboutSectionScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const { lang, t, isRTL } = useLanguage();
  const section = findAboutSection(route.params?.key);
  const content = section ? aboutContent[section.key] : null;

  // Current language if supplied, English otherwise. Direction follows the
  // CONTENT's language, so English shown in Urdu mode stays left-to-right.
  const contentLang = content?.[lang] ? lang : 'en';
  const blocks = content?.[contentLang] ?? null;
  const rtl = contentLang === 'ur';
  const showEnglishNote = !!blocks && lang !== contentLang;

  const groups = useMemo(() => (blocks ? groupBlocks(blocks) : []), [blocks]);
  const accent = section?.colors[1] ?? theme.accent;
  const accentStyles = useMemo(() => createAccentStyles(accent), [accent]);
  // Pages whose content is a list of sub-pages (Our Team) show the crest
  const hasSubSections = groups.some(g => g.kind === 'sections');
  const ready = useScreenReady();
  const cardName = section
    ? t(`about.${section.key}`, section.label)
    : t('about.title');
  const title = section ? t(`aboutTitle.${section.key}`, cardName) : cardName;

  // ONE counter for the whole page, so every card — title, text, people,
  // rows — animates in the order it appears, top to bottom. Separate
  // counters made the person cards race the text card above them.
  // Reset on every render, then stepped once per card as the page is built.
  let cardIndex = 0;

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <GlassSurface
            strong
            center
            radius={BACK_RADIUS}
            style={styles.backBtn}
          >
            <Icon
              name="chevronLeft"
              size={30}
              color={theme.icon.heading}
              weight={3}
            />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          <Text
            style={[styles.topTitle, isRTL && styles.textRTL]}
            numberOfLines={2}
          >
            {t('about.title')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}
      >
        {/* ---- Office crest and name (pages with sub-sections) ---- */}
        {hasSubSections && (
          <View style={styles.crestWrap}>
            <Image
              source={require('../../assets/images/crest.png')}
              style={styles.crest}
              resizeMode="contain"
            />
            <Text style={styles.crestName}>{t('officeName')}</Text>
          </View>
        )}

        {/* ---- Certification badges ---- */}
        <CertificationBadges
          play={ready}
          startIndex={0}
          style={styles.topBadges}
        />

        {/* ---- Header card: section badge + full title, in one row ---- */}
        <StaggerIn index={cardIndex++} play={ready}>
          <GlassSurface style={styles.heroCard}>
            <View style={[styles.heroRow, isRTL && styles.heroRowRTL]}>
              {section && (
                <View style={[styles.badgeShell, accentStyles.badgeShell]}>
                  <LinearGradient
                    colors={section.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.badge}
                  >
                    <Icon
                      name={section.icon}
                      size={26}
                      color="#FFFFFF"
                      weight={2.5}
                    />
                  </LinearGradient>
                </View>
              )}
              <Text style={[styles.heroTitle, isRTL && styles.heroTitleRTL]}>
                {title}
              </Text>
            </View>
          </GlassSurface>
        </StaggerIn>

        {showEnglishNote && (
          <Text style={styles.langNote}>{t('about.englishOnly')}</Text>
        )}

        {/* ---- Content, or "coming soon" until it's supplied ---- */}
        {blocks ? (
          groups.map((g, i) => {
            if (g.kind === 'profile') {
              return (
                <StaggerIn key={i} index={cardIndex++} play={ready}>
                  <ProfileCard
                    block={g.block}
                    accentStyles={accentStyles}
                    styles={styles}
                    theme={theme}
                  />
                </StaggerIn>
              );
            }
            if (g.kind === 'people') {
              return (
                <View key={i}>
                  {g.block.items.map(person => (
                    <StaggerIn
                      key={person.name}
                      index={cardIndex++}
                      play={ready}
                    >
                      <PersonCard
                        person={person}
                        accentStyles={accentStyles}
                        rtl={rtl}
                        t={t}
                        styles={styles}
                        theme={theme}
                      />
                    </StaggerIn>
                  ))}
                </View>
              );
            }
            if (g.kind === 'contact') {
              return (
                <StaggerIn key={i} index={cardIndex++} play={ready}>
                  <ContactCard
                    block={g.block}
                    accent={accent}
                    rtl={rtl}
                    styles={styles}
                    theme={theme}
                  />
                </StaggerIn>
              );
            }
            if (g.kind === 'sections') {
              return (
                <View key={i}>
                  {g.block.items.map(item => (
                    <StaggerIn
                      key={item.key}
                      index={cardIndex++}
                      play={ready}
                      style={styles.sectionRowWrap}
                    >
                      <SectionRow
                        label={t(`about.${item.key}`, item.label)}
                        color={item.colors[1]}
                        rtl={isRTL}
                        onPress={() =>
                          navigation.push('AboutSection', { key: item.key })
                        }
                      />
                    </StaggerIn>
                  ))}
                </View>
              );
            }
            return (
              <StaggerIn
                key={i}
                index={cardIndex++}
                play={ready}
                style={styles.cardWrap}
              >
                <TextCard
                  blocks={g.blocks}
                  accent={accent}
                  colors={section?.colors ?? [accent, accent]}
                  accentStyles={accentStyles}
                  rtl={rtl}
                  styles={styles}
                />
              </StaggerIn>
            );
          })
        ) : (
          <GlassSurface style={styles.soonCard}>
            <Text style={styles.soonText}>{t('about.contentSoon')}</Text>
          </GlassSurface>
        )}
      </ScrollView>
    </AppBackground>
  );
};

export default AboutSectionScreen;