import React, { PureComponent } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import Header from './partials/header';
import Group from './partials/group';
import ROI from './partials/roi';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['portfolio/projectStat'],
}))
class Market extends PureComponent {
  componentWillMount() {
    this.loadStat();
  }

  loadStat = () => {
    const { id } = this.props;
    this.props.dispatch({
      type: 'portfolio/projectStat',
      id,
      callback: (res) => {
        console.log(res);
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header />
          <View style={styles.divider} />
          <Group title="投资回报率" subtitle="以不同本位币做基准">
            <ROI />
          </Group>
          <Group title="项目浮动盈亏" subtitle="以不同本位币做基准" />
          <Group title="总市值" subtitle="以不同本位币做基准" />
        </ScrollView>
      </View>
    );
  }
}

export default Market;
