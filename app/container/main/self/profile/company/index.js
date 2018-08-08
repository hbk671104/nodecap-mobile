import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Toast } from 'antd-mobile';
import R from 'ramda';

import NavBar from 'component/navBar';
import Avatar from 'component/uikit/avatar';
import ListItem from 'component/listItem';
import { launchImagePicker } from '../../../../../utils/imagepicker';
import styles from './style';

@connect(({ user }) => ({
  company: R.path(['currentUser', 'companies', 0])(user),
}))
class MyCompany extends Component {
  state = {
    barStyle: 'light-content',
  };

  handleItemPress = params => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'EditProfile',
        params: {
          ...params,
          isCompany: true,
        },
      }),
    );
  };

  // handleAvatarUpdate = response => {
  //   Toast.loading('更新中...', 0);
  //   this.props.dispatch({
  //     type: 'user/updateUserProfile',
  //     payload: {
  //       avatar_url: response,
  //     },
  //     callback: () => {
  //       Toast.hide();
  //     },
  //   });
  // };

  handleAvatarPress = () => {
    this.setState({ barStyle: 'dark-content' }, () => {
      launchImagePicker(response => {
        this.setState({ barStyle: 'light-content' }, () => {
          if (!response.didCancel && !response.error) {
            // this.handleAvatarUpdate(response);
          }
        });
      });
    });
  };

  render() {
    const { company } = this.props;
    return (
      <View style={styles.container}>
        <NavBar barStyle={this.state.barStyle} gradient back title="我的公司" />
        <ScrollView>
          <ListItem
            disablePress
            title="公司 Logo"
            titleStyle={styles.listItem.title}
            renderContent={() => (
              <Avatar
                innerRatio={1}
                size={38}
                source={{ uri: company.logo_url }}
                resizeMode="cover"
              />
            )}
            onPress={this.handleAvatarPress}
          />
          <ListItem
            title="公司名称"
            content={company.name}
            titleStyle={styles.listItem.title}
            contentStyle={styles.listItem.content}
            onPress={this.handleItemPress({
              key: 'name',
              title: '公司名称',
              default: company.name,
            })}
          />
          <ListItem
            title="公司简介"
            content={company.description}
            titleStyle={styles.listItem.title}
            contentStyle={styles.listItem.content}
            onPress={this.handleItemPress({
              key: 'description',
              title: '公司简介',
              default: company.description,
            })}
          />
        </ScrollView>
      </View>
    );
  }
}

export default MyCompany;
