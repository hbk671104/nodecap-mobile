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
            version="v5.1.0"
            date="2018-08-13"
            changelog={[
              '投资库交互形式全新升级，滑动切换，便捷高效',
              '项目详情页投资数量 UI 优化',
              '修复人脉资源库数据同步的问题',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.5"
            date="2018-08-08"
            changelog={[
              '支持公司创建',
              '支持公司信息编辑',
              '支持个人信息编辑',
              '投资回报率 UI 优化',
              '热更新页面优化',
              '新增版本更新页',
              '项目添加新增清空按钮，录入更便捷',
              'Bug 修复',
            ]}
          />
          <ChangeLogItem
            version="v5.0.4"
            date="2018-08-07"
            changelog={[
              '登录页重构，支持用户重置密码',
              'Dashboard 缺省页重构，一键启动项目录入，方便快捷',
              '项目详情页投资金额/数量 UI 优化',
              '我的模块个人信息卡片点击优化',
              'Bug 修复',
            ]}
          />
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
