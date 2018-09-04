import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Shimmer from 'component/shimmer';

const header = ({ style, titleStyle, data, loading }) => {
  const name = R.pathOr('--', ['name'])(data);
  const token = R.pathOr('--', ['token_name'])(data);
  const logo = R.pathOr('', ['logo_url'])(data);
  return (
    <Shimmer animating={loading}>
      <Animated.View style={[styles.container, style]}>
        <View style={styles.top.container}>
          <View style={{ flex: 1 }}>
            <Animated.Text style={[styles.top.title, titleStyle]}>
              {name}
            </Animated.Text>
            <Text style={styles.top.subtitle}>{token}</Text>
          </View>
          <Avatar size={50} source={{ uri: logo }} innerRatio={0.9} />
        </View>
        <View style={styles.divider} />
        <View>
          <View style={styles.bottom.container}>
            <Text style={styles.bottom.title}>¥15.93</Text>
            <Text style={styles.bottom.subtitle}>+4.42%</Text>
          </View>
          <Text style={styles.bottom.content}>
            量(24H) 1.3亿SOC | 额(24H) 30.23亿CNY | 最高(24H) ¥14.7CNY
          </Text>
        </View>
      </Animated.View>
    </Shimmer>
  );
};

export const headerHeight = 174;
const styles = {
  container: {
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
      marginTop: 8,
    },
  },
  divider: {
    height: 1,
    width: 58,
    backgroundColor: 'white',
    marginTop: 12,
    marginBottom: 12,
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
      marginLeft: 15,
    },
    content: {
      fontWeight: '300',
      fontSize: 10,
      color: 'white',
      marginTop: 12,
    },
  },
};

header.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
};

header.defaultProps = {
  loading: false,
};

export default header;
