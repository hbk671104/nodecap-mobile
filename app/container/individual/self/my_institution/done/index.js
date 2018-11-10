import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Communications from 'react-native-communications';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';

import styles from './style';

@global.bindTrack({
  page: '机构创建完成',
  name: 'App_MyInstitutionCreateDoneOperation',
})
@connect(({ institution }, props) => {
  const id = props.navigation.getParam('id');
  return {
    current_institution_detail: R.path(['current', id])(institution),
  };
})
class CreateInstitutionDone extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleDonePress = () => {
    const { current_institution_detail } = this.props;
    if (current_institution_detail) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'InstitutionDetail',
        }),
      );
      return;
    }
    this.props.dispatch(
      NavigationActions.navigate({ routeName: 'MyInstitution' }),
    );
  };

  handlePhonePress = phone => () => {
    Communications.phonecall(phone, false);
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          barStyle="dark-content"
          renderRight={() => (
            <Touchable borderless onPress={this.handleDonePress}>
              <Text style={styles.navBar.right}>完成</Text>
            </Touchable>
          )}
        />
        <View style={styles.content.container}>
          <Image source={require('asset/project_create/in_review.png')} />
          <Text style={styles.content.title}>审核中</Text>
          <Text style={styles.content.subtitle}>
            {'将在 24 小时内审核完成，请耐心等待\n如有问题请垂询'}{' '}
            <Text
              style={{ color: '#1890FF' }}
              onPress={this.handlePhonePress('18500193244')}
            >
              18500193244
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default CreateInstitutionDone;
