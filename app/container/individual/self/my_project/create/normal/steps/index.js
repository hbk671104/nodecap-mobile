import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
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
@connect(({ project_create, router, loading }) => {
  const route = R.path(['route'])(project_create);
  const index = R.pipe(
    R.map(r => r.name),
    R.indexOf(getCurrentScreen(router)),
  )(route);
  return {
    index,
    route,
    title: R.path([index, 'title'])(route),
    nextPage: R.pathOr('ClaimMyProject', [index + 1, 'name'])(route),
    isEditing: R.pipe(
      R.path(['current']),
      R.has('id'),
    )(project_create),
    loading: loading.effects['project_create/submitProject'],
  };
})
@compose(
  withProps(({ nextPage }) => ({
    isLastPage: nextPage === 'ClaimMyProject',
  })),
)
class CreateProjectNormalWrapper extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleNextPress = () => {
    const { isLastPage, isEditing } = this.props;
    this.props.form.validateFields(err => {
      if (!err) {
        if (isLastPage && isEditing) {
          this.props.dispatch({
            type: 'project_create/submitProject',
            callback: () => {
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: 'MyProject',
                }),
              );
            },
          });
          return;
        }

        const { nextPage } = this.props;
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: nextPage,
          }),
        );
      }
    });
  };

  render() {
    const {
      children,
      title,
      isLastPage,
      isEditing,
      loading,
      barStyle,
    } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          barStyle={barStyle}
          back
          gradient
          title={title}
          renderRight={() => {
            if (loading) {
              return <ActivityIndicator color="white" />;
            }
            return (
              <Touchable borderless onPress={this.handleNextPress}>
                <Text style={styles.navBar.right}>
                  {isLastPage && isEditing ? '提交' : '下一步'}
                </Text>
              </Touchable>
            );
          }}
        />
        <ProgressBar {...this.props} />
        {children}
      </View>
    );
  }
}

export default CreateProjectNormalWrapper;
