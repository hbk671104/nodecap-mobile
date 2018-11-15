import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex } from 'antd-mobile';
import { Col, Row, Grid } from 'react-native-easy-grid';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

const rating_item = ({ columns = 4, onMorePress }) => {
  const data = R.repeat('AA', 7);
  const rows = Math.ceil(R.length(data) / columns);
  const remainder = R.length(data) % 4;
  const residue = columns - remainder;

  return (
    <View style={styles.container}>
      <Flex align="center" justify="space-between">
        <Text style={styles.title}>啥啥资本</Text>
        <Touchable borderless onPress={onMorePress}>
          <Text style={styles.more}>查看</Text>
        </Touchable>
      </Flex>
      <Flex align="flex-start" style={styles.content.container}>
        <View style={styles.content.overall.container}>
          <Text style={styles.content.overall.rating}>AA</Text>
          <Text style={styles.content.overall.subtitle}>评级</Text>
        </View>
        <Grid style={styles.content.grid}>
          {rows > 1 &&
            R.times(
              current => (
                <Row key={`${current}`}>
                  {R.times(
                    count => (
                      <Col
                        key={`${current}-${count}`}
                        style={styles.content.item.container}
                      >
                        <Text style={styles.content.item.text}>
                          {R.path([count + current])(data)}
                        </Text>
                      </Col>
                    ),
                    columns,
                  )}
                </Row>
              ),
              rows - 1,
            )}
          <Row>
            {R.times(
              count => (
                <Col key={`${count}`} style={styles.content.item.container}>
                  <Text style={styles.content.item.text}>
                    {R.path([(rows - 1) * columns + count])(data)}
                  </Text>
                </Col>
              ),
              remainder,
            )}
            {R.times(
              count => (
                <Col key={`${count}`} style={styles.content.item.container} />
              ),
              residue,
            )}
          </Row>
        </Grid>
      </Flex>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 18,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  more: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1890FF',
  },
  content: {
    container: {
      marginTop: 10,
    },
    overall: {
      container: {
        height: 45,
        width: 65,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
      },
      rating: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1890FF',
      },
      subtitle: {
        marginTop: 5,
        fontSize: 11,
        color: 'rgba(0, 0, 0, 0.85)',
      },
    },
    grid: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#E9E9E9',
      marginLeft: 6,
    },
    item: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E9E9E9',
      },
      text: {
        fontSize: 14,
        color: '#999999',
      },
    },
  },
};

export default rating_item;
