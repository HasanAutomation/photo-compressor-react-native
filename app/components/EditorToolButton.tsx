import React from 'react';
import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  onPress?: () => void;
  title: string;
  iconName: string;
}

const EditorToolButton: FC<Props> = ({
  onPress,
  title,
  iconName,
}): JSX.Element => {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Icon name={iconName} style={styles.icon} />
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6c9ADE',
    padding: 8,
    borderRadius: 2,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    color: '#fff',
    marginRight: 3,
    fontSize: 16,
  },
});

export default EditorToolButton;
