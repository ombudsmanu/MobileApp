import React, {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import Icon from '../../../components/Icon/Icon';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {createUploadStyles, UPLOAD_GRADIENT} from './parts.styles';

/**
 * UPLOAD CARD — the "Upload Document" tile from the reference: a green
 * gradient badge with an upload glyph, a title and sub-line, and a round
 * button on the trailing side.
 *
 *   label     the field label above the card ("Attach CNIC Front")
 *   required  red asterisk on the label
 *   title     the big line inside the card
 *   hint      the small line under it ("PDF or Image files supported")
 *   fileName  when a file is attached, its name is shown in place of the
 *             hint, the badge gets a tick, and the trailing button becomes
 *             a remove (×)
 *   onPress   pick a file (the screen opens the Camera/Gallery chooser)
 *   onRemove  clear the attached file (only shown once one is attached)
 */
const UploadCard = ({
  label,
  required = false,
  title,
  hint,
  fileName,
  onPress,
  onRemove,
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createUploadStyles(theme), [theme]);
  const {isRTL} = useLanguage();
  const picked = !!fileName;

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text style={[styles.label, isRTL && styles.rtl]}>
          {label}
          {required ? <Text style={styles.star}> *</Text> : null}
        </Text>
      ) : null}

      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label || title}
        style={({pressed}) => pressed && styles.pressed}>
        <GlassSurface style={[styles.card, picked && styles.cardPicked]}>
          <View style={[styles.row, isRTL && styles.rowRTL]}>
            <LinearGradient
              colors={UPLOAD_GRADIENT}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.badge}>
              <Icon
                name={picked ? 'check' : 'upload'}
                size={26}
                color="#FFFFFF"
                weight={2.5}
              />
            </LinearGradient>

            <View style={[styles.textBlock, isRTL && styles.textBlockRTL]}>
              <Text style={[styles.title, isRTL && styles.rtl]} numberOfLines={1}>
                {title}
              </Text>
              <Text
                style={[styles.hint, picked && styles.hintPicked, isRTL && styles.rtl]}
                numberOfLines={1}>
                {picked ? fileName : hint}
              </Text>
            </View>

            {/* Picked → a remove button; empty → a plus. The remove button
                stops the press from bubbling to the card (which would
                re-open the picker). */}
            {picked ? (
              <Pressable
                onPress={onRemove}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${label || title}`}
                style={styles.remove}>
                <Icon name="close" size={16} color={theme.danger} weight={2.5} />
              </Pressable>
            ) : (
              <View style={styles.plus}>
                <Icon name="plus" size={20} color={theme.accent} weight={2.5} />
              </View>
            )}
          </View>
        </GlassSurface>
      </Pressable>
    </View>
  );
};

export default UploadCard;