import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
  children?: ReactNode;
}
const LargeIconButton: FC<Props> = ({
  title,
  onPress,
  children,
}): JSX.Element => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {/* <Icon style={styles.icon} name={iconName} /> */}
        {Children.map(children, child => {
          if (!isValidElement(child)) return null;
          return cloneElement(child, {
            ...child.props,
            style: {...styles.icon, ...child.props.style},
          });
        })}
      </TouchableOpacity>
      <Text style={styles.btnLabel}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default LargeIconButton;
