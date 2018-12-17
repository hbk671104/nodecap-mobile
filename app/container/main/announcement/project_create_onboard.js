import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { Flex } from 'antd-mobile';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import styles from './style';

@global.bindTrack({
  page: '项目/机构入驻引导页',
  name: 'App_ProjectCreateOnboardOperation',
})
@connect()
export default class ProjectCreateOnboard extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  handleItemPress = type => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName:
          type === 'institution'
            ? 'CreateMyInstitutionBasicInfo'
            : 'CreateMyProject',
      }),
    );
  };

  renderItem = ({ title, subtitle, type }) => (
    <Touchable onPress={this.handleItemPress(type)}>
      <Flex style={styles.projectCreate.bottom.item.container}>
        <View style={{ flex: 1 }}>
          <Flex>
            <View style={styles.projectCreate.bottom.item.block} />
            <Text style={styles.projectCreate.bottom.item.title}>{title}</Text>
          </Flex>
          <Text style={styles.projectCreate.bottom.item.subtitle}>
            {subtitle}
          </Text>
        </View>
        <Text style={styles.projectCreate.bottom.item.claim}>
          我要入驻 <Icon name="arrow-forward" />
        </Text>
      </Flex>
    </Touchable>
  );

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          back
          title="入驻"
          barStyle="dark-content"
          wrapperStyle={styles.navBar}
        />
        <View style={styles.projectCreate.container}>
          <View style={styles.projectCreate.top.container}>
            <Image
              style={styles.projectCreate.top.image}
              source={require('asset/general_project_create.png')}
            />
            <Text style={styles.projectCreate.top.title}>什么是入驻？</Text>
            <Text style={styles.projectCreate.top.subtitle}>
              入驻，是您作为项目或机构的团队成员，入驻并维护项目或机构信息。是一种身份认证及享受平台其它权益的前提条件。
            </Text>
          </View>
          <View style={styles.projectCreate.bottom.container}>
            {this.renderItem({
              title: 'Token Fund',
              subtitle: '我是投资机构，我要找孵化项目',
              type: 'institution',
            })}
            <View style={{ marginTop: 12 }}>
              {this.renderItem({
                title: '项目方',
                subtitle: '我是项目方，我要找资本，找运营',
                type: 'project',
              })}
            </View>
            <View style={{ marginTop: 12 }}>
              {this.renderItem({
                title: '服务机构',
                subtitle: '我是服务机构，我要项目方',
                type: 'institution',
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
