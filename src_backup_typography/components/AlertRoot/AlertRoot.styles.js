/**
 * Maps our theme onto react-native-alert-notification's colour slots.
 * The library expects [lightColors, darkColors]; we pass the same set
 * twice so dialogs always match OUR palette, not the phone's dark mode.
 */
export const createAlertColors = theme => {
  const colors = {
    label: theme.text.heading,
    card: '#FFFFFF',
    overlay: 'rgba(20, 30, 22, 0.55)',
    success: theme.success,
    danger: theme.danger,
    warning: theme.accent,
  };
  return [colors, colors];
};

/** Dialogs stay open until the user acts; tapping outside dismisses. */
export const dialogConfig = {
  closeOnOverlayTap: true,
  autoClose: false,
};

/** Toasts disappear on their own after 2.5 seconds. */
export const toastConfig = {
  autoClose: 2500,
};