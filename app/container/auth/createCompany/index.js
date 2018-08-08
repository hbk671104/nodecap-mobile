import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import styles from './style';

@connect()
class CreateCompany extends Component {
  handleBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient back title="创建公司" />
      </View>
    );
  }
}

export default CreateCompany;
