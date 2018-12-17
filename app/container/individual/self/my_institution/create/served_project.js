import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';
import SimplifiedItem from './component/simplified_item';
import Wrapper from './index';
import styles from './style';

@connect(({ institution_create }) => ({
  data: R.pathOr({}, ['current', 'served_project'])(institution_create),
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

  handleDeletePress = item => () => {
    const { data } = this.props;
    this.props.dispatch({
      type: 'institution_create/saveCurrent',
      payload: {
        served_project: R.without([item])(data),
      },
    });
  };

  renderItem = ({ item }) => (
    <SimplifiedItem
      data={item}
      renderRight={() => (
        <Touchable
          borderless
          style={styles.itemRight.container}
          onPress={this.handleDeletePress(item)}
        >
          <Text style={{ fontSize: 12, color: '#F55454', fontWeight: 'bold' }}>
            删除
          </Text>
        </Touchable>
      )}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderFooter = () => {
    const { data } = this.props;
    if (R.isEmpty(data)) {
      return null;
    }
    return (
      <Touchable
        borderless
        style={styles.footer.container}
        onPress={this.handleAddPress}
      >
        <Text style={styles.footer.text}>继续添加 +</Text>
      </Touchable>
    );
  };

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
    const { data } = this.props;
    return (
      <Wrapper {...this.props}>
        <List
          disableRefresh
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          renderEmpty={this.renderEmpty}
          renderFooter={this.renderFooter}
        />
      </Wrapper>
    );
  }
}

export default ServedProject;
