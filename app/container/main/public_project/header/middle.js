import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import Placeholder from 'rn-placeholder';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import FavorItem from 'component/favored/item';
import Group from './group';

let manualRefresh = false;

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
            manualRefresh = true;
            onRefreshProject();
          }
        }}
      >
        <Flex>
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
          <View key={`${i}`}>
            {i !== 0 && <View style={styles.separator} />}
            <View
              style={{ padding: selectedLoading && !manualRefresh ? 12 : 0 }}
            >
              <Placeholder.ImageContent
                size={52}
                animate="fade"
                lineNumber={3}
                lineSpacing={8}
                onReady={!selectedLoading || manualRefresh}
              >
                <FavorItem data={d} />
              </Placeholder.ImageContent>
            </View>
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
