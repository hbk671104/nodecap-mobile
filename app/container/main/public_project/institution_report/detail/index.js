import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PDF from 'react-native-pdf';
import Orientation from 'react-native-orientation';
import R from 'ramda';

import NavBar from 'component/navBar';

import styles from './style';

@global.bindTrack({
  page: '项目公海机构报告详情',
  name: 'App_PublicProjectInstitutionReportDetailOperation',
})
@connect(({ public_project, loading }) => ({
  // data: R.pathOr([{ id: 0 }, { id: 1 }, { id: 2 }], ['report'])(public_project),
  // loading: loading.effects['notification/fetch'],
}))
export default class InstitutionReportDetail extends Component {
  componentDidMount() {
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="研报详情" />
        <PDF
          style={styles.pdf}
          source={{
            uri:
              'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/whitepaper/100204861530783804000-Secc_CN.pdf',
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
