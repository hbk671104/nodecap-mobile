import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import Group from './group';
import { shadow } from '../../../../utils/style';
import Gradient from 'component/uikit/gradient';

const window = Dimensions.get('window');
const expectationList = [
  {
    name: '铁头看多',
    icon: require('asset/public_project/expectation_01.png'),
  },
  {
    name: '一般看多',
    icon: require('asset/public_project/expectation_02.png'),
  },
  {
    name: '佛系持平',
    icon: require('asset/public_project/expectation_03.png'),
  },
  {
    name: '一般看空',
    icon: require('asset/public_project/expectation_04.png'),
  },
  {
    name: '大空头',
    icon: require('asset/public_project/expectation_05.png'),
  },
];

const sentimentList = [
  {
    name: '宁静',
    icon: require('asset/public_project/sentiment_01.png'),
  },
  {
    name: '还行',
    icon: require('asset/public_project/sentiment_02.png'),
  },
  {
    name: '紧张',
    icon: require('asset/public_project/sentiment_03.png'),
  },
  {
    name: '恐惧',
    icon: require('asset/public_project/sentiment_04.png'),
  },
  {
    name: '窒息',
    icon: require('asset/public_project/sentiment_05.png'),
  },
];

const emotionIndex = ({
  market_sentiment: data,
  onTitlePress,
  onMoreIndexPress,
}) => {
  const expectation = Math.floor(R.pathOr(0, ['expectation'])(data) * 100);
  const sentiment = Math.floor(R.pathOr(0, ['sentiment'])(data) * 100);
  const expectationPosition =
    (window.width - 24) * R.pathOr(0, ['expectation'])(data) - 22;
  const sentimentPosition =
    (window.width - 24) * R.pathOr(0, ['sentiment'])(data) - 22;
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
      <View style={{ marginHorizontal: 12, marginTop: 20 }}>
        <View
          style={[
            styles.ratingName,
            { marginLeft: expectationPosition, marginHorizontal: -10 },
          ]}
        >
          <Text style={styles.ratingText}>{`${expectation}%`}</Text>
          <View style={styles.ratingArrow} />
        </View>
        <Gradient
          colors={['#D0DFED', '#7E99B3']}
          start={{ x: 0, y: 2.5 }}
          end={{ x: 1.0, y: 2.5 }}
        >
          <Flex style={{ height: 5 }}>
            {R.addIndex(R.map)((i, index) => (
              <View key={`${index}`} style={styles.divider} />
            ))(expectationList)}
          </Flex>
        </Gradient>
        <Flex style={{ marginTop: 14 }}>
          {expectationList.map((i, index) => (
            <View key={`${index}`} style={{ flex: 1, alignItems: 'center' }}>
              <Image source={i.icon} />
              <Text style={styles.name}>{i.name}</Text>
            </View>
          ))}
        </Flex>
      </View>
      <View
        style={{
          marginHorizontal: 12,
          marginTop: 47.5,
          marginBottom: 20,
        }}
      >
        <View
          style={[
            styles.ratingName,
            {
              marginLeft: sentimentPosition,
              marginHorizontal: -10,
              backgroundColor: '#F4AEAE',
            },
          ]}
        >
          <Text style={styles.ratingText}>{`${sentiment}%`}</Text>
          <View style={[styles.ratingArrow, { backgroundColor: '#F4AEAE' }]} />
        </View>
        <Gradient
          colors={['#F4CBCB', '#F55454']}
          start={{ x: 0, y: 2.5 }}
          end={{ x: 1.0, y: 2.5 }}
        >
          <Flex style={{ height: 5 }}>
            {R.addIndex(R.map)((i, index) => (
              <View key={`${index}`} style={styles.divider} />
            ))(sentimentList)}
          </Flex>
        </Gradient>
        <Flex style={{ marginTop: 14 }}>
          {sentimentList.map((i, index) => (
            <View key={`${index}`} style={{ flex: 1, alignItems: 'center' }}>
              <Image source={i.icon} />
              <Text style={styles.name}>{i.name}</Text>
            </View>
          ))}
        </Flex>
      </View>
    </Group>
  );
};

const styles = {
  divider: {
    flex: 1,
    borderRightColor: 'white',
    borderRightWidth: 1,
    height: 5,
  },
  name: {
    marginTop: 5,
    fontSize: 11,
    color: 'rgba(0,0,0,0.45)',
    letterSpacing: 0.13,
  },
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
  ratingName: {
    height: 15,
    paddingHorizontal: 8,
    backgroundColor: '#ACC1D4',
    borderRadius: 2,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ratingText: {
    color: 'white',
    fontSize: 11,
    zIndex: 10,
    ...shadow,
  },
  ratingArrow: {
    width: 8,
    height: 8,
    backgroundColor: '#ACC1D4',
    borderRadius: 1,
    transform: [{ rotateZ: '45deg' }],
    zIndex: 0,
    marginTop: -5.5,
  },
};

export default emotionIndex;
