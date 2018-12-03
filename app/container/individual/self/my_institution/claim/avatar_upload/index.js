import React, { PureComponent } from 'react';
import { View, Image, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Flex, Toast } from 'antd-mobile';
import { compose, withState } from 'recompose';
import R from 'ramda';

import AvatarWrapper from 'component/avatar_wrapper';
import NavBar from 'component/navBar';
import AuthButton from 'component/auth/button';
import Icon from 'component/uikit/icon';
import request from 'utils/request';
import runtimeConfig from 'runtime/index';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import styles from './style';

@compose(withState('avatarURL', 'setAvatarURL', null))
class AvatarUpload extends PureComponent {
  handleUpload = async response => {
    Toast.loading('上传中...', 0);
    const { url } = await uploadImage({
      image: response,
      type: 'avatar',
    });
    Toast.hide();

    this.props.setAvatarURL(url);
  };

  handleAvatarPress = () => {
    launchImagePicker(response => {
      if (!response.didCancel && !response.error) {
        this.handleUpload(response);
      }
    });
  };

  handleSubmit = value => {
    // institution claim saga check
    this.props.dispatch({
      type: this.props.id
        ? 'institution_create/claimInstitution'
        : 'institution_create/submitInstitution',
      id: this.props.id,
      callback: success => {
        if (success) {
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'CreateMyInstitutionDone',
              params: {
                id: this.props.id,
              },
            }),
          );
        }
        request.post(`${runtimeConfig.NODE_SERVICE_URL}/feedback`, {
          content: `${value.owner_name} 入驻了 ID 为 ${
            this.props.id
          } 的机构，请快去审核`,
          mobile: `${value.owner_mobile}`,
        });
      },
    });
  };

  handleOnSkipPress = () => {};

  render() {
    const { avatarURL } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          title="上传头像"
          back
          barStyle="dark-content"
          wrapperStyle={styles.navBar.wrapper}
        />
        <View style={{ flex: 1 }}>
          <Flex style={styles.notice.container} justify="center">
            <Image source={require('asset/alert_icon.png')} />
            <Text style={styles.notice.text}>
              上传真实头像，提升信任值，可增加对方来沟通的几率
            </Text>
          </Flex>
          <View style={styles.avatarGroup.container}>
            <AvatarWrapper
              style={styles.avatarGroup.content}
              onPress={this.handleAvatarPress}
            >
              {R.isNil(avatarURL) ? (
                <View>
                  <Image source={require('asset/avatar_upload.png')} />
                  <Text style={styles.avatarGroup.title}>上传头像</Text>
                </View>
              ) : (
                <Image
                  style={styles.avatarGroup.image}
                  source={{ uri: avatarURL }}
                />
              )}
            </AvatarWrapper>
          </View>
        </View>
        <View style={{ marginBottom: 144 }}>
          <AuthButton
            disabled={R.isNil(avatarURL)}
            style={styles.auth}
            title="提 交"
          />
          <View style={styles.skip.container}>
            <Text style={styles.skip.text} onPress={this.handleOnSkipPress}>
              跳过并提交 <Icon name="arrow-forward" />
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AvatarUpload;
