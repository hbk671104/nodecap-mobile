import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import FavorItem from 'component/favored/item';
import Group from './group';

const middle = ({ data }) => (
  <Group title="精选项目">
    <View style={styles.bottom.container}>
      <Text style={styles.bottom.subtitle}>为您找到 1111 个项目</Text>
      <Touchable borderless>
        <Text style={styles.bottom.filter}>
          查看全部 <Icon name="ios-arrow-forward" override />
        </Text>
      </Touchable>
    </View>
    <View>
      {R.pipe(
        R.take(5),
        R.addIndex(R.map)((d, i) => (
          <View key={d.id}>
            {i !== 0 && <View style={styles.separator} />}
            <FavorItem data={d} />
          </View>
        )),
      )(data)}
    </View>
  </Group>
);

const styles = {
  bottom: {
    container: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingBottom: 8,
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
    },
    filter: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginLeft: 78,
  },
};

export default middle;
