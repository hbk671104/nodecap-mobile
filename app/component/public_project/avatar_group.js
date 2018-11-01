import React from 'react';
import { View, Image, Text } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';

const avatar_group = ({ data, onExplanationPress }) => {
  const logo = R.pathOr('', ['icon'])(data);
  const score = R.pathOr(0, ['score'])(data);
  const score_distribution = R.pathOr(0, ['score_distribution'])(data);
  return (
    <View style={styles.container}>
      <Avatar size={57} innerRatio={0.8} source={{ uri: logo }} />
      <Touchable borderless onPress={onExplanationPress}>
        <View style={styles.title.container}>
          <Text style={styles.title.text}>项目得分：</Text>
          <View style={styles.title.score.container}>
            <Text style={[styles.title.text, { color: '#1890FF' }]}>
              {score}
            </Text>
          </View>
          <Image source={require('asset/public_project/explanation.png')} />
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
    alignItems: 'center',
  },
  title: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    text: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
    score: {
      container: {
        borderRadius: 1,
        backgroundColor: 'white',
        paddingHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5.5,
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
};

export default avatar_group;
