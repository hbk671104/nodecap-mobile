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
  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <Avatar source={{ uri: logo_url }} />
        <View style={styles.content.container}>
          <Text style={styles.content.title}>{title}</Text>
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
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      marginTop: 12,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
};

export default item;
