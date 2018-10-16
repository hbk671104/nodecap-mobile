import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';

import { getCurrentScreen } from '../../../../../../../router';
import ProgressBar from '../../../component/progress_bar';
import styles from './style';

@global.bindTrack({
  page: '正常创建项目流程外层',
  name: 'App_MyProjectCreateNormalWrapperOperation',
})
@connect(({ project_create, router }) => {
  const route = R.path(['route'])(project_create);
  const index = R.indexOf(getCurrentScreen(router))(route);
  return {
    index,
    route,
    nextPage: R.pathOr('ClaimMyProject', [index + 1])(route),
  };
})
class CreateProjectNormalWrapper extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleSubmit = () => {};

  handleNextPress = () => {
    const { nextPage } = this.props;
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: nextPage,
      }),
    );
  };

  render() {
    const { children } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title="基本信息"
          renderRight={() => (
            <Touchable borderless onPress={this.handleNextPress}>
              <Text style={styles.navBar.right}>下一步</Text>
            </Touchable>
          )}
        />
        <ProgressBar {...this.props} />
        {children}
      </View>
    );
  }
}

export default CreateProjectNormalWrapper;
