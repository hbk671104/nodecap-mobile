import React from 'react';
import PropTypes from 'prop-types';
import { Text, ViewPropTypes, ActivityIndicator } from 'react-native';
import Touchable from 'component/uikit/touchable';
import styles from './style';

const authButton = ({ style, disabled, loading, onPress }) => {
  return (
    <Touchable
      style={[styles.container.normal, !disabled && styles.container.highlight, style]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.title.normal, !disabled && styles.title.highlight]}>登 录</Text>
      )}
    </Touchable>
  );
};

authButton.defaultProps = {
  disabled: true,
  loading: false,
};

authButton.propTypes = {
  style: ViewPropTypes.style,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
};

export default authButton;
