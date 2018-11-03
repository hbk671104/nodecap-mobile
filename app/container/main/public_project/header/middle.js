import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import R from 'ramda';
import { Flex, ActivityIndicator } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import FavorItem from 'component/favored/item';
import Group from './group';

const middle = ({
  data,
  pagination,
  onProjectRepoPress,
  onRefreshProject,
  selectedLoading,
}) => (
  <Group
    renderTitle={() => (
      <Touchable borderless onPress={onProjectRepoPress}>
        <Flex align="center">
          <Text
            style={{
              fontSize: 16,
              color: 'rgba(0, 0, 0, 0.85)',
              fontWeight: 'bold',
            }}
          >
            精选项目
          </Text>
          <Icon
            style={{ fontSize: 16, marginLeft: 5 }}
            name="ios-arrow-forward"
            override
          />
        </Flex>
      </Touchable>
    )}
  >
    <View style={styles.bottom.container}>
      <Text style={styles.bottom.subtitle}>
        为您找到 {R.pathOr(0, ['total'])(pagination)} 个项目
      </Text>
      <Touchable
        borderless
        onPress={() => {
          if (!selectedLoading) {
            onRefreshProject();
          }
        }}
      >
        <Flex style={{ marginTop: -20 }}>
          <Image
            style={{
              marginRight: 5,
              transform: [{ rotateZ: '45deg' }],
            }}
            source={require('asset/project/switch.png')}
          />
          <Text style={styles.bottom.filter}>
            {selectedLoading ? '刷新中...' : '换一批'}
          </Text>
        </Flex>
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingBottom: 8,
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
      marginTop: 6,
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
