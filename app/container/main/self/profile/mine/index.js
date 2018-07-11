import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Avatar from 'component/uikit/avatar';
import ListItem from 'component/listItem';
import styles from './style';

@connect(({ user }) => ({
  user: user.currentUser,
}))
class MyProfile extends Component {
  handleItemPress = params => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'EditProfile',
        params,
      }),
    );
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="我的信息" />
        <ScrollView>
          <ListItem
            title="头像"
            titleStyle={styles.listItem.title}
            renderContent={() => (
              <Avatar
                innerRatio={1}
                size={38}
                source={{ uri: user.avatar_url }}
              />
            )}
          />
          <ListItem
            title="姓名"
            content={user.realname}
            titleStyle={styles.listItem.title}
            contentStyle={styles.listItem.content}
            onPress={this.handleItemPress({
              key: 'realname',
              title: '姓名',
              default: user.realname,
            })}
          />
          <ListItem
            title="手机"
            content={user.mobile}
            titleStyle={styles.listItem.title}
            contentStyle={styles.listItem.content}
            onPress={this.handleItemPress({
              key: 'mobile',
              title: '手机',
              default: user.mobile,
            })}
          />
          <ListItem
            title="登录账号"
            content={user.email}
            titleStyle={styles.listItem.title}
            contentStyle={styles.listItem.content}
          />
        </ScrollView>
      </View>
    );
  }
}

export default MyProfile;
