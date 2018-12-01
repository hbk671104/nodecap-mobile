import React, { Component } from 'react';
import { View, Image } from 'react-native';
import NavBar from 'component/navBar';
import TextInput from 'component/uikit/textInput';
import bind from 'lodash-decorators/bind';
import debounce from 'lodash-decorators/debounce';
import List from 'component/uikit/list';

function SearchableListHOC(props) {
  return (ComponentClass) => class SearchableList extends Component {
    state = {
      searchText: '',
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.computedProps = typeof props === 'function' ? props(nextProps) : props;
    }

    @debounce(200)
    @bind
    onSearch(text) {
      this.setState({
        searchText: text,
      });
      if (!text) {
        this.computedProps.action({});
      } else {
        this.computedProps.action({
          page: 1,
          size: 20,
          searchText: text,
        });
      }
    }

    computedProps = typeof props === 'function' ? props(this.props) : props

    renderSearchBar = () => () => {
      return (
        <View style={{ flex: 1, marginLeft: 38.5, marginRight: 12, position: 'relative' }}>
          <TextInput
            placeholder={`搜索${this.computedProps.name}`}
            style={styles.input}
            placeholderTextColor="rgba(255, 255, 255, .65)"
            clearButtonMode="always"
            onChange={this.onSearch}
          />
          {!this.state.searchText &&
          (<Image style={styles.searchIcon} source={require('asset/search_icon.png')} />)
          }
        </View>
      );
    }

    renderResult = () => {
      const { data, loading, pagination } = this.computedProps;
      return (
        <View style={styles.container}>
          <List
            contentContainerStyle={styles.list.content}
            action={(page, size) => this.computedProps.action({
              page,
              size,
              searchText: this.state.searchText,
            })}
            loading={loading}
            data={data}
            pagination={pagination}
            renderItem={this.computedProps.renderItem}
            keyboardDismissMode="on-drag"
          />
        </View>
      );
    }

    render() {
      return (
        <View style={{ flex: 1 }}>
          <NavBar
            back
            gradient
            renderTitle={this.renderSearchBar()}
          />
          {this.state.searchText ? this.renderResult() : <ComponentClass {...this.props} />}
        </View>
      );
    }
  };
}

const styles = {
  input: {
    backgroundColor: '#0F7EE2',
    height: 31,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 2,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: 8,
    width: 14,
    height: 14,
  },
  list: {
    content: {
      paddingVertical: 0,
    },
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};
export default SearchableListHOC;
