import React, { Component } from 'react';
import { View } from 'react-native';
import { compose, withState } from 'recompose';
import PDF from 'react-native-pdf';
import Orientation from 'react-native-orientation';
import R from 'ramda';

import NavBar from 'component/navBar';

import styles from './style';

@global.bindTrack({
  page: '项目公海机构报告详情',
  name: 'App_PublicProjectInstitutionReportDetailOperation',
})
@compose(withState('navBarHidden', 'setNavBarHidden', false))
export default class InstitutionReportDetail extends Component {
  componentDidMount() {
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this.orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  orientationDidChange = orientation => {
    this.props.setNavBarHidden(orientation === 'LANDSCAPE');
  };

  render() {
    const { navigation, navBarHidden } = this.props;
    const pdf_url = navigation.getParam('pdf_url');
    const title = navigation.getParam('title');

    return (
      <View style={styles.container}>
        {R.not(navBarHidden) && <NavBar gradient back title={title} />}
        <PDF
          style={styles.pdf}
          source={{
            uri: pdf_url,
            cache: true,
          }}
          // onLoadComplete={(numberOfPages, filePath) => {
          //   console.log(`number of pages: ${numberOfPages}`);
          // }}
          // onPageChanged={(page, numberOfPages) => {
          //   console.log(`current page: ${page}`);
          // }}
          // onError={error => {
          //   console.log(error);
          // }}
        />
      </View>
    );
  }
}
