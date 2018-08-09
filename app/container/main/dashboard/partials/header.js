import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { View, Animated } from 'react-native';
import Shimmer from 'react-native-shimmer';

import Format from 'component/format';
import Text from 'component/text';

const header = ({ style, dashboard, loading }) => {
  const ROI = R.path(['ROI', 'CNY'])(dashboard);
  const ROIUSD = R.path(['ROI', 'USD'])(dashboard);
  const ROIBTC = R.path(['ROI', 'BTC'])(dashboard);
  const ROIETH = R.path(['ROI', 'ETH'])(dashboard);
  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>投资回报率</Text>
        <Shimmer style={{ marginTop: 12 }} animating={loading}>
          <Text style={[styles.title]}>
            <Format>{ROIETH}</Format>
            % <Text style={{ fontSize: 13 }}>ETH</Text>
          </Text>
        </Shimmer>
      </View>
      <View style={styles.bottom}>
        <Shimmer animating={loading}>
          <Text style={styles.subtitle}>
            <Format>{ROIBTC}</Format>
            % BTC
          </Text>
        </Shimmer>
        <Text style={styles.subtitle}>
          {'  '}|{'  '}
        </Text>
        <Shimmer animating={loading}>
          <Text style={styles.subtitle}>
            <Format>{ROI}</Format>
            % CNY
          </Text>
        </Shimmer>
        <Text style={styles.subtitle}>
          {'  '}|{'  '}
        </Text>
        <Shimmer animating={loading}>
          <Text style={styles.subtitle}>
            <Format>{ROIUSD}</Format>
            % USD
          </Text>
        </Shimmer>
      </View>
    </Animated.View>
  );
};

const styles = {
  container: {
    marginTop: 60,
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
  },
  bottom: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
  title: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(8, 112, 199, 0.27)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
};

header.propTypes = {
  data: PropTypes.object,
};

export default header;
