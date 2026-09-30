import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';

/**
 * THE ONLY FILE THAT TALKS TO THE ALERT LIBRARY.
 * Screens call notify.* — never the library directly. If we ever
 * swap libraries, only this file changes.
 *
 *   notify.success(title, message)   → small toast, auto-hides
 *   notify.error(title, message)     → dialog, needs acknowledgement
 *   notify.dialog({...})             → dialog with one action button
 *   notify.confirm({...})            → confirm dialog; tap outside = cancel
 */

const TYPE = {
  success: ALERT_TYPE.SUCCESS,
  warning: ALERT_TYPE.WARNING,
  error: ALERT_TYPE.DANGER,
};

export const notify = {
  success: (title, message) =>
    Toast.show({type: ALERT_TYPE.SUCCESS, title, textBody: message}),

  warningToast: (title, message) =>
    Toast.show({type: ALERT_TYPE.WARNING, title, textBody: message}),

  error: (title, message) =>
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title,
      textBody: message,
      button: 'OK',
    }),

  dialog: ({type = 'success', title, message, button = 'OK', onConfirm}) =>
    Dialog.show({
      type: TYPE[type] ?? ALERT_TYPE.SUCCESS,
      title,
      textBody: message,
      button,
      onPressButton: () => {
        // Declaring onPressButton disables auto-close, so close it ourselves
        Dialog.hide();
        onConfirm?.();
      },
    }),

  confirm: ({title, message, confirmText = 'Confirm', onConfirm}) =>
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title,
      textBody: `${message}\n\n.`,
      button: confirmText,
      closeOnOverlayTap: true,
      onPressButton: () => {
        Dialog.hide();
        onConfirm?.();
      },
    }),
};

export default notify;