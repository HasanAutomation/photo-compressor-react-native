import React from 'react';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EditorToolButton from './EditorToolButton';
import Slider from '@react-native-community/slider';

interface Props {}

const EditorTools: FC<Props> = (): JSX.Element => {
  const handleCaptureAnother = () => {};
  const handleSelectAnother = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <EditorToolButton
          title="Select Another"
          iconName="folder-open"
          onPress={handleSelectAnother}
        />
        <EditorToolButton
          title="Capture Another"
          iconName="camera"
          onPress={handleCaptureAnother}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Compressed to 50%</Text>
        <Text style={styles.info}>Image size: 50kb</Text>
      </View>
      <Slider
        maximumTrackTintColor="rgba(108,154,222,0.8)"
        minimumTrackTintColor="rgb(108,154,222)"
        thumbTintColor="rgb(108,154,222)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: '#fff',
    elevation: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  info: {
    color: '#6C9ADE',
  },
});

export default EditorTools;