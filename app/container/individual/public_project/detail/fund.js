import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Price from 'component/price';
import Percentage from 'component/percentage';
import PlaceHolder from 'component/loading_placeholder';

import { symbol } from '../../../../utils/icon';

const fund = props => {
  const roi = R.pathOr([], ['portfolio', 'roi'])(props);
  if (R.isEmpty(roi)) {
    return null;
  }

  const quote = R.path(['quote'])(roi) || 'CNY';
  const name = R.pathOr('--', ['name'])(roi);
  const unit_cost = R.pathOr('--', ['investment', 'unit_cost', quote])(roi);
  const roiValue = R.pathOr('--', ['investment', 'roi', quote, 'value'])(roi);

  return (
    <PlaceHolder
      style={styles.placeholder}
      onReady={!props.loading}
      animate="shine"
    >
      <View style={styles.container}>
        <View style={styles.item.container}>
          <View style={styles.item.bottom.container}>
            <View style={{ flex: 3 }}>
              <Text style={styles.item.bottom.label}>
                成本价
                {'   '}
                {symbol(quote, styles.item.bottom.label)}
                <Price symbol={quote}>{unit_cost}</Price>
              </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.item.bottom.label}>
                回报率
                {'   '}
                <Percentage>{roiValue}</Percentage>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </PlaceHolder>
  );
};

const styles = {
  placeholder: {
    height: 100,
    marginHorizontal: 12,
    marginTop: 12,
  },
  container: {
    paddingBottom: 12,
    marginHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  item: {
    container: {
      height: 30,
      justifyContent: 'center',
      paddingVertical: 5,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
    bottom: {
      container: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
      },
      label: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
      price: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
};

export default fund;
