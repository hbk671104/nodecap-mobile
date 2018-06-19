import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['portfolio/projectStat'],
}))
class Market extends PureComponent {
  componentWillMount() {
    this.loadStat();
  }

  loadStat = () => {
    const { item } = this.props;
    this.props.dispatch({
      type: 'portfolio/projectStat',
      id: item.id,
      callback: (res) => {
        console.log(res);
      },
    });
  };

  render() {
    return null;
  }
}

export default Market;
