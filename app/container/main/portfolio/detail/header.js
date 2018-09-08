import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Price from 'component/price';
import Percentage from 'component/percentage';
import Amount from 'component/amount';
import Shimmer from 'component/shimmer';

import { symbol } from '../../../../utils/icon';

const header = ({
  style,
  titleStyle,
  data,
  stat_loading,
  base_symbol,
  can_calculate,
}) => {
  const name = R.pathOr('--', ['name'])(data);
  const token = R.pathOr('--', ['token_name'])(data);
  const logo = R.pathOr('', ['logo_url'])(data);

  const current_price = R.pathOr('--', ['stats', 'current_price', base_symbol])(
    data,
  );
  const price_change_percentage_24h = R.pathOr('--', [
    'stats',
    'price_change_percentage_24h',
  ])(data);
  const total_volume = R.pathOr('--', ['stats', 'total_volume', base_symbol])(
    data,
  );
  const high_24h = R.pathOr('--', ['stats', 'high_24h', base_symbol])(data);

  const desc = R.pathOr('--', ['description'])(data);

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.top.container}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.top.title,
              R.length(name) > 13 && { fontSize: 18 },
              titleStyle,
            ]}
          >
            {name}
          </Text>
          <Text style={styles.top.subtitle}>{token}</Text>
        </View>
        <Avatar size={50} source={{ uri: logo }} innerRatio={0.9} />
      </View>
      <View style={styles.divider} />
      {can_calculate ? (
        <View>
          <View style={styles.bottom.container}>
            <Shimmer animating={stat_loading}>
              <Text style={styles.bottom.title}>
                {symbol(base_symbol, styles.bottom.title)}
                <Price symbol={base_symbol}>{current_price}</Price>
              </Text>
            </Shimmer>
            <Shimmer style={{ marginLeft: 15 }} animating={stat_loading}>
              <Text style={styles.bottom.subtitle}>
                <Percentage colorAware={false}>
                  {price_change_percentage_24h}
                </Percentage>
              </Text>
            </Shimmer>
          </View>
          <Shimmer style={{ marginTop: 6 }} animating={stat_loading}>
            <Text style={styles.bottom.content}>
              额(24H) <Amount symbol={base_symbol}>{total_volume}</Amount> |
              最高(24H) {symbol(base_symbol, styles.bottom.content)}
              <Price symbol={base_symbol}>{high_24h}</Price>
            </Text>
          </Shimmer>
        </View>
      ) : (
        <View>
          <Text style={styles.bottom.description} numberOfLines={3}>
            {desc}
          </Text>
        </View>
      )}
    </Animated.View>
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
      marginTop: 6,
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
};

header.defaultProps = {
  loading: false,
};

export default header;
