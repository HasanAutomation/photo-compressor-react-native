import React, {FC} from 'react';
import {Alert, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import LargeIconButton from '../components/LargeIconButton';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {}

const Home: FC<Props> = (props: Props): JSX.Element => {
  const handleImageCapture = async (): Promise<void> => {
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
