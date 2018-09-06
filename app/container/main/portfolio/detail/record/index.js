import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import styles from './style';
import InvestmentInfo from './investment';
import TokenReturn from './tokenReturn';
import TokenExit from './tokenExit';
import Loading from 'component/uikit/loading';
import Lock from 'component/auth/permission/lock';
import NavBar from 'component/navBar';

@global.bindTrack({
  page: '项目记录详情',
  name: 'App_ProjectRecordDetailOperation',
})
@connect(({ loading, portfolio }, props) => {
  const item = props.navigation.getParam('item');
  return {
    item: R.pathOr({}, ['current'])(portfolio),
    project_id: R.pathOr(0, ['id'])(item),
    loading: loading.effects['portfolio/get'],
  };
})
class Record extends Component {
  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    if (!R.isEmpty(this.props.item)) {
      return;
    }
    this.props.dispatch({
      type: 'portfolio/get',
      payload: this.props.project_id,
    });
  };

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
    const title = R.pathOr('', ['item', 'name'])(this.props);
    return (
      <View style={styles.container}>
        <NavBar back gradient title={title} />
        <ScrollView
          style={styles.scrollView}
          ref={ref => {
            this.scroll = ref;
          }}
        >
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

export default Record;
