import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../../theme/tokens';

/**
 * Styles for the complaint-form parts (SectionCard, FormField, Dropdown,
 * RadioRow, UploadCard, Declaration). One file so the form's look lives in
 * a single place and every part stays consistent.
 *
 * TYPOGRAPHY (MD3)
 *   Title Medium — section-card titles, upload titles
 *   Body Medium  — input text, radio and option labels
 *   Label Medium — field labels
 *   Body Small   — helper lines, errors, upload hints
 * Urdu inside a field box (text box, dropdown value, chip) uses the
 * Nastaleeq label font through urduFieldText, so it matches the labels.
 */

const STAR_RED = '#D4541C';

/**
 * Gap between one block's entrance and the next on the complaint forms.
 * Shorter than StaggerIn's 250ms default for cards: a form is 30 small
 * blocks, so the default would take three seconds to settle. At 90ms the
 * cascade still reads top-to-bottom but finishes in about a second.
 */
export const FORM_STEP_MS = 90;

// Two-tone progress bar on the section cards
export const SECTION_GREEN = '#3E8E5A';
export const SECTION_ORANGE = '#E8913A';

// Green gradient for the upload badge (matches the Dashboard "green" module)
export const UPLOAD_GRADIENT = ['#43A35A', '#1F6B33'];

export const PICKER_RADIUS = radii.lg;

/**
 * Outer height of every one-line field box — text boxes AND dropdowns — so
 * the two kinds line up exactly down the form.
 */
export const FIELD_HEIGHT = 50;

/**
 * ATTACHED-FILE LIST — one row per picked file under an upload card.
 * Three rows fit before the list starts scrolling inside its own height.
 */
export const FILE_THUMB = 52;
export const FILE_ROW_HEIGHT = FILE_THUMB + 12;
export const FILE_ROW_GAP = 8;
export const FILE_LIST_VISIBLE_ROWS = 3;
export const FILE_LIST_MAX_HEIGHT =
  FILE_ROW_HEIGHT * FILE_LIST_VISIBLE_ROWS + FILE_ROW_GAP * (FILE_LIST_VISIBLE_ROWS - 1);

/**
 * MULTI-LINE FIELDS (Subject, the addresses) open FOUR lines tall, so the
 * user can see a paragraph as they write it instead of one scrolling line.
 * Each line of the 16px input font is about 22 high, plus top and bottom
 * padding. They still grow if the text runs longer.
 */
export const MULTILINE_LINES = 4;
export const MULTILINE_HEIGHT = MULTILINE_LINES * 22 + 24;

/**
 * FILE PREVIEW — tapping an attached file opens it large in a dark viewer.
 * The picture keeps its real shape and is fitted inside this share of the
 * screen, leaving room below for its name and size.
 */
export const FILE_PREVIEW = {sideGap: 24, maxHeightShare: 0.66};

/**
 * URDU IN A FIELD BOX — the same Nastaleeq face as the labels above it, so
 * an Urdu placeholder or Urdu typing no longer looks like a different font
 * from its label. No lineHeight: inside a typing box Android sizes the line
 * from the font itself, which is what keeps Nastaleeq's tall strokes and
 * low tails inside the box (a fixed lineHeight is what used to cut them).
 * The vertical padding is trimmed instead, so the taller line still fits
 * the standard FIELD_HEIGHT.
 */
const urduFieldText = theme => ({
  ...(theme.urduFont ? {fontFamily: theme.urduFont} : null),
  fontSize: 15,
  letterSpacing: 0,
  fontWeight: 'normal',
  writingDirection: 'rtl',
});

/** Text inside a field box: the chosen Latin font (see GlassField). */
const fieldText = theme => theme.inputType ?? typography.input;

// ---- Shared label + helper + error (used by field, dropdown, radio, upload) ----
const labelBlock = theme => ({
  label: {...theme.type.labelMedium, marginBottom: 6},
  star: {color: STAR_RED},
  helper: {...theme.type.bodySmall, color: theme.text.muted, marginBottom: spacing.xs},
  error: {...theme.type.bodySmall, color: theme.danger, marginTop: 6},
  rtl: {textAlign: 'right', writingDirection: 'rtl'},
  rowRTL: {flexDirection: 'row-reverse'},
});

// ---- Section card ----
export const createSectionStyles = theme =>
  StyleSheet.create({
    card: {paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginTop: spacing.lg},
    content: {alignItems: 'center'},
    // The leading disc. It is absolutely placed, so top:'50%' with a
    // half-height negative margin pins its CENTRE to the card's vertical
    // middle — it lines up with the title however many lines the title
    // runs to, instead of being stuck to the top edge.
    dotOuter: {
      position: 'absolute',
      top: '50%',
      marginTop: -17,
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    // The dot sits on the leading side: left in English, right in Urdu
    dotStart: {left: 0},
    dotEnd: {right: 0},
    // A solid filled disc, centred in its ring — a section marker, not a
    // radio button. 14 dp on a 34 dp ring leaves an even 9 dp gap all round.
    dotInner: {width: 14, height: 14, borderRadius: 7, backgroundColor: SECTION_ORANGE},
    // Side padding clears the leading disc (34 dp wide) so a long,
    // centred title never runs under or touches it on either side.
    title: {
      ...theme.type.titleMedium,
      color: theme.text.title,
      textAlign: 'center',
      paddingHorizontal: 42,
    },
    progressTrack: {
      flexDirection: 'row',
      width: 96,
      height: 4,
      borderRadius: 2,
      overflow: 'hidden',
      marginTop: spacing.sm,
    },
    progressGreen: {flex: 1, backgroundColor: SECTION_GREEN},
    progressOrange: {flex: 1, backgroundColor: SECTION_ORANGE},
  });

// ---- Text field ----
export const createFieldStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    ...labelBlock(theme),
    // The text box itself. minHeight is the box's height minus its 1px
    // border top and bottom, so it matches the dropdowns exactly.
    input: {minHeight: FIELD_HEIGHT - 2, textAlignVertical: 'center'},
    // Subject and the addresses: four lines tall, text starting at the top
    inputMultiline: {
      minHeight: MULTILINE_HEIGHT,
      textAlignVertical: 'top',
      paddingTop: 12,
      paddingBottom: 12,
    },
    // Whenever the box shows Urdu (an Urdu placeholder, or Urdu typed in):
    // the Nastaleeq label font, with the padding trimmed so it still fits
    inputUrdu: {...urduFieldText(theme), paddingVertical: 4},
    // Set explicitly in BOTH languages. Left to itself Android aligns by
    // the content — an Urdu placeholder went right but a phone number or
    // email went left, so fields started on different sides in Urdu.
    inputRTL: {textAlign: 'right'},
    inputLTR: {textAlign: 'left'},

    // ---- Dialling-code prefix (International Mobile / Landline) ----
    // A fixed grey box in front of the number, like the Office website's
    // "00213": the same height and corners as the field, but read-only.
    // Always on the LEFT, in Urdu too — a phone number is read left to
    // right in every language, so "00966 512345678" must not be mirrored.
    prefixRow: {flexDirection: 'row', columnGap: spacing.sm},
    prefixBox: {
      minWidth: 76,
      minHeight: FIELD_HEIGHT,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
      alignItems: 'center',
      justifyContent: 'center',
    },
    prefixText: {...fieldText(theme), color: theme.text.muted},
    // The text box takes the rest of the row
    prefixedField: {flex: 1},
  });

// ---- Dropdown ----
export const createDropdownStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    ...labelBlock(theme),

    field: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: spacing.sm,
      minHeight: FIELD_HEIGHT,
      paddingHorizontal: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fill,
    },
    fieldError: {borderColor: theme.danger},
    fieldPressed: {opacity: 0.85, backgroundColor: theme.glass.fillStrong},
    // Same font and size as the text in a text box, so a dropdown and a
    // text field look alike. Urdu gets valueUrdu below — the Nastaleeq
    // label font, the same as the text boxes now use for Urdu
    value: {...fieldText(theme), color: theme.control.input, flex: 1},
    // An Urdu value or placeholder: the Nastaleeq label font, like the text
    // boxes. The padding is drawing room for the tall strokes — Android
    // lets text draw into its own padding, never past it.
    valueUrdu: {...urduFieldText(theme), paddingVertical: 4},
    valueLTR: {textAlign: 'left'},
    placeholder: {color: theme.control.placeholder},

    // ---- Picker modal ----
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(8, 16, 12, 0.55)',
      paddingHorizontal: spacing.lg,
      justifyContent: 'center',
    },
    sheet: {flex: 1},
    sheetCard: {flex: 1, padding: spacing.md},
    sheetContent: {flex: 1},
    sheetHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    sheetTitle: {...theme.type.titleMedium, color: theme.text.title, flex: 1},
    closeBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fill,
      marginBottom: spacing.sm,
    },
    searchInput: {...fieldText(theme), color: theme.control.input, flex: 1, paddingVertical: 8},
    list: {flex: 1},
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: spacing.sm,
      paddingVertical: 14,
      paddingHorizontal: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.glass.rim,
    },
    optionActive: {backgroundColor: 'rgba(232, 145, 58, 0.10)', borderRadius: radii.sm},
    optionPressed: {backgroundColor: theme.glass.fillStrong, borderRadius: radii.sm},
    optionText: {...theme.type.bodyMedium, color: theme.text.body, flex: 1},
    optionTextActive: {color: theme.accent},
    empty: {...theme.type.bodyMedium, color: theme.text.muted, textAlign: 'center', paddingVertical: spacing.xl},
  });

// ---- Radio group ----
export const createRadioStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    ...labelBlock(theme),
    card: {paddingVertical: 4, paddingHorizontal: spacing.md},
    cardContent: {},
    option: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.sm, paddingVertical: 12},
    optionDivider: {borderTopWidth: 1, borderTopColor: theme.glass.rim},
    ring: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: theme.control.label,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ringActive: {borderColor: theme.accent},
    dot: {width: 10, height: 10, borderRadius: 5, backgroundColor: theme.accent},
    optionText: {...theme.type.bodyMedium, color: theme.text.body, flex: 1},
  });

// ---- Upload card ----
export const createUploadStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    ...labelBlock(theme),
    pressed: {opacity: 0.9, transform: [{scale: 0.995}]},
    card: {padding: spacing.md},
    // A green border once a file is attached, so a filled card is obvious
    cardPicked: {borderColor: SECTION_GREEN},
    row: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.md},
    badge: {
      width: 56,
      height: 56,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textBlock: {flex: 1, alignItems: 'flex-start'},
    textBlockRTL: {alignItems: 'flex-end'},
    title: {...theme.type.titleMedium, color: theme.text.title},
    hint: {...theme.type.bodySmall, color: theme.text.muted, marginTop: 2},
    hintPicked: {color: theme.accent},
    plus: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(232, 145, 58, 0.12)',
    },
    // Shown once a file is attached: the trash can that clears the slot
    remove: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(192, 57, 43, 0.12)',
    },
    // ---- Attached files: a vertical list under the card ----
    // Up to three rows show at once; with more, the list scrolls inside a
    // fixed height (FILE_LIST_MAX_HEIGHT) instead of growing the form.
    fileList: {marginTop: spacing.sm},
    fileListScroll: {maxHeight: FILE_LIST_MAX_HEIGHT},
    fileListContent: {rowGap: FILE_ROW_GAP},
    fileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      height: FILE_ROW_HEIGHT,
      paddingVertical: 6,
      paddingLeft: 6,
      paddingRight: 10, // the trash button is the last item in the row
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fill,
    },
    // Urdu: thumbnail on the right, the trash button on the left
    fileRowRTL: {
      flexDirection: 'row-reverse',
      paddingRight: 6,
      paddingLeft: 10,
    },
    // A file row is tappable (opens the preview)
    filePressed: {opacity: 0.85, backgroundColor: theme.glass.fillStrong},
    fileThumb: {
      width: FILE_THUMB,
      height: FILE_THUMB,
      borderRadius: radii.sm,
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    fileInfo: {flex: 1},
    fileName: {...theme.type.bodyMedium, color: theme.text.body},
    fileMeta: {...theme.type.bodySmall, color: theme.text.muted, marginTop: 2},
    fileTextLTR: {textAlign: 'left'},
    fileTextRTL: {textAlign: 'right'},
    // The red trash-can button that deletes ONE file (after a confirm).
    // An ordinary item at the end of the row — not pinned to a corner — so
    // the row's alignItems:'center' centres it level with the thumbnail and
    // the file name, and row-reverse moves it to the left in Urdu.
    fileClose: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#D64545',
    },
  });

// ---- Affidavit card (view / download) ----
export const createAffidavitStyles = theme =>
  StyleSheet.create({
    wrap: {marginTop: spacing.md},
    card: {padding: spacing.md},
    rtl: {textAlign: 'right', writingDirection: 'rtl'},
    rowRTL: {flexDirection: 'row-reverse'},
    head: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.sm},
    title: {...theme.type.titleMedium, color: theme.text.title, flex: 1},
    desc: {...theme.type.bodySmall, color: theme.text.muted, marginTop: 4},
    actions: {flexDirection: 'row', columnGap: spacing.sm, marginTop: spacing.md},
    btn: {flex: 1},
  });

// ---- Declaration ----
export const createDeclarationStyles = theme =>
  StyleSheet.create({
    card: {padding: spacing.md, marginTop: spacing.lg},
    rtl: {textAlign: 'right', writingDirection: 'rtl'},
    rowRTL: {flexDirection: 'row-reverse'},

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      paddingBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.glass.rim,
    },
    title: {...theme.type.titleMedium, color: theme.text.title, flex: 1},

    // The on/off switch (a plain pressable pill, no native Switch needed)
    switchTrack: {
      width: 52,
      height: 30,
      borderRadius: 15,
      padding: 3,
      backgroundColor: theme.glass.border,
      justifyContent: 'center',
    },
    switchTrackOn: {backgroundColor: SECTION_GREEN},
    switchThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      alignSelf: 'flex-start',
    },
    switchThumbOn: {alignSelf: 'flex-end'},
    // Urdu mirrors the switch: off on the right, on slides to the left
    switchThumbRTL: {alignSelf: 'flex-end'},
    switchThumbOnRTL: {alignSelf: 'flex-start'},

    point: {flexDirection: 'row', columnGap: spacing.sm, marginTop: spacing.md},
    bullet: {
      width: 26,
      height: 26,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    // A B C… in English, 1 2 3… in Urdu — both in the normal font
    bulletText: {...theme.type.labelMedium, color: theme.text.title, textTransform: 'uppercase'},
    pointText: {...theme.type.bodyMedium, color: theme.text.body, flex: 1, lineHeight: 22},
    
  });

/**
 * MULTI SELECT — the picker chrome is Dropdown's (createDropdownStyles); this
 * only adds the extras MultiSelect needs: the taller chip field, the chips
 * themselves, the Done button and the option-row checkbox.
 */
export const createMultiSelectStyles = theme =>
  StyleSheet.create({
    // The closed field grows to fit wrapped chips instead of one line
    field: {
      minHeight: FIELD_HEIGHT,
      height: undefined,
      alignItems: 'center',
      paddingVertical: 7,
    },
    // Chips flow and wrap; takes the width, leaving room for the chevron
    chipArea: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      rowGap: 6,
      columnGap: 6,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 5,
      paddingLeft: 10,
      paddingRight: 6,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: 'rgba(232, 145, 58, 0.12)', // same accent tint as optionActive
      borderWidth: 1,
      borderColor: 'rgba(232, 145, 58, 0.30)',
    },
    chipText: {
      ...theme.type.bodySmall,
      color: theme.accent,
      maxWidth: 160,
    },
    // An Urdu chip: the Nastaleeq label font, smaller to suit a chip
    chipTextUrdu: {
      ...urduFieldText(theme),
      fontSize: 13,
      paddingVertical: 3,
    },
    chipClose: {
      width: 18,
      height: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(232, 145, 58, 0.18)',
    },

    // ---- Footer: a full-width Done bar pinned at the bottom of the sheet.
    // It sits AFTER the list (which is flex:1), so the list scrolls between
    // the header and this bar and Done is always reachable at the bottom.
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: spacing.md,
      paddingTop: spacing.sm,
      marginTop: spacing.xs,
      borderTopWidth: 1,
      borderTopColor: theme.glass.border,
    },
    // The "2 selected" hint on the leading side of the footer
    footerCount: {
      ...theme.type.bodySmall,
      color: theme.text.muted,
      flexShrink: 1,
    },
    // The Done button: now wide, so it reads as the footer's main action
    doneBtn: {
      flexGrow: 0,
      minWidth: 128,
      paddingHorizontal: spacing.lg,
      paddingVertical: 11,
      borderRadius: 999,
      backgroundColor: theme.brandGreen,
      alignItems: 'center',
      justifyContent: 'center',
    },
    donePressed: {opacity: 0.85},
    doneLabel: {
      ...theme.type.labelMedium,
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },

    // Option-row checkbox (the row itself is Dropdown's `option` style)
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 5,
      borderWidth: 1.5,
      borderColor: theme.text.muted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxLTR: {marginRight: spacing.sm},
    checkboxRTL: {marginLeft: spacing.sm},
    checkboxOn: {
      backgroundColor: theme.brandGreen,
      borderColor: theme.brandGreen,
    },
  });