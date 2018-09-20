import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import styles from './style';
import InvestmentInfo from './investment';
import Loading from 'component/uikit/loading';
import NavBar from 'component/navBar';

@global.bindTrack({
  page: '项目记录详情',
  name: 'App_ProjectRecordDetailOperation',
})
@connect(({ loading, global, public_project, router }, props) => {
  const id = props.navigation.getParam('id');
  return {
    item: R.pathOr({}, ['current'])(public_project),
    id,
    constants: global.constants,
    loading: loading.effects['public_project/get'],
    record_loading: loading.effects['public_project/getExtra'],
    hasDetailInStack: !R.pipe(
      R.path(['routes']),
      R.find(r => r.routeName === 'Individual'),
      R.path(['routes']),
      R.find(r => r.routeName === 'PublicProjectDetail'),
      R.isNil,
    )(router),
  };
})
class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.layoutInstance = {};
  }
  componentWillMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextprops) {
    if (this.props.record_loading && !nextprops.record_loading) {
      const anchor_type = this.props.navigation.getParam('anchor_type');
      this.scroll.scrollTo({
        y: this.layoutInstance[anchor_type],
        animated: true,
      });
    }
  }
  componentWillUnmount() {
    if (this.props.hasDetailInStack) {
      return;
    }
    this.props.dispatch({
      type: 'public_project/clearDetail',
    });
  }

  loadData = () => {
    if (!R.isEmpty(this.props.item)) {
      return;
    }
    this.props.dispatch({
      type: 'public_project/get',
      payload: this.props.id,
    });
  };

  handleOnLayout = type => ({ nativeEvent: { layout } }) => {
    const anchor_type = this.props.navigation.getParam('anchor_type');
    if (R.isNil(anchor_type) || !R.equals(type, anchor_type)) {
      return;
    }
    this.layoutInstance[anchor_type] = layout.y;
  };

  render() {
    const { loading, item } = this.props;
    const invalid = loading || R.isEmpty(item);
    const title = R.pathOr('', ['item', 'name'])(this.props);
    return (
      <View style={styles.container}>
        <NavBar back gradient title={title} />
        {invalid ? (
          <Loading />
        ) : (
          <ScrollView
            style={styles.scrollView}
            ref={ref => {
              this.scroll = ref;
            }}
          >
            <InvestmentInfo
              {...this.props}
              onLayout={this.handleOnLayout('invest')}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default Record;
