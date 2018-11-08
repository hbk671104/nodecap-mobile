import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

const categoryItem = ({ data, onPress }) => {
  const category = R.pathOr('--', ['name'])(data);
  const heat = R.pathOr('--', ['indexes', 'heat'])(data);
  const heat_change_percentage = R.pathOr(0, [
    'indexes',
    'heat_change_percentage',
  ])(data);

  const minus = heat_change_percentage < 0;

  return (
    <Touchable disabled onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{category}</Text>
          <Text style={styles.subtitle}>
            {heat}
            {'  '}
            <Text style={[styles.heat, minus && { color: '#F55454' }]}>
              {minus
                ? `${heat_change_percentage}`
                : `+${heat_change_percentage}`}
              %
            </Text>
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    height: 100,
    width: (Dimensions.get('window').width - 12 * 3) / 2,
    marginLeft: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderColor: '#ECECEC',
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 24,
    fontSize: 22,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  heat: {
    fontSize: 12,
    color: '#09AC32',
    fontWeight: 'normal',
  },
};

export default categoryItem;
