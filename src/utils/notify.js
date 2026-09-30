import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

/**
 * THE ONLY FILE SCREENS USE FOR ALERTS.
 *   Toasts  → react-native-alert-notification (auto-hide, no action)
 *   Dialogs → our AppDialog (cross icon, up to two buttons, colour chips)
 */

let showDialog = null;

/** AppDialog calls this when it mounts. */
export const registerDialogHost = fn => {
  showDialog = fn;
};

const open = config => {
  if (showDialog) {
    showDialog(config);
  }
};

export const notify = {
  success: (title, textBody) => Toast.show({type: ALERT_TYPE.SUCCESS, title, textBody}),

  warningToast: (title, textBody) => Toast.show({type: ALERT_TYPE.WARNING, title, textBody}),

  error: (title, message) =>
    open({type: 'error', title, message, buttons: [{text: 'OK', style: 'confirm'}]}),

  /** One action button, plus the cross to dismiss. */
  dialog: ({type = 'success', title, message, button = 'OK', onConfirm, swatches}) =>
    open({
      type,
      title,
      message,
      swatches,
      buttons: [{text: button, style: 'confirm', onPress: onConfirm}],
    }),

  /** Cancel + confirm. */
  confirm: ({title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm}) =>
    open({
      type: 'warning',
      title,
      message,
      buttons: [
        {text: cancelText, style: 'cancel'},
        {text: confirmText, style: 'destructive', onPress: onConfirm},
      ],
    }),
};

export default notify;