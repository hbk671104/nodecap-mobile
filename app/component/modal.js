import React from 'react';
import Modal from 'react-native-modal';

const modal = props => (
  <Modal
    {...props}
    backdropOpacity={0.4}
    animationIn="fadeIn"
    animationOut="fadeOut"
  >
    {props.children}
  </Modal>
);

export default modal;
