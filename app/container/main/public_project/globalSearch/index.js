import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import bind from 'lodash-decorators/bind';
import debounce from 'lodash-decorators/debounce';

import NavBar from 'component/navBar';
import TextInput from 'component/uikit/textInput';

import SingleResult from './singleResult';
import GlobalResult from './globalResult';

import CoinItem from 'component/favored/item';
import InstitutionReportItem from 'component/public_project/report_item';
import InstitutionItem from 'component/institution/item';
import UserItem from 'component/user/item';

import styles from './style';

@global.bindTrack({
  page: '全局搜索',
  name: 'App_GlobalSearch',
})
@connect(({ global }) => ({
  type: R.pipe(
    R.pathOr([], ['constants', 'industry_type']),
    R.filter(
      t => t.value !== 3 && t.value !== 7 && t.value !== 8 && t.value !== 1,
    ),
  )(global),
}))
export default class GlobalSearch extends Component {
  state = {
    searchText: '',
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'globalSearch/clearSearch',
    });
  }


  @bind
  onSearch(text) {
    this.setState({
      searchText: text,
    });

    if (!text) {
      this.props.dispatch({
        type: 'globalSearch/clearSearch',
      });
    }
  }

  onSubmit = () => {
    if (this.state.searchText) {
      this.props.dispatch({
        type: 'globalSearch/search',
        payload: {
          q: this.state.searchText,
        },
      });
    }
  }

  jumpTo = (index) => {
    this.tabView.goToPage(index);
  }

  renderTabBar = () => (
    <ScrollableTabBar
      style={styles.tabBar.container}
      tabStyle={styles.tabBar.tab}
      textStyle={styles.tabBar.text}
      activeTextColor="#1890FF"
      inactiveTextColor="rgba(0, 0, 0, 0.65)"
      underlineStyle={styles.tabBar.underline}
      renderTab={this.renderTab}
    />
  );

  renderSearchBar = () => () => {
    return (
      <View style={{ flex: 1, marginLeft: 38.5, marginRight: 12, position: 'relative' }}>
        <TextInput
          placeholder="搜索项目 / 研报 / 投资机构 / 服务机构 / 用户"
          style={styles.input}
          placeholderTextColor="rgba(255, 255, 255, .65)"
          clearButtonMode="always"
          onChange={this.onSearch}
          onSubmitEditing={this.onSubmit}
          autoFocus
        />
        {!this.state.searchText &&
        (<Image style={styles.searchIcon} source={require('asset/search_icon.png')} />)
        }
      </View>
    );
  }


  render() {
    const { type } = this.props;
    return (
      <View style={styles.container}>
        <NavBar back gradient renderTitle={this.renderSearchBar()} />
        <ScrollableTabView
          ref={ref => {
            this.tabView = ref;
          }}
          renderTabBar={this.renderTabBar}
          prerenderingSiblingsNumber={Infinity}
          onChangeTab={({ i }) => {
            this.props.track('tab 滑动', { tabIndex: `${i}` });
          }}
        >
          <GlobalResult
            tabLabel="综合"
            jumpTo={this.jumpTo}
            searchText={this.state.searchText}
          />
          <SingleResult
            type="coins"
            tabLabel="项目"
            item={CoinItem}
            searchText={this.state.searchText}
          />
          <SingleResult
            type="reports"
            tabLabel="研报"
            item={InstitutionReportItem}
            searchText={this.state.searchText}
            itemOnPress={(item) => {
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: 'InstitutionReportDetail',
                  params: {
                    id: item.id,
                  },
                }),
              );
            }}
          />
          <SingleResult
            type="industries"
            tabLabel="投资机构"
            item={InstitutionItem}
            searchText={this.state.searchText}
            itemOnPress={(item) => {
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: 'InstitutionDetail',
                  params: {
                    id: item.id,
                  },
                  key: `InstitutionDetail_${item.id}`,
                }),
              );
            }}
          />
          <SingleResult
            type="services"
            tabLabel="服务机构"
            item={InstitutionItem}
            searchText={this.state.searchText}
            itemOnPress={(item) => {
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: 'InstitutionDetail',
                  params: {
                    id: item.id,
                  },
                  key: `InstitutionDetail_${item.id}`,
                }),
              );
            }}
          />
          <SingleResult
            type="users"
            tabLabel="用户"
            item={UserItem}
            itemOnPress={(item) => {
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: 'UserProfile',
                  params: {
                    data: item,
                  },
                }),
              );
            }}
          />
        </ScrollableTabView>
      </View>
    );
  }
}
