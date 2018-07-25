import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { raised } from '../../utils/style';

const avatar = props => (
  <View
    style={[
      styles.container,
      { height: props.size, width: props.size, borderRadius: props.size / 2 },
      props.style,
    ]}
  >
    <Image
      {...props}
      resizeMode="contain"
      style={{
        height: (props.size * 2) / 3,
        width: (props.size * 2) / 3,
        borderRadius: props.size / 3,
      }}
    />
  </View>
);

avatar.defaultProps = {
  size: 42,
};

avatar.propTypes = {
  size: PropTypes.number,
};

const styles = {
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...raised,
  },
};

export default avatar;
