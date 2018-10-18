import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Shimmer from 'component/shimmer';
import Purpose from './purpose';

const header = ({ style, titleStyle, data, loading, avatarWrapperStyle }) => {
  const name = R.pathOr('--', ['name'])(data);
  const token = R.pipe(
    R.pathOr('--', ['symbol']),
    R.toUpper,
  )(data);
  const logo = R.pathOr('', ['icon'])(data);
  const category = R.pipe(
    R.pathOr([], ['tags']),
    R.take(2),
  )(data);
  const tags = R.pipe(
    R.pathOr([], ['tags']),
    R.map((i) => ({
      ...i,
      name: R.trim(i.name),
    })),
    R.reduce((last, current) => `${last ? `${last}/` : last}${current.name}`, '')
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
          <View style={{ marginTop: 4 }}>
            <View style={styles.tag.wrapper}>
              <Text style={styles.top.subtitle}>{token}</Text>
              <View
                style={[
                  {
                    flex: 1,
                    marginLeft: 8,
                  },
                  styles.tag.wrapper,
                ]}
              >
                <Text style={styles.tag.title}>
                  {tags}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Animated.View style={[{ borderRadius: 25 }, avatarWrapperStyle]}>
          <Avatar size={50} source={{ uri: logo }} innerRatio={0.9} />
        </Animated.View>
      </View>
      {R.compose(R.not, R.isEmpty, R.pathOr([], ['purpose']))(data) && (
        <Purpose portfolio={data} />
      )}
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
  tag: {
    wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    container: {
      height: 19,
      paddingHorizontal: 3,
      borderRadius: 2,
      marginLeft: 8,
      justifyContent: 'center',
      borderColor: 'white',
      borderWidth: StyleSheet.hairlineWidth,
    },
    title: {
      fontSize: 11,
      color: 'white',
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
