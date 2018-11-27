import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const item = ({ disabled = false, data, renderBadge, onPress }) => (
  <Touchable disabled={disabled} foreground onPress={onPress}>
    <Flex style={styles.container}>
      <Avatar
        raised={false}
        style={styles.avatar}
        imageStyle={styles.avatar}
        size={52}
        innerRatio={1}
      />
      <View style={styles.content.container}>
        <Flex>
          <View style={{ flex: 1 }}>
            <Text style={styles.content.name}>
              Yemu Xu
              <Text style={{ color: '#E9E9E9', fontWeight: 'normal' }}>
                {' '}
                |{' '}
              </Text>
              <Text style={styles.content.from}>Zilliqa</Text>
            </Text>
          </View>
          <Text style={styles.content.time}>09:12</Text>
        </Flex>
        <Flex style={styles.bottom}>
          <View style={{ flex: 1 }}>
            <Text style={styles.content.text}>闷声发大财，识得唔识得？</Text>
          </View>
          {renderBadge && renderBadge()}
        </Flex>
      </View>
    </Flex>
  </Touchable>
);

const styles = {
  container: {
    padding: 12,
  },
  avatar: {
    borderRadius: 1,
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    from: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
      fontWeight: 'normal',
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
    },
    time: {
      fontSize: 11,
      color: 'rgba(0, 0, 0, 0.25)',
    },
  },
  bottom: {
    marginTop: 12,
  },
};

export default item;
