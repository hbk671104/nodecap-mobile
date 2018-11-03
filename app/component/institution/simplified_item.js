import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const item = ({ style, data, onPress, disableSubtitle }) => {
  const title = R.pathOr('--', ['name'])(data);
  const des = R.pathOr('', ['description'])(data);
  const logo_url = R.pathOr('', ['logo_url'])(data);
  const status = R.pathOr(0, ['owner_status'])(data);
  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <Avatar size={45} source={{ uri: logo_url }} />
        <View style={styles.content.container}>
          <View style={styles.content.titleContainer}>
            <Text style={styles.content.title}>{title}</Text>
            <Text
              style={[
                styles.content.status,
                status === 0 && { color: '#F88E40' },
                status === 1 && { color: '#09AC32' },
              ]}
            >
              {status === 0 && '审核中'}
              {status === 1 && '已审核'}
              {status === 2 && '已驳回'}
            </Text>
          </View>
          {!R.isEmpty(des) &&
            !disableSubtitle && (
              <Text style={styles.content.subtitle} numberOfLines={1}>
                {des}
              </Text>
            )}
        </View>
      </View>
    </Touchable>
  );
};

item.propTypes = {
  style: ViewPropTypes.style,
  disableSubtitle: PropTypes.bool,
};

item.defaultProps = {
  disableSubtitle: false,
};

export const itemHeight = 66;
const styles = {
  container: {
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  content: {
    container: {
      marginLeft: 20,
      flex: 1,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    status: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      marginTop: 8,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
};

export default item;
