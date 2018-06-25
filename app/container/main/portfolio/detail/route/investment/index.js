import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './style';
import Header from './header';

class Investment extends PureComponent {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Header {...this.props} />
      </ScrollView>
    );
  }
}

export default Investment;
