import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { raised } from '../../utils/style';

const avatar = props => (
  <View
    style={[
      styles.container,
      { height: props.size, width: props.size, borderRadius: props.size / 2 },
    ]}
  >
    <Image
      {...props}
      resizeMode="contain"
      style={{
        height: props.size * props.innerRatio,
        width: props.size * props.innerRatio,
        borderRadius: (props.size * props.innerRatio) / 2,
      }}
    />
  </View>
);

avatar.defaultProps = {
  size: 42,
  innerRatio: 2 / 3,
};

avatar.propTypes = {
  size: PropTypes.number,
  innerRatio: PropTypes.number,
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
