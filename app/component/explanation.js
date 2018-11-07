import React from 'react';
import { Text, View } from 'react-native';

import Modal from 'component/modal';

const explanation = ({ visible, title, content, onBackdropPress }) => (
  <Modal
    useNativeDriver
    hideModalContentWhileAnimating
    isVisible={visible}
    style={styles.wrapper}
    onBackdropPress={onBackdropPress}
  >
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  </Modal>
);

const styles = {
  wrapper: {
    alignSelf: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 22.5,
    alignItems: 'center',
    width: 270,
  },
  title: {
    fontSize: 16,
    color: '#1890FF',
    fontWeight: 'bold',
  },
  content: {
    marginTop: 12,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    lineHeight: 20,
  },
};

export default explanation;
