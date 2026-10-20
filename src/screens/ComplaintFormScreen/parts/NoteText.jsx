import React from 'react';
import Text from '../../../components/AppText/AppText';
import {useTheme} from '../../../context/ThemeContext';

/**
 * NOTE TEXT — the Important Note body, with two kinds of phrase picked out
 * in colour, the way the official form does it:
 *
 *   [[ ... ]]   GREEN  (theme.brandGreen) — e.g. "41 District Regional Offices"
 *   (( ... ))   ORANGE (theme.accent)     — e.g. "Attach Supporting Documents"
 *
 * The markers live in the i18n string, so the SAME component works in
 * English and Urdu and the highlighted words follow the translation — no
 * hard-coded phrase matching that would break when the wording changes.
 *
 *   <NoteText text={t('cf.note.body')} style={styles.noteText} rtl={isRTL} />
 *
 * `style` is the paragraph style (font, colour, line height). The coloured
 * runs inherit it and only override the colour and weight, so size and line
 * spacing stay identical across the whole paragraph.
 */

// Splits on [[green]] and ((orange)) and keeps the markers' contents.
const PART = /(\[\[[^\]]*\]\]|\(\([^)]*\)\))/g;

const NoteText = ({text, style, rtl}) => {
  const {theme} = useTheme();
  const raw = String(text ?? '');
  const parts = raw.split(PART).filter(p => p.length > 0);

  return (
    <Text style={[style, rtl && {writingDirection: 'rtl', textAlign: 'right'}]}>
      {parts.map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          return (
            <Text key={i} style={{color: theme.brandGreen, fontWeight: '700'}}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        if (part.startsWith('((') && part.endsWith('))')) {
          return (
            <Text key={i} style={{color: theme.accent, fontWeight: '700'}}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
};

export default NoteText;