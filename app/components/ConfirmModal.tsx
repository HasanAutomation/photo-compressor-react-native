import React, {FC} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';

interface Props {}

const ConfirmModal: FC<Props> = (): JSX.Element => {
  return (
    <Modal transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Are you sure?</Text>
          <Text style={styles.subtitle}>
            This action will discard all your changes
          </Text>
        </View>
      </View>
    </Modal>
  );
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
});

export default ConfirmModal;
