import React, { PureComponent } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';

import Header from './partials/header';
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
    const { item, setStat } = this.props;
    this.props.dispatch({
      type: 'portfolio/projectStat',
      id: item.id,
      callback: (res) => {
        console.log(res);
        setStat(res);
      },
    });
  };

  render() {
    const { stat } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header />
        </ScrollView>
      </View>
    );
  }
}

export default Market;
