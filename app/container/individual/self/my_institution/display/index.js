import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { compose, withState } from 'recompose';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import FavorItem from 'component/favored/item';
import ActionAlert from 'component/action_alert';
import Member from 'component/institution/member_item';
import { Storage } from 'utils';

import Group from './partials/group';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '机构编辑详情',
  name: 'App_MyInstitutionDetailOperation',
})
@connect(({ institution_create }) => ({
  data: R.pathOr({}, ['current'])(institution_create),
}))
@compose(
  withState('teamMemberY', 'setTeamMemberY', 0),
  withState('avatarModalVisible', 'setAvatarModalVisible', false),
)
export default class MyInstitutionDetail extends Component {
  async componentWillMount() {
    const showed_institution_avatar_modal = await Storage.get(
      'showed_institution_avatar_modal',
    );
    if (showed_institution_avatar_modal) {
      return;
    }
    this.props.setAvatarModalVisible(true);
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'institution_create/resetCurrent',
    });
  }

  handleLinkPress = uri => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'WebPage',
        params: {
          title: R.pathOr('机构主页', ['data', 'name'])(this.props),
          uri,
        },
      }),
    );
  };

  handleEditPress = routeName => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    );
  };

  handleMemberEditPress = index => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyInstitutionSingleMember',
        params: {
          index,
        },
      }),
    );
  };

  handleMemberDeletePress = item => () => {
    Alert.alert('是否确认删除？', '', [
      {
        text: '删除',
        onPress: () => {
          this.props.dispatch({
            type: 'institution_create/deleteMember',
            id: item.id,
          });
        },
      },
      {
        text: '取消',
        style: 'cancel',
      },
    ]);
  };

  handleTeamOnLayout = ({ nativeEvent: { layout } }) => {
    this.props.setTeamMemberY(layout.y);
  };

  renderNavBar = () => (
    <NavBar
      back
      gradient
      renderBottom={() => (
        <Header {...this.props} onLinkPress={this.handleLinkPress} />
      )}
    />
  );

  render() {
    const { data, avatarModalVisible, setAvatarModalVisible } = this.props;
    const desc = R.pathOr('', ['description'])(data);
    const members = R.pathOr([], ['members'])(data);
    const coins = R.pathOr([], ['coins'])(data);
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          ref={ref => {
            this.scroll = ref;
          }}
        >
          <Group
            title="机构简介"
            onEditPress={this.handleEditPress('CreateMyInstitutionDescription')}
          >
            <View style={styles.desc.container}>
              <Text style={styles.desc.text}>{desc}</Text>
            </View>
          </Group>
          <View onLayout={this.handleTeamOnLayout}>
            <Group
              title="机构成员"
              onEditPress={this.handleEditPress('CreateMyInstitutionTeam')}
            >
              {R.addIndex(R.map)((m, i) => (
                <Member
                  editMode
                  key={m.id}
                  data={m}
                  onEditPress={this.handleMemberEditPress(i)}
                  onDeletePress={this.handleMemberDeletePress(m)}
                />
              ))(members)}
            </Group>
          </View>
          <Group
            title="服务项目"
            onEditPress={this.handleEditPress(
              'CreateMyInstitutionServedProject',
            )}
          >
            {R.addIndex(R.map)((m, index) => (
              <FavorItem
                style={{ paddingHorizontal: 0 }}
                institutionId={this.props.id}
                key={m.id}
                data={m}
                showTopBorder={index !== 0}
              />
            ))(coins)}
          </Group>
        </ScrollView>
        <ActionAlert
          visible={avatarModalVisible}
          renderContent={() => (
            <View style={styles.avatarUpload.container}>
              <Image
                source={require('asset/project_create/upload_avatar.png')}
              />
              <Text style={styles.avatarUpload.title}>上传头像</Text>
              <Text style={styles.avatarUpload.subtitle}>
                真实的头像会让更多人联系您
              </Text>
            </View>
          )}
          actionTitle="立即上传"
          action={() => {
            this.scroll.scrollTo({
              y: this.props.teamMemberY,
              animated: true,
            });
            setAvatarModalVisible(false);
            Storage.set('showed_institution_avatar_modal', true);
          }}
          onBackdropPress={() => {
            setAvatarModalVisible(false);
            Storage.set('showed_institution_avatar_modal', true);
          }}
        />
      </View>
    );
  }
}
