import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import R from 'ramda';
import Accounting from 'accounting';
import Touchable from 'component/uikit/touchable';
import Text from 'component/text';
import Amount from 'component/amount';
import Price from 'component/price';

import { medalMap } from '../../../utils/style';
import styles from './style';

const projectItem = ({ item, index, onPress }) => {
  const stat = R.path(['statistics'])(item);
  const investment = R.path(['investment'])(stat);
  const profit = R.path(['profits', 'ETH'])(investment);
  const cost = R.path(['total_cost', 'ETH'])(investment);
  const roi = R.path(['roi', 'ETH', 'value'])(investment);
  const unitCost = R.path(['unit_cost', 'ETH'])(investment);
  const price = R.path(['current_price', 'ETH'])(stat);
  const ratio = price / unitCost > 1 ? price / unitCost : -unitCost / price;

  return (
    <Touchable style={styles.container} onPress={onPress}>
      <View>
        <View style={styles.top.container}>
          <View style={styles.top.group}>
            {!!item.logo_url && (
              <View style={styles.top.logo.container}>
                <Image
                  resizeMode="contain"
                  style={styles.top.logo.image}
                  source={{ uri: item.logo_url }}
                />
              </View>
            )}
            <Text style={styles.top.title}>
              {item.name}{' '}
              {!!item.token_name && (
                <Text style={styles.top.subtitle}>({item.token_name})</Text>
              )}
            </Text>
          </View>
          {medalMap(index)}
        </View>
        <View style={styles.middle.container}>
          <View style={{ flex: 7 }}>
            <Text style={styles.middle.title}>浮动盈余</Text>
            <Text style={[styles.middle.content, { fontSize: 24 }]}>
              <Text colorAware>{profit}</Text>{' '}
              <Text
                style={[
                  styles.middle.subtitle,
                  profit < 0 ? styles.middle.down : styles.middle.up,
                ]}
              >
                ETH
              </Text>
            </Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.middle.title}>回报率</Text>
            <Text style={[styles.middle.content, { fontSize: 18 }]}>
              <Text colorAware digit={2}>
                {roi}
              </Text>
              <Text style={profit < 0 ? styles.middle.down : styles.middle.up}>
                %
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.bottom.container}>
          <View style={styles.bottom.group}>
            <Text style={styles.bottom.title}>投资金额</Text>
            <Text style={styles.bottom.content}>
              <Amount disableFormatting>{cost}</Amount> ETH
            </Text>
          </View>
          <View style={styles.bottom.group}>
            <Text style={styles.bottom.title}>成本价/市价</Text>
            <Text style={styles.bottom.content}>
              <Price symbol="ETH">{unitCost}</Price> /{' '}
              <Price symbol="ETH">{price}</Price>
            </Text>
            <View
              style={[
                styles.bottom.label.container,
                styles.bottom.label.up,
                ratio < 0 && styles.bottom.label.down,
              ]}
            >
              <Text style={styles.bottom.label.title}>
                {Accounting.formatNumber(ratio, 1)}倍
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

projectItem.propTypes = {
  item: PropTypes.any,
};

export default projectItem;
