import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {useLayout} from '../../theme/responsive';
import {notify} from '../../utils/notify';
import MultiSelect from '../ComplaintFormScreen/parts/MultiSelect';
import {
  CNIC_PATTERN,
  EMAIL_PATTERN,
  INTL_PHONE_PATTERN,
  LANDLINE_PK_PATTERN,
  MOBILE_PK_PATTERN,
  PASSPORT_PATTERN,
  WHATSAPP_PATTERN,
  check,
  isBlank,
  digitsOnly,
  formatCnic,
  mobileChars,
} from '../../utils/validation';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import {useScreenReady} from '../../navigation/useScreenReady';
// The Overseas form is the Pakistani form's twin, so it uses the same
// building blocks and the same styles — one design, two forms.
import SectionCard from '../ComplaintFormScreen/parts/SectionCard';
import FormField from '../ComplaintFormScreen/parts/FormField';
import Dropdown from '../ComplaintFormScreen/parts/Dropdown';
import RadioRow from '../ComplaintFormScreen/parts/RadioRow';
import UploadCard from '../ComplaintFormScreen/parts/UploadCard';
import Declaration from '../ComplaintFormScreen/parts/Declaration';
import AffidavitCard from '../ComplaintFormScreen/parts/AffidavitCard';
import {useAttachments} from '../ComplaintFormScreen/parts/useAttachments';
import {FORM_STEP_MS} from '../ComplaintFormScreen/parts/parts.styles';
import {
  TITLES,
  REGIONAL_OFFICES,
  DISTRICTS,
  COUNTRIES,
  AGENCIES,
  DESIGNATIONS,
} from '../../content/complaintForm';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
} from '../ComplaintFormScreen/ComplaintFormScreen.styles';



/** The blank form — also what Reset returns to. */
const EMPTY = {
  // Fixed for this form — it is the Overseas Pakistanis' form
  complaintNature: 'overseas',
  complaintType: 'general',
  status: 'self',
  regionalOffice:  [],
  // Complainant
  cnic: '',
  title: null,
  firstName: '',
  middleName: '',
  lastName: '',
  guardian: '',
  country: null,
  passport: '',
  addressAbroad: '',
  intlMobile: '',
  intlLandline: '',
  whatsapp: '',
  addressPakistan: '',
  district:  [],
  mobilePk: '',
  phonePk: '',
  email: '',
  // Complaint
  agency: null,
  designation: null,
  subject: '',
  // Attachments
  cnicFront: null,
  cnicBack: null,
  passportDoc: null,
  affidavit: null,
  supporting: null,
};

/**
 * Field rules, in form order. Patterns live in utils/validation.js.
 * The starred fields follow the Office's Overseas form: CNIC/NICOP, name,
 * Country, District, the Pakistani mobile, Agency and Subject are required;
 * the abroad contact details are optional but still checked for shape when
 * they are filled in.
 */
const RULES = {
  regionalOffice: {required: true},
  cnic: {required: true, pattern: CNIC_PATTERN, patternKey: 'cf.err.cnic'},
  firstName: {required: true},
  country: {required: true},
  passport: {pattern: PASSPORT_PATTERN, patternKey: 'ov.err.passport'},
  intlMobile: {pattern: INTL_PHONE_PATTERN, patternKey: 'ov.err.intl'},
  intlLandline: {pattern: INTL_PHONE_PATTERN, patternKey: 'ov.err.intl'},
  whatsapp: {pattern: WHATSAPP_PATTERN, patternKey: 'ov.err.whatsapp'},
  district: {required: true},
  mobilePk: {required: true, pattern: MOBILE_PK_PATTERN, patternKey: 'cf.err.mobile'},
  phonePk: {pattern: LANDLINE_PK_PATTERN, patternKey: 'cf.err.landline'},
  email: {pattern: EMAIL_PATTERN, patternKey: 'cf.err.email'},
  agency: {required: true},
  designation: {required: true},
  subject: {required: true},
};

/**
 * OVERSEAS COMPLAINT FORM — Overseas Pakistanis.
 *
 * The same design, flow and entrance as the Pakistani Nationals form, with
 * the Overseas fields: CNIC/NICOP, Country, Passport, the address and phone
 * numbers abroad AND in Pakistan, and a Passport attachment.
 *
 * Errors are kept as string keys and translated as they are shown (err()),
 * so they follow the language switch. Number fields show zero-pattern
 * placeholders rather than a real-looking number, and the Pakistani mobile
 * accepts +92 as well as 03.
 *
 * INTERNATIONAL NUMBERS — picking a Country fills a fixed "00" + dialling
 * code box in front of International Mobile and Landline (dialPrefix), so
 * the user types only the number after it, as on the Office's website.
 *
 * No helper lines between the labels and the boxes: each number field's
 * placeholder shows the format (03000000000), and if the entry is wrong the
 * error message under the box spells the format out.
 *
 * ENTRANCE — the blocks are listed in ONE array and wrapped in StaggerIn as
 * they are rendered, so the form cascades in top-to-bottom (the same
 * cascade as About Us and Annual Reports) and each block takes its position
 * from the list — nothing to renumber when a field is added or moved.
 */
const OverseasComplaintFormScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const {width} = useLayout();
  const dyn = useMemo(() => createDynamicStyles(insets, width), [insets, width]);
  const {t, isRTL} = useLanguage();
  const ready = useScreenReady();

  const [form, setForm] = useState(EMPTY);
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = useCallback((key, value) => {
    setForm(prev => ({...prev, [key]: value}));
    // LIVE while typing: as soon as the box holds SOMETHING, check it on
    // every keystroke, so a wrong entry (a bad email, a short mobile) shows
    // its error AS the user types, not only after they leave the field — and
    // it clears the instant the entry becomes valid. A still-empty box is
    // left alone: "required" would be noise before they have begun, so that
    // one waits for blur (touch) or Create (validate). An error already on
    // screen keeps updating even when the box is cleared, so a required
    // field that is emptied still reads "required".
    setErrors(prev => {
      const show = !isBlank(value) || prev[key];
      return show ? {...prev, [key]: check(value, RULES[key])} : prev;
    });
  }, []);

  const {choose, removeFile, removeOne} = useAttachments(set);

  /**
   * The dialling-code box in front of International Mobile and Landline:
   * "00" + the picked country's code ("00966" for Saudi Arabia), like the
   * Office website. Just "00" until a country is picked, or for "Other" —
   * then the user types the code with the number.
   *
   * The form keeps only what the user TYPED (the number after the code).
   * When the API is connected, send the full number as
   *   dialPrefix + form.intlMobile   →  "00966512345678"
   */
  const dialPrefix = useMemo(
    () => `00${COUNTRIES.find(c => c.value === form.country)?.dial ?? ''}`,
    [form.country],
  );

  /**
   * Errors are stored as string KEYS ('cf.err.mobile'), not as translated
   * text, and translated here every time the form renders. So an error
   * raised in Urdu reads in English the moment the language is switched,
   * and the other way round.
   */
  const err = key => (errors[key] ? t(errors[key]) : undefined);

  /**
   * LIVE CHECKING — errors appear while the user is filling the form, not
   * only when Create Complaint is pressed:
   *
   *   touch(key)    a text box was LEFT — check what was typed, now.
   *                 Not on every keystroke from the start: "030" is not
   *                 wrong yet, only unfinished, and a red line under every
   *                 half-typed number would be noise.
   *   pick(key, v)  a dropdown / radio / multi-select changed — a choice
   *                 is complete the moment it is made, so check at once
   *                 (removing the last District chip shows "required").
   *   set(key, v)   while typing in a box that is ALREADY showing an
   *                 error, re-check on every keystroke, so the message
   *                 changes or disappears the moment the entry is right.
   */
  const touch = key =>
    setErrors(prev => ({...prev, [key]: check(form[key], RULES[key])}));

  const pick = (key, value) => {
    set(key, value);
    setErrors(prev => ({...prev, [key]: check(value, RULES[key])}));
  };

  const validate = () => {
    const next = {};
    Object.keys(RULES).forEach(key => {
      const errorKey = check(form[key], RULES[key]);
      if (errorKey) {
        next[key] = errorKey; // the KEY — translated when shown, see err()
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const create = () => {
    if (!accepted) {
      return;
    }
    if (!validate()) {
      notify.dialog({
        type: 'warning',
        title: t('cf.err.title'),
        message: t('cf.err.msg'),
        button: 'OK',
      });
      return;
    }
    notify.dialog({
      type: 'success',
      title: t('cf.done.title'),
      message: t('cf.done.msg'),
      button: 'OK',
    });
  };

  const reset = () => {
    setForm(EMPTY);
    setAccepted(false);
    setErrors({});
  };

  // ---- The form, block by block, in the order it appears ----------------
  const blocks = [
    <Text key="cmis" style={styles.cmisLine}>
      {t('cf.cmis')}
    </Text>,

    <GlassSurface key="note" style={styles.noteCard}>
      <View style={[styles.noteHeadRow, isRTL && styles.rowRTL]}>
        <View style={styles.noteBar} />
        <Text style={[styles.noteTitle, isRTL && styles.textRTL]}>{t('cf.note.title')}</Text>
      </View>
      <Text style={[styles.noteText, isRTL && styles.textRTL]}>{t('ov.note.body')}</Text>
    </GlassSurface>,

    // ---- Overseas General Details ----
    <SectionCard key="sec-general" title={t('ov.sec.general')} />,
    // Which kind of complaint this is — one option, chosen by the form
    // itself (this is the Overseas Pakistanis' form), shown so the user
    // can see it, as on the Office's website
    <RadioRow
      key="complaintNature"
      label={t('cf.complaintNature')}
      required
      options={[{value: 'overseas', en: 'Overseas Pakistani', ur: 'سمندر پار پاکستانی'}]}
      value={form.complaintNature}
      onChange={v => set('complaintNature', v)}
    />,
    <RadioRow
      key="complaintType"
      label={t('cf.complaintType')}
      required
      options={[
        {value: 'general', en: 'General', ur: 'عام'},
        {value: 'child', en: 'Child', ur: 'بچہ'},
      ]}
      value={form.complaintType}
      onChange={v => set('complaintType', v)}
    />,
    <RadioRow
      key="status"
      label={t('cf.status')}
      required
      options={[
        {value: 'self', en: 'Self', ur: 'ازخود'},
        {value: 'representative', en: 'Representative', ur: 'نمائندہ'},
      ]}
      value={form.status}
      onChange={v => set('status', v)}
    />,
       <MultiSelect
      key="regionalOffice"
      label={t('cf.regionalOffice')}
      required
      placeholder={t('cf.select.regionalOffice')}
      options={REGIONAL_OFFICES}
      values={form.regionalOffice}
      onChange={v => pick('regionalOffice', v)}
      error={err('regionalOffice')}
      searchPlaceholder={t('cf.search')}
      emptyText={t('cf.noResults')}
    />,

    // ---- Overseas Complainant Details ----
    <SectionCard key="sec-complainant" title={t('ov.sec.complainant')} />,
    <FormField
      key="cnic"
      label={t('ov.cnic')}
      required
      value={form.cnic}
      onChangeText={v => set('cnic', formatCnic(v))}
      error={err('cnic')}
      onBlur={() => touch('cnic')}
      keyboardType="number-pad"
      maxLength={15}
      placeholder={t('ov.cnic.ph')}
    />,
    <Dropdown
      key="title"
      label={t('cf.titleField')}
      placeholder={t('cf.select.title')}
      options={TITLES}
      value={form.title}
      onChange={v => set('title', v)}
      searchable={false}
    />,
    <FormField
      key="firstName"
      label={t('cf.firstName')}
      required
      value={form.firstName}
      onChangeText={v => set('firstName', v)}
      error={err('firstName')}
      onBlur={() => touch('firstName')}
      placeholder={t('cf.firstName')}
    />,
    <FormField
      key="middleName"
      label={t('cf.middleName')}
      value={form.middleName}
      onChangeText={v => set('middleName', v)}
      placeholder={t('cf.middleName')}
    />,
    <FormField
      key="lastName"
      label={t('cf.lastName')}
      value={form.lastName}
      onChangeText={v => set('lastName', v)}
      placeholder={t('cf.lastName')}
    />,
    <FormField
      key="guardian"
      label={t('cf.guardian')}
      value={form.guardian}
      onChangeText={v => set('guardian', v)}
      placeholder={t('cf.guardian')}
    />,
    <Dropdown
      key="country"
      label={t('ov.country')}
      required
      placeholder={t('ov.select.country')}
      options={COUNTRIES}
      value={form.country}
      onChange={v => pick('country', v)}
      error={err('country')}
      searchable
      searchPlaceholder={t('cf.search')}
      emptyText={t('cf.noResults')}
    />,
    <FormField
      key="passport"
      label={t('ov.passport')}
      value={form.passport}
      onChangeText={v => set('passport', v.toUpperCase())}
      error={err('passport')}
      onBlur={() => touch('passport')}
      autoCapitalize="characters"
      autoCorrect={false}
      maxLength={15}
      placeholder={t('ov.passport.ph')}
    />,
    <FormField
      key="addressAbroad"
      label={t('ov.addressAbroad')}
      value={form.addressAbroad}
      onChangeText={v => set('addressAbroad', v)}
      multiline
      maxLength={500}
      placeholder={t('cf.address.ph')}
    />,
    <FormField
      key="intlMobile"
      label={t('ov.intlMobile')}
      prefix={dialPrefix}
      value={form.intlMobile}
      onChangeText={v => set('intlMobile', digitsOnly(v, 15))}
      error={err('intlMobile')}
      onBlur={() => touch('intlMobile')}
      keyboardType="phone-pad"
      placeholder="000000000"
    />,
    <FormField
      key="intlLandline"
      label={t('ov.intlLandline')}
      prefix={dialPrefix}
      value={form.intlLandline}
      onChangeText={v => set('intlLandline', digitsOnly(v, 15))}
      error={err('intlLandline')}
      onBlur={() => touch('intlLandline')}
      keyboardType="phone-pad"
      placeholder="000000000"
    />,
    <FormField
      key="whatsapp"
      label={t('cf.whatsapp')}
      value={form.whatsapp}
      onChangeText={v => set('whatsapp', digitsOnly(v, 17))}
      error={err('whatsapp')}
      onBlur={() => touch('whatsapp')}
      keyboardType="phone-pad"
      placeholder="0092000000000"
    />,
    <FormField
      key="addressPakistan"
      label={t('ov.addressPakistan')}
      value={form.addressPakistan}
      onChangeText={v => set('addressPakistan', v)}
      multiline
      maxLength={500}
      placeholder={t('cf.address.ph')}
    />,
        <MultiSelect
      key="district"
      label={t('cf.district')}
      required
      placeholder={t('cf.select.district')}
      options={DISTRICTS}
      values={form.district}
      onChange={v => pick('district', v)}
      error={err('district')}
      searchPlaceholder={t('cf.search')}
      emptyText={t('cf.noResults')}
    />,
    <FormField
      key="mobilePk"
      label={t('ov.mobilePk')}
      required
      value={form.mobilePk}
      // digits, plus a leading + so +923000000000 can be typed
      onChangeText={v => set('mobilePk', mobileChars(v))}
      error={err('mobilePk')}
      onBlur={() => touch('mobilePk')}
      keyboardType="phone-pad"
      placeholder="03000000000"
    />,
    <FormField
      key="phonePk"
      label={t('ov.phonePk')}
      value={form.phonePk}
      onChangeText={v => set('phonePk', digitsOnly(v, 13))}
      error={err('phonePk')}
      onBlur={() => touch('phonePk')}
      keyboardType="phone-pad"
      placeholder="0420000000"
    />,
    <FormField
      key="email"
      label={t('cf.email')}
      value={form.email}
      onChangeText={v => set('email', v)}
      error={err('email')}
      onBlur={() => touch('email')}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="abc@gmail.com"
    />,

    // ---- Overseas Complaint Details ----
    <SectionCard key="sec-info" title={t('ov.sec.info')} />,
    <Dropdown
      key="agency"
      label={t('cf.agency')}
      required
      placeholder={t('cf.select.agency')}
      options={AGENCIES}
      value={form.agency}
      onChange={v => pick('agency', v)}
      error={err('agency')}
      searchable
      searchPlaceholder={t('cf.search')}
      emptyText={t('cf.noResults')}
    />,
    <Dropdown
      key="designation"
      label={t('cf.designation')}
      required
      placeholder={t('cf.select.designation')}
      options={DESIGNATIONS}
      value={form.designation}
      onChange={v => pick('designation', v)}
      error={err('designation')}
      searchPlaceholder={t('cf.search')}
      emptyText={t('cf.noResults')}
    />,
    <FormField
      key="subject"
      label={t('cf.subject')}
      required
      value={form.subject}
      onChangeText={v => set('subject', v)}
      error={err('subject')}
      onBlur={() => touch('subject')}
      multiline
      placeholder={t('cf.subject.ph')}
    />,

    // ---- Upload Documents of Overseas Complainant ----
    <SectionCard key="sec-attach" title={t('ov.sec.attach')} />,
    <UploadCard
      key="cnicFront"
      label={t('ov.cnicFront')}
      title={t('cf.upload.title')}
      hint={t('cf.upload.hint')}
      assets={form.cnicFront?.assets}
      onPress={() => choose('cnicFront')}
      onRemove={() => removeFile('cnicFront')}
      onRemoveOne={i => removeOne('cnicFront', form.cnicFront, i)}
    />,
    <UploadCard
      key="cnicBack"
      label={t('ov.cnicBack')}
      title={t('cf.upload.title')}
      hint={t('cf.upload.hint')}
      assets={form.cnicBack?.assets}
      onPress={() => choose('cnicBack')}
      onRemove={() => removeFile('cnicBack')}
      onRemoveOne={i => removeOne('cnicBack', form.cnicBack, i)}
    />,
    <UploadCard
      key="passportDoc"
      label={t('ov.passportAttach')}
      title={t('cf.upload.title')}
      hint={t('cf.upload.hint')}
      assets={form.passportDoc?.assets}
      onPress={() => choose('passportDoc')}
      onRemove={() => removeFile('passportDoc')}
      onRemoveOne={i => removeOne('passportDoc', form.passportDoc, i)}
    />,
    <UploadCard
      key="affidavitAttach"
      label={t('cf.affidavitAttach')}
      title={t('cf.upload.title')}
      hint={t('cf.upload.hint')}
      assets={form.affidavit?.assets}
      onPress={() => choose('affidavit')}
      onRemove={() => removeFile('affidavit')}
      onRemoveOne={i => removeOne('affidavit', form.affidavit, i)}
    />,
    <UploadCard
      key="supporting"
      label={t('cf.supporting')}
      title={t('cf.upload.title')}
      hint={t('cf.upload.hint')}
      multiple
      assets={form.supporting?.assets}
      onPress={() => choose('supporting', {multiple: true, current: form.supporting})}
      onRemove={() => removeFile('supporting')}
      onRemoveOne={i => removeOne('supporting', form.supporting, i)}
    />,

    // ---- Affidavit, declaration, actions ----
    <AffidavitCard key="affidavitCard" />,
    <Declaration
      key="declaration"
      accepted={accepted}
      onToggle={() => setAccepted(a => !a)}
    />,
    <View key="actions" style={styles.actions}>
      <GlassButton
        label={t('cf.create')}
        variant="confirm"
        onPress={create}
        disabled={!accepted}
      />
      <GlassButton label={t('cf.reset')} variant="destructive" onPress={reset} />
    </View>,
  ];

  return (
    <AppBackground>
      {/* ---- Header ---- */}
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={30} color={theme.icon.heading} weight={3} />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          {/* ONE line, shrunk to fit instead of cut with "…" */}
          <Text
            style={[styles.topTitle, isRTL && styles.textRTL]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}>
            {t('ov.title')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={dyn.scrollPad}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Crest + certification badges (the crest comes with the badges),
            then the form cascades down from the top */}
              <CertificationBadges play={ready} startIndex={0} showCrest={false} /> 

        {blocks.map((block, index) => (
          <StaggerIn
            key={block.key}
            index={index}
            play={ready}
            stepMs={FORM_STEP_MS}>
            {block}
          </StaggerIn>
        ))}
      </ScrollView>
    </AppBackground>
  );
};

export default OverseasComplaintFormScreen;