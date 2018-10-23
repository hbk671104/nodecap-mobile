import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';
import Wrapper from './index';
import styles from './style';

@connect(({ institution_create }) => ({
  current: R.pathOr({}, ['current'])(institution_create),
}))
@createForm()
class ServedProject extends PureComponent {
  handleAddPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyInstitutionSearch',
      }),
    );
  };

  renderItem = ({ item }) => null;

  renderSeparator = () => <View style={styles.separator} />;

  renderEmpty = () => (
    <View style={styles.empty.container}>
      <Touchable
        style={styles.empty.button.container}
        onPress={this.handleAddPress}
      >
        <Text style={styles.empty.button.text}>添加项目</Text>
      </Touchable>
      <Text style={styles.empty.text}>
        添加服务过的明星项目，使您的机构主页更丰富立体
      </Text>
    </View>
  );

  render() {
    const data = R.pathOr([], ['current', 'served_project'])(this.props);
    return (
      <Wrapper {...this.props}>
        <List
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          renderEmpty={this.renderEmpty}
        />
      </Wrapper>
    );
  }
}

export default ServedProject;
