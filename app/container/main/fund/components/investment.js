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
          {...styles.pie.item}
          colorScale={['#3A9CF7', '#F69038']}
          data={[{ y: 39 }, { y: 23 }]}
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
          {...styles.pie.item}
          colorScale={['#F69038', '#3A9CF7', '#36C35A']}
          data={[{ y: 17 }, { y: 32 }, { y: 14 }]}
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
    item: {
      height: 42,
      width: 42,
      padding: 0,
      padAngle: 3,
      innerRadius: 8,
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
