import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {}

const Home: FC<Props> = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Choose your image</Text>
        <Text style={styles.subHeading}>
          You can select your image using one of those options which you want to
          convert to small size
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon style={styles.icon} name="camera" />
        </TouchableOpacity>
        <Text style={styles.btnLabel}>Capture</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon style={styles.icon} name="folder-open" />
        </TouchableOpacity>
        <Text style={styles.btnLabel}>Select</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  button: {
    borderWidth: 4,
    borderColor: '#6C9ADE',
    borderRadius: 7,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 60,
    color: '#6c9ADE',
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
