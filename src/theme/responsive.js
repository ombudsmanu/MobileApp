import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {spacing} from './tokens';

/**
 * RESPONSIVE LAYOUT — the one place that answers "what kind of screen is this?"
 *
 *   const {width, height, isLandscape, isTablet} = useLayout();
 *
 * Every value is in dp (density-independent pixels), the same unit every
 * style uses, so a Redmi 12, a Pixel 8a and a tablet are compared fairly.
 *
 * The screen using it re-renders by itself when the phone is rotated, a
 * foldable is opened, or the app is put in split-screen, because
 * useWindowDimensions reports those changes.
 *
 * TABLET_MIN (600) is Android's own tablet breakpoint ("sw600dp"): a screen
 * whose SHORTER side is 600dp or more is a tablet. Using the shorter side
 * means a phone turned sideways is still treated as a phone.
 */
export const TABLET_MIN = 600;

export const useLayout = () => {
  const {width, height, fontScale} = useWindowDimensions();

  return useMemo(() => {
    const shortSide = Math.min(width, height);
    return {
      width,
      height,
      fontScale, // the phone's system font size (1 = default)
      shortSide,
      isLandscape: width > height,
      isTablet: shortSide >= TABLET_MIN,
    };
  }, [width, height, fontScale]);
};

/**
 * GRID — how many cards per row (Dashboard modules, About Us sections,
 * Annual Reports years):
 *
 *   phone, portrait    2
 *   tablet, portrait   3
 *   landscape          4   (phone or tablet)
 *
 * Safety net: never so many that a card gets narrower than GRID.minCard.
 * That only matters in a small split-screen window, which then drops to
 * fewer cards per row instead of squeezing them. Never fewer than 2.
 */
export const GRID = {
  gap: spacing.sm, // space between cards, across and down
  minCard: 150, // the narrowest a card may get
  sidePadding: spacing.lg, // each screen's left/right padding
  columns: {phone: 2, tablet: 3, landscape: 4},
};

export const gridColumnsFor = ({width, isLandscape, isTablet}) => {
  let wanted = GRID.columns.phone;
  if (isLandscape) {
    wanted = GRID.columns.landscape;
  } else if (isTablet) {
    wanted = GRID.columns.tablet;
  }

  const available = width - GRID.sidePadding * 2;
  const fitting = Math.floor((available + GRID.gap) / (GRID.minCard + GRID.gap));

  return Math.max(GRID.columns.phone, Math.min(wanted, fitting));
};

/** Cards per row for the current screen; updates on rotation. */
/** Cards per row for the current screen; updates on rotation. */
export const useGridColumns = () => {
  const layout = useLayout();
  return gridColumnsFor(layout);
};

/**
 * CONTENT WIDTHS — on a wide screen (tablet, or a phone turned sideways)
 * text and forms stretched edge to edge are tiring to read: the eye loses
 * its place jumping back from the end of a very long line. So these
 * screens keep their content in a centred column no wider than:
 *
 *   READING_WIDTH  640 — text pages and lists (About sections, Downloads,
 *                        Register Complaint, Appearance)
 *   FORM_WIDTH     480 — a single form or message card (Login form,
 *                        "Coming soon")
 *
 * On a phone held upright the screen is narrower than both, so nothing
 * changes there.
 */
export const READING_WIDTH = 640;
export const FORM_WIDTH = 480;

/**
 * SIDE GUTTERS — the left and right padding for a screen's content.
 *
 *   sideGutters(width, insets)                 just clear of the edges
 *   sideGutters(width, insets, READING_WIDTH)  also centre a column
 *
 * Each side is the LARGER of:
 *   - the safe distance from the edge: the notch or 3-button navigation
 *     bar (which move to the sides in landscape) plus the normal spacing
 *   - half of the width left over once the column is at its maximum
 *
 * So the content is always clear of the notch, and on a wide screen it
 * sits centred. Because this is padding (not a narrower ScrollView), the
 * page still scrolls when the finger is out at the edge of a tablet.
 */
export const sideGutters = (width, insets, maxContent = Infinity) => {
  const centred = (width - maxContent) / 2;
  return {
    paddingLeft: Math.max(insets.left + spacing.lg, centred),
    paddingRight: Math.max(insets.right + spacing.lg, centred),
  };
};