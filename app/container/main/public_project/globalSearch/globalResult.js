import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import bind from 'lodash-decorators/bind';
import Touchable from 'component/uikit/touchable';
import Placeholder from 'rn-placeholder';
import { NavigationActions } from 'react-navigation';

import CoinItem from 'component/favored/item';
import InstitutionReportItem from 'component/public_project/report_item';
import InstitutionItem from 'component/institution/item';
import UserItem from 'component/user/item';
import Empty from 'component/empty';

@connect()
class globalResult extends Component {
  types = [
    {
      name: 'coins',
      item: CoinItem,
      title: '项目',
      jumpToIndex: 1,
    },
    {
      name: 'reports',
      item: InstitutionReportItem,
      onPress: item => {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'InstitutionReportDetail',
            params: {
              id: item.id,
            },
          }),
        );
      },
      title: '研报',
      jumpToIndex: 2,
    },
    {
      name: 'industries',
      item: InstitutionItem,
      onPress: item => {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'InstitutionDetail',
            params: {
              id: item.id,
            },
            key: `InstitutionDetail_${item.id}`,
          }),
        );
      },
      title: '投资机构',
      jumpToIndex: 3,
    },
    {
      name: 'services',
      item: InstitutionItem,
      onPress: item => {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'InstitutionDetail',
            params: {
              id: item.id,
            },
            key: `InstitutionDetail_${item.id}`,
          }),
        );
      },
      title: '服务机构',
      jumpToIndex: 4,
    },
    {
      name: 'users',
      item: UserItem,
      onPress: item => {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'UserProfile',
            params: {
              data: item,
            },
          }),
        );
      },
      title: '用户',
      jumpToIndex: 5,
    },
  ];

  @bind
  renderSingleType(type) {
    const { loading } = R.pathOr({}, ['data', type.name])(this.props);
    const data = R.compose(
      R.take(3),
      R.pathOr([], ['data', type.name, 'data']),
    )(this.props);
    const pagination = R.pathOr({}, ['data', type.name, 'pagination'])(
      this.props,
    );
    if (!pagination.total && !loading) {
      return null;
    }
    if (loading) {
      return (
        <View style={{ marginBottom: 10, backgroundColor: 'white' }}>
          <View>
            <View
              style={{
                height: 44,
                justifyContent: 'center',
                marginLeft: 12.5,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#E9E9E9',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: 'rgba(0,0,0,0.65)',
                  letterSpacing: 0.16,
                }}
              >
                {type.title}
              </Text>
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 12 }}>
              <Placeholder.ImageContent
                size={52}
                animate="fade"
                lineNumber={3}
                lineSpacing={8}
                onReady={!loading}
              />
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 12 }}>
              <Placeholder.ImageContent
                size={52}
                animate="fade"
                lineNumber={3}
                lineSpacing={8}
                onReady={!loading}
              />
            </View>
            <View
              style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 12 }}
            >
              <Placeholder.ImageContent
                size={52}
                animate="fade"
                lineNumber={3}
                lineSpacing={8}
                onReady={!loading}
              />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ marginBottom: 10, backgroundColor: 'white' }}>
        <View>
          <View
            style={{
              height: 44,
              justifyContent: 'center',
              marginLeft: 12.5,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: '#E9E9E9',
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: 'rgba(0,0,0,0.65)',
                letterSpacing: 0.16,
              }}
            >
              {type.title}
            </Text>
          </View>
          {data.map(i => (
            <View>
              <type.item
                data={i}
                onPress={() => type.onPress(i)}
                style={{
                  paddingHorizontal: 0,
                  paddingRight: 12,
                  marginLeft: 10,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: '#E9E9E9',
                }}
              />
            </View>
          ))}
          <Touchable onPress={() => this.props.jumpTo(type.jumpToIndex)}>
            <View
              style={{
                justifyContent: 'center',
                height: 44,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: 'rgba(0,0,0,0.65)',
                  letterSpacing: 0.16,
                }}
              >
                查看全部{' '}
                <Text
                  style={{
                    fontSize: 13,
                    color: '#1890FF',
                    letterSpacing: 0.16,
                  }}
                >
                  {pagination.total}
                </Text>{' '}
                条结果
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
  render() {
    if (this.props.empty && this.props.searchText) {
      return (
        <View style={{ flex: 1, marginTop: 100 }}>
          <Empty
            imageStyle={{ width: 141, height: 154 }}
            image={require('asset/empty_data.png')}
            title="无结果，可尝试更换关键词"
          />
        </View>
      );
    }
    return (
      <ScrollView
        style={{
          backgroundColor: '#F5F5F5',
        }}
      >
        {this.types.map(this.renderSingleType)}
      </ScrollView>
    );
  }
}

globalResult.propTypes = {};
globalResult.defaultProps = {};

export default globalResult;
