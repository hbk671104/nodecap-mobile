import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Title from './title';
import { shadow } from '../../utils/style';

const resources = ({ data, onPress }) => {
  const types = R.pathOr([], ['types'])(data);

  const org = R.pathOr('未填写', ['org'])(data);
  const title = R.pathOr('未填写', ['title'])(data);
  const mobile = R.pathOr('未填写', ['mobile'])(data);
  const wechat = R.pathOr('未填写', ['wechat'])(data);

  return (
    <Touchable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top.container}>
          <Text style={styles.top.title}>{data.name}</Text>
          {!R.isEmpty(types) && (
            <View style={styles.top.group}>
              <Text style={styles.top.divider}>
                {'  '}|{'  '}
              </Text>
              {types.map(t => (
                <Text key={t.id}>
                  <Title data={t} />{' '}
                </Text>
              ))}
            </View>
          )}
        </View>
        <Grid style={styles.bottom.container}>
          <Row>
            <Col>
              <Text style={styles.bottom.group.title}>
                机构：
                <Text style={styles.bottom.group.content}>{org}</Text>
              </Text>
            </Col>
            <Col>
              <Text style={styles.bottom.group.title}>
                职位：
                <Text style={styles.bottom.group.content}>{title}</Text>
              </Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 8 }}>
            <Col>
              <Text style={styles.bottom.group.title}>
                手机：
                <Text style={styles.bottom.group.content}>{mobile}</Text>
              </Text>
            </Col>
            <Col>
              <Text style={styles.bottom.group.title}>
                微信：
                <Text style={styles.bottom.group.content}>{wechat}</Text>
              </Text>
            </Col>
          </Row>
        </Grid>
      </View>
    </Touchable>
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
    group: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    divider: {
      color: '#E9E9E9',
      fontSize: 13,
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
  onPress: PropTypes.func,
};

resources.defaultProps = {
  onPress: () => null,
};

export default resources;
