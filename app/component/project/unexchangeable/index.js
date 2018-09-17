import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import Price from 'component/price';
import StatusDisplay from '../statusDisplay';

import moment from 'moment';
import styles from './style';

const unexchangeableItem = ({ item, onPress }) => (
  <Touchable style={styles.container} onPress={onPress}>
    <View>
      <View style={styles.top.container}>
        <View style={styles.top.group}>
          <Avatar source={{ uri: item.logo_url }} />
          <View style={styles.top.title.container}>
            <Text style={styles.top.title.text}>
              {item.name}
              {'  '}
              {!!item.token_name && (
                <Text style={{ fontSize: 13 }}>({item.token_name})</Text>
              )}
            </Text>
          </View>
        </View>
        <View>
          <StatusDisplay status={item.status} />
        </View>
      </View>
      <View style={styles.bottom.container}>
        {!!item.unit_cost && (
          <Text style={[styles.bottom.content, { marginBottom: 14 }]}>
            成本价：
            <Price symbol="ETH">{item.unit_cost.ETH}</Price> ETH ≈{' '}
            <Price symbol="CNY">{item.unit_cost.CNY}</Price> CNY
          </Text>
        )}
        <View style={styles.bottom.contentContainer}>
          <View>
            <Text style={styles.bottom.content}>
              项目来源：
              {item.source || '未收录'}
            </Text>
            <Text style={[styles.bottom.content, { marginTop: 7 }]}>
              跟进人：
              {item.watch_user || '未收录'}
            </Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={styles.bottom.content}>
              {moment(item.created_at).format('LL')} 录入
            </Text>
          </View>
        </View>
      </View>
    </View>
  </Touchable>
);

unexchangeableItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

unexchangeableItem.defaultProps = {
  onPress: () => null,
};

export default unexchangeableItem;
