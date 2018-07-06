import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import styles from './styles';

const STATUS_MAP = {
  4: {
    name: '确定意向',
    color: '#7376F4',
  },
  5: {
    name: '待打币',
    color: '#E634CE',
  },
  6: {
    name: '已打币',
    color: '#1ECEA7',
  },
};

class StatusBadge extends Component {
  render() {
    const status = this.props.status;
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.dot.container,
            {
              backgroundColor: R.pathOr('transparent', [status, 'color'])(
                STATUS_MAP,
              ),
            },
          ]}
        />
        <Text style={styles.text}>
          {R.pathOr('', [status, 'name'])(STATUS_MAP)}
        </Text>
      </View>
    );
  }
}

StatusBadge.propTypes = {};
StatusBadge.defaultProps = {};

export default StatusBadge;
