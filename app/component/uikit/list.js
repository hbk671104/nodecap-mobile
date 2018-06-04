import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ViewPropTypes,
} from 'react-native';
import * as Color from 'component/uikit/color';

class List extends Component {
  static propTypes = {
    listRef: PropTypes.func,
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    renderEmpty: PropTypes.func,
    renderSeparator: PropTypes.func,
    loading: PropTypes.bool,
    refreshing: PropTypes.bool,
    loadingMore: PropTypes.bool,
    onRefresh: PropTypes.func,
    onEndReached: PropTypes.func,

    // styles
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    loading: false,
    refreshing: false,
    loadingMore: false,
  }
  extractKey = (item, index) => `${index}`

  handleOnRefresh = () => {
    this.props.onRefresh();
  }

  handleOnEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.props.onEndReached();
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

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
  }

  renderEmpty = () => {
    if (this.props.refreshing || this.props.loading) {
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
  }

  render() {
    const {
      listRef,
      data,
      renderItem,
      renderHeader,
      renderSeparator,
      loading,
      refreshing,
      onRefresh,
      onEndReached,
      style,
    } = this.props;
    if ((refreshing && data.length === 0) || loading) {
      return <ActivityIndicator />;
    }
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
        {...(onRefresh
          ? {
            onRefresh: this.handleOnRefresh,
            refreshing,
          }
          : {})}
        {...(onEndReached
          ? {
            onEndReached: this.handleOnEndReached,
            onEndReachedThreshold: 0.5,
            onMomentumScrollBegin: () => {
              this.onEndReachedCalledDuringMomentum = false;
              return null;
            },
          }
          : {})}
        keyboardShouldPersistTaps="handled"
        keyExtractor={this.props.keyExtractor}
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
