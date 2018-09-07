import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import Empty from '../empty';
import Group from './group';
import Holdings from './holdings';
import Investment from './investment';
import ROI from './roi';
import styles from './style';

@connect(({ loading }) => ({
  loadingStat: loading.effects['portfolio/projectStat'],
}))
export default class Return extends PureComponent {
  render() {
    const { portfolio, loadingStat, can_calculate, unmatched } = this.props;

    if (loadingStat) {
      return <ActivityIndicator style={styles.indicator} />;
    }

    if (unmatched) {
      return (
        <Empty title="项目暂未匹配" subtitle="通过上方立即匹配后即可查看" />
      );
    }

    const investment = R.pathOr({}, ['stats', 'investment'])(portfolio);

    return (
      <View style={styles.container}>
        {R.not(can_calculate) ? (
          <Empty
            title="项目暂无投资记录"
            subtitle="继续点击下方添加投资记录即可计算收益"
          />
        ) : (
          <View>
            <Group title="投资回报率" subtitle="以不同本位币做基准">
              <ROI data={investment.roi} />
            </Group>
            <Group title="项目浮动盈亏" subtitle="以不同本位币做基准">
              <Investment data={investment} />
            </Group>
            <Group title="总市值" subtitle="以不同本位币做基准">
              <Holdings data={investment.cap} />
            </Group>
          </View>
        )}
      </View>
    );
  }
}
