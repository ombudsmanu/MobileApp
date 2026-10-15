import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLayout } from '../../theme/responsive';
import { notify } from '../../utils/notify';
import MultiSelect from './parts/MultiSelect';
import {
  CNIC_PATTERN,
  EMAIL_PATTERN,
  LANDLINE_PK_PATTERN,
  MOBILE_PK_PATTERN,
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
import { useScreenReady } from '../../navigation/useScreenReady';
import SectionCard from './parts/SectionCard';
import FormField from './parts/FormField';
import Dropdown from './parts/Dropdown';
import RadioRow from './parts/RadioRow';
import UploadCard from './parts/UploadCard';
import Declaration from './parts/Declaration';
import AffidavitCard from './parts/AffidavitCard';
import { useAttachments } from './parts/useAttachments';
import { FORM_STEP_MS } from './parts/parts.styles';
import {
  TITLES,
  REGIONAL_OFFICES,
  DISTRICTS,
  AGENCIES,
  DESIGNATIONS,
} from '../../content/complaintForm';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
} from './ComplaintFormScreen.styles';

/** The blank form — also what Reset returns to. */
const EMPTY = {
  // Fixed for this form — it is the Pakistani Nationals' form
  complaintNature: 'pakistani',
  complaintType: 'general',
  status: 'self',
  regionalOffice: [],
  cnic: '',
  title: null,
  firstName: '',
  middleName: '',
  lastName: '',
  guardian: '',
  mobile: '',
  email: '',
  landline: '',
  whatsapp: '',
  address: '',
  district: [],
  agency: null,
  designation: null,
  subject: '',
  // Attachments: each holds the picked asset(s), or null when empty
  cnicFront: null,
  cnicBack: null,
  affidavit: null,
  supporting: null,
};

/**
 * Every field's rules, in the order they appear on the form. One table, so
 * what is required and what shape it must take is readable at a glance and
 * validate() stays three lines. Patterns live in utils/validation.js.
 */
const RULES = {
  regionalOffice: { required: true },
  cnic: { required: true, pattern: CNIC_PATTERN, patternKey: 'cf.err.cnic' },
  firstName: { required: true },
  guardian: { required: true },
  mobile: {
    required: true,
    pattern: MOBILE_PK_PATTERN,
    patternKey: 'cf.err.mobile',
  },
  email: { required: true, pattern: EMAIL_PATTERN, patternKey: 'cf.err.email' },
  landline: { pattern: LANDLINE_PK_PATTERN, patternKey: 'cf.err.landline' },
  whatsapp: {
    required: true,
    pattern: MOBILE_PK_PATTERN,
    patternKey: 'cf.err.mobile',
  },
  address: { required: true },
  district: { required: true },
  agency: { required: true },
  designation: { required: true },
  subject: { required: true },
};

/**
 * COMPLAINT FORM — Pakistani Nationals.
 *
 * One scrolling form in the reference layout: an intro with the crest and
 * an Important Note, then sections (General Details, Complainant Details,
 * Complaint Information, Attachment Section) each introduced by a
 * SectionCard, then the "I solemnly declare" card and the actions.
 *
 * ENTRANCE — every block cascades in from the top, the same StaggerIn
 * cascade as About Us and Annual Reports, and it waits for useScreenReady
 * so it starts once the screen has finished sliding in (and replays when
 * the user comes back). The blocks are listed in ONE array and wrapped as
 * they are rendered, so each takes its position from the list: adding or
 * moving a field keeps the sequence correct with nothing to renumber.
 *
 * Errors are kept as string keys and translated as they are shown (err()),
 * so they follow the language switch. Number fields show zero-pattern
 * placeholders (03000000000) rather than a real-looking number, and the
 * mobile fields accept +92 as well as 03.
 *
 * No helper lines between the labels and the boxes: each number field's
 * placeholder shows the format (03000000000), and if the entry is wrong the
 * error message under the box spells the format out.
 *
 * Attachments are picked from the gallery (useAttachments): one photo
 * each for CNIC front/back and the affidavit, several for supporting
 * documents. Nothing is saved as a draft: leaving the form clears it. The
 * dropdown lists are hard-coded (content/complaintForm.js) and Create
 * Complaint validates against RULES without yet calling an API.
 */
const ComplaintFormScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const { width } = useLayout();
  const dyn = useMemo(
    () => createDynamicStyles(insets, width),
    [insets, width],
  );
  const { t, isRTL } = useLanguage();
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

  // ---- Validation -------------------------------------------------------
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
      return; // the button is disabled, but guard anyway
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
        <Text style={[styles.noteTitle, isRTL && styles.textRTL]}>
          {t('cf.note.title')}
        </Text>
      </View>
      <Text style={[styles.noteText, isRTL && styles.textRTL]}>
        {t('cf.note.body')}
      </Text>
    </GlassSurface>,

    // ---- General Details ----
    <SectionCard key="sec-general" title={t('cf.sec.general')} />,
    // Which kind of complaint this is — one option, chosen by the form
    // itself (this is the Pakistani Nationals' form), shown so the user
    // can see it, as on the Office's website
    <RadioRow
      key="complaintNature"
      label={t('cf.complaintNature')}
      required
      options={[{ value: 'pakistani', en: 'Pakistani National', ur: 'پاکستانی شہری' }]}
      value={form.complaintNature}
      onChange={v => set('complaintNature', v)}
    />,
    <RadioRow
      key="complaintType"
      label={t('cf.complaintType')}
      required
      options={[
        { value: 'general', en: 'General', ur: 'عام' },
        { value: 'child', en: 'Child', ur: 'بچہ' },
      ]}
      value={form.complaintType}
      onChange={v => set('complaintType', v)}
    />,
    <RadioRow
      key="status"
      label={t('cf.status')}
      required
      options={[
        { value: 'self', en: 'Self', ur: 'ازخود' },
        { value: 'representative', en: 'Representative', ur: 'نمائندہ' },
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

    // ---- Complainant Details ----
    <SectionCard key="sec-complainant" title={t('cf.sec.complainant')} />,
    <FormField
      key="cnic"
      label={t('cf.cnic')}
      required
      value={form.cnic}
      // The dashes are typed in for the user, so the value always
      // reaches CNIC_PATTERN in NADRA's printed shape
      onChangeText={v => set('cnic', formatCnic(v))}
      error={err('cnic')}
      onBlur={() => touch('cnic')}
      keyboardType="number-pad"
      maxLength={15}
      placeholder={t('cf.cnic.ph')}
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
      required
      value={form.guardian}
      onChangeText={v => set('guardian', v)}
      error={err('guardian')}
      onBlur={() => touch('guardian')}
      placeholder={t('cf.guardian')}
    />,
    <FormField
      key="mobile"
      label={t('cf.mobile')}
      required
      value={form.mobile}
      // digits, plus a leading + so +923000000000 can be typed
      onChangeText={v => set('mobile', mobileChars(v))}
      error={err('mobile')}
      onBlur={() => touch('mobile')}
      keyboardType="phone-pad"
      placeholder="03000000000"
    />,
    <FormField
      key="email"
      label={t('cf.email')}
      required
      value={form.email}
      onChangeText={v => set('email', v)}
      error={err('email')}
      onBlur={() => touch('email')}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="abc@gmail.com"
    />,
    <FormField
      key="landline"
      label={t('cf.landline')}
      value={form.landline}
      onChangeText={v => set('landline', digitsOnly(v, 13))}
      error={err('landline')}
      onBlur={() => touch('landline')}
      keyboardType="phone-pad"
      placeholder="0420000000"
    />,
    <FormField
      key="whatsapp"
      label={t('cf.whatsapp')}
      required
      value={form.whatsapp}
      onChangeText={v => set('whatsapp', mobileChars(v))}
      error={err('whatsapp')}
      onBlur={() => touch('whatsapp')}
      keyboardType="phone-pad"
      placeholder="03000000000"
    />,
    <FormField
      key="address"
      label={t('cf.address')}
      required
      value={form.address}
      onChangeText={v => set('address', v)}
      error={err('address')}
      onBlur={() => touch('address')}
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

    // ---- Complaint Information ----
    <SectionCard key="sec-info" title={t('cf.sec.info')} />,
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

    // ---- Attachment Section ----
    <SectionCard key="sec-attach" title={t('cf.sec.attach')} />,
    <UploadCard
      key="cnicFront"
      label={t('cf.cnicFront')}
      title={t('cf.upload.title')}
      hint={t('cf.upload.hint')}
      assets={form.cnicFront?.assets}
      onPress={() => choose('cnicFront')}
      onRemove={() => removeFile('cnicFront')}
      onRemoveOne={i => removeOne('cnicFront', form.cnicFront, i)}
    />,
    <UploadCard
      key="cnicBack"
      label={t('cf.cnicBack')}
      title={t('cf.upload.title')}
      hint={t('cf.upload.hint')}
      assets={form.cnicBack?.assets}
      onPress={() => choose('cnicBack')}
      onRemove={() => removeFile('cnicBack')}
      onRemoveOne={i => removeOne('cnicBack', form.cnicBack, i)}
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
      <GlassButton
        label={t('cf.reset')}
        variant="destructive"
        onPress={reset}
      />
    </View>,
  ];

  return (
    <AppBackground>
      {/* ---- Header ---- */}
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
          {/* ONE line, shrunk to fit instead of cut with "…" */}
          <Text
            style={[styles.topTitle, isRTL && styles.textRTL]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {t('cf.title')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={dyn.scrollPad}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Crest + certification badges (the crest comes with the badges),
            then the form cascades down from the top */}
        <CertificationBadges play={ready} startIndex={0} showCrest={false} />
        {blocks.map((block, index) => (
          <StaggerIn
            key={block.key}
            index={index}
            play={ready}
            stepMs={FORM_STEP_MS}
          >
            {block}
          </StaggerIn>
        ))}
      </ScrollView>
    </AppBackground>
  );
};

export default ComplaintFormScreen;