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
import * as Color from 'component/uikit/color';

class List extends PureComponent {
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
    loading: PropTypes.bool,
    onRefresh: PropTypes.func,

    // styles
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    refreshing: false,
    loading: false,
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
    if (this.props.pagination) {
      const { current, pageCount } = this.props.pagination;
      if (this.props.loading && current > 1) {
        return (
          <View style={styles.footerRefresher.container}>
            <ActivityIndicator />
          </View>
        );
      }
      if (current === pageCount) {
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
    if (this.props.refreshing) {
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
        {...(refreshing
          ? {
              onRefresh: this.handleOnEndReached,
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
      alignItems: 'center',
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
