import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import R from 'ramda';
import Accounting from 'accounting';
import Touchable from 'component/uikit/touchable';
import Text from 'component/text';
import Price from 'component/price';

import { medalMap } from '../../../utils/style';
import styles from './style';

const priceChangeItem = ({ item, index, onPress }) => {
  const stat = R.path(['statistics'])(item);
  const investment = R.path(['investment'])(stat);
  const roi = R.path(['roi', 'CNY', 'value'])(investment);
  const unitCost = R.path(['unit_cost', 'CNY'])(investment);
  const price = R.path(['current_price', 'CNY'])(stat);
  const ratio = price / unitCost > 1 ? price / unitCost : -unitCost / price;

  const nameLength = item.name.length || 0;
  return (
    <Touchable style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.left.container}>
          <View style={styles.left.group}>
            {!!item.logo_url && (
              <View style={styles.left.logo.container}>
                <Image
                  resizeMode="contain"
                  style={styles.left.logo.image}
                  source={{ uri: item.logo_url }}
                />
              </View>
            )}
            <View style={styles.left.title.container}>
              <Text
                style={[
                  styles.left.title.text,
                  nameLength >= 11 && { fontSize: 13 },
                ]}
              >
                {item.name}
              </Text>
              {!!item.token_name && (
                <Text style={styles.left.subtitle}>({item.token_name})</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.middle.container}>
          <Text style={styles.middle.title}>
            ￥<Price symbol="CNY">{price}</Price>
          </Text>
          <Text style={styles.middle.label}>
            成本{'  '}
            <Text style={styles.middle.content}>
              ￥<Price symbol="CNY">{unitCost}</Price>
            </Text>
          </Text>
          <Text style={[styles.middle.roi, ratio < 0 && { color: '#F5222D' }]}>
            {Accounting.formatNumber(ratio, 1)}倍{' '}
            <Image
              source={
                ratio < 0
                  ? require('asset/item/down.png')
                  : require('asset/item/up.png')
              }
            />
          </Text>
        </View>
        <View style={styles.right.container}>
          <View
            style={[
              styles.right.wrapper,
              roi < 0 && { backgroundColor: '#F5222D' },
            ]}
          >
            <Text
              style={[
                styles.right.title,
                Math.abs(roi) > 10 && { fontSize: 11 },
                Math.abs(roi) > 100 && { fontSize: 10 },
                Math.abs(roi) > 1000 && { fontSize: 9 },
              ]}
            >
              <Text digit={2}>{roi}</Text>%
            </Text>
          </View>
        </View>
        <View style={styles.ranking.container}>{medalMap(index)}</View>
      </View>
    </Touchable>
  );
};

priceChangeItem.propTypes = {
  item: PropTypes.object,
};

export default priceChangeItem;
