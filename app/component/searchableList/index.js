import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NavBar from 'component/navBar';
import bind from 'lodash-decorators/bind';
import debounce from 'lodash-decorators/debounce';
import List from 'component/uikit/list';
import SearchBar from 'component/searchBar';

function SearchableListHOC(props) {
  return ComponentClass =>
    class SearchableList extends Component {
      state = {
        searchText: '',
      };

      componentWillReceiveProps(nextProps, nextContext) {
        this.computedProps =
          typeof props === 'function' ? props(nextProps) : props;
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

      computedProps = typeof props === 'function' ? props(this.props) : props;

      renderSearchBar = () => () => {
        return (
          <View
            style={{
              flex: 1,
              marginLeft: 36,
              marginRight: 12,
            }}
          >
            <SearchBar
              // autoFocus
              // style={styles.searchBar.wrapper}
              inputStyle={{ color: 'rgba(0, 0, 0, 0.85)' }}
              style={{
                backgroundColor: '#F5F5F5',
                flexDirection: 'row-reverse',
              }}
              iconContainerStyle={{
                marginLeft: 12,
              }}
              onChange={this.onSearch}
              placeholder={`搜索${this.computedProps.name}`}
              placeholderTextColor="#999999"
              iconColor="#666666"
            />
          </View>
        );
      };

      renderResult = () => {
        const { data, loading, pagination } = this.computedProps;
        return (
          <View style={styles.container}>
            <List
              contentContainerStyle={styles.list.content}
              action={(page, size) =>
                this.computedProps.action({
                  page,
                  size,
                  searchText: this.state.searchText,
                })
              }
              loading={loading}
              data={data}
              pagination={pagination}
              renderItem={this.computedProps.renderItem}
              keyboardDismissMode="on-drag"
            />
          </View>
        );
      };

      render() {
        return (
          <View style={{ flex: 1 }}>
            <NavBar
              back
              wrapperStyle={styles.searchWrapper}
              barStyle="dark-content"
              renderTitle={this.renderSearchBar()}
            />
            {this.state.searchText ? (
              this.renderResult()
            ) : (
              <ComponentClass {...this.props} />
            )}
          </View>
        );
      }
    };
}

const styles = {
  input: {
    backgroundColor: '#F5F5F5',
    height: 31,
    paddingHorizontal: 10,
    color: '#999999',
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
  searchWrapper: {
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
};
export default SearchableListHOC;
