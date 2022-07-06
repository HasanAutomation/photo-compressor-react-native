import React, {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface Props {
  onPress?: () => void;
  title: string;
  color?: string;
}

const Button: FC<Props> = ({
  onPress,
  title,
  color = '#6C9ADE',
}): JSX.Element => {
  return (
    <Pressable
      style={{...styles.container, backgroundColor: color}}
      onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  btnText: {
    color: '#fff',
  },
});

export default Button;
