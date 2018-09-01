import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import R from 'ramda';

import * as Color from 'component/uikit/color';

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
    onRefresh: PropTypes.func,
    loadOnStart: PropTypes.bool,
    itemHeight: PropTypes.number,

    // styles
    style: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    refreshing: false,
    loading: false,
    loadOnStart: true,
  };

  state = {
    listScrolled: false,
  };

  componentWillMount() {
    if (this.props.action && this.props.loadOnStart) {
      this.handleAction();
    }
  }

  extractKey = (item, index) => (item.id ? `${item.id}` : `${index}`);

  handleAction = (current = 1, pageSize = 20) => {
    this.props.action(current, pageSize);
  };

  handleOnRefresh = () => {
    if (this.props.action) {
      this.handleAction();
    }
  };

  handlePagination = () => {
    if (this.props.action && this.props.pagination) {
      const { current, pageCount, pageSize } = this.props.pagination;
      if (current < pageCount) {
        this.handleAction(current + 1, pageSize);
      }
    }
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
    if (this.props.pagination && this.props.data.length > 0) {
      const { current, pageCount } = this.props.pagination;
      if (this.props.loading) {
        return (
          <View style={styles.footerRefresher.container}>
            <ActivityIndicator />
          </View>
        );
      }
      if (current === pageCount && pageCount > 1) {
        return (
          <View style={styles.footerRefresher.container}>
            <View style={styles.footerRefresher.line} />
            <Text style={styles.footerRefresher.text}>我是有底线的</Text>
            <View style={styles.footerRefresher.line} />
          </View>
        );
      }
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
      <FlatList
        {...this.props}
        refreshing={isRefreshing()}
        onRefresh={this.handleOnRefresh}
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
      color: Color.titleColor,
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
