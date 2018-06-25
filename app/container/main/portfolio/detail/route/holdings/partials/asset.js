import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { shadow } from '../../../../../../../utils/style';

const asset = props => (
  <View>
    <View style={styles.top.container}>
      <Text style={styles.top.title}>持仓市值</Text>
      <Text style={styles.top.content}>¥ 247,274,883.12 CNY</Text>
    </View>
    <View style={styles.middle.container}>
      <Text style={styles.middle.title}>净成本 ¥9,824,894</Text>
      <Text style={styles.middle.subtitle}>
        持仓数量 9824894
        {'        '}
        平均持仓成本 ¥0.8362
      </Text>
    </View>
    <View style={styles.bottom.container}>
      <Grid>
        <Row>
          <Col>
            <View style={styles.bottom.group.container}>
              <Text style={styles.bottom.group.title}>浮动盈亏</Text>
              <Text style={styles.bottom.group.content}>¥827,337,983.21</Text>
            </View>
          </Col>
          <Col>
            <View style={styles.bottom.group.container}>
              <Text style={styles.bottom.group.title}>浮动盈亏</Text>
              <Text style={styles.bottom.group.content}>¥8983.21</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            <View style={styles.bottom.group.container}>
              <Text style={styles.bottom.group.title}>持仓盈亏</Text>
              <Text style={styles.bottom.group.content}>¥827,337,983.21</Text>
            </View>
          </Col>
          <Col>
            <View style={styles.bottom.group.container}>
              <Text style={styles.bottom.group.title}>浮动盈亏</Text>
              <Text style={[styles.bottom.group.content, { color: '#F5222D' }]}>¥-8983.21</Text>
            </View>
          </Col>
        </Row>
      </Grid>
    </View>
  </View>
);

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
      marginTop: 17,
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
      marginTop: 24,
    },
    group: {
      container: {
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingBottom: 16,
        paddingHorizontal: 8,
        margin: 5,
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
