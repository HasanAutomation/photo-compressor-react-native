import React, {FC} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Button from './Button';

interface Props {
  visible: boolean;
  title?: string;
  message?: string;
  onCancelPress?: () => void;
  onDiscardPress?: () => void;
}

const ConfirmModal: FC<Props> = ({
  visible = false,
  title,
  message,
  onCancelPress,
  onDiscardPress,
}): JSX.Element => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{message}</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button title="Cancel" onPress={onCancelPress} />
            <Button title="Discard" color="red" onPress={onDiscardPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  title: 'Are you sure?',
  message: 'This action will discard all your changes',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 10,
    borderRadius: 7,
  },
  title: {
    color: '#6C9ADE',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    color: '#272727',
    opacity: 0.8,
    paddingTop: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default ConfirmModal;
