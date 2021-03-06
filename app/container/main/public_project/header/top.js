import React from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import VerticalSwiper from '@nart/react-native-swiper';
import Swiper from 'react-native-swiper';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FadeIn from 'react-native-fade-in-image';
import { RouterEmitter } from '../../../../router';

import { SearchBarDisplayHomepage } from 'component/searchBar/display';
import { NumberBadge } from 'component/badge';
import Touchable from 'component/uikit/touchable';
import PaginationIndicator from 'component/pagination_indicator';

const deviceWidth = Dimensions.get('window').width;

const top = ({
  onDappPress,
  latestNews,
  banners,
  onSearchBarPress,
  onServicePress,
  onAnnouncementPress,
  onProjectRepoPress,
  onYellowPagePress,
  onInstitutionReportPress,
  onChartPress,
  notification_badge_number,
  reports_badge_number,
  dispatch,
}) => (
  <View style={styles.container}>
    <View style={styles.searchBar.wrapper}>
      <SearchBarDisplayHomepage
        style={styles.searchBar.container}
        title="搜索项目 / 研报 / 投资机构 / 服务机构 / 用户"
        titleStyle={{ color: '#999999' }}
        iconColor="#999999"
        onPress={onSearchBarPress}
      />
    </View>
    <Grid style={{ paddingBottom: 16, paddingHorizontal: 12 }}>
      <Row>
        <Col>
          <Touchable borderless onPress={onYellowPagePress}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image
                  source={require('asset/public_project/yellowpage.png')}
                />
              </View>
              <Text style={styles.tab.group.title}>网址大全</Text>
            </View>
          </Touchable>
        </Col>
        <Col>
          <Touchable borderless onPress={onDappPress}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image source={require('asset/public_project/dapp.png')} />
              </View>
              <Text style={styles.tab.group.title}>DAPP</Text>
            </View>
          </Touchable>
        </Col>
        <Col>
          <Touchable borderless onPress={onInstitutionReportPress}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image source={require('asset/public_project/report.png')} />
              </View>
              <Text style={styles.tab.group.title}>研报</Text>
              {!!reports_badge_number && (
                <NumberBadge number={reports_badge_number} />
              )}
            </View>
          </Touchable>
        </Col>
        <Col>
          <Touchable borderless onPress={onServicePress(1)}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image
                  source={require('asset/public_project/institution.png')}
                />
              </View>
              <Text style={styles.tab.group.title}>找投资</Text>
            </View>
          </Touchable>
        </Col>
        <Col>
          <Touchable borderless onPress={onAnnouncementPress}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image
                  source={require('asset/public_project/announcement.png')}
                />
              </View>
              <Text style={styles.tab.group.title}>上所公告</Text>
              {!!notification_badge_number && (
                <NumberBadge number={notification_badge_number} />
              )}
            </View>
          </Touchable>
        </Col>
      </Row>
      <Row>
        <Col>
          <Touchable borderless onPress={onServicePress(8)}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image
                  source={require('asset/public_project/exchange_icon.png')}
                />
              </View>
              <Text style={styles.tab.group.title}>找交易所</Text>
            </View>
          </Touchable>
        </Col>
        <Col>
          <Touchable borderless onPress={onServicePress(7)}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image
                  source={require('asset/public_project/media_icon.png')}
                />
              </View>
              <Text style={styles.tab.group.title}>找媒体</Text>
            </View>
          </Touchable>
        </Col>
        <Col>
          <Touchable borderless onPress={onServicePress(6)}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image
                  source={require('asset/public_project/rating_star.png')}
                />
              </View>
              <Text style={styles.tab.group.title}>找评级</Text>
            </View>
          </Touchable>
        </Col>
        <Col>
          <Touchable borderless onPress={onChartPress}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image source={require('asset/public_project/chart.png')} />
              </View>
              <Text style={styles.tab.group.title}>涨跌幅</Text>
            </View>
          </Touchable>
        </Col>
        <Col>
          <Touchable borderless onPress={onServicePress('more')}>
            <View style={styles.tab.group.container}>
              <View style={styles.tab.group.imageWrapper}>
                <Image source={require('asset/public_project/more_icon.png')} />
              </View>
              <Text style={styles.tab.group.title}>更多</Text>
            </View>
          </Touchable>
        </Col>
      </Row>
    </Grid>
    {!R.isEmpty(latestNews) && (
      <View style={styles.verticalBanner.container}>
        <Image
          source={require('asset/public_project/announcement_label.png')}
        />
        <VerticalSwiper
          style={styles.verticalBanner.bannerWrapper}
          height={styles.verticalBanner.container.height}
          horizontal={false}
          showsPagination={false}
          autoplay
        >
          {R.map(n => (
            <TouchableWithoutFeedback
              key={n.id}
              onPress={() => {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'HostJoinList',
                  }),
                );
              }}
            >
              <View key={n.id} style={styles.verticalBanner.group.container}>
                <Text
                  style={styles.verticalBanner.group.title}
                  numberOfLines={1}
                >
                  {R.pathOr('--', ['title'])(n)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))(latestNews)}
        </VerticalSwiper>
      </View>
    )}
    {!R.isEmpty(banners) && (
      <View style={styles.bannerWrapper}>
        <Swiper
          width={deviceWidth}
          height={130}
          autoplay
          autoplayTimeout={5}
          renderPagination={(index, total) => (
            <PaginationIndicator index={index} total={total} />
          )}
          removeClippedSubviews={false}
        >
          {R.map(n => (
            <TouchableWithoutFeedback
              key={n.id}
              onPress={() => {
                if (n.banner_url) {
                  if (Platform.OS !== 'ios') {
                    RouterEmitter.emit('android_url', { url: n.banner_url });
                    return;
                  }
                  Linking.openURL(n.banner_url);
                }
              }}
            >
              <FadeIn>
                <Image style={styles.banner} source={{ uri: n.banner }} />
              </FadeIn>
            </TouchableWithoutFeedback>
          ))(banners)}
        </Swiper>
      </View>
    )}
  </View>
);

const styles = {
  container: {},
  bannerWrapper: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  banner: {
    height: 130,
    // width: deviceWidth - 12 * 2,
    marginHorizontal: 12,
    borderRadius: 2,
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
  searchBar: {
    wrapper: { paddingHorizontal: 12, marginTop: 8 },
    container: {
      backgroundColor: '#F5F5F5',
      borderRadius: 4,
      height: 40,
      borderColor: '#E9E9E9',
      borderWidth: StyleSheet.hairlineWidth,
    },
  },
};

export default top;
