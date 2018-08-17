import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import FundGroup from '../components/group';
import Summary from '../components/summary';
import DataItem from '../components/dataItem';
import Investment from '../components/investment';
import styles from './style';

@connect()
class FundOverall extends Component {
  handleProjectPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'FundProject',
      }),
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FundGroup
            shadow
            title="基金概况"
            renderRight={() => (
              <Text style={styles.summary.right}>共 28,3712 ETH</Text>
            )}
          >
            <Summary />
          </FundGroup>
          <FundGroup
            style={styles.investment.container}
            title="投资数量"
            subtitle="(63)"
            renderRight={() => (
              <Touchable borderless onPress={this.handleProjectPress}>
                <Text style={styles.investment.right}>
                  项目清单 <Icon name="arrow-forward" />
                </Text>
              </Touchable>
            )}
          >
            <Investment />
          </FundGroup>
          <FundGroup
            contentContainer={styles.data.content}
            title="已上所项目浮盈统计"
            subtitle="(28)"
          >
            <DataItem
              title="本金"
              content="120,032 ETH"
              subcontent="约 2.4亿元"
            />
            <DataItem
              title="市值"
              content="178,347 ETH"
              subcontent="约 3.6亿元"
            />
            <DataItem
              title="出货所得"
              content="3,927 ETH"
              subcontent="约 785.4万元"
            />
            <DataItem
              title="累计利润"
              content="58,007 ETH"
              subcontent="约 1.16亿元"
            />
            <DataItem
              title="回报率"
              content="148.58% (ETH)"
              subcontent="218.23% (CNY)"
            />
          </FundGroup>
          <FundGroup title="已上所项目收益 TOP 5" />
        </ScrollView>
      </View>
    );
  }
}

export default FundOverall;
