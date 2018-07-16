import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Image } from 'react-native';

const indicator = ({ active, descendant }) => {
  const sourceUp =
    active && !descendant
      ? require('asset/management/arrow_up_highlight.png')
      : require('asset/management/arrow_up.png');
  const sourceDown =
    active && descendant
      ? require('asset/management/arrow_down_highlight.png')
      : require('asset/management/arrow_down.png');
  return (
    <View style={styles.container}>
      <Image source={sourceUp} />
      <View style={styles.divider} />
      <Image source={sourceDown} />
    </View>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: 'transparent',
    height: 2,
  },
};

indicator.defaultProps = {
  descendant: true,
  active: false,
};

indicator.propTypes = {
  descendant: PropTypes.bool,
  active: PropTypes.bool,
};

export default indicator;
