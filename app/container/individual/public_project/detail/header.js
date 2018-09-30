import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Price from 'component/price';
import Avatar from 'component/uikit/avatar';
import Percentage from 'component/percentage';
import Amount from 'component/amount';
import Shimmer from 'component/shimmer';
import { symbol } from '../../../../utils/icon';

export const headerHeight = 64;
export const fullHeaderHeight = 144;

const header = ({
  style,
  titleStyle,
  data,
  portfolio,
  loading,
  avatarWrapperStyle,
  base_symbol,
  can_calculate,
}) => {
  const name = R.pathOr('--', ['name'])(data);
  const token = R.pipe(
    R.pathOr('--', ['symbol']),
    R.toUpper,
  )(data);
  const logo = R.pathOr('', ['icon'])(data);
  const category = R.pipe(
    R.pathOr([], ['category']),
    R.take(2),
  )(data);
  const market = R.pathOr({}, ['market'])(portfolio);
  const current_price = R.pathOr('--', ['current_price', 'CNY'])(market);
  const price_change_percentage_24h = R.pathOr('--', [
    'price_change_percentage_24h',
  ])(market);
  const total_volume = R.pathOr('--', ['total_volume', base_symbol])(market);
  const high_24h = R.pathOr('--', ['high_24h', base_symbol])(market);

  // const desc = R.pathOr('--', ['description'])(market);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          height: headerHeight,
        },
      ]}
    >
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
          <Shimmer style={{ marginTop: 4 }} animating={loading}>
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
                {R.pipe(
                  R.filter(t => !R.isEmpty(R.trim(t))),
                  R.map(k => (
                    <View key={k} style={styles.tag.container}>
                      <Text style={styles.tag.title}>{R.trim(k)}</Text>
                    </View>
                  )),
                )(category)}
              </View>
            </View>
          </Shimmer>
        </View>
        <Animated.View style={[{ borderRadius: 25 }, avatarWrapperStyle]}>
          <Avatar size={50} source={{ uri: logo }} />
        </Animated.View>
      </View>
      {can_calculate ? (
        <View>
          <View style={styles.divider} />
          <View style={styles.bottom.container}>
            <Shimmer animating={loading}>
              <Text style={styles.bottom.title}>
                {symbol('CNY', styles.bottom.title)}
                <Price symbol="CNY">{current_price}</Price>
              </Text>
            </Shimmer>
            <Shimmer style={{ marginLeft: 15 }} animating={loading}>
              <Text style={styles.bottom.subtitle}>
                <Percentage colorAware={false}>
                  {price_change_percentage_24h}
                </Percentage>
              </Text>
            </Shimmer>
          </View>
          <Shimmer style={{ marginTop: 6 }} animating={loading}>
            <Text style={styles.bottom.content}>
              额(24H) <Amount symbol={base_symbol}>{total_volume}</Amount> |
              最高(24H) {symbol(base_symbol, styles.bottom.content)}
              <Price symbol={base_symbol}>{high_24h}</Price>
            </Text>
          </Shimmer>
        </View>
      ) : null}
    </Animated.View>
  );
};

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
