import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Shimmer from 'component/shimmer';

const header = ({ style, titleStyle, data, loading, avatarWrapperStyle }) => {
  const name = R.pathOr('--', ['name'])(data);
  const token = R.pipe(
    R.pathOr('--', ['symbol']),
    R.toUpper,
  )(data);
  const logo = R.pathOr('', ['icon'])(data);
  const category = R.pipe(
    R.pathOr([], ['category']),
    R.join(' | '),
  )(data);

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.top.container}>
        <View style={{ flex: 1 }}>
          <Shimmer animating={loading}>
            <Text
              style={[
                styles.top.title,
                R.length(name) > 13 && { fontSize: 18 },
                titleStyle,
              ]}
            >
              {name}
            </Text>
          </Shimmer>
          <Shimmer style={{ marginTop: 8 }} animating={loading}>
            <Text style={styles.top.subtitle}>
              {token}
              {'    '}
              {category}
            </Text>
          </Shimmer>
        </View>
        <Animated.View style={[{ borderRadius: 25 }, avatarWrapperStyle]}>
          <Avatar size={50} source={{ uri: logo }} innerRatio={0.9} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export const headerHeight = 64;
const styles = {
  container: {
    flex: 1,
    height: headerHeight,
    paddingHorizontal: 12,
  },
  top: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 25,
      color: 'white',
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 12,
      color: 'white',
    },
  },
  divider: {
    height: 1,
    width: 58,
    backgroundColor: 'white',
    marginTop: 8,
    marginBottom: 8,
  },
  bottom: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      color: 'white',
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 14,
      color: 'white',
    },
    content: {
      fontWeight: '300',
      fontSize: 10,
      color: 'white',
    },
    description: {
      fontSize: 12,
      color: 'white',
      lineHeight: 17,
    },
  },
};

header.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  avatarWrapperStyle: PropTypes.object,
};

header.defaultProps = {
  loading: false,
};

export default header;
