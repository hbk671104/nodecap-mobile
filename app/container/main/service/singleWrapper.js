import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import NavBar from 'component/navBar';

import ServiceList from './index';
import styles from './style';

@global.bindTrack({
  page: '找服务',
  name: 'App_ServiceOperation',
})
@connect(({ global }, { navigation }) => ({
  type: R.pipe(
    R.pathOr([], ['constants', 'industry_type']),
    R.find(t => t.value === navigation.getParam('type')),
  )(global),
}))
export default class ServiceSinglePage extends Component {
  componentDidMount() {
    this.props.track(`进入${R.path(['type', 'name'])(this.props)}`);
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar back gradient title={`找${R.path(['type', 'name'])(this.props)}`} />
        <ServiceList
          type={R.path(['type', 'value'])(this.props)}
        />
      </View>
    );
  }
}
