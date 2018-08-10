import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import R from 'ramda';

import Title from './title';
import { shadow } from '../../utils/style';

const resources = ({ data }) => {
  const types = R.pathOr([], ['types'])(data);
  return (
    <View style={styles.container}>
      <View style={styles.top.container}>
        <Text style={styles.top.title}>{data.name}</Text>
        {!R.isEmpty(types) && (
          <Text style={styles.top.divider}>
            {'  '}|{'  '}
            {types.map(t => (
              <Title key={t.id} data={t} />
            ))}
          </Text>
        )}
      </View>
      <Grid style={styles.bottom.container}>
        <Row>
          <Col>
            <Text style={styles.bottom.group.title}>
              机构：
              <Text style={styles.bottom.group.content}>{data.org}</Text>
            </Text>
          </Col>
          <Col>
            {!!data.title && (
              <Text style={styles.bottom.group.title}>
                职位：
                <Text style={styles.bottom.group.content}>{data.title}</Text>
              </Text>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: 8 }}>
          <Col>
            {!!data.mobile && (
              <Text style={styles.bottom.group.title}>
                手机：
                <Text style={styles.bottom.group.content}>{data.mobile}</Text>
              </Text>
            )}
          </Col>
          <Col>
            {!!data.wechat && (
              <Text style={styles.bottom.group.title}>
                微信：
                <Text style={styles.bottom.group.content}>{data.wechat}</Text>
              </Text>
            )}
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 20,
    marginHorizontal: 12,
    marginVertical: 5,
    ...shadow,
  },
  top: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    divider: {
      fontSize: 12,
      color: '#E0E0E0',
    },
    title: {
      color: '#333333',
      fontWeight: 'bold',
      fontSize: 18,
    },
  },
  bottom: {
    container: {
      marginTop: 18,
    },
    group: {
      title: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
      content: {
        color: 'rgba(0, 0, 0, 0.85)',
      },
    },
  },
};

resources.propTypes = {
  data: PropTypes.object.isRequired,
};

export default resources;
