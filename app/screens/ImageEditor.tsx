import React, {FC, useEffect, useState} from 'react';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
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

  const captureImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCaptureImage();
    if (error) return console.log(error);
    setSelectedImage(path);
  };
  const selectImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCropFromGallery();
    if (error) return console.log(error);
    setSelectedImage(path);
  };

  const displayConfirmModal = (): void => {
    setShowConfirmModal(true);
  };
  const hideConfirmModal = (): void => {
    setShowConfirmModal(false);
  };

  const removePrefix = (uri: string): string => uri.replace('file:///', '');

  const getImageSize = async () => {
    const size = await fsModule.getImageSize(
      selectedImage ? removePrefix(selectedImage) : removePrefix(imageUri),
    );
    setImageSize(size);
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

  const handleToMoveBackScreen = (): void => {
    navigation.removeListener('beforeRemove', () => {});
    hideConfirmModal();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageEditorHeader />
      <BackgroundImageEditor />
      <View style={styles.imageContainer}>
        <SelectedImage uri={selectedImage || imageUri} />
      </View>
      <EditorTools
        onCaptureAnother={captureImageToCompress}
        onSelectAnother={selectImageToCompress}
        size={imageSize}
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
