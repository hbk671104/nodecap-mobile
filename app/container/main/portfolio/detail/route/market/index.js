import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Header from './partials/header';
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
        </ScrollView>
      </View>
    );
  }
}

export default Market;
