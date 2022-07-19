import React, {FC, useEffect, useState} from 'react';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import BackgroundImageEditor from '../components/BackgroundImageEditor';
import ConfirmModal from '../components/ConfirmModal';
import EditorTools from '../components/EditorTools';
import ImageEditorHeader from '../components/ImageEditorHeader';
import SelectedImage from '../components/SelectedImage';
import {RootStackParamList} from '../navigation/AppNavigator';
import {
  selectAndCaptureImage,
  selectAndCropFromGallery,
} from '../utils/helpers';
import fsModule from '../modules/fsModule';
import Loading from '../components/Loading';
import Done from '../components/Done';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'ImageEditor'>;

interface Props {
  route: RouteProps['route'];
}

const ImageEditor: FC<Props> = ({route}): JSX.Element => {
  const {imageUri} = route.params;
  const [imageSize, setImageSize] = useState<number>(0);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const [sliderValue, setSliderValue] = useState<number>(100);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedImage, setCompressedImage] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const captureImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCaptureImage();
    if (error) return console.log(error);
    resetActivity();
    setSelectedImage(path);
  };
  const selectImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCropFromGallery();
    if (error) return console.log(error);
    resetActivity();
    setSelectedImage(path);
  };

  const displayConfirmModal = (): void => {
    setShowConfirmModal(true);
  };
  const hideConfirmModal = (): void => {
    setShowConfirmModal(false);
  };

  const resetActivity = () => {
    setSliderValue(100);
    setCompressedImage('');
  };

  const removePrefix = (uri: string): string => uri.replace('file:///', '');

  const getImageSize = async () => {
    const size = await fsModule.getImageSize(
      selectedImage ? removePrefix(selectedImage) : removePrefix(imageUri),
    );
    setImageSize(Number((size / 1000).toFixed(1)));
  };

  const handleImageSlider = async (quality: number) => {
    setBusy(true);
    const compressedData = await fsModule.compressImage(
      selectedImage ? removePrefix(selectedImage) : removePrefix(imageUri),
      Math.floor(quality),
    );
    setCompressedImage(`file:///${compressedData.uri}`);
    setImageSize(Number((compressedData.size / 1000).toFixed(1)));
    setBusy(false);
  };

  const updateSliderValue = (value: number): void => {
    setSliderValue(Math.floor(value));
  };

  // Handling the back press
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      displayConfirmModal();
    });
  }, []);

  useEffect(() => {
    getImageSize();
  }, [selectedImage]);

  useEffect(() => {
    if (imageUri && !selectedImage) {
      setSelectedImage(imageUri);
      getImageSize();
    }
  }, [imageUri]);

  const handleToMoveBackScreen = (): void => {
    navigation.removeListener('beforeRemove', () => {});
    hideConfirmModal();
    navigation.goBack();
  };

  const handleSaveImage = async (): Promise<void> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'Accept to take save image',
          buttonNeutral: 'Ask me Later',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );

      const {NEVER_ASK_AGAIN, DENIED} = PermissionsAndroid.RESULTS;
      if (granted === NEVER_ASK_AGAIN)
        return Alert.alert(
          'Failed to save image',
          'It looks like you disabled the permission for storage',
        );

      if (granted === DENIED)
        return Alert.alert(
          'Failed to give permission for storage camera',
          'You have to give permission to the storage',
        );

      const imageName = `pp-${Date.now()}`;
      const res = await fsModule.saveImageToDevice(
        removePrefix(compressedImage),
        imageName,
        sliderValue,
      );
      if (res === 'Done') {
        setDone(true);
      }
      console.log('res', res);
    } catch (err) {
      console.log(err);
      ToastAndroid.show('something went wring', ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <ImageEditorHeader onSavePress={handleSaveImage} />
      <BackgroundImageEditor />
      <View style={styles.imageContainer}>
        <SelectedImage uri={compressedImage || selectedImage}>
          {(busy || done) && (
            <>
              <Loading visible={busy} />
              <Done visible={done} onClose={() => setDone(false)} />
            </>
          )}
        </SelectedImage>
      </View>
      <EditorTools
        onCaptureAnother={captureImageToCompress}
        onSelectAnother={selectImageToCompress}
        size={imageSize}
        onSliderChange={handleImageSlider}
        sliderValue={sliderValue}
        compressedSize={compressedSize}
        onSlidingComplete={updateSliderValue}
      />
      <ConfirmModal
        visible={showConfirmModal}
        onCancelPress={hideConfirmModal}
        onDiscardPress={handleToMoveBackScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageEditor;
