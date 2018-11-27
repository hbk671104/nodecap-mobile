import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import styles from './style';

@global.bindTrack({
  page: '聊天页',
  name: 'App_IMPageOperation',
})
@connect(({ message_center, loading }, { type }) => ({}))
class IMPage extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back />
      </View>
    );
  }
}

export default IMPage;
