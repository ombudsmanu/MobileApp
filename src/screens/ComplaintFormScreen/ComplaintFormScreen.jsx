import React, {useCallback, useMemo, useState} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {useLayout} from '../../theme/responsive';
import {notify} from '../../utils/notify';
import {
  CNIC_PATTERN,
  EMAIL_PATTERN,
  LANDLINE_PK_PATTERN,
  MOBILE_PK_PATTERN,
  check,
  digitsOnly,
  formatCnic,
} from '../../utils/validation';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import {useScreenReady} from '../../navigation/useScreenReady';
import SectionCard from './parts/SectionCard';
import FormField from './parts/FormField';
import Dropdown from './parts/Dropdown';
import RadioRow from './parts/RadioRow';
import UploadCard from './parts/UploadCard';
import Declaration from './parts/Declaration';
import AffidavitCard from './parts/AffidavitCard';
import {useAttachments} from './parts/useAttachments';
import {
  TITLES,
  REGIONAL_OFFICES,
  DISTRICTS,
  AGENCIES,
  DESIGNATIONS,
} from '../../content/complaintForm';
import {createStyles, createDynamicStyles, BACK_RADIUS} from './ComplaintFormScreen.styles';

const CREST = require('../../assets/images/crest.png');

/** The blank form — also what Reset returns to. */
const EMPTY = {
  complaintType: 'general',
  status: 'self',
  regionalOffice: null,
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
  district: null,
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
  regionalOffice: {required: true},
  cnic: {required: true, pattern: CNIC_PATTERN, patternKey: 'cf.err.cnic'},
  firstName: {required: true},
  guardian: {required: true},
  mobile: {required: true, pattern: MOBILE_PK_PATTERN, patternKey: 'cf.err.mobile'},
  email: {required: true, pattern: EMAIL_PATTERN, patternKey: 'cf.err.email'},
  landline: {pattern: LANDLINE_PK_PATTERN, patternKey: 'cf.err.landline'},
  whatsapp: {required: true, pattern: MOBILE_PK_PATTERN, patternKey: 'cf.err.mobile'},
  address: {required: true},
  district: {required: true},
  agency: {required: true},
  designation: {required: true},
  subject: {required: true},
};

/**
 * COMPLAINT FORM — Pakistani Nationals.
 *
 * One scrolling form in the reference layout: an intro with the crest and
 * an Important Note, then sections (General Details, Complainant Details,
 * Complaint Information, Attachment Section) each introduced by a
 * SectionCard, then the "I solemnly declare" card and the actions.
 *
 * Attachments use the phone's camera or gallery (useAttachments). The
 * dropdown lists are hard-coded (content/complaintForm.js) and Create
 * Complaint validates against RULES without yet calling an API.
 */
const ComplaintFormScreen = ({navigation}) => {
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
    setErrors(prev => (prev[key] ? {...prev, [key]: undefined} : prev));
  }, []);

  const {choose, removeFile} = useAttachments(set);

  // ---- Validation -------------------------------------------------------
  const validate = () => {
    const next = {};
    Object.keys(RULES).forEach(key => {
      const errorKey = check(form[key], RULES[key]);
      if (errorKey) {
        next[key] = t(errorKey);
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
          <Text style={[styles.topTitle, isRTL && styles.textRTL]} numberOfLines={1}>
            {t('cf.title')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={dyn.scrollPad}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* ---- Intro ---- */}
        <View style={styles.crestWrap}>
          <Image source={CREST} style={styles.crest} />
        </View>
        <CertificationBadges play={ready} startIndex={0} />
        <Text style={styles.cmisLine}>{t('cf.cmis')}</Text>

        <GlassSurface style={styles.noteCard}>
          <View style={[styles.noteHeadRow, isRTL && styles.rowRTL]}>
            <View style={styles.noteBar} />
            <Text style={[styles.noteTitle, isRTL && styles.textRTL]}>{t('cf.note.title')}</Text>
          </View>
          <Text style={[styles.noteText, isRTL && styles.textRTL]}>{t('cf.note.body')}</Text>
        </GlassSurface>

        {/* ---- General Details ---- */}
        <SectionCard title={t('cf.sec.general')} />
        <RadioRow
          label={t('cf.complaintType')}
          required
          options={[
            {value: 'general', en: 'General', ur: 'عام'},
            {value: 'child', en: 'Child', ur: 'بچہ'},
          ]}
          value={form.complaintType}
          onChange={v => set('complaintType', v)}
        />
        <RadioRow
          label={t('cf.status')}
          required
          options={[
            {value: 'self', en: 'Self', ur: 'ازخود'},
            {value: 'representative', en: 'Representative', ur: 'نمائندہ'},
          ]}
          value={form.status}
          onChange={v => set('status', v)}
        />
        <Dropdown
          label={t('cf.regionalOffice')}
          required
          helper={t('cf.regionalOffice.help')}
          placeholder={t('cf.select.regionalOffice')}
          options={REGIONAL_OFFICES}
          value={form.regionalOffice}
          onChange={v => set('regionalOffice', v)}
          error={errors.regionalOffice}
          searchPlaceholder={t('cf.search')}
          emptyText={t('cf.noResults')}
        />

        {/* ---- Complainant Details ---- */}
        <SectionCard title={t('cf.sec.complainant')} />
        <FormField
          label={t('cf.cnic')}
          required
          helper={t('cf.cnic.help')}
          value={form.cnic}
          // The dashes are typed in for the user, so the value always
          // reaches CNIC_PATTERN in NADRA's printed shape
          onChangeText={v => set('cnic', formatCnic(v))}
          error={errors.cnic}
          keyboardType="number-pad"
          maxLength={15}
          placeholder={t('cf.cnic.ph')}
        />
        <Dropdown
          label={t('cf.titleField')}
          placeholder={t('cf.select.title')}
          options={TITLES}
          value={form.title}
          onChange={v => set('title', v)}
          searchable={false}
        />
        <FormField
          label={t('cf.firstName')}
          required
          value={form.firstName}
          onChangeText={v => set('firstName', v)}
          error={errors.firstName}
          placeholder={t('cf.firstName')}
        />
        <FormField
          label={t('cf.middleName')}
          value={form.middleName}
          onChangeText={v => set('middleName', v)}
          placeholder={t('cf.middleName')}
        />
        <FormField
          label={t('cf.lastName')}
          value={form.lastName}
          onChangeText={v => set('lastName', v)}
          placeholder={t('cf.lastName')}
        />
        <FormField
          label={t('cf.guardian')}
          required
          value={form.guardian}
          onChangeText={v => set('guardian', v)}
          error={errors.guardian}
          placeholder={t('cf.guardian')}
        />
        <FormField
          label={t('cf.mobile')}
          required
          helper={t('cf.mobile.help')}
          value={form.mobile}
          onChangeText={v => set('mobile', digitsOnly(v, 11))}
          error={errors.mobile}
          keyboardType="phone-pad"
          placeholder="03001234567"
        />
        <FormField
          label={t('cf.email')}
          required
          value={form.email}
          onChangeText={v => set('email', v)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="abc@gmail.com"
        />
        <FormField
          label={t('cf.landline')}
          helper={t('cf.landline.help')}
          value={form.landline}
          onChangeText={v => set('landline', digitsOnly(v, 13))}
          error={errors.landline}
          keyboardType="phone-pad"
          placeholder="0424637289900"
        />
        <FormField
          label={t('cf.whatsapp')}
          required
          helper={t('cf.whatsapp.help')}
          value={form.whatsapp}
          onChangeText={v => set('whatsapp', digitsOnly(v, 11))}
          error={errors.whatsapp}
          keyboardType="phone-pad"
          placeholder="03001234567"
        />
        <FormField
          label={t('cf.address')}
          required
          value={form.address}
          onChangeText={v => set('address', v)}
          error={errors.address}
          multiline
          maxLength={500}
          placeholder={t('cf.address.ph')}
        />
        <Dropdown
          label={t('cf.district')}
          required
          placeholder={t('cf.select.district')}
          options={DISTRICTS}
          value={form.district}
          onChange={v => set('district', v)}
          error={errors.district}
          searchPlaceholder={t('cf.search')}
          emptyText={t('cf.noResults')}
        />

        {/* ---- Complaint Information ---- */}
        <SectionCard title={t('cf.sec.info')} />
        <Dropdown
          label={t('cf.agency')}
          required
          helper={t('cf.agency.help')}
          placeholder={t('cf.select.agency')}
          options={AGENCIES}
          value={form.agency}
          onChange={v => set('agency', v)}
          error={errors.agency}
          searchable
          searchPlaceholder={t('cf.search')}
          emptyText={t('cf.noResults')}
        />
        <Dropdown
          label={t('cf.designation')}
          required
          helper={t('cf.designation.help')}
          placeholder={t('cf.select.designation')}
          options={DESIGNATIONS}
          value={form.designation}
          onChange={v => set('designation', v)}
          error={errors.designation}
          searchPlaceholder={t('cf.search')}
          emptyText={t('cf.noResults')}
        />
        <FormField
          label={t('cf.subject')}
          required
          helper={t('cf.subject.help')}
          value={form.subject}
          onChangeText={v => set('subject', v)}
          error={errors.subject}
          multiline
          placeholder={t('cf.subject.ph')}
        />

        {/* ---- Attachment Section ---- */}
        <SectionCard title={t('cf.sec.attach')} />
        <UploadCard
          label={t('cf.cnicFront')}
          title={t('cf.upload.title')}
          hint={t('cf.upload.hint')}
          fileName={form.cnicFront?.display}
          onPress={() => choose('cnicFront')}
          onRemove={() => removeFile('cnicFront')}
        />
        <UploadCard
          label={t('cf.cnicBack')}
          title={t('cf.upload.title')}
          hint={t('cf.upload.hint')}
          fileName={form.cnicBack?.display}
          onPress={() => choose('cnicBack')}
          onRemove={() => removeFile('cnicBack')}
        />
        <UploadCard
          label={t('cf.affidavitAttach')}
          title={t('cf.upload.title')}
          hint={t('cf.upload.hint')}
          fileName={form.affidavit?.display}
          onPress={() => choose('affidavit')}
          onRemove={() => removeFile('affidavit')}
        />
        <UploadCard
          label={t('cf.supporting')}
          title={t('cf.upload.title')}
          hint={t('cf.upload.hint')}
          fileName={form.supporting?.display}
          onPress={() => choose('supporting', true)}
          onRemove={() => removeFile('supporting')}
        />

        {/* ---- Affidavit: view or download ---- */}
        <AffidavitCard />

        {/* ---- Declaration ---- */}
        <Declaration accepted={accepted} onToggle={() => setAccepted(a => !a)} />

        {/* ---- Actions ---- */}
        <View style={styles.actions}>
          <GlassButton
            label={t('cf.create')}
            variant="confirm"
            onPress={create}
            disabled={!accepted}
            icon={<Icon name="check" size={18} color="#FFFFFF" weight={2.5} />}
          />
          <GlassButton label={t('cf.reset')} variant="destructive" onPress={reset} />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default ComplaintFormScreen;