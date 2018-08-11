import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import R from 'ramda';

import { realBarHeight } from 'component/navBar';
import Modal from 'component/modal';
import Loading from 'component/uikit/loading';
import Header from './partials/header';
import Group from './partials/group';
import Holdings from './partials/holdings';
import Investment from './partials/investment';
import ROI from './partials/roi';
import Asset from './partials/asset';
import Chart from './partials/chart';
import Selector from './selector';
import styles from './style';

@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
  subModuleName: '项目行情',
})
@compose(withState('selectorVisible', 'setSelectorVisible', false))
@compose(withState('currentSymbol', 'setCurrentSymbol', {}))
@compose(withState('symbols', 'setSymbols', []))
@compose(withState('stat', 'setStat', {}))
@connect(({ loading }) => ({
  loading: loading.effects['portfolio/projectStat'],
}))
class Market extends PureComponent {
  componentWillMount() {
    this.loadStat();
  }

  onPairSelected = symbol => {
    this.toggleVisible();
    this.props.track('本位币切换');
    this.props.setCurrentSymbol(symbol, () => {
      this.loadStat();
    });
  };

  loadStat = () => {
    const {
      id,
      setStat,
      setSymbols,
      setCurrentSymbol,
      currentSymbol,
    } = this.props;
    this.props.dispatch({
      type: 'portfolio/projectStat',
      id,
      payload: currentSymbol,
      callback: ({ symbols, data }) => {
        if (symbols) {
          setSymbols(symbols);
          setCurrentSymbol(symbols[0]);
        }
        setStat(data);
      },
    });
  };

  toggleVisible = () => {
    const { selectorVisible, setSelectorVisible } = this.props;
    setSelectorVisible(!selectorVisible);
  };

  render() {
    const { investment } = this.props.stat;
    const { loading, selectorVisible } = this.props;
    if (loading || R.isNil(this.props.stat)) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header {...this.props} toggle={this.toggleVisible} />
          <View style={styles.divider} />
          <Chart {...this.props} />
          <Group title="资产分析" subtitle="以不同本位币做基准">
            <Asset {...this.props} />
          </Group>
          {!!investment &&
            !!investment.roi && (
              <Group title="投资回报率" subtitle="以不同本位币做基准">
                <ROI data={investment.roi} />
              </Group>
            )}
          {!!investment && (
            <Group title="项目浮动盈亏" subtitle="以不同本位币做基准">
              <Investment data={investment} />
            </Group>
          )}
          {!!investment &&
            !!investment.cap && (
              <Group title="总市值" subtitle="以不同本位币做基准">
                <Holdings data={investment.cap} />
              </Group>
            )}
        </ScrollView>
        <Modal
          style={[styles.modal, { marginTop: realBarHeight + 84 }]}
          isVisible={selectorVisible}
          onBackdropPress={this.toggleVisible}
        >
          <Selector {...this.props} onSelect={this.onPairSelected} />
        </Modal>
      </View>
    );
  }
}

export default Market;
