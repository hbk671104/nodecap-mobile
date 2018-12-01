import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';
import moment from 'moment';
import { Flex } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const header = ({ data, onLinkPress }) => {
  if (R.or(R.isNil(data), R.isEmpty(data))) {
    return null;
  }

  const title = R.pathOr('--', ['title'])(data);
  const source = R.pathOr('--', ['source'])(data);
  const created_at = R.pathOr('--', ['created_at'])(data);
  const link = R.pathOr('', ['original_link'])(data);
  const logo = R.pathOr('', ['logo'])(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bottom.container}>
        <Flex>
          <Avatar
            raised={false}
            innerRatio={1}
            size={20}
            style={{ marginRight: 10 }}
            source={{ uri: logo }}
          />
          <Text style={styles.bottom.source}>
            {source}
            {'  '}
            <Text style={styles.bottom.date}>
              {moment.unix(created_at).format('MM-DD HH:ss')}
            </Text>
          </Text>
        </Flex>
        {!R.isEmpty(link) && (
          <Touchable borderless onPress={onLinkPress(link)}>
            <Text style={styles.bottom.origin}>查看原文</Text>
          </Touchable>
        )}
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
