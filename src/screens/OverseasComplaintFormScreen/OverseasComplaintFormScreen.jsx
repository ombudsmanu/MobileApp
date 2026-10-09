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
  INTL_PHONE_PATTERN,
  LANDLINE_PK_PATTERN,
  MOBILE_PK_PATTERN,
  PASSPORT_PATTERN,
  WHATSAPP_PATTERN,
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

const CREST = require('../../assets/images/crest.png');

/** The blank form — also what Reset returns to. */
const EMPTY = {
  complaintType: 'general',
  status: 'self',
  regionalOffice: null,
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
  district: null,
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
 * The same design and flow as the Pakistani Nationals form, with the
 * Overseas fields: CNIC/NICOP, Country, Passport, the address and phone
 * numbers abroad AND in Pakistan, and a Passport attachment.
 *
 * UI only for now: the lists are hard-coded (content/complaintForm.js) and
 * Create Complaint validates against RULES without yet calling an API.
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
    setErrors(prev => (prev[key] ? {...prev, [key]: undefined} : prev));
  }, []);

  const {choose, removeFile} = useAttachments(set);

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
            {t('ov.title')}
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
          <Text style={[styles.noteText, isRTL && styles.textRTL]}>{t('ov.note.body')}</Text>
        </GlassSurface>

        {/* ---- Overseas General Details ---- */}
        <SectionCard title={t('ov.sec.general')} />
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

        {/* ---- Overseas Complainant Details ---- */}
        <SectionCard title={t('ov.sec.complainant')} />
        <FormField
          label={t('ov.cnic')}
          required
          helper={t('cf.cnic.help')}
          value={form.cnic}
          onChangeText={v => set('cnic', formatCnic(v))}
          error={errors.cnic}
          keyboardType="number-pad"
          maxLength={15}
          placeholder={t('ov.cnic.ph')}
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
          value={form.guardian}
          onChangeText={v => set('guardian', v)}
          placeholder={t('cf.guardian')}
        />
        <Dropdown
          label={t('ov.country')}
          required
          placeholder={t('ov.select.country')}
          options={COUNTRIES}
          value={form.country}
          onChange={v => set('country', v)}
          error={errors.country}
          searchable
          searchPlaceholder={t('cf.search')}
          emptyText={t('cf.noResults')}
        />
        <FormField
          label={t('ov.passport')}
          value={form.passport}
          onChangeText={v => set('passport', v.toUpperCase())}
          error={errors.passport}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={15}
          placeholder={t('ov.passport.ph')}
        />
        <FormField
          label={t('ov.addressAbroad')}
          value={form.addressAbroad}
          onChangeText={v => set('addressAbroad', v)}
          multiline
          maxLength={500}
          placeholder={t('cf.address.ph')}
        />
        <FormField
          label={t('ov.intlMobile')}
          helper={t('ov.intl.help')}
          value={form.intlMobile}
          onChangeText={v => set('intlMobile', digitsOnly(v, 15))}
          error={errors.intlMobile}
          keyboardType="phone-pad"
          placeholder="966512345678"
        />
        <FormField
          label={t('ov.intlLandline')}
          helper={t('ov.intl.help')}
          value={form.intlLandline}
          onChangeText={v => set('intlLandline', digitsOnly(v, 15))}
          error={errors.intlLandline}
          keyboardType="phone-pad"
          placeholder="966112345678"
        />
        <FormField
          label={t('cf.whatsapp')}
          helper={t('ov.whatsapp.help')}
          value={form.whatsapp}
          onChangeText={v => set('whatsapp', digitsOnly(v, 17))}
          error={errors.whatsapp}
          keyboardType="phone-pad"
          placeholder="00928100037"
        />
        <FormField
          label={t('ov.addressPakistan')}
          value={form.addressPakistan}
          onChangeText={v => set('addressPakistan', v)}
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
        <FormField
          label={t('ov.mobilePk')}
          required
          helper={t('cf.mobile.help')}
          value={form.mobilePk}
          onChangeText={v => set('mobilePk', digitsOnly(v, 11))}
          error={errors.mobilePk}
          keyboardType="phone-pad"
          placeholder="03338100037"
        />
        <FormField
          label={t('ov.phonePk')}
          helper={t('cf.landline.help')}
          value={form.phonePk}
          onChangeText={v => set('phonePk', digitsOnly(v, 13))}
          error={errors.phonePk}
          keyboardType="phone-pad"
          placeholder="04299200037"
        />
        <FormField
          label={t('cf.email')}
          value={form.email}
          onChangeText={v => set('email', v)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="abc@gmail.com"
        />

        {/* ---- Overseas Complaint Details ---- */}
        <SectionCard title={t('ov.sec.info')} />
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

        {/* ---- Upload Documents of Overseas Complainant ---- */}
        <SectionCard title={t('ov.sec.attach')} />
        <UploadCard
          label={t('ov.cnicFront')}
          title={t('cf.upload.title')}
          hint={t('cf.upload.hint')}
          fileName={form.cnicFront?.display}
          onPress={() => choose('cnicFront')}
          onRemove={() => removeFile('cnicFront')}
        />
        <UploadCard
          label={t('ov.cnicBack')}
          title={t('cf.upload.title')}
          hint={t('cf.upload.hint')}
          fileName={form.cnicBack?.display}
          onPress={() => choose('cnicBack')}
          onRemove={() => removeFile('cnicBack')}
        />
        <UploadCard
          label={t('ov.passportAttach')}
          title={t('cf.upload.title')}
          hint={t('cf.upload.hint')}
          fileName={form.passportDoc?.display}
          onPress={() => choose('passportDoc')}
          onRemove={() => removeFile('passportDoc')}
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

export default OverseasComplaintFormScreen;