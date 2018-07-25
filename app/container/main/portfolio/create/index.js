import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import SafeAreaView from 'component/uikit/safeArea';
import List from 'component/uikit/list';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import SearchBar from 'component/searchBar';
import styles from './style';

class CreateProject extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavBar gradient back title="添加项目" />
      </SafeAreaView>
    );
  }
}

export default CreateProject;
