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
          const selected = currentSymbol === s.symbol;
          return (
            <Touchable key={i} onPress={() => onSelect(s)}>
              <View style={styles.item.container}>
                <View>
                  <Text style={styles.item.title}>{s.symbol}</Text>
                  <Text style={styles.item.subtitle}>{s.market}</Text>
                </View>
                <View>
                  {R.keys(s.current_price).map((k, j) => {
                    const item = s.current_price[k];
                    return (
                      <Text
                        key={j}
                        style={[
                          styles.item.content.normal,
                          selected && styles.item.content.highlight,
                        ]}
                      >
                        {k === 'CNY' && '≈'} <Price symbol={k}>{item}</Price>{' '}
                        {k}
                      </Text>
                    );
                  })}
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
