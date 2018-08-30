import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

const header = ({ data, onLinkPress }) => {
  if (R.or(R.isNil(data), R.isEmpty(data))) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        关于火币全球站开放VET新币充值，并上线VET交易的公告
      </Text>
      <View style={styles.bottom.container}>
        <Text style={styles.bottom.source}>
          哈哈哈
          {'  '}
          <Text style={styles.bottom.date}>02-12 14:21</Text>
        </Text>
        <Touchable onPress={onLinkPress}>
          <Text style={styles.bottom.origin}>查看原文</Text>
        </Touchable>
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  bottom: {
    container: {
      marginTop: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    source: {
      fontWeight: 'bold',
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.85)',
    },
    date: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
    origin: {
      fontSize: 13,
      color: '#1890FF',
    },
  },
};

header.propTypes = {
  data: PropTypes.object,
  onLinkPress: PropTypes.func,
};

header.defaultProps = {
  onLinkPress: () => null,
};

export default header;
