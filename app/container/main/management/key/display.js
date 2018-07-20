import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from 'component/uikit/touchable';

const display = ({ setModalVisible, currentItem }) => (
  <View style={styles.container}>
    <View style={styles.top.container}>
      <View>
        <Text style={styles.top.title}>{currentItem.name}</Text>
      </View>
      <View style={styles.top.wrapper}>
        {!!currentItem.address && (
          <View style={styles.top.group.container}>
            <Text style={styles.top.group.title}>Address</Text>
            <Text style={styles.top.group.content}>{currentItem.address}</Text>
          </View>
        )}
        {!!currentItem.apiKey && (
          <View style={styles.top.group.container}>
            <Text style={styles.top.group.title}>API Key</Text>
            <Text style={styles.top.group.content}>{currentItem.apiKey}</Text>
          </View>
        )}
        {!!currentItem.secretKey && (
          <View style={styles.top.group.container}>
            <Text style={styles.top.group.title}>Secret Key</Text>
            <Text style={styles.top.group.content}>
              {currentItem.secretKey}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.top.tip}>
        {'提示：\n上述数据已加密存储在设备本地，不会上传到我们的服务器'}
      </Text>
    </View>
    <Touchable
      style={styles.bottom.container}
      onPress={() => setModalVisible(false)}
    >
      <Text style={styles.bottom.title}>好 的</Text>
    </Touchable>
  </View>
);

const styles = {
  container: {
    backgroundColor: 'white',
    width: 260,
    borderRadius: 2,
    alignSelf: 'center',
  },
  top: {
    container: {
      padding: 24,
      paddingBottom: 18,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 16,
      fontWeight: 'bold',
    },
    wrapper: {
      marginVertical: 16,
    },
    group: {
      container: {
        marginVertical: 8,
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.85)',
      },
      content: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
        marginTop: 8,
      },
    },
    tip: {
      fontSize: 11,
      color: 'rgba(0, 0, 0, 0.45)',
      lineHeight: 16,
    },
  },
  bottom: {
    container: {
      height: 44,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E9E9E9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#1890FF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
};

export default display;
