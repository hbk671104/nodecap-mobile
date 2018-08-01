import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

const modal = props => (
  <Modal
    {...props}
    backdropOpacity={props.backdropOpacity}
    animationIn={props.animationIn}
    animationOut={props.animationOut}
  >
    {props.children}
  </Modal>
);

modal.propTypes = {
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  backdropOpacity: PropTypes.number,
};

modal.defaultProps = {
  animationIn: 'fadeIn',
  animationOut: 'fadeOut',
  backdropOpacity: 0.4,
};

export default modal;
