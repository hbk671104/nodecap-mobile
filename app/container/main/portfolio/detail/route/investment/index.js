import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import styles from './style';
import Header from './header';
import BaseInfo from './baseInfo';
import InvestmentInfo from './investment';
import TokenReturn from './tokenReturn';
import TokenExit from './tokenExit';
import Loading from 'component/uikit/loading';
import Lock from 'component/auth/permission/lock';

@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
  subModuleName: '投资信息',
})
@connect(({ loading }) => ({
  loading: loading.effects['portfolio/get'],
}))
class Investment extends PureComponent {
  handleOnLayout = type => ({ nativeEvent: { layout } }) => {
    const anchor_type = this.props.navigation.getParam('anchor_type');
    if (R.isNil(anchor_type) || !R.equals(type, anchor_type)) {
      return;
    }
    this.scroll.scrollTo({ y: layout.y, animated: true });
  };

  render() {
    const { loading, item } = this.props;
    if (loading || R.or(R.isNil(item), R.isEmpty(item))) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          ref={ref => {
            this.scroll = ref;
          }}
        >
          <Header {...this.props} />
          <BaseInfo {...this.props} />
          <Lock name="invest-view">
            <InvestmentInfo
              {...this.props}
              onLayout={this.handleOnLayout('invest')}
            />
          </Lock>
          <Lock name="return_token-view">
            <TokenReturn
              {...this.props}
              onLayout={this.handleOnLayout('return')}
            />
          </Lock>
          <Lock name="exit_token-view">
            <TokenExit {...this.props} onLayout={this.handleOnLayout('exit')} />
          </Lock>
        </ScrollView>
      </View>
    );
  }
}

export default Investment;
