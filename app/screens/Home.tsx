import React, {FC} from 'react';

import {Alert, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import LargeIconButton from '../components/LargeIconButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {requestCameraPermission, selectAndCaptureImage} from '../utils/helpers';

interface Props {}

const Home: FC<Props> = (props: Props): JSX.Element => {
  const handleImageCapture = async (): Promise<void> => {
    try {
      await requestCameraPermission();
      // Open the camera
      const {path, error} = await selectAndCaptureImage();
      if (error) return console.log(error);
      console.log(path);
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
      <LargeIconButton title="Select">
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
