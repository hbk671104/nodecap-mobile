import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';

import ListItem from './listItem';
import ListHeader from './listHeader';
import Header from './header';
import styles from './style';

@compose(withState('offsetY', 'setOffsetY', 0))
class Management extends Component {
  handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
    this.props.setOffsetY(contentOffset.y);
  };

  renderNavBarRight = () => (
    <View style={styles.navBar.right.container}>
      <Touchable style={{ marginRight: 12 }}>
        <Image
          resizeMode="contain"
          style={styles.navBar.right.item}
          source={require('asset/management/key.png')}
        />
      </Touchable>
      <Touchable>
        <Image
          resizeMode="contain"
          style={styles.navBar.right.item}
          source={require('asset/management/plus.png')}
        />
      </Touchable>
    </View>
  );

  renderHeader = () => <Header />;

  renderListHeader = () => <ListHeader />;

  renderItem = ({ item }) => <ListItem />;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { offsetY } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          title="资产管理"
          bottomHidden={offsetY > 0}
          renderRight={this.renderNavBarRight}
          renderBottom={this.renderHeader}
        />
        {this.renderListHeader()}
        <List
          // action={this.requestData}
          data={[
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
            { id: 11 },
            { id: 12 },
          ]}
          // pagination={pagination}
          // loading={loading}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          // renderHeader={this.renderHeader}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}

export default Management;
