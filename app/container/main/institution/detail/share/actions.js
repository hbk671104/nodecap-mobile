import styles from './actions.style';
import Touchable from 'component/uikit/touchable';
import { Flex } from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function InstitutionShareActions(props) {
  return (
    <Flex justify="space-between" style={styles.actionsBar}>
      <Touchable borderless onPress={props.onClose}>
        <Flex align="center">
          <Icon
            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
            style={styles.backButton}
            color="#a1a1a1"
          />
          <Text style={styles.backText}>返回</Text>
        </Flex>
      </Touchable>
      <Flex>
        <TouchableOpacity onPress={props.shareTo('save')}>
          <Image style={{ width: 25, height: 25, marginRight: 24 }} source={require('asset/save_picture.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.shareTo('wechat')}>
          <Image source={require('asset/wechat_icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 24 }}
          onPress={props.shareTo('moment')}
        >
          <Image source={require('asset/wechat_moment_icon.png')} />
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
}
