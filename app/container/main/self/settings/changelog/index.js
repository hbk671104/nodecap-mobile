import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import NavBar from 'component/navBar';
import ChangeLogItem from './item';
import styles from './style';

class ChangeLog extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient back title="版本更新" />
        <ScrollView>
          <ChangeLogItem
            version="v5.0.3"
            date="2018-08-05"
            changelog={['新增神策埋点能力', 'Bug 修复']}
          />
          <ChangeLogItem
            version="v5.0.2"
            date="2018-08-03"
            changelog={[
              'Dashboard 新增基金投资项目展示，一键跳转项目详情页',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.1"
            date="2018-08-02"
            changelog={[
              'Dashboard 新增分享页，支持微信好友、朋友圈、保存到本地相册',
              '项目添加入口位置调整、视觉焕然一新',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.0"
            date="2018-07-27"
            changelog={[
              '移动端新增项目添加功能，允许投资人随时随地录入项目',
              '新增我的模块，支持用户基本信息的展示、登出等',
              'Bug 修复',
            ]}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ChangeLog;
