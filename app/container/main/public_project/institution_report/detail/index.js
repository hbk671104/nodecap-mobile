import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { compose, withState, withProps } from 'recompose';
import PDF from 'react-native-pdf';
import Orientation from 'react-native-orientation';
import R from 'ramda';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as WeChat from 'react-native-wechat';
import * as Animatable from 'react-native-animatable';

import Touchable from 'component/uikit/touchable';
import FavorItem from 'component/favored/item';
import Config from 'runtime/index';
import { getInstitutionReportByID } from '../../../../../services/api';
import NavBar from 'component/navBar';

import styles from './style';

@connectActionSheet
@global.bindTrack({
  page: '项目公海机构报告详情',
  name: 'App_PublicProjectInstitutionReportDetailOperation',
})
@compose(
  withState('navBarHidden', 'setNavBarHidden', false),
  withState('coins', 'setCoins', []),
  withState('footerCollapsed', 'setFooterCollapsed', true),
  withProps(props => {
    const id = props.navigation.getParam('id');
    return {
      id,
    };
  }),
)
export default class InstitutionReportDetail extends Component {
  state = {
    isWXAppSupportApi: false,
  };

  componentWillMount() {
    this.loadCoins();
  }

  componentDidMount() {
    this.checkWechatAval();

    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this.orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  onPressShare = () => {
    const { navigation } = this.props;
    this.props.showActionSheetWithOptions(
      {
        options: ['分享至朋友圈', '分享至微信', '取消'],
        cancelButtonIndex: 2,
      },
      index => {
        const id = navigation.getParam('id');
        if (!this.state.isWXAppSupportApi) {
          return;
        }
        if (index !== 2) {
          const request = {
            type: 'news',
            webpageUrl: `${Config.MOBILE_SITE}/industry-report?id=${id}`,
            title: `「研报」${navigation.getParam('title')}`,
            description: '来 Hotnode, 发现最新最热研报！',
            thumbImage:
              'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/pdf.png',
          };
          if (index === 1) {
            WeChat.shareToSession(request);
          } else if (index === 0) {
            WeChat.shareToTimeline(request);
          }
        }
      },
    );
  };

  orientationDidChange = orientation => {
    this.props.setNavBarHidden(orientation === 'LANDSCAPE');
  };

  checkWechatAval = async () => {
    this.setState({
      isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
    });
  };

  loadCoins = async () => {
    try {
      const { data } = await getInstitutionReportByID(this.props.id);
      this.props.setCoins(R.pathOr([], ['coins'])(data));
    } catch (e) {
      console.log(e);
    }
  };

  toggleCollapsed = () => {
    const { footerCollapsed } = this.props;
    this.props.setFooterCollapsed(!footerCollapsed, () => {
      this.footer.transitionTo(
        {
          transform: [
            {
              translateY: footerCollapsed ? 0 : 310,
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
          <Text style={styles.recommended.header.title}>相关项目</Text>
          <Touchable borderless onPress={this.toggleCollapsed}>
            <Text style={styles.recommended.header.action}>
              {footerCollapsed ? '点击查看' : '点击收起'}
            </Text>
          </Touchable>
        </View>
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
    const { navigation, navBarHidden } = this.props;
    let pdf_url = navigation.getParam('pdf_url');
    pdf_url = decodeURI(pdf_url);
    pdf_url = encodeURI(pdf_url);

    const title = navigation.getParam('title');

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
