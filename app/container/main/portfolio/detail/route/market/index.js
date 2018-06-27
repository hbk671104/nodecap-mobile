import React, { PureComponent } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import R from 'ramda';

import Header from './partials/header';
import Group from './partials/group';
import Holdings from './partials/holdings';
import Investment from './partials/investment';
import ROI from './partials/roi';
import Asset from './partials/asset';
import Chart from './partials/chart';
import styles from './style';

@compose(withState('stat', 'setStat', {}))
@connect(({ loading }) => ({
  loading: loading.effects['portfolio/projectStat'],
}))
class Market extends PureComponent {
  componentWillMount() {
    this.loadStat();
  }

  loadStat = () => {
    const { id, setStat } = this.props;
    this.props.dispatch({
      type: 'portfolio/projectStat',
      id,
      callback: (res) => {
        setStat(res);
      },
    });
  };

  render() {
    const { ROI: roi, investment } = this.props.stat;
    const { loading } = this.props;
    if (loading || R.isNil(this.props.stat)) {
      return <ActivityIndicator style={{ marginTop: 10 }} />;
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header {...this.props} />
          <View style={styles.divider} />
          <Chart {...this.props} />
          <Group title="资产分析" subtitle="以不同本位币做基准">
            <Asset {...this.props} />
          </Group>
          {!!roi && (
            <Group title="投资回报率" subtitle="以不同本位币做基准">
              <ROI data={roi} />
            </Group>
          )}
          {!!investment && (
            <Group title="项目浮动盈亏" subtitle="以不同本位币做基准">
              <Investment data={investment} />
            </Group>
          )}
          {!!investment &&
            !!investment.assets && (
              <Group title="总市值" subtitle="以不同本位币做基准">
                <Holdings data={investment.assets} />
              </Group>
            )}
        </ScrollView>
      </View>
    );
  }
}

export default Market;
