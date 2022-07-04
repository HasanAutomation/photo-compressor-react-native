import {Alert, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const requestCameraPermission = async (): Promise<void> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'Accept to take photos',
        buttonNeutral: 'Ask me Later',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      },
    );
    const {NEVER_ASK_AGAIN, DENIED} = PermissionsAndroid.RESULTS;
    if (granted === NEVER_ASK_AGAIN)
      return Alert.alert(
        'Failed to open camera',
        'It looks like you disabled the permission for camera',
      );

    if (granted === DENIED)
      return Alert.alert(
        'Failed to open camera',
        'You have to give permission to the camera',
      );
  } catch (er) {
    console.log('err', er);
  }
};

export const selectAndCaptureImage = async (
  width: number = 413,
  height: number = 531,
  cropping = true,
): Promise<{path: string; error: unknown | null}> => {
  try {
    await requestCameraPermission();
    const {path} = await ImagePicker.openCamera({
      width,
      height,
      cropping,
    });
    return {path, error: null};
  } catch (err) {
    console.log('err', err);
    return {path: '', error: err};
  }
};

export const selectAndCropFromGallery = async (
  width: number = 413,
  height: number = 531,
  cropping = true,
): Promise<{path: string; error: unknown | null}> => {
  try {
    await requestCameraPermission();
    const {path} = await ImagePicker.openPicker({
      width,
      height,
      cropping,
    });
    return {path, error: null};
  } catch (err) {
    console.log('err', err);
    return {path: '', error: err};
  }
};
