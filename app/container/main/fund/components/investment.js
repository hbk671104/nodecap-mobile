import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';

const item = ({ style, title, subtitle }) => (
  <View style={[styles.item.container, style]}>
    <View style={styles.item.indicator} />
    <Text style={styles.item.title}>
      {title}
      {'   '}
      <Text style={styles.item.subtitle}>{subtitle}</Text>
    </Text>
  </View>
);

const investment = props => (
  <View style={styles.container}>
    <View style={styles.group}>
      <View style={styles.item.group}>
        {item({ title: '已上所', subtitle: '39' })}
        {item({ title: '未上所', subtitle: '23' })}
      </View>
      <View style={styles.pie.container}>
        <VictoryPie
          width={42}
          height={42}
          padding={0}
          padAngle={2}
          innerRadius={8}
          data={[{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }]}
        />
      </View>
    </View>
    <View style={styles.divider} />
    <View style={[styles.group, { paddingLeft: 24 }]}>
      <View style={styles.item.group}>
        {item({ title: '未出货', subtitle: '17' })}
        {item({ title: '部分出货', subtitle: '32' })}
        {item({ title: '完全出货', subtitle: '14' })}
      </View>
      <View style={styles.pie.container}>
        <VictoryPie
          width={42}
          height={42}
          padding={0}
          padAngle={2}
          innerRadius={8}
          data={[{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }]}
        />
      </View>
    </View>
  </View>
);

const styles = {
  container: {
    height: 64,
    flexDirection: 'row',
  },
  group: {
    flex: 1,
    flexDirection: 'row',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
  },
  pie: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  item: {
    group: {
      justifyContent: 'space-around',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    indicator: {
      width: 2.5,
      height: 12,
      backgroundColor: 'red',
      marginRight: 9,
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
};

investment.propTypes = {
  data: PropTypes.object,
};

export default investment;
