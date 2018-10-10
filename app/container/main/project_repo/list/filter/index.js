import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions, SafeAreaView } from 'react-navigation';

import styles from './style';

@connect(({ public_project }) => ({}))
export default class ProjectListFilter extends Component {
  render() {
    // const { data, pagination, loading } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text>哈哈</Text>
      </SafeAreaView>
    );
  }
}
