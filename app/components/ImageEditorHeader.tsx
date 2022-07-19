import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  onSavePress: () => void;
}

const ImageEditorHeader: FC<Props> = ({onSavePress}): JSX.Element => {
  const navigation = useNavigation();

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back */}
      <Pressable style={styles.buttonContainer} onPress={handleGoBack}>
        <Icon name="arrow-left" color="red" style={styles.icon} />
      </Pressable>
      {/* Save */}
      <View style={styles.saveContainer}>
        <Pressable style={styles.buttonContainer} onPress={onSavePress}>
          <Icon name="file-download" color="red" style={styles.icon} />
        </Pressable>
        <Text style={styles.saveText}>Save</Text>
      </View>
    </View>
  );
};

const buttonDimension = 45;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonContainer: {
    height: buttonDimension,
    width: buttonDimension,
    backgroundColor: 'white',
    borderRadius: buttonDimension / 2,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
    color: '#6C9ADE',
  },
  saveContainer: {
    alignItems: 'center',
  },
  saveText: {
    color: '#6C9ADE',
    alignSelf: 'center',
  },
});

export default ImageEditorHeader;
