import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking,
  Clipboard,
} from 'react-native';
import { Flex, Toast } from 'antd-mobile';
import R from 'ramda';
import Communications from 'react-native-communications';

import Avatar from 'component/uikit/avatar';

const memberItem = ({ data, style }) => {
  const profile_pic = R.pathOr('', ['profile_pic'])(data);
  const name = R.pathOr('--', ['name'])(data);
  const title = R.pathOr('--', ['title'])(data);
  const linkedIn_url = R.path(['linkedIn_url'])(data);
  const mobile = R.path(['mobile'])(data);
  const wechat = R.path(['wechat'])(data);
  return (
    <View style={[styles.container, style]}>
      <Avatar
        source={{ uri: profile_pic }}
        raised={false}
        size={40}
        innerRatio={1}
      />
      <Flex justify="between" style={{ flex: 1 }}>
        <View style={[styles.content.container]}>
          <Text style={styles.content.title}>{R.trim(name)}</Text>
          <Text style={styles.content.subtitle}>{R.trim(title)}</Text>
        </View>
        <Flex>
          {!!mobile && (
            <View style={{ marginRight: 10 }}>
              <TouchableWithoutFeedback
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
                onPress={() => {
                  Communications.phonecall(mobile, false);
                }}
              >
                <Image
                  style={styles.content.linkedin}
                  source={require('asset/project/detail/mobile.png')}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
          {!!wechat && (
            <View style={{ marginRight: 10 }}>
              <TouchableWithoutFeedback
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
                onPress={() => {
                  Clipboard.setString(wechat);
                  Toast.show('微信号已复制');
                }}
              >
                <Image
                  style={styles.content.linkedin}
                  source={require('asset/project/detail/wechat.png')}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
          {!!linkedIn_url && (
            <View>
              <TouchableWithoutFeedback
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
                onPress={() => {
                  Linking.canOpenURL(linkedIn_url)
                    .then(support => {
                      if (support) {
                        Linking.openURL(linkedIn_url).catch(err => {
                          console.log(err);
                        });
                      }
                    })
                    .catch(err => console.error('An error occurred', err));
                }}
              >
                <Image
                  style={styles.content.linkedin}
                  source={require('asset/public_project/linkedin.png')}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
        </Flex>
      </Flex>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 15,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    linkedin: {
      width: 25,
      height: 25,
    },
    subtitle: {
      marginTop: 6,
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 12,
    },
  },
};

memberItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memberItem;
