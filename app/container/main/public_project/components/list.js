import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  Image,
  FlatList,
  ActivityIndicator,
  ViewPropTypes,
  StyleSheet,
  Text,
} from 'react-native';
import { Button } from 'antd-mobile';
import R from 'ramda';

const AnimatedList = Animated.createAnimatedComponent(FlatList);

class List extends PureComponent {
  static propTypes = {
    listRef: PropTypes.func,
    data: PropTypes.array,
    pagination: PropTypes.object,
    action: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    renderEmpty: PropTypes.func,
    renderSeparator: PropTypes.func,
    refreshing: PropTypes.bool,
    loading: PropTypes.bool,
    loadOnStart: PropTypes.bool,
    itemHeight: PropTypes.number,
    disableRefresh: PropTypes.bool,

    // styles
    style: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    refreshing: false,
    loading: false,
    loadOnStart: true,
    disableRefresh: false,
  };

  state = {
    listScrolled: false,
  };

  componentWillMount() {
    if (this.props.action && this.props.loadOnStart) {
      this.handleAction(true);
    }
  }

  extractKey = (item, index) => (item.id ? `${item.id}` : `${index}`);

  handleAction = isRefresh => {
    if (this.props.loading) {
      return;
    }
    this.props.action(isRefresh);
  };

  handleOnRefresh = () => {
    if (this.props.action) {
      this.handleAction(true);
    }
  };

  handlePagination = () => {
    this.handleAction();
  };

  handleOnEndReached = () => {
    if (!this.state.listScrolled) {
      return;
    }
    if (!this.onEndReachedCalledDuringMomentum) {
      this.handlePagination();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  handleOnMomentumScrollBegin = () => {
    if (this.props.onMomentumScrollBegin) {
      this.props.onMomentumScrollBegin();
    }
    this.onEndReachedCalledDuringMomentum = false;
  };

  handleOnMomentumScrollEnd = () => {
    if (this.props.onMomentumScrollEnd) {
      this.props.onMomentumScrollEnd();
    }
  };

  handleGetItemLayout = itemHeight => (data, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  renderHeader = () => {
    if (R.isNil(this.props.data) || R.isEmpty(this.props.data)) {
      return null;
    }
    if (this.props.renderHeader) {
      return this.props.renderHeader();
    }
    return null;
  };

  renderFooter = () => {
    if (R.isNil(this.props.data) || R.isEmpty(this.props.data)) {
      return null;
    }
    if (this.props.renderFooter) {
      return this.props.renderFooter();
    }
    if (this.props.data.length > 0 && this.props.loading) {
      return (
        <View style={styles.footerRefresher.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return null;
  };

  renderEmpty = () => {
    if (R.isNil(this.props.data)) {
      return null;
    }
    if (this.props.renderEmpty) {
      return this.props.renderEmpty();
    }
    return (
      <View style={styles.empty.container}>
        <Image source={require('asset/none.png')} />
        <View style={{ marginTop: 50 }}>

          <Button type="ghost" size="large" onClick={() => this.props.action(true)} loading={this.props.loading}>点击刷新数据</Button>
          <Text style={{
            fontSize: 12,
            color: 'rgba(0,0,0, .65)',
            marginTop: 10,
          }}
          >请确认您的网络状况良好，且已允许 Hotnode 访问网络
          </Text>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    if (this.props.renderSeparator) {
      return this.props.renderSeparator();
    }
    return null;
  };

  render() {
    const {
      listRef,
      data,
      pagination,
      loading,
      renderItem,
      style,
      contentContainerStyle,
      itemHeight,
      disableRefresh,
    } = this.props;
    const isRefreshing = () => {
      if (loading) {
        if (!pagination) {
          return true;
        }
        if (pagination && pagination.current === 1) {
          return true;
        }
      }
      return false;
    };
    return (
      <AnimatedList
        {...this.props}
        {...(disableRefresh
          ? {}
          : {
              refreshing: isRefreshing(),
              onRefresh: this.handleOnRefresh,
            })}
        style={[styles.container, style]}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        ref={listRef}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        ItemSeparatorComponent={this.renderSeparator}
        onEndReached={this.handleOnEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={this.handleOnMomentumScrollBegin}
        onMomentumScrollEnd={this.handleOnMomentumScrollEnd}
        onScrollEndDrag={() => this.setState({ listScrolled: true })}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        removeClippedSubviews={false}
        keyExtractor={this.extractKey}
        {...(itemHeight
          ? {
              getItemLayout: this.handleGetItemLayout(itemHeight),
            }
          : {})}
      />
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingVertical: 5,
  },
  empty: {
    container: {
      alignItems: 'center',
      marginTop: 100,
    },
    text: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
  separator: {
    height: 10,
  },
  footerRefresher: {
    container: {
      height: 36,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    line: {
      flex: 1,
      backgroundColor: '#E9E9E9',
      height: StyleSheet.hairlineWidth,
      marginHorizontal: 10,
    },
    text: {
      fontSize: 12,
      color: '#999999',
      fontWeight: '200',
    },
  },
};

export default List;
