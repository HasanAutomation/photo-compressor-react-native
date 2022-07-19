import React, {ReactNode} from 'react';
import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  uri: string;
  children?: ReactNode;
}

const SelectedImage: FC<Props> = ({uri, children}): JSX.Element | null => {
  if (!uri) return null;

  return (
    <View style={styles.container}>
      {children || (
        <Image style={styles.bgImage} source={{uri}} resizeMode="cover" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 206,
    height: 265,
    backgroundColor: '#fff',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: '#fff',
  },
});

export default SelectedImage;
