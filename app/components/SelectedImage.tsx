import React from 'react';
import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  uri: string;
}

const SelectedImage: FC<Props> = ({uri}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={{uri}} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 206,
    height: 265,
    backgroundColor: '#fff',
    elevation: 10,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: '#fff',
  },
});

export default SelectedImage;
