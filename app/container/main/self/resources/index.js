import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import SearchBarDisplay from 'component/searchBar/display';
import styles from './style';

@connect()
class Resources extends Component {
  handleSearchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResourceSearch',
      }),
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          back
          renderTitle={() => (
            <View style={styles.searchBar.container}>
              <SearchBarDisplay
                title="请输入人脉关键字搜索"
                onPress={this.handleSearchPress}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

export default Resources;
