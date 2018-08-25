import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import Format from 'component/format';

const summary = ({ overall }) => {
  const symbol = R.pathOr('-', ['symbol'])(overall);
  const invested = R.pathOr('--', ['invested_count'])(overall);
  const rest = R.pathOr('--', ['rest_count'])(overall);
  return (
    <View style={styles.container}>
      <View style={styles.top.container}>
        <View>
          <Text style={styles.top.title}>累计投资</Text>
          <Text style={[styles.top.subtitle, { marginTop: 4 }]}>
            <Format digit={0}>{invested}</Format> {symbol}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.top.title}>剩余可投</Text>
          <Text style={[styles.top.subtitle, { marginTop: 4 }]}>
            <Format digit={0}>{rest}</Format> {symbol}
          </Text>
        </View>
      </View>
      {/* {invested !== '--' &&
        rest !== '--' && (
          <View style={styles.bottom.container}>
            <View style={styles.bottom.bar.container}>
              <View
                style={[
                  styles.bottom.bar.invested,
                  { flex: parseInt(invested, 10) },
                ]}
              />
              <View
                style={[styles.bottom.bar.rest, { flex: parseInt(rest, 10) }]}
              />
            </View>
          </View>
        )} */}
    </View>
  );
};

const styles = {
  container: {},
  top: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
    },
    subtitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },
  bottom: {
    container: {
      marginTop: 9.5,
    },
    bar: {
      container: {
        flexDirection: 'row',
        height: 5,
      },
      invested: {
        backgroundColor: '#0090FF',
      },
      rest: {
        backgroundColor: 'rgba(0, 144, 255, 0.4)',
      },
    },
  },
};

summary.propTypes = {
  data: PropTypes.object,
};

export default summary;
