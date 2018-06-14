import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ActivityIndicator, ViewPropTypes } from 'react-native';
import * as Color from 'component/uikit/color';

class List extends Component {
  static propTypes = {
    listRef: PropTypes.func,
    data: PropTypes.array.isRequired,
    pagination: PropTypes.object,
    action: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    renderEmpty: PropTypes.func,
    renderSeparator: PropTypes.func,
    refreshing: PropTypes.bool,
    loadingMore: PropTypes.bool,
    onRefresh: PropTypes.func,

    // styles
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    refreshing: false,
    loadingMore: false,
  };

  componentWillMount() {
    if (this.props.action) {
      this.props.action();
    }
  }

  extractKey = (item, index) => item.id || `${index}`;

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
    if (this.props.loadingMore) {
      return (
        <View style={styles.footerRefresher.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return null;
  };

  renderEmpty = () => {
    if (this.props.refreshing) {
      return null;
    }
    if (this.props.renderEmpty) {
      return this.props.renderEmpty();
    }
    return (
      <View>
        <Text>我是空页面</Text>
      </View>
    );
  };

  render() {
    const {
      listRef,
      data,
      renderItem,
      renderHeader,
      renderSeparator,
      refreshing,
      style,
    } = this.props;
    return (
      <FlatList
        {...this.props}
        style={[styles.container, style]}
        ref={listRef}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={this.handleOnRefresh}
        refreshing={refreshing}
        onEndReached={this.handleOnEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
          return null;
        }}
        keyboardShouldPersistTaps="handled"
        keyExtractor={this.extractKey}
      />
    );
  }
}

const styles = {
  container: {
    backgroundColor: Color.backgroundColor,
  },
  empty: {
    container: {
      alignSelf: 'center',
      marginTop: 100,
    },
    text: {
      fontSize: 16,
      color: Color.titleColor,
    },
  },
  footerRefresher: {
    container: {
      paddingVertical: 10,
    },
  },
};

export default List;
