import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Section from './section';
import styles from './style';

@global.bindTrack({
  page: '网址大全',
  name: 'App_YellowPageOperation',
})
@connect(({ yellowpage }) => ({
  data: R.path(['list'])(yellowpage),
}))
class YellowPage extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  handleItemPress = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  render() {
    const { data } = this.props;
    const exchange = R.pathOr([], ['exchange'])(data);
    const wallet = R.pathOr([], ['wallet'])(data);
    return (
      <View style={styles.container}>
        <NavBar
          back
          barStyle="dark-content"
          title="网址大全"
          showBottomBorder
        />
        <ScrollView style={styles.scroll}>
          <Section
            title="交易所"
            data={exchange}
            onItemPress={this.handleItemPress}
          />
          <View style={{ marginTop: 10 }}>
            <Section
              title="钱包"
              data={wallet}
              onItemPress={this.handleItemPress}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default YellowPage;
