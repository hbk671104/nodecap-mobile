import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';

import Header from './partials/header';
import Group from './partials/group';
import Holdings from './partials/holdings';
import Investment from './partials/investment';
import ROI from './partials/roi';
import Asset from './partials/asset';
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
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header {...this.props} />
          <View style={styles.divider} />
          <Group title="资产分析" subtitle="以不同本位币做基准">
            <Asset />
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
