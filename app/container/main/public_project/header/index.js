import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Middle from './middle';
import Bottom from './bottom';
import EmotionIndex from './emotion_index';
import Top from './top';

const header = props => (
  <View>
    <Top {...props} />
    <View style={styles.divider} />
    <View style={styles.divider} />
    <Middle {...props} />
    <View style={styles.divider} />
    <Bottom {...props} />
  </View>
);

const styles = {
  divider: {
    height: 10,
    backgroundColor: '#F9F9F9',
  },
};

header.propTypes = {
  style: PropTypes.object,
  onItemPress: PropTypes.func,
  onFilterPress: PropTypes.func,
};

header.defaultProps = {
  onItemPress: () => null,
  onFilterPress: () => null,
};

export default header;
