import React, {FC} from 'react';

import {StyleSheet, Text, View, NativeModules} from 'react-native';
import LargeIconButton from '../components/LargeIconButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  selectAndCaptureImage,
  selectAndCropFromGallery,
} from '../utils/helpers';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';

const {fsModule} = NativeModules;

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const Home: FC<Props> = ({navigation}: Props): JSX.Element => {
  const navigateToImageEditor = (uri: string): void => {
    navigation.navigate('ImageEditor', {
      imageUri: uri,
    });
  };

  fsModule.greetingFromNative('Raina', (val: string) => console.log(val));

  const handleImageCapture = async (): Promise<void> => {
    try {
      // Open the camera

      const {path, error} = await selectAndCaptureImage();
      if (error) return console.log(error);
      navigateToImageEditor(path);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleImageSelection = async (): Promise<void> => {
    try {
      const {path, error} = await selectAndCropFromGallery();
      if (error) return console.log(error);
      navigateToImageEditor(path);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Choose your image</Text>
        <Text style={styles.subHeading}>
          You can select your image using one of those options which you want to
          convert to small size
        </Text>
      </View>
      <LargeIconButton title="Capture" onPress={handleImageCapture}>
        <Icon name="camera" />
      </LargeIconButton>
      <LargeIconButton title="Select" onPress={handleImageSelection}>
        <Icon name="folder-open" />
      </LargeIconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    color: '#272727',
    fontWeight: '500',
    textAlign: 'center',
  },
  subHeading: {
    color: '#272727',
    textAlign: 'center',
    opacity: 0.5,
    lineHeight: 20,
    paddingTop: 7,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
  },
});

export default Home;
