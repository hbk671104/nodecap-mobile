import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import { Toast } from 'antd-mobile';
import _ from 'lodash';

import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import SimplifiedItem from 'component/public_project/simplified_item';
import Touchable from 'component/uikit/touchable';
import List from 'component/uikit/list';
import styles from './style';

@global.bindTrack({
  page: '创建项目搜索',
  name: 'App_CreateMyProjectSearchOperation',
})
@connect(({ project_create }) => ({
  data: R.pathOr(null, ['query', 'data'])(project_create),
}))
class CreateMyProjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.searchDelayed = _.debounce(this.requestData, 250);
  }

  componentDidMount() {
    this.props.track('进入');
  }

  onSearchTextChange = text => {
    this.setState({ searchText: text }, this.searchDelayed);
  };

  requestData = () => {
    const { searchText } = this.state;
    if (R.isEmpty(searchText)) return;

    this.props.dispatch({
      type: 'project_create/search',
      payload: {
        q: searchText,
      },
    });
  };

  handleSavePress = () => {
    const { searchText } = this.state;
    if (R.isEmpty(searchText)) return;

    const onSave = this.props.navigation.getParam('onProjectSave');
    onSave(searchText);
  };

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ClaimMyProject',
        params: {
          project_id: item.id,
        },
      }),
    );
  };

  renderNavBar = () => (
    <NavBar
      back
      gradient
      title="项目名称"
      renderRight={() => (
        <Touchable borderless onPress={this.handleSavePress}>
          <Text style={styles.navBar.right}>保存</Text>
        </Touchable>
      )}
    />
  );

  renderSearchHeader = () => (
    <View style={styles.searchBar.container}>
      <SearchBar
        autoFocus
        style={styles.searchBar.wrapper}
        inputStyle={styles.searchBar.input}
        onChange={this.onSearchTextChange}
        placeholder="请填写项目名称"
        placeholderTextColor="rgba(0, 0, 0, 0.45)"
        iconColor="#1890FF"
      />
    </View>
  );

  renderItem = ({ item }) => (
    <SimplifiedItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderHeader = () => (
    <View style={styles.listHeader.container}>
      <Text style={styles.listHeader.text}>
        如名称已存在，从下方列表选择；否则直接点击保存
      </Text>
    </View>
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderSearchHeader()}
        <List
          disableRefresh
          contentContainerStyle={styles.listContent}
          data={data}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

export default CreateMyProjectSearch;
