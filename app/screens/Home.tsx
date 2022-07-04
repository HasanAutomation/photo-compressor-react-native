import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {}

const Home: FC<Props> = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
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
});

export default Home;
