import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';
import Group from './group';
import Middle from './middle';
import Bottom from './bottom';
import Top from './top';

const header = props => (
  <View>
    <Top {...props} />
    <View style={styles.divider} />
    <Middle {...props} />
    <View style={styles.divider} />
    <View onLayout={props.onBottomLayout}>
      <Bottom {...props} />
    </View>
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
