import React from 'react';
import { View, Text, Image } from 'react-native';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import Group from './group';

const emotionIndex = ({ data, onTitlePress, onMoreIndexPress }) => {
  return (
    <Group
      renderTitle={() => (
        <Touchable borderless onPress={onTitlePress}>
          <View style={styles.title.container}>
            <Text style={styles.title.text}>市场情绪</Text>
            <Image
              style={styles.title.image}
              source={require('asset/explaination.png')}
            />
          </View>
        </Touchable>
      )}
      renderRight={() => (
        <Touchable borderless onPress={onMoreIndexPress}>
          <Text style={styles.moreIndex}>
            查看更多指数 <Icon name="arrow-forward" />
          </Text>
        </Touchable>
      )}
    >
      <View style={styles.content.container}>
        <View style={styles.content.long.container}>
          <Text style={styles.content.text}>看多</Text>
        </View>
        <Image source={require('asset/splitter.png')} />
        <View style={styles.content.short.container}>
          <Text style={styles.content.text}>看空</Text>
        </View>
      </View>
    </Group>
  );
};

const styles = {
  title: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    image: {
      marginLeft: 4,
    },
  },
  moreIndex: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    container: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingTop: 24,
      paddingBottom: 20,
    },
    long: {
      container: {
        flex: 1,
        backgroundColor: '#1890FF',
        height: 28,
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
      },
      textContainer: {},
    },
    short: {
      container: {
        flex: 1,
        backgroundColor: '#FA7C0D',
        height: 28,
        justifyContent: 'center',
        paddingHorizontal: 8,
        alignItems: 'flex-end',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
      },
      textContainer: {},
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 10,
    },
  },
};

export default emotionIndex;
