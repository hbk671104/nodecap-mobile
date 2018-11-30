import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import bind from 'lodash-decorators/bind';
import { compose, withHandlers, withState } from 'recompose';
import R from 'ramda';

import NavBar from 'component/navBar';
import TextInput from 'component/uikit/textInput';

import SingleResult from './singleResult';
import GlobalResult from './globalResult';
import SearchHistory from './searchHistory';

import CoinItem from 'component/favored/item';
import InstitutionReportItem from 'component/public_project/report_item';
import InstitutionItem from 'component/institution/item';
import UserItem from 'component/user/item';

import styles from './style';

@global.bindTrack({
  page: '全局搜索',
  name: 'App_GlobalSearch',
})
@connect(({ global, globalSearch, loading }) => {
  const data = {};
  const types = [{
    name: 'coins',
  }, {
    name: 'reports',
  }, {
    name: 'industries',
  }, {
    name: 'services',
  }, {
    name: 'users',
  }];
  types.map(i => {
    data[i.name] = {
      data: R.pathOr([], ['search', i.name, 'data'])(globalSearch),
      pagination: R.pathOr(null, ['search', i.name, 'pagination'])(globalSearch),
      loading: loading.effects[`globalSearch/${i.name}`],
    };
    return i;
  });
  return ({
    type: R.pipe(
      R.pathOr([], ['constants', 'industry_type']),
      R.filter(
        t => t.value !== 3 && t.value !== 7 && t.value !== 8 && t.value !== 1,
      ),
    )(global),
    globalData: data,
    empty: types.every(i =>
      R.compose(R.isEmpty, R.pathOr([], ['search', i.name, 'data']))(globalSearch) &&
      !loading.effects[`globalSearch/${i.name}`] &&
      globalSearch.search !== null
    ),
    clean: types.every(i => !loading.effects[`globalSearch/${i.name}`]) &&
    globalSearch.search === null,
  });
})
@compose(
  withState('history', 'setHistory', []),
  withHandlers({
    addHistory: (props) => async (item) => {
      const historyStr = await AsyncStorage.getItem('historySearch');
      const history = historyStr ? JSON.parse(historyStr) : [];
      let newHistory = null;
      if (R.contains(item)) {
        newHistory = [item].concat(
          history.filter(i => item !== i)
        );
      } else {
        newHistory = [item].concat(history);
      }
      AsyncStorage.setItem('historySearch', JSON.stringify(newHistory));
    },
    clearHistory: (props) => async () => {
      try {
        await AsyncStorage.removeItem('historySearch');
        props.setHistory([]);
      } catch (e) {
        console.log(e);
      }
    },
  })
)
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
      this.props.addHistory(this.state.searchText);
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
          inputRef={(ref) => {
            this.inputRef = ref;
          }}
        />
        {!this.state.searchText &&
        (<Image style={styles.searchIcon} source={require('asset/search_icon.png')} />)
        }
      </View>
    );
  }


  render() {
    const { type } = this.props;
    if (this.props.clean && !this.props.searchText) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <NavBar back gradient renderTitle={this.renderSearchBar()} />
          <SearchHistory
            {...this.props}
            onPress={(text) => {
              this.onSearch(text);
              this.inputRef.setNativeProps({ text });
              setTimeout(() => {
                this.onSubmit();
              });
            }}
          />
        </View>
      );
    }

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
            data={this.props.globalData}
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
