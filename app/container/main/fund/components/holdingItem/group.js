import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Format from 'component/format';
import Amount from 'component/amount';

const group = ({ title, item, children }) => {
  const ratio = R.pathOr('--', ['ratio'])(item);
  const invest_symbol = R.pathOr('--', ['invest_symbol'])(item);
  const valuation = R.pathOr('--', ['valuation', invest_symbol])(item);
  const valuation_cny = R.pathOr('--', ['valuation', 'CNY'])(item);
  return (
    <View style={styles.container}>
      <View style={styles.bar.container}>
        <View style={{ flex: 3 }}>
          <Text style={styles.bar.title}>{title}</Text>
        </View>
        {!!item && (
          <View style={{ flex: 3 }}>
            <Text style={styles.bar.subtitle}>
              <Format>{valuation}</Format> {invest_symbol}
            </Text>
            <Text style={[styles.bar.content, { marginTop: 3 }]}>
              约 <Amount>{valuation_cny}</Amount>元
            </Text>
          </View>
        )}
        {!!item && (
          <View style={{ flex: 2, alignItems: 'flex-end' }}>
            <Text style={styles.bar.content}>占总量</Text>
            <Text style={[styles.bar.subtitle, { marginTop: 3 }]}>
              <Format>{ratio}</Format>%
            </Text>
          </View>
        )}
      </View>
      {children}
    </View>
  );
};

group.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.object,
};

const styles = {
  container: {},
  bar: {
    container: {
      height: 45,
      backgroundColor: '#F0F0F0',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#BDBDBD',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#D5D5D5',
    },
    title: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
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
  },
};

export default group;
