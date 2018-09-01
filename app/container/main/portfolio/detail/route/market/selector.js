import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Price from 'component/price';
import Arrow from 'component/arrow';

const selector = ({ symbols, currentSymbol, onSelect }) => {
  if (R.isEmpty(symbols)) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <Arrow style={styles.arrow} />
      <ScrollView style={styles.container}>
        {symbols.map((s, i) => {
          const selected = R.equals(currentSymbol, s);
          const anchorSymbol = R.pipe(
            R.pathOr('', ['symbol']),
            R.split('/'),
            R.last,
          )(s);
          const anchorItem = R.pathOr('--', ['current_price', anchorSymbol])(s);
          const cnyItem = R.pathOr('--', ['current_price', 'CNY'])(s);

          return (
            <Touchable key={i} onPress={() => onSelect(s)}>
              <View style={styles.item.container}>
                <View>
                  <Text style={styles.item.title}>{s.symbol}</Text>
                  <Text style={styles.item.subtitle}>{s.market}</Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.item.content.normal,
                      selected && styles.item.content.highlight,
                    ]}
                  >
                    <Price symbol={anchorSymbol}>{anchorItem}</Price>
                  </Text>
                  <Text
                    style={[
                      styles.item.content.normal,
                      selected && styles.item.content.highlight,
                      { marginTop: 4 },
                    ]}
                  >
                    CNY ≈ <Price symbol="CNY">{cnyItem}</Price>
                  </Text>
                </View>
              </View>
            </Touchable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = {
  wrapper: {
    backgroundColor: 'transparent',
    paddingTop: 8,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    maxHeight: 325,
  },
  arrow: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  item: {
    container: {
      height: 50,
      marginHorizontal: 10,
      paddingLeft: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E9E9E9',
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#333333',
    },
    subtitle: {
      fontSize: 12,
      color: '#999999',
      marginTop: 4,
    },
    content: {
      normal: {
        color: '#666666',
        fontSize: 12,
        textAlign: 'right',
      },
      highlight: {
        fontWeight: 'bold',
        color: '#1890FF',
      },
    },
  },
};

selector.propTypes = {
  symbols: PropTypes.array,
};

export default selector;
