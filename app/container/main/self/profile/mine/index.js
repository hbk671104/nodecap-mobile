import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

import NavBar from 'component/navBar';
import Avatar from 'component/uikit/avatar';
import ListItem from 'component/listItem';
import styles from './style';

@connect(({ user }) => ({
  user: user.currentUser,
}))
class MyProfile extends Component {
  state = {
    barStyle: 'light-content',
  };

  handleItemPress = params => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'EditProfile',
        params,
      }),
    );
  };

  handleAvatarPress = () => {
    this.setState({ barStyle: 'dark-content' }, () => {
      ImagePicker.showImagePicker(
        {
          title: null,
          chooseFromLibraryButtonTitle: '相册中选择...',
          takePhotoButtonTitle: '拍照...',
          cancelButtonTitle: '取消',
          mediaType: 'photo',
          quality: 1,
          allowsEditing: true,
        },
        response => {
          this.setState({ barStyle: 'light-content' }, () => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };

              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };

              // this.setState({
              //   avatarSource: source,
              // });
            }
          });
        },
      );
    });
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <NavBar barStyle={this.state.barStyle} gradient back title="我的信息" />
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
            onPress={this.handleAvatarPress}
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
