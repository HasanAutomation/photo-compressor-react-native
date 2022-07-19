import React, {useState} from 'react';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EditorToolButton from './EditorToolButton';
import Slider from '@react-native-community/slider';

interface Props {
  onSelectAnother?: () => void;
  onCaptureAnother?: () => void;
  size: number;
  onSliderChange?: (value: number) => void;
  sliderValue: number;
  compressedSize: number;
  onSlidingComplete?: (value: number) => void;
}

const EditorTools: FC<Props> = ({
  onSelectAnother,
  onCaptureAnother,
  onSliderChange,
  size,
  sliderValue,
  compressedSize,
  onSlidingComplete,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <EditorToolButton
          title="Select Another"
          iconName="folder-open"
          onPress={onSelectAnother}
        />
        <EditorToolButton
          title="Capture Another"
          iconName="camera"
          onPress={onCaptureAnother}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Compressed to {sliderValue}%</Text>
        <Text style={styles.info}>Image size: {size} KB</Text>
      </View>
      <Slider
        maximumValue={100}
        minimumValue={0}
        value={sliderValue}
        onValueChange={onSliderChange}
        maximumTrackTintColor="rgba(108,154,222,0.8)"
        minimumTrackTintColor="rgb(108,154,222)"
        thumbTintColor="rgb(108,154,222)"
        onSlidingComplete={onSlidingComplete}
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
