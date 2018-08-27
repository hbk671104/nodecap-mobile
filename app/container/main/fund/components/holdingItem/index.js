import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Format from 'component/format';
import Amount from 'component/amount';

const holdingItem = ({ item, noBottomBorder }) => {
  const symbol = R.pathOr('--', ['symbol'])(item);
  const count = R.pathOr('--', ['count'])(item);
  const ratio = R.pathOr('', ['ratio'])(item);
  const invest_symbol = R.pathOr('--', ['invest_symbol'])(item);
  const valuation = R.pathOr('', ['valuation', invest_symbol])(item);
  const valuation_cny = R.pathOr('', ['valuation', 'CNY'])(item);
  return (
    <View
      style={[styles.container, noBottomBorder && { borderBottomWidth: 0 }]}
    >
      <View style={{ flex: 4 }}>
        <Text style={styles.title}>{symbol}</Text>
        <Text style={[styles.content, { marginTop: 3 }]}>
          x <Format digit={0}>{count}</Format>
        </Text>
      </View>
      <View style={{ flex: 5 }}>
        {R.isEmpty(valuation) || R.empty(valuation_cny) ? (
          <Text style={styles.content}>未上所</Text>
        ) : (
          <View>
            <Text style={styles.subtitle}>
              <Format digit={1}>{valuation}</Format> {invest_symbol}
            </Text>
            <Text style={[styles.content, { marginTop: 3 }]}>
              约 <Amount>{valuation_cny}</Amount>元
            </Text>
          </View>
        )}
      </View>
      <View style={{ flex: 2, alignItems: 'flex-end' }}>
        {R.isEmpty(ratio) ? (
          <Text style={styles.content}>-</Text>
        ) : (
          <Text style={styles.subtitle}>
            <Format>{ratio}</Format>%
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 12,
    paddingRight: 12,
  },
  group: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.45)',
  },
};

holdingItem.propTypes = {
  item: PropTypes.object,
  noBottomBorder: PropTypes.bool,
};

holdingItem.defaultProps = {
  noBottomBorder: false,
};

export default holdingItem;
