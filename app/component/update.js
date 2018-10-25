import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Communications from 'react-native-communications';

import AuthButton from 'component/auth/button';

const update = props => (
  <View style={styles.wrapper}>
    <View style={styles.container} />
    <Animatable.Image
      useNativeDriver
      animation="pulse"
      iterationCount="infinite"
      //   direction="reverse"
      source={require('asset/Rocket.png')}
    />
    <Image source={require('asset/update_found.png')} />
    <View style={styles.content.container}>
      <Text style={styles.content.text}>1. 新增项目公海，优质项目供您挑选</Text>
      <Text style={styles.content.text}>
        2. 新增评级、研报，深度观点一手掌握
      </Text>
      <Text style={styles.content.text}>3. 新增机构成员的默认角色</Text>
      <Text style={styles.content.text}>4. 性能优化，Bug 修复</Text>
    </View>
    <AuthButton
      disabled={false}
      title="立即更新"
      style={styles.button.container}
      titleStyle={styles.button.title}
      onPress={() =>
        Communications.web(
          'https://itunes.apple.com/cn/app/hotnode/id1397744640?mt=8',
        )
      }
    />
  </View>
);

const styles = {
  wrapper: {
    width: 250,
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 45,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  content: {
    container: {
      // flex: 1,
      marginVertical: 16,
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
      lineHeight: 17,
      marginVertical: 3,
    },
  },
  button: {
    container: {
      width: 140,
      height: 38,
      borderRadius: 2,
      marginBottom: 20,
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      color: 'white',
    },
  },
};

export default update;
