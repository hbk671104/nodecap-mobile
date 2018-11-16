import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import R from 'ramda';
import SVG, { Path } from 'react-native-svg';
import { Flex } from 'antd-mobile';

import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';
import { describeArc } from 'utils/svg';

const avatar_group = ({ data, onExplanationPress }) => {
  const logo = R.pathOr('', ['icon'])(data);
  const score = R.pathOr(0, ['score'])(data);
  const score_distribution = R.pathOr(0, ['score_distribution'])(data);

  const baseAngle = 130;
  return (
    <View style={styles.container}>
      <View style={styles.svg.wrapper}>
        <Avatar size={54} innerRatio={0.8} source={{ uri: logo }} />
        <SVG style={styles.svg.container}>
          <Path
            d={describeArc(34, 34, 32.5, -baseAngle, baseAngle)}
            fill="none"
            stroke="#007CEF"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Path
            d={describeArc(
              34,
              34,
              32.5,
              -baseAngle,
              (score / 50 - 1) * baseAngle,
            )}
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </SVG>
      </View>
      <Touchable borderless onPress={onExplanationPress}>
        <View style={styles.title.container}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.title.text, score >= 100 && { fontSize: 20 }]}>
              {score}
            </Text>
          </View>
          <View
            style={[
              styles.title.right.container,
              score >= 100 && { marginBottom: 4, right: 0 },
            ]}
          >
            <Flex align="center">
              <Text style={{ fontSize: 11, color: 'white' }}>分</Text>
              <Image
                style={{ marginLeft: 3 }}
                source={require('asset/public_project/explanation.png')}
              />
            </Flex>
          </View>
        </View>
      </Touchable>
      <View style={styles.subtitle.container}>
        <Text style={styles.subtitle.text}>
          已超过 {score_distribution}% 项目方
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginBottom: 8,
  },
  title: {
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    text: {
      color: 'white',
      fontSize: 23,
      fontWeight: 'bold',
    },
    right: {
      container: {
        position: 'absolute',
        right: 3,
        top: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        marginBottom: 6,
      },
    },
  },
  subtitle: {
    container: { marginTop: 4 },
    text: {
      color: 'white',
      fontSize: 10,
    },
  },
  svg: {
    wrapper: {
      height: 68,
      width: 68,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    container: {
      ...StyleSheet.absoluteFillObject,
    },
  },
};

export default avatar_group;
