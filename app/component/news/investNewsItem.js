import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex } from 'antd-mobile';
import moment from 'moment';
import R from 'ramda';

class InvestNewsItem extends Component {
  render() {
    const { data } = this.props;
    const investors = R.pathOr([], ['investors'])(data);
    return (
      <View style={styles.container}>
        <Flex justify="between" align="center">
          <View>
            <Text style={styles.title}>{data.name}</Text>
          </View>
          <View>
            <Text style={styles.date}>{moment.unix(data.invest_time).format('MM-DD')}</Text>
          </View>
        </Flex>
        <Flex style={{ marginTop: 8 }}>
          <View style={styles.investName}>
            <Text style={styles.round}>{data.invest_round}</Text>
          </View>
          <View style={styles.investAmount}>
            <Text style={styles.investAmountText}>{data.invest_amount}</Text>
          </View>
        </Flex>
        <Text style={styles.investorTitle}>投资方</Text>
        <Flex wrap="wrap">
          {investors.length ? investors.map((i, idx) => (
            <View key={i.id} style={{ minWidth: 0 }}>
              <Text style={styles.investors}>{i.name}{((investors.length - 1) === idx) ? '' : ' | '}</Text>
            </View>
          )) : (
            <View><Text style={styles.investors}>未披露</Text></View>
          )}
        </Flex>
      </View>
    );
  }
}

const styles = {
  container: {
    marginLeft: 12,
    marginBottom: 12,
    paddingRight: 12,
    paddingBottom: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: { fontFamily: 'PingFangSC-Medium', fontSize: 16, color: 'rgba(0,0,0,0.85)' },
  date: { fontSize: 12, color: '#A1B6C9', letterSpacing: 0.14 },
  round: { fontSize: 10, color: '#FFFFFF' },
  investName: {
    height: 18,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1890FF',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  investAmount: {
    height: 18,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#eee',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  investAmountText: { fontSize: 10, color: '#1890FF' },
  investorTitle: { fontSize: 11, color: 'rgba(0,0,0,0.45)', marginTop: 12 },
  investors: { fontFamily: 'PingFangSC-Medium', fontSize: 12, color: 'rgba(0,0,0,0.45)', minWidth: 0 },
};

InvestNewsItem.propTypes = {};
InvestNewsItem.defaultProps = {};

export default InvestNewsItem;
