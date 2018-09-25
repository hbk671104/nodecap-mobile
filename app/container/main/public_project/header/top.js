import React from 'react';
import { View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import Touchable from 'component/uikit/touchable';

const deviceWidth = Dimensions.get('window').width;

const top = props => (
  <View style={styles.container}>
    <Image
      style={styles.banner}
      source={require('asset/public_project/banner.png')}
    />
    <View style={styles.verticalBanner.container}>
      <Image source={require('asset/public_project/announcement_label.png')} />
      <Swiper
        style={styles.verticalBanner.bannerWrapper}
        height={styles.verticalBanner.container.height}
        horizontal={false}
        showsPagination={false}
        autoplay
      >
        <View style={styles.verticalBanner.group.container}>
          <Text style={styles.verticalBanner.group.title}>
            5.7版本成功上线，新增 482个项目
          </Text>
        </View>
        <View style={styles.verticalBanner.group.container}>
          <Text style={styles.verticalBanner.group.title}>
            Hotnode v6.0.0 上线 app store
          </Text>
        </View>
        <View style={styles.verticalBanner.group.container}>
          <Text style={styles.verticalBanner.group.title}>徐明星被抓</Text>
        </View>
      </Swiper>
    </View>
    <View style={styles.tab.container}>
      <Touchable style={styles.tab.group.wrapper}>
        <View style={styles.tab.group.container}>
          <Image source={require('asset/public_project/project_hunt.png')} />
          <Text style={styles.tab.group.title}>找项目</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper}>
        <View style={styles.tab.group.container}>
          <Image source={require('asset/public_project/report.png')} />
          <Text style={styles.tab.group.title}>研报</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper}>
        <View style={styles.tab.group.container}>
          <Image source={require('asset/public_project/institution.png')} />
          <Text style={styles.tab.group.title}>找机构</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper}>
        <View style={styles.tab.group.container}>
          <Image source={require('asset/public_project/meeting.png')} />
          <Text style={styles.tab.group.title}>找会议</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper}>
        <View style={styles.tab.group.container}>
          <Image source={require('asset/public_project/announcement.png')} />
          <Text style={styles.tab.group.title}>上所公告</Text>
        </View>
      </Touchable>
    </View>
  </View>
);

const styles = {
  container: {},
  banner: {
    height: 160,
    width: deviceWidth,
  },
  verticalBanner: {
    container: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 12,
      marginRight: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    bannerWrapper: {
      marginLeft: 12,
    },
    group: {
      container: {
        flex: 1,
        justifyContent: 'center',
      },
      title: {
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: 12,
      },
    },
  },
  tab: {
    container: {
      height: 82,
      flexDirection: 'row',
    },
    group: {
      wrapper: {
        flex: 1,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.85)',
        marginTop: 8,
      },
    },
  },
};

export default top;
