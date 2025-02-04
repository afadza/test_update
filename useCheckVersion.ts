import hotUpdate from 'react-native-ota-hot-update';
import {Alert, LayoutAnimation, Platform, UIManager} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import React from 'react';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
export const useCheckVersion = () => {
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const onCheckGitVersion = () => {
    setProgress(0);
    setLoading(true);
    hotUpdate.git.checkForGitUpdate({
      branch: 'main',
      bundlePath:
        Platform.OS === 'ios'
          ? 'output/main.jsbundle'
          : 'android/output/index.android.bundle',
      url: 'https://github.com/afadza/test_update',
      onCloneFailed(msg: string) {
        Alert.alert('Clone project failed!', msg, [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      },
      onCloneSuccess() {
        Alert.alert('Clone project success!', 'Restart to apply the changing', [
          {
            text: 'ok',
            onPress: () => hotUpdate.resetApp(),
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      },
      onPullFailed(msg: string) {
        Alert.alert('Pull project failed!', msg, [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      },
      onPullSuccess() {
        Alert.alert('Pull project success!', 'Restart to apply the changing', [
          {
            text: 'ok',
            onPress: () => hotUpdate.resetApp(),
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      },
      onProgress(received: number, total: number) {
        const percent = (+received / +total) * 100;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setProgress(percent);
      },
      onFinishProgress() {
        setLoading(false);
      },
    });
  };
  const removeGitUpdate = () => {
    hotUpdate.git.removeGitUpdate();
  };
  return {
    version: {
      onCheckGitVersion,
      removeGitUpdate,
      state: {
        progress,
        loading,
      },
    },
  };
};
