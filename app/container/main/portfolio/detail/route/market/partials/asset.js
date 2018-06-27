import React from 'react';
import { View, Text } from 'react-native';
import * as R from 'ramda';
import Accounting from 'accounting';
import { Col, Grid } from 'react-native-easy-grid';

import { shadow } from '../../../../../../../utils/style';

const asset = (props) => {
  const statProps = path => R.path(['stat', ...path])(props);

  const holdings = statProps(['investment', 'assets', 'CNY']);
  const profits = statProps(['investment', 'profits', 'CNY']);
  return (
    <View>
      <View style={styles.top.container}>
        <Text style={styles.top.title}>持仓市值</Text>
        <Text style={styles.top.content}>¥ {Accounting.formatNumber(holdings, 2)} CNY</Text>
      </View>
      {/* <View style={styles.middle.container}>
        <Text style={styles.middle.title}>净成本 ¥9,824,894</Text>
      </View> */}
      <View style={styles.bottom.container}>
        <Grid>
          <Col>
            <View style={[styles.bottom.group.container, { marginRight: 5 }]}>
              <Text style={styles.bottom.group.title}>浮动盈亏</Text>
              <Text style={styles.bottom.group.content}>
                ¥ {Accounting.formatNumber(profits, 2)}
              </Text>
            </View>
          </Col>
          <Col>
            <View style={[styles.bottom.group.container, { marginLeft: 5 }]}>
              <Text style={styles.bottom.group.title}>今日盈亏</Text>
              <Text style={styles.bottom.group.content}>¥ 8983.21</Text>
            </View>
          </Col>
        </Grid>
      </View>
    </View>
  );
};

const styles = {
  top: {
    container: {
      marginTop: 24,
    },
    title: {
      color: '#999999',
      fontSize: 12,
    },
    content: {
      color: '#1890FF',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
  },
  middle: {
    container: {
      marginTop: 13,
    },
    title: {
      color: '#666666',
      fontSize: 13,
    },
    subtitle: {
      color: '#999999',
      fontSize: 11,
      marginTop: 10,
    },
  },
  bottom: {
    container: {
      marginTop: 17,
    },
    group: {
      container: {
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingBottom: 16,
        paddingHorizontal: 8,
        // margin: 5,
        borderRadius: 2,
        ...shadow,
      },
      title: {
        color: '#666666',
        fontSize: 12,
      },
      content: {
        color: '#09AC32',
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
  },
};

export default asset;
