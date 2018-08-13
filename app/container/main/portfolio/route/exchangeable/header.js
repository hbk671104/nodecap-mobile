import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native';

import NodeCapIcon from 'component/icon/nodecap';
import Touchable from 'component/uikit/touchable';
import Gradient from 'component/uikit/gradient';

const header = ({ activeTab, goToPage }) => (
  <View style={styles.container}>
    <Touchable borderless onPress={() => goToPage(0)}>
      <View style={styles.group.container}>
        {activeTab === 0 ? (
          <Gradient
            style={[styles.group.top, { borderWidth: 0, overflow: 'hidden' }]}
          >
            <NodeCapIcon name="qianbi" size={16} color="white" />
          </Gradient>
        ) : (
          <View style={styles.group.top}>
            <NodeCapIcon name="qianbi" size={16} color="#1890FF" />
          </View>
        )}
        <Text
          style={[styles.group.title, activeTab === 0 && { color: '#333333' }]}
        >
          盈余榜
        </Text>
      </View>
    </Touchable>
    <Touchable borderless onPress={() => goToPage(1)}>
      <View style={styles.group.container}>
        {activeTab === 1 ? (
          <Gradient
            style={[styles.group.top, { borderWidth: 0, overflow: 'hidden' }]}
          >
            <NodeCapIcon name="bingtu" size={16} color="white" />
          </Gradient>
        ) : (
          <View style={styles.group.top}>
            <NodeCapIcon name="bingtu" size={16} color="#1890FF" />
          </View>
        )}
        <Text
          style={[styles.group.title, activeTab === 1 && { color: '#333333' }]}
        >
          回报率榜
        </Text>
      </View>
    </Touchable>
    <Touchable borderless onPress={() => goToPage(2)}>
      <View style={styles.group.container}>
        {activeTab === 2 ? (
          <Gradient
            style={[styles.group.top, { borderWidth: 0, overflow: 'hidden' }]}
          >
            <NodeCapIcon name="qushi" size={14} color="white" />
          </Gradient>
        ) : (
          <View style={styles.group.top}>
            <NodeCapIcon name="qushi" size={14} color="#1890FF" />
          </View>
        )}
        <Text
          style={[styles.group.title, activeTab === 2 && { color: '#333333' }]}
        >
          涨跌榜
        </Text>
      </View>
    </Touchable>
    <Touchable borderless onPress={() => goToPage(3)}>
      <View style={styles.group.container}>
        {activeTab === 3 ? (
          <Gradient
            style={[styles.group.top, { borderWidth: 0, overflow: 'hidden' }]}
          >
            <NodeCapIcon name="investment" size={14} color="white" />
          </Gradient>
        ) : (
          <View style={styles.group.top}>
            <NodeCapIcon name="investment" size={14} color="#1890FF" />
          </View>
        )}
        <Text
          style={[styles.group.title, activeTab === 3 && { color: '#333333' }]}
        >
          投资榜
        </Text>
      </View>
    </Touchable>
  </View>
);

header.propTypes = {
  activeTab: PropTypes.number,
  goToPage: PropTypes.func,
};

const styles = {
  container: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  group: {
    container: {
      alignItems: 'center',
    },
    top: {
      height: 41,
      width: 41,
      borderRadius: 20.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#1890FF',
    },
    title: {
      fontSize: 12,
      color: '#999999',
      marginTop: 7,
    },
  },
};

export default header;
