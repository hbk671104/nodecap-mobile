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
import Loading from 'component/uikit/loading';

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

    // styles
    style: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    refreshing: false,
    loading: false,
    loadOnStart: true,
  };

  componentWillMount() {
    if (this.props.action && this.props.loadOnStart) {
      this.props.action();
    }
  }

  extractKey = (item, index) => `${item.id}` || `${index}`;

  handleOnRefresh = () => {
    if (this.props.action) {
      this.props.action();
    }
  };

  handlePagination = () => {
    if (this.props.action && this.props.pagination) {
      const { current, pageCount, pageSize } = this.props.pagination;
      if (current < pageCount) {
        this.props.action(current + 1, pageSize);
      }
    }
  };

  handleOnEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.handlePagination();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  renderFooter = () => {
    if (this.props.renderFooter) {
      return this.props.renderFooter();
    }
    if (this.props.pagination && this.props.data.length > 0) {
      const { current, pageCount } = this.props.pagination;
      if (this.props.loading && current > 1) {
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
    if (this.props.refreshing || this.props.loading || R.isNil(this.props.data)) {
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
      action,
      renderItem,
      renderHeader,
      refreshing,
      style,
      contentContainerStyle,
    } = this.props;
    if ((loading && !pagination) || (loading && pagination && pagination.current === 1)) {
      return <Loading />;
    }
    return (
      <FlatList
        {...this.props}
        style={[styles.container, style]}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        ref={listRef}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        ItemSeparatorComponent={this.renderSeparator}
        {...(refreshing
          ? {
              onRefresh: () => action(),
              refreshing,
            }
          : {})}
        onEndReached={this.handleOnEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
          return null;
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        keyExtractor={this.extractKey}
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
      paddingVertical: 10,
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
