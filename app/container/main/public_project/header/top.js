import React from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Swiper from '@nart/react-native-swiper';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import { RouterEmitter } from '../../../../router';

import { NumberBadge } from 'component/badge';
import Touchable from 'component/uikit/touchable';

const deviceWidth = Dimensions.get('window').width;

const top = ({
  insite_news,
  banners,
  onServicePress,
  onMeetingPress,
  onAnnouncementPress,
  onProjectRepoPress,
  onInstitutionPress,
  onInstitutionReportPress,
  notification_badge_number,
  reports_badge_number,
}) => (
  <View style={styles.container}>
    <View style={{ height: 160 }}>
      <Swiper
        width={deviceWidth}
        height={120}
        autoplay
        autoplayTimeout={4}
        renderPagination={(index, total) => {
          const dots = R.repeat('', total).map((i, idx) => (
            <View
              key={`${idx}`}
              style={[styles.dot, idx === index ? styles.dotActive : {}]}
            />
          ));
          return <View style={styles.pagination}>{dots}</View>;
        }}
      >
        {R.map(n => (
          <TouchableWithoutFeedback
            key={n.id}
            onPress={() => {
              if (Platform.OS !== 'ios') {
                RouterEmitter.emit('android_url', { url: n.banner_url });
                return;
              }
              if (n.banner_url) {
                Linking.openURL(n.banner_url);
              }
            }}
          >
            <Image style={styles.banner} source={{ uri: n.banner }} />
          </TouchableWithoutFeedback>
        ))(banners)}
      </Swiper>
    </View>
    <View style={styles.verticalBanner.container}>
      <Image source={require('asset/public_project/announcement_label.png')} />
      <Swiper
        style={styles.verticalBanner.bannerWrapper}
        height={styles.verticalBanner.container.height}
        horizontal={false}
        showsPagination={false}
        autoplay
      >
        {R.map(n => (
          <View key={n.id} style={styles.verticalBanner.group.container}>
            <Text style={styles.verticalBanner.group.title} numberOfLines={1}>
              {R.pathOr('--', ['title'])(n)}
            </Text>
          </View>
        ))(insite_news)}
      </Swiper>
    </View>
    <Flex
      style={styles.tab.container}
      wrap="wrap"
    >
      <Touchable style={styles.tab.group.wrapper} onPress={onProjectRepoPress}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/project_hunt.png')} />
          </View>
          <Text style={styles.tab.group.title}>找项目</Text>
        </View>
      </Touchable>
      <Touchable
        style={styles.tab.group.wrapper}
        onPress={onInstitutionReportPress}
      >
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/report.png')} />
          </View>
          <Text style={styles.tab.group.title}>研报</Text>
          {!!reports_badge_number && <NumberBadge number={reports_badge_number} />}
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onInstitutionPress}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/institution.png')} />
          </View>
          <Text style={styles.tab.group.title}>找机构</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onAnnouncementPress}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image source={require('asset/public_project/announcement.png')} />
          </View>
          <Text style={styles.tab.group.title}>上所公告</Text>
          {!!notification_badge_number && <NumberBadge number={notification_badge_number} />}
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onServicePress(8)}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image
              source={require('asset/public_project/exchange_icon.png')}
              style={{ width: 27.6, height: 24.5 }}
            />
          </View>
          <Text style={styles.tab.group.title}>找交易所</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onServicePress(7)}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image
              source={require('asset/public_project/media_icon.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <Text style={styles.tab.group.title}>找媒体</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onServicePress(3)}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image
              source={require('asset/public_project/meeting.png')}
              style={{ width: 27.5, height: 22.5 }}
            />
          </View>
          <Text style={styles.tab.group.title}>找公关</Text>
        </View>
      </Touchable>
      <Touchable style={styles.tab.group.wrapper} onPress={onServicePress('more')}>
        <View style={styles.tab.group.container}>
          <View style={styles.tab.group.imageWrapper}>
            <Image
              source={require('asset/public_project/more_icon.png')}
              style={{ width: 28, height: 22.5 }}
            />
          </View>
          <Text style={styles.tab.group.title}>更多</Text>
        </View>
      </Touchable>
    </Flex>
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
      flex: 1,
      height: 160,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    group: {
      wrapper: {
        width: 82,
      },
      imageWrapper: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 19,
      },
      container: {
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
  dot: {
    width: 10,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, .4)',
    marginRight: 4,
  },
  dotActive: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
};

export default top;
