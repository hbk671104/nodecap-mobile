import React, { PureComponent } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Flex, Toast } from 'antd-mobile';
import { compose, withState } from 'recompose';
import R from 'ramda';
import { connect } from 'react-redux';

import AvatarWrapper from 'component/avatar_wrapper';
import NavBar from 'component/navBar';
import AuthButton from 'component/auth/button';
import Icon from 'component/uikit/icon';
import AvatarConfirmAlert from 'component/avatar_confirm_alert';

import request from 'utils/request';
import runtimeConfig from 'runtime/index';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import styles from './style';

@global.bindTrack({
  page: '创建我的项目头像上传',
  name: 'App_MyProjectClaimAvatarUploadOperation',
})
@connect(({ loading }, props) => {
  const id = props.navigation.getParam('id');
  const values = props.navigation.getParam('values');
  return {
    id,
    values,
    submitting:
      loading.effects['project_create/claimProject'] ||
      loading.effects['project_create/submitProject'],
  };
})
@compose(
  withState('avatarURL', 'setAvatarURL', null),
  withState('avatarConfirmVisible', 'setAvatarConfirmVisible', false),
)
class AvatarUpload extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

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

  handleSkipPress = () => {
    this.props.setAvatarConfirmVisible(true);
  };

  handleSubmit = () => {
    const { values, avatarURL } = this.props;
    this.props.dispatch({
      type: this.props.id
        ? 'project_create/claimProject'
        : 'project_create/submitProject',
      id: this.props.id,
      avatarURL,
      callback: success => {
        if (success) {
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'CreateMyProjectDone',
              params: {
                id: this.props.id,
              },
            }),
          );
        }
        request.post(`${runtimeConfig.NODE_SERVICE_URL}/feedback`, {
          content: `${values.owner_name} 入驻了 ID 为 ${
            this.props.id
          } 的项目，请快去审核`,
          mobile: `${values.owner_mobile}`,
        });
      },
    });
  };

  render() {
    const { avatarURL, submitting } = this.props;
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
                <ImageBackground
                  style={styles.avatarGroup.image}
                  source={{ uri: avatarURL }}
                >
                  <Image
                    style={{ marginBottom: 8 }}
                    source={require('asset/change_avatar.png')}
                  />
                </ImageBackground>
              )}
            </AvatarWrapper>
          </View>
        </View>
        <View style={{ marginBottom: 144 }}>
          <AuthButton
            loading={submitting}
            disabled={R.isNil(avatarURL)}
            style={styles.auth}
            title="提 交"
            onPress={this.handleSubmit}
          />
          <View style={styles.skip.container}>
            <Text style={styles.skip.text} onPress={this.handleSkipPress}>
              跳过并提交 <Icon name="arrow-forward" />
            </Text>
          </View>
        </View>
        <AvatarConfirmAlert {...this.props} onSubmit={this.handleSubmit} />
      </View>
    );
  }
}

export default AvatarUpload;
