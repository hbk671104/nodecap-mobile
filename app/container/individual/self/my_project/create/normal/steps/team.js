import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';

import EnhancedScroll from 'component/enhancedScroll';
import InputItem from 'component/inputItem';
import { launchImagePicker } from 'utils/imagepicker';

import Wrapper from './index';
import styles from './style';

@connect()
@createForm()
class Team extends PureComponent {
  handleLogoPress = () => {
    launchImagePicker(response => {
      if (!response.didCancel && !response.error) {
        // this.handleAvatarUpdate(response);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <Wrapper>
        <EnhancedScroll>
          {getFieldDecorator('name')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="姓名"
              placeholder="请输入成员姓名"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('profile_pic')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="头像"
              placeholder="请上传头像"
              showArrow
              renderContent={() => (
                <Image
                  source={require('asset/project_create/logo_placeholder.png')}
                />
              )}
              inputProps={{ style: styles.inputItem.input }}
              onPress={this.handleLogoPress}
            />,
          )}
          {getFieldDecorator('title')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="职位"
              placeholder="请输入成员职位"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('mobile')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="手机号"
              placeholder="请输入成员手机号"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('wechat')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="微信"
              placeholder="请输入成员微信"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('linkedin_url')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="LinkedIn"
              placeholder="请输入成员LinkedIn"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('introduction')(
            <InputItem
              vertical
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="简介"
              placeholder="请输入成员简介"
            />,
          )}
        </EnhancedScroll>
      </Wrapper>
    );
  }
}

export default Team;
