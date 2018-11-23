import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';
import moment from 'moment';
import { Flex } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';

const trendItem = ({ data: trend, onPress }) => {
  const title = R.pathOr('--', ['title'])(trend);
  const release_at = R.path(['release_at'])(trend);

  return (
    <Touchable foreground onPress={onPress(trend)}>
      <Flex style={styles.container} align="center">
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.date}>
          {release_at ? moment.unix(release_at).format('MM-DD HH:ss') : ''}
        </Text>
      </Flex>
    </Touchable>
  );
};

const styles = {
  container: {
    paddingVertical: 20,
    paddingRight: 24,
    marginLeft: 22,
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.45)',
    marginLeft: 22,
  },
};

trendItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

trendItem.defaultProps = {
  onPress: () => null,
};

export default trendItem;
