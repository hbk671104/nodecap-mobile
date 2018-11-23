import React, { Component } from 'react';
import { View, Text, ScrollView, LayoutAnimation } from 'react-native';
import { compose, withState, withProps } from 'recompose';
import PDF from 'react-native-pdf';
import Orientation from 'react-native-orientation';
import R from 'ramda';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as Animatable from 'react-native-animatable';

import Touchable from 'component/uikit/touchable';
import FavorItem from 'component/favored/item';
import shareModal from 'component/shareModal';
import Config from 'runtime/index';
import { getInstitutionReportByID } from '../../../../../services/api';
import NavBar from 'component/navBar';

import styles, { translateY } from './style';

@connectActionSheet
@global.bindTrack({
  page: '研报详情',
  name: 'App_PublicProjectInstitutionReportDetailOperation',
})
@compose(
  withState('navBarHidden', 'setNavBarHidden', false),
  withState('coins', 'setCoins', []),
  withState('reportDetail', 'setReportDetail', null),
  withState('footerCollapsed', 'setFooterCollapsed', true),
  withProps(props => {
    const id = props.navigation.getParam('id');
    return {
      id,
    };
  }),
)
@shareModal
export default class InstitutionReportDetail extends Component {
  componentWillMount() {
    this.loadCoins();
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this.orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  onPressShare = () => {
    const { reportDetail } = this.props;
    const request = {
      webpageUrl: `${Config.MOBILE_SITE}/industry-report?id=${this.props.id}`,
      title: `「研报」${reportDetail.title}`,
      description: '来 Hotnode, 发现最新最热研报！',
      thumbImage:
        'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/pdf.png',
    };
    this.props.openShareModal({
      types: [{
        type: 'timeline',
        ...request,
      }, {
        type: 'session',
        ...request,
      }, {
        type: 'link',
        url: `${Config.MOBILE_SITE}/industry-report?id=${this.props.id}`,
      }],
    });
  };

  orientationDidChange = orientation => {
    this.props.setNavBarHidden(orientation === 'LANDSCAPE');
  };

  loadCoins = async () => {
    try {
      const { data } = await getInstitutionReportByID(this.props.id);
      this.props.setCoins(R.pathOr([], ['coins'])(data));
      this.props.setReportDetail(data);
    } catch (e) {
      console.log(e);
    }
  };

  toggleCollapsed = () => {
    const { footerCollapsed } = this.props;
    LayoutAnimation.easeInEaseOut();
    this.props.setFooterCollapsed(!footerCollapsed, () => {
      this.footer.transitionTo(
        {
          transform: [
            {
              translateY: footerCollapsed ? 0 : translateY,
            },
          ],
        },
        250,
        'ease-in-out',
      );
      this.wrapper.transitionTo(
        {
          opacity: footerCollapsed ? 0.4 : 0,
        },
        250,
        'ease-in-out',
      );
    });
  };

  renderRecommended = () => {
    const { coins, footerCollapsed } = this.props;
    if (R.isEmpty(coins)) {
      return null;
    }

    return (
      <Animatable.View
        ref={ref => {
          this.footer = ref;
        }}
        style={styles.recommended.container}
      >
        <View style={styles.recommended.header.container}>
          <Text style={styles.recommended.header.title}>
            为您推荐 {R.length(coins)} 个相关项目
          </Text>
          <Touchable borderless onPress={this.toggleCollapsed}>
            <Text style={styles.recommended.header.action}>
              {footerCollapsed ? '点击查看' : '点击收起'}
            </Text>
          </Touchable>
        </View>
        {footerCollapsed && <View style={styles.recommended.dummy} />}
        <ScrollView>
          {R.map(c => (
            <FavorItem key={c.id} data={c} afterFavor={this.loadCoins} />
          ))(coins)}
        </ScrollView>
      </Animatable.View>
    );
  };

  renderWrapper = () => {
    const { coins, footerCollapsed } = this.props;
    if (R.isEmpty(coins)) {
      return null;
    }

    return (
      <Animatable.View
        pointerEvents={footerCollapsed ? 'none' : 'auto'}
        onStartShouldSetResponder={this.toggleCollapsed}
        ref={ref => {
          this.wrapper = ref;
        }}
        style={styles.recommended.wrapper}
      />
    );
  };

  render() {
    const { navigation, navBarHidden, reportDetail } = this.props;
    if (!reportDetail) {
      return (
        <View style={styles.container}>
          <NavBar
            gradient
            back
            title="加载中..."
            titleContainerStyle={{ paddingHorizontal: 48 }}
          />
        </View>
      );
    }
    let pdf_url = reportDetail.pdf_url;
    pdf_url = decodeURI(pdf_url);
    pdf_url = encodeURI(pdf_url);

    const title = reportDetail.title;
    return (
      <View style={styles.container}>
        {R.not(navBarHidden) && (
          <NavBar
            gradient
            back
            title={title}
            titleContainerStyle={{ paddingHorizontal: 48 }}
            renderRight={() => (
              <Touchable borderless onPress={this.onPressShare}>
                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>分享</Text>
              </Touchable>
            )}
          />
        )}
        <PDF
          style={styles.pdf}
          source={{
            uri: pdf_url,
            cache: true,
          }}
        />
        {this.renderWrapper()}
        {this.renderRecommended()}
      </View>
    );
  }
}
