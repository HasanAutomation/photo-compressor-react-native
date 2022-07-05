import React from 'react';
import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {}

const BackgroundImageEditor: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require('../source/background.png')}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
});

export default BackgroundImageEditor;
