import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex } from 'antd-mobile';
import { Col, Row, Grid } from 'react-native-easy-grid';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

const rating_item = ({ data, org, columns = 5, onMorePress }) => {
  const targeted_id = R.path(['rating_type_id'])(data);
  const grade_url = R.path(['grade_url'])(data);
  const name = R.pathOr('--', ['name'])(org);
  const standard = R.pathOr([], ['rating_types'])(org);

  // rating
  const rating = R.find(r => r.id === targeted_id)(standard);
  const rating_id = R.path(['id'])(rating);
  const rating_name = R.path(['name'])(rating);

  const length = R.length(standard);
  const rows = Math.ceil(length / columns);
  const remainder = rows > 1 ? length % columns : length;
  const residue = rows > 1 ? columns - remainder : columns - length;

  return (
    <View style={styles.container}>
      <Flex align="center" justify="space-between">
        <Text style={styles.title}>{name}</Text>
        {!R.isNil(grade_url) && (
          <Touchable borderless onPress={onMorePress}>
            <Text style={styles.more}>查看</Text>
          </Touchable>
        )}
      </Flex>
      <Flex align="flex-start" style={styles.content.container}>
        <View style={styles.content.overall.container}>
          <Text style={styles.content.overall.rating}>{rating_name}</Text>
          <Text style={styles.content.overall.subtitle}>评级</Text>
        </View>
        <Grid style={styles.content.grid}>
          {rows > 1 &&
            R.times(
              current => (
                <Row key={`${current}`}>
                  {R.times(count => {
                    const index = current * columns + count;
                    const rating_item_id = R.path([index, 'id'])(standard);
                    const rating_item_name = R.pathOr('--', [index, 'name'])(
                      standard,
                    );
                    return (
                      <Col
                        key={`${rating_item_id}`}
                        style={[
                          styles.content.item.container,
                          rating_item_id === rating_id &&
                            styles.content.item.highlight,
                        ]}
                      >
                        <Text style={styles.content.item.text}>
                          {rating_item_name}
                        </Text>
                      </Col>
                    );
                  }, columns)}
                </Row>
              ),
              remainder === 0 ? rows : rows - 1,
            )}
          {remainder !== 0 && (
            <Row>
              {R.times(count => {
                const index = (rows - 1) * columns + count;
                const rating_item_id = R.path([index, 'id'])(standard);
                const rating_item_name = R.pathOr('--', [index, 'name'])(
                  standard,
                );
                return (
                  <Col
                    key={`${count}`}
                    style={[
                      styles.content.item.container,
                      rating_item_id === rating_id &&
                        styles.content.item.highlight,
                    ]}
                  >
                    <Text style={styles.content.item.text}>
                      {rating_item_name}
                    </Text>
                  </Col>
                );
              }, remainder)}
              {R.times(
                count => (
                  <Col key={`${count}`} style={styles.content.item.container} />
                ),
                residue,
              )}
            </Row>
          )}
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
      highlight: {
        backgroundColor: '#F5F5F5',
      },
      text: {
        fontSize: 14,
        color: '#999999',
      },
    },
  },
};

export default rating_item;
