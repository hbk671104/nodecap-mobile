import React, { PureComponent } from 'react';
import { View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import Modal from 'react-native-modal';
import R from 'ramda';

import Header from './partials/header';
import Group from './partials/group';
import Holdings from './partials/holdings';
import Investment from './partials/investment';
import ROI from './partials/roi';
import Asset from './partials/asset';
import Chart from './partials/chart';
import Selector from './selector';
import styles from './style';

@compose(withState('selectorVisible', 'setSelectorVisible', false))
@compose(withState('currentSymbol', 'setCurrentSymbol', {}))
@compose(withState('symbols', 'setSymbols', []))
@compose(withState('stat', 'setStat', {}))
@connect(({ loading }) => ({
  loading: loading.effects['portfolio/projectStat'],
}))
class Market extends PureComponent {
  state = {
    modalOffset: 0,
  };

  componentWillMount() {
    this.loadStat();
  }

  onPairSelected = (symbol) => {
    this.toggleVisible();
    const { setCurrentSymbol } = this.props;
    setCurrentSymbol(symbol, () => {
      this.loadStat();
    });
  };

  onLayout = ({ nativeEvent: { layout } }) => {
    const { height } = layout;
    const deviceHeight = Dimensions.get('window').height;
    this.setState({ modalOffset: deviceHeight - height + 50 });
  };

  loadStat = () => {
    const { id, setStat, setSymbols, setCurrentSymbol, currentSymbol } = this.props;
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
    const { modalOffset } = this.state;
    if (loading || R.isNil(this.props.stat)) {
      return <ActivityIndicator style={{ marginTop: 10 }} />;
    }
    return (
      <View style={styles.container} onLayout={this.onLayout}>
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
          style={[styles.modal, { marginTop: modalOffset }]}
          isVisible={selectorVisible}
          backdropOpacity={0.4}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={this.toggleVisible}
        >
          <Selector {...this.props} onSelect={this.onPairSelected} />
        </Modal>
      </View>
    );
  }
}

export default Market;
