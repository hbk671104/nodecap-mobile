import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import { Toast } from 'antd-mobile';

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
class CreateInstitutionWrapper extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleNextPress = () => {
    const { nextPage, isEditing } = this.props;
    this.props.form.validateFields(err => {
      if (!err) {
        if (isEditing) {
          this.props.dispatch({
            type: 'institution_create/submitInstitution',
            callback: this.handleBackAction,
          });
          return;
        }

        if (nextPage === 'CreateMyInstitutionDescription') {
          Toast.loading('加载中...', 0);
          this.props.dispatch({
            type: 'institution_create/searchInstitution',
            payload: {
              page: 1,
              'per-page': 20,
            },
            callback: ({ data }) => {
              Toast.hide();
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: R.isEmpty(data)
                    ? nextPage
                    : 'ClaimMyInstitutionSearch',
                }),
              );
            },
          });
          return;
        }

        this.props.dispatch(
          NavigationActions.navigate({
            routeName: nextPage,
          }),
        );
      }
    });
  };

  handleBackAction = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyInstitutionDetail',
      }),
    );
  };

  render() {
    const { children, title, isEditing, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          back
          barStyle="dark-content"
          title={title}
          renderRight={() => {
            if (loading) {
              return <ActivityIndicator color="white" />;
            }
            return (
              <Touchable borderless onPress={this.handleNextPress}>
                <Text style={styles.navBar.right}>
                  {isEditing ? '保存' : '下一步'}
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
