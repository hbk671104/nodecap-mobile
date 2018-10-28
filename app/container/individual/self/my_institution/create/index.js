import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';

import { getCurrentScreen } from '../../../../../router';
import styles from './style';

@global.bindTrack({
  page: '创建机构流程外层',
  name: 'App_MyInstitutionCreateWrapperOperation',
})
@connect(({ institution_create, router, loading }) => {
  const route = R.path(['route'])(institution_create);
  const index = R.pipe(
    R.map(r => r.name),
    R.indexOf(getCurrentScreen(router)),
  )(route);
  return {
    title: R.path([index, 'title'])(route),
    nextPage: R.pathOr('ClaimMyInstitution', [index + 1, 'name'])(route),
    isEditing: R.pipe(
      R.path(['current']),
      R.has('id'),
    )(institution_create),
    loading: loading.effects['institution_create/submitInstitution'],
  };
})
@compose(
  withProps(({ nextPage }) => ({
    isLastPage: nextPage === 'ClaimMyInstitution',
  })),
)
class CreateInstitutionWrapper extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleNextPress = () => {
    const { isLastPage, isEditing } = this.props;
    this.props.form.validateFields(err => {
      if (!err) {
        if (isLastPage && isEditing) {
          this.props.dispatch({
            type: 'institution_create/submitInstitution',
            callback: () => {
              console.log('institution_create/submitInstitution');
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: 'MyInstitution',
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
        {children}
      </View>
    );
  }
}

export default CreateInstitutionWrapper;