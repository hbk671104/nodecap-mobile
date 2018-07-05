import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import R from 'ramda';
import Accounting from 'accounting';
import Touchable from 'component/uikit/touchable';
import Text from 'component/text';

import { medalMap } from '../../../utils/style';
import styles from './style';

const investmentItem = ({ item, index, onPress }) => {
  const stat = R.path(['statistics'])(item);
  const investment = R.path(['investment'])(stat);
  const profit = R.path(['profits', 'CNY'])(investment);
  const cost = R.path(['total_cost', 'CNY'])(investment);

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
                  nameLength >= 11 && { fontSize: 14 },
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
          <Text style={styles.middle.label}>投资金额</Text>
          <Text style={[styles.middle.title, { marginTop: 2 }]}>
            ¥{Accounting.formatNumber(cost)}
          </Text>
          <Text style={[styles.middle.label, { marginTop: 3 }]}>
            <Text>{profit}</Text>
            <Text>{'  '}浮动盈余</Text>
          </Text>
        </View>
        <View style={styles.ranking.container}>{medalMap(index)}</View>
      </View>
    </Touchable>
  );
};

investmentItem.propTypes = {
  item: PropTypes.object,
};

export default investmentItem;
